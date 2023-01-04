import { NavLink } from "react-router-dom";
import { FaPlus, FaServer, FaUsers } from "react-icons/fa";

const Accounts = () => {
  return (
  

      <section className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Accounts</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                // onClick={handleShow}
                className="btn btn-sm btn-outline-secondary"
              >
                <FaPlus className="mr-2" />
                New Account
              </button>
            </div>
          </div>
        </div>
      </section>
    
  );
};

export default Accounts;
