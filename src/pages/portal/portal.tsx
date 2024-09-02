import { Outlet, useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => navigate("/portal/payments")}>payments</button>
        <button onClick={() => navigate("/portal/account")}>account</button>
      </div>
      <Outlet />
    </div>
  );
};
