'use client'

import { useState, useEffect } from 'react'
import {
   Dialog,
   DialogBackdrop,
   DialogPanel,
   Disclosure,
   DisclosureButton,
   DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { generateFiltersFromProducts, SITE_NAME } from "../constants.ts"
import type { Product } from "../types.ts"
import ProductCard from './ProductCard'

type FilterOption = {
   value: string;
   label: string;
}

type FilterSection = {
   id: string;
   name: string;
   options: FilterOption[];
}

export default function MattressShopFilters({ products: initialProducts, loading = false }: { products: Product[]; loading?: boolean }) {
   const [filters, setFilters] = useState<FilterSection[]>([])
   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
   const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({})
   const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
   const [searchQuery, setSearchQuery] = useState('')

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

   useEffect(() => {
      let filtered = initialProducts
      const normalizedSearch = searchQuery.trim().toLowerCase()
      const hasActiveFilters = normalizedSearch.length > 0 || Object.values(selectedFilters).some(filterSet => filterSet.size > 0)

      if (hasActiveFilters) {
         filtered = initialProducts.filter(product => {
            if (normalizedSearch.length > 0) {
               const searchValue = normalizedSearch
               const matchesSearch = [
                  product.name,
                  product.brand,
                  product.description,
                  product.comfortLevel,
                  product.color,
                  product.size,
               ]
                  .filter(Boolean)
                  .some(value => String(value).toLowerCase().includes(searchValue))

               if (!matchesSearch) {
                  return false
               }
            }
            return Object.entries(selectedFilters).every(([sectionId, selectedValues]) => {
               if (selectedValues.size === 0) return true

               if (sectionId === 'price') {
                  const productPrices = product.sizes?.length
                     ? product.sizes.map(s => s.price)
                     : (Number.isNaN(Number(product.price)) ? [] : [Number(product.price)])
                  if (productPrices.length === 0) {
                     return false
                  }
                  return Array.from(selectedValues).some(range => {
                     const [min, max] = range.split('-').map(n => n === '+' ? Infinity : Number(n))
                     return productPrices.some(price => price >= min && price < max)
                  })
               }

               if (sectionId === 'size') {
                  const productSizes = product.sizes?.length ? product.sizes.map(s => s.size) : []
                  // Flat-price / "call for price" products (no explicit sizes) are not filtered out.
                  if (productSizes.length === 0) return true
                  return productSizes.some(s => selectedValues.has(s))
               }

               const productValue = product[sectionId as keyof Product]
               if (Array.isArray(productValue)) {
                  return Array.from(selectedValues).some(value => (productValue as any[]).includes(value))
               }

               return selectedValues.has(String(productValue))
            })
         })
      }

      setFilteredProducts(filtered)
   }, [selectedFilters, initialProducts, searchQuery])

   const FilterCheckbox = ({
      section,
      option,
      optionIdx,
      isMobile = false,
   }: {
      section: FilterSection
      option: FilterOption
      optionIdx: number
      isMobile?: boolean
   }) => {
      const id = `${section.id}-${optionIdx}${isMobile ? '-mobile' : ''}`
      const isChecked = selectedFilters[section.id]?.has(option.value)

      return (
         <div className="flex items-center">
            <input
               id={id}
               name={`${section.id}[]`}
               type="checkbox"
               checked={isChecked}
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
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
               <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25" />

               <div className="fixed inset-0 z-40 flex">
                  <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
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

                     {loading ? (
                        <div className="space-y-4 px-4">
                           {Array.from({ length: 3 }).map((_, idx) => (
                              <div key={idx} className="rounded-3xl border border-gray-200 bg-gray-100 p-4">
                                 <div className="mb-4 h-5 w-36 rounded-full bg-gray-200 animate-pulse" />
                                 <div className="space-y-3">
                                    <div className="h-4 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="h-4 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="h-4 w-5/6 rounded-full bg-gray-200 animate-pulse" />
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <form className="mt-4">
                           {filters.map((section) => (
                              <Disclosure key={section.name} as="div" className="border-t border-gray-200 pb-4 pt-4">
                                 <fieldset>
                                    <legend className="w-full px-2">
                                       <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                          <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                          <span className="ml-6 flex h-7 items-center">
                                             <ChevronDownIcon className="h-5 w-5 rotate-0 transform group-data-open:-rotate-180" />
                                          </span>
                                       </DisclosureButton>
                                    </legend>
                                    <DisclosurePanel className="px-4 pb-2 pt-4">
                                       <div className="space-y-6">
                                          {section.options.map((option, optionIdx) => (
                                             <FilterCheckbox
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
                     )}
                  </DialogPanel>
               </div>
            </Dialog>

            <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
               <div className="border-b border-gray-200 py-10">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Mattresses</h1>
                  <p className="mt-4 text-base text-gray-500">Find your perfect sleep solution at {SITE_NAME}</p>
                  <div className="mt-6">
                     <label htmlFor="product-search" className="sr-only">Search products</label>
                     <input
                        id="product-search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search mattresses by name, brand, or comfort"
                        className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                     />
                  </div>
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
                        {loading ? (
                           <div className="space-y-6">
                              {Array.from({ length: 3 }).map((_, idx) => (
                                 <div key={idx} className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="mb-4 h-5 w-40 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="space-y-3">
                                       <div className="h-4 rounded-full bg-gray-200 animate-pulse" />
                                       <div className="h-4 rounded-full bg-gray-200 animate-pulse" />
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <form className="space-y-10 divide-y divide-gray-200">
                              {filters.map((section, sectionIdx) => (
                                 <Disclosure key={section.name} as="div" className={sectionIdx === 0 ? 'pb-10' : 'py-10'} defaultOpen>
                                    {({ open }) => (
                                       <>
                                          <Disclosure.Button className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-900">
                                             <span>{section.name}</span>
                                             <ChevronDownIcon
                                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
                                             />
                                          </Disclosure.Button>
                                          <Disclosure.Panel className="pt-6">
                                             <fieldset>
                                                <div className="space-y-3">
                                                   {section.options.map((option, optionIdx) => (
                                                      <FilterCheckbox
                                                         key={option.value}
                                                         section={section}
                                                         option={option}
                                                         optionIdx={optionIdx}
                                                      />
                                                   ))}
                                                </div>
                                             </fieldset>
                                          </Disclosure.Panel>
                                       </>
                                    )}
                                 </Disclosure>
                              ))}
                           </form>
                        )}
                     </div>
                  </aside>

                  <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                     <h2 id="product-heading" className="sr-only">Products</h2>

                     {loading ? (
                        <div className="space-y-8">
                           <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                              <div className="mb-6 h-6 w-56 rounded-full bg-gray-200 animate-pulse" />
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                 {Array.from({ length: 6 }).map((_, idx) => (
                                    <div key={idx} className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
                                       <div className="h-48 bg-gray-200 animate-pulse" />
                                       <div className="p-4">
                                          <div className="mb-3 h-4 w-3/4 rounded-full bg-gray-200 animate-pulse" />
                                          <div className="mb-4 h-4 w-1/2 rounded-full bg-gray-200 animate-pulse" />
                                          <div className="h-10 rounded-full bg-gray-200 animate-pulse" />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ) : filteredProducts.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center sm:px-10">
                           <p className="text-lg font-semibold text-gray-900">No mattresses match your filters.</p>
                           <p className="mt-3 text-sm leading-6 text-gray-600">
                              Try adjusting or clearing some filters to see more results.
                           </p>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                           {filteredProducts.map((product) => (
                              <ProductCard key={product.slug} product={product} to={`/products/${product.slug}`} />
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