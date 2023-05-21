import React, { useEffect } from "react";
import { RegisterContainer, StyledLogo } from "./register.styles";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    ErrorMessage,
    FormBottom,
    StyledLink,
    SuccessMessage,
} from "../../styles/elements.styles";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectRegisterFormState } from "../../store/auth/auth.selector";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { registerUserAsync } from "../../store/auth/auth.action";
import * as yup from "yup";
import {
    useYupValidationResolver,
    validationErrorMessages,
} from "../../utils/yupValidationResolver";
import FormInput from "../../components/form-input/form-input.component";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Logo from "../../assets/images/logo.svg";
import { resetRegisterFormState } from "../../store/auth/auth.reducer";

interface RegisterProps {}

type RegisterFormFields = {
    companyName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    partnerCode: string;
    terms: boolean;
};

const validationSchema = yup.object({
    companyName: yup
        .string()
        .min(3, validationErrorMessages.minLength)
        .max(20, validationErrorMessages.maxLength)
        .required(validationErrorMessages.required),
    firstName: yup
        .string()
        .min(3, validationErrorMessages.minLength)
        .max(20, validationErrorMessages.maxLength)
        .required(validationErrorMessages.required),
    lastName: yup
        .string()
        .min(3, validationErrorMessages.minLength)
        .max(20, validationErrorMessages.maxLength)
        .required(validationErrorMessages.required),
    email: yup
        .string()
        .email(validationErrorMessages.email)
        .required(validationErrorMessages.required),
    password: yup
        .string()
        .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
        .min(8, validationErrorMessages.passwordMinLength)
        .max(20, validationErrorMessages.passwordMaxLength)
        .required(validationErrorMessages.required),
    confirmPassword: yup
        .string()
        .required(validationErrorMessages.required)
        .oneOf([yup.ref("password")], "Passwords must match"),
    phone: yup.string().required(validationErrorMessages.required),
    terms: yup
        .boolean()
        .required(validationErrorMessages.terms)
        .oneOf([true], validationErrorMessages.terms),
});

const Register: React.FC<RegisterProps> = () => {
    const dispatch = useAppDispatch();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { isLoading, error, success } = useSelector(selectRegisterFormState);
    const [captchaError, setCaptchaError] = React.useState<string | null>(null);

    useEffect(() => {
        dispatch(resetRegisterFormState());
    }, []);

    const resolver = useYupValidationResolver(validationSchema);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterFormFields>({ resolver });

    const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
        try {
            if (!executeRecaptcha) {
                setCaptchaError(
                    "There was an error with the recaptcha. Please try again later."
                );
                return false;
            }
            const token = await executeRecaptcha("register");
            dispatch(
                registerUserAsync({
                    ...data,
                    token,
                })
            );
        } catch (error: any) {
            setCaptchaError(
                error.message ||
                    "There was an unexpected error. Please try again later."
            );
        }
    };

    return (
        <RegisterContainer>
            <StyledLogo src={Logo} />
            <Card>
                <CardHeader>
                    <h1 className="text-center">REGISTER</h1>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="companyName"
                                    label="Company Name"
                                    error={errors.companyName?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="firstName"
                                    label="First Name"
                                    error={errors.firstName?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="lastName"
                                    label="Last Name"
                                    error={errors.lastName?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="email"
                                    label="Email"
                                    error={errors.email?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    error={errors.password?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    error={errors.confirmPassword?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="phone"
                                    label="Telephone Number"
                                    error={errors.phone?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <FormInput
                                    name="partnerCode"
                                    label="Partner Code (Optional)"
                                    error={errors.partnerCode?.message}
                                    register={register}
                                    tooltip="If you are using a partner to assist in your onboarding, please enter their code below. If you don't have one, you can leave it blank."
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <input
                                    className="me-2"
                                    id="terms"
                                    type="checkbox"
                                    {...register("terms", { value: false })}
                                />
                                <label htmlFor="terms">
                                    By clicking this box you have read and agree
                                    to the{" "}
                                    <StyledLink
                                        to="https://google.com/tos"
                                        target="_blank"
                                    >
                                        Terms and Conditions
                                    </StyledLink>{" "}
                                    and you are authorized to accept these terms
                                    and conditions on behalf of your company.
                                </label>
                            </div>
                        </div>

                        <FormBottom>
                            <p>
                                Already have an account?{" "}
                                <StyledLink to="/login">Login</StyledLink>
                            </p>
                            {error && (
                                <ErrorMessage role="alert">
                                    {error}
                                </ErrorMessage>
                            )}
                            {captchaError && (
                                <ErrorMessage role="alert">
                                    {captchaError}
                                </ErrorMessage>
                            )}
                            {errors.terms ? (
                                <ErrorMessage role="alert">
                                    {errors.terms.message}
                                </ErrorMessage>
                            ) : null}
                            {success && (
                                <SuccessMessage>{success}</SuccessMessage>
                            )}
                            <Button
                                disabled={isLoading ? true : false}
                                type="submit"
                            >
                                {isLoading ? "Submitting..." : "Register"}
                            </Button>
                        </FormBottom>
                    </form>
                </CardBody>
            </Card>
        </RegisterContainer>
    );
};

export default Register;
