import { getMemberByUserId } from "@/server/actions/members";
import { notFound } from "next/navigation";
import { Suspense } from "react";


function MemberDetailedPage(props: PageProps<"/members/[userId]">) {

   return(
    <Suspense fallback={<div className="p-10 animate-pulse">Loading member...</div>}>
      <MemberDetails params={props.params} />
    </Suspense>
   )
}


async function MemberDetails({
  params,
}: {
  params: PageProps<"/members/[userId]">["params"];
}){
   const {userId} = await params;
    const member = await getMemberByUserId(userId);

    if(!member) return notFound();


  return (
    <div>{member.name}</div>
  )
}

export default MemberDetailedPage