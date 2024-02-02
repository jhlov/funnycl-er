import classNames from "classnames";
import React from "react";
import { Button, Form } from "react-bootstrap";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { PageElement, useGame } from "store/useGame";
import "./Element.scss";
import { ElementTools } from "./ElementTools";
import "./ShortAnswerElement.scss";

interface Props {
  element: PageElement;
}

export const ShortAnswerElement = (props: Props) => {
  const {
    selectedElementId,
    updateElementPosition,
    updateElementSize,
    onClickElement
  } = useGame();

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    updateElementPosition(props.element.uuid, data.lastX, data.lastY);
  };

  const onResize = (
    event: React.SyntheticEvent,
    { node, size, handle }: ResizeCallbackData
  ) => {
    updateElementSize(props.element.uuid, size.width);
  };

  return (
    <div>
      <Draggable
        defaultPosition={{ x: props.element.x, y: props.element.y }}
        onStop={handleStop}
        cancel=".react-resizable-handle"
      >
        <Resizable
          height={props.element.height!}
          width={props.element.width!}
          onResize={onResize}
        >
          <div
            className={classNames("element short-answer-element", {
              selected: selectedElementId === props.element.uuid
            })}
            style={{
              width: props.element.width,
              minHeight: "50px",
              padding: props.element.textInfo?.padding
            }}
            onClick={e => {
              e.stopPropagation();
              onClickElement(props.element.uuid);
            }}
          >
            <Form.Control
              className="short-answer-element__input mr-1"
              style={{ fontSize: 20 }}
              value={props.element.shortAnswerInfo?.answer}
              disabled
            />
            <Button
              className="short-answer-element__button"
              style={{ fontSize: 16 }}
              variant="outline-secondary"
              size="sm"
            >
              확인
            </Button>

            {selectedElementId === props.element.uuid && (
              <ElementTools element={props.element} />
            )}
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};
