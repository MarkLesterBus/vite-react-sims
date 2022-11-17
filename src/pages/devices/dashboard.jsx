import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getResources, reset } from "../../store/devices/system/systemSlice";
import { Row, Col } from "react-bootstrap";
import SystemTime from "../../components/system-time";
import SystemCPU from "../../components/cpu";
import SystemMemory from "../../components/memory";
import SystemStorage from "../../components/storage";
import SystemModel from "../../components/model";
import SystemUptime from "../../components/uptime";
import SystemTraffic from "../../components/traffice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uuid } = useParams();

  const { token } = useSelector(
    (state) => state.auth
  );
  const { resources, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.system
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!token) {
      navigate("/login");
    }

    const timer = setTimeout(() => {
      dispatch(getResources(uuid));
    }, 500);

    return () => clearTimeout(timer);

  }, [resources, dispatch]);

  return (
    <section className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
        </div>
      </div>
      <Row>
        <Col lg={3} md={3} sm={6}>
          <SystemTime resources={resources} />
          <SystemCPU resources={resources} />
        </Col>
        <Col lg={3} md={3} sm={3}>
          <SystemUptime resources={resources} />
          <SystemModel resources={resources} />
        </Col>

        <Col>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <SystemStorage resources={resources} />

            </Col>
            <Col lg={6} md={6} sm={6}>
              <SystemMemory resources={resources} />

            </Col>
          </Row>
        </Col>



      </Row>
      <SystemTraffic />

    </section>
  );
};

export default Dashboard;
