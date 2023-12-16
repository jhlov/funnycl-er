import { Form } from "react-bootstrap";
import { useGame } from "store/useGame";

export const GameInfo = () => {
  const { gameInfo, onChangeGameTitle } = useGame();
  return (
    <div className="game-info p-4 text-left">
      <div className="mb-1 fw-bold">게임 이름</div>
      <Form.Control
        value={gameInfo.title}
        onChange={e => onChangeGameTitle(e.target.value)}
      />
    </div>
  );
};
