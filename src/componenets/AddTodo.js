import axios from "axios";
import React, { useState } from "react";

const AddTodo = ({ setList, id, notify }) => {
  const [newTitle, setNewTitle] = useState("");

  const submitForm = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        body: JSON.stringify({
          title: title,
          body: "",
          userId: 1,
        }),
      })
      .then(function (response) {
        if (response.status === 201) {
          const data = {
            title,
            id,
            userId: 1,
            completed: false,
          };
          setNewTitle("");
          setList((prevState) => [data, ...prevState]);
          notify("added successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(newTitle);
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="enter title to add"
            value={newTitle ?? ""}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            disabled={!newTitle}
            className="btn btn-primary mb-3"
          >
            Add to TodoList
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
