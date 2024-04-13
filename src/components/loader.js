import Spinner from "react-spinner-material";
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15%",
          zIndex: "999",
        }}
      >
        <Spinner radius={130} color={"#444"} stroke={10} visible={true} />
      </div>
    );
  }
}
