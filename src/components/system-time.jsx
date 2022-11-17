
import { Row, Col } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
const SystemTime = ({ resources }) => {

    return (
        <div className="card text-white bg-dark mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-body">
                <Row>
                    <Col md={3} sm={3} className="d-flex align-items-center">
                        <FaClock size={50} />
                    </Col>
                    <Col md={9} sm={9}>
                        <h6 className="card-title">T {resources.clock.time}</h6>
                        <p className="card-subtitle">{`${resources.clock['time-zone-name']} ${resources.clock['gmt-offset']} `}</p>
                        <p className="card-text">{resources.clock.date}</p>
                    </Col>
                </Row>

            </div>
        </div>

    );
}

export default SystemTime;