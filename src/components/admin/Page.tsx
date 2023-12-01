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
}

export const Page = (props: Props) => {
  const { selectedPage } = useGame();
  return (
    <div className="page">
      <div className="d-flex justify-between mb-2">
        <div className="d-flex align-items-center">
          {`${props.index + 1} 페이지 - `}
          <Form.Control
            className="page__title"
            size="sm"
            placeholder="제목 입력"
          ></Form.Control>
        </div>
        <div className="page__buttons">
          <button>
            <AddIcon fontSize="small" />
          </button>
          <button>
            <ContentCopyIcon fontSize="small" />
          </button>
          <button disabled={props.index === 0}>
            <ArrowUpwardIcon fontSize="small" />
          </button>
          <button disabled={props.isLast}>
            <ArrowDownwardIcon fontSize="small" />
          </button>
          <button disabled={props.index === 0 && props.isLast}>
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>
      <div
        className={classNames("page__canvas", {
          selected: selectedPage === props.index
        })}
      />
    </div>
  );
};
