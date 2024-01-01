import classNames from "classnames";
import { PageElement, useGame } from "store/useGame";

interface Props {
  scale: number;
  element: PageElement;
}

export const PlayTextElement = (props: Props) => {
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
    <div
      className={classNames("position-absolute", {
        "cursor-pointer": props.element.link
      })}
      style={{
        left: props.element.x * props.scale,
        top: props.element.y * props.scale,
        width: props.element.width * props.scale
      }}
      onClick={onClick}
    >
      <span>{props.element.textInfo?.text}</span>
    </div>
  );
};
