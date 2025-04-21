import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: true,
    isLoginCardOpen: false, 
  },
  reducers: {
    toggleSidebar: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isOpen = action.payload;
      } else {
        state.isOpen = !state.isOpen;
      }
    },
    toggleLoginCard: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isLoginCardOpen = action.payload;
      } else {
        state.isLoginCardOpen = !state.isLoginCardOpen;
      }
    },
  },
});

export const { toggleSidebar, toggleLoginCard } = sidebarSlice.actions;
export default sidebarSlice.reducer;


