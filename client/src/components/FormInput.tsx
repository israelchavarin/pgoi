import { forwardRef } from "react";
import type { ComponentProps } from "react";

const FormInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  (props, ref) => {
    const autocomplete =
      props.name === "taxIdentifier" ||
      props.name === "nationalIdentifier" ||
      props.name === "password"
        ? "off"
        : "on";

    return (
      <input
        {...props}
        autoComplete={autocomplete}
        ref={ref}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
      />
    );
  }
);

export default FormInput;
