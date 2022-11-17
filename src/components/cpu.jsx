
import { Row, Col } from "react-bootstrap";
import { FaClock, FaMicrochip } from "react-icons/fa";
const SystemCPU = ({ resources }) => {

    return (
        <div className="card text-white bg-dark mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-body">
                <Row>
                    <Col sm={3} className="d-flex align-items-center">
                        <FaMicrochip size={50} />
                    </Col>
                    <Col sm={9}>
                        <h6 className="card-title">CPU {resources.resource['cpu']}</h6>
                        <p className="card-subtitle">CPU {resources.resource['cpu-load']} % / {`${resources.resource['cpu-frequency']} Mhz`} </p>
                        <p className="card-text"> {`${resources.resource['cpu-count']} Cores`}</p>
                    </Col>
                </Row>

            </div>
        </div>

    );
}

export default SystemCPU;