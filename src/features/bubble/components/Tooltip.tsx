import { createSignal, Show, For, onMount } from 'solid-js';

const defaultTooltipMessage = ['Hi There 👋!'];
const defaultTooltipBackgroundColor = '#f7f8ff';
const defaultTooltipTextColor = '#303235';
const defaultTooltipFontSize = 16;

type TooltipProps = {
  showTooltip: boolean;
  type: 'left' | 'right';
  position: { bottom: number; right: number; left?: number };
  buttonSize: number;
  tooltipMessage?: string[];
  toggleBot: () => void;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipFontSize?: number;
};

const Tooltip = (props: TooltipProps) => {
  const tooltipMessage = props.tooltipMessage ?? defaultTooltipMessage;
  const backgroundColor = props.tooltipBackgroundColor ?? defaultTooltipBackgroundColor;
  const textColor = props.tooltipTextColor ?? defaultTooltipTextColor;
  const fontSize = `${props.tooltipFontSize ?? defaultTooltipFontSize}px`;
  const [userInteracted, setUserInteracted] = createSignal(false);
  const [visibleMessages, setVisibleMessages] = createSignal<string[]>([]);

  const handleButtonClick = () => {
    setUserInteracted(true);
    props.toggleBot();
  };

  onMount(() => {
    if (props.showTooltip && !userInteracted()) {
      tooltipMessage.forEach((message, index) => {
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message]);
        }, index * 4000);
      });
    }
  });

  return (
    <Show when={!userInteracted() && props.showTooltip}>
      <div
        class="absolute z-50 flex flex-col justify-start items-start bg-transparent dark:bg-transparent 
        transition-all duration-200 transform origin-bottom w-fit max-w-[220px] cursor-pointer gap-2 overflow-visible"
        onClick={handleButtonClick}
        style={{
          left: props.position?.left && props.type === 'left' ? `calc(${props.position.left}px + 3px)` : undefined,
          right: props.position?.right && props.type === 'right' ? `calc(${props.position.right}px + 3px)` : undefined,
          bottom: `${props.position.bottom + props.buttonSize + 10}px`,
        }}
      >
        <For each={visibleMessages()}>
          {(message, index) => (
            <div
              class="relative px-4 py-[10px] w-fit chatbot-host-bubble tracking-normal prose !leading-5 
              rounded-[20px] mb-2 transition-all duration-500 ease-out transform opacity-100 overflow-visible"
              style={{
                'background-color': backgroundColor,
                color: textColor,
                'font-size': fontSize,
                opacity: 0,
                transform: 'translateY(10px)',
                animation: `fadeInUp 0.5s ease-out forwards ${index() * 0.3}s`,
              }}
            >
              {message}
            </div>
          )}
        </For>
      </div>
      <style>
        {`
          .chatbot-host-bubble {
            position: relative;
          }

          .chatbot-host-bubble::after {
            content: "";
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: ${backgroundColor};
            transform: rotate(45deg);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
            bottom: -6px;
            left: ${props.type === 'left' ? '20px' : 'auto'};
            right: ${props.type === 'right' ? '20px' : 'auto'};
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Show>
  );
};

export default Tooltip;
