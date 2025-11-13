import { motion } from "framer-motion";
import { Heart, Coffee, Sparkles, Calendar } from "lucide-react";

const timeline = [
  {
    icon: Coffee,
    title: "First Meeting",
    date: "March 2020",
    description: "A chance encounter at a cozy café that sparked something magical.",
    color: "text-accent",
  },
  {
    icon: Heart,
    title: "First Date",
    date: "April 2020",
    description: "An evening under the stars that lasted until dawn, filled with laughter and endless conversation.",
    color: "text-primary",
  },
  {
    icon: Sparkles,
    title: "Falling in Love",
    date: "Summer 2021",
    description: "Adventures, memories, and the realization that we had found our soulmate.",
    color: "text-muted",
  },
  {
    icon: Calendar,
    title: "The Proposal",
    date: "December 2024",
    description: "A perfect moment on a beach at sunset, where 'forever' became a beautiful reality.",
    color: "text-accent",
  },
];

const LoveStory = () => {
  return (
    <section id="our-story" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-gradient-romantic mb-4">
            Our Love Story
          </h2>
          <p className="text-lg text-muted-foreground">
            Every love story is beautiful, but ours is our favorite
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary" />

          {timeline.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex ${isEven ? "justify-start" : "justify-end"} mb-16`}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "var(--shadow-romantic)" }}
                  className={`w-full md:w-5/12 bg-card rounded-2xl p-6 shadow-lg border border-border ${
                    isEven ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full bg-primary/10 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-accent font-medium">{item.date}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>

                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-glow"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
