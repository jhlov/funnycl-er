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
    <div className="side-bar-main-menu p-1">
      <button
        className={classNames("side-bar-main-menu__button", {
          active: pathname === "/admin/my-work"
        })}
      >
        <AppsIcon />
        <br />내 작업
      </button>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip>준비중입니다.</Tooltip>}
      >
        <button className="side-bar-main-menu__button disabled">
          <ArticleIcon />
          <br />
          템플릿
        </button>
      </OverlayTrigger>
    </div>
  );
};
