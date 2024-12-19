"use client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompanies } from "@/actions/company";

export default function Footer() {
    const path = usePathname();
    const [details, setDetails] = useState<any[]>([]);


    useEffect(() => {
        const fetchDetails = async () => {
            const fetchedDetails = await getCompanies();
            setDetails(fetchedDetails ?? []); // Update state with fetched data
        };
        fetchDetails();
    }, []);

    if (path.includes("intime-admin") || path.startsWith("/intimehomes")) {
        return null;
    }

    return (
        <footer className="w-full bg-secondary600">
            <div className="container mx-auto px-4">
                <div className="flex justify-end py-4">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-white hover:text-secondary700 flex items-center"
                    >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Back to top
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-b border-secondary500">
                    <div>
                        <Image
                            src="/9.jpg"
                            alt="InTimeHomes Logo"
                            width={200}
                            height={60}
                            className="mb-4"
                        />
                        <p className="text-sm text-white mb-4">
                            InTimeHomes is a real estate company that sells and rents properties,
                            providing exceptional service to our clients.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <nav>
                            <ul className="space-y-2">
                                <li><Link href="/listing?limit=200&page=0" className="text-white hover:text-gray-900">Properties</Link></li>
                                <li><Link href="/blogs" className="text-white hover:text-gray-900">Blogs</Link></li>
                                <li><Link href="/about" className="text-white hover:text-gray-900">About Us</Link></li>
                                <li><Link href="/contact" className="text-white hover:text-gray-900">Contact Us</Link></li>
                            </ul>
                        </nav>
                        <nav>
                            <ul className="space-y-2">
                                <li><Link href="/intimehomes/sign-in" className="text-white hover:text-gray-900">Admin panel</Link></li>

                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center py-4">
                    <p className="text-sm text-white">
                        © {new Date().getFullYear()} InTimeHomes. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-sm text-white hover:text-gray-900">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-white hover:text-gray-900">Do Not Sell or Share My Info</Link>
                        {/* <Link href="https://example.com" className="text-sm text-white hover:text-gray-900">Site by Example</Link> */}
                    </div>
                </div>

                <div className="flex justify-center space-x-4 py-4">
                    <Link href="https://twitter.com" className="text-balck hover:text-white">
                        <Twitter className="h-6 w-6" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="https://instagram.com" className="text-balck hover:text-white">
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="https://facebook.com" className="text-balck hover:text-white">
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="https://youtube.com" className="text-balck hover:text-white">
                        <Youtube className="h-6 w-6" />
                        <span className="sr-only">YouTube</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

