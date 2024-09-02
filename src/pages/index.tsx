import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Navigate to="/portal" replace={true} />
      <button
        onClick={() => {
          if (location.pathname.includes("/portal")) {
            navigate("/opt-in");
          } else {
            navigate("/portal");
          }
        }}
      >
        Go to {location.pathname.includes("/portal") ? "opt-in" : "portal"}
      </button>
      <Outlet />
    </div>
  );
};

export default Root;
