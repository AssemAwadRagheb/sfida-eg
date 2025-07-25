"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { SocialMedia } from "../footer/socialMedia";

const HeroHome = () => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Start animations
    controls.start("visible");
    
    return () => window.removeEventListener("resize", handleResize);
  }, [controls]);

  // Weight loss animation variants
  const weightLossAnim = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "backOut"
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Text animation
  const textAnim = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Animated Weight Scale */}
      <motion.div
        className="absolute right-10 top-1/4 z-0"
        variants={weightLossAnim}
        initial="hidden"
        animate="pulse"
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#2f67e8" strokeWidth="1.5">
          <path d="M12 22a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5zM12 2v2M5 10h14M3 4l18 4" />
        </svg>
      </motion.div>

      {/* Animated Running Figure */}
      <motion.div
        className="absolute left-10 bottom-1/4 z-0"
        animate={{
          x: [0, 50, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#3a75ff" strokeWidth="1.5">
          <path d="M12 10l-3 6m6-6l-3 6m3-6h6m-9 0H6" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Title with animation */}
          <motion.div variants={textAnim} className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#2f67e8]">
              <span className="block">سفيدا- Sfida</span>
            </h1>
          </motion.div>

          {/* Description with animation */}
          <motion.div variants={textAnim} className="mb-12">
            <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
              <span className="block mb-3 font-medium">مستحضرات التجميل والعناية الشخصية وفقدان الوزن</span>
              <span className="block text-gray-500">Cosmetics, personal care and weight losss</span>
            </p>
          </motion.div>

          {/* Animated Button */}
          <motion.div
            variants={{
              hidden: { scale: 0.9, opacity: 0 },
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.4
                }
              }
            }}
          >
    <motion.a
  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
  className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-[#2f67e8] to-[#3a75ff] text-white font-medium rounded-full hover:shadow-xl transition-all duration-300 cursor-pointer"
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 8px 20px rgba(47, 103, 232, 0.3)"
  }}
  whileTap={{ scale: 0.95 }}
>
  <motion.span
    animate={{
      x: [0, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    className="mr-2"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </motion.span>
  تواصل معنا
</motion.a>

          </motion.div>
        </motion.div>
      </div>

      {/* Animated Waves Bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-20"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#2f67e8" opacity="0.1"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#2f67e8" opacity="0.2"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroHome;