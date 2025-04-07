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




// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaLink, FaFile } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import { fetchCategories } from "../../../redux/slices/Dashboard/Product_Config/categorySlice";
// import { addBanner, updateBanner, fetchBanners } from "../../../redux/slices/Dashboard/Banner_Config/bannerSlice"; // Assuming these actions exist
// import { fetchBrands } from "../../../redux/slices/Dashboard/Product_Config/brandSlice";

// const BannerModel = ({ onClose, isEdit, EditData }) => {
//     const dispatch = useDispatch();
//     const { categories } = useSelector(state => state.categories);
//     const { brands } = useSelector(state => state.brand);

//     const [name, setName] = useState("");
//     const [forPage, setForPage] = useState("");
//     const [selectedSection, setSelectedSection] = useState("");
//     const [relatedTo, setRelatedTo] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedSubcategory, setSelectedSubcategory] = useState("");
//     const [bannerLink, setBannerLink] = useState("");
//     const [desktopImage, setDesktopImage] = useState(null);
//     const [mobileImage, setMobileImage] = useState(null);
//     const [desktopImageFile, setDesktopImageFile] = useState(null);
//     const [mobileImageFile, setMobileImageFile] = useState(null);
//     const [selectedBrand, setSelectedBrand] = useState("");

//     // Define page and section options
//     const pageSectionMap = {
//         Home: ["Banner", "Testimonials", "Flash Deals", "Latest News"],
//         Collection: ["Banner", "Products"],
//         Blog: ["Banner", "Blogs"],
//         About: ["Banner", "Main"]
//     };

//     const pageOptions = Object.keys(pageSectionMap);
//     const sectionOptions = forPage ? pageSectionMap[forPage] : [];

//     useEffect(() => {
//         dispatch(fetchCategories());
//         dispatch(fetchBrands());
//     }, [dispatch]);

//     // Set form values when EditData is available
//     useEffect(() => {
//         if (isEdit && EditData) {
//             setName(EditData.name || "");
//             setForPage(EditData.forPage || "");
//             setSelectedSection(EditData.section || "");
//             setRelatedTo(EditData.relatedTo || "");
//             setSelectedCategory(EditData.bannerCategory || "");
//             setSelectedSubcategory(EditData.bannerSubcategory || "");
//             setSelectedBrand(EditData.bannerBrand || "");
//             setDesktopImageFile(EditData.desktopImage || "");
//             setDesktopImage(EditData.desktopImage || "");
//             setMobileImageFile(EditData.mobileImage || "");
//             setMobileImage(EditData.mobileImage || "");
//             setBannerLink(EditData.bannerLink || "");
//         }
//     }, [isEdit, EditData]);

//     const categoryOptions = categories.filter(cat => cat.parent === "N/A" && cat.status === true);
//     const subcategoryOptions = categories.filter(cat => cat.parent === selectedCategory);
//     const brandOptions = brands.filter(brand => brand.parent === selectedCategory && brand.status === true);

//     const handleImageUpload = (event, type) => {
//         const file = event.target.files[0];
//         if (file) {
//             if (type === "desktop") {
//                 setDesktopImage(URL.createObjectURL(file));
//                 setDesktopImageFile(file);
//             } else {
//                 setMobileImage(URL.createObjectURL(file));
//                 setMobileImageFile(file);
//             }
//         }
//     };

//     const convertToBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             if (typeof file === "string") {
//                 resolve(file);
//                 return;
//             }

//             if (!(file instanceof Blob)) {
//                 reject(new Error("Invalid file format"));
//                 return;
//             }

//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = (error) => reject(error);
//         });
//     };

//     const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB file size limit

//     const handleSubmit = async () => {
//         if (!name || !relatedTo || !selectedCategory || !bannerLink || !desktopImageFile || !mobileImageFile || !forPage || !selectedSection) {
//             toast.error("All fields are required!", { className: "custom-toast" });
//             return;
//         }

//         try {
//             let base64DesktopImage = desktopImageFile;
//             let base64MobileImage = mobileImageFile;

//             if (desktopImageFile instanceof File) {
//                 if (desktopImageFile.size > MAX_FILE_SIZE) {
//                     toast.error("Desktop image is too large! Please upload a file under 5MB.", { className: "custom-toast" });
//                     return;
//                 }
//                 base64DesktopImage = await convertToBase64(desktopImageFile);
//             }

