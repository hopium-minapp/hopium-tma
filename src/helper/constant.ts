export const TON_DECIMALS = 9;

export enum SOCKET_TOPIC {
    WALLET_UPDATED = "wallet.updated",
    PRICE_UPDATED = "price.updated",
    PVP_ENDED = "pvp.ended",
    PVP_ACCEPTED = "pvp.accepted"
}

export enum APP_STEP {
    SPLASH = 1,
    INTRODUCTION = 2,
    INVITE = 3,
}

export enum GAME_RESULT {
    WIN = "WIN",
    LOSS = "LOSS",
    REJECTED = 'Rejected',
    BLESSED = 'Blessed'
}

export const RANKING_TAB = {
    FRIENDS: 'friends',
    GLOBAL: 'global',
    PVP: 'pvp'
};

export const TASK_TAB = {
    HOPIUM: "HOPIUM",
    LUCKY: "LUCKY"
};

export const PVP_TAB = {
    CREATE_POSITION: "CREATE_POSITION",
    POSITION_LIST: "POSITION_LIST"
};

export const KEY_ICON_TASK = {
    CALENDAR_CHECK_ICON: "CALENDAR_CHECK_ICON",
    USER_PLUS_ICON: "USER_PLUS_ICON",
    TELEGRAM_ICON: "TELEGRAM_ICON",
    BOOKMARK_ICON: "BOOKMARK_ICON",
    TWITTER_ICON: "TWITTER_ICON",
    TON_ICON: "TON_ICON",
    PVP_ICON: "PVP_ICON",

    // Partner
    KAIA_ICON: "KAIA_ICON",
    LION_GOAL_ICON: "LION_GOAL_ICON",
    MEME_TOWN_ICON: "MEME_TOWN_ICON",
    CAT_PLANETS_ICON: "CAT_PLANETS_ICON",
    HABIT_NETWORK_ICON: "HABIT_NETWORK_ICON",
    AAO_ICON: "AAO_ICON",
    MONKEY_PAW_ICON: "MONKEY_PAW_ICON",
    GHOSTDRIVE_ICON: "GHOSTDRIVE_ICON",
    HAMSTER_REPUBLIC_ICON: "HAMSTER_REPUBLIC_ICON",
    UNIQUID_ICON: "UNIQUID_ICON",
    NANOZAP_ICON: "NANOZAP_ICON",
    BULLS_ICON: "BULLS_ICON",
    HYBIRD_ICON: "HYBIRD_ICON",
    BEEVERSE_ICON: "BEEVERSE_ICON",
    BITHOVEN_ICON: "BITHOVEN_ICON",
    YULIGO_ICON: "YULIGO_ICON",
    CAT_THE_CHICK_ICON: "CAT_THE_CHICK_ICON",
    TON_FLASH_ICON: "TON_FLASH_ICON",
    P4L_ICON: "P4L_ICON",
    AKEFISH_ICON: "AKEFISH_ICON",
    AIGOTRADE_ICON: "AIGOTRADE_ICON",
    COIN_FLIP_ICON: "COIN_FLIP_ICON",
};
export const SYMBOL = "BTCUSDT";

export const TASK_TYPE = {
    ALL: "ALL",
    DAILY: 'DAILY',
    FIXED: 'FIXED',
    ONE_TIME: 'ONE_TIME',
    PARTNER: 'PARTNER',
};

export const STATUS_TASK = {
    LOCKED: 'LOCKED',
    CLAIMABLE: 'CLAIMABLE',
    COMPLETED: 'COMPLETED',
    UNCOMPLETED: 'UNCOMPLETED',
};

export const CONDITION_TASK = {
    DAILY_CHECK_IN: 'DAILY_CHECK_IN',
    INVITE_FRIEND: 'INVITE_FRIEND',
    JOIN_TELEGRAM_GROUP: 'JOIN_TELEGRAM_GROUP',
    SUBSCRIBE_TELEGRAM_CHANNEL: 'SUBSCRIBE_TELEGRAM_CHANNEL',
    SUBSCRIBE_TWITTER: 'SUBSCRIBE_TWITTER',
};

export const SIDE = {
    PUMP: "PUMP",
    DUMP: "DUMP"
};

export const HISTORY_TABS = {
    HOPIUM: "hopium",
    PVP: "pvp"
};

export const PRIZE_ICON = {
    HOPIUM_ICON: "HOPIUM_ICON",
    DOGS_ICON: "DOGS_ICON",
    LOTTERY_TICKET: "LOTTERY_TICKET",
    TON_ICON: "TON_ICON",
    CATI_ICON: "CATI_ICON",
};

export enum PRIZE_TYPE {
    HOPIUM = "HOPIUM",
    DOGS = "DOGS",
    TICKET = "TICKET",
    TON = "TON",
    CATI = "CATI",
}

export enum TOKEN {
    HOPIUM = "hopium",
    DOGS = "dogs",
    TICKET = "ticket",
    TON = "ton",
    CATI = "cati",
    USDT = "usdt"
}

export enum ASSET {
    HOPIUM = 1,
    TICKET = 2,
    USDT = 22,
    TON = 564,
    DOGS = 567,
    CATI = 574,
}
