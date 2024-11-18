import { QueryParams } from "@/type/query.type";
import baseAxios from "./base.api";
import { HistoryData, HistoryPvpData } from "@/type/history.type";

interface GameTurnParams extends QueryParams {
    state: string;
}

type HistoryResponse = {
    data: HistoryData[],
    hasMore: boolean
}

export const getGameTurnApi = async (params: GameTurnParams) => {
    const res = await baseAxios.get<HistoryResponse>("/game/turns", {
        params
    });
    return res;
};

type HistoryPvpParams = {
    limit?: number;
    offset?: number;
};

type PvpHistoryResponse = {
    data: HistoryPvpData[],
    hasMore: boolean
}

export const getPvpHistoryApi = async (params: HistoryPvpParams) => {
    const res = await baseAxios.get<PvpHistoryResponse>("/game/history/pvp", {
        params
    });
    return res;
};

export const getGameStatsApi = async () => {
    const res = await baseAxios.get("/game/stats");
    return res;
}; 

type HistoryDepositParams = {
    limit?: number;
    offset?: number;
};

type HistoryWithdrawParams = {
    limit?: number;
    offset?: number;
};

export const getHistoryDeposit = async(params: HistoryDepositParams) => {
    const res = await baseAxios.get("/payment/deposit", {
        params
    });
    return res;
}

export const getHistoryWithdraw = async(params: HistoryWithdrawParams) => {
    const res = await baseAxios.get("/payment/withdraw", {
        params
    });
    return res;
}