"use client"

import { useSelectedLayoutSegment } from "next/navigation"

type Props = {
  sections: {segment: string | null, name: string, path: string}[];
  
}


const SectionTitle = ({sections}: Props) => {
    const active = useSelectedLayoutSegment();
    const title = sections.find(x => x.segment=== active)?.name ?? "";
  return (
    <h2 className="text-2xl font-semibold capitalize text-accent">{title}</h2>
  )
}
export default SectionTitle