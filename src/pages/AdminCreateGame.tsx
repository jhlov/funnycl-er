import { ControlInfo } from "components/admin/ControlInfo";
import { ControlList } from "components/admin/ControlList";
import { PageList } from "components/admin/PageList";
import { useEffect } from "react";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";

export const AdminCreateGame = () => {
  const { setMenu } = useMenus();
  const { setControl, initGameInfo } = useGame();

  useEffect(() => {
    setMenu("CREATE_GAME");
    setControl("GAME_INFO");
    initGameInfo();
  }, []);

  return (
    <div className="d-flex flex-fill">
      <ControlList />
      <ControlInfo />
      <PageList />
    </div>
  );
};
