import prisma from '../../../../../prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const bookings = await prisma.booking.groupBy({
            by: ['createdAt'],
            _count: {
                id: true,
            },
        })

        // Satukan jika bulan sama
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

        const dates = Object.keys(result)
        const counts = Object.values(result)
        console.log(dates, counts)
        console.log(typeof dates)

        const data = Object.keys(result).map((date) => ({
            date: date,
            count: result[date],
        }))
        console.log(data)
        return NextResponse.json(
            {
                success: true,
                message: 'Success get all booking',
                data: data,
            },
            { status: 200 }
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
