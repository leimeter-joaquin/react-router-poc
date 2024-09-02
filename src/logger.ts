export const log = (text: string, color: string, value?: unknown) => {
  if (value === undefined) {
    console.log(`%c${text}`, `background-color: ${color};`);
    return;
  }
  console.log(`%c${text}`, `background-color: ${color};`, value);
};
