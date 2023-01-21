import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, getUsers, removeUser, removeUserProfile, reset } from "../../store/devices/system/voucher";
import { Col, Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { FaCogs, FaDoorClosed, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import CreateVoucher from "../../components/voucher-create";
import Datatable from "../../components/datatable";
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
    const headers = [
        { title: 'Name', value: 'name' },
        { title: 'Profile', value: 'profile' },
        { title: 'Limit Uptime', value: 'limit-uptime' },
        { title: 'Uptime', value: 'uptime' },
        { title: 'Limit Bytes Total', value: 'limit-bytes-total' },
        { title: 'Bytes In', value: 'bytes-in' },
        { title: 'Bytes Out', value: 'bytes-out' },
        { title: 'Dynamic', value: 'dynamic' },
        { title: 'Disabled', value: 'disabled' },
        { title: 'Actions', value: 'actions' },
    ]


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
            <section className="container min-vh-100" >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">Vouchers {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <CreateVoucher />
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="users"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-2"
                >
                    <Tab eventKey="users" title="Users">
                        {
                            typeof users === 'object' && users !== null ? <Datatable items={users} headers={headers} items_per_page={15} /> : ''
                        }
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
                                    <th>Rate Limit</th>
                                    <th>On Login</th>
                                    <th>On Logout</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    typeof user_profile === 'object' && user_profile !== null ?
                                        Object.keys(user_profile).map((profile, index) => (

                                            <tr key={index}>
                                                <td>{user_profile[profile]['name']}</td>
                                                <td>{user_profile[profile]['idle-timeoute']}</td>
                                                <td>{user_profile[profile]['keepalive-timeout']}</td>
                                                <td>{user_profile[profile]['status-autorefresh']}</td>
                                                <td>{user_profile[profile]['shared-users']}</td>
                                                <td>{user_profile[profile]['rate-limit']}</td>
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

                                        )) : ''
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