import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import classNames from "classnames";
import { Form } from "react-bootstrap";
import { PageInfo, useGame } from "store/useGame";
import "./Page.scss";

interface Props {
  index: number;
  pageInfo: PageInfo;
  isLast: boolean;
  onClickAddNewPage: (index: number) => void;
  onClickDeletePage: (index: number) => void;
  onClickCopyPage: (index: number) => void;
}

export const Page = (props: Props) => {
  const { selectedPage, onChangePageTitle, onChangeSelectedPage } = useGame();

  return (
    <div id={`page-${props.index}`} className="page">
      <div className="d-flex justify-between mb-2">
        <div className="d-flex align-items-center">
          {`${props.index + 1} 페이지 - `}
          <Form.Control
            className="page__title"
            size="sm"
            placeholder="제목 입력"
            value={props.pageInfo.title}
            onChange={e => onChangePageTitle(props.index, e.target.value)}
            onBlur={e => onChangePageTitle(props.index, e.target.value)}
          ></Form.Control>
        </div>
        <div className="page__buttons">
          <button onClick={() => props.onClickAddNewPage(props.index + 1)}>
            <AddIcon fontSize="small" />
          </button>
          <button onClick={() => props.onClickCopyPage(props.index)}>
            <ContentCopyIcon fontSize="small" />
          </button>
          <button disabled={props.index === 0}>
            <ArrowUpwardIcon fontSize="small" />
          </button>
          <button disabled={props.isLast}>
            <ArrowDownwardIcon fontSize="small" />
          </button>
          <button
            disabled={props.index === 0 && props.isLast}
            onClick={() => props.onClickDeletePage(props.index)}
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>
      <div
        className={classNames("page__canvas", {
          selected: selectedPage === props.index
        })}
        onClick={() => onChangeSelectedPage(props.index)}
      />
    </div>
  );
};
