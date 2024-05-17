'use client'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { StatusComponent } from '@/components/status'

export default function Example() {
    return (
        <div className='className="px-4 sm:px-6 lg:px-8'>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Booking Detail
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Booking Detail Information
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Booking Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                Pertemuan wali murid
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Applicant Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                user 21
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Driver
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                margotfoster@example.com
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Start Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                12 June 2021
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Vehicle
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">Car</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                End Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                12 Mei 2021
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Booking Deskription
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                Fugiat ipsum ipsum deserunt culpa aute sint do
                                nostrud anim incididunt cillum culpa consequat.
                                Excepteur qui ipsum aliquip consequat sint. Sit
                                id mollit nulla mollit nostrud in ea officia
                                proident. Irure nostrud pariatur mollit ad
                                adipisicing reprehenderit deserunt qui eu.
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                <StatusComponent status={'APPROVED'} />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
