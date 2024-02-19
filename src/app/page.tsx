"use client";
import { TestComponent } from "@/components/test/TestComponent";
import { DefaultPage } from "@/templates/DefaultPage";
import { StyleSheetManager } from "styled-components";
import isValidProp from "@emotion/is-prop-valid";
import { DataTable } from "@/components/data-table/DataTable2";
import { UserView } from "@/views/users/UserView";
import { Modals } from "@/components/modals/Modals";

export default function Home() {
  const users = Array.from({ length: 10 }, (_, i) => ({
    id: `user${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    widgets: i * 10,
    status: i % 3 === 0 ? "online" : i % 3 === 1 ? "offline" : "pause",
  }));
  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <Modals />
      <DefaultPage>
        <UserView users={users} />
      </DefaultPage>
    </StyleSheetManager>
  );
}
