import { child, get as getData, getDatabase, ref } from "firebase/database";
import { SampleImage } from "interfaces/SampleImage";
import { TextInfo, initTextInfo } from "interfaces/TextInfo";
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
  uuid: uuidv4(),
  title: "",
  elements: []
};

const initGameInfo: GameInfo = {
  title: "",
  pageList: [
    {
      ...newPage,
      uuid: uuidv4()
    }
  ]
};

export interface PageInfo {
  uuid: string;
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
  textInfo?: TextInfo;
  link?: string;
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
  updateElementSize: (uuid: string, width: number) => void;
  updateElementLink: (uuid: string, link: string) => void;
  onClickElement: (uuid: string) => void;
  deleteElement: (uuid: string) => void;
  addNewText: () => void;
}

export const useGame = create<GameState>((set, get) => ({
  gameInfo: initGameInfo,
  control: "GAME_INFO",
  selectedPage: 0,
  selectedElementId: "",
  ///////
  setControl: payload => {
    set(() => ({
      control: payload,
      selectedElementId: ""
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
          let gameInfo: GameInfo = _.cloneDeep(snapshot.val());
          gameInfo = {
            ...gameInfo,
            pageList: gameInfo.pageList.map(page => ({
              ...page,
              // uuid 없는 페이지 보정
              uuid: page.uuid ? page.uuid : uuidv4()
            }))
          };
          set(() => ({
            gameInfo,
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
      selectedPage,
      selectedElementId:
        get().selectedPage !== selectedPage ? "" : get().selectedElementId
    }));
  },
  addNewPage(index?: number) {
    const { gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPage = index ?? pageList.length;
    pageList.splice(index ?? pageList.length, 0, {
      ...newPage,
      uuid: uuidv4()
    });
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

    // TODO: 링크에서 지워줘야됨

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
    const uuid = uuidv4();
    selectedPageInfo.elements.push({
      uuid,
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
      },
      selectedElementId: uuid
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
  updateElementSize(uuid: string, width: number) {
    const { selectedPage, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements = (selectedPageInfo.elements ?? []).map(
      element => {
        if (element.uuid === uuid) {
          return {
            ...element,
            width
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
  updateElementLink(uuid: string, link: string) {
    const { selectedPage, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements = (selectedPageInfo.elements ?? []).map(
      element => {
        if (element.uuid === uuid) {
          return {
            ...element,
            link
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
    const { selectedPage, gameInfo } = get();
    let newSelectedPage = selectedPage;
    if (selectedElementId) {
      gameInfo.pageList.forEach((page, i) => {
        page.elements?.forEach(element => {
          if (element.uuid === selectedElementId) {
            newSelectedPage = i;
          }
        });
      });
    }

    set(() => ({
      selectedElementId,
      selectedPage: newSelectedPage
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
  },
  addNewText() {
    const { selectedPage, gameInfo } = get();
    const pageList = [...gameInfo.pageList];
    const selectedPageInfo = _.cloneDeep(pageList[selectedPage]);
    selectedPageInfo.elements = selectedPageInfo.elements ?? [];
    const uuid = uuidv4();
    selectedPageInfo.elements.push({
      uuid,
      type: "TEXT",
      x: 100,
      y: 300,
      width: 200,
      textInfo: { ...initTextInfo }
    });
    pageList.splice(selectedPage, 1, selectedPageInfo);

    set(() => ({
      gameInfo: {
        ...gameInfo,
        pageList
      },
      selectedElementId: uuid
    }));
  }
}));
