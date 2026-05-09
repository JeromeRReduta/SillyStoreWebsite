import type { JSX } from "react";

export interface LabeledTextInputProps {
    readonly required: boolean;
    readonly label: string;
    readonly text: string;
    readonly autoComplete: string;
}

export default function LabeledTextInput({
    required,
    label,
    text,
    autoComplete,
}: LabeledTextInputProps): JSX.Element {
    const lowercaseLabel = label.toLowerCase();
    return (
        <>
            <label htmlFor={lowercaseLabel}>{text}</label>
            <input
                required={required}
                type="text"
                id={lowercaseLabel}
                name={lowercaseLabel}
                autoComplete={autoComplete}
            />
        </>
    );
}
