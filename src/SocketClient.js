import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "./redux/actions/globalType";
import {POST_TYPE} from './redux/actions/postAction'

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  // JoinUser
  useEffect(() => {
    socket.emit("joinUser", auth.user._id);
  }, [auth.user._id, socket]);

  // likePost
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({type:POST_TYPE.UPDATE_POST, payload: newPost})
    });
    return ()=>socket.off('likeToClient')
  }, [socket, dispatch]);

  // unLikePost
  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({type:POST_TYPE.UPDATE_POST, payload: newPost})
    });
    return ()=>socket.off('unLikeToClient')
  }, [socket, dispatch]);

  //Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({type:POST_TYPE.UPDATE_POST, payload: newPost})
    });
    return ()=>socket.off('createCommentToClient')
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({type:POST_TYPE.UPDATE_POST, payload: newPost})
    });
    return ()=>socket.off('deleteCommentToClient')
  }, [socket, dispatch]);

  //Follow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({type:GLOBALTYPES.AUTH, payload: {...auth, user:newUser}})
    });
    return ()=>socket.off('followToClient')
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({type:GLOBALTYPES.AUTH, payload: {...auth, user:newUser}})
    });
    return ()=>socket.off('unFollowToClient')
  }, [socket, dispatch, auth]);

  return <></>;
};

export default SocketClient;
