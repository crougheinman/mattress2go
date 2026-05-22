import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout';
import ProductDescription from '../components/ProductDescription';
import ProductImages from '../components/ProductImages';

interface ProductGalleryImage {
    id: string;
    product_id: string;
    original_file_name: string;
    name: string;
    type: string;
    extension: string;
    size: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    path: string;
}

interface ProductDetail {
    id: string;
    name: string;
    slug: string;
    brand_id: string;
    price: string;
    original_price?: string;
    description: string;
    comfort_level?: string;
    color?: string;
    size?: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    thumbnail_id?: string;
    brand_name?: string;
    brand_logo?: string;
    thumbnail_path?: string;
    gallery_images?: ProductGalleryImage[];
}

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!slug) {
            setError(true);
            setLoading(false);
            return;
        }

        const apiBase = import.meta.env.VITE_API_BASE_URL || '';

        axios
            .get(`${apiBase}/products`)
            .then((response) => {
                const listProducts = response.data?.data?.products || [];
                const matched = listProducts.find((item: any) => item.slug === slug);
                if (!matched) {
                    setError(true);
                    return;
                }

                return axios.get(`${apiBase}/products/${matched.id}`);
            })
            .then((response) => {
                if (!response) {
                    return;
                }

                const apiProduct = response.data?.data?.product;
                if (apiProduct) {
                    setProduct(apiProduct);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            // Cleanup if needed
        };
    }, [slug]);

    if (loading) {
        return (
            <Layout title="Loading...">
                <div className="py-16 text-center text-gray-600">Loading product...</div>
            </Layout>
        );
    }

    if (error || !product) {
        return <Navigate to="/shop" replace />;
    }

    const images = product.gallery_images?.map((image) => image.path) ?? [];

    return (
        <Layout title={`${product.name}`}>
            <div className='bg-white'>
                <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                    <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                        {/* Image gallery */}
                        <ProductImages images={images} alt={`${product.brand_name ?? ''} ${product.name}`} />

                        {/* Product info */}
                        <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                                {product.brand_name ? `${product.brand_name} - ` : ''}{product.name}
                            </h1>

                            <div className='mt-3'>
                                <h2 className='sr-only'>Product information</h2>
                                <p className='text-3xl tracking-tight text-gray-900'>
                                    {product.original_price && typeof product.price === 'string' && (
                                        <s className="mr-1">${product.original_price}</s>
                                    )}{' '}
                                    {product.price}
                                </p>
                            </div>

                            <div className='mt-6'>
                                <h3 className='sr-only'>Description</h3>
                                <ProductDescription description={product.description} />
                            </div>

                            <div className='mt-6'>
                                <div className='mt-10 flex'>
                                    <Link
                                        to="/contact"
                                        className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-copa-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-copa-blue-700 focus:outline-none focus:ring-2 focus:ring-copa-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
                                    >
                                        Call for Best Price
                                    </Link>
                                </div>
                            </div>

                            <section aria-labelledby='details-heading' className='mt-12'>
                                <h2 id='details-heading' className='sr-only'>Additional details</h2>

                                <div className='divide-y divide-gray-200 border-t'>
                                    <div>
                                        <span className='text-sm font-medium text-gray-900'>
                                            Details
                                        </span>
                                        <div className='prose prose-sm pb-6' id='disclosure-1'>
                                            <ul role='list'>
                                                {product.brand_name && <li>Brand: {product.brand_name}</li>}
                                                {product.name && <li>Model: {product.name}</li>}
                                                {product.size && <li>Size: {product.size}</li>}
                                                {product.comfort_level && <li>Comfort Level: {product.comfort_level}</li>}
                                                {product.color && <li>Color: {product.color}</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;
