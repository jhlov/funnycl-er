import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useGame } from "store/useGame";
import { Page } from "./Page";
import "./PageList.scss";

export const PageList = () => {
  const pageListRef = useRef<HTMLDivElement>(null);

  const { gameInfo, addNewPage } = useGame();

  const onClickAddNewPage = async (index?: number) => {
    const selectedPage = await addNewPage(index);
    const element = document.querySelector(`#page-${selectedPage}`);
    pageListRef.current?.scrollTo(0, (element as HTMLElement).offsetTop - 10);
  };

  return (
    <div className="page-list flex-fill p-4 p-relative" ref={pageListRef}>
      {gameInfo.pageList.map((page, i) => (
        <Page
          key={`page-${i}`}
          index={i}
          pageInfo={page}
          isLast={i === gameInfo.pageList.length - 1}
          onClickAddNewPage={onClickAddNewPage}
        />
      ))}

      <Button
        variant="secondary"
        size="sm"
        className="page-list__add-button"
        onClick={() => onClickAddNewPage()}
      >
        <AddIcon /> 페이지 추가
      </Button>
    </div>
  );
};
