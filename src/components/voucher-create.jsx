import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";


const CreateVoucher = ({ uuid }) => {
    const [showVoucher, setShowVoucher] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const [voucher, setVoucher] = useState({
        name: '',
        password: '',
        voucher_profile: '',
        uptime: '',
        bytes_in: '',
        bytes_out: '',

    })
    const [profile, setProfile] = useState({
        profile_name: '',
        shared_user: '',
        keepalive_timeoout: '',
        status_autorefresh: '',
        on_login: '',
        on_logout: '',
        address_list: '',

    })

    const { name, password, voucher_profile, uptime, bytes_in, bytes_out } = voucher
    const { profile_name, shared_user, keepalive_timeout, status_autorefresh, on_login, on_logout, address_list } = profile



    const handleVoucherClose = () => setShowVoucher(false);
    const handleVoucherShow = () => setShowVoucher(true);

    const handleProfileClose = () => setShowProfile(false);
    const handleProfileShow = () => setShowProfile(true);


    const dispatch = useDispatch();

    const { user_profile, isLoading } = useSelector(
        (state) => state.voucher
    );

    const onChangeVoucher = async (e) => {
        setVoucher((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onChangeProfile = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    // const onProfileSubmit = (e) => {
    //     e.preventDefault();

    //     const payload = {
    //         uuid: uuid,
    //         data: {
    //             name: name,
    //             hotspot_address: hotspot_address,
    //             dns_name: dns_name,
    //             html_directory: html_directory,
    //             login_by: protocol.join(),
    //             http_cookie_lifetime: http_cookie_lifetime,
    //         }
    //     };
    //     dispatch(createHotspotProrile(payload));
    //     dispatch(getHotspot(uuid));
    //     dispatch(getHotspotProfiles(uuid));

    // }
    // const onHotspotSubmit = (e) => {
    //     e.preventDefault();

    //     const payload = {
    //         uuid: uuid,
    //         data: {
    //             name: server_name,
    //             _interface: _interface,
    //             _address_pool: pool,
    //             profile: _profile,
    //             addresses_per_mac: addresses_per_mac,
    //         }
    //     };
    //     console.log(payload)
    //     dispatch(createHotspot(payload));
    //     dispatch(getHotspot(uuid));
    //     dispatch(getHotspotProfiles(uuid));

    // }


    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Voucher
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleProfileShow} >Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleVoucherShow} >Voucher</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showVoucher} onHide={handleVoucherClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Voucher</Modal.Title>
                </Modal.Header>
                <Form onSubmit={''} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="password"
                                name="password"
                                value={password}
                                type="password"
                                placeholder="00000"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile</Form.Label>
                            <Form.Select onChange={onChangeVoucher}
                                id="voucher_profile"
                                name="voucher_profile"
                                value={voucher_profile}
                            >
                                {
                                    Object.keys(user_profile).map((profile, i) => (
                                        <option key={i}>{user_profile[profile]['name']}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Uptime</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="uptime"
                                name="uptime"
                                value={uptime}
                                type="text"
                                placeholder="0w0d0h0m0s"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bytes In</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="byte_in"
                                name="byte_in"
                                value={bytes_in}
                                type="number"
                                placeholder="0MB"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bytes Out</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="bytes_out"
                                name="bytes_out"
                                value={bytes_out}
                                type="number"
                                placeholder="0MB"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleVoucherClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="primary">
                            {isLoading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Save Voucher"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showProfile} onHide={handleProfileClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={''} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="profile_name"
                                name="profile_name"
                                value={profile_name}
                                type="text"
                                placeholder="Profile Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Shared User</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="shared_user"
                                name="shared_user"
                                value={shared_user}
                                type="number"
                                placeholder="Shared User"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Keepalive Timeout</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="keepalive_timeout"
                                name="keepalive_timeout"
                                value={keepalive_timeout}
                                type="text"
                                placeholder="0m"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Keepalive Timeout</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="keepalive_timeout"
                                name="keepalive_timeout"
                                value={keepalive_timeout}
                                type="text"
                                placeholder="0m"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status  Auto-refresh</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="status_autorefresh"
                                name="status_autorefresh"
                                value={status_autorefresh}
                                type="text"
                                placeholder="0m"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>On Login</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="on_login"
                                name="on_login"
                                value={on_login}
                                type="text"
                                as="textarea"
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>On Logout</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="on_logout"
                                name="on_logout"
                                value={on_logout}
                                type="text"
                                as="textarea"
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address List</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="on_logout"
                                name="on_logout"
                                value={on_logout}
                                type="text"
                                as="textarea"
                                placeholder=""
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleProfileClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="primary">
                            {isLoading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Save Profile"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}

export default CreateVoucher;