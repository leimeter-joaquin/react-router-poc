import React from "react";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";
import { log } from "../../logger";

type LoaderData = { payments: string[] };

/* eslint-disable react-refresh/only-export-components */
export function loader() {
  log("payments loader", "deeppink");

  const promise: Promise<LoaderData> = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ payments: ["1", "2", "3"] });
    }, 2000);
  });

  return defer({ payments: promise });
}

export const Component = () => {
  const data = useLoaderData() as LoaderData;

  return (
    <React.Suspense fallback={<p>Loading payments</p>}>
      <Await resolve={data.payments} errorElement={<p>payments fail</p>}>
        {(data: LoaderData) => (
          <div>
            <p>payments {JSON.stringify(data.payments, null, 2)} </p>
            <Outlet />
          </div>
        )}
      </Await>
    </React.Suspense>
  );
};
