import React, { useEffect } from "react";
import CryptoJS from 'crypto-js';
import { FaHome, FaBox, FaUsers, FaCog, FaChartPie, FaCartArrowDown } from "react-icons/fa";
import Table from "../../../components/Table";
import orders from "../../../../data/order.json"
// import users from "../../../../data/user.json"
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/slices/auth/userSlice";
import { fetchOrderStatus } from "../../../redux/slices/Dashboard/Order_Config/orderStatusSlice";

const Home = () => {

  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.user)
  const { orderStatus, loading: orderLoading, error } = useSelector((state) => state.orderStatus);

  useEffect(() => {
    dispatch(getUsers())
    dispatch(fetchOrderStatus());
  }, [dispatch])

  const filteredOrderStatus = orderStatus.map(({ isAction, isOrderStatus, ...rest }) => rest);

  const sanitizedUsers = users.map(user => {
    try {
      // Only attempt decryption if password is encrypted
      const decryptedPassword = user.password.startsWith('U2FsdGVkX1')
        ? CryptoJS.AES.decrypt(user.password, 'your_secret_key').toString(CryptoJS.enc.Utf8)
        : 'ENCRYPTION_NOT_DETECTED';

      return {
        ...user,
        password: decryptedPassword || 'DECRYPTION_FAILED', // Show decrypted password (DANGEROUS)
      };
    } catch (error) {
      return {
        ...user,
        password: 'DECRYPTION_ERROR'
      };
    }
  });



  // console.log(users)

  return (
    <div className="flex bg-gray-100 custom-container">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
              A
            </div>
          </div> */}
        </header>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full">
              <FaBox size={30} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Orders</h2>
              <p className="text-gray-500 text-lg">{filteredOrderStatus.length}</p>
            </div>
          </div>

          <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full">
              <FaCartArrowDown size={30} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Reports</h2>
              <p className="text-gray-500 text-lg">15</p>
            </div>
          </div>

          <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full">
              <FaUsers size={30} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Users</h2>
              <p className="text-gray-500 text-lg">{users.length}</p>
            </div>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="py-3 px-6">
          <h2 className="text-xl font-bold mb-2">Recent Orders</h2>
          <Table data={filteredOrderStatus} />
        </div>

        {/* Recent Users */}
        <div className="py-3 px-6">
          <h2 className="text-xl font-bold mb-2">Recent Users</h2>
          <Table data={sanitizedUsers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
