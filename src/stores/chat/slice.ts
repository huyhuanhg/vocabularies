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
      const { isHello, message } = meta.arg;
      if (isHello) {
        return {
          ...state,
        };
      }
      const now = Date.now();
      return {
        ...state,
        msg: [
          ...state.msg,
          {
            id: `user_${now}`,
            created: ~~(now / 1000),
            message,
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
        msg: [...state.msg, responseMsg],
        newMsg: [],
        isHello: true,
      };
    });
  },
});

export default chat.reducer;
