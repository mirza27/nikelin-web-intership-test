import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { getSession } from "@/app/lib/session";
import { NextApiRequest, NextApiResponse } from 'next'


// get user session
export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "You haven't logged in",
            data: null
        }, { status: 400 },)
    } else if (session.role == 'admin') {
        console.log("bukan admin")
        return NextResponse.json({
            success: true,
            message: "You are logged in",
            is_admin: true,
            user: session.user,
        }, { status: 200 },)
    } else {
        return NextResponse.json({
            success: true,
            message: "You are logged in",
            is_admin: false,
            user: session.user,
        }, { status: 200 },)
    }
}