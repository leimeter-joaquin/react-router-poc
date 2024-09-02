import { Outlet, useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "green",
        height: "500px",
        width: "500px",
        padding: "2rem",
      }}
    >
      <div>
        <button onClick={() => navigate("/portal/payments")}>payments</button>
        <button onClick={() => navigate("/portal/account")}>account</button>
      </div>
      <Outlet />
    </div>
  );
};
