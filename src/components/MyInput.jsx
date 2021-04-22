import React, { useState } from "react";

const MyInput = ({ placeholder, onClickEnter }) => {
  const [content, setcontent] = useState("");

  const storeContent = (e) => {
    setcontent(e.target.value);
  };

  const enterToSubmit = (e) => {
    if (e.code === "Enter") {
      onClickEnter(content); // 抛出 content 给 父组件
      setcontent("");
    }
  };

  return (
    <input
      value={content}
      onChange={storeContent}
      onKeyDown={enterToSubmit}
      placeholder={placeholder}
    />
  );
};
export default MyInput;
