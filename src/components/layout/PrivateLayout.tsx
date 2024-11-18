import { getResultByIdApi } from "@/apis/game.api";
import { GAME_DURATION } from "@/config/app.config";
import { TonClientProvider } from "@/context/ton-client-context";
import { useTimer } from "@/hooks/useTimer";
import useUserStore from "@/stores/user.store";
import '@/styles/animation.css';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import clsx from "clsx";
import { lazy, ReactNode, useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthTon from "../Auth/AuthTon";
import usePaymentAssetStore, { JettonConfigType } from "@/stores/payment-asset.store";
import { getPaymentAssetDeposit } from "@/apis/payment-asset.api";
import { Address } from "@ton/core";

type NavigatorItem = {
    key: string;
    label: string;
    icon: ReactNode;
    parts: string[];
};

const HomeIcon = lazy(() => import("../icons/HomeIcon"));
const PvpIcon = lazy(() => import("../icons/PvpIcon"));
const LuckyIcon = lazy(() => import("../icons/LuckyIcon"));
const CalenderCheckIcon = lazy(() => import("../icons/CalenderCheckIcon"));
const AccountIcon = lazy(() => import("../icons/AccountIcon"));
const ResultScreen = lazy(() => import("@/pages/Home/components/ResultScreen"));

const NavigationItems: NavigatorItem[] = [
    {
        key: "/home",
        label: "Home",
        icon: <HomeIcon />,
        parts: ["/home"]
    },
    {
        key: "/pvp",
        label: "PvP",
        icon: <PvpIcon />,
        parts: ["/pvp"]
    },
    {
        key: "/lucky",
        label: "Fortune",
        icon: <LuckyIcon />,
        parts: ["/lucky"]
    },
    {
        key: "/task",
        label: "Task",
        icon: <CalenderCheckIcon />,
        parts: ["/task"]
    },
    {
        key: "/profile",
        label: "Profile",
        icon: <AccountIcon />,
        parts: ["/invite", "/ranking", "/profile", "/deposit", "/history", "/withdraw"]
    },
];

export default function PrivateLayout() {
    const location = useLocation();

    const { turn, setResult, result } = useUserStore();
    const { setAssetPaymentResults, setJettonConfig } = usePaymentAssetStore()

    const [open, setOpen] = useState(false);
    const toggleModal = useCallback(() => {
        setOpen(pre => !pre);
    }, []);

    const handleOnFinishTimer = async () => {
        if (!result) {
            // Handle case dont have result after: TODO
            try {
                if (turn?._id) {

                    const result = await getResultByIdApi(turn?._id);

                    setResult(result.data);

                    toggleModal();

                    setTimeout(() => {
                        toggleModal();
                    }, 4000);
                }
            } catch (error) {
                console.log("GET TURN BY ID ERROR", error);
            }

        } else {
            toggleModal();

            setTimeout(() => {
                toggleModal();
            }, 4000);
        }
    };

    const fetchPaymentAssets = async () => {
        try {
            const res = await getPaymentAssetDeposit()
            if (res.data) {
                setAssetPaymentResults(res.data)
                const jettonConfig: JettonConfigType = {};
                (res.data || []).forEach((item: any) => {
                    jettonConfig[item.symbol as string] = {
                        address: Address.parse(item.address),
                        decimals: item.decimals,
                        contractAddress: Address.parse(item.contractAddress)
                    }
                })
                setJettonConfig(jettonConfig)
            }
        } catch (error) {
            throw new Error("Payment deposit fetch error")
        }
    }

    useEffect(() => {
        fetchPaymentAssets()
    }, [])

    useTimer(GAME_DURATION, handleOnFinishTimer);

    return (
        <TonConnectUIProvider
            manifestUrl="https://hopium.dev/tonconnect-manifest.json"
            uiPreferences={{ theme: THEME.DARK }}
            actionsConfiguration={{
                twaReturnUrl: 'https://t.me/hopium_official_bot/join'
            }}
        // walletsListConfiguration={{
        //     includeWallets: [
        //         {
        //             appName: "tonwallet",
        //             name: "TON Wallet",
        //             imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
        //             aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
        //             universalLink: "https://wallet.ton.org/ton-connect",
        //             jsBridgeKey: "tonwallet",
        //             bridgeUrl: "https://bridge.tonapi.io/bridge",
        //             platforms: ["chrome", "android"]
        //         },
        //         {
        //             appName: "nicegramWallet",
        //             name: "Nicegram Wallet",
        //             imageUrl: "https://static.nicegram.app/icon.png",
        //             aboutUrl: "https://nicegram.app",
        //             universalLink: "https://nicegram.app/tc",
        //             deepLink: "nicegram-tc://",
        //             jsBridgeKey: "nicegramWallet",
        //             bridgeUrl: "https://bridge.tonapi.io/bridge",
        //             platforms: ["ios", "android"]
        //         },
        //         {
        //             appName: "binanceTonWeb3Wallet",
        //             name: "Binance Web3 Wallet",
        //             imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
        //             aboutUrl: "https://www.binance.com/en/web3wallet",
        //             deepLink: "bnc://app.binance.com/cedefi/ton-connect",
        //             bridgeUrl: "https://bridge.tonapi.io/bridge",
        //             platforms: ["chrome", "safari", "ios", "android"],
        //             universalLink: "https://app.binance.com/cedefi/ton-connect"
        //         },
        //         {
        //             appName: "fintopio-tg",
        //             name: "Fintopio Telegram",
        //             imageUrl: "https://fintopio.com/tonconnect-icon.png",
        //             aboutUrl: "https://fintopio.com",
        //             universalLink: "https://t.me/fintopio?attach=wallet",
        //             bridgeUrl: "https://wallet-bridge.fintopio.com/bridge",
        //             platforms: ["ios", "android", "macos", "windows", "linux"]
        //         },
        //         {
        //             appName: "GateWallet",
        //             name: "GateWallet",
        //             imageUrl: "https://www.gate.io/images/login/qrcode_center_icon.svg",
        //             aboutUrl: "https://www.gate.io/",
        //             bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
        //             jsBridgeKey: "gatetonwallet",
        //             platforms: ["ios", "android", "chrome"],
        //             universalLink: "https://gateio.onelink.me/DmA6/web3"
        //         },
        //         {
        //             appName: "tokenpocket",
        //             name: "TokenPocket",
        //             imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
        //             aboutUrl: "https://tokenpocket.pro",
        //             jsBridgeKey: "tokenpocket",
        //             platforms: ["ios", "android"]
        //         },
        //         {
        //             appName: "hot",
        //             name: "HOT",
        //             imageUrl: "https://storage.herewallet.app/logo.png",
        //             aboutUrl: "https://hot-labs.org/",
        //             universalLink: "https://t.me/herewalletbot?attach=wallet",
        //             bridgeUrl: "https://sse-bridge.hot-labs.org",
        //             jsBridgeKey: "hotWallet",
        //             platforms: ["ios", "android", "macos", "windows", "linux"]
        //         },
        //         {
        //             appName: "bybitTonWallet",
        //             name: "Bybit Wallet",
        //             imageUrl: "https://static.bymj.io/bhop/image/Q3Kmzw7qczSZF5eqfo6pW8QuT1MDMmqC80lWxFBhiE0.png",
        //             aboutUrl: "https://www.bybit.com/web3",
        //             universalLink: "https://app.bybit.com/ton-connect",
        //             deepLink: "bybitapp://",
        //             jsBridgeKey: "bybitTonWallet",
        //             bridgeUrl: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge",
        //             platforms: ["ios", "android", "chrome"]
        //         },
        //         {
        //             appName: "dewallet",
        //             name: "DeWallet",
        //             imageUrl: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
        //             aboutUrl: "https://delabwallet.com",
        //             universalLink: "https://t.me/dewallet?attach=wallet",
        //             bridgeUrl: "https://bridge.dewallet.pro/bridge",
        //             platforms: ["ios", "android", "macos", "windows", "linux"]
        //         },
        //     ]
        // }}
        // actionsConfiguration={{
        //     twaReturnUrl: 'http://localhost:5173/task'
        // }}
        >
            <TonClientProvider>
                <AuthTon />
                <div className="relative h-full ">
                    <div className="h-full w-full max-w-[390px] tall:max-w-lg mx-auto">
                        <Outlet />
                    </div>

                    <div className="fixed bottom-5 tall:bottom-6 w-full z-10 px-7">
                        <div className="w-full relative h-[68px] font-bold">
                            <div className="absolute top-[3px] left-1.5 bottom-[3px] right-1.5 bg-background-2" />
                            <div className="absolute top-1.5 left-[3px] bottom-1.5 right-[3px] bg-background-2" />
                            <div className="absolute top-[9px] left-0 bottom-[9px] right-0 bg-background-2" />

                            <div className="absolute top-0 bottom-0 right-[9px] left-[9px] grid grid-cols-5 bg-background-2">
                                {NavigationItems.map((item) => {
                                    const isActive = item.parts.includes(location.pathname);
                                    return (
                                        <Link to={item.key} key={item.key} className={clsx("flex flex-col items-center justify-center gap-y-0.5", {
                                            "text-primary-1": isActive,
                                            "text-text-disable": !isActive
                                        })}>
                                            {item.icon}
                                            <p className="font-normal">{item.label}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div >
            </TonClientProvider>
            {/* Handle show result */}
            <div className={clsx(
                location.pathname !== "/home" && "hidden"
            )}>
                <ResultScreen isOpen={open} />
            </div>
        </TonConnectUIProvider>
    );
}