// index.jsx
"use client";

import Logo from "../../../public/imgs/logo.png";
import Image from "next/image";
import { SocialMedia } from "./socialMedia";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-12 pb-6 px-10 font-sans tracking-wide text-[#FFF0D1] text-center md:text-[unset]">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <div className="lg:flex lg:items-center justify-center">
            <Link href="/" className="flex items-center justify-center ">
              <Image
                src={Logo}
                className="w-60 rounded-[4px] transition-all duration-300 ease-in-out hover:rotate-4"
                width={1000}
                height={1000}
                alt="logo"
              />
            </Link>
          </div>

          <div className="lg:flex lg:items-center justify-center">
            <ul className="flex space-x-0 justify-center gap-4">
              <li>
                <a
                  href={SocialMedia.facebook.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#FFF0D1] hover:fill-white w-7 h-7"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={SocialMedia.instagram.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#FFF0D1] hover:fill-white w-7 h-7"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={SocialMedia.tiktok.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#FFF0D1] hover:fill-white w-7 h-7"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg mb-6 text-[#FFF0D1]">Useful links</h4>
            <ul className="space-y-4 pl-2">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                  disabled
                >
                  Featured
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  Best Sellers
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg mb-6 text-[#FFF0D1]">Information</h4>
            <ul className="space-y-4 pl-2">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  Sale
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-[#FFF0D1] hover:text-[#FFF0D1] text-sm pointer-events-none"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-[#FFF0D1] text-sm mt-10 text-center sm:text-center">
          © Sfida.All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;