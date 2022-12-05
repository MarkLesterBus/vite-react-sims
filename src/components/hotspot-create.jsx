import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createBridges, getBridges } from "../store/devices/system/bridge";


const CreateHotspot = ({ uuid }) => {
    const [showBridge, setShowBridge] = useState([]);


    const [login_by, setLoginBy] = useState([]);






    const handleBridgeClose = () => setShowBridge(false);


    const handleBridgeShow = () => setShowBridge(true);


    const dispatch = useDispatch();


    const { interfaces, isLoading, isError, message } = useSelector(
        (state) => state.interfaces
    );





    const onChangeLoginBy = (login_by) => {
        setLoginBy((prevState) => [...prevState, login_by]);
    };



    // const onBridgeSubmit = (e) => {
    //     e.preventDefault();

    //     const payload = {
    //         uuid: uuid,
    //         data: {
    //             name: bridge_name
    //         }
    //     };

    //     dispatch(createBridges(payload));
    //     dispatch(getBridges(uuid));
    // }


    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Interface
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleBridgeShow} >Bridge</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showBridge} onHide={handleBridgeClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Server Profile</Modal.Title>
                </Modal.Header>
                <Form >
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="MAC"
                                    type="checkbox"
                                    onClick={(e) => {
                                        onChangeLoginBy('mac')
                                        console.log(login_by)

                                    }}

                                />
                                <Form.Check
                                    inline
                                    label="Cookie"
                                    type="checkbox"
                                    onClick={(e) => {
                                        onChangeLoginBy('cookie')
                                        console.log(login_by)

                                    }}

                                />
                                <Form.Check
                                    inline
                                    label="HTTP CHAP"
                                    type="checkbox"
                                    onClick={(e) => {
                                        onChangeLoginBy('http-chap')
                                        console.log(login_by)

                                    }}


                                />

                                <Form.Check
                                    inline
                                    label="HTTP PAP"
                                    type="checkbox"
                                    onClick={(e) => {
                                        onChangeLoginBy('http-pap')
                                        console.log(login_by)

                                    }}


                                />
                                <Form.Check
                                    inline
                                    onClick={(e) => {
                                        onChangeLoginBy('https')
                                        console.log(login_by)

                                    }}

                                    label="HTTPS"
                                    type="checkbox"

                                />
                                <Form.Check
                                    inline

                                    label="MAC Cookie"
                                    type="checkbox"
                                    onClick={(e) => {
                                        onChangeLoginBy('mac-cookie')
                                        console.log(login_by)

                                    }}


                                />
                                <Form.Check
                                    inline
                                    onClick={(e) => {
                                        onChangeLoginBy('trial')
                                        console.log(login_by)

                                    }}

                                    label="Trial"
                                    type="checkbox"

                                />
                            </div>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleBridgeClose}>
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

export default CreateHotspot;