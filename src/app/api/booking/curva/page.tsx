import prisma from '../../../../../prisma'
import { NextResponse } from 'next/server'

export default async function handler(request: Request) {
    try {
        const bookings = await prisma.booking.groupBy({
            by: ['createdAt'],
            _count: {
                id: true,
            },
        })

        // satukan jika bulan sama
        const result = bookings.reduce(
            (acc, booking) => {
                const month = booking.createdAt.getMonth() + 1
                const year = booking.createdAt.getFullYear()
                const key = `${year}-${month.toString().padStart(2, '0')}`
                acc[key] = (acc[key] || 0) + booking._count.id
                return acc
            },
            {} as Record<string, number>
        )

        return NextResponse.json(
            {
                sucess: true,
                message: 'Success get all booking',
                data: result,
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log('Get all booking error:', error)
        return NextResponse.json(
            {
                sucess: false,
                message: 'Failed get all booking',
                data: null,
            },
            {
                status: 500,
            }
        )
    }
}
