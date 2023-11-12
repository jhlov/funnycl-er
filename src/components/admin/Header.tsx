import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { useLogin } from "store/useLogin";
import "./Header.scss";

const Header = () => {
  const auth = getAuth();
  const { isLogin } = useLogin();

  return (
    <div className="header px-3 py-2 border-bottom align-items-center">
      <div>퍼니클 - 방탈출</div>
      <div className="header__buttons d-flex align-items-center">
        <div className="ms-5 me-3">{auth.currentUser?.email}</div>
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
