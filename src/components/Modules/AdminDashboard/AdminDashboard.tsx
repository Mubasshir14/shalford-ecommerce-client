/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTotalPaymentOrder } from "@/components/Services/Dashboard";
import { getStatusBasedOrders } from "@/components/Services/Order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Box,
  Grid as Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface Product {
  size?: string;
  quantity: number;
  unitPrice: number;
  product: { _id: string; name: string; description: string; images: string[] };
}

interface Order {
  _id: string;
  products?: Product[];
  totalAmount: number;
  status: string;
  createdAt: string;
  user: { _id: string; name: string; email: string };
}

interface Payment {
  _id: string;
  amount: number;
  createdAt: string;
  order: Order | string;
  status: string;
  transactionId: string;
  user: { _id: string; name: string; email: string };
}

const AdminDashboard = () => {
  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [processingOrders, setProcessingOrders] = useState<any[]>([]);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          paymentDataResult,
          pendingResult,
          processingResult,
          completedResult,
          cancelledResult,
        ] = await Promise.all([
          getTotalPaymentOrder(),
          getStatusBasedOrders("Pending"),
          getStatusBasedOrders("Processing"),
          getStatusBasedOrders("Completed"),
          getStatusBasedOrders("Cancelled"),
        ]);

        setPaymentData(paymentDataResult.data || []);
        setPendingOrders(pendingResult.data || []);
        setProcessingOrders(processingResult.data || []);
        setCompletedOrders(completedResult.data || []);
        setCancelledOrders(cancelledResult.data || []);
      } catch (err: any) {
        setError("Failed to fetch data");
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate Metrics
  const totalAmount = paymentData.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const totalQuantity = completedOrders.reduce((sum, order) => {
    if (typeof order.order === "object" && order.order?.products) {
      return (
        sum +
        order.order.products.reduce((q:any, p:any) => q + (p.quantity || 0), 0)
      );
    }
    return sum;
  }, 0);

  const sizeDistribution = completedOrders.reduce((acc: Record<string, number>, order) => {
    if (typeof order.order === "object" && order.order?.products) {
      order.order.products.forEach((product:any) => {
        const size = product.size || "Unknown";
        acc[size] = (acc[size] || 0) + (product.quantity || 0);
      });
    }
    return acc;
  }, {});

  const pieData = [
    { id: 0, label: "Pending", value: pendingOrders.length, color: "#FFA726" },
    { id: 1, label: "Processing", value: processingOrders.length, color: "#42A5F5" },
    { id: 2, label: "Completed", value: completedOrders.length, color: "#66BB6A" },
    { id: 3, label: "Cancelled", value: cancelledOrders.length, color: "#EF5350" },
  ];

  const TOTAL = pieData.reduce((sum, item) => sum + item.value, 0);
  const getArcLabel = (params: any) => {
    if (TOTAL === 0) return "0%";
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  // Size Chart Data
  const sizeChartData = Object.entries(sizeDistribution).map(
    ([size, quantity]) => ({
      label: size,
      value: quantity,
    })
  );

  const sparklineData = paymentData
    .map((payment) => ({
      time: new Date(payment.createdAt).getTime(),
      amount: payment.amount || 0,
    }))
    .sort((a, b) => a.time - b.time)
    .map((item) => item.amount);

  const dailyRevenueMap = paymentData.reduce((acc: Record<string, number>, payment) => {
    const date = new Date(payment.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + (payment.amount || 0);
    return acc;
  }, {});

  const dailyRevenueData = Object.entries(dailyRevenueMap)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" color="error">
            ⚠️ {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          📊 Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Real-time business insights and analytics
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Status Cards */}
          {[
            {
              title: "Pending Orders",
              count: pendingOrders.length,
              color: "#FFA726",
              icon: <PendingActionsIcon sx={{ fontSize: 40 }} />,
              bgGradient: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
            },
            {
              title: "Processing",
              count: processingOrders.length,
              color: "#42A5F5",
              icon: <AutorenewIcon sx={{ fontSize: 40 }} />,
              bgGradient: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
            },
            {
              title: "Completed",
              count: completedOrders.length,
              color: "#66BB6A",
              icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
              bgGradient: "linear-gradient(135deg, #66BB6A 0%, #43A047 100%)",
            },
            {
              title: "Cancelled",
              count: cancelledOrders.length,
              color: "#EF5350",
              icon: <CancelIcon sx={{ fontSize: 40 }} />,
              bgGradient: "linear-gradient(135deg, #EF5350 0%, #E53935 100%)",
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  background: item.bgGradient,
                  color: "white",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {item.count}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 64, height: 64 }}>
                      {item.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Total Amount & Quantity */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AttachMoneyIcon sx={{ fontSize: 48, mr: 2 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Revenue
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      ৳{totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`${paymentData.length} Transactions`}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <InventoryIcon sx={{ fontSize: 48, mr: 2 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Products Sold
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {totalQuantity.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  icon={<ShoppingCartIcon />}
                  label="Units Delivered"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📌 Order Status Distribution
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box display="flex" justifyContent="center" alignItems="center">
                  <PieChart
                    series={[
                      {
                        data: pieData,
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                        arcLabel: getArcLabel,
                        innerRadius: 40,
                        outerRadius: 120,
                        paddingAngle: 2,
                        cornerRadius: 8,
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                    }}
                    width={400}
                    height={320}
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={2} mt={2} flexWrap="wrap">
                  {pieData.map((item) => (
                    <Chip
                      key={item.id}
                      label={`${item.label}: ${item.value}`}
                      sx={{ bgcolor: item.color, color: "white", fontWeight: "bold" }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Line Chart - Daily Revenue */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📈 Daily Revenue Trend (Last 7 Days)
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {dailyRevenueData.length > 0 ? (
                  <LineChart
                    xAxis={[
                      {
                        scaleType: "point",
                        data: dailyRevenueData.map((d) => d.date),
                      },
                    ]}
                    series={[
                      {
                        data: dailyRevenueData.map((d) => d.amount),
                        area: true,
                        color: "#667eea",
                        label: "Revenue (BDT)",
                      },
                    ]}
                    width={500}
                    height={280}
                    margin={{ left: 70, right: 20, top: 20, bottom: 40 }}
                    grid={{ vertical: true, horizontal: true }}
                  />
                ) : (
                  <Typography align="center" color="text.secondary">
                    No revenue data available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Bar Chart - Size Distribution */}
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📏 Size-Wise Sales Distribution
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {sizeChartData.length > 0 ? (
                  <Box display="flex" justifyContent="center">
                    <BarChart
                      xAxis={[
                        {
                          scaleType: "band",
                          data: sizeChartData.map((item) => item.label),
                          categoryGapRatio: 0.3,
                        },
                      ]}
                      series={[
                        {
                          data: sizeChartData.map((item) => item.value),
                          color: "#42A5F5",
                          label: "Quantity Sold",
                        },
                      ]}
                      width={800}
                      height={350}
                      margin={{ left: 60, right: 20, top: 40, bottom: 60 }}
                      grid={{ horizontal: true }}
                    />
                  </Box>
                ) : (
                  <Typography align="center" color="text.secondary">
                    No size data available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Sparkline Charts */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ⚡ Payment Amount Sparkline
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {sparklineData.length > 0 ? (
                  <SparkLineChart
                    data={sparklineData}
                    height={150}
                    showTooltip
                    showHighlight
                    // colors={["#667eea"]}
                    curve="natural"
                  />
                ) : (
                  <Typography align="center" color="text.secondary">
                    No data available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📊 Payment Bar Sparkline
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {sparklineData.length > 0 ? (
                  <SparkLineChart
                    plotType="bar"
                    data={sparklineData}
                    height={150}
                    showTooltip
                    // colors={["#f5576c"]}
                  />
                ) : (
                  <Typography align="center" color="text.secondary">
                    No data available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Order Timeline */}
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🕒 Recent Order Timeline
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {paymentData.length === 0 ? (
                  <Typography align="center" color="text.secondary">
                    No orders available
                  </Typography>
                ) : (
                  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                    {paymentData.slice(0, 10).map((payment, index) => (
                      <Paper
                        key={index}
                        elevation={1}
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: 2,
                          borderLeft: "4px solid #42A5F5",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateX(8px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              Order #{" "}
                              {typeof payment.order === "string"
                                ? payment.order.slice(-8)
                                : payment.order?._id?.slice(-8) || "N/A"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(payment.createdAt).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </Typography>
                          </Box>
                          <Chip
                            label={`৳${payment.amount || 0}`}
                            color="primary"
                            sx={{ fontWeight: "bold", fontSize: "1rem" }}
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;