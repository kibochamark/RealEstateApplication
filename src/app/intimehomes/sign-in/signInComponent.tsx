"use client"
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { signIn, SignInOptions } from "next-auth/react"
import { ArrowLeftIcon, EyeClosedIcon, EyeIcon, Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const SignInComponent = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const [isPassword, setIsPassword] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required("Email is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit(values, formikHelpers) {

            loginmutation.mutateAsync(values)
        },
    })





    const loginmutation = useMutation({
        mutationFn: async (values: { email: string; password: string; }) => {
            const options: SignInOptions = {
                redirect: false,
                email: values.email,
                password: values.password,
            };

            return await signIn('credentials', options)
        },
        onSuccess(data, variables, context) {
            console.log(data, "data")
            if (data && data.error) {
                toast.error("Invalid credentials")


            } else {

                toast.success("Welcome back")
                window.location.href = "/intime-admin"

            }
            // router.push(callbackUrl ?? '/intime-admin');



        },
        onError(error, variables, context) {
            // console.log(error)
            toast.error(error.message)
        },
    })

    const handlePassWord = () => {
        setIsPassword(!isPassword)
    }

    return (
        <>
            <div className='absolute top-4 left-4'>
                <Button className='border border-secondary300 bg-white text-primary300 hover:bg-white flex items-center justify-start gap-2' onClick={() => window.location.href = "/"
                }>
                    <ArrowLeftIcon className='w-4 h-4' />
                    Back home</Button>
            </div>
            <form action="" className="mt-20 lg:mt-10 w-full lg:w-3/4" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2 col-span-1 mb-4">
                        <label htmlFor="" className="block mb-2 text-md font-semibold text-secondary400 dark:text-white">Your Email</label>
                        <input type="email" id="email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className=" border-2 h-12 border-primary50   text-gray-900 text-md tracking-wide rounded-lg focus:ring-primary500 focus:border-primary500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary500 dark:focus:border-primary500" placeholder="Johndoe@mail.com" required />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-red-500">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="grid gap-2 col-span-1 mb-4">
                        <label htmlFor="" className="block mb-2 text-md font-semibold text-secondary400 dark:text-white">Your password</label>
                        <div className='relative'>
                            <input type={isPassword ? "password" :"text"} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} id="" className=" relative border-2 h-12 border-primary50   text-gray-900 text-xl tracking-wide rounded-lg focus:ring-primary500 focus:border-primary500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary500 dark:focus:border-primary500" placeholder="xxxxxx" required />
                            {
                                isPassword ? <EyeIcon onClick={handlePassWord} className='absolute top-4  h-4 w-4 text-primary400 right-2 cursor-pointer transition-all duration-300' /> : <EyeClosedIcon onClick={handlePassWord} className='absolute top-4  h-4 w-4 text-primary400 right-2 cursor-pointer transition-all duration-300' />
                            }
                        </div>



                        {formik.errors.password && formik.touched.password && (
                            <div className="text-red-500">{formik.errors.password}</div>
                        )}

                    </div>

                    <div>
                        <Button type='submit' className="w-full bg-secondary300  hover:bg-secondary100 h-10 hover:text-black disabled:bg-secondary100" disabled={loginmutation.isPending}>
                            {loginmutation.isPending ? <Loader className='animate animate-spin text-primary500' /> : "Sign In"}
                        </Button>
                    </div>

                </div>
            </form>

        </>
    )
}

export default SignInComponent