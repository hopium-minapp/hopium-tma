import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";
import { cn, formatNumber, getTxhTonLink, shortenHexString } from "@/helper";
import usePaymentAssetStore from "@/stores/payment-asset.store";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export type StatusCardHistory = 'Pending' | 'Transferring' | 'Success' | 'Failed'

type Props = {
    status: StatusCardHistory;
    transferAmount: number;
    hash: string;
    transactionTime: Date;
    warperClassName?: string;
    asset: string;
    type: 'deposit' | 'withdraw';
    id: string;
    fee?: number;
}

export default function CardHistory({ status, transferAmount, hash, transactionTime, warperClassName, asset, type, id, fee }: Props) {

    const { jettonConfig } = usePaymentAssetStore()
    const decimal = jettonConfig[asset].decimals

    return (
        <div className={cn("border-b border-solid border-divider gap-y-0.5", warperClassName)}>
            <div className="flex items-center justify-between text-sm font-bold">
                <span>{status}</span>
                <span className={cn(type === "deposit" && "text-bull", type === "withdraw" && "text-bear")}>{`${type === "deposit" ? "+" : "-"}${formatNumber(transferAmount, decimal)}`} {asset.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
                <div>
                    <span className="text-text-sub">
                        ID:
                    </span>
                    <span className="ml-0.5">{shortenHexString(id, 4, 4)}</span>
                </div>
                <div>
                    {dayjs(transactionTime).format('HH:mm:ss DD/MM/YYYY')}
                </div>
            </div>
            <div className="flex items-center justify-between text-xs">
                {hash && <div>
                    <span className="text-text-sub">
                        TxH:
                    </span>
                    <span className="ml-0.5">{shortenHexString(hash, 4, 4)}</span>
                    <Link to={getTxhTonLink(hash)} target="_blank">
                        <ExternalLinkIcon className="size-4 ml-1 text-primary-1" />
                    </Link>
                </div>}
                {fee && (
                    <div>
                        <span className="text-text-sub">
                            Fee:
                        </span>
                        <span>{`${formatNumber(fee, decimal)} ${asset.toUpperCase()}`}</span>
                    </div>
                )}
            </div>
        </div>
    )
}