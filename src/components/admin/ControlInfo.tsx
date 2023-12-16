import { useGame } from "store/useGame";
import "./ControlInfo.scss";
import { GameInfo } from "./GameInfo";
import { SampleImageList } from "./SampleImageList";

export const ControlInfo = () => {
  const { control, setControl } = useGame();

  return (
    <div className="control-info">
      {control === "GAME_INFO" && <GameInfo />}
      {control === "IMAGE" && <SampleImageList />}
    </div>
  );
};
