import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GameInfo, useGame } from "store/useGame";
import { useLogin } from "store/useLogin";
import { useMenus } from "store/useMenus";
import "./Header.scss";

const Header = () => {
  const auth = getAuth();
  const history = useHistory();
  const { isLogin } = useLogin();
  const { menu } = useMenus();
  const { gameInfo, onChangeGameId } = useGame();

  const onSaveGame = async () => {
    // TODO 이름 중복 체크
    const db = getDatabase();

    // Get a key for a new Post.
    let postKey: string | null = gameInfo.id ?? "";
    if (!postKey) {
      postKey = push(child(ref(db), "er/game")).key;
    }

    const gameData: GameInfo = {
      ...gameInfo,
      id: postKey!,
      userId: auth.currentUser?.uid
    };

    gameData[gameInfo.id ? "modified" : "created"] = moment()
      .utc(false)
      .add(9, "h")
      .format("YYYY-MM-DD HH:mm:ss");

    const updates: any = {};
    updates[`er/game/${postKey}`] = gameData;

    await update(ref(db), updates);
    if (gameInfo.id) {
      alert("새로운 게임 저장에 성공하였습니다.");
    } else {
      alert("게임 수정에 성공하였습니다");
      onChangeGameId(postKey!);
    }
  };

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
            <Button
              variant="primary"
              size="sm"
              onClick={onSaveGame}
              disabled={!gameInfo.title}
            >
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
