import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // Delete function
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
                // Include credentials to send session cookies
            });
            if (!response.ok) {
                throw new Error(`Failed to delete. Status: ${response.status}, Message: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Delete result:', result);
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error("Error deleting todo: ", err.message);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos", {
                credentials: 'include'
            });
            const jsonData = await response.json();
            console.log("Fetched todos:", jsonData); // Log fetched data for debugging
    
            // Ensure that jsonData is an array
            setTodos(Array.isArray(jsonData) ? jsonData : []);
        } catch (err) {
            console.error("Error fetching todos:", err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <table className="table table-striped mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;
