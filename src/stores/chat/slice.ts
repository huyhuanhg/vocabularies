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
    builder.addCase(sendMessage.pending, (state, { meta }: any) => {
      const { message, id, created } = meta.arg;

      const newMsg = [
        ...state.msg,
        {
          id,
          created,
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
      const { responseMsg } = payload;
      const newMsg = [...state.msg, { ...responseMsg, created: Date.now() }];

      return {
        ...state,
        loading: false,
        msg: newMsg,
        newMsg: [],
      };
    });

    builder.addCase(sendMessage.rejected, (state, { meta: { arg }}: any) => {
      const { id } = arg

      const cloneMsg = [...state.msg]
      const msgIndex = cloneMsg.findIndex((msg) => msg.id === id)

      if(msgIndex === -1) {
        return {
          ...state,
          loading: false,
          newMsg: [],
        }
      }

      cloneMsg.splice(msgIndex, 1, {
        ...cloneMsg[msgIndex],
        status: "fail"
      })

      return {
        ...state,
        loading: false,
        newMsg: [],
        msg: cloneMsg
      };
    });
  },
});

export default chat.reducer;
