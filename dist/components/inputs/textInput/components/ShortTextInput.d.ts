import { JSX } from 'solid-js/jsx-runtime';
type ShortTextInputProps = {
    ref: HTMLInputElement | HTMLTextAreaElement | undefined;
    onInput: (value: string) => void;
    fontSize?: number;
    disabled?: boolean;
    height?: number;
    setHeightF: (height: number) => void;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'>;
export declare const DEFAULT_HEIGHT = 40;
export declare const ShortTextInput: (props: ShortTextInputProps) => JSX.Element;
export {};
//# sourceMappingURL=ShortTextInput.d.ts.map