import { useGame } from "store/useGame";
import { Page } from "./Page";
import "./PageList.scss";

export const PageList = () => {
  const { gameInfo } = useGame();
  return (
    <div className="page-list flex-fill p-4">
      {gameInfo.pageList.map((page, i) => (
        <Page
          index={i}
          pageInfo={page}
          isLast={i === gameInfo.pageList.length - 1}
        />
      ))}
    </div>
  );
};
