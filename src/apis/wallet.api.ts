import { User } from "@/type/auth.type";
import { Account, ConnectAdditionalRequest, TonProofItemReplySuccess } from "@tonconnect/ui";
import baseAxios from "./base.api";
import { LotteryBalance } from "@/type/lottery.type";

export const getBalanceApi = () => {
    return baseAxios.get("/wallets/balance");
};

export const getBalanceInfoApi = async () => {
    const res = await baseAxios.get<LotteryBalance>("/wallets/all-balance");
    return res;
};

export const tonGeneratePayloadApi = async (): Promise<ConnectAdditionalRequest | null> => {
    try {
        const res = await baseAxios.get<{ payload: string; }>(
            '/ton/generate-payload'
        );
        return { tonProof: res.data.payload };
    } catch (error) {
        return null;
    }
};

export const tonConnectApi = async (
    proof: TonProofItemReplySuccess['proof'],
    account: Account
) => {
    const reqBody = {
        address: account.address,
        network: account.chain,
        publicKey: account.publicKey,
        proof: {
            ...proof,
            stateInit: account.walletStateInit,
        },
    };
    const res = await baseAxios.post<User>('/ton/connect', reqBody);
    return res.data;
};