//             if (mobileImageFile instanceof File) {
//                 if (mobileImageFile.size > MAX_FILE_SIZE) {
//                     toast.error("Mobile image is too large! Please upload a file under 5MB.", { className: "custom-toast" });
//                     return;
//                 }
//                 base64MobileImage = await convertToBase64(mobileImageFile);
//             }

//             const payload = {
//                 name,
//                 relatedTo,
//                 forPage,
//                 forSection: selectedSection,
//                 category: selectedCategory,
//                 subcategory: selectedSubcategory,
//                 brand: selectedBrand,
//                 bannerLink,
//                 desktopImage: base64DesktopImage,
//                 mobileImage: base64MobileImage,
//             };

//             let response;
//             if (isEdit && EditData) {
//                 response = await dispatch(updateBanner({ id: EditData._id, bannerData: payload })).unwrap();
//             } else {
//                 response = await dispatch(addBanner(payload)).unwrap();
//             }

//             if (response.error) {
//                 throw new Error(response.error.message || "Operation failed.");
//             }

//             dispatch(fetchBanners());
//             setTimeout(() => {
//                 onClose();
//             }, 1000);
//         } catch (error) {
//             console.error("Error caught in handleSubmit:", error);
//             toast.error(error.message || "An error occurred.", { className: "custom-toast" });
//         }
//     };

//     return (
//         <div className="fixed mt-20 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00] max-h-[90vh] flex flex-col"
//             >
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? 'Edit' : 'Add New'} Banner</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
//                         ✕
//                     </button>
//                 </div>

//                 <div className="overflow-y-auto flex-1 pr-2">
//                     {/* Name Field */}
//                     <label className="block mb-2 font-medium text-[#0B0F19]">Name <span className="text-red-500">*</span></label>
//                     <div className="relative w-full">
//                         <FaFile className="absolute left-3 top-3 text-gray-500" />
//                         <input
//                             type="text"
//                             className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                             placeholder="Enter Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>

//                     {/* Page and Section Dropdowns */}
//                     <div className="flex space-x-4 mt-3">
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Page <span className="text-red-500">*</span></label>
//                             <select
//                                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                                 value={forPage}
//                                 onChange={(e) => {
//                                     setForPage(e.target.value);
//                                     setSelectedSection(""); // Reset section when page changes
//                                 }}
//                             >
//                                 <option value="">Select a Page</option>
//                                 {pageOptions.map((page) => (
//                                     <option key={page} value={page}>
//                                         {page}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Section <span className="text-red-500">*</span></label>
//                             <select
//                                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                                 value={selectedSection}
//                                 onChange={(e) => setSelectedSection(e.target.value)}
//                                 disabled={!forPage}
//                             >
//                                 <option value="">Select a Section</option>
//                                 {sectionOptions.map((section) => (
//                                     <option key={section} value={section}>
//                                         {section}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Related To & Category */}
//                     <div className="flex space-x-4 mt-3">
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Related To <span className="text-red-500">*</span></label>
//                             <select
//                                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                                 value={relatedTo}
//                                 onChange={(e) => setRelatedTo(e.target.value)}
//                             >
//                                 <option value="">Select</option>
//                                 <option value="Brand">Brand</option>
//                                 <option value="Category">Category</option>
//                             </select>
//                         </div>
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">{relatedTo || "Select Related"} <span className="text-red-500">*</span></label>
//                             <select
//                                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                                 value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}
//                             >
//                                 <option value="">Select {relatedTo}</option>
//                                 {relatedTo === "Category" && categoryOptions.map((cat, index) => (
//                                     <option key={index} value={cat.name}>{cat.name}</option>
//                                 ))}
//                                 {relatedTo === "Brand" &&
//                                     [...new Set(brands.map((brand) => brand.parent))]
//                                         .map((uniqueBrand, index) => (
//                                             <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
//                                         ))
//                                 }
//                             </select>
//                         </div>
//                     </div>

//                     {selectedCategory && relatedTo === "Category" && (
//                         <div className="mt-3">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Subcategory</label>
//                             <select
//                                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                                 value={selectedSubcategory}
//                                 onChange={(e) => setSelectedSubcategory(e.target.value)}
//                             >
//                                 <option value="">Select Subcategory</option>
//                                 {subcategoryOptions.map((sub, index) => (
//                                     <option key={index} value={sub.name}>{sub.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}

