import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { adminDashboard } from "../serveces/adminService";
import LoaderIcon from "./ui/loader";

const Dashboard = () => {
  const {
    data: adminData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: adminDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-20 h-20">
          <LoaderIcon />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-white text-xl font-extralight">An error occurred</h2>
      </div>
    );
  }

  const pieData = adminData.statusBreakdown.map((item) => ({
    id: item._id,
    label: item._id,
    value: item.count,
  }));

  const barData = adminData.topProducts.map((item) => ({
    name: item.name,
    "Quantity Sold": item.totalQuantitySold,
  }));

  const lineData = [
    {
      id: "Orders",
      color: "hsl(39, 70%, 50%)",
      data: adminData.ordersPerDay.map((order) => ({
        x: order.date,
        y: order.count,
      })),
    },
  ];

  return (
    <div className="p-6 grid gap-8 text-white">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={adminData.totalOrders} />
        <StatCard label="Total Sales" value={`₹${adminData.totalSales}`} />
        <StatCard label="New Users This Month" value={adminData.newUsersThisMonth} />
        <StatCard label="Avg Order Value" value={`₹${adminData.avgOrderValue}`} />
      </div>

      {/* Line Chart */}
      <div className="h-72 bg-zinc-800 rounded-xl p-4">
        <h3 className="text-lg mb-2">Orders Per Day</h3>
        <ResponsiveLine
          data={lineData}
          margin={{ top: 10, right: 30, bottom: 40, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          axisBottom={{ tickRotation: -30 }}
          colors={{ scheme: "nivo" }}
          enablePoints={true}
          pointSize={8}
          pointBorderWidth={2}
          useMesh={true}
          theme={{ textColor: "#fff", axis: { ticks: { text: { fill: "#fff" } } } }}
        />
      </div>

      {/* Pie Chart */}
      <div className="h-72 bg-zinc-800 rounded-xl p-4">
        <h3 className="text-lg mb-2">Order Status Breakdown</h3>
        <ResponsivePie
          data={pieData}
          margin={{ top: 10, right: 80, bottom: 40, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "set2" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#fff"
          arcLabelsTextColor="#000"
          theme={{ textColor: "#fff" }}
        />
      </div>

      {/* Bar Chart */}
      <div className="h-72 bg-zinc-800 rounded-xl p-4">
        <h3 className="text-lg mb-2">Top Products</h3>
        <ResponsiveBar
          data={barData}
          keys={["Quantity Sold"]}
          indexBy="name"
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          borderRadius={5}
          enableLabel={false}
          axisBottom={{ tickRotation: -20 }}
          theme={{ textColor: "#fff", axis: { ticks: { text: { fill: "#fff" } } } }}
        />
      </div>
    </div>
  );
};

// Simple stat card component
const StatCard = ({ label, value }) => (
  <div className="bg-zinc-800 p-4 rounded-xl shadow text-center">
    <h4 className="text-md text-gray-300">{label}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
