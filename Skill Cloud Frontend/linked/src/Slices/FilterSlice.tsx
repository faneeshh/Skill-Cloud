import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {},
  reducers: {
    updateFilter(state, action) {
      return { ...state, ...action.payload }; // Correctly merge state
    },
    resetFilter(state) {
      return {}; // Reset state to initial empty object
    },
  },
});

export const { updateFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;