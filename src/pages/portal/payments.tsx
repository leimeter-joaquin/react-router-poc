import React from "react";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";

type LoaderData = { isOptedIn: boolean };

/* eslint-disable react-refresh/only-export-components */
export function loader() {
  console.log("loader payments");

  const promise: Promise<LoaderData> = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isOptedIn: true });
    }, 2000);
  });

  return defer({ isOptedIn: promise });
}

export const Component = () => {
  const data = useLoaderData() as LoaderData;

  return (
    <React.Suspense fallback={<p>Loading payments</p>}>
      <Await resolve={data.isOptedIn} errorElement={<p>payments fail</p>}>
        {(data) => (
          <div>
            <p>payments {JSON.stringify(data.isOptedIn, null, 2)} </p>
            <Outlet />
          </div>
        )}
      </Await>
    </React.Suspense>
  );
};
