function isLoggedIn(){
    return JSON.parse(localStorage.getItem("user"));
}

function logInUser(user){
    localStorage.setItem("user", JSON.stringify(user));
}

function logOutUser(){
    localStorage.removeItem("user");
}

export {isLoggedIn, logInUser, logOutUser};