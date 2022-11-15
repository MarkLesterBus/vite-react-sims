import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaTachometerAlt, FaTable, FaServer, FaUsers, FaPlus } from 'react-icons/fa';


import { getDevices, reset } from '../../store/devices/deviceSlice';

function Devices() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { token } = useSelector(
        (state) => state.auth
    )
    const { devices, isLoading, isError, message } = useSelector(
        (state) => state.devices
    )


    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!token) {
            navigate('/login')
        }

        dispatch(getDevices())

        return () => {
            dispatch(reset())
        }
    }, [token, dispatch])


    return (
        <section className='container'>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            <FaPlus className='mr-2' />

                            New Device
                        </button>
                    </div>
                </div>

            </div>

            <Col>
                <Table className='mt-2' striped bordered hover>
                    <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Name</th>
                            <th>Host</th>
                            <th>Port</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.uuid}>
                                <td>{device.uuid}</td>
                                <td>{device.name}</td>
                                <td>{device.host}</td>
                                <td>{device.port}</td>
                                <td>
                                    <div>
                                        <Button variant="warning" size="sm">
                                            <FaServer />
                                            Edit
                                        </Button>{' '}
                                        <Button variant="danger" size="sm">
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Col>

        </section>
    )
}

export default Devices;