import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listeStagiaires: [],
};

const stagiaireSlice = createSlice({
  name: 'stagiaires',
  initialState,
  reducers: {
    ajouterStagiaire: (state, action) => {
      state.listeStagiaires.push(action.payload); // utilisation Immer
    },
    
  },
});

export const { ajouterStagiaire } = stagiaireSlice.actions;

export default stagiaireSlice.reducer;
