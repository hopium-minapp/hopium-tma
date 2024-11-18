
import { cn } from "@/helper";
import { ReactElement, ReactNode, forwardRef } from "react";
import {
  InputAttributes,
  NumberFormatValues,
  NumericFormat
} from "react-number-format";

export type InputNumberProps = {
  extraLabel?: ReactElement;
  suffix?: ReactElement | string;
  wrapperClassInput?: string;
  labelClassName?: string;
  wrapperClassLabel?: string;
  className?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  warning?: boolean;
  errorMessage?: string;
  placeholder?: string;
  descriptionMessage?: string;
  value?: string | number;
  defaultValue?: string | number;
  decimal?: number;
  onChange?: (values: NumberFormatValues) => void;
  onBlur?: InputAttributes["onBlur"];
  onFocus?: InputAttributes["onFocus"];
  size: "md" | "lg";
  tooltip?: string | ReactNode;
  disabled?: boolean;
  placement?: 'bottom' | 'left' | 'right' | 'top';
};

const FormInputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      disabled = false,
      suffix,
      wrapperClassInput,
      className,
      placeholder,
      suffixClassName,
      errorMessage,
      warning,
      descriptionMessage,
      // onBlur,
      // onFocus,
      value,
      defaultValue,
      decimal = 5,
      onChange,
      size
    },
    ref,
  ) => {
    // const [_focus, setFocus] = useState(false);

    // const _handleOnFocus: InputAttributes["onFocus"] = (e) => {
    //   console.log("focus");
    //   setFocus(true);
    //   if (onFocus) onFocus(e);
    // };
    // const _handleOnBlur: InputAttributes["onBlur"] = (e) => {
    //   setFocus(false);
    //   if (onBlur) onBlur(e);
    // };

    return (
      <section className="flex flex-col items-start justify-between">
        <section
          className={cn(
            "border-divider mt-1 flex w-full border bg-transparent px-3 py-2 bg-background-1",
            errorMessage && "border-primary-1",
            warning && "border-primary-1",
            wrapperClassInput,
          )}
        >
          <section className={cn("flex w-full items-center justify-between", {
            "h-8": size === "lg",
            "h-6": size === "md"
          })}>
            <NumericFormat
              allowNegative={false}
              disabled={disabled}
              inputMode="decimal"
              defaultValue={defaultValue}
              // onFocus={_handleOnFocus}
              // onBlur={_handleOnBlur}
              thousandSeparator
              allowedDecimalSeparators={[',', '.']}
              getInputRef={ref}
              decimalScale={decimal}
              className={cn(
                "text-text-main placeholder:text-text-sub w-full bg-transparent text-left focus:outline-none text-base",
                className,
              )}
              placeholder={placeholder}
              value={value}
              onValueChange={(values)=> {
                onChange && onChange(values)
              }}
              type="text"
            />
            {suffix && (
              <div className={
                cn("text-body-14 text-typo-secondary whitespace-nowrap", suffixClassName)
              }>
                {suffix}
              </div>
            )}
          </section>
        </section>
        {errorMessage ? (
          <div
            className={cn(
              "text-primary-1 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200 pt-1 text-sm",
            )}
          >
            {errorMessage}
          </div>
        ) :
          <div
            className={cn(
              "!text-text-sub max-h-0 overflow-hidden transition-all duration-200 pt-1 text-body-12",
              !errorMessage && descriptionMessage && "!max-h-max",
            )}
          >
            {descriptionMessage}
          </div>}
      </section>
    );
  },
);

export default FormInputNumber;
