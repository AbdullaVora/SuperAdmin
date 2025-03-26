// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaLink, FaFile } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../../redux/slices/Dashboard/Product_Config/categorySlice";

// const BannerModel = ({ onClose, isEdit, EditData }) => {

//     const [relatedTo, setRelatedTo] = useState("");
//     // const [categoryOptions, setCategoryOptions] = useState([]);
//     const [desktopImage, setDesktopImage] = useState(null);
//     const [mobileImage, setMobileImage] = useState(null);
//     const [name, setName] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedSubcategory, setSelectedSubcategory] = useState("");
//     const [sliderLink, setSliderLink] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const dispatch = useDispatch();

//     const { categories } = useSelector(state => state.categories);

//     const brandOptions = ["NewTech", "Inc.", "Tech"];

//     useEffect(() => {
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     const categoryOptions = categories.filter(cat => cat.parent === "N/A" && cat.status === true);
//     const subcategoryOptions = categories.filter(cat => cat.parent === selectedCategory);

//     const handleRelatedChange = (e) => {
//         const selectedValue = e.target.value;
//         setRelatedTo(selectedValue);
//         setCategoryOptions(categoryData[selectedValue] || []);
//     };

//     const handleImageUpload = (event, type) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             if (type === "desktop") {
//                 setDesktopImage(imageUrl);
//             } else {
//                 setMobileImage(imageUrl);
//             }
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00]"
//             >
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">Add New Slider</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
//                         ✕
//                     </button>
//                 </div>

//                 {/* Name Field */}
//                 <label className="block mb-2 font-medium text-[#0B0F19]">Name <span className="text-red-500">*</span></label>
//                 <div className="relative w-full">
//                     <FaFile className="absolute left-3 top-3 text-gray-500" />
//                     <input
//                         type="text"
//                         className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                         placeholder="Enter Name"
//                     />
//                 </div>

//                 {/* Related To & Category */}
//                 <div className="flex space-x-4 mt-3">
//                     <div className="w-1/2">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Related To *</label>
//                         <select className="w-full p-2 border rounded" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)}>
//                             <option value="">Select</option>
//                             <option value="Brand">Brand</option>
//                             <option value="Category">Category</option>
//                         </select>
//                     </div>
//                     <div className="w-1/2">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">{relatedTo || "Select Related"} *</label>
//                         <select className="w-full p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                             <option value="">Select {relatedTo}</option>
//                             {relatedTo === "Category" && categoryOptions.map((cat, index) => (
//                                 <option key={index} value={cat.name}>{cat.name}</option>
//                             ))}
//                             {relatedTo === "Brand" && brandOptions.map((brand, index) => (
//                                 <option key={index} value={brand}>{brand}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {selectedCategory && relatedTo === "Category" && (
//                     <div className="mt-3">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Subcategory</label>
//                         <select className="w-full p-2 border rounded" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
//                             <option value="">Select Subcategory</option>
//                             {subcategoryOptions.map((sub, index) => (
//                                 <option key={index} value={sub.name}>{sub.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//                 {/* Slider Link */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Slider Link <span className="text-red-500">*</span></label>
//                 <div className="relative w-full">
//                     <FaLink className="absolute left-3 top-3 text-gray-500" />
//                     <input
//                         type="url"
//                         className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00] bg-gray-100"
//                         placeholder="Enter URL"
//                     />
//                 </div>

//                 {/* Upload Images */}
//                 <div className="grid grid-cols-2 gap-4 mt-3">
//                     {/* Desktop Image */}
//                     <div>
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Desktop Banner <span className="text-red-500">*</span></label>
//                         <div
//                             className="w-full border rounded p-3 flex justify-center items-center cursor-pointer bg-gray-100"
//                             onClick={() => document.getElementById("desktopUpload").click()}
//                         >
//                             {desktopImage ? (
//                                 <img src={desktopImage} alt="Desktop Banner" className="w-40 h-40 object-contain" />
//                             ) : (
//                                 <div className="text-gray-500 text-center">
//                                     <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                                         alt="Upload"
//                                         className="w-16 h-16 mx-auto mb-2 opacity-60" />
//                                     Click For Select Image
//                                 </div>
//                             )}
//                         </div>
//                         <input
//                             type="file"
//                             id="desktopUpload"
//                             className="hidden"
//                             onChange={(e) => handleImageUpload(e, "desktop")}
//                         />
//                     </div>

