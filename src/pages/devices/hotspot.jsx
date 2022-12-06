import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { getHotspot, getHotspotProfiles, removeHotspot, removeHotspotProfile, reset } from "../../store/devices/system/hotspot";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import CreateHotspot from "../../components/hotspot-create";


const Hotspot = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, token } = useSelector(
        (state) => state.auth
    );
    const { hotspots, hotspot_profiles, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.hotspot
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getHotspot(uuid))
        dispatch(getHotspotProfiles(uuid))

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">Hotspot {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <CreateHotspot uuid={uuid} />
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="server"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="server" title="Server">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Interface</th>
                                    <th>Pool</th>
                                    <th>Profile</th>
                                    <th>Address per Mac</th>
                                    <th>IP of DNS Name</th>
                                    <th>HTTPS</th>
                                    <th>Disabled</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(hotspots).map((hs, index) => (

                                        <tr key={index}>
                                            <td>{hotspots[hs]['name']}</td>
                                            <td>{hotspots[hs]['interface']}</td>
                                            <td>{hotspots[hs]['address-pool']}</td>
                                            <td>{hotspots[hs]['profile']}</td>
                                            <td>{hotspots[hs]['addresses-per-mac']}</td>
                                            <td>{hotspots[hs]['ip-of-dns-name']}</td>
                                            <td>{hotspots[hs]['HTTPS']}</td>

                                            <td>{hotspots[hs]['disabled'] == "false" ?
                                                (<Badge bg="success">
                                                    Enabled
                                                </Badge>) : (<Badge bg="warning">
                                                    Disabled
                                                </Badge>)}</td>
                                            <td>
                                                <div>

                                                    <Button onClick={() => {
                                                        const payload = {
                                                            uuid: uuid,
                                                            id: hotspots[hs]['.id']
                                                        }
                                                        dispatch(removeHotspot(payload))
                                                        dispatch(getHotspot(uuid))

                                                    }} variant="danger" size="sm">
                                                        <FaTrash /> Delete
                                                    </Button>

                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="profile" title="Server Profile">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Hotspot Address</th>
                                    <th>DNS Name</th>
                                    <th>HTML Directory</th>
                                    <th>Login By</th>
                                    <th>Cookie Lifetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(hotspot_profiles).map((profile, index) => (

                                        <tr key={index}>
                                            <td>{hotspot_profiles[profile]['name']}</td>
                                            <td>{hotspot_profiles[profile]['hotspot-address']}</td>
                                            <td>{hotspot_profiles[profile]['dns-name']}</td>
                                            <td>{hotspot_profiles[profile]['html-directory']}</td>
                                            <td>{hotspot_profiles[profile]['login-by']}</td>
                                            <td>{hotspot_profiles[profile]['http-cookie-lifetime']}</td>
                                            <td>
                                                <div>

                                                    <Button onClick={() => {
                                                        const payload = {
                                                            uuid: uuid,
                                                            id: hotspot_profiles[profile]['.id']
                                                        }
                                                        dispatch(removeHotspotProfile(payload))
                                                        dispatch(getHotspotProfiles(uuid))

                                                    }} variant="danger" size="sm">
                                                        <FaTrash /> Delete
                                                    </Button>

                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </Table>
                    </Tab>


                </Tabs>

            </section>
        </>

    )

}

export default Hotspot;