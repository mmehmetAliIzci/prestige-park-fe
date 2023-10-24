'use client';

import { Portal } from '@components/atoms/portal';
import { cn } from '@utils';
import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';

export type ModalProps = {
  show: boolean;
  onClose: <T>(event?: T) => void;
  mask?: boolean;
  backdropClosable?: boolean;
  disableBodyScroll?: boolean;
  withCloseButton?: boolean;
  fullscreen?: boolean;
};

export const Modal = ({
  show,
  onClose,
  children,
  mask = true,
  backdropClosable = true,
  disableBodyScroll,
  withCloseButton = true,
  fullscreen = false,
}: PropsWithChildren<ModalProps>): ReactElement | null => {
  const parentElement = useRef<HTMLDivElement>(null);

  // useOutsideClick(parentElement, onClose, show && backdropClosable);
  // useDisableBodyScroll({ open: show, active: disableBodyScroll });

  useEffect(() => {
    const requestClose = (event: KeyboardEvent) => {
      if (backdropClosable && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', requestClose);

    return () => {
      document.removeEventListener('keydown', requestClose);
    };
  }, [onClose, backdropClosable]);

  return (
    <Portal>
      <div
        tabIndex={-1}
        className={cn(
          'fixed bottom-0 left-0 right-0 top-0 z-40 h-full w-full flex-wrap content-center justify-center',
          show ? 'visible flex' : 'invisible hidden'
        )}
      >
        {/* backdrop */}
        <div
          className={cn(
            'fixed left-0 top-0 z-40 h-full w-full bg-gray-800 bg-opacity-50 transition-opacity duration-200',
            show ? 'block opacity-100' : 'hidden opacity-0'
          )}
        />
        <div
          ref={parentElement}
          role='dialog'
          className={cn(
            'relative z-50 flex bg-white',
            fullscreen && 'h-full w-full'
          )}
        >
          {/* {withCloseButton && (
            <IconButton
              icon="x-mark"
              label="close"
              size="xlarge"
              sx={components?.iconButton}
              onClick={onClose}
              data-testid="close-icon"
            />
          )} */}

          {children}
        </div>
      </div>
    </Portal>
  );
};
