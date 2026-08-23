"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProductCard from "../../Common/ProductCard";

import "./Collection.scss";

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    collectionId: 1,
    title: "Picky",
    image: "/collection-main.avif",

    products: [
      {
        productId: 101,
        title: "Woodaxis Office Chair",
        images: [
          "/Pro10.avif",
          "/Pro10-hover.avif",
        ],
        sellingPrice: "35.0 USD",
        comparePrice: "59.0 USD",
        variants: [{ variantId: 101 }],
      },
      {
        productId: 102,
        title: "Urban Oak Side Chair",
        images: [
          "/Pro5.avif",
          "/Pro5-hover.avif",
        ],
        sellingPrice: "76.5 USD",
        comparePrice: "99.0 USD",
        variants: [{ variantId: 102 }],
      },
      {
        productId: 103,
        title: "Oakline Dining Chair",
        images: [
          "/Pro8.avif",
          "/Pro8-hover.avif",
        ],
        sellingPrice: "45.0 USD",
        comparePrice: "68.0 USD",
        variants: [{ variantId: 201 }],
       
      },
      {
        productId: 104,
        title: "Heritage Craft Dresser",
        images: [
          "/Pro7.webp",
          "/Pro7-hover.avif",
        ],
        sellingPrice: "73.42 USD",
        comparePrice: "97.0 USD",
        variants: [{ variantId: 104 }],
      },
    ],
  },

  {
    collectionId: 2,
    title: "Trendy",
    image: "/Collection-main.avif",

    products: [
      {
        productId: 201,
         title: "Woodspire King Bed",
        images: [
          "/Pro6.avif",
          "/Pro6-hover.webp",
        ],
        sellingPrice: "70.8 USD",
        comparePrice: "120.0 USD",
        variants: [{ variantId: 103 }],
    },
      {
        productId: 202,
        title: "Forma Dining Table",
        images: [
          "/Pro6.avif",
          "/Pro6-hover.webp",
        ],
        sellingPrice: 120.0,
        comparePrice: 159.0,
        variants: [{ variantId: 202 }],
      },
      {
        productId: 203,
        title: "Milo Dining Chair",
        images: [
          "/Pro7.avif",
          "/Pro7-hover.avif",
        ],
        sellingPrice: 52.5,
        comparePrice: 75.0,
        variants: [{ variantId: 203 }],
      },
      {
        productId: 204,
        title: "Arden Dining Set",
        images: [
          "/Pro8.avif",
          "/Pro8-hover.avif",
        ],
        sellingPrice: 145.0,
        comparePrice: 189.0,
        variants: [{ variantId: 204 }],
      },
    ],
  },

  {
    collectionId: 3,
    title: "Bedroom",
    image: "/Collection3.avif",

    products: [
      {
        productId: 301,
        title: "Luna Bedside Table",
        images: [
          "/Pro9.avif",
          "/Pro9-hover.avif",
        ],
        sellingPrice: 48.0,
        comparePrice: 69.0,
        variants: [{ variantId: 301 }],
      },
      {
        productId: 302,
        title: "Haven Platform Bed",
        images: [
          "/Pro10.avif",
          "/Pro10-hover.avif",
        ],
        sellingPrice: 180.0,
        comparePrice: 240.0,
        variants: [{ variantId: 302 }],
      },
      {
        productId: 303,
        title: "Mira Lounge Chair",
        images: [
          "/Pro11.avif",
          "/Pro11-hover.avif",
        ],
        sellingPrice: 82.0,
        comparePrice: 110.0,
        variants: [{ variantId: 303 }],
      },
      {
        productId: 304,
        title: "Calmwood Nightstand",
        images: [
          "/Pro12.avif",
          "/Pro12-hover.avif",
        ],
        sellingPrice: 58.0,
        comparePrice: 79.0,
        variants: [{ variantId: 304 }],
      },
    ],
  },
];

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Collection() {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  const [activeCollectionId, setActiveCollectionId] =
    useState(COLLECTIONS[0].collectionId);

  const activeCollection = COLLECTIONS.find(
    (collection) =>
      collection.collectionId === activeCollectionId
  );

  const activeProducts =
    activeCollection?.products || [];

  useLayoutEffect(() => {
    if (!containerRef.current || !parallaxRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        {
          y: "-15%",
        },
        {
          y: "15%",
          ease: "none",

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="collection">

      {/* Top Header */}

      <div className="collection__top">

        <span className="collection__eyebrow">
          ○ Trendy collection
        </span>

        <Link
          href="/collections"
          className="collection__allBtn"
        >
          All Products
        </Link>

      </div>

      {/* Tabs */}

      <div className="collection__tabs">

        {COLLECTIONS.map((col) => (
          <button
            key={col.collectionId}
            className={
              activeCollectionId === col.collectionId
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCollectionId(
                col.collectionId
              )
            }
          >
            {col.title}
          </button>
        ))}

      </div>

      {/* Main Layout */}

      <div className="collection__layout">

        {/* Left Main Image */}

        <div
          className="collection__mainImage"
          ref={containerRef}
        >
          <div
            ref={parallaxRef}
            style={{
              position: "absolute",
              top: "-15%",
              left: 0,
              width: "100%",
              height: "130%",
            }}
          >

            <AnimatePresence mode="wait">

              <motion.div
                key={activeCollection?.collectionId}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              >

                <Image
                  src={activeCollection.image}
                  alt={
                    activeCollection.title
                  }
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  priority
                />

              </motion.div>

            </AnimatePresence>

          </div>
        </div>

        {/* Right 2x2 Grid */}

        <div className="collection__grid">

          <AnimatePresence mode="popLayout">

            {activeProducts.map(
              (product) => (
                <motion.div
                  key={product.productId}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  layout
                >

                  <ProductCard
                    product={product}
                  />

                </motion.div>
              )
            )}

          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}