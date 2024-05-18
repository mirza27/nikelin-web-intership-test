import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

// get all vehicle 
export async function GET(request: Request) {


    try {
        const vehicles = await prisma.vehicle.findMany({
            include: {
                bookings: false,
                fuelConsumptions: false,
                serviceHistories: false
            }
        });


        return NextResponse.json(
            {
                sucess: true,
                message: "Success get all booking",
                data: vehicles,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Get all vehicle error:", error);
        return NextResponse.json(
            {
                sucess: false,
                message: "Error get all vehicle",
                data: error,
            },

            {
                status: 500,
            });
    }
}