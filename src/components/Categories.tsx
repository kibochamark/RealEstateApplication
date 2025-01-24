"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid } from "./ui/layout-grid";

export function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      ref={ref}
      className="h-screen py-20 w-full"
    >
      <LayoutGrid cards={cards} />
    </motion.div>
  );
}

const SkeletonVillasTownhouses = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Villas / Townhouses</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Experience luxury living in our beautifully designed villas and townhouses. Perfect for families, these homes
      offer space, comfort, and elegance in prime locations.
    </p>
  </div>
);

const SkeletonApartmentsStudios = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Apartments / Studios</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Stylish and modern, our apartments and studios are ideal for urban living. Perfect for singles and small families,
      offering convenience and great amenities.
    </p>
  </div>
);

const SkeletonBungalows = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Bungalows</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Discover the charm of single-story living in our cozy and elegant bungalows. These homes provide easy accessibility
      and beautiful outdoor spaces for a peaceful lifestyle.
    </p>
  </div>
);

const SkeletonOfficeSpaces = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Office Spaces</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Find the perfect workspace for your business in our premium office spaces. Designed for productivity and comfort,
      they are located in vibrant business hubs.
    </p>
  </div>
);

const cards = [
  {
    id: 1,
    content: <SkeletonVillasTownhouses />,
    className: "md:col-span-2",
    thumbnail: "/villa.jpg",
  },
  {
    id: 2,
    content: <SkeletonApartmentsStudios />,
    className: "col-span-1",
    thumbnail: "/Apartment2.jpg",
  },
  {
    id: 3,
    content: <SkeletonBungalows />,
    className: "col-span-1",
    thumbnail: "/bungalow.jpg",
  },
  {
    id: 4,
    content: <SkeletonOfficeSpaces />,
    className: "md:col-span-2",
    thumbnail: "/office.jpg",
  },
];


