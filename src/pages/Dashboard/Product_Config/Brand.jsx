import React, { useEffect, useState } from 'react'
// import brandData from '../../../../data/brand.json'
import Table from '../../../components/Table';
// import brandModel from '../../../components/Product_Config/brandModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, fetchBrands, updateBrand } from '../../../redux/slices/Dashboard/Product_Config/brandSlice';
import BrandModel from '../../../components/Product_Config/BrandModel';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Brand = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [EditData, setEditData] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();

    // Get categories from Redux store
    const { brands, loading: brandLoading, error } = useSelector((state) => state.brand);
    console.log(brands)

    // Fetch categories when component mounts
    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    const onEdit = (id) => {
        const EditData = brands.find((cat) => cat._id === id);

        if (EditData) {
            setEditData(EditData)
            setIsEdit(true);
            setIsModalOpen(true)
            console.log("Editing brand:", EditData);
            // Perform edit operation, such as opening a modal with brand details
        } else {
            setIsEdit(false);
            console.log("brand not found!");
        }
    };

    const onDelete = (id) => {
        dispatch(deleteBrand(id))
            .then(() => {
                toast.success("Brand deleted successfully!")
                console.log("brand deleted successfully!");
                dispatch(fetchBrands());
            })
            .catch((error) => {
                toast.error(error.message);
                console.error("Error deleting brand:", error);
            });
    };



    const onStatus = (id, status) => {
        // console.log("id:", id);
        // console.log("status:", status);

        // Find the brand to update
        const updatedbrand = brands.find((cat) => cat._id === id);

        if (!updatedbrand) {
            console.warn("brand not found in the list");
            return;
        }

        // Create updated brand object with the new status
        const updatedData = { ...updatedbrand, status };

        // Dispatch the update action
        dispatch(updateBrand({ id, updatedData }))
            .then(() => {
                toast.success("Status updated successfully!")
                console.log("Status updated successfully!");

                // Refetch categories to update UI (optional)
                dispatch(fetchBrands());
            })
            .catch((error) => {
                toast.error(error.message);
                console.error("Error updating status:", error);
            });
    };

    if (brandLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span class="loader"></span>
            </div>
        );
    }


    return (
        <div className="flex bg-gray-100 custom-container">
            <div className="flex-1 flex flex-col">
                <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
                    <h1 className="text-2xl font-bold">Brands</h1>
                </header>
                <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add brand
                        </button>
                        {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort brand
                        </button> */}
                    </div>
                    <div className="py-3">
                        {brandLoading ? (
                            <p>{brandLoading}</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <Table data={brands} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
                        )}
                    </div>
                </div>
                {/* Add Slider Modal */}
                {isModalOpen && <BrandModel onClose={() => setIsModalOpen(false)} EditData={EditData} isEdit={isEdit} />}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Brand
