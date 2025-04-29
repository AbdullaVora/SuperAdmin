import React, { useState } from 'react';
import { FaGift, FaHome, FaLayerGroup, FaShippingFast, FaShoppingCart } from 'react-icons/fa';
import { FiHome, FiUsers, FiFileText, FiShoppingCart, FiSettings } from 'react-icons/fi';
import { LuPackageOpen } from 'react-icons/lu';
import { MdPayments } from 'react-icons/md';
import { PiLinkSimpleBold } from 'react-icons/pi';
import { TbCategoryFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { createSubAdmin } from '../../../redux/slices/Dashboard/SubAdmin/subAdminSlice';

const AddSubAdmin = () => {

    const dispatch = useDispatch()

    // Configuration for permission sections
    const permissionSections = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            icon: FaHome,
            description: 'Access to dashboard overview',
            permissions: {
                dashboard: {
                    type: 'toggle',
                    default: true
                },
                // view: {
                //     label: 'View Users',
                //     default: true
                // },
            }
        },
        {
            id: 'banner_config',
            title: 'Banner Config',
            icon: FaLayerGroup,
            description: 'Manage Banner Config Operations',
            permissions: {
                view: {
                    label: 'View Banners',
                    default: true
                },
                create: {
                    label: 'Create Banners',
                    default: false
                },
                edit: {
                    label: 'Edit Banners',
                    default: false
                },
                delete: {
                    label: 'Delete Banners',
                    default: false
                }
            }
        },
        {
            id: 'slider_config',
            title: 'Slider Config',
            icon: FaLayerGroup,
            description: 'Manage Slider Operations',
            permissions: {
                view: {
                    label: 'View Sliders',
                    default: true
                },
                create: {
                    label: 'Create Sliders',
                    default: false
                },
                edit: {
                    label: 'Edit Sliders',
                    default: false
                },
                delete: {
                    label: 'Delete Sliders',
                    default: false
                }
            }
        },
        {
            id: 'product_config',
            title: 'Product Config',
            icon: FaShoppingCart,
            description: 'Manage Product Operations',
            permissions: {
                view: {
                    label: 'View Products',
                    default: true
                },
                create: {
                    label: 'Create Product',
                    default: false
                },
                edit: {
                    label: 'Edit Product',
                    default: false
                },
                delete: {
                    label: 'Delete Product',
                    default: false
                }
            }
        },
        {
            id: 'coupon',
            title: 'Coupon',
            icon: FaGift,
            description: 'Manage Coupon Operations',
            permissions: {
                view: {
                    label: 'View Coupons',
                    default: true
                },
                create: {
                    label: 'Create Coupon',
                    default: false
                },
                edit: {
                    label: 'Edit Coupon',
                    default: false
                },
                delete: {
                    label: 'Delete Coupon',
                    default: false
                }
            }
        },
        {
            id: 'category',
            title: 'Category Config',
            icon: TbCategoryFilled,
            description: 'Manage Category Operations',
            permissions: {
                view: {
                    label: 'View Categories',
                    default: true
                },
                create: {
                    label: 'Create Category',
                    default: false
                },
                edit: {
                    label: 'Edit Category',
                    default: false
                },
                delete: {
                    label: 'Delete Category',
                    default: false
                }
            }
        },
        {
            id: 'variants',
            title: 'Variants Config',
            icon: TbCategoryFilled,
            description: 'Manage Variants Operations',
            permissions: {
                view: {
                    label: 'View Variants',
                    default: true
                },
                create: {
                    label: 'Create Variant',
                    default: false
                },
                edit: {
                    label: 'Edit Variant',
                    default: false
                },
                delete: {
                    label: 'Delete Variant',
                    default: false
                }
            }
        },
        {
            id: 'brands',
            title: 'Brands Config',
            icon: TbCategoryFilled,
            description: 'Manage Brands Operations',
            permissions: {
                view: {
                    label: 'View Brands',
                    default: true
                },
                create: {
                    label: 'Create Brand',
                    default: false
                },
                edit: {
                    label: 'Edit Brand',
                    default: false
                },
                delete: {
                    label: 'Delete Brand',
                    default: false
                }
            }
        },
        {
            id: 'orders_config',
            title: 'Orders Config',
            icon: LuPackageOpen,
            description: 'Manage Orders Operations',
            permissions: {
                view: {
                    label: 'View Orders',
                    default: true
                },
                view: {
                    label: 'View Orders Status',
                    default: true
                },
                // create: {
                //     label: 'Create Orders Status',
                //     default: false
                // },
                edit: {
                    label: 'Edit Orders Status',
                    default: false
                },
                delete: {
                    label: 'Delete Orders Status',
                    default: false
                }
            }
        },
        {
            id: 'payments_methods',
            title: 'Payments Methods',
            icon: MdPayments,
            description: 'Manage Payment Operations',
            permissions: {
                view: {
                    label: 'View Payments Methods',
                    default: true
                },
                create: {
                    label: 'Create Payments Method',
                    default: false
                },
                edit: {
                    label: 'Edit Payments Method',
                    default: false
                },
                delete: {
                    label: 'Delete Payments Method',
                    default: false
                }
            }
        },
        {
            id: 'shipping_partners',
            title: 'Shipping Partners',
            icon: FaShippingFast,
            description: 'Manage Shipping Operations',
            permissions: {
                view: {
                    label: 'View Shipping Partners',
                    default: true
                },
                create: {
                    label: 'Create Shipping Partner',
                    default: false
                },
                edit: {
                    label: 'Edit Shipping Partner',
                    default: false
                },
                delete: {
                    label: 'Delete Shipping Partner',
                    default: false
                }
            }
        },
        {
            id: 'social_links',
            title: 'Social Links',
            icon: PiLinkSimpleBold,
            description: 'Manage Social Operations',
            permissions: {
                view: {
                    label: 'View Social Links',
                    default: true
                },
                create: {
                    label: 'Create Social Link',
                    default: false
                },
                edit: {
                    label: 'Edit Social Link',
                    default: false
                },
                delete: {
                    label: 'Delete Social Link',
                    default: false
                }
            }
        },

    ];

    // Initialize form data dynamically from the config
    const initialFormData = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        permissions: permissionSections.reduce((acc, section) => {
            if (section.permissions) {
                if (section.permissions[section.id]?.type === 'toggle') {
                    // Simple toggle permission
                    acc[section.id] = section.permissions[section.id].default;
                } else {
                    // Complex permissions with sub-items
                    acc[section.id] = Object.keys(section.permissions).reduce((subAcc, permission) => {
                        subAcc[permission] = section.permissions[permission].default;
                        return subAcc;
                    }, {});
                }
            }
            return acc;
        }, {})
    };

    const [formData, setFormData] = useState(initialFormData);
    const [activeTab, setActiveTab] = useState('general');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [parent]: {
                        ...prev.permissions[parent],
                        [child]: type === 'checkbox' ? checked : value
                    }
                }
            }));
        } else if (name in formData.permissions) {
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [name]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePermissionToggle = (sectionId, permissionId = null) => {
        if (permissionId) {
            // Toggle a specific sub-permission
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [sectionId]: {
                        ...prev.permissions[sectionId],
                        [permissionId]: !prev.permissions[sectionId][permissionId]
                    }
                }
            }));
        } else {
            // Toggle the entire section (for simple toggle permissions)
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [sectionId]: !prev.permissions[sectionId]
                }
            }));
        }
    };

    const toggleAllSectionPermissions = (sectionId) => {
        const section = permissionSections.find(s => s.id === sectionId);
        if (!section) return;

        // Check if all permissions are currently enabled
        const allEnabled = Object.keys(formData.permissions[sectionId] || {}).every(
            perm => formData.permissions[sectionId][perm]
        );

        // Toggle all permissions
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [sectionId]: Object.keys(section.permissions).reduce((acc, perm) => {
                    acc[perm] = !allEnabled;
                    return acc;
                }, {})
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        // API call would go here
        dispatch(createSubAdmin(formData))

    };

    const renderPermissionBox = (section) => {
        const Icon = section.icon;
        const isSimpleToggle = section.permissions[section.id]?.type === 'toggle';
        const hasSubPermissions = !isSimpleToggle && Object.keys(section.permissions).length > 0;

        return (
            <div key={section.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold flex items-center">
                        <Icon className="mr-2" /> {section.title}
                    </h4>
                    {isSimpleToggle ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.permissions[section.id] || false}
                                onChange={() => handlePermissionToggle(section.id)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                    ) : (
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={Object.values(formData.permissions[section.id] || {}).some(v => v)}
                                onChange={() => toggleAllSectionPermissions(section.id)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                    )}
                </div>

                {section.description && (
                    <p className="text-sm text-gray-500 mb-3">{section.description}</p>
                )}

                {hasSubPermissions && (
                    <div className="space-y-2">
                        {Object.entries(section.permissions).map(([permId, permConfig]) => (
                            <div key={permId} className="flex items-center">
                                <input
                                    id={`${section.id}.${permId}`}
                                    name={`${section.id}.${permId}`}
                                    type="checkbox"
                                    checked={formData.permissions[section.id]?.[permId] || false}
                                    onChange={() => handlePermissionToggle(section.id, permId)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`${section.id}.${permId}`} className="ml-2 block text-sm text-gray-700">
                                    {permConfig.label || permId}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="custom-container flex bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 flex-col flex overflow-auto">
                <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
                    <h1 className="text-2xl font-bold">Add Sub Admin</h1>
                </header>
                <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
                    <div className="flex border-b mb-6">
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'general' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'permissions' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('permissions')}
                        >
                            Permissions
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {activeTab === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                                        Mobile Number
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="mobile"
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter mobile number with country code"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'permissions' && (
                            <div className="mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {permissionSections.map(renderPermissionBox)}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between">
                            {activeTab === 'permissions' && (
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setActiveTab('general')}
                                >
                                    Back
                                </button>
                            )}
                            <div>
                                {activeTab === 'general' && (
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                        onClick={() => setActiveTab('permissions')}
                                    >
                                        Next
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add Sub-Admin
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSubAdmin;