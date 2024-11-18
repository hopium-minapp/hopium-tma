import baseAxios from "./base.api";

export const getTasksApi = async (group?: string) => {
    const res = await baseAxios.get("/tasks", {
        params: {
            group
        }
    });
    return res;
};

export const clickTaskApi = async (id: number) => {
    const res = await baseAxios.put(`tasks/click/${id}`);
    return res;
};

export const claimTaskApi = async (id: number) => {
    const res = await baseAxios.put(`/tasks/claim/${id}`);
    return res;
}

