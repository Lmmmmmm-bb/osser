// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number
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
