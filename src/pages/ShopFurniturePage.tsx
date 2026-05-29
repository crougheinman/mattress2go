import { useEffect, useState } from 'react';
import apiClient from '../apiClient';
import Layout from '../Layout';
import ShopFurniturePageFilters from '../components/ShopFurniturePageFilters';
import type { FurnitureItem } from '../constants/furniture';
import { BRAND_ID_TO_NAME } from '../constants';

const ShopFurniturePage = () => {
    const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFurniture = async () => {
            try {
                const response = await apiClient.get('/products?category=Furniture');
                const apiProducts = response.data?.data?.products ?? [];

                const normalized: FurnitureItem[] = apiProducts.map((product: any) => ({
                    id: String(product.id ?? ''),
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
                    category: product.sub_category ?? '',
                    description: product.description ?? '',
                    dimensions: {
                        width: Number(product.width) || 0,
                        depth: Number(product.depth) || 0,
                        height: Number(product.height) || 0,
                        weight: Number(product.weight) || 0,
                    },
                    images: Array.isArray(product.gallery_images) && product.gallery_images.length
                        ? product.gallery_images.map((image: any) => image.path ?? image)
                        : product.thumbnail_path
                            ? [product.thumbnail_path]
                            : [],
                    thumbnail_path: product.thumbnail_path ?? '',
                    features: Array.isArray(product.features) ? product.features : [],
                }));

                setFurniture(normalized);
            } catch (err) {
                setError('Unable to load furniture at this time. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFurniture();
    }, []);

    return (
        <Layout title='Shop Furniture'>
            <div className='bg-white'>
                {error ? (
                    <div className='p-16 text-center text-red-600'>{error}</div>
                ) : (
                    <ShopFurniturePageFilters furniture={furniture} loading={loading} />
                )}
            </div>
        </Layout>
    );
};

export default ShopFurniturePage;
