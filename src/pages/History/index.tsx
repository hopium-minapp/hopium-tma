import { getHistoryDeposit, getHistoryWithdraw } from "@/apis/history.api";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import { capitalizeFirstLetter, cn } from "@/helper";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import CardHistory, { StatusCardHistory } from "./component/CardHistory";
import { HistoryDepositData, HistoryWithdrawData } from "@/type/history.type";
import { useSearchParams } from 'react-router-dom';

type FilterHistory = 'all' | 'deposit' | 'withdraw'

export default function History() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const filterDefault = searchParams.get('filter');
    const [filter, setFilter] = useState<FilterHistory>(filterDefault as FilterHistory)
    const [offsetDeposit, setOffsetDeposit] = useState<number>(0);
    const [offsetWithdraw, setOffsetWithdraw] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataHistoryDeposit, setDataHistoryDeposit] = useState<{ data: HistoryDepositData[], hasMore: boolean; } | null>(null)
    const [dataHistoryWithdraw, setDataHistoryWithdraw] = useState<{ data: HistoryWithdrawData[], hasMore: boolean; } | null>(null)

    const filterHistory = [
        // {
        //     label: 'All',
        //     value: 'all',
        // },
        {
            label: 'Deposit',
            value: 'deposit'
        },
        {
            label: 'Withdraw',
            value: 'withdraw'
        }
    ]

    const fetchHistoryDeposit = useCallback(async () => {
        try {
            const res = await getHistoryDeposit({ limit: 10, offset: offsetDeposit })

            if (res?.data) {
                setDataHistoryDeposit(prevState => {
                    if (!prevState) return { ...res.data, data: res.data.data };
                    return { ...res.data, data: [...prevState.data, ...res.data.data] };
                });
                setLoading(false);
                setOffsetDeposit(pre => {
                    return pre + 10
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [offsetDeposit]);

    const fetchHistoryWithdraw = useCallback(async () => {
        try {
            const res = await getHistoryWithdraw({ limit: 10, offset: offsetWithdraw })

            if (res?.data) {
                setDataHistoryWithdraw(prevState => {
                    if (!prevState) return { ...res.data, data: res.data.data };
                    return { ...res.data, data: [...prevState.data, ...res.data.data] };
                });
                setLoading(false);
                setOffsetWithdraw(pre => pre + 10);
            }
        } catch (error) {
            console.log(error);
        }
    }, [offsetWithdraw]);

    useEffect(() => {
        fetchHistoryDeposit()
        fetchHistoryWithdraw()
    }, [])

    const backward = () => {
        navigate(-1);
    }

    const handleChangeFilter = (value: FilterHistory) => {
        setFilter(value)
    }

    if (loading) return <div className="h-[465px]"><LoadingScreen /></div>;

    return (
        <div id="historyScrollableDiv" className="mt-6 px-4">
            <div className="flex items-center justify-between">
                <button onClick={backward}>
                    <ArrowIcon className="size-6" />
                </button>
                <span className="font-bold text-lg">History</span>
                <div />
            </div>
            <div className="mt-4">
                <div className="grid grid-cols-2 gap-x-2">
                    {filterHistory.map((item) => {
                        const active = filter === item.value
                        return (
                            <button onClick={() => handleChangeFilter(item.value as FilterHistory)} className={
                                cn("text-sm font-normal text-center py-1 hover:bg-primary-2",
                                    active && 'bg-primary-2',
                                    !active && 'bg-background-2'
                                )
                            }>
                                {item.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="mt-4 max-h-[580px] min-h-[580px]">
                <InfiniteScroll
                    dataLength={filter === 'deposit' ? dataHistoryDeposit?.data.length || 0 : dataHistoryWithdraw?.data.length || 0}
                    next={filter === 'deposit' ? fetchHistoryDeposit : fetchHistoryWithdraw}
                    height={580}
                    hasMore={filter === 'deposit' ? dataHistoryDeposit?.hasMore || false : dataHistoryWithdraw?.hasMore || false}
                    loader={<h4 className="text-base">...</h4>}
                    scrollableTarget="historyScrollableDiv"
                >
                    {filter === 'deposit'
                        && dataHistoryDeposit
                        && dataHistoryDeposit?.data.length > 0
                        && dataHistoryDeposit.data.map((item, index) => {
                            return (
                                <CardHistory
                                    warperClassName={cn(index === 0 && "pb-3", index > 0 && "py-3")}
                                    key={item._id}
                                    type={"deposit"}
                                    transferAmount={item.amount}
                                    hash={item.transactionHash}
                                    transactionTime={item.createdAt}
                                    asset={item.asset}
                                    status={capitalizeFirstLetter(item.status) as StatusCardHistory}
                                    id={item._id}
                                />
                            );
                        })}
                    {filter === 'withdraw'
                        && dataHistoryWithdraw
                        && dataHistoryWithdraw?.data.length > 0
                        && dataHistoryWithdraw.data.map((item, index) => {
                            return (
                                <CardHistory
                                    warperClassName={cn(index === 0 && "pb-3", index > 0 && "py-3")}
                                    key={item._id}
                                    type={"withdraw"}
                                    transferAmount={item.amount}
                                    hash={item.transactionHash}
                                    transactionTime={item.createdAt}
                                    asset={item.asset}
                                    status={capitalizeFirstLetter(item.status) as StatusCardHistory}
                                    id={item._id}
                                    fee={item.fee}
                                />
                            );
                        })}
                </InfiniteScroll>
            </div>
            <div className="fixed bottom-0 bg-background-1 left-0 right-0 h-28" />
        </div>
    )
}