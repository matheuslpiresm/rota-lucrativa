import { cva, type VariantProps } from "class-variance-authority";
import Text from "./Text";

export const budgetVariants = cva("rounded-lg flex flex-col justify-between", {
    variants: {
        variant: {
            primary: "bg-white",
            secondary: "bg-blue-100"
        },
        size: {
            sm: "h-28 w-[calc(50%_-_0.5rem)] md:w-full md:max-w-[212px] md:h-[112px] p-4",
            md: "w-full max-w-[554px] h-[140px] p-6",
            lg: "w-full max-w-[554px] h-[221px] p-8",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "lg"
    }
})

export const budgetTextVariants = cva("", {
    variants: {
        variant: {
            primary: "text-black",
            secondary: "text-green-100"
        },
    },
    defaultVariants: {
        variant: "primary"
    }
})

interface BudgetProps extends React.ComponentProps<"div">, VariantProps<typeof budgetVariants> {
    topText: string | React.ReactNode;
    bottomText: string | React.ReactNode;
}

export default function Budget({ variant, size, className, topText, bottomText, ...props }: BudgetProps) {
    return (
        <div className={budgetVariants({ variant, size, className })} {...props}>
            <Text variant="body-sm-bold" className={budgetTextVariants({ variant })}>
                {topText}
            </Text>
            <Text variant="body-sm-bold" className={budgetTextVariants({ variant: "secondary" })}>
                {bottomText}
            </Text>
        </div>
    );
}