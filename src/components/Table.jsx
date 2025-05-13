// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { FaEye } from "react-icons/fa6";

// const Table = ({ data, onEdit, onDelete, onStatus }) => {

//     const [filteredData, setFilteredData] = useState(data || []);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [status, setStatus] = useState({});
//     const [limit, setLimit] = useState(10); // Default limit
//     const [sortCriteria, setSortCriteria] = useState("latest"); // Default sorting criteria

//     useEffect(() => {
//         if (data) {
//             setStatus(data.reduce((acc, row) => ({ ...acc, [row._id]: row.status }), {}));
//         }
//     }, [data]);

//     // useEffect(() => {
//     //     if (!data || data.length === 0) {
//     //         setFilteredData([]);
//     //         return;
//     //     }

//     //     let filtered = data;

//     //     // Apply search filter
//     //     if (searchTerm.trim()) {
//     //         filtered = data.filter((row) => {
//     //             return Object.keys(row).some((key) => {
//     //                 if (
//     //                     typeof row[key] === "boolean" ||
//     //                     key === "isAction" ||
//     //                     key === "isSlider" ||
//     //                     key === "isBanner" ||
//     //                     (typeof row[key] === "string" && row[key].startsWith("http"))
//     //                 ) {
//     //                     return false;
//     //                 }
//     //                 const value = String(row[key]).toLowerCase();
//     //                 return value.includes(searchTerm.toLowerCase());
//     //             });
//     //         });
//     //     }

//     //     let sortedData = [...filtered];

//     //     if (sortCriteria === "latest") {
//     //         sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     //     } else if (sortCriteria === "oldest") {
//     //         sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//     //     } else if (sortCriteria === "nameAtoZ") {
//     //         sortedData.sort((a, b) => a.name.localeCompare(b.name));
//     //     } else if (sortCriteria === "nameZtoA") {
//     //         sortedData.sort((a, b) => b.name.localeCompare(a.name));
//     //     }

//     //     // Apply limit
//     //     sortedData = sortedData.slice(0, limit);

//     //     setFilteredData(sortedData);
//     // }, [data, searchTerm, limit, sortCriteria]);

//     const getUniqueData = (data) => {
//         return data?.filter((item, index, self) =>
//             index === self.findIndex((t) => t._id === item._id)
//         );
//     };

//     useEffect(() => {
//         if (data) {
//             setStatus(
//                 data.reduce((acc, row) => ({ ...acc, [row._id]: row.status }), {})
//             );
//         }
//     }, [data]);

//     useEffect(() => {
//         if (!data || data.length === 0) {
//             setFilteredData([]);
//             return;
//         }

//         let uniqueData = getUniqueData(data); // Ensure uniqueness

//         // Apply search filter
//         if (searchTerm.trim()) {
//             uniqueData = uniqueData.filter((row) =>
//                 Object.keys(row).some((key) => {
//                     if (typeof row[key] === "boolean" || key.startsWith("is")) {
//                         return false;
//                     }
//                     const value = String(row[key]).toLowerCase();
//                     return value.includes(searchTerm.toLowerCase());
//                 })
//             );
//         }

//         // Sort data
//         let sortedData = [...uniqueData];
//         if (sortCriteria === "latest") {
//             sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         } else if (sortCriteria === "oldest") {
//             sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//         } else if (sortCriteria === "nameAtoZ") {
//             sortedData.sort((a, b) => a.name.localeCompare(b.name));
//         } else if (sortCriteria === "nameZtoA") {
//             sortedData.sort((a, b) => b.name.localeCompare(a.name));
//         }

//         // Apply limit
//         setFilteredData(sortedData.slice(0, limit));
//     }, [data, searchTerm, limit, sortCriteria]);

//     const handleEdit = (id) => {
//         if (onEdit) onEdit(id);
//         console.log("Edit clicked for ID:", id);
//     };

//     const handleDelete = (id) => {
//         if (onDelete) onDelete(id);
//         console.log("Delete clicked for ID:", id);
//     };

//     const handleToggleStatus = (id) => {
//         // Toggle the status for the specific row
//         const updatedStatus = { ...status, [id]: !status[id] };
//         setStatus(updatedStatus);

