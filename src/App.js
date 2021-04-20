import React, { useState } from "react";

/**
 * 待办事项的类
 */
class TodoItem {
  id; // ID
  content; // 待办事项的内容

  constructor(content) {
    this.id = Math.random(); // 使用随机数来作为ID，只要不重复就好
    this.content = content;
  }
}

function App() {
  const [todoItems, settodoItems] = useState([]); // 存放待办事项数组
  const [newTodoContent, setnewTodoContent] = useState(""); //存放当前 新输入待新增 的待办事项

  /**
   * 把一条新输入的待办事项内容添加到待办事项列表中
   * @param {string} todoContent 待办事项内容
   */
  const addTodoItem = (todoContent) => {
    const newTodoItem = new TodoItem(todoContent);
    settodoItems((pre) => {
      return [...pre, newTodoItem];
    });
  };

  /**
   * 回车时触发存储一条新的待办事项到列表中
   * @param {object} e 事件
   */
  const enter2Add = (e) => {
    if (e.code === "Enter") {
      addTodoItem(newTodoContent);
      setnewTodoContent("");
    }
  };

  return (
    <div>
      <input
        style={{ width: 300 }}
        placeholder="请输入待办事项，回车提交"
        value={newTodoContent}
        onChange={(e) => setnewTodoContent(e.target.value)}
        onKeyUp={enter2Add}
      />

      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
