import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createHotspot, createHotspotProrile, getHotspotProfiles, getHotspot } from "../store/devices/system/hotspot";


const CreateHotspot = ({ uuid }) => {
    const [showHotspot, setShowHotspot] = useState(false);
    const [showProfile, setShowprofile] = useState(false);
    const [protocol, setProtocol] = useState([]);


    const [profile, setProfile] = useState({
        name: '',
        hotspot_address: '',
        dns_name: '',
        html_directory: '',
        http_cookie_lifetime: ''
    });

    const [server, setServer] = useState({
        server_name: '',
        _interface: '',
        pool: '',
        _profile: '',
        addresses_per_mac: '2',
    })

    const { name, hotspot_address, dns_name, html_directory, http_cookie_lifetime } = profile
    const { server_name, _interface, pool, _profile, addresses_per_mac } = server



    const handleProfileClose = () => setShowprofile(false);
    const handleProfileShow = () => setShowprofile(true);

    const handleHotspotClose = () => setShowHotspot(false);
    const handleHotspotShow = () => setShowHotspot(true);


    const dispatch = useDispatch();


    const { interfaces } = useSelector(
        (state) => state.interfaces
    );
    const { pools } = useSelector(
        (state) => state.ip
    );
    const { hotspot_profiles, isLoading } = useSelector(
        (state) => state.hotspot
    );


    const onChangeLoginBy = async (e) => {
        if (e.target.checked) {
            setProtocol(protocol => [...protocol, e.target.name])
        } else {
            setProtocol(protocol => protocol.filter((item) => item !== e.target.name))

        }
    };

    const onChangeProfile = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangeHotspot = (e) => {
        setServer((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onProfileSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: name,
                hotspot_address: hotspot_address,
                dns_name: dns_name,
                html_directory: html_directory,
                login_by: protocol.join(),
                http_cookie_lifetime: http_cookie_lifetime,
            }
        };
        dispatch(createHotspotProrile(payload));
        dispatch(getHotspot(uuid));
        dispatch(getHotspotProfiles(uuid));

    }
    const onHotspotSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: server_name,
                _interface: _interface,
                _address_pool: pool,
                profile: _profile,
                addresses_per_mac: addresses_per_mac,
            }
        };
        console.log(payload)
        dispatch(createHotspot(payload));
        dispatch(getHotspot(uuid));
        dispatch(getHotspotProfiles(uuid));

    }


    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Hotspot
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* <Dropdown.Item onClick={handleHotspotShow} >Hotspot</Dropdown.Item> */}
                    <Dropdown.Item onClick={handleProfileShow} >Profile</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showProfile} onHide={handleProfileClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Server Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onProfileSubmit} >
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Login By</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="MAC"
                                    id="mac"
                                    name="mac"
                                    type="checkbox"
                                    onChange={onChangeLoginBy}
                                />
                                <Form.Check
                                    inline
                                    label="Cookie"
                                    name="cookie"
                                    onChange={onChangeLoginBy}
                                    type="checkbox"
                                />
                                <Form.Check
                                    inline
                                    label="HTTP CHAP"
                                    type="checkbox"
                                    name="http-chap"
                                    onChange={onChangeLoginBy}
                                />

                                <Form.Check
                                    inline
                                    label="HTTP PAP"
                                    type="checkbox"
                                    name="http-pap"
                                    onChange={onChangeLoginBy}
                                />
                                <Form.Check
                                    inline
                                    name="https"
                                    onChange={onChangeLoginBy}
                                    label="HTTPS"
                                    type="checkbox"

                                />
                                <Form.Check
                                    inline

                                    label="MAC Cookie"
                                    type="checkbox"
                                    name="mac-cookie"
                                    onChange={onChangeLoginBy}
                                />
                                <Form.Check
                                    inline
                                    name="trial"
                                    onChange={onChangeLoginBy}
                                    label="Trial"
                                    type="checkbox"
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hotspot Address</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="hotspot_address"
                                name="hotspot_address"
                                value={hotspot_address}
                                type="text"
                                placeholder="0.0.0.0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hotspot Address</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="dns_name"
                                name="dns_name"
                                value={dns_name}
                                type="text"
                                placeholder="server.example.net"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hotspot Address</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="html_directory"
                                name="html_directory"
                                value={html_directory}
                                type="text"
                                placeholder="flash/example"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>HTTP Cookie Lifetime</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="http_cookie_lifetime"
                                name="http_cookie_lifetime"
                                value={http_cookie_lifetime}
                                type="text"
                                placeholder="3d"
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
            {/* <Modal show={showHotspot} onHide={handleHotspotClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Server</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onHotspotSubmit} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeHotspot}
                                id="server_name"
                                name="server_name"
                                value={server_name}
                                type="text"
                                placeholder="Server Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Interface</Form.Label>
                            <Form.Select onChange={onChangeHotspot}
                                id="_interface"
                                name="_interface"
                                value={_interface}
                            >
                                {
                                    Object.keys(interfaces).map((iface, i) => (
                                        <option key={i}>{interfaces[iface]['name']}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address Pool</Form.Label>
                            <Form.Select onChange={onChangeHotspot}
                                id="pool"
                                name="pool"
                                value={pool}
                            >
                                {
                                    Object.keys(pools).map((pool, i) => (
                                        <option key={i}>{pools[pool]['name']}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile</Form.Label>
                            <Form.Select onChange={onChangeHotspot}
                                id="_profile"
                                name="_profile"
                                value={_profile}
                            >
                                {
                                    Object.keys(hotspot_profiles).map((prof, i) => (
                                        <option key={i}>{hotspot_profiles[prof]['name']}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address per MAC</Form.Label>
                            <Form.Control
                                onChange={onChangeHotspot}
                                id="addresses_per_mac"
                                name="addresses_per_mac"
                                value={addresses_per_mac}
                                type="text"
                                placeholder="server.example.net"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleHotspotClose}>
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
            </Modal> */}

        </div>
    );

}

export default CreateHotspot;