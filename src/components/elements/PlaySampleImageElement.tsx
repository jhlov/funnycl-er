import { PageElement } from "store/useGame";

interface Props {
  multiple: number;
  element: PageElement;
}

export const PlaySampleImageElement = (props: Props) => {
  return (
    <img
      className="position-absolute"
      style={{
        left: props.element.x * props.multiple,
        top: props.element.y * props.multiple,
        width: props.element.width * props.multiple
      }}
      src={props.element.sampleImage?.url}
    />
  );
};
