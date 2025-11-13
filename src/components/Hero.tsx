import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AudioPlayer from "./AudioPlayer";

const Hero = () => {
  const weddingDate = new Date(2025, 10, 23, 11, 0, 0); // November 23, 2025 at 11:00 AM
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    // Use requestAnimationFrame for better mobile performance
    const handleResizeThrottled = () => {
      requestAnimationFrame(handleResize);
    };
    handleResize();
    window.addEventListener('resize', handleResizeThrottled);
    return () => window.removeEventListener('resize', handleResizeThrottled);
  }, []);

  const hearts = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <picture className="absolute inset-0">
        {/* Large screens */}
        <source media="(min-width: 1024px)" srcSet="/hero-section.jpeg" />
        {/* Medium screens */}
        <source media="(min-width: 768px)" srcSet="/hero-section.jpeg" />
        {/* Small screens */}
        <img
          src="/hero-section.jpeg"
          alt="Rashmi & Deepankar - Our Forever Begins"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/50 to-background" />

      {/* Floating Hearts */}
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          initial={{
            x: Math.random() * (windowWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)),
            y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 100,
          }}
          animate={{
            y: -100,
            x: Math.random() * (windowWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)),
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-24 pb-8 md:pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground">
            Rashmi 
            </h1>
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary fill-primary animate-heart-beat" />
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground">
              Deepankar
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 font-light px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Our Forever Begins...
          </motion.p>

          {/* Countdown */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-card/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 shadow-romantic min-w-[70px] sm:min-w-[80px] md:min-w-[100px] flex-1 max-w-[120px]"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-romantic">
                  {value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground capitalize mt-1 sm:mt-2">
                  {unit}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-6 sm:pt-8 px-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="text-base sm:text-lg w-full sm:w-auto"
              onClick={() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Details
            </Button>

            {/* Audio Player */}
            <AudioPlayer
              src="/tumko-paya-hai-toh.mp3"
              // title="Play Music"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
