import { FaEdit, FaTrash } from "react-icons/fa";

export const Todo = ({
  task,
  toggleCompleted,
  deleteTodo,
  editTodo,
  updateTodo,
}) => {
  return (
    <div className="Todo">
      {task.isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            defaultValue={task.task}
            className="todo-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTodo(task.id, e.target.value);
              }
            }}
          />

          <button
            className="todo-btn"
            onClick={(e) => {
              const input = e.target.parentElement.querySelector("input");
              updateTodo(task.id, input.value);
            }}
          >
            Update
          </button>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <p
              className={task.completed ? "completed" : ""}
              onClick={() => toggleCompleted(task.id)}
            >
              {task.task}
            </p>

            <p className="todo-description">{task.description}</p>
          </div>

          <div className="todo-actions">
            <FaEdit onClick={() => editTodo(task.id)} />
            <FaTrash onClick={() => deleteTodo(task.id)} />
          </div>
        </>
      )}
    </div>
  );
};
