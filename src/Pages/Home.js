import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Space, Button, Tag } from "antd";
import {
  PlayCircleOutlined,
  RedoOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { HistoryTable } from "../components/HistoryTable";
import { NewGameModal } from "../components/NewGameModal";
import { Board } from "../components/Board";
import { createWinnerCondition, calculateWinner } from "../Calculator";
import ResultModal from "../components/ResultModal";

const { Content } = Layout;

export const Home = () => {
  const [squareSize, setSquareSize] = useState(3);
  const [squareData, setSquareData] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [result, setResult] = useState("");
  const [newGameModal, setNewGameModal] = useState({
    visible: false,
  });
  const [resultModal, setResultModal] = useState({
    visible: false,
  });

  var squareIndex = [];

  useEffect(() => {
    initSquare();
    createWinnerCondition(squareSize);
  }, [squareSize]);

  const initSquare = () => {
    for (var i = 0; i < squareSize * squareSize; i++) {
      squareIndex.push({
        index: i,
        value: "",
      });
    }
    setSquareData(squareIndex);
  };

  const onSquareClick = (index) => {
    const squares = [...squareData];
    if (squares[index].value === "" && result==="") {
      if (currentTurn === "X") {
        squares[index].value = "X";
        setCurrentTurn("O");
      } else {
        squares[index].value = "O";
        setCurrentTurn("X");
      }
      switch (calculateWinner(squares, currentTurn, squareSize)) {
        case "X":
          setResult("X");
          setTimeout(function(){ showResultModal(); }, 500);
          
          break;
        case "O":
          setResult("O");
          setTimeout(function(){ showResultModal(); }, 500);
          break;
        case "D":
          setResult("D");
          setTimeout(function(){ showResultModal(); }, 500);
          break;
      }
      setSquareData(squares);
    }
  };

  const handleNewGameOk = (size) => {
    setResult("");
    setCurrentTurn("X");
    setSquareSize(size);
    setNewGameModal({
      visible: false,
    });
  };

  const handleNewGameCancel = () => {
    setNewGameModal({
      visible: false,
    });
  };

  const showNewGameModal = () => {
    setNewGameModal({
      visible: true,
    });
  };

  const showResultModal = () => {
    setResultModal({
      visible: true,
    });
  };

  const handleResultOk = () => {
    setResult("");
    initSquare();
    setCurrentTurn("X");
    setResultModal({
      visible: false,
    });
  };

  const handleResultCancel = () => {
    setResultModal({
      visible: false,
    });
  };

  const onResetClick = () => {
    setResult("");
    initSquare();
    setCurrentTurn("X");
  };

  return (
    <Content style={{ padding: "0 50px" }}>
      <Row>
        <Col span={24}>
          <div align="center">
            <Space align="center">
              <Button type="default" size="large" onClick={showNewGameModal}>
                {" "}
                <PlayCircleOutlined />
                New Game
              </Button>
              <Button type="danger" size="large" onClick={onResetClick}>
                <RedoOutlined />
                Reset
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Board
            squareSize={squareSize}
            squareData={squareData}
            onSquareClick={onSquareClick}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div align="center">
            <Tag icon={<SyncOutlined spin />} color="processing">
              {currentTurn}'s Turn
            </Tag>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div align="center">
            <Space align="center">
              <HistoryTable />
            </Space>
          </div>
        </Col>
      </Row>
      <NewGameModal
        visible={newGameModal.visible}
        handleCancel={handleNewGameCancel}
        handleOk={handleNewGameOk}
      />

      <ResultModal
        visible={resultModal.visible}
        handleCancel={handleResultCancel}
        handleOk={handleResultOk}
        result={result}
      />
    </Content>
  );
};