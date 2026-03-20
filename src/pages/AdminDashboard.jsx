import React, { useEffect, useState } from "react";

import { getAllBookings } from "../api/bookingApi";
import { getAllDestinations } from "../api/destinationApi";
import { getAllUsers, getAllGuides, getAllPorters } from "../api/userAPI";
import { fetchCities } from "../api/cityApi";
import { getAllActivities } from "../api/activityApi";
import { getAllReviews } from "../api/reviewApi";
import { getAllCustomTours } from "../api/customTourApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalBookings: 0,
    activePackages: 0,
    totalUsers: 0,
    totalCities: 0,
    totalActivities: 0,
    totalReviews: 0,
    customTours: 0,
    guides: 0,
    porters: 0
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  useEffect(() => {

    const loadDashboard = async () => {
      try {

        const [
          bookingRes,
          destinationRes,
          userRes,
          cityRes,
          activityRes,
          reviewRes,
          customTourRes,
          guideRes,
          porterRes
        ] = await Promise.all([
          getAllBookings(),
          getAllDestinations(),
          getAllUsers(token),
          fetchCities(),
          getAllActivities(),
          getAllReviews(token),
          getAllCustomTours(),
          getAllGuides(),
          getAllPorters()
        ]);

        const bookingList = bookingRes.bookings || bookingRes || [];

        setBookings(bookingList.data);

        setStats({
          totalBookings: bookingList.data.length,
          activePackages: destinationRes.data?.length || destinationRes.length || 0,
          totalUsers: userRes.data?.length || userRes.length || 0,
          totalCities: cityRes.data?.length || cityRes.length || 0,
          totalActivities: activityRes.data?.length || activityRes.length || 0,
          totalReviews: reviewRes.data?.length || reviewRes.length || 0,
          customTours: customTourRes.data?.length || customTourRes.length || 0,
          guides: guideRes.data?.length || guideRes.length || 0,
          porters: porterRes.data?.length || porterRes.length || 0
        });

      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

  }, [token]);

  if (loading) return <div style={{ padding: "30px" }}>Loading Dashboard...</div>;

  /* ===========================
     Monthly Booking Graph
  =========================== */

  const months = Array(12).fill(0);

  bookings.forEach(b => {
    if (!b.createdAt) return;
    const month = new Date(b.createdAt).getMonth();
    months[month] += 1;
  });

  const monthlyData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Bookings",
        data: months,
        backgroundColor: "#3b82f6"
      }
    ]
  };

  /* ===========================
     Destination Popularity
  =========================== */

  const destinationCount = {};

  bookings.forEach(b => {
    const name = b.destinationId?.title || "Unknown";
    destinationCount[name] = (destinationCount[name] || 0) + 1;
  });

  const popularityData = {
    labels: Object.keys(destinationCount),
    datasets: [
      {
        data: Object.values(destinationCount),
        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4"
        ]
      }
    ]
  };

  /* ===========================
     Latest Bookings
  =========================== */

  const latestBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  };

  return (
    <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh" }}>

      <h1 style={{ marginBottom: "25px" }}>Admin Dashboard</h1>

      {/* ======================
         Stats Cards
      ====================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Active Packages" value={stats.activePackages} />
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Cities" value={stats.totalCities} />
        <StatCard title="Activities" value={stats.totalActivities} />
        <StatCard title="Reviews" value={stats.totalReviews} />
        <StatCard title="Custom Tours" value={stats.customTours} />
        <StatCard title="Guides" value={stats.guides} />
        <StatCard title="Porters" value={stats.porters} />

      </div>

      {/* ======================
         Charts
      ====================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginBottom: "30px"
        }}
      >

        <div style={card}>
          <h3>Monthly Bookings</h3>
          <Bar data={monthlyData} />
        </div>

        <div style={card}>
          <h3>Destination Popularity</h3>
          <Doughnut data={popularityData} />
        </div>

      </div>

      {/* ======================
         Latest Bookings Table
      ====================== */}

      <div style={card}>

        <h3 style={{ marginBottom: "15px" }}>Latest Bookings</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={th}>User</th>
              <th style={th}>Destination</th>
              <th style={th}>Guests</th>
              <th style={th}>Status</th>
              <th style={th}>Date</th>
            </tr>
          </thead>

          <tbody>

            {latestBookings.map((b, i) => {
              console.log(b)
              return (
              
              <tr key={i}>
                <td style={td}>{b.userId?.username || "Guest"}</td>
                <td style={td}>{b.destinationId?.title || "N/A"}</td>
                <td style={td}>{b.travelerCount || "-"}</td>
                <td style={td}>{b.status}</td>
                <td style={td}>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "-"
                  }
                </td>
              </tr>
            )})}

          </tbody>

        </table>

      </div>

    </div>
  );
};

/* ======================
   Reusable Stat Card
====================== */

const StatCard = ({ title, value }) => (
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }}
  >
    <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
      {title}
    </div>
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {value}
    </div>
  </div>
);

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #e2e8f0"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #f1f5f9"
};

export default AdminDashboard;