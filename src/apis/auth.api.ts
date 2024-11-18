import baseAxios from "./base.api";

export const getProfileApi = () => {
  return baseAxios.get("/auth/profile");
};

export const addReferral = async (parentId: number) => {
  const res = await baseAxios.post("/users/add-referral", {
    parentId
  })
  return res
}