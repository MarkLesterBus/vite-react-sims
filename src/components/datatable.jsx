import { useState } from "react";
import Paginate from "./pagination";
import { Table, Spinner, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useStore } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers, removeUser } from "../store/devices/system/voucher";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";



const Datatable = ({ items, headers, items_per_page }) => {

    const { uuid } = useParams();
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();

    let indexOfLastPost = currentPage * items_per_page;
    let indexOfFirstPost = indexOfLastPost - items_per_page;
    let currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <>

            <Table className="mt-2" striped bordered hover>
                <thead>
                    <tr>
                        {Object.keys(headers).map((header, index) => {
                            return (
                                <th key={index}>{headers[header]['title']}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(currentPosts).map((item, index) => ( 

                            <tr key={index}>
                                {Object.keys(headers).map((header, i) => {

                                    var value = headers[header]['value'];
                                    if (value == 'actions') {
                                        return (
                                            <td key={value}>
                                                <div>

                                                    <Button onClick={() => {
                                                        const payload = {
                                                            uuid: uuid,
                                                            id: currentPosts[item]['.id']
                                                        }
                                                        dispatch(removeUser(payload))
                                                        dispatch(getUsers(uuid))

                                                        indexOfLastPost = currentPage * items_per_page;
                                                        indexOfFirstPost = indexOfLastPost - items_per_page;
                                                        currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
                                                    }} variant="danger" size="sm">
                                                        <FaTrash /> Delete
                                                    </Button>

                                                </div>
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td key={value}>{currentPosts[item][value]}</td>
                                        )
                                    }
                                })}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Paginate postsPerPage={items_per_page} totalPosts={items.length} paginate={paginate} />

        </>
    )
}

export default Datatable