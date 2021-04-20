import React, { useState } from "react";

/**
 * 待办事项的类
 */
class TodoItem {
  id; // ID
  content; // 待办事项的内容
  complete; // 待办事项是否完成
  match; // 待办事项是否被筛选出来

  constructor(content) {
    this.id = Math.random(); // 使用随机数来作为ID，只要不重复就好
    this.content = content;
    this.complete = false;
    this.match = true;
  }
}

function App() {
  const [todoItems, settodoItems] = useState([]); // 存放待办事项数组
  const [newTodoContent, setnewTodoContent] = useState(""); //存放当前 新输入待新增 的待办事项
  const [keyword, setkeyword] = useState(""); //搜索的关键字

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

  /**
   * 过滤待办事项
   * @param {object} e 事件
   */
  const handleFilter = (e) => {
    if (e.code === "Enter") {
      const newTodoItems = todoItems.map((item) => {
        item.match = item.content.indexOf(keyword) > -1;
        return item;
      });
      settodoItems(newTodoItems);
    }
  };

  /**
   * 切换完成与否的状态
   * @param {number} id
   */
  const toggleComplete = (id) => {
    const newTodoItems = todoItems.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    settodoItems(newTodoItems);
  };

  /**
   * 删除一条待办事项
   * @param {number} id
   */
  const handleDelete = (id) => {
    const newTodoItems = todoItems.filter((item) => item.id !== id);
    settodoItems(newTodoItems);
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

      <table>
        <caption>
          <span>待办事项列表</span>

          <input
            placeholder="输入关键字搜索待办事项"
            value={keyword}
            onChange={(e) => setkeyword(e.target.value)}
            onKeyUp={handleFilter}
          />
        </caption>

        <thead>
          <tr>
            <th>待办事项</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {todoItems
            .filter((item) => item.match)
            .map((item) => (
              <tr key={item.id}>
                <td
                  style={{
                    textDecoration: item.complete ? "line-through" : "none",
                  }}
                >
                  {item.content}
                </td>

                <td>
                  <button onClick={() => handleDelete(item.id)}>删除</button>
                  <button onClick={() => toggleComplete(item.id)}>
                    {item.complete ? "未完成" : "完成"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
