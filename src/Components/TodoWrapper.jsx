import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // إضافة مهمة
  const addTodo = (todo, description) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        description: description,
        completed: false,
        isEditing: false,
      },
    ]);

    toast.success("Todo added successfully!");
  };

  // تحديد المهمة كمكتملة / غير مكتملة
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  //فلترة
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    }

    if (filter === "active") {
      return !todo.completed;
    }

    return true;
  });

  // حذف المهمة
  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted!");
    }
  };

  // تفعيل وضع التعديل
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  // تعديل نص المهمة
  const updateTodo = (id, newTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo,
      ),
    );

    toast.success("Todo edited  successfully");
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done</h1>

      <TodoForm addTodo={addTodo} />

      {filteredTodos.map((todo) => (
        <Todo
          task={todo}
          key={todo.id}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          updateTodo={updateTodo}
        />
      ))}

      <div className="filter">
        <button className="btn-filter" onClick={() => setFilter("all")}>
          All
        </button>

        <button className="btn-filter" onClick={() => setFilter("active")}>
          Active
        </button>

        <button className="btn-filter" onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
