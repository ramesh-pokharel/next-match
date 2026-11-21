import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";


export async function getMembers(){
    const currentUser = await getCurrentUser();
    
    if(!currentUser) return null;

    try{
        
        return await prisma.member.findMany({
            where: {NOT: {userId: currentUser.id,}},
        }      
        ); 
        
 
    }catch(e){
        console.log(e);
        return null;
    }
}

export  const getMemberByUserId = cache(async(userId: string) => {
    try{

        return await prisma.member.findUnique({where: {userId}})
    }catch(e){
        console.log(e);
       
    }
});