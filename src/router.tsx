import { createBrowserRouter, redirect } from "react-router-dom";
import { eligibilityThunk } from "./store/eligibility/thunk";
import { store } from "./store";
import Root from "./pages";
import { log } from "./logger";

// portal and opt-in sibling routes to root. Gated access.

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

  // If you have the check in the root path, we get a loop :(

  {
    errorElement: <div>error</div>,
    path: "/",
    element: <Root />,
    loader: async () => {
      log("root loader", "darkcyan");
      // we do app initialization while showing the fallback element. check `src/main.tsx`
      const response = await store.dispatch(eligibilityThunk());

      if (response.payload.isOptedIn) {
        return redirect("/portal");
      } else {
        return redirect("/opt-in");
      }
    },
  },

  {
    path: "portal",
    lazy: () => import("./pages/portal/portal"),
    loader: () => {
      log("portal loader", "green");

      const state = store.getState();

      // * Here we redirect to the root path to check eligibility if the user has not been checked before. We are using null for this.
      if (state.eligibilityReducer.isOptedIn === null) {
        log("redirecting to /", "green");
        return redirect("/");
      }

      if (!state.eligibilityReducer.isOptedIn) {
        log("redirecting to /opt-in", "green");
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
    loader: () => {
      log("opt-in loader", "brown");
      const state = store.getState();

      // * Here we redirect to the root path to check eligibility if the user has not been checked before. We are using null for this.
      if (state.eligibilityReducer.isOptedIn === null) {
        log("redirecting to /", "green");
        return redirect("/");
      }

      if (state.eligibilityReducer.isOptedIn) {
        log("redirecting to /opt-in", "green");
        return redirect("/portal");
      }

      return null;
    },
    lazy: () => import("./pages/opt-in"),
  },
]);
