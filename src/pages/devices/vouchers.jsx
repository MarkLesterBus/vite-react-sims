import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, getUsers, removeUser, removeUserProfile, reset } from "../../store/devices/system/voucher";
import { Col, Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { FaCogs, FaDoorClosed, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
const Vouchers = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(
        (state) => state.auth
    );
    const { users, user_profile, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.voucher
    );
    function bytesForHuman(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

        let i = 0

        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }
        return parseInt(bytes) + ' ' + units[i]
    }
    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getUsers(uuid))
        dispatch(getUserProfile(uuid))

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    return (
        <>
            <section className="container mb-9" >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">Vouchers {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        {/* <CreateHotspot uuid={uuid} /> */}
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="users"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="users" title="Users">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Profile</th>
                                    <th>Uptime</th>
                                    <th>Bytes In</th>
                                    <th>Bytes Out</th>
                                    <th>Packets In</th>
                                    <th>Packets Out</th>
                                    <th>Disabled</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(users).map((user, index) => (

                                        <tr key={index}>
                                            <td>{users[user]['name']}</td>
                                            <td>{users[user]['profile']}</td>
                                            <td>{users[user]['uptime']}</td>
                                            <td>{bytesForHuman(users[user]['bytes-in'])}</td>
                                            <td>{bytesForHuman(users[user]['bytes-out'])}</td>
                                            <td>{bytesForHuman(users[user]['packets-in'])}</td>
                                            <td>{bytesForHuman(users[user]['packets-out'])}</td>
                                            <td>{users[user]['disabled'] == "false" ?
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
                                                            id: users[user]['.id']
                                                        }
                                                        dispatch(removeUser(payload))
                                                        dispatch(getUsers(uuid))

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

                    <Tab eventKey="profile" title="User Profile">
                        <Table className="mt-2" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Idle Timeout</th>
                                    <th>Keepalive Timeout</th>
                                    <th>Status Autorefresh</th>
                                    <th>Shared User</th>
                                    <th>On Login</th>
                                    <th>On Logout</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(user_profile).map((profile, index) => (

                                        <tr key={index}>
                                            <td>{user_profile[profile]['name']}</td>
                                            <td>{user_profile[profile]['idle-timeoute']}</td>
                                            <td>{user_profile[profile]['keepalive-timeout']}</td>
                                            <td>{user_profile[profile]['status-autorefresh']}</td>
                                            <td>{user_profile[profile]['shared-users']}</td>
                                            <td>{user_profile[profile]['on-login']}</td>
                                            <td>{user_profile[profile]['on-logout']}</td>
                                            <td>
                                                <div>

                                                    <Button onClick={() => {
                                                        const payload = {
                                                            uuid: uuid,
                                                            id: user_profile[profile]['.id']
                                                        }
                                                        dispatch(removeUserProfile(payload))
                                                        dispatch(getUserProfile(uuid))

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

export default Vouchers;