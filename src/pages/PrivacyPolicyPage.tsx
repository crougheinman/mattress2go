import Layout from '../Layout';
import { SITE_NAME } from '../constants';

const PrivacyPolicyPage = () => {
    return (
        <Layout title="Privacy Policy">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Last updated: October, 16 2024
                    </p>
                    <section className="mt-12 space-y-10 text-base leading-7 text-gray-600">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
                            <p className="mt-4">
                                {SITE_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (the "Site") or interact with our services.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">2. Information We Collect</h2>
                            <p className="mt-4">
                                We collect information in two ways:
                            </p>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">2.1 Information You Provide to Us</h3>
                                    <p className="mt-2">
                                        We collect information that you voluntarily provide to us when you fill out forms on our Site. This may include:
                                    </p>
                                    <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-600">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Address</li>
                                        <li>Any other information you choose to provide</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">2.2 Information We Collect Automatically</h3>
                                    <p className="mt-2">
                                        When you visit our Site, we automatically collect certain information about your device and usage of the Site. We use Google Analytics to help us understand how our customers use the Site. The information collected through Google Analytics includes:
                                    </p>
                                    <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-600">
                                        <li>IP address</li>
                                        <li>Browser type</li>
                                        <li>Device type</li>
                                        <li>Operating system</li>
                                        <li>Pages viewed</li>
                                        <li>Time spent on pages</li>
                                        <li>Referring website</li>
                                        <li>Geographic location (country and city level)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">3. How We Use Your Information</h2>
                            <p className="mt-4">
                                We use the information we collect to:
                            </p>
                            <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-600">
                                <li>Respond to your inquiries and fulfill your requests</li>
                                <li>Improve our Site and services</li>
                                <li>Analyze usage patterns and trends</li>
                                <li>Send you marketing communications (with your consent)</li>
                                <li>Protect against fraudulent or illegal activity</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">4. Sharing of Your Information</h2>
                            <p className="mt-4">
                                We do not sell or rent your personal information to third parties. We may share your information with:
                            </p>
                            <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-600">
                                <li>Service providers who assist us in operating our business (e.g., website hosting, data analysis)</li>
                                <li>Law enforcement or other governmental entities when required by law</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">5. Your Rights and Choices</h2>
                            <p className="mt-4">
                                You have the right to:
                            </p>
                            <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-600">
                                <li>Access, correct, or delete your personal information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Disable cookies through your browser settings</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">6. Data Security</h2>
                            <p className="mt-4">
                                We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">7. Changes to This Privacy Policy</h2>
                            <p className="mt-4">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">8. Contact Us</h2>
                            <p className="mt-4">
                                If you have any questions about this Privacy Policy, please contact us at our contact page.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicyPage;