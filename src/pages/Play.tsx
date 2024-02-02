import { PlaySampleImageElement } from "components/elements/PlaySampleImageElement";
import { PlayShortAnswerElement } from "components/elements/PlayShortAnswerElement";
import { PlayTextElement } from "components/elements/PlayTextElement";
import { useEffect, useMemo, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useGame } from "store/useGame";
import "./Play.scss";

interface Params {
  id?: string;
}

export const Play = () => {
  const match = useRouteMatch();
  const { selectedPage, gameInfo, getGameInfo } = useGame();
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const id = (match.params as Params).id;
    if (id) {
      getGameInfo(id);
    }

    console.log(window.innerWidth);
    console.log(window.innerHeight);

    console.log(400 / 640, window.innerWidth / window.innerHeight);
    if (400 / 640 <= window.innerWidth / window.innerHeight) {
      setIsWide(true);
    }
  }, []);

  const curPage = useMemo(() => {
    return gameInfo.pageList[selectedPage];
  }, [gameInfo, selectedPage]);

  const canvasWidth = useMemo<number>(() => {
    if (isWide) {
      return (400 * window.innerHeight) / 640;
    } else {
      return window.innerWidth;
    }
  }, [window.innerWidth, isWide]);

  const canvasHeight = useMemo(() => {
    if (isWide) {
      return "100vh";
    } else {
      return `${(640 * window.innerWidth) / 400}px`;
    }
  }, [window.innerHeight, isWide]);

  return (
    <div className="play">
      <div
        className="play__canvas"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        {(curPage.elements ?? []).map(element => {
          if (element.type === "SAMPLE_IMAGE") {
            return (
              <PlaySampleImageElement
                key={element.uuid}
                scale={(canvasWidth as number) / 400}
                element={element!}
              />
            );
          } else if (element.type === "TEXT") {
            return (
              <PlayTextElement
                key={element.uuid}
                scale={(canvasWidth as number) / 400}
                element={element!}
              />
            );
          } else if (element.type === "SHORT_ANSWER") {
            return (
              <PlayShortAnswerElement
                key={element.uuid}
                scale={(canvasWidth as number) / 400}
                element={element!}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
