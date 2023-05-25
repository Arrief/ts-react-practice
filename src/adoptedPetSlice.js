// Slice is new concept from redux toolkit, meant to be the file where all reducers and action-creaters are bundled
import { createSlice } from "@reduxjs/toolkit";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  },
  /* can have more than 1 reducer, e.g.:
    reducers: {
      adopt: () => {},
      unadopt: (state, action) => {
        state.value = null;
      }
    }
  */
  reducers: {
    adopt: (state, action) => {
      state.value = action.payload;
    },
  },
});

/* Whenever creating a reducer (above), an action is automatically created; under the hood:
  function adopt(pet) {
    return {type: "adopt", payload: pet};
  }
*/
export const { adopt } = adoptedPetSlice.actions;

export default adoptedPetSlice.reducer;
