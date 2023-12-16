import { getAuth } from "firebase/auth";
import {
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref
} from "firebase/database";
import create from "zustand";
import { GameInfo } from "./useGame";

interface GameListState {
  gameList: GameInfo[];
  ///////
  getGameList: () => void;
}

export const useGameList = create<GameListState>((set, get) => ({
  gameList: [],
  ///////
  getGameList: () => {
    const auth = getAuth();

    const db = getDatabase();
    const recentPostsRef = query(
      ref(db, "er/game"),
      orderByChild("userId"),
      equalTo(auth.currentUser?.uid!)
    );
    onValue(
      recentPostsRef,
      snapshot => {
        const data = snapshot.val();
        set(() => ({
          gameList: Object.values(data)
        }));
      },
      {
        onlyOnce: true
      }
    );
  }
}));
