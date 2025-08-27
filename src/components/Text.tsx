import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("font-sans text-black", {
    variants: {
        variant: {
            "body-sm-bold": "text-base leading-5 font-semibold",
            "body-md-bold": "text-[18px] leading-8 font-semibold",
            "body-lg-bold": "text-2xl leading-8 font-semibold",
            "body-sm": "text-white",
            "body-md": "text-white  hover:bg-green-200",
            "table-body": "text-sm text-gray-700",
        }
    },
    defaultVariants: {
        variant: "body-sm-bold"
    }
})

interface TextProps extends VariantProps<typeof textVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
}

export default function Text({ as = "span", variant, className, children, ...props }: TextProps) {
    return React.createElement(
        as,
        {
            className: textVariants({ variant, className }),
            ...props
        },
        children
    )
}