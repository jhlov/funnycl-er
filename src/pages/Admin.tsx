import { Header } from "components/admin/Header";
import { Link } from "react-router-dom";
import { useLogin } from "store/useLogin";
import "./Admin.scss";

const Admin = () => {
  const { isLogin } = useLogin();

  return (
    <div className="admin">
      {isLogin ? (
        <>
          <Header />
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
