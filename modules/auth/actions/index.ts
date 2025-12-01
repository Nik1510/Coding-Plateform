"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getUserById = async(id:string)=>{
    try {
        const user = await db.user.findUnique({
            where:{id},
            include:{
                accounts:true
            }
        })
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAccountByUserId = async(userId:String)=>{
    try {
        const account =await db.account.findFirst({
            where:{
                userId
            }
        })
        return account;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const currentUser = async()=>{
    const user = await auth();
    return user?.user
}