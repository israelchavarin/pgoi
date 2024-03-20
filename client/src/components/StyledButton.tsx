import type { ComponentProps } from "react";

type StyledButtonProps = {
  text: string;
} & ComponentProps<"button">;

export default function StyledButton({ text, ...props }: StyledButtonProps) {
  return (
    <button
      className='bg-orange-800 text-white px-4 py-2 rounded-md my-2'
      {...props}
    >
      {text}
    </button>
  );
}
