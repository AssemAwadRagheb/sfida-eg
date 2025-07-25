"use client";

import React from "react";

const SfidaPharmaLocation = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100">
      {/* خريطة جوجل - عمودية على الموبايل */}
      <div className="w-full h-[80vh] px-0 sm:px-4 py-0">
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.6271349525546!2d31.225621591527094!3d30.17669075467845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14586b5df2f8e609%3A0xee7dcbb76be81ad!2z2LTYsdmD2Kkg2LPZgdmK2K_YpyDZhNmE2KPYr9mI2YrYqQ!5e0!3m2!1sar!2seg!4v1749428822968!5m2!1sar!2seg"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="خريطة موقع شركة سفيدا للأدوية"
          />
        </div>
      </div>
    </div>
  );
};

export default SfidaPharmaLocation;
