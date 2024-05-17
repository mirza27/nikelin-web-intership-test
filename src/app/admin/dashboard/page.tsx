'use client'

import React from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { ChartData } from '@/components/chart'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function AdminDashboard() {
    async function fetchAndGenerateExcel(year: number) {
        try {
            const response = await axios.get(`/api/logbook/${year}`)
            const { success, data } = response.data

            if (!success) {
                console.error('Failed to fetch data')
                return
            }

            // ubdah format tanggal
            const formatDate = (dateString: string) => {
                const date = new Date(dateString)
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            }

            // buat dataframe
            const formattedData = data.map((item: Booking) => ({
                'Tanggal Pemesanan': formatDate(
                    new Date(item.createdAt).toISOString()
                ),
                'Booking ID': item.id,
                'Nama Booking': item.bookingName,
                'Deskripsi Booking': item.description,
                'Nama Pemohon': item.user?.name,
                'Nama Kendaraan': item.vehicle?.model,
                'Nomor Kendaraan': item.vehicle?.licensePlate,
                'Tanggal Mulai': formatDate(
                    new Date(item.startDate).toISOString()
                ),
                'Tanggal Selesai': formatDate(
                    new Date(item.endDate).toISOString()
                ),
                'Status Booking': item.status,
                Purpose: item.purpose,
            }))

            // simpan excel
            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.json_to_sheet(formattedData)
            XLSX.utils.book_append_sheet(wb, ws, 'Bookings')
            XLSX.writeFile(wb, `bookings_${year}.xlsx`)
        } catch (error) {
            console.error('Error generating Excel file:', error)
        }
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their
                        name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => fetchAndGenerateExcel(2024)}
                    >
                        Export CSV
                    </button>
                </div>
            </div>
            <div className="mt-8 flex">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartData />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
