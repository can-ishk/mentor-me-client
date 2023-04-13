function isLoggedIn(){
    return JSON.parse(localStorage.getItem("user"));
}

function logIn(user){
    localStorage.setItem("user", JSON.stringify(user));
}

function logOut(){
    localStorage.removeItem("user");
}

export {isLoggedIn, logIn, logOut};