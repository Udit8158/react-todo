import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { VscCircleLargeOutline } from "react-icons/vsc";

function TodoItem({ todo, isCompleted }) {
  return (
    <div className="flex bg-white p-2 justify-between items-center">
      <div>{todo}</div>
      <div className="flex gap-x-3">
        {isCompleted ? (
          <BsFillCheckCircleFill className="cursor-pointer" />
        ) : (
          <VscCircleLargeOutline className="cursor-pointer" />
        )}
        <MdDelete className="cursor-pointer" />
      </div>
    </div>
  );
}

export default TodoItem;
