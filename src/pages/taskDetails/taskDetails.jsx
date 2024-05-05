import "./taskDetails.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import customAxios from "../../services/customAxios";


const TaskDetails = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [task, setTask] = useState({});

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
    )
}

export default TaskDetails;