//                     {selectedCategory && relatedTo === "Brand" && (
//                         <div className="mt-3">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Brand <span className="text-red-500">*</span></label>
//                             <select
//                                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                                 value={selectedBrand}
//                                 onChange={(e) => setSelectedBrand(e.target.value)}
//                             >
//                                 <option value="">Select Brand</option>
//                                 {brandOptions.map((brand, index) => (
//                                     <option key={index} value={brand.name}>{brand.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}

//                     {/* Banner Link */}
//                     <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Banner Link <span className="text-red-500">*</span></label>
//                     <div className="relative w-full">
//                         <FaLink className="absolute left-3 top-3 text-gray-500" />
//                         <input
//                             type="url"
//                             className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00] bg-gray-100"
//                             placeholder="Enter URL"
//                             value={bannerLink}
//                             onChange={(e) => setBannerLink(e.target.value)}
//                         />
//                     </div>

//                     {/* Upload Images */}
//                     <div className="grid grid-cols-2 gap-4 mt-3">
//                         {/* Desktop Image */}
//                         <div>
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Desktop Banner <span className="text-red-500">*</span></label>
//                             <div
//                                 className="w-full border rounded p-3 cursor-pointer bg-gray-100"
//                                 onClick={() => document.getElementById("desktopUpload").click()}
//                             >
//                                 {desktopImage ? (
//                                     <img src={desktopImage} alt="Desktop Banner" className="object-contain" />
//                                 ) : (
//                                     <div className="text-gray-500 text-center">
//                                         <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                                             alt="Upload"
//                                             className="w-16 h-16 mx-auto mb-2 opacity-60" />
//                                         Click For Select Image
//                                     </div>
//                                 )}
//                             </div>
//                             <input
//                                 type="file"
//                                 id="desktopUpload"
//                                 className="hidden"
//                                 onChange={(e) => handleImageUpload(e, "desktop")}
//                             />
//                         </div>

//                         {/* Mobile Image */}
//                         <div>
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Mobile Banner <span className="text-red-500">*</span></label>
//                             <div
//                                 className="w-full border rounded p-3 cursor-pointer bg-gray-100"
//                                 onClick={() => document.getElementById("mobileUpload").click()}
//                             >
//                                 {mobileImage ? (
//                                     <img src={mobileImage} alt="Mobile Banner" className="object-contain" />
//                                 ) : (
//                                     <div className="text-gray-500 text-center">
//                                         <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                                             alt="Upload"
//                                             className="w-16 h-16 mx-auto mb-2 opacity-60" />
//                                         Click For Select Image
//                                     </div>
//                                 )}
//                             </div>
//                             <input
//                                 type="file"
//                                 id="mobileUpload"
//                                 className="hidden"
//                                 onChange={(e) => handleImageUpload(e, "mobile")}
//                             />
//                         </div>
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
//                     <button
//                         className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]"
//                         onClick={handleSubmit}
//                     >
//                         {isEdit ? 'Update' : 'Confirm'}
//                     </button>
//                 </div>
//             </motion.div>
//             <ToastContainer />
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
import { addBanner, updateBanner, fetchBanners } from "../../../redux/slices/Dashboard/Banner_Config/bannerSlice";
import { fetchBrands } from "../../../redux/slices/Dashboard/Product_Config/brandSlice";

