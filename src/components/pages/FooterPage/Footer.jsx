import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Can I get a refund if the event is canceled?",
      answer:
        "Yes! If an event is canceled, you’ll automatically receive a full refund to your original payment method.",
    },
    {
      question: "What if the event is rescheduled?",
      answer:
        "Your ticket will remain valid for the new date. If you can’t make it, refund options will be available.",
    },
    {
      question: "How can I contact support?",
      answer:
        "Reach out to us at support@yourevents.com or call +91 98765 43210. Our support is available 24/7.",
    },
    {
      question: "Where are you located?",
      answer:
        "We operate globally 🌍 with main offices in Hyderabad, Bangalore, and Mumbai.",
    },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/30 blur-3xl rounded-full -z-10"></div>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* FAQs */}
        <h2 className="text-4xl tracking-widest font-bold text-center text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900/70 rounded-xl shadow-md overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium hover:bg-gray-800 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-300" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <p className="p-4 text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-16 grid md:grid-cols-3 p-10 gap-10 text-gray-400 bg-[#1F1F1F]">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <p>Email: support@yourevents.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Head Offices</h3>
            <p>Hyderabad, IN</p>
            <p>Bangalore, IN</p>
            <p>Mumbai, IN</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="/instagram.com" className="hover:text-purple-400 transition">
                Instagram
              </a>
              <a href="/x.com" className="hover:text-purple-400 transition">
                Twitter
              </a>
              <a href="linkedin.com" className="hover:text-purple-400 transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm text-[#1F1F1F">
          © {new Date().getFullYear()} YourEvents. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
