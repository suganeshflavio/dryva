export const TokenRefresh = (error: string) => {
  if (error === "Invalid token" || error === "Token expired") {
    setTimeout(() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/";
    }, 1000);
  }
};