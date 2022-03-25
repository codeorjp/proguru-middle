import React, { useState, useEffect } from "react";
import axios from "common/utils/axios";
import _ from "lodash";
import update from "immutability-helper";
import ReactPaginate from "react-paginate";
import Message from "./Message";
import messageBoardStyles from "../styles/MessageBoard.scss";
import paginationStyles from "../styles/Pagination.scss";

const MessageBoard = ({ classRoomId, kind }) => {
  let interval;
  const messagesPerPage = 50;
  const initialPage = 0;
  const [messages, setMessages] = useState([]);
  const [isCheckedMessageIds, setIsCheckedMessageIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageCount, setPageCount] = useState(0);

  const getMessages = () => {
    axios
      .get(
        `/api/sensei/class_rooms/${classRoomId}/messages.json?kind=${kind}&page=${
          currentPage + 1
        }`
      )
      .then((res) => {
        setMessages(res.data.messages);
        setPageCount(Math.ceil(res.data.messages_count / messagesPerPage));
      });
  };

  const handleOnDelete = (messageId) => {
    if (window.confirm("メッセージを削除しますか？")) {
      axios
        .delete(
          `/api/sensei/class_rooms/${classRoomId}/messages/${messageId}`,
          {
            params: { id: messageId, class_room_id: classRoomId },
          }
        )
        .then(() => {
          const messageIndex = messages.findIndex((x) => x.id === messageId);
          const remainingMessages = update(messages, {
            $splice: [[messageIndex, 1]],
          });
          if (remainingMessages.length === 0 && currentPage > initialPage) {
            setCurrentPage(currentPage - 1);
          }
          setMessages(remainingMessages);
        });
    }
  };

  const handleCheck = (e) => {
    const messageId = Number(e.target.id);
    if (e.target.checked === true) {
      const addedIsCheckedMessageIds = update(isCheckedMessageIds, {
        $push: [messageId],
      });
      setIsCheckedMessageIds(addedIsCheckedMessageIds);
    } else {
      const removedIsChecedMessageIdsIndex = isCheckedMessageIds.findIndex(
        (x) => x === messageId
      );
      const remainingIsCheckedMessageIds = update(isCheckedMessageIds, {
        $splice: [[removedIsChecedMessageIdsIndex, 1]],
      });
      setIsCheckedMessageIds(remainingIsCheckedMessageIds);
    }
  };

  const handleAllCheck = (e) => {
    if (e.target.checked === true) {
      const allMessageIdsPerPage = [];
      _.map(messages, (message) => {
        allMessageIdsPerPage.push(message.id);
      });
      setIsCheckedMessageIds(allMessageIdsPerPage);
    } else {
      setIsCheckedMessageIds([]);
    }
  };

  const handleDeleteMessages = () => {
    if (window.confirm("チェックしたメッセージをすべて削除しますか？")) {
      axios
        .delete(
          `/api/sensei/class_rooms/${classRoomId}/messages/delete_messages`,
          {
            data: {
              message: {
                ids: isCheckedMessageIds,
              },
            },
          }
        )
        .then(() => {
          const remainingMessages = messages.slice();
          for (let i = 0; i < isCheckedMessageIds.length; i += 1) {
            const messageIndex = remainingMessages.findIndex((message) => {
              return message.id === isCheckedMessageIds[i];
            });
            remainingMessages.splice(messageIndex, 1);
          }
          setMessages(remainingMessages);
          if (remainingMessages.length === 0 && currentPage > initialPage) {
            setCurrentPage(currentPage - 1);
          }
          setIsCheckedMessageIds([]);
        });
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  let paginationElement;
  if (pageCount > 1) {
    paginationElement = (
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={paginationStyles.pagination}
        forcePage={currentPage}
        activeClassName={paginationStyles.active}
        disabledClassName={paginationStyles.disabled}
        initialPage={initialPage}
      />
    );
  }

  useEffect(() => {
    getMessages();
    interval = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);

  return (
    <div>
      <div className={messageBoardStyles.TableTopButtons}>
        <button
          type="button"
          onClick={handleDeleteMessages}
          disabled={isCheckedMessageIds.length === 0}
          className={messageBoardStyles.BtnDanger}
        >
          チェックしたメッセージを削除
        </button>
        <div>{paginationElement}</div>
      </div>
      {messages.length ? (
        <table className="app-table">
          <thead className="app-table__head">
            <tr>
              <th>
                <input type="checkbox" onChange={handleAllCheck} />
              </th>
              <th>出席番号</th>
              <th>名前</th>
              <th>送信時間</th>
              <th>発言</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody className="app-table__body">
            {_.map(messages, (message) => {
              return (
                <Message
                  key={message.id}
                  message={message}
                  handleOnDelete={handleOnDelete}
                  handleCheck={handleCheck}
                  isChecked={isCheckedMessageIds.includes(message.id)}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={messageBoardStyles.NoMessage}>メッセージはありません</p>
      )}
      {paginationElement}
    </div>
  );
};

export default MessageBoard;
