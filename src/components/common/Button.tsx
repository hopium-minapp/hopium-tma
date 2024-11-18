import { cn } from '@/helper';
import { clsx } from 'clsx';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "default" | "disable" | "secondary",
    title?: string,
    className?: string,
    classNameChildren?: string,
    children?: ReactNode;
}

const Button = forwardRef(
    ({ variant = "default", className, classNameChildren, children, ...props }: ButtonProps
        , ref: ForwardedRef<HTMLButtonElement>) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    "w-full relative h-[44px]",
                    className
                )}
                {...props}
            >
                <div className={
                    cn("absolute top-0 left-2 bottom-0 right-2",
                        variant === "primary" && "bg-primary-1",
                        variant === "default" && "bg-pure-white",
                        variant === "disable" && "bg-background-disable",
                        variant === "secondary" && "bg-background-3",
                    )
                }
                />
                <div className={
                    cn("absolute top-1 left-1 bottom-1 right-1",
                        variant === "primary" && "bg-primary-1",
                        variant === "default" && "bg-pure-white",
                        variant === "disable" && "bg-background-disable",
                        variant === "secondary" && "bg-background-3",
                    )
                }
                />
                <div className={
                    cn("absolute top-2 left-0 bottom-2 right-0",
                        variant === "primary" && "bg-primary-1",
                        variant === "default" && "bg-pure-white",
                        variant === "disable" && "bg-background-disable",
                        variant === "secondary" && "bg-background-3",
                    )
                }
                />
                <div className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', classNameChildren)}>
                    {children}
                </div>
            </button >
        );
    }
);

export default Button;