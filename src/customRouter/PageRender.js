import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import NotFound from "../components/NotFound";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { auth } = useSelector((state) => state);

  const { page, id } = useParams();

  let pageName = "";

  if(auth.token){
      if (id) {
        pageName = `${page}/[id]`;
      } else {
        pageName = `${page}`;
      }
  }

  return generatePage(pageName);
};

export default PageRender;
