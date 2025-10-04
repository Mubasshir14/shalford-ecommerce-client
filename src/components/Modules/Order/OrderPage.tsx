/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getUserCart } from "@/components/Services/Cart";
import { createOrder } from "@/components/Services/Order";
import { Input } from "@/components/ui/input";
import { useUser } from "@/components/context/UserContext";

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  size: string;
  color: string;
  totalPrice: number;
}

interface CreateOrderData {
  product: {
    product: string;
    quantity: number;
    unitPrice: number;
    color: string;
    size: string;
  }[];
  totalAmount: number;
  deliveryCharge: number;
  contact?: string;
  specification?: string;
  district: string;
  upzilla: string;
  shippingAddress: string;
  paymentMethod: "COD" | "Online";
}

interface DistrictData {
  [key: string]: string[];
}

// Bangladesh Districts and Upazilas data
const bangladeshData: DistrictData = {
  Dhaka: [
    "Dhamrai",
    "Dohar",
    "Keraniganj",
    "Nawabganj",
    "Savar",
    "Tejgaon",
    "Kalukhali",
    "Shajahanpur",
    "Indurkani",
    "Bhedarganj",
    "Madaripur",
    "Shariatpur",
  ],
  Faridpur: [
    "Alfadanga",
    "Bhanga",
    "Boalmari",
    "Charbhadrasan",
    "Faridpur Sadar",
    "Madhukhali",
    "Nagarkanda",
    "Sadarpur",
    "Saltha",
  ],
  Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
  Gopalganj: [
    "Gopalganj Sadar",
    "Kashiani",
    "Kotalipara",
    "Muksudpur",
    "Tungipara",
  ],
  Kishoreganj: [
    "Austagram",
    "Bajitpur",
    "Bhairab",
    "Hossainpur",
    "Itna",
    "Karimganj",
    "Katiadi",
    "Kishoreganj Sadar",
    "Kuliarchar",
    "Mithamain",
    "Nikli",
    "Pakundia",
    "Tarail",
  ],
  Madaripur: ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
  Manikganj: [
    "Daulatpur",
    "Ghior",
    "Harirampur",
    "Manikganj Sadar",
    "Saturia",
    "Shivalaya",
    "Singair",
  ],
  Munshiganj: [
    "Gazaria",
    "Lohajang",
    "Munshiganj Sadar",
    "Sreenagar",
    "Tongibari",
  ],
  Narayanganj: [
    "Araihazar",
    "Bandar",
    "Narayanganj Sadar",
    "Rupganj",
    "Sonargaon",
  ],
  Narsingdi: ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Shibpur"],
  Rajbari: [
    "Baliakandi",
    "Goalandaghat",
    "Pangsha",
    "Rajbari Sadar",
    "Kalukhali",
  ],
  Shariatpur: [
    "Bhedarganj",
    "Damudya",
    "Gosairhat",
    "Naria",
    "Shariatpur Sadar",
    "Zajira",
  ],
  Tangail: [
    "Basail",
    "Bhuapur",
    "Delduar",
    "Dhanbari",
    "Ghatail",
    "Gopalpur",
    "Kalihati",
    "Madhupur",
    "Mirzapur",
    "Nagarpur",
    "Sakhipur",
    "Tangail Sadar",
  ],
  // Chittagong Division
  Chattogram: [
    "Anwara",
    "Banshkhali",
    "Boalkhali",
    "Chandanaish",
    "Fatikchhari",
    "Hathazari",
    "Lohagara",
    "Mirsharai",
    "Patiya",
    "Rangunia",
    "Raozan",
    "Sandwip",
    "Satkania",
    "Sitakunda",
    "Chattogram Sadar",
  ],

  "Cox's Bazar": [
    "Chakaria",
    "Cox's Bazar Sadar",
    "Kutubdia",
    "Maheshkhali",
    "Ramu",
    "Teknaf",
    "Ukhia",
  ],

  Bandarban: [
    "Bandarban Sadar",
    "Thanchi",
    "Ruma",
    "Lama",
    "Rowangchhari",
    "Alikadam",
  ],

  Khagrachhari: [
    "Dighinala",
    "Khagrachhari Sadar",
    "Lakshmichhari",
    "Mahalchhari",
    "Manikchhari",
    "Panchhari",
    "Ramgarh",
  ],

  Rangamati: [
    "Baghaichhari",
    "Belaichhari",
    "Kaptai",
    "Juraichhari",
    "Rangamati Sadar",
  ],

  // Rajshahi Division
  Bogra: [
    "Adamdighi",
    "Bogra Sadar",
    "Dhunat",
    "Dhupchanchia",
    "Gabtali",
    "Kahaloo",
    "Nandigram",
    "Sariakandi",
    "Shibganj",
    "Sherpur",
  ],

  Joypurhat: ["Akkelpur", "Joypurhat Sadar", "Khetlal", "Panchbibi"],

  Naogaon: [
    "Badalgachhi",
    "Manda",
    "Naogaon Sadar",
    "Niamatpur",
    "Patnitala",
    "Porsha",
    "Raninagar",
    "Sapahar",
    "Atrai",
    "Dhamoirhat",
    "Mohadevpur",
  ],

  Natore: [
    "Bagatipara",
    "Baraigram",
    "Gurudaspur",
    "Lalpur",
    "Natore Sadar",
    "Singra",
  ],

  Pabna: [
    "Atghoria",
    "Bera",
    "Bhangura",
    "Chatmohar",
    "Faridpur",
    "Ishwardi",
    "Pabna Sadar",
    "Santhia",
    "Sujanagar",
  ],

  Rajshahi: [
    "Bagha",
    "Bagmara",
    "Charghat",
    "Durgapur",
    "Godagari",
    "Mohanpur",
    "Paba",
    "Puthia",
    "Tanore",
  ],

  Sirajganj: [
    "Belkuchi",
    "Chauhali",
    "Raiganj",
    "Shahjadpur",
    "Sarkhanda",
    "Sirajganj Sadar",
    "Tarash",
    "Ullahpara",
  ],

  // Khulna Division
  Bagerhat: [
    "Bagerhat Sadar",
    "Chitalmari",
    "Fakirhat",
    "Kachua",
    "Mollahat",
    "Mongla",
    "Morrelganj",
    "Rampal",
    "Sarankhola",
  ],

  Chuadanga: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],

  Jessore: [
    "Abhaynagar",
    "Bagharpara",
    "Chaugachha",
    "Jessore Sadar",
    "Jhikargacha",
    "Keshabpur",
    "Manirampur",
    "Sharsha",
  ],

  Jhenaidah: [
    "Harinakunda",
    "Jhenaidah Sadar",
    "Kaliganj",
    "Kotchandpur",
    "Maheshpur",
    "Shailkupa",
  ],

  Khulna: [
    "Batiaghata",
    "Dacope",
    "Dumuria",
    "Dighalia",
    "Koyra",
    "Paikgachha",
    "Phultala",
    "Rupsa",
    "Terokhada",
    "Khulna Sadar",
  ],

  Kushtia: [
    "Bheramara",
    "Khoksa",
    "Kumarkhali",
    "Kushtia Sadar",
    "Mirpur",
    "Daulatpur",
  ],

  Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],

  Meherpur: ["Meherpur Sadar", "Gangni", "Mujibnagar"],

  Narail: ["Narail Sadar", "Lohagara", "Kalia"],

  Satkhira: [
    "Assasuni",
    "Debhata",
    "Kalaroa",
    "Kaliganj",
    "Satkhira Sadar",
    "Shyamnagar",
    "Tala",
  ],

  // Barisal Division
  Barguna: ["Amtali", "Barguna Sadar", "Bamna", "Patharghata", "Taltali"],

  Barisal: [
    "Agailjhara",
    "Babuganj",
    "Bakerganj",
    "Banaripara",
    "Gaurnadi",
    "Hizla",
    "Mehendiganj",
    "Muladi",
    "Barisal Sadar",
    "Wazirpur",
  ],

  Bhola: [
    "Bhola Sadar",
    "Burhanuddin",
    "Char Fasson",
    "Lalmohan",
    "Manpura",
    "Tazumuddin",
  ],

  Jhalokathi: ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"],

  Patuakhali: [
    "Bauphal",
    "Dashmina",
    "Galachipa",
    "Kalapara",
    "Mirzaganj",
    "Patuakhali Sadar",
    "Rangabali",
    "Dumki",
  ],

  Pirojpur: [
    "Bhandaria",
    "Kawkhali",
    "Mathbaria",
    "Nesarabad",
    "Pirojpur Sadar",
    "Zianagar",
  ],

  // Sylhet Division
  Habiganj: [
    "Ajmiriganj",
    "Baniyachong",
    "Bahubal",
    "Chunarughat",
    "Habiganj Sadar",
    "Lakhai",
    "Madhabpur",
    "Nabiganj",
  ],

  Moulvibazar: [
    "Barlekha",
    "Kamalganj",
    "Kulaura",
    "Moulvibazar Sadar",
    "Rajnagar",
    "Sreemangal",
    "Juri",
  ],

  Sunamganj: [
    "Bishwamvarpur",
    "Chhatak",
    "Derai",
    "Dharamapasha",
    "Dowarabazar",
    "Jagannathpur",
    "Jamalganj",
    "Sullah",
    "Sunamganj Sadar",
    "Tahirpur",
  ],

  Sylhet: [
    "Balaganj",
    "Beanibazar",
    "Bishwanath",
    "Companiganj",
    "Fenchuganj",
    "Golapganj",
    "Gowainghat",
    "Jaintiapur",
    "Kanaighat",
    "Osmani Nagar",
    "Sylhet Sadar",
    "Zakiganj",
  ],

  // Rangpur Division
  Dinajpur: [
    "Birampur",
    "Biral",
    "Birganj",
    "Bochaganj",
    "Chirirbandar",
    "Dinajpur Sadar",
    "Ghoraghat",
    "Hakimpur",
    "Kaharole",
    "Khansama",
    "Nawabganj",
    "Parbatipur",
  ],

  Gaibandha: [
    "Palashbari",
    "Sadullapur",
    "Saghata",
    "Phulchhari",
    "Gobindaganj",
    "Fulchhari",
    "Gaibandha Sadar",
    "Sundarganj",
  ],

  Kurigram: [
    "Bhurungamari",
    "Char Rajibpur",
    "Chilmari",
    "Phulbari",
    "Kurigram Sadar",
    "Nageshwari",
    "Rajarhat",
    "Ulipur",
  ],

  Lalmonirhat: [
    "Aditmari",
    "Hatibandha",
    "Kaliganj",
    "Lalmonirhat Sadar",
    "Patgram",
  ],

  Nilphamari: [
    "Dimla",
    "Domar",
    "Jaldhaka",
    "Kishoreganj",
    "Nilphamari Sadar",
    "Saidpur",
  ],

  Panchagarh: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],

  Rangpur: [
    "Badarganj",
    "Gangachara",
    "Kaunia",
    "Mithapukur",
    "Pirgachha",
    "Pirganj",
    "Taraganj",
    "Rangpur Sadar",
  ],

  Thakurgaon: [
    "Baliadangi",
    "Haripur",
    "Pirganj",
    "Ranisankail",
    "Thakurgaon Sadar",
  ],

  // Mymensingh Division
  Jamalpur: [
    "Baksiganj",
    "Dewanganj",
    "Islampur",
    "Jamalpur Sadar",
    "Madarganj",
    "Melandaha",
    "Sarishabari",
  ],

  Mymensingh: [
    "Bhaluka",
    "Dhobaura",
    "Fulbaria",
    "Gaffargaon",
    "Gouripur",
    "Haluaghat",
    "Ishwarganj",
    "Muktagachha",
    "Nandail",
    "Phulpur",
    "Trishal",
    "Tara Khanda",
    "Mymensingh Sadar",
  ],

  Netrokona: [
    "Atpara",
    "Barhatta",
    "Durgapur",
    "Kalmakanda",
    "Kendua",
    "Mohanganj",
    "Netrokona Sadar",
    "Purbadhala",
    "Dharmapasha",
  ],

  Sherpur: ["Jhenaigati", "Nalitabari", "Sherpur Sadar", "Sreebardi"],

  // Comilla / Cumilla Districts (Chattogram Division)
  Comilla: [
    "Barura",
    "Brahmanpara",
    "Burichang",
    "Chandina",
    "Chauddagram",
    "Daudkandi",
    "Debidwar",
    "Homna",
    "Laksam",
    "Manoharganj",
    "Meghna",
    "Muradnagar",
    "Nangalkot",
    "Titas",
    "Comilla Sadar",
  ],

  Feni: [
    "Chhagalnaiya",
    "Daganbhuiyan",
    "Feni Sadar",
    "Parshuram",
    "Fulgazi",
    "Sonaimuri",
  ],

  Brahmanbaria: [
    "Brahmanbaria Sadar",
    "Ashuganj",
    "Nabinagar",
    "Kasba",
    "Bancharampur",
    "Sarail",
    "Bijoynagar",
    "Chandpur",
  ],

  Chandpur: [
    "Chandpur Sadar",
    "Haimchar",
    "Kachua",
    "Matlab Uttar",
    "Matlab Dakkhin",
    "Shahrasti",
  ],

  Lakshmipur: [
    "Lakshmipur Sadar",
    "Raipur",
    "Ramganj",
    "Ramgati",
    "Kamalnagar",
  ],

  Noakhali: [
    "Begumganj",
    "Chatkhil",
    "Companiganj",
    "Hatiya",
    "Noakhali Sadar",
    "Senbagh",
    "Sonaimuri",
    "Subarnachar",
  ],
};

const OrderPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [paymentMethod] = useState<"Online">("Online");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [specification, setSpecification] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");
  const { user } = useUser();
  // Fetch cart items
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getUserCart();
      setCartItems(data.data || []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedUpazila("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryCharge = 150;
  const totalAmount = subtotal + deliveryCharge;

  useEffect(() => {
    if (user?.phone) {
      console.log(user?.phone);
      setContact(user.phone);
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!contact.trim()) {
      toast.error("Please enter contact number");
      return;
    }

    if (!selectedDistrict || !selectedUpazila || !shippingAddress.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);

    try {
      const orderData: CreateOrderData = {
        product: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          unitPrice: item.product.price,
          color: item.color,
          size: item.size,
        })),
        totalAmount,
        deliveryCharge,
        contact: contact.replace(/[\s-]/g, ""),
        specification,
        district: selectedDistrict,
        upzilla: selectedUpazila,
        shippingAddress,
        paymentMethod,
      };
      const result = await createOrder(orderData);

      if (paymentMethod === "Online" && result?.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      } else {
        toast.success("Order placed successfully!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl font-semibold text-amber-700">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            className="p-2 rounded-full border-amber-300 hover:bg-amber-100"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-full">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">
                  Shipping Information
                </h2>
              </div>

              <div className="space-y-6">
                {/* District Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="district"
                    className="text-sm font-semibold text-gray-700"
                  >
                    District *
                  </Label>
                  <Select
                    onValueChange={handleDistrictChange}
                    value={selectedDistrict}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border-amber-200 focus:border-amber-400">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(bangladeshData).map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Upazila Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="upazila"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Upazila *
                  </Label>
                  <Select
                    onValueChange={setSelectedUpazila}
                    value={selectedUpazila}
                    disabled={!selectedDistrict}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border-amber-200 focus:border-amber-400">
                      <SelectValue placeholder="Select your upazila" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedDistrict &&
                        bangladeshData[selectedDistrict]?.map((upazila) => (
                          <SelectItem key={upazila} value={upazila}>
                            {upazila}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Shipping Address */}
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Detailed Address *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address (House/Road/Area)"
                    className="min-h-[100px] rounded-xl border-amber-200 focus:border-amber-400 resize-none"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </div>

                {/* Specification */}
                <div className="space-y-2">
                  <Label
                    htmlFor="specification"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Detailed specification *
                  </Label>
                  <Textarea
                    id="specification"
                    placeholder="Enter your full specification (write if any custom order need)"
                    required
                    className="min-h-[100px] rounded-xl border-amber-200 focus:border-amber-400 resize-none"
                    value={specification}
                    onChange={(e) => setSpecification(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contact"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Contact Number *
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Enter contact number (01XXXXXXXXX or +8801XXXXXXXXX)"
                    className={`rounded-xl border-amber-200 focus:border-amber-400 ${
                      contactError ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      setContactError("");
                    }}
                  />
                  {contactError && (
                    <p className="text-sm text-red-600 mt-1">{contactError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            {/* <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-full">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">
                  Payment Method
                </h2>
              </div>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: "COD" | "Online") => setPaymentMethod(value)}
              >
                <div className="flex items-center space-x-3 p-4 border border-amber-200 rounded-xl hover:bg-amber-50 transition-colors">
                  <RadioGroupItem
                    value="Online"
                    id="online"
                    className="text-amber-600"
                  />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Online Payment
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay securely with SSL Commerz
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Secure
                        </span>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-amber-200 rounded-xl hover:bg-amber-50 transition-colors">
                  <RadioGroupItem
                    value="COD"
                    id="cod"
                    className="text-amber-600"
                  />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay when you receive your order
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div> */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-full">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">
                  Payment Method
                </h2>
              </div>

              <div className="p-4 border-2 border-amber-300 bg-amber-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-amber-800 text-lg">
                      Online Payment
                    </p>
                    <p className="text-amber-700">
                      Pay securely with SSL Commerz
                    </p>
                    <p className="text-sm text-amber-600 mt-1">
                      ✓ Secure • ✓ Fast • ✓ Reliable
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                      Selected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-3 bg-amber-50/50 rounded-xl"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.product.images[0] ||
                          "https://via.placeholder.com/64"
                        }
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-amber-700">
                        Tk.{item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-semibold">
                    Tk.{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-semibold">
                    Tk.{deliveryCharge.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-amber-100/50 px-4 rounded-xl">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    Tk.{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={
                  submitting ||
                  !selectedDistrict ||
                  !selectedUpazila ||
                  !shippingAddress.trim() ||
                  !contact.trim()
                }
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    Place Order
                  </div>
                )}
              </Button>

              {/* Security Notice */}
              <div className="flex items-start gap-3 mt-6 p-4 bg-blue-50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Secure Checkout</p>
                  <p>
                    Your payment information is encrypted and secure. We never
                    store your payment details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
