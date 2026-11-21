"use client";

import { Member } from "@/generated/prisma/client";
import { Tabs } from "@heroui/react";

type Props = {
    members: Member[];
    likeIds: string[];
}
const ListTabs = ({members, likeIds}: Props) => {
const tabs = [
    {id: "source", label:  "Members I have liked"},
    {id: "target", label: "Members that like me"},
    {id: "mutual", label: "Mutual likes"}
]
  return (
    <div className="flex flex-col mt-10 gap-5 w-full">
        <Tabs>
            <div className="flex items-center">
                <Tabs.ListContainer className="w-2xl flex">
                    <Tabs.List aria-label="Like tabs">
                        {tabs.map(tab => (
                            <Tabs.Tab key={tab.id} id={tab.id}>
                                {tab.label}
                                <Tabs.Indicator className="bg-accent" />
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs.ListContainer>
            </div>
        </Tabs>

    </div>
  )
}
export default ListTabs