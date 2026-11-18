

import { getMembers } from "@/server/actions/members";
import MemberCard from "./MemberCard";
import { Suspense } from "react";



const MembersPage =  () => {


  return (
   
    <Suspense fallback={<p className="p-10">Loading members...</p>}>
      <MembersList />
    </Suspense>
  
  );
}

async function MembersList(){
  const members = await getMembers()
  return (
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
       {members?.map(member => (
          <MemberCard key={member.id} member={member} />
        ) )}
     </div>  
  );
}



export default MembersPage;