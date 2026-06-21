"use client";
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Marcus Thorne",
    role: "Founder, NeuralNode AI",
    quote: "StartupForge didn't just help me find a team; they helped me build a movement. The quality of the engineering talent here is unparalleled."
  },
  {
    name: "Sora Park",
    role: "Design Partner, Aura Home",
    quote: "I transitioned from FAANG to the startup world through Forge. The curated opportunities are precisely what high-level professionals are looking for."
  },
  {
    name: "Elias Vance",
    role: "GP, Obsidian Ventures",
    quote: "Our most successful portfolio companies in the last two years have all been forged here. It's the ultimate filter for quality."
  }
];

const Experience = () => {
  return (
    <section className="bg-white dark:bg-[#0d0f17] text-gray-900 dark:text-white py-20 px-6 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Animation */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          The Forge Experience
        </motion.h2>

        {/* Testimonials Grid Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Card className="bg-gray-50 dark:bg-[#161922] border-gray-200 dark:border-gray-800 p-8 flex flex-col gap-4 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-300">{t.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-2 italic">{t.quote}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-[2rem] p-12 text-center flex flex-col items-center gap-6"
        >
          <h2 className="text-4xl font-bold">Ready to Forge Your Future?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Whether youre starting from zero or scaling to the moon, our infrastructure and community are built for your success.
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8">Get Started for Free</Button>
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">Book a Demo</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;