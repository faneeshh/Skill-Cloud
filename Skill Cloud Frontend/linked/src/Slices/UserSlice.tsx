import {createSlice} from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const UserSlice = createSlice({
    name: "user",
    initialState: getItem("user") || null,
    reducers: {
        setUser: (state, action) => {
            setItem("user", action.payload);
            return action.payload;
        },
        removeUser: () => {
            removeItem("user");
            return null;
        }
    }
});


export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;