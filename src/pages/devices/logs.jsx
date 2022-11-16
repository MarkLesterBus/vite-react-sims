import DeviceNavigation from "../../components/device-navigation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Logs = () => {
    const { uuid } = useParams();
    const { user, token, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Logs  {uuid} {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
            </section>
        </>

    )

}

export default Logs;