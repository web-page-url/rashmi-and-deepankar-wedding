import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import couple4 from "@/assets/couple-4.jpg";

const images = [
  { src: couple1, alt: "Deepankar & Rashmi golden hour moment" },
  { src: couple2, alt: "Deepankar & Rashmi laughing together" },
  { src: couple3, alt: "Deepankar & Rashmi dancing under fairy lights" },
  { src: couple4, alt: "Deepankar & Rashmi intimate portrait" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-gradient-sunset mb-4">
            Our Moments
          </h2>
          <p className="text-lg text-muted-foreground">
            Captured memories of our beautiful journey together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "var(--shadow-romantic)" }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-secondary/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-romantic"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
