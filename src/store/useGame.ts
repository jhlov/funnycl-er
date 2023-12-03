import create from "zustand";

type ControlType = "GAME_INFO" | "IMAGE" | "TEXT";

interface GameInfo {
  pageList: PageInfo[];
}

const newPage: PageInfo = {
  title: ""
};

const initGameInfo: GameInfo = {
  pageList: [
    {
      ...newPage
    },
    {
      ...newPage
    }
  ]
};

export interface PageInfo {
  title: string;
}

interface GameState {
  control: ControlType;
  gameInfo: GameInfo;
  selectedPage: number;
  ///////
  setControl: (payload: ControlType) => void;
  initGameInfo: () => void;
  onChangePageTitle: (index: number, title: string) => void;
  addNewPage: (index?: number) => Promise<number>;
}

export const useGame = create<GameState>((set, get) => ({
  gameInfo: initGameInfo,
  control: "GAME_INFO",
  selectedPage: 0,
  ///////
  setControl: payload => {
    set(() => ({
      control: payload
    }));
  },
  initGameInfo: () => {
    set(() => ({
      gameInfo: { ...initGameInfo },
      selectedPage: 0
    }));
  },
  onChangePageTitle(index: number, title: string) {
    const { gameInfo } = get();
    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList: gameInfo.pageList.map((page, i) =>
          i === index ? { ...page, title } : page
        )
      }
    }));
  },
  addNewPage(index?: number) {
    const { gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPage = index ?? pageList.length;
    pageList.splice(index ?? -1, 0, { ...newPage });
    set(() => ({
      selectedPage,
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
    return Promise.resolve(selectedPage);
  }
}));
