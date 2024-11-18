import { BaseIcon, IconProps } from "."

const CopyIcon = ({ ...props }: IconProps) => {
    return (
        <BaseIcon {...props} viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.5 5.00004H5.83333V18.3334H12.5V16.6667H14.1667V15H12.5V13.3334L14.1667 13.3334V15H15.8333V13.3334L17.5 13.3334V5.00004ZM7.5 16.6667V6.66671H15.8333V11.6667H10.8333V16.6667H7.5ZM2.5 15H4.16667V3.33337H14.1667V1.66671H4.16667H2.5V3.33337V15Z" fill="currentColor" />
        </BaseIcon>

    );
};

export default CopyIcon;
