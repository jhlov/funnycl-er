import { useEffect } from "react";
import { useMenus } from "store/useMenus";

export const AdminCreateGame = () => {
  const { setMenu } = useMenus();

  useEffect(() => {
    setMenu("CREATE_GAME");
  }, []);

  return <div>AdminCreateGame</div>;
};
