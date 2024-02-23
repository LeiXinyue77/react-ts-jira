import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { KanbanScreens } from "screens/kanban";
import { EpicScreens } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/* projects/:projectId/kanban */}
        <Route path={"/kanban"} element={<KanbanScreens />} />
        {/* projects/:projectId/epic */}
        <Route path={"/epic"} element={<EpicScreens />} />
        <Route
          path="/"
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};

//["projects","projects/1", "window.location.pathname + "/kanban"]
//2不满足条件进入3，3回退2，2再次触发3，循环无法进入1， replace={true}，3覆盖2
