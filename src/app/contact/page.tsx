"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage() {
    const [countryCode, setCountryCode] = useState("+1")

    return (
        <div className="flex flex-row relative w-full items-center justify-center min-h-screen  p-6"

        >
            <div className="flex-1 space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627917975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611810190846!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="md:space-y-6 space-y-4 mt-4">
                    <div className="flex items-center">
                        <MapPin className="mr-2 text-secondary300" />
                        <span className="text-white">123 Real Estate Ave, Melbourne, VIC</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="mr-2 text-secondary300" />
                        <span className="text-white">+1 234 567 890</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="mr-2 text-secondary300 " />
                        <span className="text-white">contact@intimehomes.com</span>
                    </div>
                </div>
            </div>
            <form className="flex-1 space-y-6">
                <Input placeholder="Name" className="placeholder:text-secondary300 text-white" required />
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-24 placeholder:text-secondary300 text-white">
                            <SelectValue placeholder="Code" className="text-secondary300" />
                        </SelectTrigger>
                        <SelectContent className="text-secondary300">
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                            <SelectItem value="+61">+61</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input placeholder="Phone Number" className="placeholder:text-secondary300 text-white" required />
                </div>
                <Input type="email" placeholder="Email" className="placeholder:text-secondary300 text-white" required />
                <Textarea placeholder="Message" className="placeholder:text-secondary300 text-white" required />
                <Button type="submit" className="w-full bg-primary300 text-white hover:bg-primary400">
                    Submit
                </Button>
            </form>

        </div>
    )
}

