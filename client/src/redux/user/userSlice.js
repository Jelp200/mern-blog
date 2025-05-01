import { createSlice } from '@reduxjs/toolkit'

// Creacion del slice de Redux para el contador (Estado iniicial)
const initialState = {
    currentUser: null,  // Almacena el usuario actual
    error: null,        // Almacena errores
    loading: false,     // Indica si hay una carga en curso
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Acciones para el slice de usuario
        signinStart: (state) => {
            state.loading = true;  // Inicia la carga
            state.error = null;    // Resetea errores
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;  // Almacena el usuario actual
            state.loading = false;  // Finaliza la carga
            state.error = null;    // Resetea errores
        },
        signinFailure: (state, action) => {
            state.loading = false;  // Finaliza la carga
            state.error = action.payload;  // Almacena el error
        },
    },
});

// Exporta las acciones y el reducer
export const { signinStart, signinSuccess, signinFailure } = userSlice.actions;

// Exporta el reducer para usarlo en la store de Redux
export default userSlice.reducer;