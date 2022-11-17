
import { FaCircle } from 'react-icons/fa';
import { PieChart } from 'react-minimal-pie-chart';
const SystemStorage = ({ resources }) => {
    const freeStorage = (parseInt(resources.resource['free-hdd-space']) / 1024) / 1024;
    const totalStorage = (parseInt(resources.resource['total-hdd-space']) / 1024) / 1024;

    const usedStorage = totalStorage - freeStorage;

    const data = [
        { title: 'Free', value: freeStorage, color: '#E38627' },
        { title: 'Used', value: usedStorage, color: '#C13C37' },


    ];
    return (
        <div className="card text-white bg-dark mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">Storage</h5>
                <PieChart
                    data={data}
                />
                <p className="card-text">
                    <span>
                        <FaCircle color='#E38627' /> Free Space: {freeStorage.toFixed(1)} Mb
                    </span>
                    <br />
                    <span>
                        <FaCircle color='#C13C37' /> Used Space: {usedStorage.toFixed(1)} Mb
                    </span>


                </p>
                <p className="card-text"></p>

            </div>
        </div>

    );
}

export default SystemStorage;