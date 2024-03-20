import { ComponentProps } from "react";

type ErrorDivProps = {
  text: string;
} & ComponentProps<"div">;

export default function ErrorDiv({ text, ...props }: ErrorDivProps) {
  return (
    <div
      className='bg-red-600 p-2 text-white text-center rounded-md'
      {...props}
    >
      {text}
    </div>
  );
}
