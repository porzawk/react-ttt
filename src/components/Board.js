import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export const Board = ({squareSize,squareData,onSquareClick}) => {
    return (
        <div
            id="board"
            className="board"
            style={{ gridTemplateColumns: `repeat(${squareSize},auto)` }}
          >
            {squareData.map((item) => {
              if (item.value === "X") {
                return (
                  <div
                    key={item.index}
                    className="cell"
                    style={{cursor:"default"}}
                    onClick={() => onSquareClick(item.index)}
                  >
                    <FontAwesomeIcon icon={faTimes} size="5x" color="#0675AE" />
                  </div>
                );
              } else if (item.value === "O") {
                return (
                  <div
                    key={item.index}
                    className="cell"
                    style={{cursor:"default"}}
                    onClick={() => onSquareClick(item.index)}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      size="5x"
                      color="#0675AE"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.index}
                    className="cell"
                    style={{cursor:"pointer"}}
                    onClick={() => onSquareClick(item.index)}
                  ></div>
                );
              }
            })}
          </div>
    )
}
