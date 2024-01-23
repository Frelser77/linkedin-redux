import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../token";

export const uploadFile = createAsyncThunk("fileUpload/uploadFile", async ({ file, type, id }) => {
  //   let URL;
  //   switch (type) {
  //     case "profile":
  //       URL = `https://striveschool-api.herokuapp.com/api/profile/${id}/picture`;
  //       break;
  //     case "experience":
  //       URL = `https://striveschool-api.herokuapp.com/api/profile/${id}/experiences/${expId}/picture`;
  //       break;
  //     case "post":
  //       URL = `https://striveschool-api.herokuapp.com/api/posts/${id}`;
  //       break;
  //     default:
  //       console.log("error");
  //       URL = "";
  //       break;
  //   }
  console.log(file + " " + type + " " + id);

  try {
    const formData = new FormData();
    formData.append(type, file);
    console.log(formData);

    const response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}/picture`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Unable to upload!");
    }
    const data = await response.json();
    console.log("Image upload successful:", data);
    return {};
  } catch (error) {
    throw error;
  }
});

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fileUploadSlice.reducer;