'use client';

import { useEffect, useLayoutEffect } from 'react';

// This is a widely used workaround to prevent SSR warnings when using useLayoutEffect. The workaround
// ensures useLayoutEffect will be replaced by useEffect server-side.

// https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
