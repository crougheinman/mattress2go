import { useEffect, useState, type FormEvent } from 'react';
import apiClient from '../apiClient';
import { SITE_NAME, STORE_INFO } from '../constants';
import Layout from '../Layout';

const Contact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [recaptchaReady, setRecaptchaReady] = useState(false);

    const RECAPTCHA_SITE_KEY = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY as string;
    const STORE_ID = Number(import.meta.env.VITE_APP_STORE_ID ?? 0);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
            setErrorMessage('Please complete all fields before sending your inquiry.');
            return;
        }

        setLoading(true);

        if (!RECAPTCHA_SITE_KEY) {
            setErrorMessage('reCAPTCHA is not configured. Please contact support.');
            setLoading(false);
            return;
        }

        if (!STORE_ID) {
            setErrorMessage('Store ID is not configured. Please contact support.');
            setLoading(false);
            return;
        }

        if (!recaptchaReady) {
            setErrorMessage('Please wait while reCAPTCHA loads and try again.');
            setLoading(false);
            return;
        }

        const executeRecaptcha = async () => {
            const grecaptcha = (window as any).grecaptcha;
            if (!grecaptcha || typeof grecaptcha.execute !== 'function') {
                throw new Error('reCAPTCHA is not ready.');
            }

            return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' });
        };

        try {
            const recaptchaToken = await executeRecaptcha();
            await apiClient.post('/inquiries', {
                firstname: firstName.trim(),
                lastname: lastName.trim(),
                emailaddress: email.trim(),
                phonenumber: phone.trim(),
                message: message.trim(),
                recaptcha_token: recaptchaToken,
                store_id: STORE_ID,
            });

            setSuccessMessage('Your inquiry was submitted successfully. We will be in touch soon.');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error: any) {
            const serverMessage = error?.response?.data?.message || 'Unable to submit your inquiry. Please try again later.';
            setErrorMessage(serverMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!RECAPTCHA_SITE_KEY) {
            return;
        }

        const existingScript = document.querySelector<HTMLScriptElement>(`script[src^="https://www.google.com/recaptcha/api.js?render="]`);
        if (existingScript) {
            if ((window as any).grecaptcha) {
                (window as any).grecaptcha.ready(() => setRecaptchaReady(true));
            }
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if ((window as any).grecaptcha) {
                (window as any).grecaptcha.ready(() => setRecaptchaReady(true));
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [RECAPTCHA_SITE_KEY]);

    return (
        <Layout title="Contact Us">
            <div className='relative isolate bg-white'>
                <div className='mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
                    <div className='relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48'>
                        <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
                            <div className='absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2'>
                                <svg
                                    className='absolute inset-0 h-full w-full stroke-gray-200 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]'
                                    aria-hidden='true'
                                >
                                    <defs>
                                        <pattern
                                            id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
                                            width='200'
                                            height='200'
                                            x='100%'
                                            y='-1'
                                            patternUnits='userSpaceOnUse'
                                        >
                                            <path d='M130 200V.5M.5 .5H200' fill='none'></path>
                                        </pattern>
                                    </defs>
                                    <rect width='100%' height='100%' strokeWidth='0' fill='white'></rect>
                                    <svg x='100%' y='-1' className='overflow-visible fill-gray-50'>
                                        <path d='M-470.5 0h201v201h-201Z' strokeWidth='0'></path>
                                    </svg>
                                    <rect
                                        width='100%'
                                        height='100%'
                                        strokeWidth='0'
                                        fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
                                    ></rect>
                                </svg>
                            </div>
                            <span className='text-base font-semibold leading-7 text-copa-blue-700'>Contact us</span>
                            <h2 className='mt-2 text-3xl font-bold tracking-tight text-gray-900'>Get in touch</h2>
                            <p className='mt-6 text-lg leading-8 text-gray-600'>
                                Have a question about {SITE_NAME}? Feel free to visit us or get in
                                touch with our contact information below or use the form to message
                                the store directly.
                            </p>
                            <dl className='mt-10 space-y-4 text-base leading-7 text-gray-600'>
                                <div className='flex items-center gap-x-4'>
                                    <dt className='flex-none'>
                                        <span className='sr-only'>Address</span>
                                        <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-copa-blue-50 text-copa-blue-700'>
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
                                                    d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
                                                ></path>
                                            </svg>
                                        </span>
                                    </dt>
                                    <dd>{STORE_INFO.address}</dd>
                                </div>
                                <div className='flex items-center gap-x-4'>
                                    <dt className='flex-none'>
                                        <span className='sr-only'>Telephone</span>
                                        <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-copa-blue-50 text-copa-blue-700'>
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
                                                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                                                ></path>
                                            </svg>
                                        </span>
                                    </dt>
                                    <dd>
                                        <a className='hover:text-gray-900' href={`tel:${STORE_INFO.phone}`}>
                                            {STORE_INFO.phone}
                                        </a>
                                    </dd>
                                </div>
                                <div className='flex items-center gap-x-4'>
                                    <dt className='flex-none'>
                                        <span className='sr-only'>Email</span>
                                        <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-copa-blue-50 text-copa-blue-700'>
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
                                                    d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                                                ></path>
                                            </svg>
                                        </span>
                                    </dt>
                                    <dd>
                                        <a className='hover:text-gray-900' href={`mailto:${STORE_INFO.email}`}>
                                            {STORE_INFO.email}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'>
                        <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
                            {errorMessage && (
                                <div className='mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
                                    {errorMessage}
                                </div>
                            )}
                            {!recaptchaReady && (
                                <div className='mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700'>
                                    Loading reCAPTCHA verification. Please wait before submitting.
                                </div>
                            )}
                            {successMessage ? (
                                <div className='rounded-4xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm'>
                                    <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm'>
                                        <svg className='h-10 w-10 text-emerald-600' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                        </svg>
                                    </div>
                                    <h3 className='mt-6 text-2xl font-semibold text-gray-900'>Message sent</h3>
                                    <p className='mt-4 text-sm leading-6 text-gray-600'>
                                        {successMessage}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                                        <div>
                                            <label htmlFor='first-name' className='block text-sm font-semibold leading-6 text-gray-900'>
                                                First name
                                            </label>
                                            <div className='mt-2.5'>
                                                <input
                                                    type='text'
                                                    name='first-name'
                                                    id='first-name'
                                                    autoComplete='given-name'
                                                    value={firstName}
                                                    onChange={(event) => setFirstName(event.target.value)}
                                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-copa-blue-600 sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='last-name' className='block text-sm font-semibold leading-6 text-gray-900'>
                                                Last name
                                            </label>
                                            <div className='mt-2.5'>
                                                <input
                                                    type='text'
                                                    name='last-name'
                                                    id='last-name'
                                                    autoComplete='family-name'
                                                    value={lastName}
                                                    onChange={(event) => setLastName(event.target.value)}
                                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-copa-blue-600 sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
                                                Email
                                            </label>
                                            <div className='mt-2.5'>
                                                <input
                                                    type='email'
                                                    name='email'
                                                    id='email'
                                                    autoComplete='email'
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-copa-blue-600 sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <label htmlFor='phone-number' className='block text-sm font-semibold leading-6 text-gray-900'>
                                                Phone number
                                            </label>
                                            <div className='mt-2.5'>
                                                <input
                                                    type='tel'
                                                    name='phone-number'
                                                    id='phone-number'
                                                    autoComplete='tel'
                                                    value={phone}
                                                    onChange={(event) => setPhone(event.target.value)}
                                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-copa-blue-600 sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <label htmlFor='message' className='block text-sm font-semibold leading-6 text-gray-900'>
                                                Message
                                            </label>
                                            <div className='mt-2.5'>
                                                <textarea
                                                    name='message'
                                                    id='message'
                                                    rows={4}
                                                    value={message}
                                                    onChange={(event) => setMessage(event.target.value)}
                                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-copa-blue-600 sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex justify-end'>
                                        <button
                                            type='submit'
                                            disabled={loading}
                                            className='w-full rounded-md bg-copa-blue-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-copa-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                                        >
                                            {loading ? 'Sending...' : 'Send message'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
