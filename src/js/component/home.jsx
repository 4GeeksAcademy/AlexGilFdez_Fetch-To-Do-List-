import React, { useState, useEffect } from "react";

const Home = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/users/alexgilfdez")
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener las tareas");
                return response.json();
            })
            .then((data) => {
                console.log("Datos obtenidos del servidor:", data);
                if (data && Array.isArray(data.todos)) {
                    setTodos(data.todos); 
                } else {
                    console.error("La propiedad `todos` no es un array:", data.todos);
                    setTodos([]); 
                }
            })
            .catch((error) => {
                console.error("Error al cargar las tareas:", error);
                setTodos([]); 
            });
    }, []);
    

    const addTodo = () => {
        if (newTodo.trim() === "") return;

        const newTask = { label: newTodo, is_done: false };

        fetch("https://playground.4geeks.com/todo/todos/alexgilfdez", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al agregar la tarea");
                return response.json();
            })
            .then((createdTask) => {
                setTodos([...todos, createdTask]);
                setNewTodo("");
            })
            .catch((error) => console.error("Error al agregar la tarea:", error));
    };

    const deleteTodo = (todoId) => {
        fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al eliminar la tarea");
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
            })
            .catch((error) => console.error("Error al eliminar la tarea:", error));
    };

    return (
        <div className="text-center container bg-light p-5 mt-5">
            <h1 className="text-center mb-5">To Do List</h1>
            <input
                className="form-control"
                value={newTodo}
                placeholder="Añade tu tarea aquí..."
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && newTodo.trim() !== "") {
                        addTodo();
                    }
                }}
            />
            <ul className="list-group mt-3">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{todo.label}</span>
                        <div>
                            <button
                                className="btn btn-sm "
                                onClick={() => deleteTodo(todo.id)}
                            >
                                x
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-5">
                <p>Tareas pendientes: {todos.length}</p>
            </div>
        </div>
    );
};

export default Home;