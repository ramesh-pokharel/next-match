import { ProfileFormValues } from "@/app/members/[userId]/ProfileForm";
import { getCurrentUser, requiredAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cache } from "react";


export async function getMembers() {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    try {

        return await prisma.member.findMany({
            where: { NOT: { userId: currentUser.id, } },
        }
        );


    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getMemberByUserId = cache(async (userId: string) => {
    try {

        return await prisma.member.findUnique({ where: { userId } })
    } catch (e) {
        console.log(e);

    }
});

export const updateProfile = async (data: ProfileFormValues) => {
    try {
        const user = await requiredAuthUser();

        const fieldErrors: Partial<Record<keyof ProfileFormValues, string>> = {};

        // Manual validation, consistent with client-side rules
        if (!data.name || data.name.trim().length < 1) {
            fieldErrors.name = "Name is required";
        }
        if (!data.description || data.description.trim().length < 10) {
            fieldErrors.description = "Description must be at least 10 characters";
        }
        if (!data.city || data.city.trim().length < 1) {
            fieldErrors.city = "City is required";
        }
        if (!data.country || data.country.trim().length < 1) {
            fieldErrors.country = "Country is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            return { success: false, fieldErrors };
        }

        const member = await prisma.member.update({
            where: {userId: user.id},
            data: {
                name: data.name,
                description: data.description,
                city: data.city,
                country: data.country,
            },
        });
        revalidatePath("/members");
        revalidatePath(`/members/${member.userId}`);
        return {success: true};

    } catch (e) {
        console.log(e);
        return {success: false, fieldErrors: {root: "update failed. please try again."}};
    }
};