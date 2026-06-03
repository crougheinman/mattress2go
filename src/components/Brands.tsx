import { useEffect, useState } from 'react';
import { SITE_NAME, BRANDS } from '../constants';
import apiClient from '../apiClient';

interface ApiBrand {
    id: number;
    name: string;
    url?: string | null;
    logo_path?: string | null;
}

const Brands = () => {
    const [apiBrands, setApiBrands] = useState<ApiBrand[] | null>(null);
    const [failed, setFailed] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let active = true;
        apiClient
            .get('/brands')
            .then((res) => { if (active) setApiBrands(res.data?.data?.brands ?? null); })
            .catch(() => { /* keep the static fallback */ });
        return () => { active = false; };
    }, []);

    // Prefer the admin-managed brands (with uploaded logos); fall back to the
    // bundled static list when the API is unavailable or returns nothing.
    const brands = apiBrands && apiBrands.length
        ? apiBrands.map((b) => ({ name: b.name, src: b.logo_path ?? null }))
        : BRANDS.map((b) => ({ name: b.name, src: `/brand-logos/${b.logo}` }));

    // Only render brands that actually have a logo image (and haven't failed to load).
    const visibleBrands = brands.filter((b) => b.src && !failed[b.name]);

    return (
        <div className='bg-gray-50 py-24 sm:py-32'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2'>
                    <div className='mx-auto w-full max-w-xl lg:mx-0'>
                        <span className='text-base font-semibold leading-7 text-copa-blue-700'>Trusted partners</span>
                        <h2 className='mt-2 text-3xl font-bold tracking-tight text-black'>
                            Brands We Carry
                        </h2>
                        <p className='mt-6 text-lg leading-8 text-gray-800'>
                            At {SITE_NAME}, we proudly offer a curated selection of top-tier mattress brands, including Beautyrest, Serta, Bed Gear, Puffy, and more. Experience the perfect combination of comfort and quality with trusted names designed to provide the best sleep and support for every budget.
                        </p>
                        <div className='mt-8 flex items-center gap-x-6'>
                            <a
                                href='/shop'
                                className='rounded-md bg-copa-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-copa-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-700'
                            >
                                Shop All Brands
                            </a>
                            <a href='/contact' className='text-sm font-semibold text-black'>
                                Contact us <span aria-hidden='true'>&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className='mx-auto grid w-full max-w-xl grid-cols-2 gap-8 sm:gap-10 lg:mx-0 lg:max-w-none lg:pl-8'>
                        {visibleBrands.map((brand) => (
                            <div key={brand.name} className='flex h-24 w-full items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md'>
                                <img
                                    className='max-h-16 max-w-45 object-contain'
                                    alt={`${brand.name} Logo`}
                                    src={brand.src as string}
                                    loading='lazy'
                                    onError={() => setFailed((f) => ({ ...f, [brand.name]: true }))}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;
