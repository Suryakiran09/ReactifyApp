import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BuyerLogin from './components/BuyerLogin';
import SellerLogin from './components/SellerLogin';
import Register from './components/Register';
import BuyerProperties from './pages/BuyerProperties';
import SellerProperties from './pages/SellerProperties';
import PropertyDetails from './components/PropertyDetails';
import PropertyForm from './components/PropertyForm';
import UpdateProperty from './pages/UpdateProperty';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<BuyerLogin />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <BuyerProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/properties"
          element={
            <ProtectedRoute>
              <SellerProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/properties/create"
          element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/:id/update"
          element={
            <ProtectedRoute>
              <UpdateProperty />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
