import { useStore } from "@/store/application";
import * as React from "react";
import { ICON } from "../icon/useIcon";
import { SidebarAction } from "./useSidebar";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { User } from "@/views/users/UserTable";
import { Form } from "../form/Form";
import { INPUT_FIELD_TYPES, SPECIAL_FIELD_TYPES } from "../field/Field";
import { WidgetTable } from "@/views/widgets/WidgetTable";
import { Button } from "../button/Button";
import { space } from "@/utils/space";
import { WidgetView } from "@/views/widgets/WidgetView";
import { IconName } from "@fortawesome/fontawesome-svg-core";

export const useGetSidebarContent = () => {
  const toggleSidebarExpanded = useStore.use.toggleSidebarExpanded();
  const isSidebarExpanded = useStore.use.isSidebarExpanded();
  const sidebarPayload = useStore.use.sidebarPayload();
  const activeSidebar = useStore.use.activeSidebar();

  const sidebarContent = React.useMemo(() => {
    const content = {
      sidebarComponent: <div />,
      title: "Sidebar",
      icon: undefined as IconName | undefined,
    };
    let payload;

    if (activeSidebar) {
      switch (activeSidebar) {
        case SIDEBAR_TYPES.USER:
          payload = sidebarPayload as { user: User };
          const { user } = payload;
          content.title = user.name;
          content.icon = ICON.USER;
          content.sidebarComponent = (
            <FlexGrid direction="column" gap={space(0.25)}>
              <FlexRow grow={0} justifyContent="center" style={{}}>
                <FlexGrid direction="column" gap={0}>
                  <FlexRow>
                    <FlexColumn grow={0}>
                      <Form
                        fields={[
                          {
                            label: "Avatar",
                            value: user.avatar || "",
                            name: "avatar",
                            onChange: console.log,
                            type: SPECIAL_FIELD_TYPES.IMAGE,
                            showLabel: false,
                          },
                        ]}
                      />
                    </FlexColumn>
                    <FlexColumn>
                      <Form
                        fields={[
                          {
                            label: "Name",
                            value: user.name,
                            name: "name",
                            onChange: console.log,
                            type: INPUT_FIELD_TYPES.TEXT,
                          },
                          {
                            label: "Email",
                            value: user.email,
                            name: "email",
                            onChange: console.log,
                            type: INPUT_FIELD_TYPES.EMAIL,
                          },
                          {
                            label: "Status",
                            value: user.status || "",
                            name: "status",
                            onChange: console.log,
                            type: INPUT_FIELD_TYPES.TEXT,
                          },
                        ]}
                      />
                    </FlexColumn>
                  </FlexRow>
                  <FlexRow
                    grow={0}
                    style={{
                      padding: `0 ${space(0.125)}`,
                    }}
                  >
                    <Button onClick={console.log}>
                      Send Password Reset E-Mail
                    </Button>
                  </FlexRow>
                </FlexGrid>
              </FlexRow>

              <FlexRow
                style={{
                  borderTop: "1px solid var(--color-border-2)",
                }}
              >
                <WidgetView user={user} />
              </FlexRow>
            </FlexGrid>
          );
          break;

        default:
          break;
      }
    }

    return content;
  }, [activeSidebar, sidebarPayload]);

  return {
    ...sidebarContent,
  };
};
