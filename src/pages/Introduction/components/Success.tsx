import { formatNumber } from '@/helper';
import { useUserWallet } from '@/stores/user.store';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Success = () => {
    const wallet = useUserWallet();

    return (
        <>
            <p className="text-determination-4xl mt-10 font-determination">
                You are amazing!
            </p>
            <p className="text-base font-roboto mt-3">
                Here is your $HOPIUM reward
            </p>
            <LazyLoadImage
                className="mt-12"
                alt="Hopium ticket"
                height={200}
                // effect="blur"
                src="/images/bg_hopium.gif"
                width={249}
            />
            <p className="text-4xl font-roboto text-center mt-8">
                {formatNumber(wallet.available)}
            </p>
            <p className="text-base font-roboto mt-3">
                Thanks for your time on Telegram
            </p>
        </>
    );
};

export default Success;