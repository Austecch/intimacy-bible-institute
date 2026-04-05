"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  programs: [
    { label: "Spiritual Formation", href: "/programs?category=spiritual" },
    { label: "Ministry Training", href: "/programs?category=ministry" },
    { label: "Leadership", href: "/programs?category=leadership" },
    { label: "Worship", href: "/programs?category=worship" },
  ],
  resources: [
    { label: "Media Centre", href: "/media" },
    { label: "Sermons", href: "/media?sermons" },
    { label: "Teachings", href: "/media?teachings" },
    { label: "Downloads", href: "/dashboard/downloads" },
  ],
  institute: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about#mission" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refunds" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div>
                <span className="font-semibold text-white tracking-tight">Intimacy Bible</span>
                <span className="block text-xs text-stone-400">Institute</span>
              </div>
            </Link>
            <p className="text-stone-400 mb-6 max-w-sm">
              Transforming lives through intimate knowledge of God's Word. Join thousands of believers on their journey of spiritual growth.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@ibi.edu" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@ibi.edu
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Faith Avenue, Grace City, GC 12345</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Institute</h4>
            <ul className="space-y-3">
              {footerLinks.institute.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} Intimacy Bible Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
