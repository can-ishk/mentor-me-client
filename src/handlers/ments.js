import { BASE_URL } from "../config";

const getMents = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/ments?" + new URLSearchParams(query),
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getMent = async (mentId, token) => {
  try {
    const res = await fetch(BASE_URL + "api/ments/" + mentId, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createMent = async (ment, user) => {
  try {
    const res = await fetch(BASE_URL + "api/ments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(ment),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateMent = async (mentId, user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/ments/" + mentId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteMent = async (mentId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/ments/" + mentId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getMent,
  createMent,
  updateMent,
  deleteMent,
  getMents,
};
