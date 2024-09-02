import React from "react";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";

// TODO: change this to payments
type LoaderData = { isOptedIn: boolean };

/* eslint-disable react-refresh/only-export-components */
export function loader() {
  console.log("loader account");

  const promise: Promise<LoaderData> = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isOptedIn: true });
    }, 2000);
  });

  return defer({ isOptedIn: promise });
}

export const Component = () => {
  const data = useLoaderData();

  return (
    <React.Suspense fallback={<p>Loading acount</p>}>
      <Await resolve={data} errorElement={<p>acount fail</p>}>
        {(data) => (
          <div>
            <p>acount {JSON.stringify(data.isOptedIn, null, 2)} </p>
            <Outlet />
          </div>
        )}
      </Await>
    </React.Suspense>
  );
};
