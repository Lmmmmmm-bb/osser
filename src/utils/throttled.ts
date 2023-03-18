export const throttle = <T extends (...args: any[]) => unknown>(
  fn: T,
  wait: number,
) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn(...args);
      }, wait);
    }
  };
};
