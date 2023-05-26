import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./action";
import { Chat } from "@/helpers";

const initialState: any = {
  loading: false,
  renderState: false,
  msg: [],
  newMsg: [],
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase("chat/set_stream_msg", (state, { payload }: any) => {
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
    builder.addCase("chat/reset", (state) => {
      Chat.Storage.remove();
      return {
        ...state,
        loading: false,
        msg: [],
        newMsg: [],
      };
    });

    builder.addCase("chat/stop_render", (state) => {
      return {
        ...state,
        renderState: false,
      };
    });
    builder.addCase(sendMessage.pending, (state, { meta }: any) => {
      const { message, id, created, isHello } = meta.arg;

      const newMsg = [
        ...state.msg,
        {
          id,
          created,
          content: message,
          role: "user",
          ...(isHello && { isHello }),
        },
      ];

      return {
        ...state,
        renderState: true,
        loading: true,
        msg: newMsg,
      };
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload }: any) => {
      const { responseMsg, abortState } = payload;

      if (abortState) {
        return {
          ...state,
          renderState: false,
          loading: false,
          msg: [],
          newMsg: [],
        };
      }

      const newMsg = [...state.msg, { ...responseMsg, created: Date.now() }];

      return {
        ...state,
        renderState: false,
        loading: false,
        msg: newMsg,
        newMsg: [],
      };
    });
    builder.addCase(sendMessage.rejected, (state, { meta: { arg } }: any) => {
      const { id } = arg;

      const cloneMsg = [...state.msg];
      const msgIndex = cloneMsg.findIndex((msg) => msg.id === id);

      if (msgIndex === -1) {
        return {
          ...state,
          loading: false,
          newMsg: [],
        };
      }

      cloneMsg.splice(msgIndex, 1, {
        ...cloneMsg[msgIndex],
        status: "fail",
      });

      return {
        ...state,
        renderState: false,
        loading: false,
        newMsg: [],
        msg: cloneMsg,
      };
    });
  },
});

export default chat.reducer;
