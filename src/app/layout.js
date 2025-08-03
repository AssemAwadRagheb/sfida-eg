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

const trackingConfig = {
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
            
            fbq('init', '${trackingConfig.fbPixelId}');
            fbq('track', 'PageView');
            
            // نظام متقدم لتخزين الأحداث
            window._fbEventManager = {
              queue: JSON.parse(sessionStorage.getItem('fb_pixel_queue') || '[]'),
              
              pushEvent: function(eventName, eventParams) {
                this.queue.push({eventName, eventParams});
                sessionStorage.setItem('fb_pixel_queue', JSON.stringify(this.queue));
                this.processQueue();
              },
              
              processQueue: function() {
                if (typeof fbq !== 'function') return;
                
                this.queue.forEach((event, index) => {
                  try {
                    fbq('track', event.eventName, event.eventParams);
                    this.queue.splice(index, 1);
                    sessionStorage.setItem('fb_pixel_queue', JSON.stringify(this.queue));
                  } catch (e) {
                    console.error('FB Pixel Error:', e);
                  }
                });
              },
              
              clearQueue: function() {
                this.queue = [];
                sessionStorage.removeItem('fb_pixel_queue');
              }
            };
            
            // معالجة الأحداث المخزنة عند التحميل
            window.addEventListener('load', function() {
              if (window._fbEventManager) {
                window._fbEventManager.processQueue();
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
          src={`https://www.facebook.com/tr?id=${trackingConfig.fbPixelId}&ev=PageView&noscript=1`}
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
          id="fb-pixel-events-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // ===== نظام تتبع الأحداث الرئيسي =====
              
              // تتبع إضافة منتج للسلة
              function trackAddToCart(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${trackingConfig.currency}',
                  quantity: product.quantity || 1
                };
                
                if (window._fbEventManager) {
                  window._fbEventManager.pushEvent('AddToCart', eventData);
                }
                
                // تحديث بيانات السلة في الجلسة
                updateCartInSession(product);
              }
              
              // تتبع بدء عملية الدفع
              function trackInitiateCheckout(cart) {
                const eventData = {
                  content_ids: cart.items.map(item => item.id),
                  content_type: 'product',
                  value: cart.total,
                  currency: '${trackingConfig.currency}',
                  num_items: cart.items.reduce((total, item) => total + item.quantity, 0)
                };
                
                if (window._fbEventManager) {
                  window._fbEventManager.pushEvent('InitiateCheckout', eventData);
                }
              }
              
              // تتبع إتمام الشراء
              function trackPurchase(order) {
                const eventData = {
                  value: order.total,
                  currency: '${trackingConfig.currency}',
                  contents: order.products.map(p => ({
                    id: p.id,
                    quantity: p.quantity
                  })),
                  content_type: 'product',
                  order_id: order.id || 'ORDER_' + Date.now()
                };
                
                if (window._fbEventManager) {
                  window._fbEventManager.pushEvent('Purchase', eventData);
                  window._fbEventManager.clearQueue();
                }
                
                // مسح بيانات السلة بعد الشراء
                sessionStorage.removeItem('current_cart');
              }
              
              // تتبع مشاهدة المنتج
              function trackViewContent(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${trackingConfig.currency}'
                };
                
                if (window._fbEventManager) {
                  window._fbEventManager.pushEvent('ViewContent', eventData);
                }
              }
              
              // ===== دوال مساعدة =====
              
              // تحديث بيانات السلة في الجلسة
              function updateCartInSession(product) {
                const currentCart = JSON.parse(sessionStorage.getItem('current_cart') || '{"items":[],"total":0}');
                
                // البحث عن المنتج في السلة
                const existingItem = currentCart.items.find(item => item.id === product.id);
                
                if (existingItem) {
                  existingItem.quantity += product.quantity || 1;
                } else {
                  currentCart.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity || 1
                  });
                }
                
                // حساب الإجمالي
                currentCart.total = currentCart.items.reduce(
                  (sum, item) => sum + (item.price * item.quantity), 0
                );
                
                sessionStorage.setItem('current_cart', JSON.stringify(currentCart));
              }
              
              // جلب بيانات المنتج الحالي من الصفحة
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
                  console.error('Error getting product data:', e);
                }
                return null;
              }
              
              // جلب بيانات الطلب الحالي من صفحة التأكيد
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
                  console.error('Error getting order data:', e);
                }
                return null;
              }
              
              // جلب بيانات السلة الحالية
              function getCurrentCartData() {
                try {
                  const cartElement = document.querySelector('[data-cart]');
                  if (cartElement) {
                    return {
                      items: JSON.parse(cartElement.dataset.cartItems),
                      total: parseFloat(cartElement.dataset.cartTotal)
                    };
                  }
                  // Fallback إلى بيانات الجلسة
                  return JSON.parse(sessionStorage.getItem('current_cart'));
                } catch (e) {
                  console.error('Error getting cart data:', e);
                }
                return null;
              }
              
              // ===== معالجة أحداث الصفحات =====
              
              document.addEventListener('DOMContentLoaded', function() {
                // صفحة المنتج
                if (window.location.pathname.includes('/product/')) {
                  const product = getCurrentProductData();
                  if (product) trackViewContent(product);
                }
                
                // صفحة السلة
                if (window.location.pathname.includes('/cart')) {
                  const cart = getCurrentCartData();
                  if (cart && cart.items.length > 0) {
                    trackInitiateCheckout(cart);
                  }
                }
                
                // صفحة تأكيد الطلب
                if (window.location.pathname.includes('/checkout/success')) {
                  const order = getCurrentOrderData();
                  if (order) {
                    trackPurchase(order);
                  }
                }
              });
            `
          }}
        />
      </body>
    </html>
  );
}
