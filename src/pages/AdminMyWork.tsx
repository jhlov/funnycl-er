import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { SideBarMainMenu } from "components/admin/sideBars/SideBarMainMenu";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import moment from "moment";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGameList } from "store/useGameList";
import { useMenus } from "store/useMenus";

export const AdminMyWork = () => {
  const auth = getAuth();
  const { setMenu } = useMenus();
  const { gameList, getGameList } = useGameList();

  useEffect(() => {
    setMenu("MY_WORK");
    getGameList();
  }, []);

  const onClickRemoveGame = (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const db = getDatabase();

      const updates: any = {};
      updates[`game/all/${id}/deleted`] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");
      updates[`game/${auth.currentUser?.uid}/${id}/deleted`] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");

      update(ref(db), updates).then(() => {
        getGameList();
      });
    }
  };

  return (
    <div className="d-flex flex-fill">
      <SideBarMainMenu />
      <div className="p-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th>게임 이름</th>
              <th>생성일</th>
              <th>수정일</th>
              <th style={{ width: "80px" }}>플레이</th>
              <th style={{ width: "60px", minWidth: "60px" }}>수정</th>
              <th style={{ width: "80px" }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {gameList.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td className="text-start">{item.title}</td>
                <td>{item.created}</td>
                <td>{item.modified}</td>
                <td>
                  <Link to={`/play/${item.id}`} target="_blank">
                    <PlayArrowIcon />
                  </Link>
                </td>
                <td>
                  <Link className="btn" to={`/admin/create-game/${item.id}`}>
                    <EditIcon />
                  </Link>
                </td>
                <td>
                  <button
                    className="btn"
                    // onClick={() => onClickRemoveGame(item.id!)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
