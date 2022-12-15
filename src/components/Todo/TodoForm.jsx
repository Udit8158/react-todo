import React from "react";
import { IoMdAdd } from "react-icons/io";

function TodoForm({ submitHandler, text, setText }) {
  return (
    <form className=" flex items-center  gap-3" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter your task"
        className="w-full bg-transparent outline-none border-2  p-2 border-slate-400"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">
        <IoMdAdd className=" text-2xl cursor-pointer " />
      </button>
    </form>
  );
}

export default TodoForm;
