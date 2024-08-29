import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

type LoaderData = { isOptedIn: boolean };

/* eslint-disable react-refresh/only-export-components */
export function loader() {
  console.log("loader portal");

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
    <React.Suspense fallback={<p>Loading portal</p>}>
      <Await resolve={data} errorElement={<p>portal fail</p>}>
        {(data) => (
          <p>portal nice {JSON.stringify(data.isOptedIn, null, 2)} </p>
        )}
      </Await>
    </React.Suspense>
  );
};
