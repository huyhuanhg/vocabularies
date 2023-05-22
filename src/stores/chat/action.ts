import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "chat/send",
  async (_: { message: string }, { dispatch, getState }) => {
    const { chatReducer }: any = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.NEXT_APP_CHAT_GPT_API_KEY}`
    );

    var raw = {
      model: "gpt-3.5-turbo",
      messages: [
        ...chatReducer.msg.map(({ role, content }: any) => ({ role, content })),
      ],
      stream: true,
    };

    var requestOptions: RequestInit = {
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
  }
);
