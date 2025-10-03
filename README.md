

# 🛒  **[Ecommerce Shop Website ](https://shalford-client.vercel.app/)** 
  
## 🚀 Features  

### 👤 User Features  
- 🔍 Search & browse products  
- ⭐ Product rating & review system  
- 🛒 Place orders with SSLCommerz (sandbox/live)  
- 📜 View order history  
- 🚚 Track order status in real-time  
- 📧 Get order confirmation & updates via email  

### 🛠️ Admin Features  
- ➕ Add new products  
- ✏️ Update product details  
- 📦 Manage orders  
- 📊 Real-time dashboard with:  
  - Total orders  
  - Total sales  
  - Total revenue (chart view)  

---

## 🔑 Authentication & Security  
- **JWT-based Authentication** (secure login & protected routes)  
- **Role-based Access Control** (Admin/User separation)  

---

## 💳 Payment Integration  
- Integrated with **[SSLCommerz](https://www.sslcommerz.com/)** (Sandbox currently used)  
- Supports **order confirmation & payment verification**  

---

## 📧 Email Notifications  
- Users receive emails for:  
  - Order placed confirmation  
  - Order details with delivery info  
  - Status updates for each order step  

---

## 🖥️ Tech Stack  

**Frontend:**  
- Next.js 15  
- React 19  
- Redux Toolkit  
- TailwindCSS 4  
- Framer Motion (animations)  
- MUI, Radix UI, PrimeReact (UI components)  
- Chart.js, React Chartjs-2 (charts & analytics)  

**Backend (API):**  
- **Node.js** 
- **JWT Authentication**  
- **SSLCommerz integration**  
- **Nodemailer (email system)**
- **Express.js**: For creating the server and APIs.
- **MongoDB**: Database management using Mongoose.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Cloudinary**: Cloud-based media storage and management.
- **Zod**: Schema validation with static type inference (shared with frontend).  

---
## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mubasshir14/shalford-ecommerce-client.git
   ```
   ```bash
   cd shalford-ecommerce-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the root directory and configure your environment variables:
   ```bash
    NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
    NEXT_PUBLIC_WHATSAPP_NUMBER=+8801XXXXXXXXX
   NEXT_PUBLIC_BASE_FRONTEND_API=http://localhost:3000
   ```

## 📂 Project Structure  
```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂(withCommonLayout)
 ┃ ┃ ┣ 📂cancel
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂contact
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂failed
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂faq
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂female
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂forget-password
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂learn
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂men
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂privacy
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂products
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂register
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂reset-password
 ┃ ┃ ┃ ┗ 📂[token]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂success
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂terms
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂unisex
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(WithDashboardLayout)
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📂add-product
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂cancelled-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂completed-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-banner
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-category
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-featured
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-gallery
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-newsletter
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-onsale
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-popup
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-product
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-user
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂order-details
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂pending-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂processing-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂product-details
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂track-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂update-product
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂order-details
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂track-order
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📜globals.css
 ┃ ┗ 📜layout.tsx
 ┣ 📂assets
 ┃ ┣ 📜13.png
 ┃ ┣ 📜3.png
 ┃ ┣ 📜4.png
 ┃ ┣ 📜banner1.png
 ┃ ┣ 📜banner2.jpg
 ┃ ┣ 📜banner3.png
 ┃ ┣ 📜banner4.webp
 ┃ ┣ 📜Blazer.jpeg
 ┃ ┣ 📜casual-shirt.jpg
 ┃ ┣ 📜company.png
 ┃ ┣ 📜formalshirt.webp
 ┃ ┣ 📜hoodie.jpg
 ┃ ┣ 📜jeans.jpg
 ┃ ┣ 📜jersey.jpg
 ┃ ┣ 📜Joggers.jpeg
 ┃ ┣ 📜key1.jpeg
 ┃ ┣ 📜key2.jpeg
 ┃ ┣ 📜key3.jpeg
 ┃ ┣ 📜key4.jpeg
 ┃ ┣ 📜logi.png
 ┃ ┣ 📜logo.png
 ┃ ┣ 📜men.png
 ┃ ┣ 📜mug1.jpeg
 ┃ ┣ 📜mug2.jpeg
 ┃ ┣ 📜mug3.jpeg
 ┃ ┣ 📜mug4s.jpeg
 ┃ ┣ 📜newsletter.png
 ┃ ┣ 📜pant.jpg
 ┃ ┣ 📜polo.png
 ┃ ┣ 📜popup.jpg
 ┃ ┣ 📜popup23.png
 ┃ ┣ 📜Shorts.jpeg
 ┃ ┣ 📜support.png
 ┃ ┣ 📜Sweatshirt.jpeg
 ┃ ┣ 📜tshirt.webp
 ┃ ┣ 📜unisex.png
 ┃ ┗ 📜womenr.png
 ┣ 📂components
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜UserContext.tsx
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📂sidebar
 ┃ ┃ ┃ ┣ 📜app-sidebar.tsx
 ┃ ┃ ┃ ┣ 📜nav-main.tsx
 ┃ ┃ ┃ ┗ 📜nav-user.tsx
 ┃ ┣ 📂Layout
 ┃ ┃ ┗ 📜PageLayout.tsx
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┃ ┣ 📜Providers.tsx
 ┃ ┃ ┃ ┗ 📜StoreProvider.tsx
 ┃ ┃ ┣ 📂redux
 ┃ ┃ ┃ ┣ 📜hooks.ts
 ┃ ┃ ┃ ┣ 📜storage.ts
 ┃ ┃ ┃ ┗ 📜store.ts
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂Modules
 ┃ ┃ ┣ 📂AdminDashboard
 ┃ ┃ ┃ ┗ 📜AdminDashboard.tsx
 ┃ ┃ ┣ 📂Banner
 ┃ ┃ ┃ ┗ 📜Banner.tsx
 ┃ ┃ ┣ 📂Cart
 ┃ ┃ ┃ ┗ 📜Cart.tsx
 ┃ ┃ ┣ 📂Category
 ┃ ┃ ┃ ┗ 📜Category.tsx
 ┃ ┃ ┣ 📂FeaturedOnSale
 ┃ ┃ ┃ ┣ 📜ManageFeaturedProduct.tsx
 ┃ ┃ ┃ ┗ 📜ManageOnSaleProduct.tsx
 ┃ ┃ ┣ 📂Gallery
 ┃ ┃ ┃ ┗ 📜Gallery.tsx
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┃ ┗ 📜Login.tsx
 ┃ ┃ ┣ 📂ManageUser
 ┃ ┃ ┃ ┗ 📜ManageUser.tsx
 ┃ ┃ ┣ 📂Newsletter
 ┃ ┃ ┃ ┣ 📜ManageNewsletter.tsx
 ┃ ┃ ┃ ┗ 📜NewsLetterComponents.tsx
 ┃ ┃ ┣ 📂Order
 ┃ ┃ ┃ ┣ 📜ManageCancelledOrder.tsx
 ┃ ┃ ┃ ┣ 📜ManageCompletedOrder.tsx
 ┃ ┃ ┃ ┣ 📜ManagePendingOrderAmin.tsx
 ┃ ┃ ┃ ┣ 📜ManageProcessingOrder.tsx
 ┃ ┃ ┃ ┣ 📜ManageUserOrder.tsx
 ┃ ┃ ┃ ┣ 📜OrderDetails.tsx
 ┃ ┃ ┃ ┣ 📜OrderPage.tsx
 ┃ ┃ ┃ ┗ 📜TrackOrder.tsx
 ┃ ┃ ┣ 📂Others
 ┃ ┃ ┃ ┣ 📜OtherProduct.tsx
 ┃ ┃ ┃ ┗ 📜OtherProductCard.tsx
 ┃ ┃ ┣ 📂Password
 ┃ ┃ ┃ ┣ 📜ForgetPassword.tsx
 ┃ ┃ ┃ ┗ 📜ResetPassword.tsx
 ┃ ┃ ┣ 📂Popup
 ┃ ┃ ┃ ┗ 📜Popup.tsx
 ┃ ┃ ┣ 📂Product
 ┃ ┃ ┃ ┣ 📂AllProductSub
 ┃ ┃ ┃ ┃ ┣ 📜AllProductSub.tsx
 ┃ ┃ ┃ ┃ ┗ 📜AllProductSubCard.tsx
 ┃ ┃ ┃ ┣ 📂Featured
 ┃ ┃ ┃ ┃ ┣ 📜FeaturedProductCard.tsx
 ┃ ┃ ┃ ┃ ┗ 📜FeaturedProductCarousel.tsx
 ┃ ┃ ┃ ┣ 📂OnSale
 ┃ ┃ ┃ ┃ ┣ 📜OnsaleProduct.tsx
 ┃ ┃ ┃ ┃ ┗ 📜OnSaleProductCard.tsx
 ┃ ┃ ┃ ┣ 📂ProductPage
 ┃ ┃ ┃ ┃ ┣ 📜AllProductCard.tsx
 ┃ ┃ ┃ ┃ ┗ 📜ProductPage.tsx
 ┃ ┃ ┃ ┣ 📜AddProduct.tsx
 ┃ ┃ ┃ ┣ 📜ManageProduct.tsx
 ┃ ┃ ┃ ┣ 📜ProductDetails.tsx
 ┃ ┃ ┃ ┣ 📜ProductDetailsAdmin.tsx
 ┃ ┃ ┃ ┗ 📜UpdateProduct.tsx
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┃ ┗ 📜ReviewSection.tsx
 ┃ ┃ ┣ 📂ShowProduct
 ┃ ┃ ┃ ┣ 📜Men.tsx
 ┃ ┃ ┃ ┣ 📜Unisex.tsx
 ┃ ┃ ┃ ┗ 📜Women.tsx
 ┃ ┃ ┣ 📂Sidebar
 ┃ ┃ ┃ ┗ 📜Sidebar.tsx
 ┃ ┃ ┗ 📂UserDashboard
 ┃ ┃ ┃ ┗ 📜UserDashboard.tsx
 ┃ ┣ 📂Services
 ┃ ┃ ┣ 📂Banner
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Cart
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Category
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Dashboard
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Gallery
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂NewsLetter
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Order
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Password
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Popup
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Product
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Subscriber
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂User
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📂Gallery
 ┃ ┃ ┃ ┗ 📜Gallery.tsx
 ┃ ┃ ┣ 📂HeroSection
 ┃ ┃ ┃ ┣ 📜HeroHelper.tsx
 ┃ ┃ ┃ ┗ 📜HeroSection.tsx
 ┃ ┃ ┣ 📂NewsLetter
 ┃ ┃ ┃ ┣ 📜AdvertizerNewsLetter.tsx
 ┃ ┃ ┃ ┗ 📜NewsLetterHelper.tsx
 ┃ ┃ ┣ 📂Popup
 ┃ ┃ ┃ ┗ 📜Popup.tsx
 ┃ ┃ ┣ 📂Support
 ┃ ┃ ┃ ┗ 📜SupportIcon.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜NavBar.tsx
 ┃ ┃ ┗ 📜NavClient.tsx
 ┃ ┣ 📂Types
 ┃ ┃ ┣ 📜District.ts
 ┃ ┃ ┣ 📜Product.ts
 ┃ ┃ ┣ 📜ProtectedRoutes.ts
 ┃ ┃ ┗ 📜User.ts
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📂core
 ┃ ┃ ┃ ┣ 📂NMImageUploader
 ┃ ┃ ┃ ┃ ┣ 📜ImagePreviewer.tsx
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂NMModal
 ┃ ┃ ┃ ┃ ┗ 📜DeleteConfirmationModal.tsx
 ┃ ┃ ┃ ┣ 📂NMTable
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜TablePagination.tsx
 ┃ ┃ ┃ ┣ 📜CategoryCard.tsx
 ┃ ┃ ┃ ┣ 📜NMContainer.tsx
 ┃ ┃ ┃ ┗ 📜ProductCard.tsx
 ┃ ┃ ┣ 📜avatar.tsx
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜carousel.tsx
 ┃ ┃ ┣ 📜collapsible.tsx
 ┃ ┃ ┣ 📜dialog.tsx
 ┃ ┃ ┣ 📜dropdown-menu.tsx
 ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┣ 📜radio-group.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┣ 📜separator.tsx
 ┃ ┃ ┣ 📜sheet.tsx
 ┃ ┃ ┣ 📜sidebar.tsx
 ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┣ 📜table.tsx
 ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┗ 📜tooltip.tsx
 ┣ 📂hooks
 ┃ ┗ 📜use-mobile.ts
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┗ 📜middleware.ts 
```

## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---