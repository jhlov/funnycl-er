import { ControlInfo } from "components/admin/ControlInfo";
import { ControlList } from "components/admin/ControlList";
import { PageList } from "components/admin/PageList";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";

interface Params {
  id?: string;
}

export const AdminCreateGame = () => {
  const { setMenu } = useMenus();
  const { setControl, initGameInfo, getGameInfo } = useGame();
  const match = useRouteMatch();

  useEffect(() => {
    setMenu("CREATE_GAME");
    setControl("GAME_INFO");
    const id = (match.params as Params).id;
    if (id) {
      getGameInfo(id);
    } else {
      initGameInfo();
    }
  }, []);

  return (
    <div className="d-flex flex-fill">
      <ControlList />
      <ControlInfo />
      <PageList />
    </div>
  );
};
