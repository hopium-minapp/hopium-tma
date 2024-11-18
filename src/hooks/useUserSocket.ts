
import { getInitData } from "@/helper";
import UserSocket from "@/sockets/user.socket";
import useSocketStore from "@/stores/socket.store";
import { useCallback, useEffect, useRef } from "react";

const useUserSocket = () => {
    const socket = useRef<UserSocket | null>(null);

    // Save socket to store: TODO
    const { setSocket, setIsSocketConnected } = useSocketStore();
    const onConnect = useCallback(() => {
        setIsSocketConnected(true);
        socket.current?.emitEvent("subscribe.price")
    }, []);
    
    const onDisconnect = useCallback(() => {
        setSocket(undefined);
        setIsSocketConnected(false);
    }, []);

    useEffect(() => {
        const initData = getInitData()
        if (initData) {
            socket.current = UserSocket.getInstance(initData);
            socket.current.connect();
            setSocket(socket.current);
        }

        // Callback on event socket
        socket.current?.on('connect', onConnect);
        socket.current?.on('disconnect', onDisconnect);
        return () => {
            socket.current?.off('connect', onConnect);
            socket.current?.off('disconnect', onDisconnect);
        };
    }, []);

    return socket.current;
};

export default useUserSocket;