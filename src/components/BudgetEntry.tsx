import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import Text from "./Text";
import InputText, { type InputTextProps } from "./InputText";
import Button from "./Button";

export const budgetEntryVariants = cva(
    "rounded-lg flex flex-col justify-between shadow-md p-6",
    {
        variants: {
            variant: {
                primary: "bg-white",
                secondary: "bg-blue-100",
            },
            size: {
                sm: "w-full max-w-[212px]",
                md: "w-full max-w-[554px]",
                lg: "w-full max-w-[554px]",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "lg",
        },
    }
);

export interface InputFieldProps extends InputTextProps {
    label: string;
}

interface BudgetProps
    extends React.ComponentProps<"div">,
    VariantProps<typeof budgetEntryVariants> {

    firstInput: InputFieldProps;
    secondInput: InputFieldProps;

    calculateButtonText: string;
    onCalculate: () => void;

    clearButtonText: string;
    onClear: () => void;
}

export default function BudgetEntry({
    variant,
    size,
    className,
    firstInput,
    secondInput,
    calculateButtonText,
    onCalculate,
    clearButtonText,
    onClear,
    ...props
}: BudgetProps) {
    return (
        <div
            className={budgetEntryVariants({ variant, size, className })}
            {...props}
        >
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
                <div className="flex flex-col gap-4 w-full">

                    <div className="flex flex-col">
                        <Text variant="body-sm">{firstInput.label}</Text>

                        <InputText {...firstInput} className="w-full md:w-45" />
                    </div>

                    <div className="flex flex-col">
                        <Text variant="body-sm">{secondInput.label}</Text>
                        <InputText {...secondInput} className="w-full md:w-45" />
                    </div>

                </div>

                <div className="flex sm:flex-row gap-4 w-full">

                    <Button onClick={onClear} size={"lg"} variant={"secondary"} className="w-full">
                        {clearButtonText}
                    </Button>

                    <Button onClick={onCalculate} size={"lg"} className="w-full">
                        {calculateButtonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}