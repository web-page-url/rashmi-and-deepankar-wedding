import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RSVP = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    attendance: "",
    guests: "",
    message: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('RSVP Debug: Form submission started');
    console.log('RSVP Debug: Form data:', formData);

    try {
      // Google Apps Script URL - Deployed web app URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbyai33P6gUuLZvYBc642DsP5DH3aNYuIfBTc5zP8WT0teokMdPmSDfuQqGm2YuxAnrL/exec';

      // Prepare form data for submission
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('whatsapp', formData.whatsapp);
      formDataToSend.append('attendance', formData.attendance);
      formDataToSend.append('guests', formData.guests || '1');
      formDataToSend.append('message', formData.message);
      formDataToSend.append('timestamp', new Date().toISOString());

      console.log('RSVP Debug: Prepared FormData for submission');


      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('RSVP Debug: Fetch response received:', response);
      console.log('RSVP Debug: Response status:', response.status);
      console.log('RSVP Debug: Response ok:', response.ok);

      setShowConfetti(true);

      toast({
        title: "You're Part of Our Love Story! 💖",
        description: "Thank you for your response! We can't wait to celebrate with you!",
        duration: 5000,
      });

      console.log('RSVP Debug: Form submission successful, showing success message');

      // Reset form
      setFormData({ name: "", whatsapp: "", attendance: "", guests: "", message: "" });

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

    } catch (error) {
      console.error('RSVP Debug: Error submitting form:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly!",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: Math.random() * 360 + 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: "linear",
              }}
            >
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-gradient-sunset mb-4">
            Join Our Celebration
          </h2>
          <p className="text-lg text-muted-foreground">
            Your presence would make our day even more special
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 shadow-romantic border border-border space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number *</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+91 9876543210"
              required
              className="focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-3">
            <Label>Will you be joining us? *</Label>
            <RadioGroup
              value={formData.attendance}
              onValueChange={(value) => setFormData({ ...formData, attendance: value })}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer">
                  Yes! Can't wait to celebrate! 💖
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="cursor-pointer">
                  Unfortunately, I can't make it
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Share your wishes or any dietary requirements..."
              className="focus:ring-primary focus:border-primary min-h-[100px]"
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full text-lg">
            Seal Our Love! 💖
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVP;
