import { PageElement } from "store/useGame";

interface Props {
  element: PageElement;
}

export const SampleImageElement = (props: Props) => {
  return (
    <div
      className="element sample-image-element"
      style={{
        left: props.element.left,
        top: props.element.top,
        width: props.element.width
      }}
    >
      <img src={props.element.sampleImage?.url} />
    </div>
  );
};
