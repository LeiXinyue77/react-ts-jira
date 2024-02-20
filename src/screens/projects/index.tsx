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
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </div>
  );
};
