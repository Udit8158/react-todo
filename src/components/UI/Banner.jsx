import React from "react";

function Banner({ message, color }) {
  return (
    <div
      className={`absolute w-screen left-0 top-0 p-6 text-white text-2xl bg-${color}-700`}
    >
      {message}
    </div>
  );
}

export default Banner;
