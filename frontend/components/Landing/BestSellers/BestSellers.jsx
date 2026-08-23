"use client";

import "./BestSellers.scss";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProductCard from "../../Common/ProductCard";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    productId: 1,
    title: "Rubber lounge armchair",

    images: [
      "/Pro1.avif",
      "/Pro1-hover.avif",
    ],

    sellingPrice: 35.0,
    comparePrice: 59.0,

    variants: [
      {
        variantId: 1,
      },
    ],
  },

  {
    productId: 2,
    title: "Nova Edge Sofa",

    images: [
      "/Pro2.avif",
      "/Pro2-hover.avif",
    ],

    sellingPrice: 76.5,
    comparePrice: 99.0,

    variants: [
      {
        variantId: 2,
      },
    ],
  },

  {
    productId: 3,
    title: "Lumen Arc Coffee Table",

    images: [
      "/Pro3.avif",
      "/Pro3-hover.avif",
    ],

    sellingPrice: 70.8,
    comparePrice: 120.0,

    variants: [
      {
        variantId: 3,
      },
    ],
  },

  {
    productId: 4,
    title: "Woodpeak Dining Set",

    images: [
      "/Pro4.avif",
      "/Pro4-hover.avif",
    ],

    sellingPrice: 73.42,
    comparePrice: 97.0,

    variants: [
      {
        variantId: 4,
      },
    ],
  },
];

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function BestSellers() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop
    mm.add("(min-width: 993px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });

    // Mobile / Tablet
    mm.add("(max-width: 992px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className="bs"
      ref={sectionRef}
    >

      {/* ===========================
            Header
      =========================== */}

      <div className="bs__header">

        <motion.h2
          className="bs__title"
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          Hand-picked items
        </motion.h2>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
            <motion.div
          href="/products"
          className="bs__viewAll"
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          View All
        </motion.div>
        </motion.div>

      </div>

      {/* ===========================
            Products
      =========================== */}

      <motion.div
        className="bs__grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.12,
        }}
      >

        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}

      </motion.div>

    </section>
  );
}