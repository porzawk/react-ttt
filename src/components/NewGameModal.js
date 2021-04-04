import React, { useState } from "react";
import { Modal, Input, InputNumber } from "antd";
import { useToasts } from "react-toast-notifications";

export const NewGameModal = ({ visible, handleCancel, handleOk }) => {
  const { addToast } = useToasts();
  const [sizeState, setSizeState] = useState(3);

  const onInputSizeChange = (event) => {
    setSizeState(event);
  };

  const onHandleOK = () => {
    if (sizeState) {
      handleOk(sizeState);
    } else {
      addToast("Please input size first", { appearance: "error" });
    }
  };

  return (
    <Modal
      title="New Game"
      visible={visible}
      onOk={onHandleOK}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <div align="center">
        <Input.Group compact>
          <InputNumber
            min="2"
            type="number"
            style={{ width: 70, textAlign: "center" }}
            defaultValue={sizeState}
            placeholder="Size"
            onChange={onInputSizeChange}
          />
          <Input
            className="site-input-split"
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: "none",
            }}
            placeholder="X"
            disabled
          />
          <InputNumber
            className="site-input-right"
            style={{
              width: 70,
              textAlign: "center",
            }}
            disabled
            value={sizeState}
            placeholder="size"
          />
        </Input.Group>
      </div>
    </Modal>
  );
};
