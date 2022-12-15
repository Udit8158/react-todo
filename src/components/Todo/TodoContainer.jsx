import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import LoadingSpinner from "../UI/LoadingSpinner";

import useDb from "../../hooks/use-db";
import Banner from "../UI/Banner";

function TodoContainer() {
  // states
  const [text, setText] = useState("");
  const [completed, setCompletd] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("react-todo-app")).user;
  // console.log(currentUser);

  const {
    todos,
    loading,
    getData,
    sendData,
    toggle,
    deleteTodo,
    error,
    showBanner,
  } = useDb();

  // console.log(todos);

  // // submit new todo funcion
  const submitHandler = async (event) => {
    event.preventDefault();
    const todoText = text;
    setText("");

    sendData(todoText);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-auto w-5/6 h-[76%] my-12 flex flex-col gap-y-4 overflow-y-auto scroll-m-0 md:w-4/6 lg:w-3/6 ">
      <h1 className="text-xl text-white text-center">
        Welcome {currentUser.displayName}
      </h1>
      <TodoForm setText={setText} text={text} submitHandler={submitHandler} />
      {error && showBanner && <Banner message={error} color="red" />}
      {loading && !error && <LoadingSpinner />}
      {!loading &&
        todos.map((t) => {
          return (
            <TodoItem
              key={t.id}
              todo={t.todo}
              isCompleted={t.isCompleted}
              id={t.id}
              toggle={toggle}
              completed={completed}
              setCompletd={setCompletd}
              deleteTodo={deleteTodo}
            />
          );
        })}
    </div>
  );
}

export default TodoContainer;
