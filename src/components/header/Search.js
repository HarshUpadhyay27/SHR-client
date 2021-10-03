import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalType";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setUsers(res.data);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
        title="Enter to search"
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.5 }}>
        <span className="material-icons">search</span>
        <span>Enter to search</span>
      </div>
      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>
      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <button type="submit" style={{ display: "none" }}></button>

      <div className="users">
        {search &&
          users.map((user) => (
              <UserCard
                user={user}
                border="border"
                key={user._id}
                handleClose={handleClose}
              />
          ))}
      </div>
    </form>
  );
};

export default Search;
