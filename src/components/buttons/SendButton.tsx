import { Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { DeleteIcon, SendIcon } from '../icons';

type SendButtonProps = {
  sendButtonColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableIcon?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type SendLeadButton = {
  sendButtonColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableIcon?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const defaultIconColor = 'white';

type ToggleBotButton = {
  toggleBot: () => void;
  iconColor?: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const SendButton = (props: SendButtonProps) => {
  return (
    <button
      type="submit"
      disabled={props.isDisabled || props.isLoading}
      {...props}
      class={
        'py-1 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button ' +
        props.class
      }
      style={{ background: 'transparent', border: 'none' }}
    >
      <Show when={!props.isLoading} fallback={<Spinner class="text-white" />}>
        <SendIcon color={props.sendButtonColor} class={'send-icon flex ' + (props.disableIcon ? 'hidden' : '')} />
      </Show>
    </button>
  );
};

export const SendLeadButton = (props: SendLeadButton) => {
  return (
    <button
      type="submit"
      disabled={props.isDisabled || props.isLoading}
      {...props}
      class={
        'max-h-[40px] w-full px-3 py-1 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button ' +
        props.class
      }
      style={{ background: props.sendButtonColor, border: 'none' }}
    >
      <Show when={!props.isLoading} fallback={<Spinner class="text-white" />}>
        <SendIcon
          // color={props.sendButtonColor}
          class={'send-icon flex ' + (props.disableIcon ? 'hidden' : '')}
        />
      </Show>
    </button>
  );
};

export const ToggleBotButton = (props: ToggleBotButton) => {
  return (
    <button
      onClick={props.toggleBot}
      class="bg-transparent text-white rounded-full z-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75"
      title="Close Chat"
      {...props}
    >
      <svg viewBox="0 0 24 24" width="32" height="32">
        <path
          fill={props.iconColor ?? defaultIconColor}
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </button>
  );
};

export const DeleteButton = (props: SendButtonProps) => {
  // Check if <flowise-fullchatbot> is present in the DOM
  const isFullChatbot = document.querySelector('flowise-fullchatbot') !== null;
  const paddingClass = isFullChatbot ? 'px-4' : '';
  return (
    <button
      type="submit"
      disabled={props.isDisabled || props.isLoading}
      {...props}
      class={
        `${paddingClass} justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button ` +
        props.class
      }
      style={{ background: 'transparent', border: 'none' }}
      title="Reset Chat"
    >
      <Show when={!props.isLoading} fallback={<Spinner class="text-white" />}>
        <DeleteIcon color={props.sendButtonColor} class={'send-icon flex ' + (props.disableIcon ? 'hidden' : '')} />
      </Show>
    </button>
  );
};

export const Spinner = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    {...props}
    class={'animate-spin -ml-1 mr-3 h-5 w-5 ' + props.class}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    data-testid="loading-spinner"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
