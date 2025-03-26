import React, { useState } from "react";
import {
    FaBars,
    FaHome,
    FaCogs,
    FaShoppingCart,
    FaGlobe,
    FaEnvelope,
    FaUsers,
    FaLayerGroup,
    FaComment,
    FaDatabase,
    FaChevronDown,
    FaGift,
    FaShippingFast,
} from "react-icons/fa";
import { BiSolidSlideshow } from "react-icons/bi";
import { TbCategoryFilled } from "react-icons/tb";
import { LuPackageOpen, LuPackagePlus, LuPackageSearch } from "react-icons/lu";
import { MdPayments } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";





const menuItems = [
    { id: 1, icon: <FaHome />, label: "Dashboard", link: "dashboard" },
    {
        id: 2,
        icon: <FaLayerGroup size={16} />,
        label: "Banner Config",
        dropdown: [
            { id: "2-1", icon: <BiSolidSlideshow size={18} />, label: "Slider", link: "slider" },
            { id: "2-2", icon: <BiSolidSlideshow size={18} />, label: "Banner", link: "banner" },
            { id: "2-3", icon: <FaGift size={16} />, label: "Coupon", link: "coupon" },
        ],
    },
    { id: 3, icon: <FaShoppingCart size={16} />, label: "Product Inquiry", link: "product-inquiry" },
    { id: 4, icon: <FaDatabase size={16} />, label: "Product", link: 'products' },
    {
        id: 5,
        icon: <FaCogs size={16} />,
        label: "Product Config",
        dropdown: [
            { id: "5-1", icon: <TbCategoryFilled size={18} />, label: "Category", link: "category" },
            { id: "5-2", icon: <TbCategoryFilled size={18} />, label: "Variants", link: "variants" },
            { id: "5-3", icon: <TbCategoryFilled size={18} />, label: "Brands", link: "brands" },
        ],
    },
    {
        id: 6, icon: <FaGlobe size={16} />, label: "Order Config", dropdown: [
            { id: "6-1", icon: <LuPackageSearch size={22} />, label: "Order Status", link: "order-status" },
            // { id: "6-1", icon: <LuPackagePlus size={22} />, label: "Today Orders", link: "today-orders" },
            { id: "6-1", icon: <LuPackageOpen size={22} />, label: "All Orders", link: "all-orders" },
        ]
    },
    {
        id: 7, icon: <FaEnvelope size={16} />, label: "Website Config", dropdown: [
            { id: "7-1", icon: <MdPayments size={22} />, label: "Payment Method", link: "payment-method" },
            { id: "7-1", icon: <FaShippingFast size={22} />, label: "Shipping Partners", link: "shipping-partners" },
            { id: "7-1", icon: <PiLinkSimpleBold size={22} />, label: "Social Links", link: "social-links" },
        ]
    },
    // { id: 8, icon: <FaUsers size={16} />, label: "User" },
    // { id: 9, icon: <FaComment size={16} />, label: "Testimonial" },
];

const Aside = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <aside className={`bg-black fixed top-[7%] text-white h-screen ${isExpanded ? "w-56 me-[220px]" : "w-20"} transition-all duration-300 p-4 flex flex-col overflow-y-auto`}>

            {/* Sidebar Toggle */}
            {/* <button className={`text-white text-xl mt-2 ${!isExpanded ? 'ms-3' : ''} mb-6`} onClick={() => setIsExpanded(!isExpanded)}>
                <FaBars />
            </button> */}

            {/* Sidebar Items */}
            <nav className="flex flex-col pt-15 space-y-2 text-[12px] font-bold">
                {menuItems.map((item) => (
                    <div key={item.id}>
                        <SidebarItem
                            icon={item.icon}
                            label={item.label}
                            isExpanded={isExpanded}
                            hasDropdown={!!item.dropdown}
                            isOpen={openDropdown === item.id}
                            toggleDropdown={() => toggleDropdown(item.id)}
                            link={item.link}
                            dropdown={item.dropdown} // ✅ Pass dropdown array to SidebarItem
                        />
                        {/* Render Dropdown Items */}
                        {item.dropdown && openDropdown === item.id && isExpanded && (
                            <div className="ml-3">
                                {item.dropdown.map((subItem) => (
                                    <SidebarItem
                                        key={subItem.id}
                                        icon={subItem.icon}
                                        label={subItem.label}
                                        isExpanded={isExpanded}
                                        isSubItem
                                        link={subItem.link}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

        </aside>
    );
};




const SidebarItem = ({ icon, label, isExpanded, hasDropdown, isOpen, toggleDropdown, isSubItem, link, dropdown }) => {
    const location = useLocation();

    // Convert relative links to absolute paths
    const fullLink = link ? `/${link}` : "#";

    // Check if current item is active
    const isActive = location.pathname === fullLink;

    // Check if any dropdown item is active (for parent items)
    const isDropdownActive = hasDropdown && dropdown?.some(sub => location.pathname.startsWith(`/${sub.link}`));

    return (
        <div>
            <Link
                to={hasDropdown ? "#" : fullLink} // Prevent navigation for dropdown parent
                className={`flex items-center p-3 rounded-lg transition-all cursor-pointer  
                    ${(isActive || isDropdownActive) ? "bg-blue-600 text-white" : "hover:bg-gray-700"} 
                    ${hasDropdown && isOpen ? "bg-gray-800" : ""}`}
                onClick={(e) => {
                    if (hasDropdown) {
                        e.preventDefault(); // Prevent navigation when toggling dropdown
                        toggleDropdown();
                    }
                }}
            >
                <span className="text-xl">{icon}</span>
                {isExpanded && <span className="ml-3 flex-grow">{label}</span>}
                {hasDropdown && isExpanded && (
                    <FaChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                )}
            </Link>
        </div>
    );
};




export default Aside;
