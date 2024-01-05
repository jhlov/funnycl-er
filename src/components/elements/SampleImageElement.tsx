import classNames from "classnames";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { PageElement, useGame } from "store/useGame";
import "./Element.scss";
import { ElementTools } from "./ElementTools";

interface Props {
  element: PageElement;
}

export const SampleImageElement = (props: Props) => {
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
            className={classNames("element sample-image-element", {
              selected: selectedElementId === props.element.uuid
            })}
            style={{
              width: props.element.width
            }}
            onClick={e => {
              e.stopPropagation();
              onClickElement(props.element.uuid);
            }}
          >
            <img src={props.element.sampleImage?.url} />
            {props.element.textInfo?.text && (
              <div
                className={classNames("sample-image-element__text", {
                  "justify-content-start":
                    props.element.textInfo?.horizonAlign === "left",
                  "justify-content-center":
                    props.element.textInfo?.horizonAlign === "center",
                  "justify-content-end":
                    props.element.textInfo?.horizonAlign === "right",
                  "align-items-start":
                    props.element.textInfo?.verticalAlign === "top",
                  "align-items-center":
                    props.element.textInfo?.verticalAlign === "center",
                  "align-items-end":
                    props.element.textInfo?.verticalAlign === "bottom"
                })}
              >
                <span
                  style={{
                    fontSize: props.element.textInfo?.fontSize,
                    fontWeight: props.element.textInfo?.isBold
                      ? "bold"
                      : "normal"
                  }}
                >
                  {props.element.textInfo.text}
                </span>
              </div>
            )}

            {selectedElementId === props.element.uuid && (
              <ElementTools element={props.element} />
            )}
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};
