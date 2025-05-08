import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import inquiryData from "../../../../data/inquiry.json";
import api from "../../../api/instance";

const Product_Inquiry = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Product Inquiry</h1>
        </header>
        <div className="box bg-white px-4 py-2 mx-3 mt-5 rounded shadow">
          <div className="py-3">
            <Table data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Inquiry;
