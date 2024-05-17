import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { getSession } from "@/app/lib/session";

// get all approval for logged user (supervisor / manager)
export async function GET(request: Request) {
    const session = await getSession();

    try {
        const approvals: Approval[] = await prisma.approval.findMany({
            where: {
                approverId: session?.userId,
            }
        })

        if (!approvals.length) {
            return NextResponse.json({
                success: false,
                message: "No approval found",
                data: null
            }, { status: 404 })
        } else {
            return NextResponse.json({
                success: true,
                message: "Success",
                data: approvals
            }, { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error: error
        }, { status: 500 })
    }
}