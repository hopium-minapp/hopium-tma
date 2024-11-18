import { BaseIcon, IconProps } from ".";

const BotIcon = ({ ...props }: IconProps) => {
    return (
        <BaseIcon {...props} viewBox="0 0 80 80" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.66699 15H13.3337V21.6667H6.66699V15ZM20.0003 28.3333H13.3337V21.6667L20.0003 21.6667V28.3333ZM26.667 28.3333H20.0003V35H13.3337V41.6667H6.66699V55V61.6667H13.3337H66.667H73.3337V55V41.6667H66.667V35H60.0003V28.3333H66.667V21.6667L73.3337 21.6667V15H66.667L66.667 21.6667H60.0003V28.3333H53.3337V21.6667H26.667V28.3333ZM26.667 28.3333H53.3337V35H60.0003V41.6667H66.667V55H13.3337V41.6667H20.0003V35H26.667V28.3333ZM33.3337 41.6667H26.667V48.3333H33.3337V41.6667ZM46.667 41.6667H53.3337V48.3333H46.667V41.6667Z" fill="#F6F6F6" />
            <rect x="20" y="55" width="6.66667" height="13.3333" fill="#F6F6F6" />
            <rect x="53.333" y="55" width="6.66667" height="13.3333" fill="#F6F6F6" />
        </BaseIcon>
    );
};

export default BotIcon;