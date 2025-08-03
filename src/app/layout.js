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

const siteData = {
  title: "Sfida",
  fbPixelId: "667476426454833",
  currency: "EGP"
};

export async function generateMetadata({ params }) {
  return {
    title: "Sfida - " + (params?.slug || "Home"),
  };
}

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
            
            // تخزين الأحداث في localStorage عند فقدانها
            window._fbEventsQueue = JSON.parse(localStorage.getItem('_fbEventsQueue') || '[]');
            
            // دالة لإرسال الأحداث مع التخزين الاحتياطي
            window.trackFbEvent = function(eventName, params = {}) {
              try {
                fbq('track', eventName, params);
                console.log('FB Event Sent:', eventName, params);
              } catch (e) {
                // إذا فشل الإرسال، نخزن الحدث للتحميل لاحقاً
                window._fbEventsQueue.push({eventName, params});
                localStorage.setItem('_fbEventsQueue', JSON.stringify(window._fbEventsQueue));
                console.log('FB Event Queued:', eventName, params);
              }
            };
            
            // إرسال الأحداث المخزنة عند تحميل الصفحة
            window.addEventListener('load', function() {
              if (window._fbEventsQueue && window._fbEventsQueue.length > 0) {
                window._fbEventsQueue.forEach(event => {
                  fbq('track', event.eventName, event.params);
                });
                localStorage.removeItem('_fbEventsQueue');
                window._fbEventsQueue = [];
              }
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
        />
      </noscript>
    </>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <FacebookPixel />
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
              function trackAddToCart(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${siteData.currency}',
                  quantity: product.quantity || 1
                };
                window.trackFbEvent('AddToCart', eventData);
              }
              
              // دالة لتفعيل حدث الشراء
              function trackPurchase(order) {
                const eventData = {
                  value: order.total,
                  currency: '${siteData.currency}',
                  contents: order.products.map(p => ({
                    id: p.id,
                    quantity: p.quantity
                  })),
                  content_type: 'product'
                };
                window.trackFbEvent('Purchase', eventData);
              }
              
              // دالة لتفعيل حدث مشاهدة المنتج
              function trackViewProduct(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${siteData.currency}'
                };
                window.trackFbEvent('ViewContent', eventData);
              }
              
              // تتبع الأحداث عند تحميل الصفحة
              document.addEventListener('DOMContentLoaded', function() {
                // تتبع مشاهدة المنتج
                if(window.location.pathname.includes('/product/')) {
                  const productData = getProductData();
                  if(productData) trackViewProduct(productData);
                }
                
                // تتبع إتمام الشراء
                if(window.location.pathname.includes('/order-confirmation')) {
                  const orderData = getOrderData();
                  if(orderData) trackPurchase(orderData);
                }
              });
              
              // دالة مساعدة لجلب بيانات المنتج
              function getProductData() {
                try {
                  const productElement = document.querySelector('[data-product]');
                  if(productElement) {
                    return {
                      id: productElement.dataset.productId,
                      name: productElement.dataset.productName,
                      price: parseFloat(productElement.dataset.productPrice)
                    };
                  }
                } catch(e) { console.error(e); }
                return null;
              }
              
              // دالة مساعدة لجلب بيانات الطلب
              function getOrderData() {
                try {
                  const orderElement = document.querySelector('[data-order]');
                  if(orderElement) {
                    return {
                      total: parseFloat(orderElement.dataset.orderTotal),
                      products: JSON.parse(orderElement.dataset.orderProducts)
                    };
                  }
                } catch(e) { console.error(e); }
                return null;
              }
            `
          }}
        />
      </body>
    </html>
  );
}
