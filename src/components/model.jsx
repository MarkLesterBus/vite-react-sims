
import { Row, Col } from "react-bootstrap";
import { FaServer } from "react-icons/fa";
const SystemModel = ({ resources }) => {

    return (
        <div className="card text-black bg-light mb-3" >
            <div className="card-body">
                <Row>
                    <Col md={3} sm={3} className="d-flex align-items-center">
                        <FaServer size={50} />
                    </Col>
                    <Col md={9} sm={9}>
                        <h6 className="card-title">{resources.resource['platform']} - {resources.resource['board-name']}</h6>
                        <p className="card-subtitle">{`${resources.resource['version']} `}</p>
                        <p className="card-text">{resources.resource['architecture-name']}</p>
                    </Col>
                </Row>

            </div>
        </div>
    );
}

export default SystemModel;