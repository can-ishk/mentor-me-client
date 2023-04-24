import { logOutUser } from "./authHelper";

const errors = [
  "TypeError",
  "TokenExpiredError",
  "JsonWebTokenError",
  "NotBeforeError"
]

export function dishonourableLogout({ navigate }, errName, err) {
  if (!errName || !(errName in errors)) return
  setTimeout(() => {
    //console.log("Authentication Error, logging out")
    //console.log("Error: " + errName + " " + err)
    logOutUser();
    navigate('/login');
  }, 2000);
}