import { BASE_BOT_DEV, TEST_INIT_DATA, TON_SCAN_URL } from "@/config/app.config";
import WebApp from "@twa-dev/sdk";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ASSET } from "./constant";

const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
};

export const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text);
};

const truncateFractionAndFormat = (
    parts: Intl.NumberFormatPart[],
    digits: number
) => {
    const value = parts.map(({ type, value }) => {
        if (type !== 'fraction' || !value || value.length < digits) {
            return value;
        }

        let retVal = "";
        for (let idx = 0, counter = 0; idx < value.length && counter < digits; idx++) {
            if (value[idx] !== '0') {
                counter++;
            }
            retVal += value[idx];
        }
        return retVal;
    }).reduce((string, part) => string + part, '');
    return value;
};

export const formatNumber = (n?: number | string | bigint, digits = 2) => {
    if (!n) return "0";

    if (typeof n === "string") n = Number(n);

    const formatter = Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0,
    });
    return truncateFractionAndFormat(formatter.formatToParts(n), digits);
};

export const formatBalance = (balance?: number | string | bigint, digits = 2): string => {
    if (!balance) return "0";

    if (typeof balance === "string") balance = Number(balance);

    if (typeof balance === "bigint") balance = Number(balance);

    const factor = Math.pow(10, digits);
    const truncated = Math.floor(balance * factor) / factor;

    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
    });

    return formatter.format(truncated);
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getInitData = () => {
    if (!!WebApp.initData) return WebApp.initData;
    return TEST_INIT_DATA;
};

export const getRefLink = (userId: number) => {
    return `${BASE_BOT_DEV}?startapp=linkCode_${userId}`;
};

export const openShareLink = (userId: number, text = "Let's see who needs HOPIUM! Predict Bitcoin's price with your frens 🤑") => {
    WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(
            getRefLink(userId)
        )}&text=${encodeURIComponent(text)}`
    );
};

export function shortenHexString(
    hexString: string,
    prefixLength: number,
    suffixLength: number
): string {
    if (hexString?.length < prefixLength + suffixLength) {
        return "";
    }

    const prefix = hexString?.slice(0, prefixLength);
    const suffix = hexString?.slice(-suffixLength);

    return `${prefix}...${suffix}`;
}

export function formatBigNum(num?: number, digits = 2) {
    if (!num) return "0";
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    if (num >= 0 && num < 1e6)
        return formatNumber(num, digits);

    return item
        ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
        : '0';
}

export const getTxhTonLink = (txHash: string) => {
    console.log("TON_SCAN_URL: ", TON_SCAN_URL);
    return TON_SCAN_URL + `/transaction/${txHash}`;
};

export const getAddressTonLink = (address: string) => {
    return TON_SCAN_URL + `/${address}`;
};

export function formatUnits(value: bigint, decimals: number) {
    let display = value.toString()

    const negative = display.startsWith('-')
    if (negative) display = display.slice(1)

    display = display.padStart(decimals, '0')

    // eslint-disable-next-line prefer-const
    let [integer, fraction] = [
        display.slice(0, display.length - decimals),
        display.slice(display.length - decimals),
    ]
    fraction = fraction.replace(/(0+)$/, '')
    return `${negative ? '-' : ''}${integer || '0'}${fraction ? `.${fraction}` : ''
        }`
}

export function parseUnits(value: string, decimals: number) {
    let [integer, fraction = '0'] = value.split('.')

    const negative = integer.startsWith('-')
    if (negative) integer = integer.slice(1)

    // trim leading zeros.
    fraction = fraction.replace(/(0+)$/, '')

    // round off if the fraction is larger than the number of decimals.
    if (decimals === 0) {
        if (Math.round(Number(`.${fraction}`)) === 1)
            integer = `${BigInt(integer) + 1n}`
        fraction = ''
    } else if (fraction.length > decimals) {
        const [left, unit, right] = [
            fraction.slice(0, decimals - 1),
            fraction.slice(decimals - 1, decimals),
            fraction.slice(decimals),
        ]

        const rounded = Math.round(Number(`${unit}.${right}`))
        if (rounded > 9)
            fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0')
        else fraction = `${left}${rounded}`

        if (fraction.length > decimals) {
            fraction = fraction.slice(1)
            integer = `${BigInt(integer) + 1n}`
        }

        fraction = fraction.slice(0, decimals)
    } else {
        fraction = fraction.padEnd(decimals, '0')
    }

    return BigInt(`${negative ? '-' : ''}${integer}${fraction}`)
}


export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const getPathImageBuyAsset = (key: number) => {
    switch (key) {
        case ASSET.HOPIUM:
            return '/images/home/hopium.png';
        case ASSET.TON:
            return '/images/ton.png';
        case ASSET.DOGS:
            return '/images/dog.png';
        case ASSET.CATI:
            return '/images/lucky/cati.png';
        case ASSET.USDT:
            return '/images/usdt.png';

        default:
            break;
    }
}
