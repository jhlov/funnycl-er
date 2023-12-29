import { useGame } from "store/useGame";
import "./ControlInfo.scss";
import { ElementInfo } from "./ElementInfo";
import { GameInfo } from "./GameInfo";
import { SampleImageList } from "./SampleImageList";

export const ControlInfo = () => {
  const { selectedElementId, control, setControl } = useGame();

  return (
    <div className="control-info">
      {selectedElementId ? (
        <ElementInfo />
      ) : (
        <>
          {control === "GAME_INFO" && <GameInfo />}
          {control === "IMAGE" && <SampleImageList />}
        </>
      )}
    </div>
  );
};
