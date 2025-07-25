export const handlePerfumeForCard = (product) => {
  const availableSizes = product?.sizes?.filter((size) => size.available) || [];
  const firstAvailableSize = availableSizes[0] || {};
  
  // تحضير بيانات الحجم المحدد
  const selectedSizeData = {
    // sizeId: firstAvailableSize.sizeId || `size-${product.id}-default`,
    price: firstAvailableSize.price || product.price || 0,
    // weightValue: firstAvailableSize.weightValue || product.weightValue || "غير محدد",
    // weightUnitAr: firstAvailableSize.weightUnitAr || product.weightUnitAr || "",
    // typeAr: firstAvailableSize.typeAr || product.typeAr || "غير محدد",
    // available: firstAvailableSize.available !== false
  };

  // تحضير بيانات الزجاجة المحددة
  const selectedBottleData = {
    bottleId: product.id,
    bottleImage: product.defaultImage || "/default-product-image.png",
    // weightValue: selectedSizeData.weightValue,
    // weightUnitAr: selectedSizeData.weightUnitAr,
    // typeAr: selectedSizeData.typeAr
  };

  // تحضير بيانات المنتج النهائية
  const processedProduct = {
    ...product,
    id: product?.id,
    sku: product?.sku,
    titleAr: product?.titleAr,
    titleEn: product?.titleEn,
    price: selectedSizeData.price,
    selectedSizeData,
    selectedBottleData,
    // sizes: availableSizes,
    link: `/product/${product?.sku}`,
    defaultImage: product.defaultImage || "/default-product-image.png",
    // إضافة الخصائص الإضافية المطلوبة للسلة
    selectedSize: selectedSizeData,
    selectedBottle: selectedBottleData,
    uniqueId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };

  return processedProduct;
};