//                     {/* Mobile Image */}
//                     <div>
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Mobile Banner <span className="text-red-500">*</span></label>
//                         <div
//                             className="w-full border rounded p-3 flex justify-center items-center cursor-pointer bg-gray-100"
//                             onClick={() => document.getElementById("mobileUpload").click()}
//                         >
//                             {mobileImage ? (
//                                 <img src={mobileImage} alt="Mobile Banner" className="w-40 h-40 object-contain" />
//                             ) : (
//                                 <div className="text-gray-500 text-center">
//                                     <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                                         alt="Upload"
//                                         className="w-16 h-16 mx-auto mb-2 opacity-60" />
//                                     Click For Select Image
//                                 </div>
//                             )}
//                         </div>
//                         <input
//                             type="file"
//                             id="mobileUpload"
//                             className="hidden"
//                             onChange={(e) => handleImageUpload(e, "mobile")}
//                         />
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-2 mt-4">
//                     <button
//                         className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                         onClick={onClose}
//                     >
//                         Close
//                     </button>
//                     <button className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]">
//                         Confirm
//                     </button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default BannerModel;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLink, FaFile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { fetchCategories } from "../../../redux/slices/Dashboard/Product_Config/categorySlice";
import { addBanner, updateBanner, fetchBanners } from "../../../redux/slices/Dashboard/Banner_Config/bannerSlice"; // Assuming these actions exist
import { fetchBrands } from "../../../redux/slices/Dashboard/Product_Config/brandSlice";

