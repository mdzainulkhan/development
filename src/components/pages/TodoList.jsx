import { useEffect, useState } from "react";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const getDateTime = () => {
    return new Date().toLocaleString("en-GB");
  };

  const handleAddTodo = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError("Please enter a task");
      return;
    }

    const isDuplicate = todos.some(
      (todo, index) =>
        todo.text.toLowerCase() === trimmedValue.toLowerCase() &&
        index !== editIndex
    );

    if (isDuplicate) {
      setError("This task already exists");
      return;
    }

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex
          ? {
              ...todo,
              text: trimmedValue,
              date: getDateTime(),
            }
          : todo
      );

      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      const newTodo = {
        text: trimmedValue,
        date: getDateTime(),
      };

      setTodos([...todos, newTodo]);
    }

    setInputValue("");
    setError("");
  };

  const handleDeleteTodo = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!isConfirmed) return;

    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);

    if (editIndex === index) {
      setEditIndex(null);
      setInputValue("");
    }
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
      <div className="w-full max-w-xl rounded-2xl p-6 card-3d">
        <h1 className="text-2xl font-bold neon">Todo List</h1>

        <div className="flex justify-between mt-2 gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-3 rounded-lg bg-white/10 placeholder-white/60 text-white outline-none"
            type="text"
            placeholder="Add your todo list"
          />

          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg shadow-md cursor-pointer"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        {error && <p className="text-red-400 mt-2">{error}</p>}
        <h3 className="text-white text-xl mt-3">Tasks</h3>
        <div className="mb-4 overflow-x-auto max-h-1/12">
          <table className="w-full text-left text-white">
            <thead>
              <tr>
                <th className="border-b-2 border-amber-50 py-2">S.No</th>
                <th className="border-b-2 border-amber-50 py-2">Task</th>
                <th className="border-b-2 border-amber-50 py-2">Date & Time</th>
                <th className="border-b-2 border-amber-50 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={index}>
                  <td className="border-b border-amber-50 py-2">{index + 1}</td>
                  <td className="border-b border-amber-50 py-2">{todo.text}</td>
                  <td className="border-b border-amber-50 py-2">{todo.date}</td>
                  <td className="border-b border-amber-50 py-2">
                    <div className="flex">
                      <button
                        onClick={() => handleEditTodo(index)}
                        className="px-3 py-1 bg-green-500 text-white rounded-sm mr-2 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {todos.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No tasks added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}