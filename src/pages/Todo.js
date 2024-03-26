import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faPen,
  faArrowRight,
  faTrashCan,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title: title,
      content: content,
    };

    const token = localStorage.getItem("token");

    fetch("https://todoapi-atu2.onrender.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("the saved data", data.savedTodo);
        setTodos([...todos, data.savedTodo]);
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
        alert("An error occurred while creating todo. Please try again.");
      });
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn || loggedIn !== "true") {
      navigate("/login");
    } else {
      const token = localStorage.getItem("token");

      fetch("https://todoapi-atu2.onrender.com/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setTodos(data);
        })
        .catch((error) => {
          console.error("Error fetching todos:", error);
          alert(
            "An error occurred while fetching todos. Please try again later."
          );
        });
    }
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    fetch(`https://todoapi-atu2.onrender.com/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        // Use the functional form of setTodos to ensure immutability
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        alert("An error occurred while deleting todo. Please try again.");
      });
  };

  const handleRight = (id) => {
    const token = localStorage.getItem("token");

    const updatedTodo = {
      completed: "true",
    };

    fetch(`https://todoapi-atu2.onrender.com/todos/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        // Use the functional form of setTodos to ensure immutability
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        alert("An error occurred while updating todo. Please try again.");
      });
  };

  const handleEdits = (id) => {
    const selectedTodo = todos.find((todo) => todo._id === id);
    setTitle(selectedTodo.title);
    setContent(selectedTodo.content);
    setSelectedTodoId(id);
  };

  const update = () => {
    if (!selectedTodoId) {
      return;
    }

    const updatedTodo = {
      title: title,
      content: content,
    };
    const token = localStorage.getItem("token");

    fetch(`https://todoapi-atu2.onrender.com/todos/${selectedTodoId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo._id === selectedTodoId ? { ...todo, ...updatedTodo } : todo
        );
        setTodos(updatedTodos);
        setTitle("");
        setContent("");
        setSelectedTodoId(null); // Reset selected todo ID
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        alert("An error occurred while updating todo. Please try again.");
      });
  };

  const handleDone = (id) => {
    const token = localStorage.getItem("token");

    const updatedTodo = {
      completed: "false",
    };

    fetch(`https://todoapi-atu2.onrender.com/todos/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        alert("An error occurred while updating todo. Please try again.");
      });
  };

  return (
    <div className="main">
      <form className="submitContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="title"
          placeholder="title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="content"
          placeholder="content.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {selectedTodoId && ( // Render update button only when a todo is selected
          <button type="button" className="create" onClick={update}>
            Update
          </button>
        )}
        <button type="submit" className="create">
          CREATE a todo
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </form>
      <div className="todo-item">
        <label className="headings">
          <h2>All todos</h2>
        </label>
        {todos
          .filter((todo) => !todo.completed)
          .map((todoItem) => (
            <div className="aTodo" key={todoItem._id}>
              <h3>{todoItem.title}</h3>
              <p>{todoItem.content}</p>
              <div className="icons">
                <button onClick={() => handleEdits(todoItem._id)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="close"
                  onClick={() => handleDelete(todoItem._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button onClick={() => handleRight(todoItem._id)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="completed-todo-item">
        <label className="headings">
          <h2>Done</h2>
        </label>
        {todos
          .filter((todo) => todo.completed)
          .map((todoItem) => (
            <div className="aTodo" key={todoItem._id}>
              <h3>{todoItem.title}</h3>
              <p>{todoItem.content}</p>
              <div className="icons">
                <button onClick={() => handleEdits(todoItem._id)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="close"
                  onClick={() => handleDelete(todoItem._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button onClick={() => handleDone(todoItem._id)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;

