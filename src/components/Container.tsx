import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import type { Container } from "react-dom/client";

export const containerVariants = cva("mx-auto", {
    variants: {
        size: {
            md: "max-w-[75rem] px-2"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface ContainerProps extends VariantProps<typeof containerVariants>,
    React.ComponentProps<"div"> {
    as?: keyof React.JSX.IntrinsicElements;
}

export default function Container({ as = "div", children, className, ...props }: ContainerProps) {
    return React.createElement(
        as,
        {
            className: containerVariants({ size: "md", className }),
            ...props
        },
        children
    )
}