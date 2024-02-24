import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useKanbansInProject, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panels";
import { ScreenContainer } from "components/lib";

export const KanbanScreens = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbansInProject();

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  /* margin-right: 2rem; */
`;
