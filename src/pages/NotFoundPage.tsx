import { Link } from 'react-router-dom';
import Layout from '../Layout';

const NotFoundPage = () => {
    return (
        <Layout title="Page Not Found">
            <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
                <p className="text-base font-semibold text-copa-blue-700">404</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600 text-center">
                    Sorry, we couldn&apos;t find the page you were looking for.
                </p>
                <Link
                    to="/"
                    className="mt-10 inline-flex rounded-md bg-copa-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-copa-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-600"
                >
                    Back to home
                </Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;