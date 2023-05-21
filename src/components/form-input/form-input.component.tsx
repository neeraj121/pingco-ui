import React, { useCallback, useEffect, useMemo, useState } from "react";
import Tooltip from "../tooltip/tooltip.component";
import ShowPassword from "../../assets/images/icon-password-show.svg";
import {
    FormInputStyled,
    LabelStyled,
    FormInputWrapper,
    ShowPasswordIcon,
    GroupWrapper,
} from "./form-input.styles";
import { FieldErrorMessage } from "../../styles/elements.styles";
import { UseFormRegister } from "react-hook-form/dist/types";

interface FormInputProps {
    name: string;
    register?: UseFormRegister<any>;
    label?: string;
    tooltip?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    error?: string | boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    label,
    tooltip,
    value,
    type,
    error,
    register,
    ...otherProps
}) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [inFocus, setInFocus] = useState(
        !value || value?.trim() === "" ? false : true
    );
    const inputType = useMemo(() => {
        if (type === "password") {
            if (passwordShown) {
                return "text";
            }
        }
        return type || "text";
    }, [passwordShown, type]);

    const handleIconMouseDown: React.MouseEventHandler<HTMLImageElement> = (
        event
    ) => {
        event.preventDefault();
        setPasswordShown(!passwordShown);
    };

    const handleMouseUp = useCallback(() => {
        if (passwordShown) {
            setPasswordShown(false);
        }
    }, [passwordShown]);

    useEffect(() => {
        if (passwordShown) {
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [passwordShown, handleMouseUp]);

    const onFocusHandler = () => {
        setInFocus(true);
    };

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.target.value === "") {
            setInFocus(false);
        }
    };

    return (
        <GroupWrapper className={inFocus && label ? "in-focus" : ""}>
            {label && <LabelStyled htmlFor={name}>{label}</LabelStyled>}
            <FormInputWrapper>
                <FormInputStyled
                    id={name}
                    type={inputType}
                    {...otherProps}
                    aria-invalid={error ? "true" : "false"}
                    onFocus={onFocusHandler}
                    {...(register
                        ? {
                              ...register(name, {
                                  value: value,
                                  onBlur: onBlurHandler,
                              }),
                          }
                        : {
                              name: name,
                              value: value,
                              onChange: otherProps.onChange,
                              onBlur: onBlurHandler,
                          })}
                />

                {tooltip ? <Tooltip description={tooltip} /> : null}

                {type === "password" && (
                    <ShowPasswordIcon
                        src={ShowPassword}
                        width="20"
                        height="auto"
                        alt="show password"
                        onMouseDown={handleIconMouseDown}
                    />
                )}
            </FormInputWrapper>
            {error ? (
                <FieldErrorMessage role="alert">{error}</FieldErrorMessage>
            ) : null}
        </GroupWrapper>
    );
};

export default FormInput;
