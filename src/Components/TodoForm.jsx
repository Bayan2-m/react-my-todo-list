import { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  //لوصف المهمة
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") return;

    addTodo(value, description);
    setValue("");
    setDescription("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What is the task today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

     <div className="description-box">
      <label>Description</label>
       <textarea
        placeholder="Add a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <small>Describe your tesk briefly</small>

     </div>

      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
