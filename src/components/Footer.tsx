import { Link } from 'react-router-dom';
import { FOOTER_LINKS, SOCIALS, SITE_NAME } from '../constants';
import type { FooterLink, FooterSection } from '../types';
import logo from '../assets/mattress2go-logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const isFooterSection = (item: any): item is FooterSection => {
        return 'links' in item;
    };

    const renderFooterItem = (item: FooterLink | FooterSection) => {
        if (isFooterSection(item)) {
            return (
                <div key={item.label} className="mt-10 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">{item.label}</h3>
                    <ul className="mt-6 space-y-4">
                        {item.links.map((subItem, index) => {
                            if (isFooterSection(subItem)) {
                                return (
                                    <li key={`${subItem.label}-${index}`}>
                                        <span className="text-sm font-semibold leading-6 text-gray-900">{subItem.label}</span>
                                        <ul className="mt-2 space-y-2">
                                            {subItem.links.map((nestedItem) => renderFooterItem(nestedItem))}
                                        </ul>
                                    </li>
                                );
                            }
                            return renderFooterItem(subItem);
                        })}
                    </ul>
                </div>
            );
        }
        return (
            <li key={item.label}>
                {item.href.startsWith('http') || item.href.startsWith('mailto') || item.href.startsWith('tel') ? (
                    <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.label}
                    </a>
                ) : (
                    <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.label}
                    </Link>
                )}
            </li>
        );
    };
    return (
        <footer className="bg-olive-300" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <img className="h-12 w-auto" src={logo} alt={SITE_NAME} />
                        <p className="text-sm leading-6 text-gray-600">
                            Mattress2Go: Sleep Better Starts Here
                        </p>
                        <div className="flex space-x-6">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.type}
                                    href={social.url}
                                    className="text-gray-400 hover:text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: social.icon }}
                                >
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-3">
                        {FOOTER_LINKS.map((section) => (
                            <div key={section.label} className="md:grid md:grid-cols-1 md:gap-8">
                                {renderFooterItem(section)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; {currentYear} - Built by <a
                            href="https://gdyportfolio.vercel.app/"
                            className="underline">Greg</a> - All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
