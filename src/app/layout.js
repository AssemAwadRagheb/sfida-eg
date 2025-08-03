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

// بيانات الموقع الأساسية
const siteData = {
  title: "Sfida",
  description: "Find the best personal care and cosmetics at Sfida.",
  baseUrl: "https://sfida-eg.vercel.app/",
  locale: "ar",
  fbPixelId: "667476426454833" // تأكد من صحة ID البيكسل
};

export async function generateMetadata({ params }) {
  return {
    title: "Sfida - " + (params?.slug || "Home"),
    description: siteData.description,
    metadataBase: new URL(siteData.baseUrl),
  };
}

// مكون لتحميل وتنفيذ أحداث الفيسبوك بكفاءة
const FacebookPixel = () => {
  return (
    <>
      <Script
        id="fb-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){
                n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
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
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${siteData.fbPixelId}');
            fbq('track', 'PageView');
            
            // دالة مساعدة لإرسال الأحداث
            window.trackFacebookEvent = function(eventName, parameters = {}) {
              fbq('track', eventName, parameters);
              console.log('Facebook Event:', eventName, parameters);
            };
            
            // تتبع الأحداث عند تحميل الصفحة
            document.addEventListener('DOMContentLoaded', function() {
              // تتبع مشاهدة الصفحة
              if(window.location.pathname.includes('/product/')) {
                const productData = getProductData(); // يجب استبدالها بدالة جلب بيانات المنتج
                if(productData) {
                  fbq('track', 'ViewContent', {
                    content_name: productData.name,
                    content_ids: [productData.id],
                    content_type: 'product',
                    value: productData.price,
                    currency: 'EGP'
                  });
                }
              }
              
              // تتبع إتمام الشراء
              if(window.location.pathname.includes('/order-confirmation')) {
                const orderData = getOrderData(); // يجب استبدالها بدالة جلب بيانات الطلب
                if(orderData) {
                  fbq('track', 'Purchase', {
                    value: orderData.total,
                    currency: 'EGP',
                    contents: orderData.products.map(p => ({
                      id: p.id,
                      quantity: p.quantity
                    })),
                    content_type: 'product'
                  });
                }
              }
            });
            
            // استماع لأحداث إضافة للسلة (يجب تفعيلها عند حدوث الحدث)
            window.addEventListener('addToCart', function(e) {
              const product = e.detail;
              fbq('track', 'AddToCart', {
                content_name: product.name,
                content_ids: [product.id],
                content_type: 'product',
                value: product.price,
                currency: 'EGP',
                quantity: product.quantity || 1
              });
            });
          `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${siteData.fbPixelId}&ev=PageView&noscript=1`}
          alt="Facebook Pixel"
        />
      </noscript>
    </>
  );
};

// دالة مساعدة لجلب بيانات المنتج (يجب تعديلها حسب بنية موقعك)
function getProductData() {
  // يمكن جلب البيانات من:
  // 1. خصائص الصفحة (data attributes)
  // 2. متغيرات JavaScript العالمية
  // 3. API محلي
  
  // مثال:
  const productElement = document.querySelector('[data-product]');
  if(productElement) {
    return {
      id: productElement.dataset.productId,
      name: productElement.dataset.productName,
      price: parseFloat(productElement.dataset.productPrice)
    };
  }
  return null;
}

// دالة مساعدة لجلب بيانات الطلب (يجب تعديلها حسب بنية موقعك)
function getOrderData() {
  // يمكن جلب البيانات من:
  // 1. خصائص الصفحة
  // 2. متغيرات JavaScript
  // 3. API محلي
  
  // مثال:
  const orderElement = document.querySelector('[data-order]');
  if(orderElement) {
    return {
      total: parseFloat(orderElement.dataset.orderTotal),
      products: JSON.parse(orderElement.dataset.orderProducts)
    };
  }
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang={siteData.locale} dir="rtl">
      <head>
        <FacebookPixel />
        {/* Chatbase Script (ابقيه كما هو إذا كنت بحاجته) */}
        <Script
          id="chatbase-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="-3UT4U5z4KZOGu7TF8rxt";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <Navbar />
        <div className="container-90">{children}</div>
        <SmallFooter />
        <ToastContainer />
        
        {/* سكريبت إضافي لإدارة الأحداث */}
        <Script
          id="event-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // دالة لتفعيل حدث إضافة للسلة
              function triggerAddToCart(product) {
                const event = new CustomEvent('addToCart', {
                  detail: product
                });
                window.dispatchEvent(event);
              }
              
              // يمكن إضافة مستمعات لأحداث أخرى هنا
            `
          }}
        />
      </body>
    </html>
  );
}
