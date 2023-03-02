import axios from "axios";
import React, { useState } from "react";

const TodoList = ({ todos, setList, notify }) => {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(5);
  const [editableIndex, setEditableIndex] = useState("");

  const [updateTitleTodo, setUpdateTitleTodo] = useState("");

  const getItemsForPage = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return todos.slice(startIndex, endIndex);
  };

  let itemsToDisplay = getItemsForPage(currentPage);

  const paginator = [];

  for (let i = start; i <= end; i++) {
    let pageIndex = i;
    const isActive = pageIndex === currentPage;
    const html = (
      <li key={`btn-${pageIndex}`} className="page-item  ms-1">
        <button
          className={isActive ? `btn active btn-primary` : "btn"}
          value={pageIndex}
          onClick={(e) => setCurrentPage(+e.target.value)}
        >
          {pageIndex}
        </button>
      </li>
    );
    paginator.push(html);
  }

  if (currentPage > end) {
    setStart(start + 5);
    setEnd(end + 5);
  }

  if (currentPage < start) {
    setStart(start - 5);
    setEnd(end - 5);
  }

  const handleStatusChange = (todo) => {
    todo = JSON.parse(todo);
    todos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setList([...todos]);
  };
  const handleDeleteChange = (todo) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/1", {})
      .then(function (response) {
        if (response.status === 200) {
          todo = JSON.parse(todo);
          todos = todos.filter((t) => t.id !== todo.id);
          notify(`${todo.title} \ndeleted successfully`);
          setList([...todos]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTitleUpdate = (newTitle) => {
    const todo = JSON.parse(updateTitleTodo);
    todos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: newTitle };
      }
      return t;
    });
    setList([...todos]);
  };

  return (
    <div className="position-relative">
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <p className="w-75">Title</p>
          <p>Completed</p>
          <p>&nbsp;&nbsp;</p>
          <p>Remove</p>
        </li>

        {itemsToDisplay.map((todo, index) => (
          <li
            key={`todo-${index + 1}`}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <input
              type="text"
              className={`${
                index === editableIndex ? "" : "form-control-plaintext"
              } w-75`}
              value={todo.title}
              readOnly={index !== editableIndex}
              onChange={(e) => handleTitleUpdate(e.target.value)}
              onBlur={() => setEditableIndex("")}
            />
            <input
              type="checkbox"
              value={JSON.stringify(todo)}
              checked={todo.completed}
              onChange={(e) => {
                handleStatusChange(e.target.value);
              }}
            />
            <button
              value={JSON.stringify(todo)}
              className="btn btn-danger"
              onClick={(e) => {
                setEditableIndex(index);
                setUpdateTitleTodo(e.target.value);
              }}
            >
              edit
            </button>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              value={JSON.stringify(todo)}
              onClick={(e) => {
                handleDeleteChange(e.target.value);
              }}
            ></button>
          </li>
        ))}
      </ul>
      <br />
      <nav aria-label="..." className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn btn-primary"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
            >
              Previous
            </button>
          </li>
          {paginator}
          <li className="page-item ms-1">
            <button
              className="btn btn-primary"
              onClick={() =>
                setCurrentPage(
                  currentPage + 1 > totalPages ? totalPages : currentPage + 1
                )
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TodoList;
