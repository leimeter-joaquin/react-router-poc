/* eslint-disable react-refresh/only-export-components */
export function loader(): Promise<null> {
  console.log("loader portal");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 5000);
  });
}

export const Component = () => {
  return <div>portal</div>;
};
