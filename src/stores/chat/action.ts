import { Chat } from "@/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "chat/send",
  async (
    { message, id, created }: { message: string; id: string; created: number },
    { dispatch }
  ) => {
    const messageData = Chat.Storage.get();

    const raw = {
      model: process.env.NEXT_APP_CHAT_GPT_MODEL,
      messages: [
        ...messageData.slice(messageData.length - 10).map(({ role, content }: any) => ({ role, content })),
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.NEXT_APP_CHAT_GPT_API_KEY}`
    );

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
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
      if (response.status !== 200 && !response.ok) {
        throw new Error("ERROR");
      }

      const reader = response.body?.getReader();

      const pump: any = async ({ done, value }: any) => {
        if (done) {
          Chat.Storage.set([
            ...messageData,
            { role: "user", content: message, id, created },
            { ...responseMsg, created: Date.now() },
          ]);
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
                    type: "chat/set_stream_msg",
                    payload: { id, role, created, content },
                  });
                }
              } catch (e) {
                console.error("e json :>> ", e);
              }
            });
        } catch (e) {
          return Promise.reject({ id });
        }
        return reader?.read().then(pump);
      };

      return reader?.read().then(pump);
    });
  }
);
