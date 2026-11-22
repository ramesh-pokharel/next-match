import { getMemberByUserId } from "@/server/actions/members";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { getCurrentUser } from "@/lib/auth";
import ProfileForm from "./ProfileForm";


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
  const user = await getCurrentUser();

  if (!member) return notFound();
const isCurrentuser = member.userId === user?.id;

  return (
    <div>
      {isCurrentuser ? (
        <ProfileForm  member={member}/>
        ):(
          <div>{member.description}</div>
        )}
    </div>
  )
}

export default MemberDetailedPage