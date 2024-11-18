export type WalletBalance = {
    balance: number;
    available: number;
    locked: number;
    assetId: number;
};

export type Wallet = {
    _id: string;
    walletAddress: string;
    email?: string;
    enabledNoti: boolean;
    balance: number;
    nonce?: string;
    isVerified: boolean;
};