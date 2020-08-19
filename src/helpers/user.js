
export function getUser() {
    const userString = window.localStorage.getItem("userData");
    return userString ? JSON.parse(userString) : null;
}