const BannerModel = ({ onClose, isEdit, EditData }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { brands } = useSelector(state => state.brand);

    const [name, setName] = useState("");
    const [forPage, setForPage] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [relatedTo, setRelatedTo] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [bannerLink, setBannerLink] = useState("");
    const [desktopImage, setDesktopImage] = useState(null);
    const [mobileImage, setMobileImage] = useState(null);
    const [desktopImageFile, setDesktopImageFile] = useState(null);
    const [mobileImageFile, setMobileImageFile] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [title, setBlogTitle] = useState("");
    const [description, setBlogDescription] = useState("");

    // Define page and section options
    const pageSectionMap = {
        Home: ["Banner", "Testimonials", "Flash Deals", "Latest News"],
        Collection: ["Banner", "Products"],
        Blog: ["Banner", "Blogs"],
        About: ["Banner", "Main"]
    };

    const pageOptions = Object.keys(pageSectionMap);
    const sectionOptions = forPage ? pageSectionMap[forPage] : [];

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    // Set form values when EditData is available
    useEffect(() => {
        if (isEdit && EditData) {
            setName(EditData.name || "");
            setForPage(EditData.forPage || "");
            setSelectedSection(EditData.forSection || "");
            setRelatedTo(EditData.relatedTo || "");
            setSelectedCategory(EditData.bannerCategory || "");
            setSelectedSubcategory(EditData.bannerSubcategory || "");
            setSelectedBrand(EditData.bannerBrand || "");
            setDesktopImageFile(EditData.desktopImage || "");
            setDesktopImage(EditData.desktopImage || "");
            setMobileImageFile(EditData.mobileImage || "");
            setMobileImage(EditData.mobileImage || "");
            setBannerLink(EditData.bannerLink || "");
            setBlogTitle(EditData.name || "");
            setBlogDescription(EditData.description || "");
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
                resolve(file);
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
        // Basic validation
        if (!name || !forPage || !selectedSection || !desktopImageFile || !mobileImageFile) {
            toast.error("Required fields are missing!", { className: "custom-toast" });
            return;
        }

        // Additional validation for Blog section
        if (selectedSection === "Blogs" && (!title || !description)) {
            toast.error("Blog title and description are required!", { className: "custom-toast" });
            return;
        }

        try {
            let base64DesktopImage = desktopImageFile;
            let base64MobileImage = mobileImageFile;

            if (desktopImageFile instanceof File) {
                if (desktopImageFile.size > MAX_FILE_SIZE) {
                    toast.error("Desktop image is too large! Please upload a file under 5MB.", { className: "custom-toast" });
                    return;
                }
                base64DesktopImage = await convertToBase64(desktopImageFile);
            }

            if (mobileImageFile instanceof File) {
                if (mobileImageFile.size > MAX_FILE_SIZE) {
                    toast.error("Mobile image is too large! Please upload a file under 5MB.", { className: "custom-toast" });
                    return;
                }
                base64MobileImage = await convertToBase64(mobileImageFile);
            }

            const payload = {
                name,
                relatedTo,
                forPage,
                forSection: selectedSection,
                category: selectedCategory,
                subcategory: selectedSubcategory,
                brand: selectedBrand,
                bannerLink,
                desktopImage: base64DesktopImage,
                mobileImage: base64MobileImage,
                ...(selectedSection === "Blogs" && {
                    name: title,
                    description
                })
            };

            let response;
            if (isEdit && EditData) {
                response = await dispatch(updateBanner({ id: EditData._id, bannerData: payload })).unwrap();
            } else {
                response = await dispatch(addBanner(payload)).unwrap();
            }

            if (response.error) {
                throw new Error(response.error.message || "Operation failed.");
            }

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
        <div className="fixed mt-20 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00] max-h-[90vh] flex flex-col"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? 'Edit' : 'Add New'} Banner</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                        ✕
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 pr-2">
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

                    {/* Page and Section Dropdowns */}
                    <div className="flex space-x-4 mt-3">
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Page <span className="text-red-500">*</span></label>
                            <select
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                                value={forPage}
                                onChange={(e) => {
                                    setForPage(e.target.value);
                                    setSelectedSection(""); // Reset section when page changes
                                }}
                            >
                                <option value="">Select a Page</option>
                                {pageOptions.map((page) => (
                                    <option key={page} value={page}>
                                        {page}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Section <span className="text-red-500">*</span></label>
                            <select
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                disabled={!forPage}
                            >
                                <option value="">Select a Section</option>
                                {sectionOptions.map((section) => (
                                    <option key={section} value={section}>
                                        {section}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Show Blog fields only when Blog section is selected */}
                    {selectedSection === "Blogs" && (
                        <div className="mt-3">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Blog Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                                placeholder="Enter Blog Title"
                                value={title}
                                onChange={(e) => setBlogTitle(e.target.value)}
                            />

                            <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Blog Description <span className="text-red-500">*</span></label>
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                                placeholder="Enter Blog Description"
                                rows={3}
                                value={description}
                                onChange={(e) => setBlogDescription(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Related To & Category */}

                    <div className="flex space-x-4 mt-3">
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Related To <span className="text-red-500">*</span></label>
                            <select
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
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
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
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
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
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
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
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