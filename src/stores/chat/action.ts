import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "chat/send",
  async ({ message }: { message: string }, { dispatch }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.NEXT_APP_CHAT_GPT_API_KEY}`
    );

    var raw = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    };

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };
    let responseMsg = ''

    await fetch(process.env.NEXT_APP_CHAT_GPT_URL as string, requestOptions)
      .then((response) => {
        const reader = response.body?.getReader();

        const pump: any = ({ done, value }: any) => {
            if (done) {
              // Do something with last chunk of data then exit reader
              return;
            }
            try {
              const text = new TextDecoder().decode(value);
              const data = text
                .split("\n\n")
                .filter((item) => item)
                .map((txt) => {
                  try {
                    const json = JSON.parse(txt.replace(/data:\s/, ""));
                    console.log("json" , json);
                    if (json.error) {
                      setTimeout(() => {
                        dispatch(sendMessage({message}))
                      }, 20000)
                      return
                    }

                    const content = json?.choices[0]?.delta.content || ''
                    responseMsg += content

                    console.log('responseMsg :>> ', responseMsg);
                  } catch (e) {}
                });
            } catch (e) {}
            // Otherwise do something here to process current chunk

            // Read some more, and call this function again
            return reader?.read().then(pump);
          }

        // read() returns a promise that resolves when a value has been received
        reader?.read().then(pump)
      })
  }
);
