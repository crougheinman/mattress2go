'use client'

import { useState, useEffect } from 'react'
import {
   Dialog,
   DialogBackdrop,
   DialogPanel, Disclosure,
   DisclosureButton,
   DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { generateFiltersFromProducts, SITE_NAME } from "../constants.ts"
import type { Product } from "../types.ts"
import { Link } from 'react-router-dom'
type FilterOption = {
   value: string;
   label: string;
}

type FilterSection = {
   id: string;
   name: string;
   options: FilterOption[];
}

export default function MattressShopFilters({ products: initialProducts }: { products: Product[] }) {
   const [filters, setFilters] = useState<FilterSection[]>([])
   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
   const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({})
   const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
   useEffect(() => {
      const computedFilters = generateFiltersFromProducts(initialProducts)
      setFilters(computedFilters)

      const initialSelectedFilters: Record<string, Set<string>> = {}
      computedFilters.forEach(section => {
         initialSelectedFilters[section.id] = new Set()
      })

      setSelectedFilters(initialSelectedFilters)
      setFilteredProducts(initialProducts)
   }, [initialProducts])

   // Handle filter changes
   const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
      setSelectedFilters(prev => {
         const newFilters = { ...prev }
         const sectionFilters = new Set(prev[sectionId])

         if (checked) {
            sectionFilters.add(value)
         } else {
            sectionFilters.delete(value)
         }

         newFilters[sectionId] = sectionFilters
         return newFilters
      })
   }

   // Apply filters to products
   useEffect(() => {
      let filtered = initialProducts

      // Only filter if there are any selected filters
      const hasActiveFilters = Object.values(selectedFilters).some(filterSet => filterSet.size > 0)

      if (hasActiveFilters) {
         filtered = initialProducts.filter(product => {
            return Object.entries(selectedFilters).every(([sectionId, selectedValues]) => {
               if (selectedValues.size === 0) return true // Skip sections with no selections

               // Special handling for price ranges
               if (sectionId === 'price') {
                  if (selectedValues.size === 0) return true
                  return Array.from(selectedValues).some(range => {
                     const [min, max] = range.split('-').map(n => n === '+' ? Infinity : Number(n))
                     // @ts-ignore
                     return product.price >= min && product.price < max
                  })
               }

               // Match product attributes based on section ID
               const productValue = product[sectionId as keyof Product]
               if (Array.isArray(productValue)) {
                  // Handle array values (e.g., features, materials)
                  return Array.from(selectedValues).some(value => (productValue as any[]).includes(value))
               } else {
                  // Handle single values (e.g., brand, comfortLevel)
                  return selectedValues.size === 0 || selectedValues.has(String(productValue))
               }
            })
         })
      }

      setFilteredProducts(filtered)
   }, [selectedFilters, initialProducts])

   const FilterCheckbox = ({
      section,
      option,
      optionIdx,
      isMobile = false
   }: {
      section: typeof filters[0],
      option: typeof filters[0]['options'][0],
      optionIdx: number,
      isMobile?: boolean
   }) => {
      const id = `${section.id}-${optionIdx}${isMobile ? '-mobile' : ''}`
      // @ts-ignore
      const isChecked = selectedFilters[section.id]?.has(option.value)

      return (
         <div className="flex items-center">
            <input
               id={id}
               name={`${section.id}[]`}
               type="checkbox"
               checked={isChecked}
               // @ts-ignore
               onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
               htmlFor={id}
               className={`ml-3 text-sm ${isMobile ? 'text-gray-500' : 'text-gray-600'}`}
            >
               {option.label}
            </label>
         </div>
      )
   }

   return (
      <div className="bg-white">
         <div>
            {/* Mobile filter dialog */}
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
               <DialogBackdrop
                  className="fixed inset-0 bg-black bg-opacity-25"
               />

               <div className="fixed inset-0 z-40 flex">
                  <DialogPanel
                     className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
                  >
                     <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                           type="button"
                           onClick={() => setMobileFiltersOpen(false)}
                           className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        >
                           <span className="absolute -inset-0.5" />
                           <span className="sr-only">Close menu</span>
                           <XMarkIcon className="h-6 w-6" />
                        </button>
                     </div>

                     {/* Filters */}
                     <form className="mt-4">
                        {filters.map((section) => (
                           <Disclosure key={section.name} as="div" className="border-t border-gray-200 pb-4 pt-4">
                              <fieldset>
                                 <legend className="w-full px-2">
                                    <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                       <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                       <span className="ml-6 flex h-7 items-center">
                                          <ChevronDownIcon
                                             className="h-5 w-5 rotate-0 transform group-data-open:-rotate-180"
                                          />
                                       </span>
                                    </DisclosureButton>
                                 </legend>
                                 <DisclosurePanel className="px-4 pb-2 pt-4">
                                    <div className="space-y-6">
                                       {section.options.map((option, optionIdx) => (
                                          <FilterCheckbox
                                             // @ts-ignore
                                             key={option.value}
                                             section={section}
                                             option={option}
                                             optionIdx={optionIdx}
                                             isMobile={true}
                                          />
                                       ))}
                                    </div>
                                 </DisclosurePanel>
                              </fieldset>
                           </Disclosure>
                        ))}
                     </form>
                  </DialogPanel>
               </div>
            </Dialog>

            <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
               <div className="border-b border-gray-200 py-10">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Mattresses</h1>
                  <p className="mt-4 text-base text-gray-500">
                     Find your perfect sleep solution at {SITE_NAME}
                  </p>
               </div>

               <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                  <aside>
                     <h2 className="sr-only">Filters</h2>

                     <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(true)}
                        className="inline-flex items-center lg:hidden"
                     >
                        <span className="text-sm font-medium text-gray-700">Filters</span>
                        <PlusIcon className="ml-1 h-5 w-5 shrink-0 text-gray-400" />
                     </button>

                     <div className="hidden lg:block">
                        <form className="space-y-10 divide-y divide-gray-200">
                           {filters.map((section, sectionIdx) => (
                              <div key={section.name} className={sectionIdx === 0 ? 'pb-10' : 'py-10'}>
                                 <fieldset>
                                    <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                    <div className="space-y-3 pt-6">
                                       {section.options.map((option, optionIdx) => (
                                          <FilterCheckbox
                                             // @ts-ignore
                                             key={option.value}
                                             section={section}
                                             option={option}
                                             optionIdx={optionIdx}
                                          />
                                       ))}
                                    </div>
                                 </fieldset>
                              </div>
                           ))}
                        </form>
                     </div>
                  </aside>

                  <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                     <h2 id="product-heading" className="sr-only">
                        Products
                     </h2>
                     {filteredProducts.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center sm:px-10">
                           <p className="text-lg font-semibold text-gray-900">No mattresses match your filters.</p>
                           <p className="mt-3 text-sm leading-6 text-gray-600">
                              Try adjusting or clearing some filters to see more results.
                           </p>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                           {filteredProducts.map((product) => (
                              <div
                                 key={product.slug}
                                 className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                              >
                                 <div className="aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                    <img
                                       src={product.thumbnail_path}
                                       alt={product.name}
                                       className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                    />
                                 </div>
                                 <div className="flex flex-1 flex-col space-y-2 p-4">
                                    <h3 className="text-sm font-medium text-gray-900">
                                       <Link to={`/products/${product.slug}`}>
                                          <span aria-hidden="true" className="absolute inset-0" />
                                          {product.name}
                                       </Link>
                                    </h3>
                                    <div className="flex flex-1 flex-col justify-end">
                                       <p className="text-sm text-gray-500">{product.brand}</p>
                                       <span className="text-sm text-gray-500">
                                          {product.comfortLevel}
                                       </span>
                                       <p className="text-base font-medium text-gray-900 mt-3">
                                          {product.originalPrice && typeof product.price === 'number' && (
                                             <s>${product.originalPrice.toLocaleString()}</s>
                                          )}{' '}
                                          {(() => {
                                             const priceValue = product.price;
                                             const parsedPrice = typeof priceValue === 'number'
                                                ? priceValue
                                                : Number(priceValue);

                                             if (!Number.isNaN(parsedPrice)) {
                                                return `$${parsedPrice.toLocaleString()}`;
                                             }

                                             return String(priceValue);
                                          })()}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </section>
               </div>
            </main>
         </div>
      </div>
   )
}