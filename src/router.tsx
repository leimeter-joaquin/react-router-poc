import { createBrowserRouter, redirect } from "react-router-dom";
import { eligibilityThunk } from "./store/eligibility/thunk";
import { store } from "./store";

// Show usage of redux with loaders, dispatch and select from element.
// short term: managing redirects.
// long term: show usage of laoders in other situations.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const router: any = createBrowserRouter([
  {
    path: "*",
    loader: () => {
      console.log("404 loader");
      return null;
    },
    element: <div>404 Not Found</div>,
  },

  {
    errorElement: <div>error</div>,
    path: "/",
    // This will run every time the user navigates to the root path or any of it's child routes.
    loader: async () => {
      console.log("loader root");

      return null;
    },
    children: [
      {
        path: "portal",
        lazy: () => import("./pages/portal/portal"),
        loader: async () => {
          console.log("loader portal");
          const data = await store.dispatch(eligibilityThunk());
          if (!data.payload.isOptedIn) {
            console.log("redirecting to /opt-in");
            return redirect("/opt-in");
          }
          return null;
        },
        children: [
          { path: "payments", lazy: () => import("./pages/portal/payments") },
          { path: "account", lazy: () => import("./pages/portal/account") },
        ],
      },
      {
        path: "opt-in",
        loader: async () => {
          console.log("loader opt-in");
          const data = await store.dispatch(eligibilityThunk());
          if (data.payload.isOptedIn) {
            console.log("redirecting to /portal");
            return redirect("/portal");
          }
          return null;
        },
        lazy: () => import("./pages/opt-in"),
      },
    ],
  },
]);
