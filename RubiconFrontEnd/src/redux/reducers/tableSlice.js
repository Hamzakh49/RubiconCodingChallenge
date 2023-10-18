import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.tableData.push(action.payload);
    },
    updateElement: (state, action) => {
      state.tableData = state.tableData.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    deleteElement: (state, action) => {
      state.tableData = state.tableData.filter(
        (item) => item.id !== action.payload
      );
    },
    setTable: (state, action) => {
      state.tableData = action.payload;
    },
    emptyTable: (state) => {
      state.tableData = [];
    },
  },
});

export const {
  addElement,
  updateElement,
  deleteElement,
  setTable,
  emptyTable,
} = tableSlice.actions;
export default tableSlice.reducer;
