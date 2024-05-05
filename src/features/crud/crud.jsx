import "./crud.scss";
import React, { useEffect, useState, useRef } from "react";

import Title from "../../components/title/title";
import * as services from "../../services/services";

import Form from "../form/form";
import EditItemUI from "../edit-item/edit-item";

const Crud = () => {

    const [success, setSuccess] = useState(false);
    const [backendConnected, setBackendConnected] = useState(true);
    const [error, setError] = useState();
    const [submitting, setSubmitting] = useState();
    // eslint-disable-next-line
    const [loading, setLoading] = useState();
    const successTimeout = useRef();
    const errorTimeout = useRef();
    const [data, setData] = useState(null);
    const [resetInput, setResetInput] = useState(false);
    const [taskCount, setTaskCount] = useState(0);

    // Update the useEffect hook to fetch and update the count of tasks
    useEffect(() => {
        async function countData() {
            try {
                const count = await services._count();
                setTaskCount(count);
            } catch (error) {
                setError(error.message || "Failed to fetch task count.");
                console.log(error);
            }
        }
        countData();
    }, []);


    useEffect(() => {
        readData();
    }, []); // Empty Array ensures the useEffect will only run Once!

    useEffect(() => {
        if (errorTimeout.current) {
            clearTimeout(errorTimeout.current)
        }
        errorTimeout.current = setTimeout(() => {
            setError(false)
        }, 3000)
    }, [error]);

    useEffect(() => {
        if (successTimeout.current) {
            clearTimeout(successTimeout.current)
        }
        successTimeout.current = setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }, [success]);

    // Create
    const handlePOST = async (d) => {
        try {
            setSuccess(false);
            setResetInput(false);
            setError(false);
            setSubmitting(true);
            const res = await services._create(d.task);
            if (res.data?.count === 1) {
                // Task created successfully (count is 1)
                setSuccess(true);
                setResetInput(true);
                // Refresh data by re-fetching from server
                await readData();
                setTaskCount(taskCount + 1);
            } else {
                throw new Error("Failed to create task.");
            }
            setSubmitting(false);
        } catch (err) {
            setSubmitting(false);
            setError(err?.response?.data?.error || "Failed to create task.");
            console.log(err.response);
        }
    }

    // Read
    const readData = async () => {
        try {
            setLoading(true);
            const res = await services._read();
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error);
            setBackendConnected(false);
            console.log(err.response);
        }
    };


    // Update
    const handleChange = async (taskId, newTask) => {
        try {
            const res = await services._update(taskId, newTask);
            console.log("Updated Task:", res.data); // Log the updated task data
            // Update the task in the data state with the new data
            const updatedData = data.map(item => {
                if (item.id === taskId) {
                    return res.data; // Replace the old task with the updated task
                } else {
                    return item;
                }
            });
            setData(updatedData);
            setSuccess(true); // Set success state to true
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error || "Failed to update task.");
            console.log(err.response);
        }
    };


    // Delete
    const deleteData = async (taskId) => {
        try {
            setLoading(true);
            await services._delete(taskId);
            // Remove the deleted task from the data state
            const updatedData = data.filter(item => item.id !== taskId);
            setData(updatedData);
            setTaskCount(taskCount - 1);
            setSuccess(true); // Set success state to true
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error || "Failed to delete task.");
            console.log(err.response);
        }
    };

    if (!backendConnected) {
        return (
            <div style={{ padding: 20 }}>
                <div className="crud-item card margin-bottom-20">
                    <h1 style={{ textAlign: "center" }} >
                        No Backend Connected
                    </h1>
                </div></div>)

    }

    return (
        <div className="crud-page">
            <div className="column">
                <Title title="Count" />
                <div className="task-count">{taskCount}</div>
            </div>
            <div className="column">
                <Title title="Create" />
                <Form className="post-form"
                    resetInput={resetInput}
                    formInputs={
                        [
                            {
                                label: "",
                                type: "text",
                                validation: "task",
                                name: "task",
                                placeholder: "Enter Text"
                            }
                        ]
                    }
                    onSubmit={handlePOST}
                    error={error}
                    // success={success}
                    buttonLabel={submitting ? "Submitting" : "Submit"}
                />
            </div>
            <div className="column">
                <Title title="Read | Update | Delete" />

                {/* The Crud component renders the EditItemUI component multiple times, passing each item object as a prop. */}
                {/* The item object contains the id property, which is passed to the EditItemUI component. */}
                {/* The EditItemUI component can use the id property from the item object for various purposes, such as displaying the task details or handling updates/deletions. */}

                {data?.map((el, i) => (
                    <EditItemUI
                        onChange={(value) => {
                            handleChange(el.id, value);
                        }}
                        onDelete={() => {
                            deleteData(el.id);
                        }}
                        // Pass the whole item object, including the id property
                        item={el}
                        // item={el.task}
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default Crud;