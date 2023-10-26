export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): F {
  let timeout: NodeJS.Timeout | null = null;

  return ((...args: Parameters<F>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  }) as F;
}
