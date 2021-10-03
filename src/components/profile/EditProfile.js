import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileUser } from "../../redux/actions/profileAction";
import { checkImage } from "../../utils/imageUpload";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState("");

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    console.log(err);
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({userData, avatar, auth}))
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <label htmlFor="file_up">
              <i className="fas fa-camera" />
              <p>Change</p>
            </label>
          </span>
          <input
            type="file"
            name="file"
            id="file_up"
            accept="image/*"
            onChange={changeAvatar}
          />
        </div>
        <div className="form_group">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form_control w-100"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>
        <div className="form_group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            className="form_control w-100"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form_control w-100"
            id="address"
            name="address"
            value={address}
            onChange={handleInput}
          />
        </div>
        <div className="form_group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form_control w-100"
            id="website"
            name="website"
            value={website}
            onChange={handleInput}
          />
        </div>
        <div className="form_group">
          <label htmlFor="story">Story</label>
          <textarea
            type="text"
            className="form_control w-100"
            id="story"
            name="story"
            value={story}
            onChange={handleInput}
            cols="30"
            rows="4"
          />
          <small className="text-danger d-block" style={{ textAlign: "right" }}>
            {story.length}/200
          </small>
        </div>

        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            id="gender"
            name="gender"
            className="custom-select text-capitalize w-100"
            value={gender}
            onChange={handleInput}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn btn-info w-100 text-light" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
