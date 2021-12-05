import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const { theme } = useSelector((state) => state);

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  return (
    <div
      className={`p-2 ${border} align-items-center d-flex justify-content-between w-100`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
        >
          <Avatar src={user.avatar} size="big-avatar" />
          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>

            <small style={{ opacity: "0.7" }}>
              {msg ? (
                <>
                  <div
                    style={{
                      filter: theme ? "invert(1)" : "invert(0)",
                    }}
                  >
                    {user.text}
                  </div>

                  {user.media.length > 0 && (
                    <div>
                      {user.media.length} <i className="fas fa-image" />
                    </div>
                  )}
                </>
              ) : (
                user.fullname
              )}
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
