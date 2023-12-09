import { SampleImage } from "interfaces/SampleImage";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import create from "zustand";

type ControlType = "GAME_INFO" | "IMAGE" | "TEXT";

interface GameInfo {
  pageList: PageInfo[];
}

const newPage: PageInfo = {
  title: "",
  elements: []
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
  elements: PageElement[];
}

type ElementType = "SAMPLE_IMAGE" | "TEXT";

export interface PageElement {
  uuid: string;
  type: ElementType;
  top: number;
  left: number;
  width: number;
  height?: number;
  sampleImage?: SampleImage;
}

interface GameState {
  control: ControlType;
  gameInfo: GameInfo;
  selectedPage: number;
  ///////
  setControl: (payload: ControlType) => void;
  initGameInfo: () => void;
  onChangePageTitle: (index: number, title: string) => void;
  onChangeSelectedPage: (selectedPage: number) => void;
  addNewPage: (index?: number) => Promise<number>;
  deletePage: (index: number) => Promise<number>;
  copyPage: (index: number) => Promise<number>;
  movePage: (index: number, offset: number) => Promise<number>;
  addNewSampleImage: (sampleImage: SampleImage) => void;
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
  onChangeSelectedPage(selectedPage: number) {
    set(() => ({
      selectedPage
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
  },
  deletePage(index: number) {
    const { gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPage = Math.max(index - 1, 0);
    pageList.splice(index, 1);
    set(() => ({
      selectedPage,
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
    return Promise.resolve(selectedPage);
  },
  copyPage(index: number) {
    const { gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPage = index + 1;
    pageList.splice(index, 0, _.cloneDeep(pageList[index]));
    set(() => ({
      selectedPage,
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
    return Promise.resolve(selectedPage);
  },
  movePage(index: number, offset: number) {
    const { gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPage = index + offset;
    const page = pageList.splice(index, 1)[0];
    pageList.splice(selectedPage, 0, _.cloneDeep(page));
    set(() => ({
      selectedPage,
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
    return Promise.resolve(selectedPage);
  },
  addNewSampleImage(sampleImage: SampleImage) {
    const { selectedPage, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements.push({
      uuid: uuidv4(),
      type: "SAMPLE_IMAGE",
      top: 270,
      left: 150,
      width: 100,
      sampleImage
    });
    pageList.splice(selectedPage, 1, selectedPageInfo);

    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
  }
}));
