"use client";
import { DefaultPage } from "@/templates/DefaultPage";
import { UserView } from "@/views/users/UserView";
import { Modals } from "@/components/modals/Modals";
import { useDummyData } from "./dev/useDummyData";
import { Suspense } from "react";

export default function Home() {
  const { users } = useDummyData();
  return (
    <>
      <Modals />
      <DefaultPage>
        <UserView users={users} />
      </DefaultPage>
      Test
    </>
  );
}
