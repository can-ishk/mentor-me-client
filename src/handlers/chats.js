import { BASE_URL } from "../config";

const getChats = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/chats", {
      headers: {
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    //console.log(err);
  }
};

const getMessages = async (user, conversationId) => {
  try {
    const res = await fetch(BASE_URL + "api/chats/" + conversationId, {
      headers: {
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    //console.log(err);
  }
};

const sendMessage = async (user, message, recipientId) => {
  try {
    const res = await fetch(BASE_URL + "api/chats/" + recipientId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(message),
    });
    return await res.json();
  } catch (err) {
    //console.log(err);
  }
};

export { getChats, getMessages, sendMessage };