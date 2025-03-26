import React, { useEffect, useState } from 'react'
import socialLinksData from '../../../../data/social.json'
import Table from '../../../components/Table';
import SocialLinksModel from '../../../components/Website_Config/SocialLinksModel';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { deleteSocialLink, fetchSocialLinks, updateSocialLink } from '../../../redux/slices/Dashboard/Website_Config/socialLinksSlice';
const SocialLinks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [EditData, setEditData] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useDispatch();

    const { socialLinks, loading, error } = useSelector((state) => state.socialLinks);
    // console.log(paymentMethods)

    useEffect(() => {
        dispatch(fetchSocialLinks());
    }, [dispatch]);

    const onEdit = (id) => {
        const EditData = socialLinks.find((cat) => cat._id === id);

        if (EditData) {
            setEditData(EditData)
            setIsEdit(true);
            setIsModalOpen(true)
        } else {
            setIsEdit(false);
            console.log("social links not found!");
        }
    };

    const onDelete = (id) => {
        dispatch(deleteSocialLink(id))
            .then(() => {
                toast.success("social links deleted successfully!");
                console.log("social links deleted successfully!");
                dispatch(fetchSocialLinks());
            })
            .catch((error) => {
                console.error("Error deleting social links:", error);
                toast.error(error.message);
            });
    };


    const onStatus = (id, status) => {
        // console.log("id:", id);
        // console.log("status:", status);

        const updatedSocialLinks = socialLinks.find((cat) => cat._id === id);

        if (!updatedSocialLinks) {
            console.warn("social links not found in the list");
            return;
        }

        const updatedData = { ...updatedSocialLinks, status };

        // Dispatch the update action
        dispatch(updateSocialLink({ id, updatedData }))
            .then(() => {
                toast.success("social links successfully!")
                console.log("social links successfully!");

                dispatch(fetchSocialLinks());
            })
            .catch((error) => {
                console.error("Error updating status:", error);
                toast.error(error.message);
            });
    };



    return (
        <div className="flex bg-gray-100 custom-container">
            <div className="flex flex-1 flex-col">
                <header className="flex bg-gradient-to-r justify-between shadow-md text-white from-orange-500 items-center px-6 py-3 to-yellow-500">
                    <h1 className="text-2xl font-bold">Social Links</h1>
                </header>
                <div className="bg-white p-4 rounded shadow box mt-5 mx-3">
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 rounded text-white font-bold hover:bg-blue-600 px-4 py-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add Social Links
                        </button>
                        {/* <button
                            className="bg-orange-500 rounded text-white font-bold hover:bg-orange-600 px-4 py-2"
                        >
                            ☰ Sort Payment Method
                        </button> */}
                    </div>
                    <div className="py-3">
                        {loading ? (
                            <p>Loading social links...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <Table data={socialLinks} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
                        )}
                    </div>
                </div>
                {/* Add Slider Modal */}
                {isModalOpen && <SocialLinksModel onClose={() => setIsModalOpen(false)} isEdit={isEdit} EditData={EditData} />}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default SocialLinks
