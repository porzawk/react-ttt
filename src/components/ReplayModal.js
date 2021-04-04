import React, { useState, useEffect } from "react";
import { Result, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import db from "../firebase";

export const ReplayModal = ({ docId, size, visible, handleCancel }) => {
  const [squareData, setSquareData] = useState([]);
  const [replayData, setReplayData] = useState([]);
  var squareIndex = [];
  useEffect(() => {
    db.collection("history")
      .doc(docId)
      .collection("replay")
      .orderBy("index", "asc")
      .onSnapshot((snapshot) =>
        setSquareData(
          snapshot.docs.map((doc) => doc.data()),
          squareIndex
        )
      );
  }, [docId]);

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div align="center">
        <div
          id="board"
          className="board"
          style={{ gridTemplateColumns: `repeat(${size},auto)` }}
        >
          {squareData.map((item) => {
            if (item.value === "X") {
              return (
                <div
                  key={item.index}
                  className="cell"
                  style={{ cursor: "default" }}
                >
                  <FontAwesomeIcon icon={faTimes} size="5x" color="#0675AE" />
                </div>
              );
            } else if (item.value === "O") {
              return (
                <div
                  key={item.index}
                  className="cell"
                  style={{ cursor: "default" }}
                >
                  <FontAwesomeIcon icon={faCircle} size="5x" color="#0675AE" />
                </div>
              );
            } else {
              return (
                <div
                  key={item.index}
                  className="cell"
                  style={{ cursor: "default" }}
                ></div>
              );
            }
          })}
        </div>
      </div>
    </Modal>
  );
};
