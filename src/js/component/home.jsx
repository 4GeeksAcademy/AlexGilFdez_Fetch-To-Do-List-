import React, { useState } from "react";

const Home = () => {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([]);

	const addTodo = () => {
		setTodos([...todos, newTodo]);
		setNewTodo("");
	};

	const deleteTodo = (index) => {
		const updatedTodos = [...todos];
		updatedTodos.splice(index, 1);
		setTodos(updatedTodos);
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
				{todos.map((todo, index) => (
					<li
						key={index}
						className="list-group-item d-flex justify-content-between align-items-center "
					>
						{todo}
						<button
							className="btn btn-sm "
							onClick={() => deleteTodo(index)}
							style={{ display: "inline" }}
						>
							x
						</button>
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