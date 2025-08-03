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
            
            // إنشاء كائن global لإدارة الأحداث
            window.fbPixel = {
              track: function(eventName, eventData) {
                try {
                  fbq('track', eventName, eventData);
                  console.log('FB Pixel Event:', eventName, eventData);
                } catch (e) {
                  console.error('FB Pixel Error:', e);
                  // تخزين الأحداث الفاشلة في localStorage
                  const failedEvents = JSON.parse(localStorage.getItem('fbPixelFailedEvents') || '[]');
                  failedEvents.push({eventName, eventData, timestamp: new Date().getTime()});
                  localStorage.setItem('fbPixelFailedEvents', JSON.stringify(failedEvents));
                }
              },
              
              retryFailedEvents: function() {
                const failedEvents = JSON.parse(localStorage.getItem('fbPixelFailedEvents') || [];
                failedEvents.forEach(event => {
                  fbq('track', event.eventName, event.eventData);
                });
                localStorage.removeItem('fbPixelFailedEvents');
              }
            };
            
            // إعادة إرسال الأحداث الفاشلة عند التحميل
            window.addEventListener('load', function() {
              if (window.fbPixel) {
                window.fbPixel.retryFailedEvents();
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
          id="fb-pixel-events-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // دالة مركزية لإرسال الأحداث
              function sendFbEvent(eventName, eventData) {
                if (window.fbPixel) {
                  window.fbPixel.track(eventName, eventData);
                } else {
                  console.error('FB Pixel not initialized');
                }
              }
              
              // تتبع إضافة منتج للسلة
              function trackAddToCart(product) {
                sendFbEvent('AddToCart', {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${pixelConfig.currency}',
                  quantity: product.quantity || 1
                });
              }
              
              // تتبع بدء الدفع
              function trackInitiateCheckout(cart) {
                sendFbEvent('InitiateCheckout', {
                  content_ids: cart.items.map(item => item.id),
                  content_type: 'product',
                  value: cart.total,
                  currency: '${pixelConfig.currency}',
                  num_items: cart.items.reduce((sum, item) => sum + item.quantity, 0)
                });
              }
              
              // تتبع إتمام الشراء
              function trackPurchase(order) {
                sendFbEvent('Purchase', {
                  value: order.total,
                  currency: '${pixelConfig.currency}',
                  contents: order.products.map(p => ({
                    id: p.id,
                    quantity: p.quantity
                  })),
                  content_type: 'product',
                  order_id: order.id || 'ORDER_' + Date.now()
                });
              }
              
              // تتبع مشاهدة المنتج
              function trackViewContent(product) {
                sendFbEvent('ViewContent', {
                  content_ids: [product.id],
                  content_name: product.name,
                  content_type: 'product',
                  value: product.price,
                  currency: '${pixelConfig.currency}'
                });
              }
              
              // ربط الأحداث بالزرت والأفعال
              document.addEventListener('DOMContentLoaded', function() {
                // ربط حدث إضافة للسلة
                document.querySelectorAll('[data-add-to-cart]').forEach(button => {
                  button.addEventListener('click', function() {
                    const product = {
                      id: this.dataset.productId,
                      name: this.dataset.productName,
                      price: parseFloat(this.dataset.productPrice),
                      quantity: parseInt(this.dataset.productQuantity || '1')
                    };
                    trackAddToCart(product);
                  });
                });
                
                // تتبع تلقائي لصفحة المنتج
                if (document.querySelector('[data-product-page]')) {
                  const productElement = document.querySelector('[data-product]');
                  if (productElement) {
                    trackViewContent({
                      id: productElement.dataset.productId,
                      name: productElement.dataset.productName,
                      price: parseFloat(productElement.dataset.productPrice)
                    });
                  }
                }
                
                // تتبع تلقائي لصفحة السلة
                if (document.querySelector('[data-cart-page]')) {
                  const cartElement = document.querySelector('[data-cart]');
                  if (cartElement) {
                    trackInitiateCheckout({
                      items: JSON.parse(cartElement.dataset.cartItems),
                      total: parseFloat(cartElement.dataset.cartTotal)
                    });
                  }
                }
                
                // تتبع تلقائي لصفحة التأكيد
                if (document.querySelector('[data-order-confirmation]')) {
                  const orderElement = document.querySelector('[data-order]');
                  if (orderElement) {
                    trackPurchase({
                      id: orderElement.dataset.orderId,
                      total: parseFloat(orderElement.dataset.orderTotal),
                      products: JSON.parse(orderElement.dataset.orderProducts)
                    });
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
