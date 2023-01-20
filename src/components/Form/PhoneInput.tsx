import React from "react";
import InputMask, { Props } from "react-input-mask";
import { Omit } from "../../@types/Shared/Omit";

type PhoneInputProps = Omit<Props, "mask"> & {
    countryCode?: string | number;
    dddSize?: string | number;
    add9AfterDdd?: boolean;
};

const formatDdd = (size: number) => {
    let stringOf9 = "";
    for (let i = 0; i < size; i++) {
        stringOf9 += "9";
    }
    return stringOf9;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
    countryCode = "55",
    dddSize = 2,
    add9AfterDdd = true,
    ...props
}) => {
    //* render
    return (
        <InputMask
            {...props}
            mask={`+${countryCode} (${formatDdd(+dddSize)}) ${
                add9AfterDdd ? "9." : ""
            }9999-9999`}
        />
    );
};

export default PhoneInput;
