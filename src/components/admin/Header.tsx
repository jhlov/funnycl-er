import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useLogin } from "store/useLogin";
import { useMenus } from "store/useMenus";
import "./Header.scss";

const Header = () => {
  const auth = getAuth();
  const history = useHistory();
  const { isLogin } = useLogin();
  const { menu } = useMenus();

  return (
    <div className="header px-3 py-2 border-bottom align-items-center">
      <div>퍼니클 - 방탈출</div>
      <div className="header__buttons d-flex align-items-center">
        {["MY_WORK"].includes(menu) && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              history.push("/admin/create-game");
            }}
          >
            방탈출 게임 만들기
          </Button>
        )}

        {menu === "CREATE_GAME" && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                history.push("/admin/my-work");
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="sm">
              저장
            </Button>
          </>
        )}
        <div className="ms-3 me-3">{auth.currentUser?.email}</div>
        {isLogin && (
          <div
            role="button"
            className="logout-button"
            onClick={() => auth.signOut()}
          >
            <LogoutIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };
