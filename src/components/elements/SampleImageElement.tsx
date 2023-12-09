import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { PageElement, useGame } from "store/useGame";

interface Props {
  element: PageElement;
}

export const SampleImageElement = (props: Props) => {
  const { updateElementPosition } = useGame();

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    updateElementPosition(props.element.uuid, data.lastX, data.lastY);
  };

  return (
    <Draggable
      defaultPosition={{ x: props.element.x, y: props.element.y }}
      onStop={handleStop}
    >
      <div
        className="element sample-image-element"
        style={{
          width: props.element.width
        }}
      >
        <img src={props.element.sampleImage?.url} />
      </div>
    </Draggable>
  );
};
