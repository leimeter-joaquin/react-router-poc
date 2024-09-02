import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      fallbackElement={
        <div
          style={{
            backgroundColor: "orange",
            height: "500px",
            width: "500px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          LOADING
        </div>
      }
    />
  </Provider>
);
