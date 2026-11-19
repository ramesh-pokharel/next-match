import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";


export async function getMembers(){
    const currentUser = await getCurrentUser();
    
    if(!currentUser) return null;

    try{
        
        return  prisma.member.findMany({
            where: {NOT: {userId: currentUser.id,}},
        }      
        ); //await will be redundant here
        
 
    }catch(e){
        console.log(e);
        
    }
}

export  const getMemberByUserId = cache((userId: string) => {
    try{

        return prisma.member.findUnique({where: {userId}})
    }catch(e){
        console.log(e);
       
    }
});