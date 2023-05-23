import { Chat } from "@/helpers";
import { AnyAction, ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";

const call = async (
  data: any,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${process.env.NEXT_APP_CHAT_GPT_API_KEY}`
  );

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  let responseMsg = {
    content: "",
    id: "",
    role: "",
  };

  return await fetch(
    process.env.NEXT_APP_CHAT_GPT_URL as string,
    requestOptions
  ).then((response) => {
    if (!response.ok && response.status === 429) {
      setTimeout(() => {
        call(data, dispatch);
      }, 20000);
      return;
    }
    const reader = response.body?.getReader();

    const pump: any = async ({ done, value }: any) => {
      if (done) {
        return Promise.resolve({ responseMsg });
      }
      try {
        const text = new TextDecoder().decode(value);
        text
          .split("\n\n")
          .filter((item) => item)
          .map((txt) => {
            try {
              if (txt !== "data: [DONE]") {
                const json = JSON.parse(txt.replace(/data:\s/, ""));
                const { id, created } = json;
                const content = json?.choices[0]?.delta?.content || "";
                const role = json?.choices[0]?.delta?.role;

                if (id && !content && created && role) {
                  responseMsg = {
                    id,
                    role,
                    content: "",
                  };
                } else if (content) {
                  responseMsg = {
                    ...responseMsg,
                    content: `${responseMsg.content}${content}`,
                  };
                }

                dispatch({
                  type: "chat/set_new_msg",
                  payload: { id, role, created, content },
                });
              }
            } catch (e) {
              console.error("e json :>> ", e);
            }
          });
      } catch (e) {
        return Promise.reject({ responseMsg });
      }
      return reader?.read().then(pump);
    };

    return reader?.read().then(pump);
  });
};

export const sendMessage = createAsyncThunk(
  "chat/send",
  async ({ message }: { message: string }, { dispatch }) => {
    const now = Date.now();
    const messageData = Chat.Storage.get();

    Chat.Storage.set([
      ...messageData,
      { role: "user", content: message, id: `user_${now}`, created: now },
    ]);

    const raw = {
      model: "gpt-3.5-turbo",
      messages: [
        ...messageData.map(({ role, content }: any) => ({ role, content })),
        {
          role: "user",
          content: `Bạn hãy ghi nhớ điều này trong những câu hỏi tiếp theo nếu tôi hỏi không liên quan về kiến thức chủ đề tiếng Anh bạn hãy từ chối bằng cách trả lời: "Vui lòng hỏi về chủ đề tiếng Anh!".
          ${message}`,
        },
      ],
      stream: true,
    };

    return call(raw, dispatch);
  }
);
