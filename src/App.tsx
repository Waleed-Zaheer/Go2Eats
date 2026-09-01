import { Navigate, Route, Routes } from "react-router-dom";

import { TopLoader } from "@/components/ui/top-loader";
import { useSessionStore } from "@/store/session-store";
import { SiteLayout } from "@/components/layout/site-layout";
import { PortalShell } from "@/components/layout/portal-shell";
import { RESTAURANT_NAV } from "@/pages/restaurant/nav";
import { RIDER_NAV } from "@/pages/rider/nav";
import { ADMIN_NAV } from "@/pages/admin/nav";
import { getRestaurantById } from "@/lib/mock-data";
import { RIDERS } from "@/lib/mock-data";
import { Store, Bike, ShieldCheck } from "lucide-react";

import Home from "@/pages/customer/Home";
import Restaurants from "@/pages/customer/Restaurants";
import RestaurantDetail from "@/pages/customer/RestaurantDetail";
import Checkout from "@/pages/customer/Checkout";
import OrderTracking from "@/pages/customer/OrderTracking";
import Orders from "@/pages/customer/Orders";
import Login from "@/pages/customer/Login";
import Signup from "@/pages/customer/Signup";
import Account from "@/pages/customer/Account";

import RestaurantLogin from "@/pages/restaurant/Login";
import RestaurantDashboard from "@/pages/restaurant/Dashboard";
import RestaurantOrders from "@/pages/restaurant/Orders";
import RestaurantMenu from "@/pages/restaurant/Menu";
import RestaurantAnalytics from "@/pages/restaurant/Analytics";
import RestaurantSettings from "@/pages/restaurant/Settings";

import RiderLogin from "@/pages/rider/Login";
import RiderDashboard from "@/pages/rider/Dashboard";
import RiderDelivery from "@/pages/rider/Delivery";
import RiderEarnings from "@/pages/rider/Earnings";

import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminRestaurants from "@/pages/admin/Restaurants";
import AdminRiders from "@/pages/admin/Riders";
import AdminOrders from "@/pages/admin/Orders";
import AdminUsers from "@/pages/admin/Users";

import NotFound from "@/pages/NotFound";

function RequireRestaurantSession() {
  const restaurantId = useSessionStore((s) => s.restaurantId);
  return restaurantId ? <RestaurantPortalLayout /> : <Navigate to="/restaurant/login" replace />;
}

function RestaurantPortalLayout() {
  const restaurantId = useSessionStore((s) => s.restaurantId)!;
  const signOut = useSessionStore((s) => s.signOutRestaurant);
  const restaurant = getRestaurantById(restaurantId);
  return (
    <PortalShell
      portalLabel="Restaurant portal"
      portalIcon={Store}
      navGroups={RESTAURANT_NAV}
      identityName={restaurant?.name ?? "Restaurant"}
      identitySubtitle={restaurant?.ownerName ?? "Owner"}
      onSignOut={signOut}
    />
  );
}

function RequireRiderSession() {
  const riderId = useSessionStore((s) => s.riderId);
  return riderId ? <RiderPortalLayout /> : <Navigate to="/rider/login" replace />;
}

function RiderPortalLayout() {
  const riderId = useSessionStore((s) => s.riderId)!;
  const signOut = useSessionStore((s) => s.signOutRider);
  const rider = RIDERS.find((r) => r.id === riderId);
  return (
    <PortalShell
      portalLabel="Rider portal"
      portalIcon={Bike}
      navGroups={RIDER_NAV}
      identityName={rider?.name ?? "Rider"}
      identitySubtitle={rider ? `${rider.vehicle} · ${rider.rating.toFixed(1)}★` : ""}
      onSignOut={signOut}
    />
  );
}

function RequireAdminSession() {
  const isAdmin = useSessionStore((s) => s.isAdmin);
  return isAdmin ? <AdminPortalLayout /> : <Navigate to="/admin/login" replace />;
}

function AdminPortalLayout() {
  const signOut = useSessionStore((s) => s.signOutAdmin);
  return (
    <PortalShell
      portalLabel="Admin console"
      portalIcon={ShieldCheck}
      navGroups={ADMIN_NAV}
      identityName="Platform Admin"
      identitySubtitle="admin@gotoeats.com"
      onSignOut={signOut}
    />
  );
}

export default function App() {
  return (
    <>
      <TopLoader />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="restaurants/:slug" element={<RestaurantDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderTracking />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="restaurant/login" element={<RestaurantLogin />} />
        <Route path="restaurant" element={<RequireRestaurantSession />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="analytics" element={<RestaurantAnalytics />} />
          <Route path="settings" element={<RestaurantSettings />} />
        </Route>

        <Route path="rider/login" element={<RiderLogin />} />
        <Route path="rider" element={<RequireRiderSession />}>
          <Route index element={<RiderDashboard />} />
          <Route path="delivery/:id" element={<RiderDelivery />} />
          <Route path="earnings" element={<RiderEarnings />} />
        </Route>

        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<RequireAdminSession />}>
          <Route index element={<AdminDashboard />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
          <Route path="riders" element={<AdminRiders />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
