"use client";

import { motion } from "framer-motion";
import {
  TruckFast,
  BoxTick,
  Headphone,
  Location,
} from "iconsax-react";

import "./Feature.scss";

const FEATURES = [
  {
    icon: TruckFast,
    title: "Free shipping",
    desc: "Fast and free shipping on every order that you make today.",
  },
  {
    icon: BoxTick,
    title: "Best quality items",
    desc: "We stock only the finest items that you will always trust.",
  },
  {
    icon: Headphone,
    title: "24/7 support",
    desc: "Our friendly team is always here to help you, at any time.",
  },
  {
    icon: Location,
    title: "Order tracking",
    desc: "Track every order in real time, from checkout to delivery.",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="features__top">

        <span className="features__eyebrow">
          ○ One & only trusted point
        </span>

        <button className="features__button">
          Shop Now
        </button>

      </div>

      <motion.h2
        className="features__heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Why choose us?
      </motion.h2>

      <div className="features__grid">

        {FEATURES.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.title}
              className="featureCard"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
            >
              <h3>{item.title}</h3>

              <div className="featureCard__icon">
                <Icon
                  size={70}
                  color="#111"
                  variant="Linear"
                />
              </div>

              <p>{item.desc}</p>
            </motion.article>
          );
        })}

      </div>
    </section>
  );
}