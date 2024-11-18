export const BASE_API_URL: string | undefined =
  import.meta.env.VITE_BASE_API_URL || "/api";
export const BASE_USER_SOCKET: string | undefined =
  import.meta.env.VITE_USER_SOCKET || "/";
export const BASE_BOT_DEV: string | undefined =
  import.meta.env.VITE_BASE_BOT_DEV || "";
export const BASE_PVP_BOT: string | undefined =
  import.meta.env.VITE_PVP_BOT || "";

// FOR TESTING ONLY
export const TEST_INIT_DATA: string | undefined =
  import.meta.env.VITE_TEST_INIT_DATA || "";

export const PAGE_SIZE = 10;

export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

export const GAME_DURATION = 5; // 5s

// FOR TON
export const TON_SCAN_URL = import.meta.env.VITE_TON_SCAN_URL