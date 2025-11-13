import { Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    // Special handling for "Our Story" - navigate to hero section (top of page)
    const targetId = id === "our-story" ? "hero" : id;
    const element = document.getElementById(targetId);

    if (element) {
      // Close mobile menu first, then scroll
      setIsMobileMenuOpen(false);

      // Use setTimeout to ensure menu closes before scrolling on mobile
      setTimeout(() => {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2);

        window.scrollTo({
          top: targetId === "hero" ? 0 : Math.max(0, middle),
          behavior: "smooth"
        });
      }, 100);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            <Heart className="w-6 h-6 text-primary fill-primary animate-heart-beat" />
            <span className="font-display text-2xl font-bold text-gradient-romantic">
              R & D
            </span>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-12 h-12 flex items-center justify-center text-foreground rounded-lg hover:bg-primary/5 active:bg-primary/10 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Our Story",  "Details", ].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-foreground hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {["Our Story",  "Details",].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                    className="block w-full text-left text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-primary/5 active:bg-primary/10 touch-manipulation"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
