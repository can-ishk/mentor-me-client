import { logOutUser } from "./authHelper";

export function dishonourableLogout({navigate}){
    setTimeout(()=>{
        console.log("Credential Tampering Detected, logging out")
        logOutUser();
        navigate('/login');
      }, 2000);
}