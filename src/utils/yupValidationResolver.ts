import { useCallback } from "react";
import * as yup from "yup";

export const validationErrorMessages = {
    required: "This field is required",
    minLength: "Must be at least 3 characters",
    maxLength: "Must be at most 20 characters",
    email: "Invalid email address",
    passwordMinLength: "Must be at least 8 characters",
    passwordMaxLength: "Must be at most 20 characters",
    password:
        "Should contain atleast one uppercase letter, one lowercase letter, one number and no line breaks",
    terms: "Please accept the terms and conditions",
};

export const useYupValidationResolver = (
    validationSchema: yup.ObjectSchema<any, any, any, any>
) =>
    useCallback(
        async (data: any) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: yup.ValidationError) => {
                            return currentError.path
                                ? {
                                      ...allErrors,
                                      [currentError.path]: {
                                          type:
                                              currentError.type ?? "validation",
                                          message: currentError.message,
                                      },
                                  }
                                : allErrors;
                        },
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );
