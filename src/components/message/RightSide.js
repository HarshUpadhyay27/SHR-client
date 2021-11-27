import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import UserCard from "../UserCard";
import MsgDisplay from "./MsgDisplay";

const RightSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  console.log({ user });

  return (
    <>
      <div className="message-header">
        <UserCard user={user}>
          <i className="fas fa-trash text-danger" />
        </UserCard>
      </div>
      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MsgDisplay user={user} />
          </div>
          <div className="chat_row you_message">
            <MsgDisplay user={auth.user} />
          </div>
        </div>
      </div>
      <form className="chat_input">
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="material-icons"
          disabled={text ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;
