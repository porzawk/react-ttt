import React from "react";
import { Result, Modal } from "antd";
import db from "../firebase";
import moment from "moment";

const ResultModal = ({
  visible,
  handleOk,
  handleCancel,
  result,
  size,
  square,
}) => {
  const onHandleOK = () => {
    db.collection("history")
      .add({
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        result: result,
        size: size,
      })
      .then((docRef) => {
        square.map((item) => {
          db.collection("history")
            .doc(docRef.id)
            .collection("replay")
            .add(item);
        });
      });
    handleOk();
  };

  var resultText = "",
    status = "info";
  if (result === "X" || result === "O") {
    resultText = `${result} win`;
    status = "success";
  } else {
    resultText = "Draw";
    status = "info";
  }

  return (
    <Modal
      visible={visible}
      onOk={onHandleOK}
      okText="Save and Reset"
      onCancel={handleCancel}
      maskClosable={false}
    >
      <div align="center">
        <Result status={status} title={resultText} />
      </div>
    </Modal>
  );
};

export default ResultModal;
