import { SITE_NAME } from '../constants';

const About = () => {
    return (
        <div className='relative bg-white'>
            <div className='mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end'>
                <div className='lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2'>
                    <div className='relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0'>
                        <img
                            className='absolute inset-0 h-full w-full bg-gray-50 object-cover'
                            src='https://www.inmaricopa.com/wp-content/uploads/2024/09/BCM_0485-1392x1044.jpg'
                            alt='Photo of Bruce and Cody Kiraly'
                        />
                    </div>
                </div>
                <div className='px-6 lg:contents'>
                    <div className='mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2'>
                        <p className='text-base font-semibold leading-7 text-copa-blue-700'>
                            More than just a mattress store
                        </p>
                        <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            An Inside Look Into The Heart of Maricopa's First Mattress Store
                        </h1>
                        <p className='mt-6 text-xl leading-8 text-gray-700'>
                            Welcome to <strong>{SITE_NAME}</strong>, Maricopa's very first
                            mattress and furniture store, proudly operated by a dedicated
                            father-daughter team, Bruce "Curly" Kiraly and his daughter, Cody. Our
                            family has deep roots in Arizona, and we're excited to bring our years
                            of expertise and passion for quality sleep to our community.
                        </p>
                        <div className='mt-10 max-w-xl text-base leading-7 text-gray-700 lg:max-w-none'>
                            <p>
                                In a city where residents have often had to drive long distances to
                                find mattresses, {SITE_NAME} is here to fill that gap. With over 90 years
                                of combined experience in the mattress industry, including our successful
                                Magic Mattress store in Tempe, we understand the importance of quality
                                sleep and are committed to providing premium mattresses at affordable
                                prices.
                            </p>
                            <p className='mt-8'>
                                Located in the heart of Maricopa at 44360 W. Edison Road, Suite 100,
                                our showroom spans 2,300 square feet and features an extensive
                                selection of mattresses from trusted brands like Beautyrest, Serta, and Puffy.
                                We’re also excited to introduce a variety of stylish name-brand furniture to complement your living space.
                            </p>
                            <p className='mt-8'>
                                Our mission is to serve the local community with unmatched
                                convenience and value. We’ve heard your requests for a mattress
                                store in Maricopa, and we’re here to deliver. Our friendly team,
                                including local resident Larry Davis as store manager, is ready to
                                assist you in finding the perfect sleep solution tailored to your
                                needs.
                            </p>
                            <p className='mt-8'>
                                Experience the comfort of shopping local and discover how we’re
                                redefining the mattress shopping experience in Maricopa. Whether you
                                visit us in-store or explore our virtual store, we promise to
                                provide competitive prices that rival big-box stores, ensuring you
                                find the perfect mattress without the long drive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
