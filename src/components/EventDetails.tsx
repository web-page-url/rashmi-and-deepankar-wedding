import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";

const EventDetails = () => {
  const openMap = () => {
    window.open("https://maps.app.goo.gl/1txX5vX9TdXyHPco8?g_st=aw", "_blank");
  };

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
    <section id="details" className="py-20 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-purple-950/20">
      <div className="container mx-auto max-w-4xl">
        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Carousel className="w-full max-w-2xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/rashmi-1.jpeg"
                    alt=" - Memory 1"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/rashmi-2.jpeg"
                    alt=" - Memory 2"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/rashmi-3.jpeg"
                    alt=" - Memory 3"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/rashmi-4.jpeg"
                    alt=" - Memory 4"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/rashmi-5.jpeg"
                    alt=" - Memory 5"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </motion.div>

        {/* Save the Date Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase shadow-lg mb-6">
            Save the Date
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 text-rose-200">
            <Heart className="w-6 h-6" />
          </div>
          <div className="absolute top-4 right-4 text-pink-200">
            <Heart className="w-6 h-6" />
          </div>
          <div className="absolute bottom-4 left-4 text-purple-200">
            <Heart className="w-6 h-6" />
          </div>
          <div className="absolute bottom-4 right-4 text-rose-200">
            <Heart className="w-6 h-6" />
          </div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
            </div>
          </motion.div>

          {/* Invitation Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              Invites You To Join The
            </p>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
              Wedding Celebration
            </h2>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-rose-500" />
              <span className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                Sunday November 23, 2025
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-pink-500" />
              <span className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                11:00 AM Onwards
              </span>
            </div>
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-purple-500" />
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  Celebration Garden
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  GT Road, Karnal, Haryana
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <motion.button
                onClick={openMap}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <MapPin className="w-5 h-5" />
                View on Map
              </motion.button>

              <motion.button
                onClick={addToCalendar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Add to Calendar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
