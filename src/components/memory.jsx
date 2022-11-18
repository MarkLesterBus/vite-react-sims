
import { FaCircle } from 'react-icons/fa';
import { PieChart } from 'react-minimal-pie-chart';
const SystemMemory = ({ resources }) => {
    const freeMemory = (parseInt(resources.resource['free-memory']) / 1024) / 1024;
    const totalMemory = (parseInt(resources.resource['total-memory']) / 1024) / 1024;

    const usedMemory = totalMemory - freeMemory;

    const data = [
        { title: 'Free', value: freeMemory, color: '#E38627' },
        { title: 'Used', value: usedMemory, color: '#C13C37' },

    ];
    return (
        <div className="card text-white bg-dark mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">Memory</h5>
                <PieChart
                    data={data}
                    style={{ height: '150px' }}
                />
                <p className="card-text">
                    <span>
                        <FaCircle color='#E38627' /> Free Space: {freeMemory.toFixed(1)} Mb
                    </span>
                    <br />
                    <span>
                        <FaCircle color='#C13C37' /> Used Space: {usedMemory.toFixed(1)} Mb
                    </span>

                </p>
                <p className="card-text"></p>

            </div>
        </div>

    );
}

export default SystemMemory;