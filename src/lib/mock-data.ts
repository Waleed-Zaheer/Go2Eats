import type {
  Customer,
  MenuCategory,
  MenuItem,
  Order,
  OrderStatus,
  Restaurant,
  Rider,
} from "@/lib/types";

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Mains" },
  { id: "sides", name: "Sides" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}
function daysAgo(d: number) {
  return new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1", slug: "bella-napoli", name: "Bella Napoli",
    cuisines: ["pizza", "italian"], rating: 4.8, reviewCount: 1240,
    priceLevel: 2, deliveryTimeMins: [20, 30], deliveryFeeCents: 299, minOrderCents: 1200,
    distanceKm: 1.4, isOpen: true, promoted: true,
    address: "214 Mulberry St, Little Italy", tags: ["Wood-fired", "Family recipe", "Vegetarian options"],
    status: "active", ownerName: "Marco Russo", joinedAt: daysAgo(410),
  },
  {
    id: "r2", slug: "smoke--bun", name: "Smoke & Bun",
    cuisines: ["burgers", "bbq"], rating: 4.6, reviewCount: 892,
    priceLevel: 2, deliveryTimeMins: [25, 35], deliveryFeeCents: 349, minOrderCents: 1000,
    distanceKm: 2.1, isOpen: true, promoted: true,
    address: "88 Ash Grove, Riverside", tags: ["Smash burgers", "House sauce", "Late night"],
    status: "active", ownerName: "Jordan Lee", joinedAt: daysAgo(280),
  },
  {
    id: "r3", slug: "sakura-sushi", name: "Sakura Sushi Bar",
    cuisines: ["sushi"], rating: 4.9, reviewCount: 2033,
    priceLevel: 3, deliveryTimeMins: [30, 45], deliveryFeeCents: 399, minOrderCents: 1800,
    distanceKm: 3.0, isOpen: true, promoted: false,
    address: "12 Willow Ave, Downtown", tags: ["Omakase", "Sustainably sourced"],
    status: "active", ownerName: "Aiko Tanaka", joinedAt: daysAgo(520),
  },
  {
    id: "r4", slug: "spice-route", name: "Spice Route",
    cuisines: ["indian"], rating: 4.7, reviewCount: 1567,
    priceLevel: 2, deliveryTimeMins: [25, 40], deliveryFeeCents: 299, minOrderCents: 1200,
    distanceKm: 2.6, isOpen: true, promoted: false,
    address: "45 Curry Lane, Eastside", tags: ["Tandoori", "Mild to fiery", "Vegan friendly"],
    status: "active", ownerName: "Priya Nair", joinedAt: daysAgo(365),
  },
  {
    id: "r5", slug: "golden-dragon", name: "Golden Dragon",
    cuisines: ["chinese"], rating: 4.5, reviewCount: 734,
    priceLevel: 1, deliveryTimeMins: [20, 30], deliveryFeeCents: 249, minOrderCents: 900,
    distanceKm: 1.8, isOpen: false, promoted: false,
    address: "9 Canton Rd, Chinatown", tags: ["Wok-fired", "Family style"],
    status: "active", ownerName: "Wei Chen", joinedAt: daysAgo(610),
  },
  {
    id: "r6", slug: "casa-verde", name: "Casa Verde",
    cuisines: ["mexican"], rating: 4.6, reviewCount: 1098,
    priceLevel: 2, deliveryTimeMins: [20, 35], deliveryFeeCents: 299, minOrderCents: 1000,
    distanceKm: 2.3, isOpen: true, promoted: true,
    address: "301 Cactus Blvd, Southgate", tags: ["Handmade tortillas", "Spicy"],
    status: "active", ownerName: "Sofia Ramirez", joinedAt: daysAgo(190),
  },
  {
    id: "r7", slug: "green--grain", name: "Green & Grain",
    cuisines: ["salads", "vegan"], rating: 4.7, reviewCount: 601,
    priceLevel: 2, deliveryTimeMins: [15, 25], deliveryFeeCents: 199, minOrderCents: 800,
    distanceKm: 0.9, isOpen: true, promoted: false,
    address: "17 Harvest Ct, Midtown", tags: ["100% plant-based", "Bowls"],
    status: "active", ownerName: "Elena Kim", joinedAt: daysAgo(140),
  },
  {
    id: "r8", slug: "sweet--co", name: "Sweet & Co Bakery",
    cuisines: ["desserts", "coffee"], rating: 4.9, reviewCount: 954,
    priceLevel: 2, deliveryTimeMins: [15, 25], deliveryFeeCents: 199, minOrderCents: 600,
    distanceKm: 1.1, isOpen: true, promoted: false,
    address: "5 Baker's Row, Midtown", tags: ["Fresh daily", "Small batch"],
    status: "active", ownerName: "Grace Oyelaran", joinedAt: daysAgo(95),
  },
  {
    id: "r9", slug: "pit--barrel", name: "Pit & Barrel",
    cuisines: ["bbq"], rating: 4.4, reviewCount: 412,
    priceLevel: 3, deliveryTimeMins: [35, 50], deliveryFeeCents: 399, minOrderCents: 1500,
    distanceKm: 4.2, isOpen: true, promoted: false,
    address: "76 Timber Yard, Industrial District", tags: ["12-hour smoked", "Craft sides"],
    status: "pending", ownerName: "Tyler Brooks", joinedAt: daysAgo(4),
  },
  {
    id: "r10", slug: "bombay-express", name: "Bombay Express",
    cuisines: ["indian"], rating: 3.9, reviewCount: 88,
    priceLevel: 1, deliveryTimeMins: [25, 40], deliveryFeeCents: 249, minOrderCents: 900,
    distanceKm: 3.5, isOpen: false, promoted: false,
    address: "22 Market St, Eastside", tags: ["Quick bites"],
    status: "suspended", ownerName: "Raj Malhotra", joinedAt: daysAgo(730),
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Bella Napoli
  { id: "m1", restaurantId: "r1", categoryId: "starters", name: "Garlic Focaccia", description: "Rosemary, sea salt, olive oil.", priceCents: 650, isVeg: true, available: true },
  { id: "m2", restaurantId: "r1", categoryId: "mains", name: "Margherita Pizza", description: "San Marzano tomato, fior di latte, basil.", priceCents: 1450, isVeg: true, isPopular: true, available: true },
  { id: "m3", restaurantId: "r1", categoryId: "mains", name: "Diavola Pizza", description: "Spicy salami, chili honey, mozzarella.", priceCents: 1650, isVeg: false, spicyLevel: 2, isPopular: true, available: true },
  { id: "m4", restaurantId: "r1", categoryId: "mains", name: "Truffle Mushroom Pizza", description: "Wild mushroom, truffle cream, parmesan.", priceCents: 1850, isVeg: true, available: true },
  { id: "m5", restaurantId: "r1", categoryId: "desserts", name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone.", priceCents: 750, isVeg: true, available: true },
  { id: "m6", restaurantId: "r1", categoryId: "drinks", name: "San Pellegrino", description: "330ml sparkling water.", priceCents: 350, isVeg: true, available: true },
  // Smoke & Bun
  { id: "m7", restaurantId: "r2", categoryId: "starters", name: "Loaded Fries", description: "Cheese sauce, bacon bits, scallion.", priceCents: 750, isVeg: false, available: true },
  { id: "m8", restaurantId: "r2", categoryId: "mains", name: "Classic Smash Burger", description: "Double patty, American cheese, house sauce.", priceCents: 1150, isVeg: false, isPopular: true, available: true },
  { id: "m9", restaurantId: "r2", categoryId: "mains", name: "Fire BBQ Bacon Burger", description: "Smoked bacon, cheddar, chipotle BBQ.", priceCents: 1350, isVeg: false, spicyLevel: 1, isPopular: true, available: true },
  { id: "m10", restaurantId: "r2", categoryId: "mains", name: "Mushroom Swiss Burger", description: "Sautéed mushroom, swiss, garlic aioli.", priceCents: 1250, isVeg: false, available: true },
  { id: "m11", restaurantId: "r2", categoryId: "sides", name: "Onion Rings", description: "Beer battered, buttermilk dip.", priceCents: 650, isVeg: true, available: true },
  { id: "m12", restaurantId: "r2", categoryId: "drinks", name: "Vanilla Milkshake", description: "Hand-spun, whipped cream.", priceCents: 650, isVeg: true, available: false },
  // Sakura Sushi Bar
  { id: "m13", restaurantId: "r3", categoryId: "starters", name: "Edamame", description: "Steamed, sea salt.", priceCents: 550, isVeg: true, available: true },
  { id: "m14", restaurantId: "r3", categoryId: "mains", name: "Salmon Nigiri Set", description: "8 pieces, wasabi, pickled ginger.", priceCents: 1850, isVeg: false, isPopular: true, available: true },
  { id: "m15", restaurantId: "r3", categoryId: "mains", name: "Dragon Roll", description: "Eel, avocado, unagi glaze.", priceCents: 1650, isVeg: false, isPopular: true, available: true },
  { id: "m16", restaurantId: "r3", categoryId: "mains", name: "Spicy Tuna Roll", description: "Bluefin tuna, sriracha aioli, tempura flake.", priceCents: 1450, isVeg: false, spicyLevel: 2, available: true },
  { id: "m17", restaurantId: "r3", categoryId: "desserts", name: "Mochi Trio", description: "Matcha, mango, red bean.", priceCents: 650, isVeg: true, available: true },
  { id: "m18", restaurantId: "r3", categoryId: "drinks", name: "Iced Genmaicha", description: "Roasted brown rice green tea.", priceCents: 450, isVeg: true, available: true },
  // Spice Route
  { id: "m19", restaurantId: "r4", categoryId: "starters", name: "Vegetable Samosa (3pc)", description: "Spiced potato & pea, mint chutney.", priceCents: 550, isVeg: true, available: true },
  { id: "m20", restaurantId: "r4", categoryId: "mains", name: "Butter Chicken", description: "Tomato cream sauce, garam masala.", priceCents: 1550, isVeg: false, isPopular: true, available: true },
  { id: "m21", restaurantId: "r4", categoryId: "mains", name: "Paneer Tikka Masala", description: "Grilled paneer, smoky tomato gravy.", priceCents: 1450, isVeg: true, spicyLevel: 1, available: true },
  { id: "m22", restaurantId: "r4", categoryId: "mains", name: "Lamb Vindaloo", description: "Fiery Goan curry, tamarind.", priceCents: 1750, isVeg: false, spicyLevel: 3, isPopular: true, available: true },
  { id: "m23", restaurantId: "r4", categoryId: "sides", name: "Garlic Naan", description: "Tandoor baked, ghee brushed.", priceCents: 400, isVeg: true, available: true },
  { id: "m24", restaurantId: "r4", categoryId: "drinks", name: "Mango Lassi", description: "Yogurt, alphonso mango.", priceCents: 500, isVeg: true, available: true },
  // Golden Dragon
  { id: "m25", restaurantId: "r5", categoryId: "starters", name: "Spring Rolls (4pc)", description: "Crispy vegetable rolls, sweet chili.", priceCents: 500, isVeg: true, available: true },
  { id: "m26", restaurantId: "r5", categoryId: "mains", name: "Kung Pao Chicken", description: "Peanuts, dried chili, scallion.", priceCents: 1250, isVeg: false, spicyLevel: 2, isPopular: true, available: true },
  { id: "m27", restaurantId: "r5", categoryId: "mains", name: "Beef & Broccoli", description: "Oyster sauce glaze.", priceCents: 1350, isVeg: false, available: true },
  { id: "m28", restaurantId: "r5", categoryId: "mains", name: "Vegetable Fried Rice", description: "Wok tossed, egg, scallion.", priceCents: 950, isVeg: true, available: true },
  { id: "m29", restaurantId: "r5", categoryId: "drinks", name: "Jasmine Tea", description: "Hot, unsweetened.", priceCents: 250, isVeg: true, available: true },
  // Casa Verde
  { id: "m30", restaurantId: "r6", categoryId: "starters", name: "Guacamole & Chips", description: "Hand-mashed, lime, cilantro.", priceCents: 650, isVeg: true, available: true },
  { id: "m31", restaurantId: "r6", categoryId: "mains", name: "Al Pastor Tacos (3pc)", description: "Pineapple, onion, cilantro.", priceCents: 1150, isVeg: false, isPopular: true, available: true },
  { id: "m32", restaurantId: "r6", categoryId: "mains", name: "Carne Asada Burrito", description: "Grilled steak, rice, beans, salsa verde.", priceCents: 1350, isVeg: false, spicyLevel: 1, isPopular: true, available: true },
  { id: "m33", restaurantId: "r6", categoryId: "mains", name: "Veggie Quesadilla", description: "Peppers, onion, three cheese blend.", priceCents: 1050, isVeg: true, available: true },
  { id: "m34", restaurantId: "r6", categoryId: "drinks", name: "Horchata", description: "Cinnamon rice milk.", priceCents: 450, isVeg: true, available: true },
  // Green & Grain
  { id: "m35", restaurantId: "r7", categoryId: "mains", name: "Harvest Grain Bowl", description: "Quinoa, roasted squash, kale, tahini.", priceCents: 1250, isVeg: true, isPopular: true, available: true },
  { id: "m36", restaurantId: "r7", categoryId: "mains", name: "Buddha Bowl", description: "Chickpea, avocado, brown rice, miso dressing.", priceCents: 1350, isVeg: true, isPopular: true, available: true },
  { id: "m37", restaurantId: "r7", categoryId: "starters", name: "Charred Cauliflower Bites", description: "Gochujang glaze, sesame.", priceCents: 750, isVeg: true, spicyLevel: 1, available: true },
  { id: "m38", restaurantId: "r7", categoryId: "drinks", name: "Cold-Pressed Greens", description: "Kale, apple, celery, lemon.", priceCents: 550, isVeg: true, available: true },
  // Sweet & Co Bakery
  { id: "m39", restaurantId: "r8", categoryId: "desserts", name: "Butter Croissant", description: "Laminated 36 times, baked fresh.", priceCents: 450, isVeg: true, available: true },
  { id: "m40", restaurantId: "r8", categoryId: "desserts", name: "Chocolate Lava Cake", description: "Molten center, vanilla bean gelato.", priceCents: 850, isVeg: true, isPopular: true, available: true },
  { id: "m41", restaurantId: "r8", categoryId: "desserts", name: "New York Cheesecake", description: "Graham crust, berry compote.", priceCents: 750, isVeg: true, isPopular: true, available: true },
  { id: "m42", restaurantId: "r8", categoryId: "drinks", name: "Flat White", description: "Double shot, steamed milk.", priceCents: 475, isVeg: true, available: true },
  { id: "m43", restaurantId: "r8", categoryId: "drinks", name: "Iced Caramel Latte", description: "House caramel, cold milk.", priceCents: 525, isVeg: true, available: true },
  // Pit & Barrel
  { id: "m44", restaurantId: "r9", categoryId: "mains", name: "Brisket Plate", description: "12-hour smoked, choice of two sides.", priceCents: 1950, isVeg: false, isPopular: true, available: true },
  { id: "m45", restaurantId: "r9", categoryId: "mains", name: "Pulled Pork Sandwich", description: "Carolina slaw, brioche bun.", priceCents: 1450, isVeg: false, available: true },
  { id: "m46", restaurantId: "r9", categoryId: "sides", name: "Mac & Cheese", description: "Smoked gouda, panko crust.", priceCents: 650, isVeg: true, available: true },
];

export const CUSTOMERS: Customer[] = [
  { id: "c1", name: "Emma Wilson", email: "emma.wilson@example.com", joinedAt: daysAgo(310), ordersCount: 47, totalSpentCents: 68400, status: "active" },
  { id: "c2", name: "Liam Carter", email: "liam.carter@example.com", joinedAt: daysAgo(212), ordersCount: 22, totalSpentCents: 31200, status: "active" },
  { id: "c3", name: "Olivia Brooks", email: "olivia.brooks@example.com", joinedAt: daysAgo(98), ordersCount: 9, totalSpentCents: 12850, status: "active" },
  { id: "c4", name: "Noah Bennett", email: "noah.bennett@example.com", joinedAt: daysAgo(455), ordersCount: 63, totalSpentCents: 94100, status: "active" },
  { id: "c5", name: "Ava Thompson", email: "ava.thompson@example.com", joinedAt: daysAgo(15), ordersCount: 2, totalSpentCents: 3600, status: "active" },
  { id: "c6", name: "Ethan Price", email: "ethan.price@example.com", joinedAt: daysAgo(600), ordersCount: 118, totalSpentCents: 172300, status: "active" },
  { id: "c7", name: "Sophia Reed", email: "sophia.reed@example.com", joinedAt: daysAgo(180), ordersCount: 5, totalSpentCents: 6100, status: "blocked" },
  { id: "c8", name: "Mason Clark", email: "mason.clark@example.com", joinedAt: daysAgo(40), ordersCount: 4, totalSpentCents: 5800, status: "active" },
];

export const RIDERS: Rider[] = [
  { id: "rd1", name: "Diego Alvarez", vehicle: "scooter", rating: 4.9, status: "online", completedDeliveries: 1420, earningsTodayCents: 8650, joinedAt: daysAgo(340), partnerStatus: "active" },
  { id: "rd2", name: "Mei Zhang", vehicle: "bike", rating: 4.8, status: "busy", completedDeliveries: 980, earningsTodayCents: 6200, joinedAt: daysAgo(210), partnerStatus: "active" },
  { id: "rd3", name: "Samuel Osei", vehicle: "car", rating: 4.7, status: "online", completedDeliveries: 2210, earningsTodayCents: 11200, joinedAt: daysAgo(560), partnerStatus: "active" },
  { id: "rd4", name: "Isabella Rossi", vehicle: "scooter", rating: 4.95, status: "offline", completedDeliveries: 640, earningsTodayCents: 0, joinedAt: daysAgo(120), partnerStatus: "active" },
  { id: "rd5", name: "Kwame Boateng", vehicle: "bike", rating: 4.6, status: "online", completedDeliveries: 305, earningsTodayCents: 4300, joinedAt: daysAgo(75), partnerStatus: "active" },
  { id: "rd6", name: "Nina Petrova", vehicle: "car", rating: 4.85, status: "busy", completedDeliveries: 1105, earningsTodayCents: 9100, joinedAt: daysAgo(400), partnerStatus: "active" },
  { id: "rd7", name: "Tomás Fernández", vehicle: "scooter", rating: 4.5, status: "offline", completedDeliveries: 88, earningsTodayCents: 0, joinedAt: daysAgo(10), partnerStatus: "pending" },
  { id: "rd8", name: "Harper Jones", vehicle: "bike", rating: 4.4, status: "offline", completedDeliveries: 44, earningsTodayCents: 0, joinedAt: daysAgo(500), partnerStatus: "suspended" },
];

const STATUS_CYCLE: OrderStatus[] = [
  "delivered", "delivered", "delivered", "delivered", "delivered",
  "out_for_delivery", "preparing", "accepted", "placed", "delivered", "delivered", "cancelled",
];

function itemsFor(restaurantId: string, count: number): Order["items"] {
  const pool = MENU_ITEMS.filter((m) => m.restaurantId === restaurantId);
  const picked = pool.slice(0, count);
  return picked.map((m, i) => ({
    menuItemId: m.id,
    name: m.name,
    quantity: (i % 2) + 1,
    priceCents: m.priceCents,
  }));
}

function buildOrder(
  id: string,
  customer: Customer,
  restaurant: Restaurant,
  status: OrderStatus,
  hoursBack: number,
  riderId?: string,
): Order {
  const items = itemsFor(restaurant.id, 2 + (Number(id.replace(/\D/g, "")) % 2));
  const subtotal = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const total = subtotal + restaurant.deliveryFeeCents;
  return {
    id,
    customerId: customer.id,
    customerName: customer.name,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    riderId,
    items,
    status,
    subtotalCents: subtotal,
    deliveryFeeCents: restaurant.deliveryFeeCents,
    totalCents: total,
    deliveryAddress: "412 Elm Street, Apt 3B",
    createdAt: hoursAgo(hoursBack),
    etaMins: 15 + (Number(id.replace(/\D/g, "")) % 20),
  };
}

export const ORDERS: Order[] = STATUS_CYCLE.map((status, i) => {
  const customer = CUSTOMERS[i % CUSTOMERS.length];
  const restaurant = RESTAURANTS[i % (RESTAURANTS.length - 2)];
  const rider = RIDERS[i % 6];
  const hoursBack = i === 8 ? 0.05 : i === 7 ? 0.3 : i === 6 ? 0.6 : i === 5 ? 0.9 : i * 7 + 2;
  return buildOrder(`ORD-${1000 + i}`, customer, restaurant, status, hoursBack, rider.id);
});

export function getRestaurantBySlug(slug: string) {
  return RESTAURANTS.find((r) => r.slug === slug);
}
export function getRestaurantById(id: string) {
  return RESTAURANTS.find((r) => r.id === id);
}
export function getMenuItemsFor(restaurantId: string) {
  return MENU_ITEMS.filter((m) => m.restaurantId === restaurantId);
}
export function getMenuItem(id: string) {
  return MENU_ITEMS.find((m) => m.id === id);
}
export function getOrder(id: string) {
  return ORDERS.find((o) => o.id === id);
}

/** The restaurant the restaurant-portal demo login is "signed in" as. */
export const DEMO_RESTAURANT_ID = "r1";
/** The rider the rider-portal demo login is "signed in" as. */
export const DEMO_RIDER_ID = "rd1";
