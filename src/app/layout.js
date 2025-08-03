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

const pixelConfig = {
  id: "667476426454833",
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
        id="fb-pixel-init"
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
            
            fbq('init', '${pixelConfig.id}');
            fbq('track', 'PageView');
            
            // نظام متقدم لتخزين الأحداث
            window.fbPixelQueue = {
              queue: JSON.parse(sessionStorage.getItem('fbPixelQueue') || '[]'),
              
              push: function(event) {
                this.queue.push(event);
                sessionStorage.setItem('fbPixelQueue', JSON.stringify(this.queue));
                this.process();
              },
              
              process: function() {
                if (typeof fbq !== 'function') return;
                
                this.queue.forEach((event, index) => {
                  fbq('track', event.name, event.data);
                  this.queue.splice(index, 1);
                  sessionStorage.setItem('fbPixelQueue', JSON.stringify(this.queue));
                });
              },
              
              clear: function() {
                this.queue = [];
                sessionStorage.removeItem('fbPixelQueue');
              }
            };
            
            // معالجة الأحداث المخزنة عند التحميل
            window.addEventListener('load', function() {
              if (window.fbPixelQueue) {
                window.fbPixelQueue.process();
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
          src={`https://www.facebook.com/tr?id=${pixelConfig.id}&ev=PageView&noscript=1`}
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
              // دالة لتتبع إضافة منتج للسلة
              function trackAddToCart(product) {
                const eventData = {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${pixelConfig.currency}',
                  quantity: product.quantity || 1
                };
                
                if (window.fbPixelQueue) {
                  window.fbPixelQueue.push({
                    name: 'AddToCart',
                    data: eventData
                  });
                }
                
                // حفظ بيانات السلة في الجلسة
                updateCartInSession(product);
              }
              
              // دالة لتتبع بدء الدفع
              function trackInitiateCheckout() {
                const cart = getCartFromSession();
                if (!cart || cart.items.length === 0) return;
                
                const eventData = {
                  content_ids: cart.items.map(item => item.id),
                  content_type: 'product',
                  value: cart.total,
                  currency: '${pixelConfig.currency}',
                  num_items: cart.items.reduce((sum, item) => sum + item.quantity, 0)
                };
                
                if (window.fbPixelQueue) {
                  window.fbPixelQueue.push({
                    name: 'InitiateCheckout',
                    data: eventData
                  });
                }
              }
              
              // دالة لتتبع إتمام الشراء
              function trackPurchase(order) {
                const eventData = {
                  value: order.total,
                  currency: '${pixelConfig.currency}',
                  contents: order.products.map(p => ({
                    id: p.id,
                    quantity: p.quantity
                  })),
                  content_type: 'product',
                  order_id: order.id || 'ORDER_' + Date.now()
                };
                
                if (window.fbPixelQueue) {
                  window.fbPixelQueue.push({
                    name: 'Purchase',
                    data: eventData
                  });
                  window.fbPixelQueue.clear();
                }
                
                // مسح بيانات السلة بعد الشراء
                sessionStorage.removeItem('currentCart');
              }
              
              // ===== دوال مساعدة =====
              
              function updateCartInSession(product) {
                const cart = JSON.parse(sessionStorage.getItem('currentCart') || '{"items":[],"total":0}');
                
                const existingItem = cart.items.find(item => item.id === product.id);
                if (existingItem) {
                  existingItem.quantity += product.quantity || 1;
                } else {
                  cart.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity || 1
                  });
                }
                
                cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                sessionStorage.setItem('currentCart', JSON.stringify(cart));
              }
              
              function getCartFromSession() {
                try {
                  return JSON.parse(sessionStorage.getItem('currentCart'));
                } catch (e) {
                  return null;
                }
              }
              
              // ===== التتبع التلقائي للصفحات =====
              
              document.addEventListener('DOMContentLoaded', function() {
                // تتبع صفحة السلة
                if (window.location.pathname.includes('/cart')) {
                  trackInitiateCheckout();
                }
                
                // تتبع صفحة تأكيد الطلب
                if (window.location.pathname.includes('/checkout/success')) {
                  const orderData = getOrderDataFromPage();
                  if (orderData) {
                    trackPurchase(orderData);
                  }
                }
              });
              
              function getOrderDataFromPage() {
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
            `
          }}
        />
      </body>
    </html>
  );
}
