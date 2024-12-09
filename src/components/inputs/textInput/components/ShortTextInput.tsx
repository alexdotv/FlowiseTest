import { createSignal, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

type ShortTextInputProps = {
  ref: HTMLInputElement | HTMLTextAreaElement | undefined;
  onInput: (value: string) => void;
  fontSize?: number;
  disabled?: boolean;
  height?: number;
  setHeightF: (height: number) => void;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'>;

export const DEFAULT_HEIGHT = 40;
const MAX_HEIGHT = 6 * 24;

export const ShortTextInput = (props: ShortTextInputProps) => {
  const [local, others] = splitProps(props, ['ref', 'onInput']);

  const handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    target.style.height = 'auto';

    if (target.value === '') {
      props.setHeightF(DEFAULT_HEIGHT);
    } else {
      const newHeight = Math.min(target.scrollHeight, MAX_HEIGHT);
      props.setHeightF(newHeight);
    }

    target.scrollTo(0, target.scrollHeight);
    local.onInput(target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.currentTarget as HTMLTextAreaElement;

    if (target.value === '') {
      if (e.key === 'Enter') {
        e.preventDefault();
        props.setHeightF(DEFAULT_HEIGHT);
        return;
      }
    } else if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        target.value += '\n';
        handleInput(e);
      } else {
        e.preventDefault();
        props.setHeightF(DEFAULT_HEIGHT);
      }
    }
  };

  return (
    <textarea
      ref={props.ref}
      class="my-auto focus:outline-none bg-transparent px-4 py-2 flex-1 w-full min-h-[40px] max-h-[100px] scrollable-container text-area-class text-input disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100"
      disabled={props.disabled}
      rows={1}
      style={{
        'font-size': props.fontSize ? `${props.fontSize}px` : '16px',
        resize: 'none',
        height: `${props.height}px`,
      }}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      {...others}
    />
  );
};
