import { motion } from "framer-motion";
import { Heart, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const addToCalendar = () => {
    const event = {
      title: "Rashmi & Deepankar Wedding Celebration",
      description: "Join us in celebrating the beautiful love story of Rashmi and Deepankar. Save the date for our wedding celebration!",
      location: "Celebration Garden, GT Road, Karnal, Haryana",
      start: "2025-11-23T11:00:00",
      end: "2025-11-23T23:59:00",
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${event.start.replace(/[-:]/g, "")}/${event.end.replace(
      /[-:]/g,
      ""
    )}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(
      event.location
    )}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Heart className="w-8 h-8 text-primary fill-primary animate-heart-beat" />
            <span className="font-display text-3xl font-bold text-primary-foreground">
              Deepankar & Rashmi
            </span>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-6"
          >
            {[
              { icon: Instagram, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Mail, href: "mailto:contact@example.com" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.a>
              );
            })}
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={addToCalendar}
              variant="outline"
              size="lg"
              className="bg-orange-100 border-orange-500 text-orange-700 hover:bg-accent hover:text-accent-foreground"
            >
              Save the Date 📅
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-secondary-foreground/70 mt-8"
          >
            Made with ❤️ for Rashmi' & Deepankar
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
