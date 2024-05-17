'use client'
const people = [
    {
        name: 'Pertemuan rapat luar kota',
        title: 'user1',
        email: '12 Juni 2021 - 20 Juni 2021',
        role: 'Toyota Alpard',
    },
    {
        name: 'Pertemuan',
        title: 'user2ewekwqe',
        email: '12 Juni 2021 - 20 Oktober 2021',
        role: 'Sigra',
    },
    // More people...
]

export default function BookingPage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Booking List
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        List of Booking
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                    >
                                        Booking Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Applicant
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Vehicle
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Purpose
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {people.map((person) => (
                                    <tr key={person.email}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                            {person.name}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                            {person.title}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                            {person.email}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                            {person.role}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                                <span className="sr-only">
                                                    , {person.name}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
