import React from "react";
import InputMask, { Props } from "react-input-mask";
import { Omit } from "../../@types/Shared/Omit";

type CpfInputProps = Omit<Props, "mask">;

const CpfInput: React.FC<CpfInputProps> = ({ ...props }) => {
    //* render
    return <InputMask {...props} mask="999.999.999-99" />;
};

export default CpfInput;
