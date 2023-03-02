import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./componenets/AddTodo";
import Error from "./componenets/Error";
import Header from "./componenets/Header";
import Loading from "./componenets/Loading";
import TodoList from "./componenets/TodoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [list, setList] = useState([]);
  const [apiError, setApiError] = useState(false);

  const notify = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setList(response.data);
        setApiError(false);
      })
      .catch((json) => setApiError(true));
  }, []);

  if (apiError) return <Error />;

  return (
    <div className="App">
      <Header />
      <AddTodo setList={setList} id={list.length + 1} notify={notify} />
      {list.length > 0 ? (
        <div className="w-75 p-3 mx-auto">
          <TodoList todos={list} setList={setList} notify={notify} />{" "}
        </div>
      ) : (
        <Loading />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
