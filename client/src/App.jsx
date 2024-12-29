import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logout from "./pages/Logout";
import Adminlayout from "./components/layouts/Admin-layout";
import AdminUsers from "./pages/Admin-User";
import AdminContact from "./pages/Admin-Contact";
import AdminUpdate from "./pages/Admin-Update";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// New component where useLocation() is used
function AppRoutes() {
  const location = useLocation();

  // Function to check if navbar should be hidden
  const showNavbar = () => {
    const hiddenNavbarRoutes = ["/admin"];
    return !hiddenNavbarRoutes.some((route) =>
      location.pathname.startsWith(route)
    );
  };

  return (
    <div className="bg-slate-800 w-screen text-white">
      {/* Conditionally render the Navbar */}
      {showNavbar() && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Adminlayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="contacts" element={<AdminContact />} />
        </Route>

        {/* Catch-all Route (Error page) */}
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
