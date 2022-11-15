import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!token) {
      navigate("/login");
    }

    // dispatch(getGoals());

    return;
  }, [user, token, navigate, isError, message, dispatch]);

  return (
    <div className="container">
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
