import create from "zustand";

type MenuType = "MY_WORK" | "CREATE_GAME";

interface MenusState {
  menu: MenuType;
  ///////
  setMenu: (payload: MenuType) => void;
}

export const useMenus = create<MenusState>(set => ({
  menu: "MY_WORK",
  ///////
  setMenu: payload => {
    set(() => ({
      menu: payload
    }));
  }
}));
