import { child, get as getData, getDatabase, ref } from "firebase/database";
import { SampleImage } from "interfaces/SampleImage";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import create from "zustand";

type ControlType = "GAME_INFO" | "IMAGE" | "TEXT";

export interface GameInfo {
  id?: string;
  userId?: string;
  created?: string;
  modified?: string;
  /////////////////
  title: string;
  pageList: PageInfo[];
}

const newPage: PageInfo = {
  title: "",
  elements: []
};

const initGameInfo: GameInfo = {
  title: "",
  pageList: [
    {
      ...newPage
    }
  ]
};

export interface PageInfo {
  title: string;
  elements?: PageElement[];
}

type ElementType = "SAMPLE_IMAGE" | "TEXT";

export interface PageElement {
  uuid: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height?: number;
  sampleImage?: SampleImage;
}

interface GameState {
  control: ControlType;
  gameInfo: GameInfo;
  selectedPage: number;
  selectedElementId: string;
  ///////
  setControl: (payload: ControlType) => void;
  initGameInfo: () => void;
  getGameInfo: (id: string) => void;
  onChangeGameId: (id: string) => void;
  onChangeGameTitle: (title: string) => void;
  onChangePageTitle: (index: number, title: string) => void;
  onChangeSelectedPage: (selectedPage: number) => void;
  addNewPage: (index?: number) => Promise<number>;
  deletePage: (index: number) => Promise<number>;
  copyPage: (index: number) => Promise<number>;
  movePage: (index: number, offset: number) => Promise<number>;
  addNewSampleImage: (sampleImage: SampleImage) => void;
  updateElementPosition: (uuid: string, x: number, y: number) => void;
  updateElementSize: (uuid: string, width: number, height: number) => void;
  onClickElement: (uuid: string) => void;
  deleteElement: (uuid: string) => void;
}

export const useGame = create<GameState>((set, get) => ({
  gameInfo: initGameInfo,
  control: "GAME_INFO",
  selectedPage: 0,
  selectedElementId: "",
  ///////
  setControl: payload => {
    set(() => ({
      control: payload
    }));
  },
  initGameInfo: () => {
    set(() => ({
      gameInfo: { ...initGameInfo },
      control: "GAME_INFO",
      selectedPage: 0,
      selectedElementId: ""
    }));
  },
  getGameInfo: (id: string) => {
    const dbRef = ref(getDatabase());
    const path = `er/game/${id}`;
    getData(child(dbRef, path))
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          set(() => ({
            gameInfo: _.cloneDeep(snapshot.val()),
            control: "GAME_INFO",
            selectedPage: 0,
            selectedElementId: ""
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  onChangeGameId(id: string) {
    const { gameInfo } = get();
    set(() => ({
      gameInfo: { ...gameInfo, id }
    }));
  },
  onChangeGameTitle(title: string) {
    const { gameInfo } = get();
    set(() => ({
      gameInfo: { ...gameInfo, title }
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
    selectedPageInfo.elements = selectedPageInfo.elements ?? [];
    selectedPageInfo.elements.push({
      uuid: uuidv4(),
      type: "SAMPLE_IMAGE",
      x: sampleImage.type === "character" ? 150 : 0,
      y: sampleImage.type === "character" ? 270 : 0,
      width: sampleImage.type === "character" ? 100 : 400,
      sampleImage
    });
    pageList.splice(selectedPage, 1, selectedPageInfo);

    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
  },
  updateElementPosition(uuid: string, x: number, y: number) {
    const { selectedPage, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements = (selectedPageInfo.elements ?? []).map(
      element => {
        if (element.uuid === uuid) {
          return {
            ...element,
            x,
            y
          };
        }

        return element;
      }
    );
    pageList.splice(selectedPage, 1, selectedPageInfo);

    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
  },
  updateElementSize(uuid: string, width: number, height: number) {
    const { selectedPage, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements = (selectedPageInfo.elements ?? []).map(
      element => {
        if (element.uuid === uuid) {
          return {
            ...element,
            width,
            height
          };
        }

        return element;
      }
    );
    pageList.splice(selectedPage, 1, selectedPageInfo);

    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList
      }
    }));
  },
  onClickElement(selectedElementId: string) {
    set(() => ({
      selectedElementId
    }));
  },
  deleteElement(uuid: string) {
    const { selectedPage, selectedElementId, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements = (selectedPageInfo.elements ?? []).filter(
      element => element.uuid !== uuid
    );
    pageList.splice(selectedPage, 1, selectedPageInfo);

    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList
      },
      selectedElementId: selectedElementId === uuid ? "" : selectedElementId
    }));
  }
}));
