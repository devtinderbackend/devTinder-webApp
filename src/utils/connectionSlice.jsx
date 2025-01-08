import { createSlice } from "@reduxjs/toolkit";
// import reducer from "./userSlice";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
       removeConnections: () => {
            return null;
        }
    }
})

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;