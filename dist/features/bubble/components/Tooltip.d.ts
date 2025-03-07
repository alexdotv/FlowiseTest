type TooltipProps = {
    showTooltip: boolean;
    type: 'left' | 'right';
    position: {
        bottom: number;
        right: number;
        left?: number;
    };
    buttonSize: number;
    tooltipMessage?: string;
    toggleBot: () => void;
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
    tooltipFontSize?: number;
};
declare const Tooltip: (props: TooltipProps) => import("solid-js").JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map