const BannerModel = ({ onClose, isEdit, EditData }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { brands } = useSelector(state => state.brand);
    console.log(brands)

    const [name, setName] = useState("");
    const [relatedTo, setRelatedTo] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [bannerLink, setBannerLink] = useState("");
    const [desktopImage, setDesktopImage] = useState(null);
    const [mobileImage, setMobileImage] = useState(null);
    const [desktopImageFile, setDesktopImageFile] = useState(null);
    const [mobileImageFile, setMobileImageFile] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState("");


    // const brandOptions = ["NewTech", "Inc.", "Tech"];

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    // Set form values when EditData is available
    useEffect(() => {
        if (isEdit && EditData) {
            setName(EditData.name || "");
            setRelatedTo(EditData.relatedTo || "");
            setSelectedCategory(EditData.bannerCategory || "");
            setSelectedSubcategory(EditData.bannerSubcategory || "");
            setSelectedBrand(EditData.bannerBrand || ""); // Load brand
            setDesktopImageFile(EditData.desktopImage || "");
            setDesktopImage(EditData.desktopImage || "");
            setMobileImageFile(EditData.mobileImage || "");
            setMobileImage(EditData.mobileImage || "");
            setBannerLink(EditData.bannerLink || "");
        }
    }, [isEdit, EditData]);

    const categoryOptions = categories.filter(cat => cat.parent === "N/A" && cat.status === true);
    const subcategoryOptions = categories.filter(cat => cat.parent === selectedCategory);
    const brandOptions = brands.filter(brand => brand.parent === selectedCategory && brand.status === true);

    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            if (type === "desktop") {
                setDesktopImage(URL.createObjectURL(file));
                setDesktopImageFile(file);
            } else {
                setMobileImage(URL.createObjectURL(file));
                setMobileImageFile(file);
            }
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (typeof file === "string") {
                resolve(file); // If it's already a URL, return as is
                return;
            }

            if (!(file instanceof Blob)) {
                reject(new Error("Invalid file format"));
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB file size limit

    const handleSubmit = async () => {
        // console.log("isEdit at submit:", isEdit);
        // console.log("EditData at submit:", EditData);

        if (!name || !relatedTo || !selectedCategory || !bannerLink || !desktopImageFile || !mobileImageFile) {
            toast.error("All fields are required!", { className: "custom-toast" });
            return;
        }

        try {
            let base64DesktopImage = desktopImageFile;
            let base64MobileImage = mobileImageFile;

            // Validate and Convert Desktop Image
            if (desktopImageFile instanceof File) {
                if (desktopImageFile.size > MAX_FILE_SIZE) {
                    toast.error("Desktop image is too large! Please upload a file under 5MB.", { className: "custom-toast" });
                    return;
                }
                // console.log("Converting desktop image to base64...");
                base64DesktopImage = await convertToBase64(desktopImageFile);
                // console.log("Base64 Desktop Image Size:", base64DesktopImage.length);
            }

            // Validate and Convert Mobile Image
            if (mobileImageFile instanceof File) {
                if (mobileImageFile.size > MAX_FILE_SIZE) {
                    toast.error("Mobile image is too large! Please upload a file under 5MB.", { className: "custom-toast" });
                    return;
                }
                // console.log("Converting mobile image to base64...");
                base64MobileImage = await convertToBase64(mobileImageFile);
                // console.log("Base64 Mobile Image Size:", base64MobileImage.length);
            }

            // Payload to send to API
            const payload = {
                name,
                relatedTo,
                category: selectedCategory,
                subcategory: selectedSubcategory,
                brand: selectedBrand,
                bannerLink,
                desktopImage: base64DesktopImage,
                mobileImage: base64MobileImage,
            };

            // console.log("Payload:", payload);

            let response;
            if (isEdit && EditData) {
                console.log("Dispatching updateBanner...");
                response = await dispatch(updateBanner({ id: EditData._id, bannerData: payload })).unwrap();
            } else {
                console.log("Dispatching addBanner...");
                response = await dispatch(addBanner(payload)).unwrap();
            }

            // console.log("Response:", response);

            if (response.error) {
                throw new Error(response.error.message || "Operation failed.");
            }

            // toast.success(isEdit ? "Banner updated successfully!" : "Banner added successfully!", {className: "custom-toast"});
            dispatch(fetchBanners());

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error("Error caught in handleSubmit:", error);
            toast.error(error.message || "An error occurred.", { className: "custom-toast" });
        }
    };


    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00]"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? 'Edit' : 'Add New'} Banner</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                        ✕
                    </button>
                </div>

                {/* Name Field */}
                <label className="block mb-2 font-medium text-[#0B0F19]">Name <span className="text-red-500">*</span></label>
                <div className="relative w-full">
                    <FaFile className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Related To & Category */}
                <div className="flex space-x-4 mt-3">
                    <div className="w-1/2">
                        <label className="block mb-2 font-medium text-[#0B0F19]">Related To <span className="text-red-500">*</span></label>
                        <select
                            className="w-full p-2 border rounded"
                            value={relatedTo}
                            onChange={(e) => setRelatedTo(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Brand">Brand</option>
                            <option value="Category">Category</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2 font-medium text-[#0B0F19]">{relatedTo || "Select Related"} <span className="text-red-500">*</span></label>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select {relatedTo}</option>
                            {relatedTo === "Category" && categoryOptions.map((cat, index) => (
                                <option key={index} value={cat.name}>{cat.name}</option>
                            ))}
                            {relatedTo === "Brand" &&
                                [...new Set(brands.map((brand) => brand.parent))]
                                    .map((uniqueBrand, index) => (
                                        <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
                                    ))
                            }
                        </select>
                    </div>

                </div>

                {selectedCategory && relatedTo === "Category" && (
                    <div className="mt-3">
                        <label className="block mb-2 font-medium text-[#0B0F19]">Subcategory</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                        >
                            <option value="">Select Subcategory</option>
                            {subcategoryOptions.map((sub, index) => (
                                <option key={index} value={sub.name}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedCategory && relatedTo === "Brand" && (
                    <div className="mt-3">
                        <label className="block mb-2 font-medium text-[#0B0F19]">Brand <span className="text-red-500">*</span></label>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="">Select Brand</option>
                            {brandOptions.map((brand, index) => (
                                <option key={index} value={brand.name}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                )}


                {/* Banner Link */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Banner Link <span className="text-red-500">*</span></label>
                <div className="relative w-full">
                    <FaLink className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="url"
                        className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00] bg-gray-100"
                        placeholder="Enter URL"
                        value={bannerLink}
                        onChange={(e) => setBannerLink(e.target.value)}
                    />
                </div>

                {/* Upload Images */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                    {/* Desktop Image */}
                    <div>
                        <label className="block mb-2 font-medium text-[#0B0F19]">Desktop Banner <span className="text-red-500">*</span></label>
                        <div
                            className="w-full border rounded p-3 cursor-pointer bg-gray-100"
                            onClick={() => document.getElementById("desktopUpload").click()}
                        >
                            {desktopImage ? (
                                <img src={desktopImage} alt="Desktop Banner" className="object-contain" />
                            ) : (
                                <div className="text-gray-500 text-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
                                        alt="Upload"
                                        className="w-16 h-16 mx-auto mb-2 opacity-60" />
                                    Click For Select Image
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="desktopUpload"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, "desktop")}
                        />
                    </div>

                    {/* Mobile Image */}
                    <div>
                        <label className="block mb-2 font-medium text-[#0B0F19]">Mobile Banner <span className="text-red-500">*</span></label>
                        <div
                            className="w-full border rounded p-3 cursor-pointer bg-gray-100"
                            onClick={() => document.getElementById("mobileUpload").click()}
                        >
                            {mobileImage ? (
                                <img src={mobileImage} alt="Mobile Banner" className="object-contain" />
                            ) : (
                                <div className="text-gray-500 text-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
                                        alt="Upload"
                                        className="w-16 h-16 mx-auto mb-2 opacity-60" />
                                    Click For Select Image
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="mobileUpload"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, "mobile")}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]"
                        onClick={handleSubmit}
                    >
                        {isEdit ? 'Update' : 'Confirm'}
                    </button>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default BannerModel;