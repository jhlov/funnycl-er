import { SideBarMainMenu } from "components/admin/sideBars/SideBarMainMenu";
import { useEffect } from "react";
import { useMenus } from "store/useMenus";

export const AdminMyWork = () => {
  const { setMenu } = useMenus();

  useEffect(() => {
    setMenu("MY_WORK");
  }, []);

  return (
    <div className="d-flex flex-fill">
      <SideBarMainMenu />
      <div>내 게임들</div>
    </div>
  );
};
