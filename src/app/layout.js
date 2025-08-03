import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import "../styles/globals.scss";
import Navbar from "@/components/navbar/index";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmallFooter from "@/components/small-footer";
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const pageTitle = "Sfida - " + (params?.slug || "Home");
  const pageDescription = "Find the best personal care and cosmetics at Sfida.";
  
  return {
    title: pageTitle,
    description: pageDescription,
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
  const pathname = usePathname();
  
  // Fixed: استبدال document.title ب title من generateMetadata
  const pageTitle = "Sfida - " + (pathname?.split('/').filter(Boolean).pop() || "Home");

  // Fixed: تحسين دالة pageType لتجنب الأخطاء مع pathname غير معرف
  const pageType = () => {
    if (!pathname) return 'home';
    if (pathname === '/') return 'home';
    if (pathname.includes('/product/')) return 'product';
    if (pathname.includes('/category/')) return 'category';
    if (pathname.includes('/cart')) return 'cart';
    if (pathname.includes('/checkout')) return 'checkout';
    return 'other';
  };

  // Fixed: إنشاء sessionId بشكل آمن دون استخدام window في SSR
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const dataLayer = {
    event: "pageView",
    page: {
      title: pageTitle,
      path: pathname || "/",
      type: pageType(),
      language: "ar",
      country: "EG",
      hostname: "sfida-eg.vercel.app", // Fixed: تجنب استخدام window في SSR
      url: `https://sfida-eg.vercel.app${pathname || '/'}`, // Fixed: بناء URL بدون window
      referrer: "", // سيتم تحديثه من خلال سكربت العميل
    },
    user: {
      id: "anonymous",
      type: "guest",
      isLoggedIn: false,
      sessionId: generateSessionId(), // Fixed: استخدام دالة آمنة لتوليد sessionId
      device: {
        type: "unknown", // سيتم تحديثه من خلال سكربت العميل
        browser: "unknown", // سيتم تحديثه من خلال سكربت العميل
      },
    },
    site: {
      name: "Sfida",
      environment: process.env.NODE_ENV === "production" ? "production" : "development",
      version: "1.0.0",
    },
    ecommerce: {
      currency: "EGP",
    },
    timestamp: new Date().toISOString(),
  };

  return (
    <html lang="ar">
      <head>
        {/* Fixed: تحسين سكربت dataLayer ليتعامل مع تحديثات العميل */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.__INITIAL_DATA_LAYER__ = ${JSON.stringify(dataLayer)};
              window.dataLayer.push(window.__INITIAL_DATA_LAYER__);
              
              // تحديث البيانات الديناميكية بعد تحميل الصفحة
              function updateDataLayer() {
                const updatedData = {
                  page: {
                    ...window.__INITIAL_DATA_LAYER__.page,
                    hostname: window.location.hostname,
                    url: window.location.href,
                    referrer: document.referrer,
                  },
                  user: {
                    ...window.__INITIAL_DATA_LAYER__.user,
                    device: {
                      type: window.innerWidth < 768 ? "mobile" : 
                           window.innerWidth < 1024 ? "tablet" : "desktop",
                      browser: navigator.userAgent,
                    }
                  }
                };
                
                // تخزين sessionId في sessionStorage
                try {
                  if (typeof sessionStorage !== 'undefined') {
                    if (!sessionStorage.getItem('sessionId')) {
                      sessionStorage.setItem('sessionId', updatedData.user.sessionId);
                    } else {
                      updatedData.user.sessionId = sessionStorage.getItem('sessionId');
                    }
                  }
                } catch (e) {
                  console.error('Error accessing sessionStorage:', e);
                }
                
                window.dataLayer.push(updatedData);
              }
              
              // تشغيل التحديث عند تحميل الصفحة
              if (document.readyState === 'complete') {
                updateDataLayer();
              } else {
                window.addEventListener('load', updateDataLayer);
              }
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXX');
            `,
          }}
        />

        {/* Meta Pixel */}
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

        {/* Chatbase Script */}
        <Script
          id="chatbase-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.chatbaseConfig = {
                chatbotId: '-3UT4U5z4KZOGu7TF8rxt',
                baseUrl: 'https://www.chatbase.co'
              };
              (function(){
                if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                  window.chatbase=(...args)=>{
                    if(!window.chatbase.q){window.chatbase.q=[]}
                    window.chatbase.q.push(args)
                  };
                  window.chatbase=new Proxy(window.chatbase,{
                    get(target,prop){
                      if(prop==="q"){return target.q}
                      return(...args)=>target(prop,...args)
                    }
                  })
                }
                const onLoad=function(){
                  const script=document.createElement("script");
                  script.src="https://www.chatbase.co/embed.min.js";
                  script.id="-3UT4U5z4KZOGu7TF8rxt";
                  script.setAttribute('defer', '');
                  document.body.appendChild(script)
                };
                if(document.readyState==="complete"){onLoad()}
                else{window.addEventListener("load",onLoad)}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        dir="rtl"
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <Navbar />
        <div className="container-90">{children}</div>
        <SmallFooter />
        <ToastContainer />
      </body>
    </html>
  );
}
