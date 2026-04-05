"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Gadget {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  colors?: { name: string; image: string }[];
}

const gadgets: Gadget[] = [
  {
    id: 1,
    name: "Iphone 11",
    price: "K8,500",
    image: "/images/pexels-asysin-9434648.jpg",
    description: "Powerful processor, 128GB storage, sleek design.",
    rating: 4.5,
    colors: [
      { name: "Black", image: "/images/iphone11-black.jpg" },
      { name: "White", image: "/images/iphone11-white.jpg" },
    ],
  },
  {
    id: 2,
    name: "Iphone 12 Pro Max",
    price: "K13,500",
    image: "/images/pexels-efrem-efre-2786187-15916262.jpg",
    description: "256GB storage, powerful performance, stunning display.",
    rating: 4.8,
    colors: [
      { name: "Silver", image: "/images/iphone12-silver.jpg" },

    ],
  },
  {
    id: 3,
    name: "Iphone 13 Pro Max",
    price: "K18,500",
    image: "/images/pexels-imthiyaz-syed-3018953-14665637.jpg",
    description: "256GB storage, cinematic mode, long-lasting battery.",
    rating: 4.7,
    colors: [
      { name: "Graphite", image: "/images/iphone13-graphite.jpg" },
      { name: "Silver", image: "/images/iphone13-silver.jpg" },
    ],
  },
  {
    id: 4,
    name: "Iphone 14 Pro Max",
    price: "K24,500",
    image: "/images/pexels-japy-29020349.jpg",
    description: "Powerful performance, 512GB storage, advanced cameras.",
    rating: 4.9,
    colors: [
      { name: "Silver", image: "/images/iphone14-silver.jpg" },
      { name: "Graphite", image: "/images/iphone14-gold.jpg" },
    ],
  },
  {
    id: 5,
    name: "Iphone 14 Pro Max",
    price: "K24,500",
    image: "/images/pexels-japy-29020349.jpg",
    description: "Powerful performance, 512GB storage, advanced cameras.",
    rating: 4.9,
    colors: [
      { name: "Silver", image: "/images/iphone14-silver.jpg" },
      { name: "Graphite", image: "/images/iphone14-gold.jpg" },
    ],
  },
  {
    id: 6,
    name: "Iphone 14 Pro Max",
    price: "K24,500",
    image: "/images/pexels-japy-29020349.jpg",
    description: "Powerful performance, 512GB storage, advanced cameras.",
    rating: 4.9,
    colors: [

      { name: "Silver", image: "/images/iphone14-silver.jpg" },
      { name: "Graphite", image: "/images/iphone14-gold.jpg" },
    ],
  },
  {
    id: 7,
    name: "Iphone 14 Pro Max",
    price: "K24,500",
    image: "/images/pexels-japy-29020349.jpg",
    description: "Powerful performance, 512GB storage, advanced cameras.",
    rating: 4.9,
    colors: [
      { name: "Silver", image: "/images/iphone14-silver.jpg" },
      { name: "Graphite", image: "/images/iphone14-graphite.jpg" },
    ],
  },
  {
    id: 8,
    name: "Iphone 14 Pro Max",
    price: "K24,500",
    image: "/images/pexels-japy-29020349.jpg",
    description: "Powerful performance, 512GB storage, advanced cameras.",
    rating: 4.9,
    colors: [
      { name: "Graphite", image: "/images/iphone14-graphite.jpg" },
      { name: "Silver", image: "/images/iphone14-silver.jpg" },
    ],
  },
];

export default function ProductSlider() {
  const [selectedColor, setSelectedColor] = useState<{ [key: number]: string }>(
    {}
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount =
        direction === "left" ? -sliderRef.current.offsetWidth : sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-6 bg-white">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Scrollable Product Cards */}
      <motion.div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory cursor-grab"
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
      >
        {gadgets.map((gadget) => {
          const colorImage =
            gadget.colors?.find((c) => c.name === selectedColor[gadget.id])?.image || gadget.image;

          return (
            <motion.div
              key={gadget.id}
              className="min-w-[300px] md:min-w-[350px] flex-shrink-0 bg-white rounded-2xl shadow-lg border border-gray-100 snap-center hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={colorImage}
                alt={gadget.name}
                className="w-full h-60 object-cover rounded-t-2xl"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-gray-800">{gadget.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{gadget.description}</p>
                <p className="text-blue-600 font-semibold text-lg mt-2">{gadget.price}</p>

                {/* ✅ Color Selector */}
                {gadget.colors && (
                  <div className="flex justify-center gap-2 mt-3">
                    {gadget.colors.map((color) => (
                      <motion.button
                        key={color.name}
                        onClick={() =>
                          setSelectedColor((prev) => ({
                            ...prev,
                            [gadget.id]:
                              prev[gadget.id] === color.name ? "" : color.name,
                          }))
                        }
                        className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                          selectedColor[gadget.id] === color.name
                            ? "bg-blue-500 text-white border-blue-600 shadow"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {color.name}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* ✅ Order Button */}
                <motion.button
                  onClick={() =>
                    window.open(
                      `https://wa.me/260970386848?text=${encodeURIComponent(
                        `Hi, I'm interested in the ${gadget.name}${
                          selectedColor[gadget.id]
                            ? ` (${selectedColor[gadget.id]})`
                            : ""
                        } priced at ${gadget.price}.`
                      )}`,
                      "_blank"
                    )
                  }
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-transparent text-blue-500 font-bold py-2 rounded-xl 
                             border-2 border-blue-400 transition-all duration-300 shadow-sm"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{
                    scale: 0.95,
                    backgroundColor: "#3B82F6",
                    color: "#FFFFFF",
                    borderColor: "#3B82F6",
                  }}
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span>ORDER NOW</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
