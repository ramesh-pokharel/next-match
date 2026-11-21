import { fetchCurrentUserLikeIds, fetchLikedMembers } from "@/server/actions/likes";
import ListTabs from "./ListTabs";

const ListsPage = async(props: PageProps<"/lists">) => {

  const {type} = await props.searchParams;

  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type as string);

  return (
    <div className="mt-24 mx-10">
      <ListTabs  likeIds={likeIds} members={members}/>

    </div>
  )
}
export default ListsPage