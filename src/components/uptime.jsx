
import { Row, Col } from "react-bootstrap";
import { FaServer, FaToolbox, FaTools } from "react-icons/fa";
const SystemUptime = ({ resources }) => {

    return (
        <div className="card text-white bg-dark mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-body">
                <Row>
                    <Col md={3} sm={3} className="d-flex align-items-center">
                        <FaTools size={50} />
                    </Col>
                    <Col md={9} sm={9}>
                        <h6 className="card-title">Uptime {resources.resource['uptime']}</h6>
                        <p className="card-subtitle">Build Time</p>
                        <p className="card-text">{resources.resource['build-time']}</p>
                    </Col>
                </Row>

            </div>
        </div>

    );
}

export default SystemUptime;