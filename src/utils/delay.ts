// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const delay = <T extends (...args: any[]) => unknown>(
  fn: T,
  ms: number
) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, ms);
  });
