import { useEffect, useState } from 'react';
import axios from 'axios';
import ShopPageFilters from '../components/ShopPageFilters';
import Layout from '../Layout';
import type { Product } from '../types';
import { BRAND_ID_TO_NAME } from '../constants';

const ShopPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
                const response = await axios.get(`${apiBaseUrl}/products`);
                const apiProducts = response.data?.data?.products ?? [];

                const normalizedProducts: Product[] = apiProducts.map((product: any) => ({
                    name: product.name ?? '',
                    slug: product.slug ?? '',
                    brand: (() => {
                        const rawBrand = product.brand ?? product.brand_id ?? 'Unknown';
                        const rawBrandString = String(rawBrand);
                        const matchedId = Number(rawBrandString);

                        if (product.brand_name) {
                            return String(product.brand_name);
                        }

                        if (!Number.isNaN(matchedId) && String(matchedId) === rawBrandString) {
                            return BRAND_ID_TO_NAME[matchedId] ?? rawBrandString;
                        }

                        return rawBrandString;
                    })(),
                    price: product.price ?? '',
                    description: product.description ?? '',
                    thumbnail_path: product.thumbnail_path ?? '',
                    images: Array.isArray(product.gallery_images) && product.gallery_images.length
                        ? product.gallery_images
                        : [product.brand_logo ? `/brand-logos/${product.brand_logo}` : 'https://via.placeholder.com/600x400?text=No+Image'],
                    comfortLevel: product.comfort_level ?? product.comfortLevel ?? '',
                    color: product.color ?? '',
                    size: product.size ?? '',
                    originalPrice: product.original_price ?? product.originalPrice,
                }));

                setProducts(normalizedProducts);
            } catch (err) {
                setError('Unable to load products at this time. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Layout title="Shop Mattress">
            <div className='bg-white'>
                {error ? (
                    <div className='p-16 text-center text-red-600'>{error}</div>
                ) : (
                    <ShopPageFilters products={products} loading={loading} />
                )}
            </div>
        </Layout>
    );
};

export default ShopPage;
