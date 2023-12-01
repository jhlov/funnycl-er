import create from "zustand";

type ControlType = "GAME_INFO" | "IMAGE" | "TEXT";

interface GameInfo {
  pageList: PageInfo[];
}

const initGameInfo: GameInfo = {
  pageList: [
    {
      title: ""
    },
    {
      title: ""
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
}

export const useGame = create<GameState>(set => ({
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
  }
}));