//         // Call the onStatus function with the ID and updated status
//         if (onStatus) {
//             console.log("status")
//             onStatus(id, updatedStatus[id]);
//         }
//         console.log(id, updatedStatus[id])
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleLimitChange = (e) => {
//         setLimit(Number(e.target.value));
//     };

//     const handleSortChange = (e) => {
//         setSortCriteria(e.target.value);
//     };

//     // Format date from MongoDB (ISO string) to a more readable format
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";

//         const date = new Date(dateString);

//         // Check if date is valid
//         if (isNaN(date.getTime())) return "Invalid Date";

//         // Format: "Mar 17, 2025, 2:30 PM"
//         return new Intl.DateTimeFormat('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//         }).format(date);
//     };

//     if (!data || data.length === 0) {
//         return (
//             <div className="bg-white rounded-xl shadow-md p-4 text-center text-gray-500">
//                 No Data Found
//             </div>
//         );
//     }

//     const getStatusColor = (status) => {
//         // if (!status || typeof status !== "string") {
//         //     return "bg-gray-300 text-gray-700"; // Default color for undefined/null values
//         // }

//         switch (status.toLowerCase()) {
//             case "pending":
//                 return "bg-yellow-500 text-white";
//             case "cancelled":
//                 return "bg-red-500 text-white";
//             case "complete":
//                 return "bg-green-500 text-white";
//             case "in progress":
//                 return "bg-blue-500 text-white";
//         }
//     };

//     const columns = Object.keys(data[0]).filter(column => column !== "_id" && column !== "isAction" && column !== "isSlider" && column !== "isBanner" && column !== "isCoupon" && column !== "isInquiry" && column !== "isCategory" && column !== "isVariant" && column !== "isOrderStatus" && column !== "ispayment" && column !== "isShippingPartner" && column !== "isSocial" && column !== "status" && column !== "sliderCategory" && column !== "sliderSubcategory" && column !== "bannerCategory" && column !== "bannerSubcategory");
//     console.log(data)

//     // Helper function to safely render cell content
//     const renderCellContent = (row, column) => {
//         const value = row[column];

//         // Handle different data types properly
//         if (value === null || value === undefined) {
//             return "N/A";
//         } else if (typeof value === "object") {
//             // Convert objects to string representation
//             return JSON.stringify(value);
//         } else if (column === "desktopImage" || column === "mobileImage" || column === "image" || column === "icon") {
//             return (
//                 <img
//                     src={value}
//                     alt={column}
//                     className={`${row.isSlider ? 'w-80 h-50 rounded-md' : 'w-15 h-15 rounded-full'} ${column === "desktopImage" ? 'w-80 h-30 rounded-md' : 'w-15 h-15 rounded-full'} ${column === "mobileImage" ? 'w-40 h-45 rounded-md' : 'w-15 h-15 rounded-full'} ${column === "icon" ? 'rounded-md' : 'w-15 h-15 rounded-full'} object-cover`}
//                 />
//             );
//         } else if (typeof value === "string" && value.startsWith("http")) {
//             return (
//                 <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
//                     <FaEye size={20} />
//                 </a>
//             );
//         } else if (column === "createdAt" || column === "updatedAt") {
//             return formatDate(value);
//         } else if (column.toLowerCase() === "status" || column.toLowerCase().includes("status")) {
//             return (
//                 <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(value || "")}`}>
//                     {value || "N/A"}
//                 </span>
//             );
//         }

//         // For other types, simply convert to string
//         return String(value);
//     };

//     return (
//         <div className="bg-white rounded-xl shadow-md">
//             {data[0] && (data[0].isBanner || data[0].isCoupon || data[0].isInquiry || data[0].isCategory || data[0].isVariant || data[0].isOrderStatus || data[0].isPayment || data[0].isShippingPartner || data[0].isSocial) && (
//                 <div className="px-4 py-3 bg-gray-50 rounded-2xl border-gray-200 flex justify-between items-center">
//                     <div className="relative w-64 mx-1">
//                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <FaSearch className="text-gray-400 text-sm" />
//                         </div>
//                         <input
//                             type="text"
//                             className="block w-full font-medium pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                             placeholder="Search table..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                     </div>
//                     <div className="flex space-x-4">
//                         <select
//                             className="block w-32 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                             value={limit}
//                             onChange={handleLimitChange}
//                         >
//                             <option value={5}>5</option>
//                             <option value={10}>10</option>
//                             <option value={20}>20</option>
//                             <option value={50}>50</option>
//                         </select>
//                         <select
//                             className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                             value={sortCriteria}
//                             onChange={handleSortChange}
//                         >
//                             <option value="latest">Latest</option>
//                             <option value="oldest">Oldest</option>
//                             <option value="nameAtoZ">Name A-Z</option>
//                             <option value="nameZtoA">Name Z-A</option>
//                         </select>
//                     </div>
//                 </div>
//             )}

//             <div className="overflow-x-auto shadow-lg">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
//                     <thead className="bg-gray-900 text-white">
//                         <tr>
//                             <th className="py-3 px-6 text-left">Sr No.</th>
//                             {columns.map((column) => (
//                                 <th key={column} className="py-3 px-6 text-left capitalize">
//                                     {column.replace(/([A-Z])/g, ' $1').trim()}
//                                 </th>
//                             ))}
//                             {data.some(row => row.isAction) && (
//                                 <th className="py-3 px-6 text-left">Action</th>
//                             )}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.length === 0 ? (
//                             <tr>
//                                 <td colSpan={columns.length + 1 + (data.some(row => row.isAction) ? 1 : 0)} className="py-4 px-6 text-center text-gray-500">
//                                     No matching results found
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredData.map((row, index) => (
//                                 <tr key={row.id || row._id || index} className="border-b border-gray-200 hover:bg-gray-100">
//                                     <td className="py-3 px-6">{index + 1}</td>
//                                     {columns.map((column) => (
//                                         <td key={column} className="py-3 px-6">
//                                             {renderCellContent(row, column)}
//                                         </td>
//                                     ))}
//                                     {row.isAction && (
//                                         <td className={`py-3 px-6 flex items-center space-x-3 ${row.isCoupon || row.isCategory || row.isOrderStatus || row.isPayment || row.isShippingPartner || row.isSocial || row.isVariant ? 'my-2' : row.isBanner ? 'my-[48%]' : 'my-[52%]'}`}>
//                                             <button
//                                                 className="text-blue-500 hover:text-blue-700"
//                                                 onClick={() => handleEdit(row._id)}
//                                             >
//                                                 ✏️
//                                             </button>
//                                             <button
//                                                 className="text-red-500 hover:text-red-700"
//                                                 onClick={() => handleDelete(row._id)}
//                                             >
//                                                 🗑️
//                                             </button>
//                                             <label className="flex items-center cursor-pointer">
//                                                 <input
//                                                     type="checkbox"
//                                                     className="sr-only peer"
//                                                     checked={!!status[row._id]}  // Ensure boolean value
//                                                     onChange={() => handleToggleStatus(row._id)}
//                                                 />
//                                                 <div className={`w-10 h-5 rounded-full relative transition-all ${status[row._id] ? "bg-green-500" : "bg-gray-300"}`}>
//                                                     <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${status[row._id] ? "left-6" : "left-1"}`}></div>
//                                                 </div>
//                                             </label>
//                                         </td>
//                                     )}
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Table;

// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { FaEye } from "react-icons/fa6";

// const Table = ({ data, onEdit, onDelete, onStatus }) => {
//     const [filteredData, setFilteredData] = useState(data || []);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [status, setStatus] = useState({});
//     const [limit, setLimit] = useState(10); // Default limit
//     const [sortCriteria, setSortCriteria] = useState("latest"); // Default sorting criteria

//     // Initialize status values from data when component mounts
//     useEffect(() => {
//         if (data) {
//             // Handle data with or without _id field
//             const statusObj = {};
//             data.forEach((row, index) => {
//                 const id = row._id || `row-${index}`;
//                 statusObj[id] = row.status || false;
//             });
//             setStatus(statusObj);
//         }
//     }, [data]);

//     const getUniqueData = (data) => {
//         if (!data || !data.length) return [];

//         // If data has _id field, use it for uniqueness
//         if (data[0]._id) {
//             return data.filter((item, index, self) =>
//                 index === self.findIndex((t) => t._id === item._id)
//             );
//         }

//         // Otherwise, consider each row as unique (or use another field if available)
//         return data;
//     };

//     useEffect(() => {
//         if (!data || data.length === 0) {
//             setFilteredData([]);
//             return;
//         }

//         console.log("Processing data:", data.length, "items");
//         let uniqueData = getUniqueData(data); // Ensure uniqueness

//         // Apply search filter
//         if (searchTerm.trim()) {
//             uniqueData = uniqueData.filter((row) =>
//                 Object.keys(row).some((key) => {
//                     if (typeof row[key] === "boolean" || key.startsWith("is")) {
//                         return false;
//                     }
//                     const value = String(row[key]).toLowerCase();
//                     return value.includes(searchTerm.toLowerCase());
//                 })
//             );
//         }

//         // Sort data
//         let sortedData = [...uniqueData];

//         // Check if data has these fields before sorting
//         const hasDateField = uniqueData.length > 0 &&
//                            (uniqueData[0].createdAt || uniqueData[0].orderDate);
//         const hasNameField = uniqueData.length > 0 && uniqueData[0].name;

//         if (sortCriteria === "latest" && hasDateField) {
//             sortedData.sort((a, b) => {
//                 const dateA = new Date(b.createdAt || b.orderDate);
//                 const dateB = new Date(a.createdAt || a.orderDate);
//                 return dateA - dateB;
//             });
//         } else if (sortCriteria === "oldest" && hasDateField) {
//             sortedData.sort((a, b) => {
//                 const dateA = new Date(a.createdAt || a.orderDate);
//                 const dateB = new Date(b.createdAt || b.orderDate);
//                 return dateA - dateB;
//             });
//         } else if (sortCriteria === "nameAtoZ" && hasNameField) {
//             sortedData.sort((a, b) => a.name.localeCompare(b.name));
//         } else if (sortCriteria === "nameZtoA" && hasNameField) {
//             sortedData.sort((a, b) => b.name.localeCompare(a.name));
//         }

//         // Apply limit
//         const limitedData = sortedData.slice(0, limit);
//         console.log("Filtered data:", limitedData.length, "items");
//         setFilteredData(limitedData);
//     }, [data, searchTerm, limit, sortCriteria]);

//     const handleEdit = (id) => {
//         if (onEdit) onEdit(id);
//         console.log("Edit clicked for ID:", id);
//     };

//     const handleDelete = (id) => {
//         if (onDelete) onDelete(id);
//         console.log("Delete clicked for ID:", id);
//     };

//     const handleToggleStatus = (id) => {
//         // Toggle the status for the specific row
//         const updatedStatus = { ...status, [id]: !status[id] };
//         setStatus(updatedStatus);

//         // Call the onStatus function with the ID and updated status
//         if (onStatus) {
//             console.log("status")
//             onStatus(id, updatedStatus[id]);
//         }
//         console.log(id, updatedStatus[id])
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleLimitChange = (e) => {
//         setLimit(Number(e.target.value));
//     };

//     const handleSortChange = (e) => {
//         setSortCriteria(e.target.value);
//     };

//     // Format date from MongoDB (ISO string) to a more readable format
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";

//         const date = new Date(dateString);

//         // Check if date is valid
//         if (isNaN(date.getTime())) return "Invalid Date";

//         // Format: "Mar 17, 2025, 2:30 PM"
//         return new Intl.DateTimeFormat('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//         }).format(date);
//     };

//     if (!data || data.length === 0) {
//         return (
//             <div className="bg-white rounded-xl shadow-md p-4 text-center text-gray-500">
//                 No Data Found
//             </div>
//         );
//     }

//     const getStatusColor = (status) => {
//         if (!status || typeof status !== "string") {
//             return "bg-gray-300 text-gray-700"; // Default color for undefined/null values
//         }

//         switch (status.toLowerCase()) {
//             case "pending":
//                 return "bg-yellow-500 text-white";
//             case "cancelled":
//                 return "bg-red-500 text-white";
//             case "complete":
//                 return "bg-green-500 text-white";
//             case "in progress":
//                 return "bg-blue-500 text-white";
//             default:
//                 return "bg-gray-300 text-gray-700";
//         }
//     };

//     // Determine columns dynamically based on first data item
//     // Skip reserved/special fields
//     const reservedFields = ['_id', 'isAction', 'isSlider', 'isBanner', 'isCoupon',
//                          'isInquiry', 'isCategory', 'isVariant', 'isOrderStatus',
//                          'ispayment', 'isShippingPartner', 'isSocial', 'status',
//                          'sliderCategory', 'sliderSubcategory', 'bannerCategory',
//                          'bannerSubcategory'];

//     const columns = data && data.length > 0
//         ? Object.keys(data[0]).filter(column => !reservedFields.includes(column))
//         : [];

//     // console.log("Columns to display:", columns);
//     // console.log("Filtered data count:", filteredData.length);

//     // Helper function to safely render cell content
//     const renderCellContent = (row, column) => {
//         const value = row[column];

//         // Handle different data types properly
//         if (value === null || value === undefined) {
//             return "N/A";
//         } else if (typeof value === "object") {
//             // Convert objects to string representation
//             return JSON.stringify(value);
//         } else if (column === "desktopImage" || column === "mobileImage" || column === "image" || column === "icon") {
//             return (
//                 <img
//                     src={value}
//                     alt={column}
//                     className={`${row.isSlider ? 'w-80 h-50 rounded-md' : 'w-15 h-15 rounded-full'} ${column === "desktopImage" ? 'w-80 h-30 rounded-md' : 'w-15 h-15 rounded-full'} ${column === "mobileImage" ? 'w-40 h-45 rounded-md' : 'w-15 h-15 rounded-full'} ${column === "icon" ? 'rounded-md' : 'w-15 h-15 rounded-full'} object-cover`}
//                 />
//             );
//         } else if (typeof value === "string" && value.startsWith("http")) {
//             return (
//                 <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
//                     <FaEye size={20} />
//                 </a>
//             );
//         } else if (column === "createdAt" || column === "updatedAt" || column === "orderDate") {
//             return formatDate(value);
//         } else if (column.toLowerCase() === "status" || column.toLowerCase().includes("status")) {
//             return (
//                 <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(value || "")}`}>
//                     {value || "N/A"}
//                 </span>
//             );
//         }

//         // For other types, simply convert to string
//         return String(value);
//     };

//     // Check if data has action flags
//     const hasActionColumn = data && data.some(row => row.isAction);

//     return (
//         <div className="bg-white rounded-xl shadow-md">
//             {data[0] && (data[0].isBanner || data[0].isCoupon || data[0].isInquiry || data[0].isCategory || data[0].isVariant || data[0].isOrderStatus || data[0].isPayment || data[0].isShippingPartner || data[0].isSocial) && (
//                 <div className="px-4 py-3 bg-gray-50 rounded-2xl border-gray-200 flex justify-between items-center">
//                     <div className="relative w-64 mx-1">
//                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <FaSearch className="text-gray-400 text-sm" />
//                         </div>
//                         <input
//                             type="text"
//                             className="block w-full font-medium pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                             placeholder="Search table..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                     </div>
//                     <div className="flex space-x-4">
//                         <select
//                             className="block w-32 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                             value={limit}
//                             onChange={handleLimitChange}
//                         >
//                             <option value={5}>5</option>
//                             <option value={10}>10</option>
//                             <option value={20}>20</option>
//                             <option value={50}>50</option>
//                         </select>
//                         <select
//                             className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                             value={sortCriteria}
//                             onChange={handleSortChange}
//                         >
//                             <option value="latest">Latest</option>
//                             <option value="oldest">Oldest</option>
//                             <option value="nameAtoZ">Name A-Z</option>
//                             <option value="nameZtoA">Name Z-A</option>
//                         </select>
//                     </div>
//                 </div>
//             )}

//             <div className="overflow-x-auto shadow-lg">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
//                     <thead className="bg-gray-900 text-white">
//                         <tr>
//                             <th className="py-3 px-6 text-left">Sr No.</th>
//                             {columns.map((column) => (
//                                 <th key={column} className="py-3 px-6 text-left capitalize">
//                                     {column.replace(/([A-Z])/g, ' $1').trim()}
//                                 </th>
//                             ))}
//                             {hasActionColumn && (
//                                 <th className="py-3 px-6 text-left">Action</th>
//                             )}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.length === 0 ? (
//                             <tr>
//                                 <td colSpan={columns.length + (hasActionColumn ? 2 : 1)} className="py-4 px-6 text-center text-gray-500">
//                                     No matching results found
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredData.map((row, index) => (
//                                 <tr key={row._id || `row-${index}`} className="border-b border-gray-200 hover:bg-gray-100">
//                                     <td className="py-3 px-6">{index + 1}</td>
//                                     {columns.map((column) => (
//                                         <td key={column} className="py-3 px-6">
//                                             {renderCellContent(row, column)}
//                                         </td>
//                                     ))}
//                                     {row.isAction && (
//                                         <td className={`py-3 px-6 flex items-center space-x-3 ${row.isCoupon || row.isCategory || row.isOrderStatus || row.isPayment || row.isShippingPartner || row.isSocial || row.isVariant ? 'my-2' : row.isBanner ? 'my-[48%]' : 'my-[52%]'}`}>
//                                             <button
//                                                 className="text-blue-500 hover:text-blue-700"
//                                                 onClick={() => handleEdit(row._id || `row-${index}`)}
//                                             >
//                                                 ✏️
//                                             </button>
//                                             <button
//                                                 className="text-red-500 hover:text-red-700"
//                                                 onClick={() => handleDelete(row._id || `row-${index}`)}
//                                             >
//                                                 🗑️
//                                             </button>
//                                             <label className="flex items-center cursor-pointer">
//                                                 <input
//                                                     type="checkbox"
//                                                     className="sr-only peer"
//                                                     checked={!!status[row._id || `row-${index}`]}
//                                                     onChange={() => handleToggleStatus(row._id || `row-${index}`)}
//                                                 />
//                                                 <div className={`w-10 h-5 rounded-full relative transition-all ${status[row._id || `row-${index}`] ? "bg-green-500" : "bg-gray-300"}`}>
//                                                     <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${status[row._id || `row-${index}`] ? "left-6" : "left-1"}`}></div>
//                                                 </div>
//                                             </label>
//                                         </td>
//                                     )}
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Table;

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import InvoiceComponent from "./Invoince/Invoince";
import ErrorBoundary from "../helper/ErrorBoundary";

const Table = ({
  data,
  onEdit,
  onDelete,
  onStatus,
  isOrderScroll,
  canEdit,
  canDelete,
  canActive,
  onEye,
}) => {
  // console.log(data);
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState({});
  const [limit, setLimit] = useState(10); // Default limit
  const [sortCriteria, setSortCriteria] = useState("latest"); // Default sorting criteria
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  // Initialize status values from data when component mounts
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      // Handle data with or without _id field
      const statusObj = {};
      console.log(data);
      data.forEach((row, index) => {
        const id = row._id || `row-${index}`;
        statusObj[id] = row.status || false;
      });
      setStatus(statusObj);
    }
  }, [data]);

  const getUniqueData = (data) => {
    if (!Array.isArray(data) || !data.length) return [];

    // If data has _id field, use it for uniqueness
    if (data[0]._id) {
      return data.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t._id === item._id)
      );
    }

    // Otherwise, consider each row as unique (or use another field if available)
    return [...data]; // Return a copy to avoid reference issues
  };

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setFilteredData([]);
      return;
    }

    console.log("Processing data:", data.length, "items");
    let uniqueData = getUniqueData(data); // Ensure uniqueness

    // Apply search filter
    if (searchTerm.trim()) {
      uniqueData = uniqueData.filter((row) =>
        Object.keys(row).some((key) => {
          if (typeof row[key] === "boolean" || key.startsWith("is")) {
            return false;
          }
          const value = String(row[key]).toLowerCase();
          return value.includes(searchTerm.toLowerCase());
        })
      );
    }

    // Sort data
    let sortedData = [...uniqueData];

    // Check if data has these fields before sorting
    const hasDateField =
      uniqueData.length > 0 &&
      (uniqueData[0].createdAt || uniqueData[0].updatedAt);
    const hasNameField = uniqueData.length > 0 && uniqueData[0].name;

    if (sortCriteria === "latest" && hasDateField) {
      sortedData.sort((a, b) => {
        const dateA = new Date(b.createdAt || b.updatedAt);
        const dateB = new Date(a.createdAt || a.updatedAt);
        return dateA - dateB;
      });
    } else if (sortCriteria === "oldest" && hasDateField) {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt);
        const dateB = new Date(b.createdAt || b.updatedAt);
        return dateA - dateB;
      });
    } else if (sortCriteria === "nameAtoZ" && hasNameField) {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "nameZtoA" && hasNameField) {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Apply limit and ensure result is an array
    const limitedData = Array.isArray(sortedData)
      ? sortedData.slice(0, limit)
      : [];
    console.log("Filtered data:", limitedData.length, "items");
    setFilteredData(limitedData);
  }, [data, searchTerm, limit, sortCriteria]);

  const handleView = (id) => {
    console.log("View clicked with ID:", id);
    if (!id) {
      console.error("No ID provided for invoice");
      return;
    }
    console.log("Before setting state - isInvoiceOpen:", isInvoiceOpen);
    setSelectedInvoice(id);
    setIsInvoiceOpen(true);
    console.log(
      "After setting state - immediate isInvoiceOpen:",
      isInvoiceOpen
    ); // This will still show old value
  };

  // Add this effect to log actual state changes
  useEffect(() => {
    console.log("Actual isInvoiceOpen state changed to:", isInvoiceOpen);
  }, [isInvoiceOpen]);

  const handleEdit = (id) => {
    if (onEdit) onEdit(id);
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
    console.log("Delete clicked for ID:", id);
  };

  const handleToggleStatus = (id) => {
    // Toggle the status for the specific row
    const updatedStatus = { ...status, [id]: !status[id] };
    setStatus(updatedStatus);

    // Call the onStatus function with the ID and updated status
    if (onStatus) {
      console.log("status");
      onStatus(id, updatedStatus[id]);
    }
    console.log(id, updatedStatus[id]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Format date from MongoDB (ISO string) to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid Date";

    // Format: "Mar 17, 2025, 2:30 PM"
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // Ensure safeData is always an array
  if (!Array.isArray(safeData) || safeData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 text-center text-gray-500">
        No Data Found
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (!status || typeof status !== "string") {
      return "bg-gray-300 text-gray-700"; // Default color for undefined/null values
    }

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "complete":
        return "bg-green-500 text-white";
      case "process":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  // Determine columns dynamically based on first data item
  // Skip reserved/special fields
  const reservedFields = [
    "_id",
    "isAction",
    "isSlider",
    "isBanner",
    "isCoupon",
    "isInquiry",
    "isCategory",
    "isVariant",
    "isOrderStatus",
    "isPayment",
    "isShippingPartner",
    "isSocial",
    "isBrand",
    "status",
    "sliderCategory",
    "sliderSubcategory",
    "bannerCategory",
    "bannerSubcategory",
    "brand",
    "title",
    "subTitle",
    "description",
    "userId",
    "products",
    "permissions",
    "isSubAdmin",
    "role",
    "isInquiry",
    "isUser",
    "isOrders",
    "__v",
  ];

  // const columns =
  //   safeData.length > 0
  //     ? Object.keys(safeData[0]).filter(
  //         (column) => !reservedFields.includes(column)
  //       )
  //     : [];

  // Get all columns first
  const allColumns =
    safeData.length > 0
      ? Object.keys(safeData[0]).filter(
          (column) => !reservedFields.includes(column)
        )
      : [];

  // Reorder columns to put productNames in position 3
  // Reorder columns to put productNames in position 3 and quantity right after
  const reorderedColumns = [...allColumns];
  const productNamesIndex = reorderedColumns.indexOf("productNames");
  const quantityIndex = reorderedColumns.indexOf("quantity");

  // First move productNames to position 2 (will be 3rd column after Sr No.)
  if (productNamesIndex > -1 && reorderedColumns.length > 2) {
    reorderedColumns.splice(productNamesIndex, 1);
    reorderedColumns.splice(2, 0, "productNames");
  }

  // Then move quantity right after productNames if it exists
  if (quantityIndex > -1 && reorderedColumns.includes("productNames")) {
    // Remove quantity from its current position
    const newQuantityIndex = reorderedColumns.indexOf("quantity");
    if (newQuantityIndex > -1) {
      reorderedColumns.splice(newQuantityIndex, 1);
    }

    // Find productNames position and insert quantity after it
    const afterProductNamesPos = reorderedColumns.indexOf("productNames") + 1;
    reorderedColumns.splice(afterProductNamesPos, 0, "quantity");
  }
  // console.log("Columns to display:", columns);
  // console.log("Filtered data count:", filteredData.length);

  // Toggle expanded row
  const toggleExpandRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse if already expanded
    } else {
      setExpandedRow(id); // Expand this row
    }
  };

  // Helper function to safely render cell content
  const renderCellContent = (row, column) => {
    if (!row) return "N/A";

    const value = row[column];

    // Handle different data types properly
    if (value === null || value === undefined) {
      return "N/A";
    } else if (typeof value === "object") {
      // Convert objects to string representation
      return JSON.stringify(value);
    } else if (
      column === "desktopImage" ||
      column === "mobileImage" ||
      column === "image" ||
      column === "icon"
    ) {
      return (
        <img
          src={value}
          alt={column}
          className={`${
            row.isSlider ? "w-150 h-50 rounded-md" : "w-15 h-15 rounded-full"
          } ${
            column === "desktopImage"
              ? "w-120 h-30 rounded-md"
              : "w-15 h-15 rounded-full"
          } ${
            column === "mobileImage"
              ? "w-60 h-45 rounded-md"
              : "w-15 h-15 rounded-full"
          } ${
            column === "icon" ? "rounded-md" : "w-15 h-15 rounded-full"
          } object-cover`}
        />
      );
    } else if (typeof value === "string" && value.startsWith("http")) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEye size={20} />
        </a>
      );
    } else if (
      column === "createdAt" ||
      column === "updatedAt" ||
      column === "orderDate"
    ) {
      return formatDate(value);
    } else if (
      column.toLowerCase() === "status" ||
      column.toLowerCase().includes("status")
    ) {
      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
            value || ""
          )}`}
        >
          {value || "N/A"}
        </span>
      );
    } else if (column === "productNames") {
      // Special handling for productNames
      if (!value) return "N/A";

      const isExpanded = expandedRow === row._id;
      let displayValue = String(value);

      // For array values, handle specially
      if (Array.isArray(value)) {
        displayValue = value.join(", ");
      }

      // If the row is expanded, show full content
      if (isExpanded) {
        return (
          <div className="relative">
            <div className="text-sm pb-6">{displayValue}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandRow(row._id);
              }}
              className="absolute bottom-0 right-0 text-blue-500 hover:text-blue-700 text-xs"
            >
              Show less
            </button>
          </div>
        );
      }

      // If not expanded, truncate and show expand button
      return (
        <div className="relative">
          <div className="text-sm truncate max-w-xs">
            {displayValue.length > 20
              ? displayValue.substring(0, 20) + "..."
              : displayValue}
          </div>
          {displayValue.length > 20 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandRow(row._id);
              }}
              className="text-blue-500 hover:text-blue-700 text-xs"
            >
              Show more
            </button>
          )}
        </div>
      );
    }

    // For other types, simply convert to string
    return String(value);
  };

  // Check if data has action flags - use Array.isArray to ensure it's safe
  const hasActionColumn =
    Array.isArray(safeData) && safeData.some((row) => row && row.isAction);

  // Ensure filteredData is always an array before mapping
  const safeFilteredData = Array.isArray(filteredData) ? filteredData : [];

  return (
    <div className="bg-white rounded-xl shadow-md">
      {safeData.length > 0 &&
        safeData[0] &&
        (safeData[0].isBanner ||
          safeData[0].isSlider ||
          safeData[0].isCoupon ||
          safeData[0].isInquiry ||
          safeData[0].isCategory ||
          safeData[0].isVariant ||
          safeData[0].isOrderStatus ||
          safeData[0].isPayment ||
          safeData[0].isShippingPartner ||
          safeData[0].isSocial ||
          safeData[0].isBrand ||
          safeData[0].isSubAdmin ||
          safeData[0].isInquiry ||
          safeData[0].isUser) && (
          <div className="px-4 py-3 bg-gray-50 rounded-2xl border-gray-200 flex justify-between items-center">
            <div className="relative w-64 mx-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                className="block w-full font-medium pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Search table..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex space-x-4">
              <select
                className="block w-32 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <select
                className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={sortCriteria}
                onChange={handleSortChange}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="nameAtoZ">Name A-Z</option>
                <option value="nameZtoA">Name Z-A</option>
              </select>
            </div>
          </div>
        )}

      <div
        className={`overflow-x-auto rounded-xl w-full shadow-lg ${
          isOrderScroll ? "max-w-[1668px] table-responsive overflow-x-auto" : ""
        }`}
      >
        {/* Invoice Modal */}
        {isInvoiceOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-15 z-[9999]">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">ORDER INVOINCE</h2>
                <button
                  onClick={() => setIsInvoiceOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                {selectedInvoice && (
                  <ErrorBoundary>
                    <InvoiceComponent id={selectedInvoice} />
                  </ErrorBoundary>
                )}
              </div>
            </div>
          </div>
        )}

        <table className=" bg-white border border-gray-200 rounded-xl w-full ">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Sr No.</th>
              {/* {columns.map((column) => (
                <th key={column} className="py-3 px-6 text-left capitalize">
                  {column.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))} */}
              {reorderedColumns.map((column) => (
                <th key={column} className="py-3 px-6 text-left capitalize">
                  {column.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
              {hasActionColumn &&
                (canActive || canDelete || canEdit || onEye) && (
                  <th className="py-3 px-6 text-left">Action</th>
                )}
            </tr>
          </thead>
          <tbody>
            {safeFilteredData.length === 0 ? (
              <tr>
                {/* <td
                  colSpan={columns.length + (hasActionColumn ? 2 : 1)}
                  className="py-4 px-6 text-center text-gray-500"
                > */}
                <td
                  colSpan={reorderedColumns.length + (hasActionColumn ? 2 : 1)}
                  className="py-4 px-6 text-center text-gray-500"
                >
                  No matching results found
                </td>
              </tr>
            ) : (
              safeFilteredData.map((row, index) => (
                <tr
                  key={row?._id || `row-${index}`}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  {/* {columns.map((column) => (
                    <td
                      key={column}
                      className={`py-3 px-6 ${
                        isOrderScroll ? "whitespace-nowrap" : ""
                      }`}
                    >
                      {renderCellContent(row, column)}
                    </td>
                  ))} */}
                  {reorderedColumns.map((column) => (
                    <td
                      key={column}
                      className={`py-3 px-6 ${
                        isOrderScroll ? "whitespace-nowrap" : ""
                      }`}
                    >
                      {renderCellContent(row, column)}
                    </td>
                  ))}
                  {row?.isAction &&
                    hasActionColumn &&
                    (canActive || canDelete || canEdit || onEye) && (
                      <td
                        className={`py-3 px-6 flex items-center space-x-3 ${
                          row.isCoupon ||
                          row.isCategory ||
                          row.isOrderStatus ||
                          row.isPayment ||
                          row.isShippingPartner ||
                          row.isSocial ||
                          row.isBrand ||
                          row.isVariant ||
                          row.isSubAdmin ||
                          row.isInquiry ||
                          row.isOrders ||
                          row.isUser
                            ? "my-2"
                            : row.isBanner
                            ? "my-[48%]"
                            : "my-[52%]"
                        }`}
                      >
                        {canEdit && (
                          <button
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100"
                            onClick={() =>
                              handleEdit(row._id || `row-${index}`)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                            onClick={() =>
                              handleDelete(row._id || `row-${index}`)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                        {onEye && (
                          <td>
                            <button
                              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleView(row._id);
                              }} // Pass the current row data
                            >
                              <FaEye className="h-5 w-5" />
                            </button>
                          </td>
                        )}
                        {canActive && (
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={!!status[row._id || `row-${index}`]}
                              onChange={() =>
                                handleToggleStatus(row._id || `row-${index}`)
                              }
                            />
                            <div
                              className={`w-10 h-5 rounded-full relative transition-all ${
                                status[row._id || `row-${index}`]
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                                  status[row._id || `row-${index}`]
                                    ? "left-6"
                                    : "left-1"
                                }`}
                              ></div>
                            </div>
                          </label>
                        )}
                      </td>
                    )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
