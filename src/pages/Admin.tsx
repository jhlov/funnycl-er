import { Header } from "components/admin/Header";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useLogin } from "store/useLogin";
import "./Admin.scss";
import { AdminCreateGame } from "./AdminCreateGame";
import { AdminMyWork } from "./AdminMyWork";

const Admin = () => {
  const { isLogin } = useLogin();

  return (
    <div className="admin">
      {isLogin ? (
        <>
          <Header />
          <Switch>
            <Route path="/admin" exact>
              <Redirect to="/admin/my-work" />
            </Route>
            <Route path="/admin/my-work" component={AdminMyWork} />
            <Route path="/admin/create-game" component={AdminCreateGame} />
          </Switch>
        </>
      ) : (
        <div className="p-5">
          <div className="pb-3">로그인이 필요합니다.</div>
          <Link to="/login">로그인 페이지로 가기</Link>
        </div>
      )}
    </div>
  );
};

export { Admin };
