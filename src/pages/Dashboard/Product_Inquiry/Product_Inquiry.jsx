import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import inquiryData from "../../../../data/inquiry.json";
import api from "../../../api/instance";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const Product_Inquiry = () => {
  const [data, setData] = useState([]);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/e-commerce/inquiries");
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, []);

  const { list } = useSelector((state) => state.subAdmins);
  const { users } = useSelector((state) => state.user);

  const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, ""); // removes ;, spaces, etc.

  const findUser = users.find((user) => String(user._id) === cleanUserId);
  //   console.log(findUser);

  useEffect(() => {
    if (
      list &&
      list.length > 0 &&
      findUser &&
      findUser.role !== "super-admin"
    ) {
      const currentSubAdmin = list.find((sub) => sub.email === findUser.email);
      // console.log(currentSubAdmin);
      if (currentSubAdmin) {
        const permissions = currentSubAdmin.permissions?.productInquiry;
        setCanEdit(permissions?.edit ?? false);
        setCanDelete(permissions?.delete ?? false);
        setCanActive(permissions?.active ?? false);
      }
    } else if (findUser) {
      // fallback for super-admin or if currentSubAdmin not found
      setCanEdit(true);
      setCanDelete(true);
      setCanActive(true);
    }
  }, [list, findUser]);

  const onDelete = (id) => {
    const response = api.delete(`/api/e-commerce/deleteInquiry/${id}`);
    if (response.status === 200) {
      toast.success("Sub Admin deleted successfully!");
      dispatch(fetchSubAdmins());
    } else {
      console.error("Error deleting Inquiry");
    }
  };

  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Product Inquiry</h1>
        </header>
        <div className="box bg-white px-4 py-2 mx-3 mt-5 rounded shadow">
          <div className="py-3">
            <Table
              canDelete={canDelete}
              canActive={canActive}
              canEdit={canEdit}
              onDelete={onDelete}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Inquiry;
