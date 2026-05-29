import { Icon } from '@iconify/react';
import { FEATURES, SITE_NAME } from '../constants';
import { Link } from 'react-router-dom';

const Features = () => {
    return (
        <div className='bg-white py-24 sm:py-32' id='features'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl lg:mx-0'>
                    <span className='text-base font-semibold leading-7 text-copa-blue-700'>Why choose us</span>
                    <h2 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        Reasons we are the best
                    </h2>
                    <p className='mt-6 text-lg leading-8 text-gray-600'>
                        These are what separates us from the rest. Read below to see what our
                        customers love most about {SITE_NAME}.
                    </p>
                </div>
                <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
                    <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4'>
                        {FEATURES.map((feature, index) => (
                            <div key={index} className='group relative rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200 transition-all duration-200 hover:bg-gray-100 hover:shadow-md'>
                                <dt className='flex flex-col gap-6 text-base font-semibold leading-7 text-gray-900'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-copa-blue-700 transition-transform duration-200 group-hover:scale-110'>
                                        <Icon icon={feature.icon} className='h-6 w-6 text-white' />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                                    <p className='mt-6'>
                                        {feature.url && (
                                            <Link
                                                to={feature.url}
                                                className='inline-flex items-center text-sm font-semibold leading-6 text-copa-blue-700 transition-colors duration-200 hover:text-copa-blue-800'
                                            >
                                                {feature.linkText}
                                                <span aria-hidden='true' className='ml-1 transition-transform duration-200 group-hover:translate-x-1'>→</span>
                                            </Link>
                                        )}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};
export default Features;
