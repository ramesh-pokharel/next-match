"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { sections } from "./MemberNav";

const SectionTitle = () => {
    const active = useSelectedLayoutSegment();
    const title = sections.find(x => x.segment=== active)?.name ?? "";
  return (
    <h2 className="text-2xl font-semibold capitalize text-accent">{title}</h2>
  )
}
export default SectionTitle