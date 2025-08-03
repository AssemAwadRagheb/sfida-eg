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

// بيانات الموقع الأساسية يمكن جلبها من CMS في المستقبل
const siteData = {
  title: "Sfida",
  description: "Find the best personal care and cosmetics at Sfida.",
  baseUrl: "https://sfida-eg.vercel.app/",
  logoUrl: "https://i.ibb.co/fYbH6RzM/logo-fav.png",
  locale: "ar",
  keywords: "personal care, cosmetics, Sfida, weight loss",
  social: {
    twitter: "@Sfida"
  },
  tracking: {
    facebookPixelId: "667476426454833",
    chatbaseId: "-3UT4U5z4KZOGu7TF8rxt"
  }
};

export async function generateMetadata({ params }) {
  const pageTitle = params?.slug ? `${siteData.title} - ${params.slug}` : siteData.title;
  
  return {
    title: pageTitle,
    description: siteData.description,
    keywords: siteData.keywords,
    metadataBase: new URL(siteData.baseUrl),
    alternates: {
      canonical: siteData.baseUrl,
    },
    openGraph: {
      title: siteData.title,
      description: siteData.description,
      url: siteData.baseUrl,
      siteName: siteData.title,
      images: [
        {
          url: siteData.logoUrl,
          width: 1200,
          height: 630,
          alt: siteData.title,
        },
      ],
      locale: siteData.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: siteData.social.twitter,
      title: siteData.title,
      description: siteData.description,
      images: [siteData.logoUrl],
    },
  };
}

// مكون منفصل لتحسين قابلية القراءة
const TrackingScripts = () => (
  <>
    {/* Facebook Pixel */}
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s) {
            if(f.fbq)return;
            n=f.fbq=function() {
              n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
            };
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${siteData.tracking.facebookPixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${siteData.tracking.facebookPixelId}&ev=PageView&noscript=1`}
        alt="Facebook Pixel Tracker"
      />
    </noscript>

    {/* Chatbase Script */}
    <Script
      id="chatbase-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if(!window.chatbase || window.chatbase("getState")!=="initialized") {
              window.chatbase = (...arguments) => {
                if(!window.chatbase.q) { window.chatbase.q = [] }
                window.chatbase.q.push(arguments)
              };
              window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                  if(prop === "q") { return target.q }
                  return (...args) => target(prop, ...args)
                }
              })
            }
            const onLoad = function() {
              const script = document.createElement("script");
              script.src = "https://www.chatbase.co/embed.min.js";
              script.id = "${siteData.tracking.chatbaseId}";
              script.domain = "www.chatbase.co";
              document.body.appendChild(script);
            };
            if(document.readyState === "complete") {
              onLoad()
            } else {
              window.addEventListener("load", onLoad)
            }
          })();
        `,
      }}
    />
  </>
);

export default function RootLayout({ children }) {
  return (
    <html lang={siteData.locale}>
      <head>
        <TrackingScripts />
        {/* يمكن إضافة Structured Data هنا إذا لزم الأمر */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteData.title,
            "url": siteData.baseUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteData.baseUrl}search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
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
