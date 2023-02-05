export const classnames = (
  ...args: (string | undefined | null | boolean | number)[]
) => args.filter(Boolean).join(' ');
