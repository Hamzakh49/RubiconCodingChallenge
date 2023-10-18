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
      const { newData } = action.payload;
      const index = state.tableData.findIndex(
        (item) => item._id === newData._id
      );
      if (index !== -1) {
        state.tableData[index] = { ...state.tableData[index], ...newData };
      }
    },
    deleteElement: (state, action) => {
      const id = action.payload;
      const index = state.tableData.findIndex((item) => item._id === id);
      if (index !== -1) {
        state.tableData.splice(index, 1);
      }
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
