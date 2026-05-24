import { Link } from 'react-router-dom'

type ProductCardItem = {
    name: string
    slug: string
    brand: string
    thumbnail_path?: string
    images?: string[]
    comfortLevel?: string
    price?: string | number
    originalPrice?: number
}

interface ProductCardProps {
    product: ProductCardItem
    to: string
    imageSrc?: string
    priceLabel?: string
    showBrand?: boolean
    showComfort?: boolean
}

const PLACEHOLDER_SRC = '/shop-placeholder.png'

const ProductCard = ({
    product,
    to,
    imageSrc,
    priceLabel,
    showBrand = true,
    showComfort = true,
}: ProductCardProps) => {
    const thumbnail = imageSrc || product.thumbnail_path || product.images?.[0] || PLACEHOLDER_SRC

    const renderPrice = () => {
        if (priceLabel) {
            return priceLabel
        }

        const priceValue = product.price
        if (priceValue === undefined || priceValue === null || priceValue === '') {
            return 'Call Store For Pricing'
        }
        const parsedPrice = typeof priceValue === 'number' ? priceValue : Number(priceValue)

        if (!Number.isNaN(parsedPrice)) {
            return product.originalPrice && typeof product.price === 'number'
                ? `$${product.originalPrice.toLocaleString()} $${parsedPrice.toLocaleString()}`
                : `$${parsedPrice.toLocaleString()}`
        }

        return String(priceValue)
    }

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                    src={thumbnail}
                    alt={product.name}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        if (!img.src.includes(PLACEHOLDER_SRC)) {
                            img.src = PLACEHOLDER_SRC
                        }
                    }}
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link to={to}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <div className="flex flex-1 flex-col justify-end">
                    {showBrand && (
                        <p className="text-sm text-gray-500">{product.brand}</p>
                    )}
                    {showComfort && (
                        <span className="text-sm text-gray-500">{product.comfortLevel}</span>
                    )}
                    <p className="text-base font-medium text-gray-900 mt-3">
                        {renderPrice()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
