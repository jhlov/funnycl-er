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
        width: props.element.width * props.scale,
        textAlign: props.element.textInfo?.horizonAlign,
        padding: (props.element.textInfo?.padding ?? 0) * props.scale
      }}
      onClick={onClick}
    >
      <span
        style={{
          fontSize: props.element.textInfo?.fontSize! * props.scale,
          fontWeight: props.element.textInfo?.isBold ? "bold" : "normal"
        }}
      >
        {props.element.textInfo?.text}
      </span>
    </div>
  );
};
