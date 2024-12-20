import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { ActivityLogIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { Suspense } from "react"

export const dynamic = "force-dynamic"


const page = () => {
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

                                    <form action="" className="mt-20 lg:mt-10 w-full lg:w-3/4">
                                        <div className="flex flex-col gap-4">
                                            <div className="grid gap-2 col-span-1 mb-4">
                                                <label htmlFor="first_name" className="block mb-2 text-md font-semibold text-secondary400 dark:text-white">Your Email</label>
                                                <input type="email" id="first_name" className=" border-2 h-12 border-primary50   text-gray-900 text-md tracking-wide rounded-lg focus:ring-primary500 focus:border-primary500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary500 dark:focus:border-primary500" placeholder="Johndoe@mail.com" required />
                                            </div>

                                            <div>
                                                <Button className="w-full bg-secondary300  hover:bg-secondary100 h-10 hover:text-black">Request Access</Button>
                                            </div>

                                        </div>
                                    </form>
                                    <div className="text-start mt-4">
                                        <p>already  have an account? {' '} <span className="text-primary400 font-bold cursor-pointer">Sign in</span></p>
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