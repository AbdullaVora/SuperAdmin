import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`; // Replace with your actual API endpoint

// ✅ Fetch All Order Statuses
export const fetchOrderStatus = createAsyncThunk("orderStatus/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_URL}/orderStatus`);
        return response.data; // Adjust based on API response
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch order statuses");
    }
});

// ✅ Create a New Order Status
export const createOrderStatus = createAsyncThunk("orderStatus/create", async (orderData, { rejectWithValue }) => {
    try {
        console.log(orderData)
        const response = await api.post(`${API_URL}/addOrderStatus`, orderData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create order status");
    }
});

// ✅ Update an Existing Order Status
export const updateOrderStatus = createAsyncThunk("orderStatus/update", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`${API_URL}/updateOrderstatus/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update order status");
    }
});

// ✅ Delete an Order Status
export const deleteOrderStatus = createAsyncThunk("orderStatus/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`${API_URL}/deleteOrderStatus/${id}`);
        return id; // Return ID to remove from Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete order status");
    }
});

// 🔥 Order Status Slice
const orderStatusSlice = createSlice({
    name: "orderStatus",
    initialState: {
        orderStatus: [],
        loading: false,
        error: null,
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // ✅ Handle Fetch
            .addCase(fetchOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.orderStatus = action.payload
            })
            .addCase(fetchOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Handle Create
            .addCase(createOrderStatus.fulfilled, (state, action) => {
                state.orderStatus.push({
                    ...action.payload,
                    isAction: true,
                    isOrder: true,
                });
            })
            // ✅ Handle Update
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload; // Extract updated order status
                const index = state.orderStatus.findIndex(order => order._id === updatedOrder._id);
                if (index !== -1) {
                    state.orderStatus[index] = {
                        ...updatedOrder,
                        isAction: state.orderStatus[index].isAction || true, // Preserve isAction
                        isOrder: state.orderStatus[index].isOrder || true, // Preserve isOrder
                    };
                }
            })
            // ✅ Handle Delete
            .addCase(deleteOrderStatus.fulfilled, (state, action) => {
                state.orderStatus = state.orderStatus.filter(order => order._id !== action.payload);
            });
    },
});

// ✅ Export Reducer
export default orderStatusSlice.reducer;
