import React, { useState } from 'react';

const PLACEHOLDER_SRC = '/shop-placeholder.png';

interface ProductImagesProps {
    images: string[];
    alt: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, alt }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState({ x: 50, y: 50 });

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = e.currentTarget;
        if (!img.src.includes(PLACEHOLDER_SRC)) {
            img.src = PLACEHOLDER_SRC;
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        setTransformOrigin({ x, y });
    };

    const hasImages = images && images.length > 0;
    const displayImages = hasImages ? images : [PLACEHOLDER_SRC];
    const imageSrc = displayImages[selectedImage] || PLACEHOLDER_SRC;

    const showThumbnails = hasImages && images.length > 1;

    return (
        <div className="flex flex-col">
            {/* Main image display */}
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-100">
                <div
                    role="tabpanel"
                    aria-labelledby={`tabs-${selectedImage}-tab`}
                    tabIndex={0}
                    className="h-full w-full"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                >
                    <img
                        src={imageSrc}
                        alt={`${alt} ${selectedImage + 1}`}
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out"
                        onError={handleError}
                        style={{
                            transformOrigin: `${transformOrigin.x}% ${transformOrigin.y}%`,
                            transform: isZoomed ? 'scale(1.25)' : 'scale(1)',
                        }}
                    />
                </div>
            </div>

            {/* Thumbnail selector */}
            {showThumbnails && (
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <div
                        className="grid grid-cols-4 gap-6"
                        aria-orientation="horizontal"
                        role="tablist"
                    >
                        {images.map((image, index) => (
                            <button
                                key={index}
                                id={`tabs-${index}-tab`}
                                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                aria-controls={`tabs-${index}-panel`}
                                role="tab"
                                type="button"
                                onClick={() => setSelectedImage(index)}
                                aria-selected={selectedImage === index}
                            >
                                <span className="sr-only">Product image {index + 1}</span>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                    <img
                                        src={image}
                                        alt={`${alt} ${index + 1}`}
                                        className="h-full w-full object-cover object-center"
                                        onError={handleError}
                                    />
                                </span>
                                <span
                                    className={`pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 ${selectedImage === index ? 'ring-copa-blue-500' : 'ring-transparent'
                                        }`}
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductImages;
