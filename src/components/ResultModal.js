import React from "react";
import { Result, Modal } from "antd";

const ResultModal = ({ visible, handleOk, handleCancel, result }) => {
  const onHandleOK = () => {
    handleOk();
  };

  var resultText = "", status="info";
  if(result==="X" || result==="O") {
    resultText=`${result} win`;
    status = "success";
  } else {
    resultText="Draw";
    status = "info";
  }

  return (
    <Modal
      visible={visible}
      onOk={onHandleOK}
      okText = "Reset"
      onCancel={handleCancel}
      maskClosable={false}
    >
      <div align="center">
        <Result
          status={status}
          title={resultText}
          subTitle="Game information has been inserted to history for replay already"
        />
      </div>
    </Modal>
  );
};

export default ResultModal;
