import React from "react";

function Banner({ message, color }) {
  return (
    <div
      className={`absolute w-screen left-0 top-0 p-6 text-white text-2xl ${
        color === "red" ? "error" : "success"
      }`}
    >
      {message}
    </div>
  );
}

export default Banner;
