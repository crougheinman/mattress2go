import Hero from '../components/Hero';
import Features from '../components/Features';
import Brands from '../components/Brands';
import Layout from '../Layout';

const Home = () => {
    return (
        <Layout title="Home">
            <Hero />
            <Features />
            {/* <About /> */}
            <Brands />
        </Layout>
    );
};

export default Home;
