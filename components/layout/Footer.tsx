"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  programs: [
    { label: "All Courses", href: "/programs" },
    { label: "Spiritual Formation", href: "/programs?category=spiritual" },
    { label: "Ministry Training", href: "/programs?category=ministry" },
    { label: "Leadership", href: "/programs?category=leadership" },
  ],
  resources: [
    { label: "Media Centre", href: "/media" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  institute: [
    { label: "About Us", href: "/about" },
    { label: "Admissions", href: "/admissions" },
    { label: "Login", href: "/login" },
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
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
                <span className="text-stone-900 font-semibold text-xs">IBI</span>
              </div>
              <span className="font-medium text-white">Intimacy Bible Institute</span>
            </Link>
            <p className="text-sm mb-6">
              Transforming lives through intimate knowledge of God's Word.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@ibi.edu" className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4" />
                info@ibi.edu
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-white">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Institute</h4>
            <ul className="space-y-3">
              {footerLinks.institute.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Intimacy Bible Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-stone-800 flex items-center justify-center hover:bg-stone-700 hover:text-white transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
