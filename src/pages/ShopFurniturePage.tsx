import React from 'react';
import Layout from '../Layout';
import { FURNITURE } from '../constants/furniture';
import ShopFurniturePageFilters from '../components/ShopFurniturePageFilters';

const ShopFurniturePage: React.FC = () => {
    return (
        <Layout title='Shop Furniture'>
            <ShopFurniturePageFilters furniture={FURNITURE} />
        </Layout>
    );
};

export default ShopFurniturePage;
