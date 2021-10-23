import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalType";

const StatusModal = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            placeholder={`${auth.user.username}, what are you thinking?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="input_images">
            <i className="fas fa-camera" />
            <div className="file_upload">
              <label htmlFor="file">
                <i className="fas fa-image" />
              </label>
              <input type="file" id="file" multiple accept="image/*" />
            </div>
          </div>
        </div>
        <div className="status_footer">
          <button className="btn btn-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
