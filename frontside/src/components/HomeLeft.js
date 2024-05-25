import React from "react";
import { useSelector } from "react-redux";
import GlobalCard from "./GlobalCard";

const HomeLeft = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="home-left">
      <GlobalCard user={auth.user} />
    </div>
  );
};

export default HomeLeft;