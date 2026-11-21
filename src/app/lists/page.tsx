import { fetchCurrentUserLikeIds, fetchLikedMembers } from "@/server/actions/likes";
import ListTabs from "./ListTabs";
import { Suspense } from "react";
import Loading from "../members/[userId]/loading";

const ListsPage = ({searchParams}: PageProps<"/lists">) => {


  return (
    <div className="mt-24 mx-10">
      <Suspense fallback ={<Loading />}>
        <ListsContent searchParams={searchParams} />
      </Suspense>

    </div>
  )
}
export default ListsPage

const ListsContent = async ({ searchParams }: { searchParams: PageProps<"/lists">["searchParams"] }) => {
  const { type } = await searchParams;

  //these two don't depend on each other, run them in parallel
  const [likeIds, members] = await Promise.all([
    fetchCurrentUserLikeIds(),
    fetchLikedMembers(type as string),
  ]);

  return <ListTabs likeIds={likeIds} members={members} />;
}