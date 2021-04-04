import React from "react";
import { Table, Tag, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

export const HistoryTable = () => {
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
      render: (text, record) => (
        <Space size="middle">
          <a>
            {" "}
            <CaretRightOutlined /> Replay
          </a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      timestamp: "2021-04-03 22:32",
      size: "3x3",
      result: "X",
    },
    {
      key: "2",
      timestamp: "2021-04-03 22:31",
      size: "3x3",
      result: "O",
    },
    {
      key: "3",
      timestamp: "2021-04-03 22:30",
      size: "3x3",
      result: "D",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </>
  );
};
