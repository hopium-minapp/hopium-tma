import { cn } from "@/helper";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const iconVariants = cva("inline", {
    variants: {
        size: {
            md: "w-6 h-6",
            sm: "w-4 h-4",
            lg: "w-8 h-8",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface IconProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof iconVariants> {
}

const BaseIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, children, size, ...props }, ref) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(iconVariants({ className, size }))}
                ref={ref}
                {...props}
            >
                {children}
            </svg>
        )
    }
);

BaseIcon.displayName = "BaseIcon"

export { BaseIcon, iconVariants }
export type { IconProps } 