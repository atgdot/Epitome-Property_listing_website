import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProperty: null,
};

const propertyDetailSlice = createSlice({
  name: "propertyDetail",
  initialState,
  reducers: {
    setPropertyDetail: (state, action) => {
      state.selectedProperty = action.payload;
    },
  },
});

export const { setPropertyDetail } = propertyDetailSlice.actions;
export default propertyDetailSlice.reducer;
