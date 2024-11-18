import { useEffect } from "react";
// import useUserSocket from "./useUserSocket";
import useSocketStore from "@/stores/socket.store";

const useEventSocket = (
    event: string,
    callback: (data: any) => void,
) => {
    const { socket } = useSocketStore();

    useEffect(() => {
        // if (!isSocketConnected) {
        //     console.log("Log out disconnect");
        //     socket?.disconnect();
        // }

        socket?.subscribe(event, callback);
        return () => {
            socket?.unsubscribe(event, callback);
        };
    }, [callback, event, socket]);
};

export default useEventSocket;