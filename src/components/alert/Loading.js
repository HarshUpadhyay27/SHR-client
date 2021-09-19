import React from "react";

const Loading = () => {
  return (
    <div className="position-fixed w-100 h-100 text-center loading">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
