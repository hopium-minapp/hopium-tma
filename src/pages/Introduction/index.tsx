import clsx from "clsx";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Pioneer from "./components/Pioneer";
import Success from "./components/Success";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/user.store";

export const INTRODUCTION_BASE_ROUTE = '/introduction';
export const INTRODUCTION_ROUTE = {
    BASE: INTRODUCTION_BASE_ROUTE,
};

enum STEP_INTRODUCTION {
    STEP_1 = 1,
    STEP_2 = 2
}

const steps = 2;

const Introduction = () => {
    const [step, setStep] = useState(STEP_INTRODUCTION.STEP_1);

    const handleChangeStep = () => {
        setStep(STEP_INTRODUCTION.STEP_2);
    };

    const navigate = useNavigate();
    const handleToInvite = () => {
        navigate("/invite");
    };
    const handleToHome = () => {
        navigate("/home");
    };

    const getBalance = useUserStore(state => state.getBalance);

    useEffect(() => {
        getBalance();
    }, []);
    return (
        <div className="bg-background-1 px-4 relative flex flex-col h-full">
            <section className="flex flex-col items-center flex-1">
                {/* Tabs */}
                <div className="flex items-center gap-2 h-fit w-full mt-6">
                    {
                        Array(steps).fill(1).map((_, index) => {
                            return <div
                                key={index}
                                className={
                                    clsx(
                                        "flex-1 h-1",
                                        index + 1 <= step ? "bg-primary-1" : "bg-background-3"
                                    )
                                }></div>;
                        })
                    }
                </div>
                {/* Content */}
                {step === STEP_INTRODUCTION.STEP_1 && <Pioneer />}
                {step === STEP_INTRODUCTION.STEP_2 && <Success />}
            </section>

            <section className="h-fit pb-6">
                {
                    step === STEP_INTRODUCTION.STEP_1 &&
                    <Button variant="primary" onClick={handleChangeStep}>
                        <span className="text-base font-roboto font-bold text-pure-white">
                            Continue
                        </span>
                    </Button>
                }
                {
                    step === STEP_INTRODUCTION.STEP_2 && <div className="flex gap-2 items-center">
                        <Button variant='default' onClick={handleToInvite}>
                            <span className="text-base font-roboto font-bold text-pure-black whitespace-nowrap">
                                Invite Friends
                            </span>
                        </Button>
                        <Button variant='primary' onClick={handleToHome}>
                            <span className="text-base font-roboto font-bold text-pure-white">
                                Continue
                            </span>
                        </Button>
                    </div>
                }
            </section>
        </div>
    );
};

export default Introduction;