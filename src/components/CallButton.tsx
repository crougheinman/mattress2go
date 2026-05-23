import { STORE_INFO } from '../constants';

const CallButton = ({ phone = STORE_INFO.phone }: { phone?: string }) => {
    return (
        <a
            href={`tel:${phone}`}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center rounded-full bg-copa-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-copa-blue-500/20 transition hover:bg-copa-blue-800 focus:outline-none focus:ring-2 focus:ring-copa-blue-500 focus:ring-offset-2 lg:hidden"
        >
            <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5.25C3 4.007 4.007 3 5.25 3h1.5c.621 0 1.18.285 1.55.76l1.1 1.34c.34.415.42.99.2 1.49L8.03 8.91a.75.75 0 0 1-.7.5H6.75A2.25 2.25 0 0 0 4.5 11.66c.24 1.4 1.24 2.83 2.97 4.53 1.73 1.7 3.16 2.73 4.56 2.97a2.25 2.25 0 0 0 2.21-1.25v-1.3a.75.75 0 0 1 .5-.7l1.11-.33c.5-.15 1.07-.04 1.49.3l1.35 1.1c.47.37.76.93.76 1.55v1.5c0 1.243-1.007 2.25-2.25 2.25H18.75C8.335 21 3 15.665 3 5.25Z"
                />
            </svg>
            Call Us
        </a>
    );
};

export default CallButton;
