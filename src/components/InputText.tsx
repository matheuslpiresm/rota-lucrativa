import { cva, cx, type VariantProps } from "class-variance-authority";
import { textVariants } from "./Text";

export const inputTextVariants = cva(
    `
     focus:border-green-100
    bg-white rounded-lg
    `,
    {
        variants: {
            size: {
                md: "pb-1 px-2",
            },
            inputSize: {
                sm: "w-40 h-8",
                md: "w-64 h-10",
                lg: "w- h-8",
            },
            disabled: {
                true: "pointer-events-none",
            },
        },
        defaultVariants: {
            size: "md",
            inputSize: "sm",
            disabled: false,
        },
    }
);

export interface InputTextProps extends VariantProps<typeof inputTextVariants>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> { }

export default function InputText({ size, inputSize, disabled, className, ...props }: InputTextProps) {
    return <input
        className={cx(

            inputTextVariants({ size, inputSize, disabled }),
            textVariants(),
            className
        )}
        {...props}
    />
}