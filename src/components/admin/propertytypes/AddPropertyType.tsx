import { createfeature } from '@/actions/feature'
import { createpropertytype } from '@/actions/propertytype'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Ellipsis } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import * as Yup from "yup"

const AddPropertyType = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
          
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
          
        }),
        onSubmit(values, formikHelpers) {

            mutation.mutateAsync({ ...values })

        },
    })

    // mutation to handle feature submission
    const mutation = useMutation({
        mutationFn: async (values: { name: string }) => {

            const res = await createpropertytype(values)

            return res
        },
        onSuccess(data: any, variables, context) {
            if (data[1] == 201) {
                toast.success("Property type added successfully")
            } else {
                toast.error("Something went wrong!")
            }
        },
        onError(error, variables, context) {
            toast.error(error.message)
        },
    })
    return (
        <div className='w-full flex flex-col'>
            <form action="" className='grid grid-cols-1 gap-2' onSubmit={formik.handleSubmit}>
                <div className='my-2'>
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Property type name</label>
                    <input type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='name'
                        defaultValue={formik.values.name}

                        id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300" placeholder="eg  Gym" required />
                    {formik.errors.name && formik.touched.name && <div className="text-red-500">{formik.errors.name}</div>}
                </div>
                

                <Button type="submit" disabled={mutation.isPending} className={`w-full bg-primary300 hover:bg-secondary300 disabled:bg-black  focus:bg-secondary300 text-white rounded-none`}>
                    {mutation.isPending ? <Ellipsis className="animate animate-pulse" /> : "create property type"}
                </Button>

            </form>
        </div>
    )
}

export default AddPropertyType