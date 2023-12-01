import AppsIcon from "@mui/icons-material/Apps";
import ArticleIcon from "@mui/icons-material/Article";
import classNames from "classnames";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SideBarMainMenu.scss";

export const SideBarMainMenu = () => {
  const {
    location: { pathname }
  } = useHistory();

  return (
    <div className="side-bar side-bar-main-menu p-1 px-2">
      <button
        className={classNames("side-bar__button", {
          active: pathname === "/admin/my-work"
        })}
      >
        <AppsIcon />
        <div>내 작업</div>
      </button>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip>준비중입니다.</Tooltip>}
      >
        <button className="side-bar__button disabled">
          <ArticleIcon />
          <div>템플릿</div>
        </button>
      </OverlayTrigger>
    </div>
  );
};
