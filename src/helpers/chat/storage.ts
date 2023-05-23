import moment from "moment";
import Storage from "../storage";

const KEY = "V-CHAT_GPT_MSG_DATA";

export const empty = (): boolean => {
  return get().length === 0;
};

export const get = () => {
  const msgData = Storage.Local.get(KEY);

  if (!msgData) {
    return [];
  }

  try {
    const { expires, data } = JSON.parse(decodeURIComponent(msgData));
    if (moment().isAfter(moment(expires * 1000))) {
      remove();
      return [];
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    remove();
    return [];
  }
};

export const set = (value: any[]) => {
  Storage.Local.set(
    KEY,
    encodeURIComponent(JSON.stringify({
      expires: moment()
        .add({
          hours: 1,
        })
        .unix(),
      data: value,
    }))
  );
};

export const remove = () => {
  Storage.Local.remove(KEY);
};
