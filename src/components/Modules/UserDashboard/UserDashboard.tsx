


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getUserOrders } from "@/components/Services/Order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TimelineIcon from "@mui/icons-material/Timeline";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  deliveryCharge?: number;
  products?: Array<{
    quantity: number;
    unitPrice: number;
    size?: string;
    product: { _id: string; name: string; description: string; images: string[] };
  }>;
}

interface Payment {
  _id: string;
  amount: number;
  createdAt: string;
  order: Order | string;
  status: string;
  transactionId: string;
  method: string;
  user: { _id: string; name: string; email: string };
}

const UserDashboard = () => {
  const [orders, setOrders] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUserOrders();
        console.log(response.data);
        setOrders(response.data || []);
      } catch (err) {
        const errorMessage = "Failed to fetch orders. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate Metrics
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  const statusDistribution = orders.reduce(
    (acc: Record<string, number>, payment) => {
      const status = payment.order && typeof payment.order === "object" ? payment.order.status : "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieData = [
    { id: 0, label: "Pending", value: statusDistribution["Pending"] || 0, color: "#FFB74D" },
    { id: 1, label: "Processing", value: statusDistribution["Processing"] || 0, color: "#64B5F6" },
    { id: 2, label: "Completed", value: statusDistribution["Completed"] || 0, color: "#81C784" },
    { id: 3, label: "Cancelled", value: statusDistribution["Cancelled"] || 0, color: "#E57373" },
  ];

  const TOTAL = pieData.reduce((sum, item) => sum + item.value, 0);
  const getArcLabel = (params: any) => {
    if (TOTAL === 0) return "0%";
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Paper elevation={6} sx={{ p: 6, textAlign: "center", borderRadius: 4, bgcolor: "#fff" }}>
          <Typography variant="h5" color="error" gutterBottom>
            ⚠️ {error}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please try refreshing the page or contact support.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6, bgcolor: "#f8f9fc", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: "left" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1a237e",
            mb: 1,
          }}
        >
          Your Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your orders, spending, and activity
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={500}>
          <CircularProgress size={80} thickness={5} color="primary" />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* KPI Cards */}
          {[
            {
              title: "Total Orders",
              count: totalOrders,
              color: "#fff",
              icon: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
              bgColor: "#3f51b5",
            },
            {
              title: "Pending",
              count: statusDistribution["Pending"] || 0,
              color: "#fff",
              icon: <PendingActionsIcon sx={{ fontSize: 32 }} />,
              bgColor: "#FFB74D",
            },
            {
              title: "Processing",
              count: statusDistribution["Processing"] || 0,
              color: "#fff",
              icon: <AutorenewIcon sx={{ fontSize: 32 }} />,
              bgColor: "#64B5F6",
            },
            {
              title: "Completed",
              count: statusDistribution["Completed"] || 0,
              color: "#fff",
              icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
              bgColor: "#81C784",
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Tooltip title={`${item.title}: ${item.count}`} arrow>
                <Card
                  sx={{
                    backgroundColor: item.bgColor,
                    color: item.color,
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.85 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="h4" fontWeight={600}>
                        {item.count}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.15)", width: 48, height: 48 }}>
                      {item.icon}
                    </Avatar>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}

          {/* Total Amount Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                bgcolor: "#fff",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: "#3f51b5", mr: 2 }}>
                    <AttachMoneyIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Total Spent
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} color="primary">
                  ৳{totalAmount.toLocaleString()}
                </Typography>
                <Chip
                  icon={<ShoppingCartIcon />}
                  label={`${totalOrders} Orders`}
                  size="small"
                  sx={{ mt: 2, bgcolor: "#e8eaf6", color: "#3f51b5" }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart - Order Status Distribution */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                bgcolor: "#fff",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: "#e3f2fd", mr: 2 }}>
                    <TimelineIcon color="primary" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Order Status Distribution
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                  <PieChart
                    series={[
                      {
                        data: pieData,
                        arcLabel: getArcLabel,
                        innerRadius: 50,
                        outerRadius: 140,
                        paddingAngle: 3,
                        cornerRadius: 6,
                        // highlightScope: { faded: "global", highlighted: "item" },
                        faded: { innerRadius: 50, additionalRadius: -30, color: "gray" },
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: "white",
                        fontSize: 14,
                        fontWeight: "medium",
                      },
                    }}
                    width={400}
                    height={300}
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={1.5} flexWrap="wrap">
                  {pieData.map((item) => (
                    <Chip
                      key={item.id}
                      label={`${item.label}: ${item.value}`}
                      sx={{ bgcolor: item.color, color: "white", fontWeight: "medium" }}
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders Table */}
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                bgcolor: "#fff",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: "#e0f7fa", mr: 2 }}>
                    <TimelineIcon color="info" />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Orders
                  </Typography>
                </Box>
                {orders.length === 0 ? (
                  <Typography align="center" color="text.secondary" variant="body1">
                    No orders found
                  </Typography>
                ) : (
                  <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: "auto" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((payment, index) => (
                          <TableRow
                            key={index}
                            hover
                            sx={{
                              "&:hover": {
                                backgroundColor: "#f5f5f5",
                              },
                            }}
                          >
                            <TableCell>{payment.transactionId}</TableCell>
                            <TableCell>
                              {new Date(payment.createdAt).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </TableCell>
                            <TableCell>৳{payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Chip
                                label={typeof payment.order === "object" ? payment.order.status : "Unknown"}
                                color={
                                  typeof payment.order === "object" && payment.order.status === "Completed"
                                    ? "success"
                                    : typeof payment.order === "object" && payment.order.status === "Pending"
                                    ? "warning"
                                    : typeof payment.order === "object" && payment.order.status === "Processing"
                                    ? "info"
                                    : "error"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{payment.method || "N/A"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default UserDashboard;
