import { createBrowserRouter, redirect } from "react-router-dom";
import { eligibilityThunk } from "./store/eligibility/thunk";
import { store } from "./store";
import Root from "./pages";
import { log } from "./logger";

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
    element: (
      <div
        style={{
          backgroundColor: "red",
          height: "500px",
          width: "500px",
          textAlign: "center",
        }}
      >
        NOT FOUND
      </div>
    ),
  },

  {
    errorElement: <div>error</div>,
    path: "/",
    // This will run every time the user navigates to the root path or any of it's child routes.
    element: <Root />,
    loader: async () => {
      log("root loader", "darkcyan");
      // we do app initialization while showing the fallback element or loader. check `src/main.tsx`
      await store.dispatch(eligibilityThunk());
      return null;
    },
    children: [
      {
        path: "portal",
        lazy: () => import("./pages/portal/portal"),
        loader: () => {
          log("portal loader", "green");

          const state = store.getState();
          // log("state from getState()", "green", state.eligibilityReducer);

          if (!state.eligibilityReducer.isOptedIn) {
            log("redirecting to /opt-in", "green");
            return redirect("/opt-in");
          }
          log("portal loader finished", "green");
          return null;
        },
        children: [
          { path: "payments", lazy: () => import("./pages/portal/payments") },
          { path: "account", lazy: () => import("./pages/portal/account") },
        ],
      },
      {
        path: "opt-in",
        loader: () => {
          log("opt-in loader", "brown");
          const state = store.getState();
          if (state.eligibilityReducer.isOptedIn) {
            log("redirecting to /portal", "brown");
            return redirect("/portal");
          }
          log("opt-in loader finished", "brown");
          return null;
        },
        lazy: () => import("./pages/opt-in"),
      },
    ],
  },
]);
