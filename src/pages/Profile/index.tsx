import ButtonSecondary from "@/components/common/button/ButtonSecondary";
import { FC, lazy, useCallback, useMemo } from "react";

const DogsIcon = lazy(() => import("@/components/icons/DogsIcon"));
const StakingIcon = lazy(() => import("@/components/icons/StakingIcon"));
const TonIcon = lazy(() => import("@/components/icons/TonIcon"));
const UserPlusIcon = lazy(() => import("@/components/icons/UserPlusIcon"));
const WalletIcon = lazy(() => import("@/components/icons/WalletIcon"));
const DepositIcon = lazy(() => import("@/components/icons/DepositIcon"));
const WithdrawIcon = lazy(() => import("@/components/icons/WithdrawIcon"));
const FrameIcon = lazy(() => import("@/components/icons/FrameIcon"));

import colors from "@/config/colors";
import { formatBalance, shortenHexString } from "@/helper";
import { ASSET } from "@/helper/constant";
import { useTonConnect } from "@/hooks/useTonConnect";
import useUserStore from "@/stores/user.store";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import Feature from "./components/Feature";

export const PROFILE_BASE_ROUTE = "/profile";
export const PROFILE_ROUTE = {
    BASE: PROFILE_BASE_ROUTE,
};

const Profile: FC = () => {
    const navigate = useNavigate();
    const { wallet } = useUserStore();
    const user = useUserStore((state) => state.user);
    const address = useTonAddress(true);
    const tonWallet = useTonWallet();
    const { connected, tonConnectUI } = useTonConnect();
    const displayName = useMemo(() => {
        return [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.username || user?._id;
    }, [user]);

    const handleConnectTon = useCallback(() => {
        tonConnectUI.openModal();
    }, []);

    const shortAddress = useMemo(
        () => {
            return shortenHexString(address || '', 4, 4);
        },
        [tonWallet]
    );
    // To do
    const tokens = useMemo(() => {
        return [
            {
                token: ASSET.HOPIUM,
                title: "Hopium",
                decimal: 9
            },
            {
                token: ASSET.TON,
                title: "Toncoin",
                decimal: 9
            },
            {
                token: ASSET.DOGS,
                title: "Dogs",
                decimal: 9
            },
            {
                token: ASSET.CATI,
                title: "Catizen",
                decimal: 9
            },
            {
                token: ASSET.USDT,
                title: "USDT",
                decimal: 6
            }
        ];
    }, []);

    const renderIcon = (key: number) => {
        switch (key) {
            case ASSET.HOPIUM:
                return <LazyLoadImage className="size-10" src="/images/home/hopium.png" />;
            case ASSET.TON:
                return <TonIcon className="size-10" />;
            case ASSET.DOGS:
                return <DogsIcon className="size-10" />;
            case ASSET.CATI:
                return <LazyLoadImage className="size-10" src="/images/lucky/cati.png" />;
            case ASSET.USDT:
                return <LazyLoadImage className="size-10" src="/images/usdt.png" />

            default:
                break;
        }
    };

    const handleForwardToDeposit = () => {
        navigate("/deposit");
    };

    const handleForwardToWithdraw = () => {
        navigate("/withdraw");
    }

    const handleForwardToInvite = () => {
        navigate("/invite");
    };

    const handleForwardToRanking = () => {
        navigate("/ranking");
    };

    return (
        <div className="bg-background-1 pt-6 flex flex-col px-4 min-h-[680px] overflow-y-auto">
            <div className="mt-2 text-lg font-bold text-center">{displayName}</div>

            <div className="flex items-center justify-center mt-2 w-full">
                {
                    connected ? <div className="flex items-center justify-center gap-x-1">
                        <WalletIcon />
                        {shortAddress}
                    </div> :
                        (
                            <ButtonSecondary
                                point={false}
                                className="w-[134px] h-8"
                                classNameBorder="bg-primary-1"
                                classNameBackground="bg-primary-1"
                                onClick={handleConnectTon}
                            >
                                <span className="text-sm font-roboto text-pure-white whitespace-nowrap">
                                    Connect Wallet
                                </span>
                            </ButtonSecondary>
                        )
                }
            </div>

            <div className="grid grid-cols-3 items-center gap-x-[6px] mt-4 w-full">
                <ButtonSecondary point={true} className="min-w-[114px] h-[38px]">
                    <div className="w-full text-sm flex items-center gap-x-1">
                        <StakingIcon className="size-4" color={colors.text.disable} />
                        <p className="text-text-disable">Staking</p>
                    </div>
                </ButtonSecondary>
                <ButtonSecondary point={true} className="min-w-[114px] h-[38px]" onClick={handleForwardToWithdraw}>
                    <div className="w-full text-sm flex items-center gap-x-1">
                        <WithdrawIcon className="size-4" />
                        <p className="text-text-main">Withdraw</p>
                    </div>
                </ButtonSecondary>
                <ButtonSecondary point={true} className="min-w-[114px] h-[38px]" onClick={handleForwardToDeposit}>
                    <div className="w-full text-sm flex items-center gap-x-1">
                        <DepositIcon className="size-4" />
                        <p className="text-text-main">Deposit</p>
                    </div>
                </ButtonSecondary>
            </div>

            <div className="mt-10 w-full flex flex-col gap-y-6">
                {
                    tokens.map((item, index) => {
                        const { token, title, decimal } = item;
                        return <section key={`${index}-${token}`} className="flex items-center justify-between w-full">
                            <div className="flex gap-x-4 items-center">
                                {renderIcon(token)}
                                <div className="text-text-main">
                                    <p className="text-base font-bold uppercase">{title}</p>
                                    <p className="text-sm">{title}</p>
                                </div>
                            </div>
                            <p className="text-text-main text-lg font-bold">{formatBalance(wallet[token].available || 0, decimal)}</p>
                        </section>;
                    })
                }
            </div>

            {/* Other features */}
            <p className="text-lg text-text-main mt-10">Other</p>
            <section className="mt-3 w-full flex gap-x-3">
                <Feature
                    title="Invite"
                    blur={false}
                    onclick={handleForwardToInvite}
                    icon={<UserPlusIcon className="size-5" />}
                />
                <Feature
                    title="Ranking"
                    blur={false}
                    onclick={handleForwardToRanking}
                    icon={<FrameIcon className="size-5" />}
                />
            </section>
        </div>
    );
};

export default Profile;