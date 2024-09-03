/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Component = () => {
  // We are sure that this state exists because we called the thunk in the root loader.
  const isOptedIn = useSelector(
    (state) => (state as any).eligibilityReducer.isOptedIn
  );

  useEffect(() => {
    console.log("isOptedIn", isOptedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundColor: "light-green",
        height: "500px",
        width: "500px",
      }}
    >
      opt-in {isOptedIn}
    </div>
  );
};
