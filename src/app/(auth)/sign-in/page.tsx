import { signIn } from "@/auth"


const page = () => {
    return (
        <form
        className="w-full h-full bg-red-300"
            action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }}
        >
            <label>
                Email
                <input name="email" type="email" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    )
}


export default page