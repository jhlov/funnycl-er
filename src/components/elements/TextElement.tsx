import classNames from "classnames";
import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { PageElement, useGame } from "store/useGame";
import "./Element.scss";
import { ElementTools } from "./ElementTools";

interface Props {
  element: PageElement;
}

export const TextElement = (props: Props) => {
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
            className={classNames("element text-element", {
              selected: selectedElementId === props.element.uuid
            })}
            style={{
              width: props.element.width,
              minHeight: "50px",
              textAlign: props.element.textInfo?.horizonAlign
            }}
            onClick={e => {
              e.stopPropagation();
              onClickElement(props.element.uuid);
            }}
          >
            <span
              style={{
                fontSize: props.element.textInfo?.fontSize,
                fontWeight: props.element.textInfo?.isBold ? "bold" : "normal"
              }}
            >
              {props.element.textInfo?.text}
            </span>
            {selectedElementId === props.element.uuid && (
              <ElementTools element={props.element} />
            )}
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};
