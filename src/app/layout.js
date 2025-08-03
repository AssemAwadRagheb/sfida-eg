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

const siteConfig = {
  fbPixelId: "667476426454833",
  currency: "EGP",
  storeEventsInSession: true // تفعيل تخزين الأحداث في الجلسة
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
        id="fb-pixel-core"
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
            
            fbq('init', '${siteConfig.fbPixelId}');
            fbq('track', 'PageView');
            
            // نظام متقدم لتتبع الأحداث عبر الصفحات
            window._fbEventStorage = {
              events: JSON.parse(sessionStorage.getItem('_fb_pixel_events') || '[]'),
              
              push: function(event) {
                this.events.push(event);
                sessionStorage.setItem('_fb_pixel_events', JSON.stringify(this.events));
                this.process();
              },
              
              process: function() {
                if (typeof fbq !== 'function') return;
                
                this.events.forEach((event, index) => {
                  try {
                    fbq('track', event.name, event.params);
                    this.events.splice(index, 1);
                    sessionStorage.setItem('_fb_pixel_events', JSON.stringify(this.events));
                  } catch (e) {
                    console.error('FB Pixel Error:', e);
                  }
                });
              },
              
              clear: function() {
                this.events = [];
                sessionStorage.removeItem('_fb_pixel_events');
              }
            };
            
            // معالجة الأحداث المخزنة عند التحميل
            window.addEventListener('load', function() {
              if (window._fbEventStorage) {
                window._fbEventStorage.process();
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
          src={`https://www.facebook.com/tr?id=${siteConfig.fbPixelId}&ev=PageView&noscript=1`}
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
        
        <Script
          id="fb-pixel-events"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // دالة لتسجيل أحداث AddToCart
              function trackAddToCart(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${siteConfig.currency}',
                  quantity: product.quantity || 1
                };
                
                if (window._fbEventStorage) {
                  window._fbEventStorage.push({
                    name: 'AddToCart',
                    params: eventData
                  });
                } else {
                  console.warn('Facebook Pixel not loaded yet');
                }
              }
              
              // دالة لتسجيل أحداث Purchase
              function trackPurchase(order) {
                const eventData = {
                  value: order.total,
                  currency: '${siteConfig.currency}',
                  contents: order.products.map(p => ({
                    id: p.id,
                    quantity: p.quantity
                  })),
                  content_type: 'product',
                  order_id: order.id || 'ORDER_' + Math.floor(Math.random() * 1000000)
                };
                
                if (window._fbEventStorage) {
                  window._fbEventStorage.push({
                    name: 'Purchase',
                    params: eventData
                  });
                  
                  // مسح الأحداث القديمة بعد إتمام الشراء
                  window._fbEventStorage.clear();
                }
              }
              
              // تتبع أحداث الصفحة الحالية
              document.addEventListener('DOMContentLoaded', function() {
                // تتبع صفحة المنتج
                if (window.location.pathname.includes('/product/')) {
                  const productData = getCurrentProductData();
                  if (productData) {
                    trackViewContent(productData);
                  }
                }
                
                // تتبع صفحة التأكيد
                if (window.location.pathname.includes('/checkout/confirmation')) {
                  const orderData = getCurrentOrderData();
                  if (orderData) {
                    trackPurchase(orderData);
                  }
                }
              });
              
              // دالة مساعدة لجلب بيانات المنتج الحالي
              function getCurrentProductData() {
                try {
                  const productElement = document.querySelector('[data-product]');
                  if (productElement) {
                    return {
                      id: productElement.dataset.productId,
                      name: productElement.dataset.productName,
                      price: parseFloat(productElement.dataset.productPrice)
                    };
                  }
                } catch (e) {
                  console.error('Product data error:', e);
                }
                return null;
              }
              
              // دالة مساعدة لجلب بيانات الطلب الحالي
              function getCurrentOrderData() {
                try {
                  const orderElement = document.querySelector('[data-order]');
                  if (orderElement) {
                    return {
                      id: orderElement.dataset.orderId,
                      total: parseFloat(orderElement.dataset.orderTotal),
                      products: JSON.parse(orderElement.dataset.orderProducts)
                    };
                  }
                } catch (e) {
                  console.error('Order data error:', e);
                }
                return null;
              }
              
              // دالة لتتبع مشاهدة المحتوى
              function trackViewContent(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${siteConfig.currency}'
                };
                
                if (window._fbEventStorage) {
                  window._fbEventStorage.push({
                    name: 'ViewContent',
                    params: eventData
                  });
                }
              }
            `
          }}
        />
      </body>
    </html>
  );
}
