import { useGame } from "store/useGame";
import "./ControlInfo.scss";
import { SampleImageList } from "./SampleImageList";

export const ControlInfo = () => {
  const { control, setControl } = useGame();

  return (
    <div className="control-info">
      {control === "GAME_INFO" && <div>gameInfo</div>}

      {control === "IMAGE" && <SampleImageList />}
    </div>
  );
};
