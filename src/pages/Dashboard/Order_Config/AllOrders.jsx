import React, { useState } from "react";
import Table from "../../../components/Table";
import todayOrdersData from "../../../../data/allOrders.json";

const AllOrders = () => {
    const [orders, setOrders] = useState(todayOrdersData);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(10);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Handle search functionality
    const filteredOrders = orders
        .filter(order =>
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(order => {
            const orderDate = new Date(order.orderDate);
            if (fromDate && toDate) {
                return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
            }
            return true; // Show all orders if no date is selected
        })
        .slice(0, limit);


    return (
        <div className="flex bg-gray-100 custom-container">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-orange-500 text-white px-6 py-3 shadow-md flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Today's Orders</h1>
                </header>

                {/* Filters Section */}
                <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium">From Date</label>
                            <input
                                type="date"
                                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">To Date</label>
                            <input
                                type="date"
                                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Status Types</label>
                            <input
                                type="text"
                                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Enter status"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Customer Email or Mobile</label>
                            <input
                                type="text"
                                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="email or mobile"
                            />
                        </div>
                    </div>

                    {/* Filter Button */}
                    {/* <div className="flex justify-end mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Filter
                        </button>
                    </div> */}
                </div>

                {/* Orders Table */}
                <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Today's Orders</h2>

                        <div className="flex space-x-4">
                            {/* Search Bar on the Right */}
                            <input
                                type="search"
                                className="border px-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* Limit Dropdown */}
                            <select
                                className="border px-3 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>

                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                                Export to Excel
                            </button>
                        </div>
                    </div>

                    {/* Table Component */}
                    <div>
                        <Table data={filteredOrders} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
