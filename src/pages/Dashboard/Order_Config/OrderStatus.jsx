import React, { useEffect, useState } from 'react'
import orderStatusData from '../../../../data/orderStatus.json'
import Table from '../../../components/Table';
import OrderStatusModel from '../../../components/Order_Config/OrderStatusModel';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteOrderStatus, fetchOrderStatus, updateOrderStatus } from '../../../redux/slices/Dashboard/Order_Config/orderStatusSlice';

const OrderStatus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [EditData, setEditData] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();

    // Get orderStatus from Redux store
    const { orderStatus, loading, error } = useSelector((state) => state.orderStatus);
    console.log(orderStatus)

    // Fetch categories when component mounts
    useEffect(() => {
        dispatch(fetchOrderStatus());
    }, [dispatch]);

    const onEdit = (id) => {
        const EditData = orderStatus.find((cat) => cat._id === id);

        if (EditData) {
            setEditData(EditData)
            setIsEdit(true);
            setIsModalOpen(true)
        } else {
            setIsEdit(false);
            console.log("orderStatus not found!");
        }
    };

    const onDelete = (id) => {
        dispatch(deleteOrderStatus(id))
            .then(() => {
                toast.success("orderStatus deleted successfully!");
                console.log("orderStatus deleted successfully!");
                dispatch(fetchOrderStatus());
            })
            .catch((error) => {
                console.error("Error deleting orderStatus:", error);
                toast.error(error.message);
            });
    };


    const onStatus = (id, status) => {
        // console.log("id:", id);
        // console.log("status:", status);

        // Find the category to update
        const updatedOrderStatus = orderStatus.find((cat) => cat._id === id);

        if (!updatedOrderStatus) {
            console.warn("orderStatus not found in the list");
            return;
        }

        // Create updated category object with the new status
        const updatedData = { ...updatedOrderStatus, status };

        // Dispatch the update action
        dispatch(updateOrderStatus({ id, updatedData }))
            .then(() => {
                toast.update("Status updated successfully!")
                console.log("Status updated successfully!");

                // Refetch categories to update UI (optional)
                dispatch(fetchOrderStatus());
            })
            .catch((error) => {
                console.error("Error updating status:", error);
                toast.error(error.message);
            });
    };


    return (
        <div className="flex bg-gray-100 custom-container">
            <div className="flex-1 flex flex-col">
                <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
                    <h1 className="text-2xl font-bold">Order Status</h1>
                </header>
                <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add Order Status
                        </button>
                        {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort Order Status
                        </button> */}
                    </div>
                    <div className="py-3">
                        {loading ? (
                            <p>Loading sliders...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <Table data={orderStatus} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
                        )}
                    </div>
                </div>
                {/* Add Slider Modal */}
                {isModalOpen && <OrderStatusModel onClose={() => setIsModalOpen(false)} isEdit={isEdit} EditData={EditData} />}
            </div>
            <ToastContainer />
        </div>
    )
}

export default OrderStatus;
