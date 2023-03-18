export const delay = <T extends (...args: any[]) => unknown>(
  fn: T,
  ms: number,
) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn());
      }, ms);
    });
