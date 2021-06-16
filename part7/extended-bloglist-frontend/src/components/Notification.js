import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    position: "fixed",
    top: 0,
    zIndex: 3,
    width: "100%",
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (!notification.message) {
    return null;
  }

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
