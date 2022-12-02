import DeviceNavigation from "../../components/device-navigation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { FaCogs, FaDoorClosed, FaPlay, FaStop } from "react-icons/fa";
import { MdCheck, MdClose, MdDynamicFeed } from "react-icons/md";
import { getAddresses, getPools, getDNS, reset } from "../../store/devices/system/ip";
import { useEffect } from "react";
import CreateIP from "../../components/ip-create";


const IP = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, token, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    const { addresses, pools, dns } = useSelector(
        (state) => state.ip
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getAddresses(uuid))
        dispatch(getPools(uuid))
        dispatch(getDNS(uuid))


        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">IP {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <CreateIP uuid={uuid} />
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="addresses"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="addresses" title="Address List">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Address</th>
                                    <th>Network</th>
                                    <th>Interface</th>
                                    <th>Dynamic</th>
                                    <th>Disabled</th>
                                    <th>Comment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(addresses).map((address, index) => (

                                        <tr key={index}>
                                            <td>{addresses[address]['address']}</td>
                                            <td>{addresses[address]['network']}</td>
                                            <td>{addresses[address]['interface']}</td>
                                            <td>{addresses[address]['dynamic'] == "true" ?
                                                (<Badge bg="success">
                                                    <FaPlay size={15} />
                                                </Badge>) : (<Badge bg="danger">
                                                    <FaStop size={15} />
                                                </Badge>)}</td>
                                            <td>{addresses[address]['disabled'] == "false" ?
                                                (<Badge bg="success">
                                                    Enabled
                                                </Badge>) : (<Badge bg="warning">
                                                    Disabled
                                                </Badge>)}</td>
                                            <td>{addresses[address]['commnet']}</td>
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
                    </Tab>

                    <Tab eventKey="pool" title="IP Pool">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Ranges</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(pools).map((pool, index) => (

                                        <tr key={index}>
                                            <td>{pools[pool]['name']}</td>
                                            <td>{pools[pool]['ranges']}</td>
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
                    </Tab>

                    <Tab eventKey="vlan" title="DNS">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Fields</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>Servers</td>
                                    <td>{dns[0]['servers']}</td>

                                </tr>
                                <tr>
                                    <td>Dynmic Servers</td>
                                    <td>{dns[0]['dynamic-servers']}</td>

                                </tr>

                            </tbody>
                        </Table>
                    </Tab>

                </Tabs>

            </section>
        </>

    )

}

export default IP;