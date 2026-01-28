export const getHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {};
  }

  const token = sessionStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  };
};