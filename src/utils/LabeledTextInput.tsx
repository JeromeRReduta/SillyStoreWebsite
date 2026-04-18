import type { JSX } from "react";

export interface LabeledTextInputProps {
    readonly required: boolean;
    readonly label: string;
    readonly text: string;
    readonly autoComplete: string;
}

export default function LabeledTextInput({
    required, label, text, autoComplete
}: LabeledTextInputProps): JSX.Element {
    return (
        <>
            <label htmlFor={label}>{text}</label>
            <input
                required={required}
                type="text"
                id={label}
                name={label}
                autoComplete={autoComplete}
            />
        </>
    );
}