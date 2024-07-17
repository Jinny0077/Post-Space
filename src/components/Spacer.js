import React from "react";

function Spacer({ width, height }) {
  return <div style={{ width: width || 0, height: height || 0 }} />;
}

export default Spacer;
