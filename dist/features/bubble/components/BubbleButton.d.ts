import { ButtonTheme } from '../types';
type Props = ButtonTheme & {
    isBotOpened: boolean;
    toggleBot: () => void;
    defaultPosition: boolean;
    setButtonPosition: (position: {
        bottom: number;
        right: number;
        left: number;
    }) => void;
    dragAndDrop: boolean;
    autoOpen?: boolean;
    openDelay?: number;
    autoOpenOnMobile?: boolean;
};
export declare const BubbleButton: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=BubbleButton.d.ts.map