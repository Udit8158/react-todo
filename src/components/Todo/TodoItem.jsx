import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { VscCircleLargeOutline } from "react-icons/vsc";

function TodoItem({ todo, isCompleted, id, toggle, setCompletd, deleteTodo }) {
  return (
    <div className="flex bg-white p-2 justify-between items-center">
      <div className={isCompleted ? "font-extralight" : ""}>{todo}</div>
      <div className="flex gap-x-3">
        {isCompleted ? (
          <BsFillCheckCircleFill
            className="cursor-pointer "
            onClick={() => {
              toggle(id);
              setCompletd((prev) => !prev);
            }}
          />
        ) : (
          <VscCircleLargeOutline
            className="cursor-pointer "
            onClick={() => {
              toggle(id);
              setCompletd((prev) => !prev);
            }}
          />
        )}
        <MdDelete
          className="cursor-pointer"
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
    </div>
  );
}

export default TodoItem;
