


"use client"

import { authClient } from "@/lib/auth-client"
import { Button, Card, CardHeader, FieldError, Input, InputGroup, TextField, toast } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaUserPlus } from "react-icons/fa"
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi"


type RegisterFormValues = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const RegisterForm = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",

        },
    });

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {

        await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.fullName
        }, {
            onSuccess: () => {
                router.push("/members")
            },
            onError: (ctx) => {
                toast.danger(ctx.error.message);
            }
        } )
    }

    return (
        <Card className="w-md shadow-xl">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex items-center gap-3">
                        <FaUserPlus size={30} />
                        <h1 className="text-3xl font-semibold">Create Account</h1>
                    </div>
                    <p className="text-foreground/60">Welcome to NextMatch</p>
                </div>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 py-4" noValidate>
                <TextField aria-label="fullName" isInvalid={!!errors.fullName} fullWidth>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <FiUser />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            placeholder="Enter your full name"
                            id="fullName"
                            {...register("fullName", {
                                required: "Full name is required",
                                minLength: { value: 2, message: "Name must be at least 2 characters" },
                            })}
                        />
                    </InputGroup>
                    <FieldError>{errors.fullName?.message}</FieldError>
                </TextField>

                <TextField defaultValue="" aria-label="email" isInvalid={!!errors.email}>

                    <Input
                        placeholder="Enter your Email"
                        type="email"
                        id="email"
                        className="pl-10"
                        {...register("email", {
                            required: "Email is requierd",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                                message: "Enter a valid email address",
                            }

                        })}
                    />
                    <FieldError>{errors.email && <p>{errors.email?.message}</p>}</FieldError>
                </TextField>


                <TextField defaultValue="" aria-label="password" isInvalid={!!errors.password}>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <FiLock />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            aria-invalid={!!errors.password}

                            {...register("password", {
                                required: "password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                                pattern: {
                                    value: /\d/,
                                    message: "Password must contain at least one number",
                                }
                            })}
                        />
                        <InputGroup.Suffix>
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    <FieldError>{errors.password?.message}</FieldError>
                </TextField>

                <TextField defaultValue="" aria-label="confirmPassword" isInvalid={!!errors.confirmPassword}>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <FiLock />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            type={showConfirm ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Confirm password"
                            aria-invalid={!!errors.confirmPassword}

                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value => 
                                    value === getValues("password") || "Passwords do not match",
                                
                            })}
                        />
                        <InputGroup.Suffix>
                            <button
                                type="button"
                                aria-label="Toggle confirm password visibility"
                                onClick={() => setShowConfirm(prev => !prev)}
                            >
                                {showConfirm ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    <FieldError>{errors.confirmPassword?.message}</FieldError>
                </TextField>

                <Button type="submit" variant="primary" isPending={isSubmitting} className="w-full">
                    Register
                </Button>

            </form>
        </Card>
    )
}
export default RegisterForm