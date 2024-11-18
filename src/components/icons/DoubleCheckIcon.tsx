import { BaseIcon, IconProps } from "."

const DoubleCheckIcon = ({ ...props }: IconProps) => {
    return (
        <BaseIcon {...props} viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 6H17V8H15V6ZM13 10V8H15V10H13ZM11 12V10H13V12H11ZM9 14V12H11V14H9ZM7 16V14H9V16H7ZM5 16H7V18H5V16ZM3 14H5V16H3V14ZM3 14H1V12H3V14ZM11 16H13V18H11V16ZM15 14V16H13V14H15ZM17 12V14H15V12H17ZM19 10V12H17V10H19ZM21 8H19V10H21V8ZM21 8H23V6H21V8Z" fill="currentColor" />
        </BaseIcon>

    );
};

export default DoubleCheckIcon;
