const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  let style;
  if (error === false) {
    style = {
      color: "Green",
      border: "1px solid black",
      backgroundColor: "#DADADA",
      fontSize: "18px",
    };
  } else {
    style = {
      color: "Red",
      border: "1px solid black",
      backgroundColor: "#DADADA",
      fontSize: "18px",
    };
  }
  return <div style={style}>{message}</div>;
};

export default Notification;
