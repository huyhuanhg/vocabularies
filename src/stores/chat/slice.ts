import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./action";

const initialState: any = {
  loading: false,
  msg: [],
  newMsg: [],
  isHello: false,
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase("chat/set_new_msg", (state, { payload }: any) => {
      const { content } = payload;

      return {
        ...state,
        loading: false,
        newMsg: [...state.newMsg, content],
        isHello: true,
        // msg: cloneMsg,
      };
    });
    builder.addCase(sendMessage.pending, (state, { meta }: any) => {
      const { message } = meta.arg;

      return {
        ...state,
        msg: [
          ...state.msg,
          {
            id: `user`,
            created: Date.now(),
            content: message,
            role: "user",
          },
        ],
      };
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload }: any) => {
      const { responseMsg } = payload;
      if (!responseMsg.id) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        msg: [...state.msg, { ...responseMsg, created: Date.now() }],
        newMsg: [],
        isHello: true,
      };
    });
  },
});

export default chat.reducer;
