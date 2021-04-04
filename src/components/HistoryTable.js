import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import db from "../firebase";
import { ReplayModal } from './ReplayModal';

export const HistoryTable = () => {
  const [history, setHistory] = useState([]);
  const [replayModal, setReplayModal] = useState({ visible: false });

  useEffect(() => {
    db.collection("history")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setHistory(
          snapshot.docs.map((doc) => ({
            key: doc.id,
            id: doc.id,
            timestamp: doc.data().timestamp,
            size: doc.data().size,
            result: doc.data().result,
          }))
        )
      );
  }, []);

  const handleCancel = () => {
    setReplayModal({
      visible: false,
    });
  };

  const showModal = (value) => {
    setReplayModal({
      id:value.key,
      size:value.size,
      visible: true,
    });
  };

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: size => `${size}x${size}`
    },
    {
      title: "Result",
      key: "result",
      render: (data) => {
        let color = "";
        switch (data.result) {
          case "X":
            color = "#12CBC4";
            break;
          case "O":
            color = "#0652DD";
            break;
          default:
            color = "#F79F1F";
            break;
        }

        if (data.result === "D") {
          return <Tag color={color}>Draw</Tag>;
        } else {
          return <Tag color={color}>{data.result} Win</Tag>;
        }
      },
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <a onClick={() => showModal(id)}>
            {" "}
            <CaretRightOutlined /> Replay
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={history}
        pagination={false}
        bordered
      />
      <ReplayModal
        docId={replayModal.id}
        size={replayModal.size}
        visible={replayModal.visible}
        handleCancel={handleCancel}
      />
    </>
  );
};
