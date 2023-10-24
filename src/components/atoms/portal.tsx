'use client';

import { canUseDOM } from '@lib/hooks/canUseDom';
import { useIsomorphicLayoutEffect } from '@lib/hooks/useIsomorphicLayoutEffect';
import { FC, ReactNode, RefObject, useState } from 'react';
import { createPortal } from 'react-dom';

export type PortalNode =
  | HTMLElement
  | null
  | undefined
  | RefObject<HTMLElement>
  | string;

// type guard to check if node is a React RefObject
const isRefObject = (node: PortalNode): node is RefObject<HTMLElement> =>
  node !== null &&
  node !== undefined &&
  Object.prototype.hasOwnProperty.call(node, 'current');

export interface PortalProps {
  node?: PortalNode;
  children: ReactNode;
}

// React portal component that renders children into a DOM node.
export const Portal: FC<PortalProps> = ({ children, node }) => {
  const isDOMEnv = canUseDOM();
  const [isBrowser, setIsBrowser] = useState(false);

  let portalNode = node;

  if (!portalNode && isDOMEnv) {
    portalNode = document.body;
  }

  let mountNode = isRefObject(portalNode) ? portalNode.current : portalNode;

  if (isDOMEnv && typeof mountNode === 'string') {
    mountNode = document.querySelector<HTMLElement>(mountNode);
  }

  // useIsomorphicLayoutEffect is needed to render modal correctly with nextjs (do not remove)
  useIsomorphicLayoutEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser || !mountNode || typeof mountNode === 'string') {
    return null;
  }

  return (
    <>
      {createPortal(
        children as unknown as Parameters<typeof createPortal>[0],
        mountNode
      )}
    </>
  );
};
