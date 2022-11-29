import { useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";
import { FaServer, FaPlus, FaCogs, FaTrash, FaUsers } from "react-icons/fa";
import {
    getLogs,
    reset,
} from "../store/devices/system/system";


const SystemLogs = ({ uuid }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { logs, isLoading, isError, message } = useSelector(
        (state) => state.system
    );
    const temp = logs.slice(Object.keys(logs).length - 10, Object.keys(logs).length);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getLogs(uuid));

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);
    return (
        <div className="card text-black bg-light mb-3" >
            <div className="card-body">
                <h5 className="card-title">Logs</h5>

                <Table className="mt-2" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Message</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(temp).map((log, index) => (
                                <tr key={index}>
                                    <td>{temp[log].topics}</td>
                                    <td>{temp[log].message}</td>
                                    <td>{temp[log].time}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>


            </div>
        </div>

    );
}

export default SystemLogs;