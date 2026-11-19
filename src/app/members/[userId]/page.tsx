import { getMemberByUserId } from "@/server/actions/members";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";


function MemberDetailedPage(props: PageProps<"/members/[userId]">) {

  return (
    <Suspense fallback={<Loading />}>
      <MemberDetails params={props.params} />
    </Suspense>
  )
}


async function MemberDetails({
  params,
}: {
  params: PageProps<"/members/[userId]">["params"];
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();


  return (
    <div>{member.description}</div>
  )
}

export default MemberDetailedPage