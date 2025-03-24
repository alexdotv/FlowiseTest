import { createSignal, Show } from 'solid-js';

const defaultTooltipMessage = 'Hi There 👋!';
const defaultTooltipBackgroundColor = 'black';
const defaultTooltipTextColor = 'white';
const defaultTooltipFontSize = 16; // Default font size for tooltip

type TooltipProps = {
  showTooltip: boolean;
  type: 'left' | 'right';
  position: { bottom: number; right: number; left?: number }; // Добавьте left как необязательное
  buttonSize: number;
  tooltipMessage?: string;
  toggleBot: () => void;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipFontSize?: number; // Add tooltipFontSize to props
};

const Tooltip = (props: TooltipProps) => {
  const tooltipMessage = props.tooltipMessage ?? defaultTooltipMessage;
  const backgroundColor = props.tooltipBackgroundColor ?? defaultTooltipBackgroundColor;
  const textColor = props.tooltipTextColor ?? defaultTooltipTextColor;
  const fontSize = `${props.tooltipFontSize ?? defaultTooltipFontSize}px`; // Use tooltipFontSize if provided, otherwise default to 16px
  const [userInteracted, setUserInteracted] = createSignal(false);
  const handleButtonClick = () => {
    setUserInteracted(true); // Mark that the user has interacted
    props.toggleBot();
  };
  // Generate tooltip text with line breaks if needed
  const formattedTooltipMessage =
    tooltipMessage.length > 20
      ? tooltipMessage
          .split(' ')
          .reduce<string[][]>(
            (acc, curr) => {
              const last = acc[acc.length - 1];
              if (last && last.join(' ').length + curr.length <= 20) {
                last.push(curr);
              } else {
                acc.push([curr]);
              }
              return acc;
            },
            [[]],
          )
          .map((arr) => arr.join(' '))
          .join('\n')
      : tooltipMessage;

  return (
    <Show when={!userInteracted() && props.showTooltip}>
      <div
        class="tooltip z-100000"
        onClick={handleButtonClick}
        style={{
          left: props.position?.left && props.type === 'left' ? `calc(${props.position.left}px + 3px)` : undefined,
          right: props.position?.right && props.type === 'right' ? `calc(${props.position.right}px + 3px)` : undefined,
          bottom: `${props.position.bottom + props.buttonSize + 10}px`,
          'box-shadow': 'rgb(0 0 0 / 12%) 0px 5px 10px',
          '--tooltip-background-color': backgroundColor,
          '--tooltip-text-color': textColor,
          '--tooltip-font-size': fontSize,
        }}
      >
        {formattedTooltipMessage}
      </div>
    </Show>
  );
};

export default Tooltip;
