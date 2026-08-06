# Inventory Manager

A full-stack MERN Inventory Management application that allows users to create accounts, securely log in, and manage product inventory.

Users can add, view, edit, delete, search, filter, and sort products through a responsive React interface connected to an Express and MongoDB backend.

---

## Features

### Authentication
- User registration
- User login
- JWT authentication
- Protected routes
- Logout functionality
- Persistent user sessions

### Inventory Management
- Add products
- View all products
- Edit products
- Delete products
- Search products by name or SKU
- Filter products by category
- Sort products by name, price, and quantity

### User Experience
- Responsive design
- Loading indicators
- Error messages
- Form validation
- Custom 404 page

---

## Technologies Used

### Frontend
- React
- React Router
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## Project Structure
 
 ## Installation

### Clone the repository

```bash
git clone <repository-url>
cd Knight_Cahlaija_InventoryManager_Capstone
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add the following:

```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### Open the Application

After both servers are running, open the URL shown by Vite (typically `http://localhost:5173`) in your browser.

### Default Workflow

1. Register a new account.
2. Log in with your credentials.
3. Add products to the inventory.
4. Edit existing products.
5. Delete products.
6. Search, filter, and sort products.
7. Log out when finished.
