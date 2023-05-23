import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./action";
import { Chat } from "@/helpers";

const initialState: any = {
  loading: false,
  msg: [],
  newMsg: [],
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
      };
    });
    builder.addCase("chat/get_storage", (state) => {
      const messageData = Chat.Storage.get();
      return {
        ...state,
        loading: false,
        msg: [...messageData],
      };
    });
    builder.addCase(sendMessage.pending, (state, { meta }: any) => {
      const { message } = meta.arg;

      const now = Date.now();
      const messageData = Chat.Storage.get();
      const newMsg = [
        ...messageData,
        {
          id: `user_${now}`,
          created: now,
          content: message,
          role: "user",
        },
      ];

      return {
        ...state,
        loading: true,
        msg: newMsg,
      };
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload }: any) => {
      if (!payload || !payload.responseMsg || !payload.responseMsg.id) {
        return {
          ...state,
          loading: true,
        };
      }

      const { responseMsg } = payload;

      const messageData = Chat.Storage.get();
      const newMsg = [...messageData, { ...responseMsg, created: Date.now() }];
      Chat.Storage.set(newMsg);
      return {
        ...state,
        loading: false,
        msg: newMsg,
        newMsg: [],
      };
    });
  },
});

export default chat.reducer;
