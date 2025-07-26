// utils/storage.js
import { Promocodes } from "@/data/promocodes/promocedes";
import { triggerCartUpdate, triggerFavoritesUpdate } from "./events";

// Safe localStorage access for both client and server
const getStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  };
};

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const validateData = (data) => {
  try {
    return data && typeof data === 'object';
  } catch (error) {
    console.error('Error validating data:', error);
    return false;
  }
};

// Cart Functions
export const getCart = () => {
  try {
    const storage = getStorage();
    const cart = storage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const addToCart = (product) => {
  if (!validateData(product)) return false;

  try {
    const storage = getStorage();
    const cart = getCart();
    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && 
             item.selectedSize?.size === product.selectedSize?.size
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      cart.push({ 
        ...product, 
        uniqueId: generateUniqueId(),
        quantity: product.quantity || 1
      });
    }

    storage.setItem("cart", JSON.stringify(cart));
    triggerCartUpdate();
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

export const updateCartItem = (uniqueId, updates) => {
  if (!uniqueId || !validateData(updates)) return false;

  try {
    const storage = getStorage();
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.uniqueId === uniqueId);

    if (itemIndex >= 0) {
      cart[itemIndex] = { ...cart[itemIndex], ...updates };
      storage.setItem("cart", JSON.stringify(cart));
      triggerCartUpdate();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return false;
  }
};

export const removeFromCart = (uniqueId) => {
  if (!uniqueId) return false;

  try {
    const storage = getStorage();
    const cart = getCart();
    const updatedCart = cart.filter(item => item.uniqueId !== uniqueId);
    storage.setItem("cart", JSON.stringify(updatedCart));
    triggerCartUpdate();
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

export const clearCart = () => {
  try {
    const storage = getStorage();
    storage.removeItem("cart");
    triggerCartUpdate();
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};

// Favorites Functions
export const getFavorites = () => {
  try {
    const storage = getStorage();
    const favorites = storage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (product) => {
  if (!validateData(product)) return false;

  try {
    const storage = getStorage();
    const favorites = getFavorites();
    if (!favorites.some(item => item.id === product.id)) {
      favorites.push({ 
        ...product, 
        uniqueId: generateUniqueId(),
        addedAt: new Date().toISOString()
      });
      storage.setItem("favorites", JSON.stringify(favorites));
      triggerFavoritesUpdate();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

export const removeFromFavorites = (uniqueId) => {
  if (!uniqueId) return false;

  try {
    const storage = getStorage();
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(item => item.uniqueId !== uniqueId);
    storage.setItem("favorites", JSON.stringify(updatedFavorites));
    triggerFavoritesUpdate();
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

export const clearFavorites = () => {
  try {
    const storage = getStorage();
    storage.removeItem("favorites");
    triggerFavoritesUpdate();
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
};

// Promocode Functions
export const savePromocodeData = (code, provider) => {
  if (!code) return false;

  try {
    const storage = getStorage();
    const promocodes = getPromocodes();
    const promocodeDetails = Promocodes.find(pc => pc.code === code);

    if (!promocodeDetails) {
      console.error('Promocode not found in available promocodes');
      return false;
    }

    const existingPromo = promocodes.find(pc => pc.code === code);
    if (!existingPromo) {
      promocodes.push({
        code: promocodeDetails.code,
        provider: provider || "Unknown",
        usedBy: [],
        isUsed: false,
        value: promocodeDetails.value,
        maxDiscountPercentage: promocodeDetails.maxDiscountPercentage,
        minOrderAmount: promocodeDetails.minOrderAmount,
        usageLimit: promocodeDetails.usageLimit,
        realUsedTimes: 0,
        addedAt: new Date().toISOString()
      });

      storage.setItem("promocodes", JSON.stringify(promocodes));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving promocode:', error);
    return false;
  }
};

export const getPromocodes = () => {
  try {
    const storage = getStorage();
    const promocodes = storage.getItem("promocodes");
    return promocodes ? JSON.parse(promocodes) : [];
  } catch (error) {
    console.error('Error getting promocodes:', error);
    return [];
  }
};

export const getPromocode = (code) => {
  if (!code) return null;

  try {
    const promocodes = getPromocodes();
    const promocode = promocodes.find(pc => pc.code === code);

    if (promocode) {
      const promocodeDetails = Promocodes.find(pc => pc.code === code);
      return {
        ...promocode,
        ...promocodeDetails
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting promocode:', error);
    return null;
  }
};

export const markPromocodeAsUsed = (code, email) => {
  if (!code || !email) return false;

  try {
    const storage = getStorage();
    const promocodes = getPromocodes();
    const updatedPromocodes = promocodes.map(pc => {
      if (pc.code === code) {
        return {
          ...pc,
          usedBy: [...pc.usedBy, email],
          isUsed: true,
          realUsedTimes: pc.realUsedTimes + 1,
          lastUsedAt: new Date().toISOString()
        };
      }
      return pc;
    });

    storage.setItem("promocodes", JSON.stringify(updatedPromocodes));
    return true;
  } catch (error) {
    console.error('Error marking promocode as used:', error);
    return false;
  }
};

export const clearPromocodes = () => {
  try {
    const storage = getStorage();
    storage.removeItem("promocodes");
    return true;
  } catch (error) {
    console.error('Error clearing promocodes:', error);
    return false;
  }
};

// Order Functions
export const saveOrder = (orderDetails) => {
  if (!validateData(orderDetails)) {
    console.error('Invalid order data');
    return false;
  }

  try {
    const storage = getStorage();
    const orderToSave = JSON.parse(JSON.stringify(orderDetails));
    
    if (!orderToSave.orderId) {
      orderToSave.orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    if (!orderToSave.status) {
      orderToSave.status = 'جديد';
    }
    
    if (!orderToSave.createdAt) {
      orderToSave.createdAt = new Date().toISOString();
    }

    const allOrders = getAllOrders();
    
    if (!allOrders.some(order => order.orderId === orderToSave.orderId)) {
      allOrders.unshift(orderToSave);
      storage.setItem("allOrders", JSON.stringify(allOrders));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving order:', error);
    return false;
  }
};

export const getAllOrders = () => {
  try {
    const storage = getStorage();
    const orders = storage.getItem("allOrders");
    if (!orders) return [];
    
    const parsedOrders = JSON.parse(orders);
    
    if (Array.isArray(parsedOrders)) {
      return parsedOrders.map(order => ({
        orderId: order.orderId || 'غير معروف',
        status: order.status || 'جديد',
        createdAt: order.createdAt || new Date().toISOString(),
        clientInfo: {
          name: order.clientInfo?.name || 'غير معروف',
          phone: order.clientInfo?.phone || 'غير معروف',
          email: order.clientInfo?.email || 'غير معروف',
          country: order.clientInfo?.country || { nameAr: 'مصر' },
          governorate: order.clientInfo?.governorate || { nameAr: 'غير معروف' },
          city: order.clientInfo?.city || { nameAr: 'غير معروف' },
          district: order.clientInfo?.district || 'غير معروف',
          detailedAddress: order.clientInfo?.detailedAddress || 'غير معروف'
        },
        cartItems: Array.isArray(order.cartItems) ? order.cartItems : [],
        preTotalBeforeDiscount: typeof order.preTotalBeforeDiscount === 'number' ? 
          order.preTotalBeforeDiscount : 0,
        discount: typeof order.discount === 'number' ? order.discount : 0,
        shippingCost: typeof order.shippingCost === 'number' ? order.shippingCost : 0,
        promocode: order.promocode || null,
        notes: order.notes || ''
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const updateOrderStatus = (orderId, status) => {
  if (!orderId || !status) return false;

  try {
    const storage = getStorage();
    const allOrders = getAllOrders();
    const updatedOrders = allOrders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status };
      }
      return order;
    });
    
    storage.setItem("allOrders", JSON.stringify(updatedOrders));
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

export const deleteOrder = (orderId) => {
  if (!orderId) return false;

  try {
    const storage = getStorage();
    const allOrders = getAllOrders();
    const updatedOrders = allOrders.filter(order => order.orderId !== orderId);
    storage.setItem("allOrders", JSON.stringify(updatedOrders));
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
};

export const getOrderById = (orderId) => {
  if (!orderId) return null;

  try {
    const allOrders = getAllOrders();
    return allOrders.find(order => order.orderId === orderId) || null;
  } catch (error) {
    console.error('Error getting order by ID:', error);
    return null;
  }
};

export const getOrdersByStatus = (status) => {
  try {
    const allOrders = getAllOrders();
    return allOrders.filter(order => order.status === status);
  } catch (error) {
    console.error('Error getting orders by status:', error);
    return [];
  }
};
