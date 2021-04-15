import React, { useState } from "react";

function App() {
  const [todoItems, settodoItems] = useState([]);
  const [newItem, setnewItem] = useState({});

  const storeTodoItem = (e) => {
    const value = e.target.value;
    setnewItem({
      content: value,
      id: Array.from(todoItems).length,
    });
  };

  const addTodoItem = () => {
    // 把 newItem 放到 todoItems
    const copyTodoItems = Array.from(todoItems);
    copyTodoItems.push(newItem);

    settodoItems(copyTodoItems);
  };

  return (
    <div>
      <input onChange={storeTodoItem} />
      <button onClick={addTodoItem}>添加待办事项</button>

      <ul>
        {todoItems.map((todoItem) => (
          <li>
            {todoItem.id}、{todoItem.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
