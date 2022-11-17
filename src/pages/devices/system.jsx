import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getSystem, reset } from "../../store/devices/system/systemSlice";
import SystemTime from "../../components/system-time";
import SystemCPU from "../../components/cpu";


const System = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uuid } = useParams();

    const { token } = useSelector(
        (state) => state.auth
    );
    const { system, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.system
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getSystem(uuid));


        return () => {
            dispatch(reset());
        };


    }, [dispatch]);
    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

                </div>
                <SystemTime />
                {/* <SystemCPU /> */}
            </section>
        </>

    )

}

export default System;