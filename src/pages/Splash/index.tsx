import Button from '@/components/common/Button';
import clsx from 'clsx';
import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

export const SPLASH_BASE_ROUTE = '/splash';
export const SPLASH_ROUTE = {
    BASE: SPLASH_BASE_ROUTE,
};

const Splash: FC = () => {
    const navigate = useNavigate();

    const handleOnIntroduction = () => {
        navigate("/introduction");
    };
    return (
        <div className="h-full bg-background-1 px-4 relative flex flex-col">
            <section className={
                clsx(
                    "flex flex-col items-center flex-1 justify-center",

                )
            }>
                <section className="flex flex-col items-center">
                    <LazyLoadImage
                        alt="Hopium ticket"
                        height={200}
                        src="/images/bg_hopium.gif"
                        width={249}
                    />
                    <p className="mt-6 font-roboto text-roboto-14 text-pure-white">
                        It's time to get rewarded!
                    </p>
                </section>
            </section>


            <section className="h-fit pb-6">
                <Button variant='primary' onClick={handleOnIntroduction}>
                    <span className="text-base font-roboto font-bold text-pure-white">
                        Wow, let's go!
                    </span>
                </Button>
            </section>
        </div>
    );
};

export default Splash;