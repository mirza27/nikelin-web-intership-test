import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { getSession } from "@/app/lib/session";


interface Params {
    id: string;
}

// update approval status
export async function PATCH(request: Request, { params }: { params: Params }) {
    const approval_id = parseInt(params.id);
    const {
        approvalStatus, comments,
    } = await request.json();

    try {
        if (isNaN(approval_id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID cannot be empty or must be a valid number",
                    data: null,
                },
                {
                    status: 400, // Bad Request
                }
            );
        }

        // set any level approval rejected / approved 
        const updatedApproval: Approval = await prisma.approval.update({
            where: {
                id: approval_id
            },
            data: {
                status: approvalStatus,
                comments: comments
            }
        });


        // update booking status
        const approvals = await prisma.approval.findMany({
            where: {
                bookingId: updatedApproval.bookingId
            }
        });

        // cek setiap approval status
        const allApproved = approvals.every((a: any) => a.status === ApprovalStatus.APPROVED);
        const allRejected = approvals.every((a: any) => a.status === ApprovalStatus.REJECTED);

        let newBookingStatus: BookingStatus | null = null;

        if (allApproved) {
            newBookingStatus = BookingStatus.APPROVED;
        } else if (allRejected) {
            newBookingStatus = BookingStatus.REJECTED;
        }

        // update status booking
        if (newBookingStatus) {
            await prisma.booking.update({
                where: {
                    id: updatedApproval.bookingId
                },
                data: {
                    status: newBookingStatus
                }
            });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Success update approval status",
                data: updatedApproval,
            },
            {
                status: 200, // OK
            }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Cannot update Approval",
            error: error,
        },
            {
                status: 404, // OK
            })
    }

}
