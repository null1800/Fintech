"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react"; // 🟢 WhatsApp Icon

type Gadget = {
  id: number;
  name: string;
  price: string;
  defaultImage: string;
  images: string[];
  description: string;
  rating: number;
  colors: string[];
};

export const gadgets: Gadget[] = [
  {
    id: 1,
    name: "iPhone 11",
    price: "K8,500",
    defaultImage: "/images/pexels-asysin-9434648.jpg",
    images: [
      "/images/pexels-asysin-9434648.jpg",
      "/images/pexels-iphone11-black.jpg",
      "/images/pexels-iphone11-white.jpg",
    ],
    description:
      "Equipped with the A13 Bionic chip, 6.1-inch Liquid Retina HD display, and dual 12MP ultra-wide and wide cameras. Great performance and battery life.",
    rating: 4.5,
    colors: ["Black", "White"],
  },
  {
    id: 2,
    name: "iPhone 11 Pro Max",
    price: "K9,500",
    defaultImage: "/images/pexels-akshay-bineesh-105199960-10277582.jpg",
    images: [
      "/images/pexels-akshay-bineesh-105199960-10277582.jpg",
      "/images/pexels-iphone11pro-black.jpg",
      "/images/pexels-iphone11pro-white.jpg",
    ],
    description:
      "6.5-inch Super Retina XDR OLED display, A13 Bionic chip, and triple-camera system for pro-level photography and video recording.",
    rating: 4.6,
    colors: ["Black", "White"],
  },
  {
    id: 3,
    name: "iPhone 12",
    price: "K9,000",
    defaultImage: "/images/pexels-czapp-arpad-3647289-17077357.jpg",
    images: [
      "/images/pexels-czapp-arpad-3647289-17077357.jpg",
      "/images/pexels-iphone12-black.jpg",
      "/images/pexels-iphone12-white.jpg",
    ],
    description:
      "Sleek design with 6.1-inch Super Retina XDR display, A14 Bionic chip, 5G connectivity, and dual 12MP cameras. Lighter and faster than iPhone 11.",
    rating: 4.8,
    colors: ["Black", "White"],
  },
  {
    id: 4,
    name: "iPhone 12 Pro Max",
    price: "K13,500",
    defaultImage: "/images/pexels-efrem-efre-2786187-15916262.jpg",
    images: [
      "/images/pexels-efrem-efre-2786187-15916262.jpg",
      "/images/pexels-iphone12promax-black.jpg",
      "/images/pexels-iphone12promax-white.jpg",
    ],
    description:
      "6.7-inch Super Retina XDR display, A14 Bionic chip, LiDAR scanner, and triple 12MP Pro camera system with improved low-light performance.",
    rating: 4.4,
    colors: ["Black", "White"],
  },
  {
    id: 5,
    name: "iPhone 13",
    price: "K12,500",
    defaultImage: "/images/pexels-geometric-photography-186685971-11525158.jpg",
    images: [
      "/images/pexels-geometric-photography-186685971-11525158.jpg",
      "/images/pexels-iphone13-black.jpg",
      "/images/pexels-iphone13-white.jpg",
    ],
    description:
      "6.1-inch Super Retina XDR display, A15 Bionic chip, Cinematic mode for videos, and longer battery life. Dual 12MP advanced cameras.",
    rating: 4.3,
    colors: ["Black", "White"],
  },
  {
    id: 6,
    name: "iPhone 13 Pro Max",
    price: "K18,500",
    defaultImage: "/images/pexels-imthiyaz-syed-3018953-14665637.jpg",
    images: [
      "/images/pexels-imthiyaz-syed-3018953-14665637.jpg",
      "/images/pexels-iphone13promax-black.jpg",
      "/images/pexels-iphone13promax-white.jpg",
    ],
    description:
      "6.7-inch ProMotion display, A15 Bionic chip, triple-camera system with macro photography, and up to 1TB storage. Exceptional battery performance.",
    rating: 4.7,
    colors: ["Black", "White"],
  },
  {
    id: 7,
    name: "iPhone 14",
    price: "K15,500",
    defaultImage: "/images/pexels-japy-29020349.jpg",
    images: [
      "/images/pexels-japy-29020349.jpg",
      "/images/pexels-iphone14-black.jpg",
      "/images/pexels-iphone14-white.jpg",
    ],
    description:
      "6.1-inch OLED display, A15 Bionic chip, improved camera with Action mode and Photonic Engine, plus crash detection for enhanced safety.",
    rating: 4.5,
    colors: ["Black", "White"],
  },
  {
    id: 8,
    name: "iPhone 14 Pro Max",
    price: "K24,500",
    defaultImage: "/images/pexels-japy-29020349.jpg",
    images: [
      "/images/pexels-japy-29020349.jpg",
      "/images/pexels-iphone14promax-black.jpg",
      "/images/pexels-iphone14promax-white.jpg",
    ],
    description:
      "Flagship with 6.7-inch ProMotion display, A16 Bionic chip, Dynamic Island, Always-On display, and 48MP main camera for pro-grade photos and video.",
    rating: 4.5,
    colors: ["Black", "White"],
  },
];


// Seller's WhatsApp number (international format, no "+" or spaces)
const SELLER_PHONE = "260770584978";

// Gadget Card Component
const GadgetCard = ({ image, name, price, description, rating }: Gadget) => {
  const fallbackImage = "/images/placeholder.png";

  const whatsappLink = `https://wa.me/${SELLER_PHONE}?text=Hi,%20I'm%20interested%20in%20buying%20${encodeURIComponent(
    name
  )}%20for%20${encodeURIComponent(price)}.`; // Message template

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform duration-300"
    >
      <div className="relative w-full h-48" role="img" aria-label={name}>
        <Image
          src={image && image.trim() !== "" ? image : fallbackImage}
          alt={name || "Product image"}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {price}
        </span>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        {description && (
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        )}
        {rating && (
          <p className="text-yellow-400 mt-2">
            {"★".repeat(Math.floor(rating))}
            {rating % 1 !== 0 ? "½" : ""} ({rating})
          </p>
        )}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buy ${name} on WhatsApp`}
          className="mt-4 inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-green-700 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Buy</span>
        </a>
      </div>
    </motion.div>
  );
};

//  Gadgets Section with ID for smooth navigation
const GadgetShowcase = () => {
  return (
    <section id="gadgets" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
          Explore Our Latest Gadgets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {gadgets.map((gadget) => (
            <GadgetCard key={gadget.id} {...gadget} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GadgetShowcase;
