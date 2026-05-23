import { Link } from 'react-router-dom';
import { SITE_NAME, HEADER_NAV_LINKS, HEADER_CTA_BUTTON, STORE_INFO } from '../constants';
import logo from '../assets/mattress2go-logo.png';
import { useState } from 'react';

const HeaderNav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className='bg-white'>
            <nav
                className='mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8'
                aria-label='Global'
            >
                <div className='flex lg:flex-1'>
                    <Link to='/' className='-m-1.5 p-1.5'>
                        <span className='sr-only'>{SITE_NAME}</span>
                        <img
                            className='h-8 w-auto'
                            src={logo}
                            alt='Mattress2Go Outlet Logo'
                        />
                    </Link>
                </div>
                <div className='hidden lg:flex lg:gap-x-12'>
                    {HEADER_NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.url}
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className='flex flex-1 items-center justify-end gap-x-6'>
                    <Link
                        to={HEADER_CTA_BUTTON.url}
                        className='hidden lg:inline-flex rounded-md bg-copa-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-copa-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-800'
                    >
                        {HEADER_CTA_BUTTON.name}
                    </Link>
                    <a className='hidden lg:flex hover:text-gray-900' href={`tel:${STORE_INFO.phone}`}>
                        <div className='flex gap-x-2'>
                            <dt className='flex-none'>
                                <span className='sr-only'>Telephone</span>
                                <svg
                                    className='h-7 w-6 text-black'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                                    />
                                </svg>
                            </dt>
                            <dd className="hidden sm:block">{STORE_INFO.phone}</dd>
                        </div>
                    </a>
                </div>

                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        onClick={() => setMobileMenuOpen(true)}
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                    >
                        <span className='sr-only'>Open main menu</span>
                        <svg
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            aria-hidden='true'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className='lg:hidden fixed inset-0 z-50 bg-white p-6'>
                    <div className='flex items-center justify-between'>
                        <img className='h-8 w-auto' src={logo} alt='Logo' />
                        <button
                            type='button'
                            onClick={() => setMobileMenuOpen(false)}
                            className='text-gray-700'
                        >
                            <span className='sr-only'>Close menu</span>
                            <svg
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                {HEADER_NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.url}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderNav;
