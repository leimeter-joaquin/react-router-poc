/* eslint-disable react-refresh/only-export-components */
export function loader(): Promise<null> {
  console.log("loader Opt in");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 5000);
  });
}

export const Component = () => {
  return <div>opt-in</div>;
};
