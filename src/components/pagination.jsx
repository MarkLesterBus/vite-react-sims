import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ postsPerPage, totalPosts, paginate }) => {
    const [active, setActive] = useState(1)

    let items = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => {
                setActive(i)
                paginate(i)
            }} active={i === active}>
                {i}
            </Pagination.Item>,
        );
    }
    return (
        <Pagination>{items}</Pagination>
    );
};

export default Paginate;


