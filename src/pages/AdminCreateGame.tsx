import { ControlInfo } from "components/admin/ControlInfo";
import { ControlList } from "components/admin/ControlList";
import { PageList } from "components/admin/PageList";
import { useEffect } from "react";
import { useMenus } from "store/useMenus";

export const AdminCreateGame = () => {
  const { setMenu } = useMenus();

  useEffect(() => {
    setMenu("CREATE_GAME");
  }, []);

  return (
    <div className="d-flex flex-fill">
      <ControlList />
      <ControlInfo />
      <PageList />
    </div>
  );
};
