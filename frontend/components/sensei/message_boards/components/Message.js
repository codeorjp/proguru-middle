import React from "react";
import moment from "moment";

const Message = ({ message, handleOnDelete, handleCheck, isChecked }) => {
  const displaySentAt = (sentAt) => {
    const date = moment(sentAt * 1000).format("YYYY/MM/DD HH:mm:ss");
    return date;
  };

  const displayContent = (msg) => {
    if (msg.body) {
      return msg.body;
    } else if (msg.image_url) {
      return (
        <a href={msg.image_url} target="_blank" rel="noopener noreferrer">
          <img src={msg.image_url} alt="" width="100" height="100" />
        </a>
      );
    } else {
      return "この画像は表示できません";
    }
  };

  return (
    <tr key={message.id}>
      <td>
        <input
          type="checkbox"
          id={message.id}
          checked={isChecked}
          onChange={handleCheck}
        />
      </td>
      <td>{message.sender_number}</td>
      <td>{message.nickname}</td>
      <td>{displaySentAt(message.sent_at)}</td>
      <td>{displayContent(message)}</td>
      <td className="icon-btn">
        <button type="button" onClick={() => handleOnDelete(message.id)}>
          <i className="bi bi-trash-fill" />
        </button>
      </td>
    </tr>
  );
};

export default Message;
