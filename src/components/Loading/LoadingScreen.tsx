
import { FC } from "react";

const LoadingScreen: FC<{ visible?: boolean; }> = () => {
    return (
        <div
            className="flex items-center justify-center w-full h-full"
        >
            <span className="loader"></span>
        </div>
    );
};

export { LoadingScreen };
