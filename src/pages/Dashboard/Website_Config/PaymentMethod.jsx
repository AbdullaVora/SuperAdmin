import React, { useEffect, useState } from 'react'
import PaymentModal from '../../../components/Website_Config/PaymentModel';
import Table from '../../../components/Table';
import paymentData from '../../../../data/payment.json';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { deletePaymentMethod, fetchPaymentMethods, updatePaymentMethod } from '../../../redux/slices/Dashboard/Website_Config/paymentMethodSlice';

const PaymentMethod = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [EditData, setEditData] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();

    const { paymentMethods, loading, error } = useSelector((state) => state.paymentMethods);
    // console.log(paymentMethods)

    useEffect(() => {
        dispatch(fetchPaymentMethods());
    }, [dispatch]);

    const onEdit = (id) => {
        const EditData = paymentMethods.find((cat) => cat._id === id);

        if (EditData) {
            setEditData(EditData)
            setIsEdit(true);
            setIsModalOpen(true)
        } else {
            setIsEdit(false);
            console.log("payment methods not found!");
        }
    };

    const onDelete = (id) => {
        dispatch(deletePaymentMethod(id))
            .then(() => {
                toast.success("payment methods deleted successfully!");
                console.log("payment methods deleted successfully!");
                dispatch(fetchPaymentMethods());
            })
            .catch((error) => {
                console.error("Error deleting payment methods:", error);
                toast.error(error.message);
            });
    };


    const onStatus = (id, status) => {
        // console.log("id:", id);
        // console.log("status:", status);

        // Find the category to update
        const updatedPaymentMethods = paymentMethods.find((cat) => cat._id === id);

        if (!updatedPaymentMethods) {
            console.warn("payment methods not found in the list");
            return;
        }

        // Create updated category object with the new status
        const updatedData = { ...updatedPaymentMethods, status };

        // Dispatch the update action
        dispatch(updatePaymentMethod({ id, updatedData }))
            .then(() => {
                toast.success("Status updated successfully!")
                console.log("Status updated successfully!");

                // Refetch categories to update UI (optional)
                dispatch(fetchPaymentMethods());
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
                    <h1 className="text-2xl font-bold">Payment Methods</h1>
                </header>
                <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add Payment Method
                        </button>
                        {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort Payment Method
                        </button> */}
                    </div>
                    <div className="py-3">
                        {loading ? (
                            <p>Loading payment methods...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <Table data={paymentMethods} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
                        )}
                    </div>
                </div>
                {/* Add Slider Modal */}
                {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} isEdit={isEdit} EditData={EditData} />}
            </div>
            <ToastContainer />
        </div>
    )
}

export default PaymentMethod;
