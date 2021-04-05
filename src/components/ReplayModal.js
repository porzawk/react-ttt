import React, { useState, useEffect, useRef } from "react";
import { Modal, Button,Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import db from "../firebase";

export const ReplayModal = ({ docId, size, visible, handleCancel }) => {
  const timerRef = useRef(null);
  const countSquare = useRef(0);
  const [squareData, setSquareData] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [spin, setSpin] = useState(true);
  var squareIndex = [];
  useEffect(() => {
    setSpin(true);
    db.collection("history")
      .doc(docId)
      .collection("replay")
      .orderBy("index", "asc")
      .onSnapshot((snapshot) => {
        setSquareData(
          snapshot.docs.map((doc) => doc.data()),
          squareIndex
        );
        console.log("Done")
        setSpin(false);
      }
        
      );
    return () => {
      countSquare.current = 0;
      setSpin(false);
      setDisableButton(false);
      setSquareData([]);
      clearInterval(timerRef.current);
    };
  }, [docId]);

  const replayGenerate = () => {
    setDisableButton(true);
    timerRef.current = setInterval(() => {
      const square = [...squareData];
      checkOrder(square);
    }, 800);
  };

  const checkOrder = (square) => {
    const orderIndex = square.findIndex((item) => {
      return item.order === countSquare.current;
    });

    if (orderIndex === -1) {
      clearInterval(timerRef.current);
      countSquare.current = 0;
    } else {
      if (square[orderIndex].value !== "") {
        square[orderIndex].show = true;
        setSquareData(square);
        countSquare.current = countSquare.current + 1;
      } else {
        countSquare.current = countSquare.current + 1;
        checkOrder(square);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div align="center">
        <Spin spinning={spin}/>

        <div
          id="board"
          className="board"
          style={{ gridTemplateColumns: `repeat(${size},auto)` }}
        >
          {squareData.map((item) => {
            if (item.value === "X" && item.show === true) {
              return (
                <div
                  key={item.index}
                  className="cell"
                  style={{ cursor: "default" }}
                >
                  <FontAwesomeIcon icon={faTimes} size="5x" color="#0675AE" />
                </div>
              );
            } else if (item.value === "O" && item.show === true) {
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
        <Button
          onClick={replayGenerate}
          disabled={disableButton}
          type="primary"
          icon={<CaretRightOutlined />}
        >
          Play
        </Button>
      </div>
    </Modal>
  );
};
