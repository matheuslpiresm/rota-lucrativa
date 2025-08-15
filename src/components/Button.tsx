import { cva, type VariantProps } from "class-variance-authority";
import Icon from "./Icon"
import Text from "./Text";

export const buttonVariants = cva(`
    flex items-center justify-center cursor-pointer
    transition rounded-lg group 
    `, {
    variants: {
        variant: {
            primary: "bg-green-200 hover:bg-green-100",
            secondary: "bg-red-200 hover:bg-red-100"
        },
        size: {
            sm: "h-12",
            lg: "w-35 h-[40px]",
        },
        disabled: {
            true: "opacity-50 pointer-events-none"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "sm",
        disabled: false
    }
});

export const buttonIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-white",
            secondary: "fill-black"
        },
        size: {
            sm: "w-4 h-3.5 ml-4",
            lg: "w-6 h-3 ml-6"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "sm"
    }
})

interface ButtonProps extends Omit<React.ComponentProps<"button">, "size" | "disabled">, VariantProps<typeof buttonVariants> {
    icon?: React.ComponentProps<typeof Icon>["svg"]
}


export default function Button({ variant, size, disabled, className, children, icon: IconComponent, ...props }: ButtonProps) {
    return <button className={buttonVariants({ variant, size, disabled, className })} {...props}>
        {IconComponent && (
            <Icon
                svg={IconComponent}
                className={buttonIconVariants({ variant, size })}
            />
        )}
        <Text variant="body-sm">{children}</Text>
    </button>
}