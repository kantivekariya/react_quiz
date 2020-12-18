import React from "react";
const errorItemsNode = data => {
  if (data.errors) {
    const errorItems = data.errors.map((item, key) => {
      return (
        <li className="font-size-1" key={`${key}`}>
          {item.msg}
        </li>
      );
    });
    return errorItems;
  } else {
    return <li className="font-size-1">{data.message}</li>;
  }
};

export const errorFormater = (data, duration) => {
  console.log("data", data);
  const returnData = {
    message: data.message ? data.message : "Api Error",
    description: errorItemsNode(data),
    duration: duration,
    style: {
      width: "28rem",
      marginLeft: "-4rem"
    }
  };
  return returnData;
};
