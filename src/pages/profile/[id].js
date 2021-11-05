import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";
import LoadIcon from "../../images/loading.gif";
import { getProfileUser } from "../../redux/actions/profileAction";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUser({ users: profile.users, id, auth }));
    }
  }, [id, auth, profile, dispatch]);

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {auth.user._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}
      {profile.loading ? (
        <img className="d-block x-auto my-4" src={LoadIcon} alt="loading" />
      ) : (
        <>
          {saveTab ? (
            <Saved auth={auth} dispatch={dispatch} />
          ) : (
            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
