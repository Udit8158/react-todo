import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import LoadingSpinner from "../UI/LoadingSpinner";

function TodoContainer() {
  // auth context
  const authCtx = useContext(AuthContext);
  const uuid = authCtx.uuid;
  const url = `https://react-todo-d0ffe-default-rtdb.firebaseio.com/users/${uuid}/todos.json`;

  // states
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // Fetch func
  const fetchTodo = async () => {
    setLoading(true);

    const res = await fetch(url);

    if (!res.ok) {
      new Error("Something Went Wrong !");
      setLoading(false);
    } else {
      const data = await res.json();
      let arr = [];

      setLoading(false);

      for (const key in data) {
        arr.push({
          id: key,
          todo: data[key].todo,
          isCompleted: data[key].isCompleted,
        });
      }
      setTodos(arr);

      // console.log(todos);
    }
  };

  // submit new todo funcion
  const submitHandler = async (event) => {
    event.preventDefault();
    setText("");

    const todoText = text;

    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todoText, isCompleted: false }),
    });

    if (!req.ok) {
      setError({ msg: "Something Went Wrong !" });
    } else {
      const res = await req.json();
      // console.log(res);
    }

    try {
      fetchTodo();
    } catch (err) {
      setError({ msg: err.message });
    }
  };

  useEffect(() => {
    try {
      fetchTodo();
    } catch (err) {
      console.log(err.message);
      setError("Some thing went wrong");
    }
  }, []);
  return (
    <div className="mx-auto w-5/6 my-12 flex flex-col gap-y-4 md:w-4/6 lg:w-3/6 ">
      <TodoForm setText={setText} text={text} submitHandler={submitHandler} />
      {console.log(error)}
      {loading && <LoadingSpinner />}
      {!loading &&
        todos.map((t) => {
          return (
            <TodoItem key={t.id} todo={t.todo} isCompleted={t.isCompleted} />
          );
        })}
    </div>
  );
}

export default TodoContainer;
