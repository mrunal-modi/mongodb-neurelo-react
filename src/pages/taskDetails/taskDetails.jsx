// TaskDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import customAxios from "../../services/customAxios";
import "./taskDetails.scss"; // Import your SCSS file

const TaskDetails = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [task, setTask] = useState({});

    // The TaskDetails component uses the id to fetch the task details from the server.
    useEffect(() => {
        const fetchTaskDetails = async () => {
            setIsLoading(true);
            try {
                const response = await customAxios.get(`/${id}`);
                setTask(response.data.data || {});
            } catch (err) {
                console.error(
                    "Error fetching task details:",
                    err.response ? err.response.data : err.message
                );
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTaskDetails();
    }, [id]);

    if (isLoading) {
        return <p>Loading task details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="table-container"> {/* Add the container class here */}
            <table>
                <tbody>
                    {Object.entries(task).map(([key, value]) => (
                        <tr key={key}>
                            <th>{key}</th>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskDetails;
