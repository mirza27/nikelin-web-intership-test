import { NextResponse } from "next/server";
import prisma from "../../../../prisma";


// get all booking for admins
export function GET(request: Request) {
    try {
        const bookings: Booking[] = prisma.booking.findMany({
            include: {
                vehicle: true,
                approver: false,
                driver: false,
                user: true,
            }
        });

        return NextResponse.json(
            {
                sucess: true,
                message: "Success get all booking",
                data: bookings,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Get all booking error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to get all booking",
                error: error,
            }, {
            status: 500,
        })
    }
}

// add new booking by admin
export async function POST(request: Request) {
    const { bookingName, description, vehicleId, purpose, approverId, driverId, userId, startDate, endDate, } = await request.json();

    try {
        const newBooking = await prisma.booking.create({
            data: {
                bookingName: bookingName,
                description: description,
                vehicleId: vehicleId,
                purpose: purpose,
                approverId: approverId, // user dengan role supervisor
                driverId: driverId, // user dengan role employee sebagai pengemudi
                userId: userId, // user dengan role employee sebagai pengaju
                startDate,
                endDate
            }
        })

        // approval untuk level 1
        const newApproval = await prisma.approval.create({
            data: {
                bookingId: newBooking.id,
                approverId: approverId, // user dengan role supervisor
                level: 1,
            }
        })

        // ambil data supervisor dan manager pada departemen yang sama
        const supervisor = await prisma.user.findUnique({
            where: {
                id: approverId,
            },
        });

        if (!supervisor) {
            throw new Error('Supervisor not found');
        }

        const manager = await prisma.user.findFirst({
            where: {
                department: supervisor.department,
                role: 'MANAGER',
            },
        });

        if (!manager) {
            throw new Error('Manager not found for the given department');
        }

        const newApproval2 = await prisma.approval.create({
            data: {
                bookingId: newBooking.id,
                approverId: manager.id,
                level: 2,
            }
        })

        return NextResponse.json(
            {
                sucess: true,
                message: "Success add new booking",
                data: newBooking,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Add new booking error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to add new booking",
                error: error,
            }, {
            status: 500, // Internal Server Error
        }
        )
    }
}
