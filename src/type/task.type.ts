export type Task = {
    _id: number;
    title: string;
    icon: string;
    type: string;
    point: number;
    link: string;
    status: string;
    condition: string;
    group: "HOPIUM" | "LUCKY"
}