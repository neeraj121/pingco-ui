import React, { useEffect } from "react";
import { LoginContainer, StyledLogo } from "./login.styles";
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
import { selectLoginFormState } from "../../store/auth/auth.selector";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { loginUserAsync } from "../../store/auth/auth.action";
import * as yup from "yup";
import {
    useYupValidationResolver,
    validationErrorMessages,
} from "../../utils/yupValidationResolver";
import FormInput from "../../components/form-input/form-input.component";
import Logo from "../../assets/images/logo.svg";
import { resetLoginFormState } from "../../store/auth/auth.reducer";

interface LoginProps {}

type LoginFormFields = {
    username: string;
    password: string;
};

const validationSchema = yup.object({
    username: yup
        .string()
        .email(validationErrorMessages.email)
        .required(validationErrorMessages.required),
    password: yup.string().required(validationErrorMessages.required),
});

const Login: React.FC<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error, success } = useSelector(selectLoginFormState);

    useEffect(() => {
        dispatch(resetLoginFormState());
    }, []);

    const resolver = useYupValidationResolver(validationSchema);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormFields>({ resolver });

    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        dispatch(loginUserAsync(data));
    };

    return (
        <LoginContainer>
            <StyledLogo src={Logo} />
            <Card>
                <CardHeader>
                    <h1 className="text-center">Login</h1>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <FormInput
                                    name="username"
                                    label="Email"
                                    error={errors.username?.message}
                                    register={register}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <FormInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    error={errors.password?.message}
                                    register={register}
                                />
                            </div>
                        </div>

                        <FormBottom>
                            <p>
                                Don't have an account?{" "}
                                <StyledLink to="/register">Register</StyledLink>
                            </p>
                            {error && (
                                <ErrorMessage role="alert">
                                    {error}
                                </ErrorMessage>
                            )}
                            {success && (
                                <SuccessMessage>{success}</SuccessMessage>
                            )}
                            <Button
                                disabled={isLoading ? true : false}
                                type="submit"
                            >
                                {isLoading ? "Submitting..." : "Login"}
                            </Button>
                        </FormBottom>
                    </form>
                </CardBody>
            </Card>
        </LoginContainer>
    );
};

export default Login;
