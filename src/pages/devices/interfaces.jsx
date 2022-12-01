import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../store/devices/system/system";
import { getInterfaces } from "../../store/devices/system/interface";
import { getBridges } from "../../store/devices/system/bridge";
import { getPorts } from "../../store/devices/system/ports";
import { getVlans } from "../../store/devices/system/vlan";
import { useEffect } from "react";

import { Col, Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { FaCogs, FaDoorClosed, FaPlay, FaStop } from "react-icons/fa";
import { MdCheck, MdClose, MdDynamicFeed } from "react-icons/md";
import CreateInterface from "../../components/interface-create";
const Interfaces = () => {


    const { uuid } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { interfaces, isLoading, isError, message } = useSelector(
        (state) => state.interfaces
    );
    const { bridges, } = useSelector(
        (state) => state.bridges
    );
    const { ports, } = useSelector(
        (state) => state.ports
    );
    const { vlans, } = useSelector(
        (state) => state.vlans
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getInterfaces(uuid));
        dispatch(getBridges(uuid))
        dispatch(getPorts(uuid))
        dispatch(getVlans(uuid))


        return () => {
            dispatch(reset());
        };
    }, [dispatch]);



    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">Interfaces {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <CreateInterface uuid={uuid} />
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="interface"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="interface" title="Interfaces">
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
                                                    <FaPlay size={15} />
                                                </Badge>) : (<Badge bg="danger">
                                                    <FaStop size={15} />
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
                    </Tab>
                    <Tab eventKey="bridge" title="Bridges">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ARP</th>
                                    <th>Mac Address</th>
                                    <th>Protocol</th>
                                    <th>VLAN Filtering</th>
                                    <th>Running</th>
                                    <th>Disabled</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(bridges).map((bridge, i) => (

                                        <tr key={i}>
                                            <td>{bridges[bridge]['name']}</td>
                                            <td>{bridges[bridge]['arp'] == "enabled" ?
                                                (<Badge bg="success">
                                                    <MdCheck size={15} />
                                                </Badge>) : (<Badge bg="danger">
                                                    <MdClose size={15} />
                                                </Badge>)}</td>
                                            <td>{bridges[bridge]['mac-address']}</td>
                                            <td>{bridges[bridge]['protocol-mode']}</td>
                                            <td>{bridges[bridge]['vlan-filtering'] == "false" ?
                                                (<Badge bg="danger">
                                                    <MdClose size={15} />
                                                </Badge>) : (<Badge bg="success">
                                                    <MdCheck size={15} />
                                                </Badge>)}</td>
                                            <td>{bridges[bridge]['running'] == "true" ?
                                                (<Badge bg="success">
                                                    <FaPlay size={15} />
                                                </Badge>) : (<Badge bg="danger">
                                                    <FaStop size={15} />
                                                </Badge>)}</td>
                                            <td>{bridges[bridge]['disabled'] == "false" ?
                                                (<Badge bg="success">
                                                    False
                                                </Badge>) : (<Badge bg="danger">
                                                    Disabled
                                                </Badge>)}</td>

                                            <td>
                                                <div>
                                                    <Button href="" variant="info" className="text-white" size="sm">
                                                        <MdClose size={20} /> Disable
                                                    </Button>{" "}

                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="vlan" title="VLAN">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>VLAN ID </th>
                                    <th>Name</th>
                                    <th>Mac Address</th>
                                    <th>Interface</th>
                                    <th>Running</th>
                                    <th>Disabled</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(vlans).map((vlan, i) => (

                                        <tr key={i}>
                                            <td>{vlans[vlan]['vlan-id']}</td>
                                            <td>{vlans[vlan]['name']}</td>
                                            <td>{vlans[vlan]['mac-address']}</td>
                                            <td>{vlans[vlan]['interface']}</td>
                                            <td>{vlans[vlan]['running'] == "true" ?
                                                (<Badge bg="success">
                                                    <FaPlay size={15} />
                                                </Badge>) : (<Badge bg="danger">
                                                    <FaStop size={15} />
                                                </Badge>)}
                                            </td>
                                            <td>{vlans[vlan]['disabled'] == "false" ?
                                                (<Badge bg="success">
                                                    False
                                                </Badge>) : (<Badge bg="danger">
                                                    Disabled
                                                </Badge>)}
                                            </td>
                                            <td>
                                                <div>
                                                    <Button href="" variant="info" className="text-white" size="sm">
                                                        <MdClose size={20} /> Disable
                                                    </Button>{" "}

                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="port" title="Ports">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Port Number</th>
                                    <th>Interface</th>
                                    <th>Bridge</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Dynamic</th>
                                    <th>Disabled</th>
                                    <th>Comment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(ports).map((port, i) => (

                                        <tr key={i}>
                                            <td>{ports[port]['port-number']}</td>
                                            <td>{ports[port]['interface']}</td>
                                            <td>{ports[port]['bridge']}</td>
                                            <td>{ports[port]['status']}</td>
                                            <td>{ports[port]['role']}</td>
                                            <td>{ports[port]['dynamic'] == "false" ?
                                                (<Badge bg="success">
                                                    <MdCheck size={15} />
                                                </Badge>) : (<Badge bg="danger">
                                                    <MdClose size={15} />
                                                </Badge>)}</td>

                                            <td>{ports[port]['disabled'] == "false" ?
                                                (<Badge bg="success">
                                                    False
                                                </Badge>) : (<Badge bg="danger">
                                                    Disabled
                                                </Badge>)}
                                            </td>
                                            <td>{ports[port]['comment']}</td>


                                            <td>
                                                <div>
                                                    <Button href="" variant="info" className="text-white" size="sm">
                                                        <MdClose size={20} /> Disable
                                                    </Button>{" "}

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

export default Interfaces;