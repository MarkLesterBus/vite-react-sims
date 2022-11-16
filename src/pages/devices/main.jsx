import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DeviceNavigation from "../../components/device-navigation";
const Dashboard = ({ uuid }) => {
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
        <>
            <DeviceNavigation uuid={uuid} />
            <div className="container">
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;
