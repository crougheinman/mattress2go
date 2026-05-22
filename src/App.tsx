import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FinancingPage from './pages/FinancingPage';
import ShopFurniturePage from './pages/ShopFurniturePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop-furniture" element={<ShopFurniturePage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/financing" element={<FinancingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* Add more routes here as they are created */}
        </Routes>
    )
}

export default App
