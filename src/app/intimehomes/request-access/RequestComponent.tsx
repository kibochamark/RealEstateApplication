"use client"
import { postAccess } from '@/actions/Access'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Loader } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import * as Yup from "yup"

const RequestComponent = () => {
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required("Email is a required input")
        }),
        onSubmit(values, formikHelpers) {
            mutation.mutate(values)
        },
    })
    const mutation = useMutation({
        mutationFn: async (values: { email: string }) => {
            const email = values.email
            const res = await postAccess(email as string)
            return res
        },
        onSuccess(data, variables, context) {
            if (data[1] == 201) {
                toast.success("We will get back to you as soon as we can")
                formik.resetForm()
            } else {
                toast.error("something went wrong")
            }
        },
    })
    return (
        <form onSubmit={formik.handleSubmit} className="mt-20 lg:mt-10 w-full lg:w-3/4">
            <div className="flex flex-col gap-4">
                <div className="grid gap-2 col-span-1 mb-4">
                    <label htmlFor="email" className="block mb-2 text-md font-semibold text-secondary400 dark:text-white">Your Email</label>
                    <input type="email" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className=" border-2 h-12 border-primary50   text-gray-900 text-md tracking-wide rounded-lg focus:ring-primary500 focus:border-primary500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary500 dark:focus:border-primary500" placeholder="Johndoe@mail.com" required />
                    {formik.errors.email && formik.touched.email && (
                        <div className="text-red-500">{formik.errors.email}</div>
                    )}
                </div>

                <div>
                    <Button type="submit" disabled={mutation.isPending} className="w-full disabled:bg-secondary100 bg-secondary300  hover:bg-secondary100 h-10 hover:text-black">
                        {mutation.isPending ? <Loader className='animate animate-spin text-primary400 text-center' /> : "Request Access"}
                    </Button>
                </div>

            </div>
        </form>
    )
}

export default RequestComponent