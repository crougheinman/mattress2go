import React from 'react';
import Layout from '../Layout';

const FinancingPage: React.FC = () => {
    return (
        <Layout title="Financing">
            <article className='max-w-3xl mx-auto px-4 py-16'>
                <h1 className='text-4xl text-center font-bold mb-12'>Financing</h1>
                <div className='prose prose-lg max-w-none leading-relaxed custom-content space-y-6'>
                    <section>
                        <h2 className='text-2xl font-bold mt-8 mb-4'>Flexible Financing at Mattress2Go Outlet</h2>
                        <p className='text-lg text-gray-700 leading-relaxed'>
                            At Mattress2Go Outlet, we believe that everyone deserves a good night's sleep without breaking the bank. We've partnered with trusted financial institutions to offer you a range of payment options that can help make your dream mattress or furniture a reality. Our flexible financing plans are designed to accommodate various budgets and preferences, ensuring you can enjoy your new purchase without financial stress.
                        </p>
                    </section>

                    <section>
                        <p className='text-lg text-gray-700'>
                            We're proud to present the following financing solutions:
                        </p>
                        <ol className='list-decimal pl-5 space-y-4 mt-4'>
                            {/* <li>
                                <a href="https://kafene.com/" className="underline text-zinc-900 hover:text-blue-800 font-bold">Kafene 90-Day Same as Cash</a>
                            </li>
                            <li>
                                <a href="https://www.acima.com/how-it-works" className="underline text-zinc-900 hover:text-blue-800 font-bold">Acima 90-Day Same as Cash</a>
                            </li>
                            <li>
                                <a href="https://progleasing.com/how-it-works" className="underline text-zinc-900 hover:text-blue-800 font-bold">Progressive Leasing</a>
                            </li> */}
                            <li>
                                <a href="https://www.synchrony.com/financing/credit-cards" className="underline text-zinc-900 hover:text-blue-800 font-bold">Synchrony Financing – 0% Interest, 0$ Down Payment</a>
                            </li>
                            <li>
                                <a href="/contact" className="underline text-zinc-900 hover:text-blue-800 font-bold">Up to 48 months 0% interest (Contact us for more information on this financing)</a>
                            </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className='text-2xl font-bold mt-8 mb-4'>Start Your Journey to Better Sleep Today</h2>
                        <p className='text-lg text-gray-700 leading-relaxed'>
                            At Mattress2Go Outlet, we're committed to providing not just quality products, but also a smooth and enjoyable shopping experience. Our diverse financing options are tailored to meet your individual needs, allowing you to focus on selecting the perfect mattress or furniture for your home. We invite you to visit our showroom to explore our collection and discuss our financing options in person. Alternatively, you can conveniently apply online for pre-approval on the plan that best suits your requirements.
                        </p>
                    </section>
                </div>
            </article>
        </Layout>
    );
};

export default FinancingPage;
