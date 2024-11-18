import { addReferral, getProfileApi } from "@/apis/auth.api";
import baseAxios from "@/apis/base.api";
import useUserSocket from "@/hooks/useUserSocket";
import useUserStore from "@/stores/user.store";
import { User } from "@/type/auth.type";
import WebApp from "@twa-dev/sdk";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../Loading/LoadingScreen";
import useEventSocket from "@/hooks/useEventSocket";
import { getInitData } from "@/helper";
import { SOCKET_TOPIC } from "@/helper/constant";
import usePvPStore from "@/stores/pvp.store";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
    const { setResult, setAccecpted } = usePvPStore();
    const { user, setUser, getBalance, setBalance, setPrice } = useUserStore();
    const [showSplashScreen, setShowSplashScreen] = useState(!user);
    const navigate = useNavigate();
    // Setup sub balance
    useUserSocket();

    useEventSocket(SOCKET_TOPIC.PVP_ACCEPTED, setAccecpted);
    useEventSocket(SOCKET_TOPIC.PVP_ENDED, setResult);
    useEventSocket(SOCKET_TOPIC.WALLET_UPDATED, setBalance);
    useEventSocket(SOCKET_TOPIC.PRICE_UPDATED, (data: number) => {
        setPrice(data);
    });


    useEffect(() => {
        const getQueryParam = (param: string) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        };

        const fetch = async () => {
            try {
                const result = await getProfileApi();
                const userData = result.data as User;
                setUser(userData);
                if (userData) getBalance();

                if (userData.isNew) {
                    let parentId: number | null = null;
                    const tgWebApp = WebApp;
                    const initData = tgWebApp.initDataUnsafe;
                    const startParam = initData.start_param || getQueryParam('startapp');
                    if (startParam) {
                        parentId = Number(startParam.split('_')[1]);
                    }
                    if (parentId) {
                        addReferral(parentId);
                    }

                    navigate("/splash");
                } else {
                    navigate("/home");
                }
            } catch (error) {
                navigate("/splash");
            } finally {
                setShowSplashScreen(false);
            }
        };

        baseAxios.interceptors.request.use((config) => {
            config.headers.Authorization = `tma ${getInitData()}`;
            // config.headers.Authorization = `tma account1`;
            return config;
        });

        baseAxios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    navigate("/splash");
                    WebApp.showAlert("Session expired. Please refresh your app.");
                }
                return Promise.reject(error);
            },
        );

        if (!user) fetch();
    }, []);

    return !user || showSplashScreen ? (
        <LoadingScreen />
    ) : (
        <>
            {children}
        </>
    );
};

export default AuthWrapper;
