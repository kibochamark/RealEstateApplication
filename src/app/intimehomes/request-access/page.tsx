import { postAccess } from "@/actions/Access"
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { ActivityLogIcon } from "@radix-ui/react-icons"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import toast from "react-hot-toast"
import RequestComponent from "./RequestComponent"

export const dynamic = "force-dynamic"


const page = async () => {

    async function createrequest(formData: FormData) {
        'use server'

        const rawFormData = {
            email: formData.get('email'),
        }

        const res = await postAccess(rawFormData.email as string)

        if (res[1] == 201) {
            revalidatePath("/intimehomes/request-access")
        }


        // mutate data
        // revalidate cache
    }
    return (
        <Suspense >
            <div className="h-screen w-full flex flex-col gap-6">

                <div className="overflow-hidden h-full">

                    <div className="p-0 grid md:grid-cols-2 h-full">

                        <div className="bg-white z-50 p-4  lg:-mr-10 shadow-lg  lg:rounded-r-3xl  col-span-1">
                            <div className="lg:container px-4 mx-auto space-y-4 w-full flex flex-col items-center lg:items-start justify-center lg:justify-start h-full">

                                <div className="flex  flex-col justify-center gap-6  w-full items-center mt-16">
                                    <ActivityLogIcon className="w-[90px] h-[90px] text-start lg:text-left" />
                                    <p className="text-3xl font-extrabold text-balance text-transparent  bg-clip-text bg-gradient-to-tr from-secondary300 to-primary300">Intime Homes</p>
                                    <div className="w-20 bg-secondary400 h-1" />
                                    <p className="text-md italic   tracking-tight leading-tight text-balance  text-transparent font-bold bg-clip-text bg-gradient-to-tr from-primary300 via-primary500 to-secondary400">The better way to buy real estate</p>
                                </div>

                                <div className="flex flex-col  items-center justify-center  w-full">
                                    <RequestComponent />
                                    <div className="text-start mt-4">
                                        <p>already  have an account? {' '} <Link href={"/intimehomes/sign-in"} className="text-primary400 font-bold cursor-pointer">Sign in</Link></p>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="relative col-span-1 hidden  bg-muted md:block">
                            <img
                                src="/10.jpg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </div>
                </div>


            </div>
        </Suspense>
    )
}


export default page