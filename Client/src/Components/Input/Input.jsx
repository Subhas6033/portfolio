import React, { useId } from "react";

const Input = (
  {
    labelClass = "",
    className = "",
    type = "text",
    placeholder = "Enter your placeholder",
    label = "Enter a label",
    ...prop
  },
  ref
) => {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={className}
        placeholder={placeholder}
        {...prop}
        id={id}
      />
    </div>
  );
};

export default React.forwardRef(Input);
