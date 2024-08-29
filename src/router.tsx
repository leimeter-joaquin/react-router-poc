import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import { eligibilityThunk } from "./store/eligibility/thunk";
import { store } from "./store";

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
    path: "/",
    loader: async () => {
      console.log("root loader");

      const data = await store.dispatch(eligibilityThunk());

      if (!data.payload.isOptedIn) {
        console.log("redirecting to /opt-in");
        return redirect("/opt-in");
      } else {
        console.log("redirecting to /portal");
        return redirect("/portal");
      }
    },
  },
  {
    path: "/portal",
    lazy: () => import("./pages/portal"),
  },
  {
    path: "/opt-in",
    lazy: () => import("./pages/opt-in"),
  },
]);
