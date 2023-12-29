import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useGame } from "store/useGame";
import { Page } from "./Page";
import "./PageList.scss";

export const PageList = () => {
  const pageListRef = useRef<HTMLDivElement>(null);

  const { selectedElementId, deleteElement, onClickElement } = useGame();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete" || (e.metaKey && e.key === "Backspace")) {
      deleteElement(selectedElementId);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedElementId]);

  const { gameInfo, addNewPage, deletePage, copyPage, movePage } = useGame();

  const onClickAddNewPage = async (index?: number) => {
    const selectedPage = await addNewPage(index);
    const element = document.querySelector(`#page-${selectedPage}`);
    pageListRef.current?.scrollTo(0, (element as HTMLElement).offsetTop - 10);
  };

  const onClickDeletePage = async (index: number) => {
    const selectedPage = await deletePage(index);
    const element = document.querySelector(`#page-${selectedPage}`);
    pageListRef.current?.scrollTo(0, (element as HTMLElement).offsetTop - 10);
  };

  const onClickCopyPage = async (index: number) => {
    const selectedPage = await copyPage(index);
    const element = document.querySelector(`#page-${selectedPage}`);
    pageListRef.current?.scrollTo(0, (element as HTMLElement).offsetTop - 10);
  };

  const onClickMovePage = async (index: number, offset: number) => {
    const selectedPage = await movePage(index, offset);
    const element = document.querySelector(`#page-${selectedPage}`);
    pageListRef.current?.scrollTo(0, (element as HTMLElement).offsetTop - 10);
  };

  const onClickPageList = (e: React.MouseEvent) => {
    if (e.target === pageListRef.current) {
      onClickElement("");
    }
  };

  return (
    <div
      className="page-list flex-fill p-4 p-relative"
      ref={pageListRef}
      onClick={onClickPageList}
    >
      {gameInfo.pageList.map((page, i) => (
        <Page
          key={`page-${i}`}
          index={i}
          pageInfo={page}
          isLast={i === gameInfo.pageList.length - 1}
          onClickAddNewPage={onClickAddNewPage}
          onClickDeletePage={onClickDeletePage}
          onClickCopyPage={onClickCopyPage}
          onClickMovePage={onClickMovePage}
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
