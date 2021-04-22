import React, { useState } from "react";

const TodoList = ({
  todoItems,
  onClickEditBtn,
  onClickDeleteBtn,
  onClickCompleteBtn,
  onEditSubmit,
}) => {
  const [editContent, seteditContent] = useState("");

  const handleEditBtnClick = (id, content) => {
    onClickEditBtn(id); // 抛数据给父组件
    seteditContent(content);
  };

  /**
   * 渲染当前待办事项
   * @param {object} curItem 当前待办事项
   * @returns
   */
  const renderCurTodoItem = (curItem) => {
    if (curItem.show) {
      return (
        <tr key={curItem.id}>
          <td>
            {curItem.edit ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => seteditContent(e.target.value)}
                />
                <button onClick={() => onEditSubmit(curItem.id, editContent)}>
                  提交
                </button>
              </>
            ) : (
              <span
                style={{
                  textDecoration: curItem.complete ? "line-through" : "none",
                }}
              >
                {curItem.content}
              </span>
            )}
          </td>
          <td>
            <button
              onClick={() => handleEditBtnClick(curItem.id, curItem.content)}
            >
              编辑
            </button>
            <button onClick={() => onClickDeleteBtn(curItem.id)}>删除</button>
            <button onClick={(e) => onClickCompleteBtn(curItem.id)}>
              {curItem.complete ? "未完成" : "完成"}
            </button>
          </td>
        </tr>
      );
    }
  };

  return (
    <table>
      <caption style={{ fontSize: 18 }}>待办事项列表</caption>
      <thead>
        <tr>
          <th scope="col">待办事项</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>{todoItems.map(renderCurTodoItem)}</tbody>
    </table>
  );
};

export default TodoList;
