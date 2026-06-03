import Hero from '../components/Hero';
import Features from '../components/Features';
import Brands from '../components/Brands';
import Layout from '../Layout';
import Reveal from '../components/Reveal';

const Home = () => {
    return (
        <Layout title="Home">
            <Reveal><Hero /></Reveal>
            <Reveal><Features /></Reveal>
            {/* <About /> */}
            <Reveal><Brands /></Reveal>
        </Layout>
    );
};

export default Home;
