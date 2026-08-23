"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "iconsax-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

import "./Insta.scss";

const POSTS = [
  {
    id: 1,
    image: "/insta1.webp",
    rotate: "-12deg",
    className: "left",
  },
  {
    id: 2,
    image: "/insta2.avif",
    rotate: "0deg",
    className: "center",
  },
  {
    id: 3,
    image: "/insta3.avif",
    rotate: "12deg",
    className: "right",
  },
];

export default function InstagramFeed() {
  const galleryRef = useRef(null);
  const parallaxRefs = useRef([]);

  useLayoutEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      parallaxRefs.current.forEach((el, index) => {
        if (!el) return;
        
        // Slightly different parallax speeds based on index
        const yOffset = index === 1 ? "15%" : "10%";
        
        gsap.fromTo(
          el,
          { y: `-${yOffset}` },
          {
            y: yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="instagramFeed">

      <div className="instagramFeed__top">

        <div className="instagramFeed__line" />

        <span className="instagramFeed__eyebrow">
          ○ Instagram feed
        </span>

      </div>

      <motion.h2
        className="instagramFeed__title"
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: .6,
        }}
      >
        @Ecomuz
      </motion.h2>

      <div className="instagramFeed__gallery" ref={galleryRef}>

        {POSTS.map((post, index) => (

          <motion.div
            key={post.id}
            className={`instagramCard ${post.className}`}
            initial={{
              opacity: 0,
              y: 80,
              rotate: post.rotate,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: post.rotate,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .7,
              delay: index * .15,
            }}
          >

            <div className="instagramCard__image">
              <div 
                ref={(el) => (parallaxRefs.current[index] = el)}
                style={{
                  position: "absolute",
                  top: "-15%",
                  left: 0,
                  width: "100%",
                  height: "130%",
                }}
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  quality={100}
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
            </div>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="instagramCard__badge"
            >

              <Instagram
                size={20}
                color="#111"
                variant="Linear"
              />

            </Link>

          </motion.div>

        ))}

              </div>

    </section>
  );
}