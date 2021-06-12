import React from "react";

const Notification = ({ notification }) =>   {

  return (
    <h2>
      {notification ? notification : null}
    </h2>
  )
}

export default Notification;
