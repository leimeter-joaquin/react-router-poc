import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <Navigate to="/portal" replace={true} />
      <Outlet />
    </div>
  );
};

export default Root;
