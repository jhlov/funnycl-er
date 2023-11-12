import { LoadingLayer } from "components/LoadingLayer";
import { ToastLayer } from "components/ToastLayer";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import { Admin } from "pages/Admin";
import { Login } from "pages/Login";
import { Logout } from "pages/Logout";
import { NoPage } from "pages/NoPage";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useLogin } from "store/useLogin";
import "./App.scss";

function App() {
  const auth = getAuth();
  const { setIsLogin } = useLogin();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      onAuthStateChanged();
    });
  }, []);

  const onAuthStateChanged = async () => {
    console.log("onAuthStateChanged", auth.currentUser);
    setIsLogin(!_.isNil(auth.currentUser));
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={NoPage} exact />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Switch>

      <LoadingLayer />
      <ToastLayer />
    </div>
  );
}

export default App;
