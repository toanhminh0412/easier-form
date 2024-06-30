import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Showcase from "@/components/landing/Showcase";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Public() {
    return (
        <main>
            <Hero />
            <Features />
            <Pricing />
            <Showcase />
            <CTA />
            <Footer />
        </main>
    );
}