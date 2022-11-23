import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInterfaces, reset } from "../../store/devices/system/systemSlice";
import { useEffect } from "react";
import { Col, Table, Spinner, Badge, Button } from "react-bootstrap";
import { FaCogs, FaDoorClosed } from "react-icons/fa";
const Interfaces = () => {


    const { uuid } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { interfaces, isLoading, isError, message } = useSelector(
        (state) => state.system
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getInterfaces(uuid));

        return () => {
            dispatch(reset());
        };
    }, [token, dispatch]);

    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Interfaces  {uuid} {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <Col>
                    <Table className="mt-2" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Default Name</th>
                                <th>Type</th>
                                <th>Mac Address</th>
                                <th>Upload</th>
                                <th>Download</th>
                                <th>Running</th>
                                <th>Disabled</th>
                                <th>Last Link-up Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(interfaces).map((iface, index) => (

                                    <tr key={index}>
                                        <td>{interfaces[iface].name}</td>
                                        <td>{interfaces[iface]['default-name']}</td>
                                        <td>{interfaces[iface]['type']}</td>
                                        <td>{interfaces[iface]['mac-address']}</td>
                                        <td>{interfaces[iface]['tx-byte']}</td>
                                        <td>{interfaces[iface]['rx-byte']}</td>
                                        <td>{interfaces[iface]['running'] == "true" ?
                                            (<Badge bg="success">
                                                Running
                                            </Badge>) : (<Badge bg="danger">
                                                Stopped
                                            </Badge>)}</td>
                                        <td>{interfaces[iface]['disabled'] == "false" ?
                                            (<Badge bg="success">
                                                Enabled
                                            </Badge>) : (<Badge bg="warning">
                                                Disabled
                                            </Badge>)}</td>
                                        <td>{interfaces[iface]['last-link-up-time']}</td>
                                        <td>
                                            <div>
                                                <Button href="" variant="info" size="sm">
                                                    <FaDoorClosed /> Disable
                                                </Button>{" "}

                                            </div>
                                        </td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </Table>
                </Col>
            </section>
        </>

    )

}

export default Interfaces;