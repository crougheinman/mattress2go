import React, { useMemo } from 'react';

interface ProductDescriptionProps {
    description: string;
}

const ALLOWED_TAGS = new Set([
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li',
    'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'table',
    'thead', 'tbody', 'tr', 'th', 'td', 'figure', 'figcaption', 'div', 'span',
]);

const ALLOWED_ATTRS: Record<string, string[]> = {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['title']
};

const isSafeUrl = (url: string): boolean => {
    try {
        const normalized = url.trim();
        if (!normalized) {
            return false;
        }

        // allow relative URLs and safe protocols only
        if (normalized.startsWith('/') || normalized.startsWith('#')) {
            return true;
        }

        const parsed = new URL(normalized, window.location.origin);
        return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
    } catch {
        return false;
    }
};

const sanitizeNode = (node: Node, document: Document): Node | null => {
    if (node.nodeType === Node.TEXT_NODE) {
        return document.createTextNode(node.textContent || '');
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const element = node as HTMLElement;
    const tagName = element.tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tagName)) {
        const fragment = document.createDocumentFragment();
        element.childNodes.forEach((child) => {
            const sanitizedChild = sanitizeNode(child, document);
            if (sanitizedChild) {
                fragment.appendChild(sanitizedChild);
            }
        });
        return fragment;
    }

    const sanitizedElement = document.createElement(tagName);
    const allowedAttributes = [...(ALLOWED_ATTRS[tagName] || []), ...(ALLOWED_ATTRS['*'] || [])];

    for (const attr of Array.from(element.attributes || [])) {
        const name = attr.name.toLowerCase();
        const value = attr.value;
        if (!allowedAttributes.includes(name)) {
            continue;
        }

        if ((name === 'href' || name === 'src') && !isSafeUrl(value)) {
            continue;
        }

        if (name === 'target') {
            sanitizedElement.setAttribute('rel', 'nofollow noopener noreferrer');
        }

        sanitizedElement.setAttribute(name, value);
    }

    element.childNodes.forEach((child) => {
        const sanitizedChild = sanitizeNode(child, document);
        if (sanitizedChild) {
            sanitizedElement.appendChild(sanitizedChild);
        }
    });

    return sanitizedElement;
};

const sanitizeHtml = (html: string): string => {
    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');
    const body = document.body;
    const sanitizedFragment = document.createDocumentFragment();

    body.childNodes.forEach((child) => {
        const sanitized = sanitizeNode(child, document);
        if (sanitized) {
            sanitizedFragment.appendChild(sanitized);
        }
    });

    const container = document.createElement('div');
    container.appendChild(sanitizedFragment);
    return container.innerHTML;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const sanitizedDescription = useMemo(() => sanitizeHtml(description), [description]);

    return (
        <div className="product-description-content space-y-4 prose prose-sm text-gray-700" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    );
};

export default ProductDescription;
