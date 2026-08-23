"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Add } from "iconsax-react";
// import { useCartStore } from "@/store/cartStore";

import "./ProductCard.scss";

const MotionLink = motion.create(Link);

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

const ProductCard = ({ product }) => {
//   const { addToCart, openCart } = useCartStore();

  const primaryImage = product.images?.[0];
  const secondaryImage =
    product.images?.[1] ?? product.images?.[0];

  const hasDiscount =
    product.comparePrice &&
    product.comparePrice > product.sellingPrice;

  return (
    <MotionLink
      href={`/p/${product.productId}`}
      variants={item}
      className="furn-product-card"
    >
      <div className="furn-product-card__media">

        {/* Main Image */}
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          className="furn-product-card__image furn-product-card__image--primary"
          sizes="(max-width:768px) 100vw, 25vw"
        />

        {/* Hover Image */}
        <Image
          src={secondaryImage}
          alt={product.title}
          fill
          className="furn-product-card__image furn-product-card__image--secondary"
          sizes="(max-width:768px) 100vw, 25vw"
        />

        {/* Add Button */}
        <button
          className="furn-product-card__addButton"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const defaultVariant =
              product.variants?.[0]?.variantId;

            addToCart(
              product.productId,
              1,
              defaultVariant
            );

            openCart();
          }}
        >
          <Add
            size="22"
            color="#fff"
            variant="Linear"
          />
        </button>

      </div>

      {/* Product Information */}
      <div className="furn-product-card__content">

        <h3 className="furn-product-card__name">
          {product.title}
        </h3>

        <div className="furn-product-card__priceRow">

          <span className="furn-product-card__price">
            {product.sellingPrice.toFixed(2)} USD
          </span>

          {hasDiscount && (
            <span className="furn-product-card__comparePrice">
              {product.comparePrice.toFixed(2)} USD
            </span>
          )}

        </div>

      </div>
    </MotionLink>
  );
};

export default ProductCard;