import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import "../styles/globals.scss";
import Navbar from "@/components/navbar/index";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmallFooter from "@/components/small-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  return {
    title: "Sfida - " + (params?.slug || "Home"),
    description: "Find the best personal care and cosmetics at Sfida.",
    keywords: "personal care, cosmetics, Sfida, weight loss",
    openGraph: {
      title: "Sfida",
      description: "Find the best Cosmetics, personal care and weight loss at Sfida.",
      url: "https://sfida-eg.vercel.app/",
      siteName: "Sfida",
      images: [
        {
          url: "https://i.ibb.co/fYbH6RzM/logo-fav.png",
          width: 1200,
          height: 630,
          alt: "Sfida",
        },
      ],
      locale: "ar",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Sfida",
      title: "Sfida",
      description: "Find the best personal care and weight loss at Sfida.",
      images: ["https://i.ibb.co/fYbH6RzM/logo-fav.png"],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head>
        {/* Data Layer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'event': 'pageView',
                'pageTitle': document.title,
                'pagePath': window.location.pathname,
                'pageCategory': 'Home' // يمكنك تعديل هذه القيمة حسب الحاجة
              });
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '667476426454833');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=667476426454833&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Chatbase Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="-3UT4U5z4KZOGu7TF8rxt";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        dir="rtl"
      >
        <Navbar />
        <div className="container-90">{children}</div>
        <SmallFooter />
        <ToastContainer />
      </body>
    </html>
  );
}
