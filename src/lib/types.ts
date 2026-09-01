export type Cuisine =
  | "pizza"
  | "burgers"
  | "sushi"
  | "italian"
  | "indian"
  | "chinese"
  | "mexican"
  | "salads"
  | "desserts"
  | "coffee"
  | "bbq"
  | "vegan";

export type OrderStatus =
  | "placed"
  | "accepted"
  | "preparing"
  | "ready"
  | "picked_up"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type RiderStatus = "online" | "busy" | "offline";
export type PartnerStatus = "active" | "pending" | "suspended";

export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  /** integer minor units (cents) */
  priceCents: number;
  isVeg: boolean;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  calories?: number;
  available: boolean;
};

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  cuisines: Cuisine[];
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  deliveryTimeMins: [number, number];
  deliveryFeeCents: number;
  minOrderCents: number;
  distanceKm: number;
  isOpen: boolean;
  promoted?: boolean;
  address: string;
  tags: string[];
  status: PartnerStatus;
  ownerName: string;
  joinedAt: string;
};

export type CartLine = {
  menuItemId: string;
  restaurantId: string;
  quantity: number;
  notes?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  ordersCount: number;
  totalSpentCents: number;
  status: "active" | "blocked";
};

export type Rider = {
  id: string;
  name: string;
  vehicle: "bike" | "scooter" | "car";
  rating: number;
  status: RiderStatus;
  completedDeliveries: number;
  earningsTodayCents: number;
  joinedAt: string;
  partnerStatus: PartnerStatus;
};

export type OrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  priceCents: number;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  riderId?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  deliveryAddress: string;
  createdAt: string;
  etaMins: number;
};
