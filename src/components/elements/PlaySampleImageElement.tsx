import classNames from "classnames";
import { PageElement, useGame } from "store/useGame";

interface Props {
  multiple: number;
  element: PageElement;
}

export const PlaySampleImageElement = (props: Props) => {
  const { gameInfo, onChangeSelectedPage } = useGame();

  const onClick = () => {
    if (props.element.link) {
      const index = gameInfo.pageList.findIndex(
        page => page.uuid === props.element.link
      );

      if (index >= 0) {
        onChangeSelectedPage(index);
      }
    }
  };

  return (
    <img
      className={classNames("position-absolute", {
        "cursor-pointer": props.element.link
      })}
      style={{
        left: props.element.x * props.multiple,
        top: props.element.y * props.multiple,
        width: props.element.width * props.multiple
      }}
      src={props.element.sampleImage?.url}
      onClick={onClick}
    />
  );
};
