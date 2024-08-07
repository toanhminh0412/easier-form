import Banner from "@/components/landing/Banner";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import ShortExamples from "@/components/landing/ShortExamples";
import CTA from "@/components/landing/CTA";
import Newsletter from "@/components/landing/Newsletter";
import SocialMedia from "@/components/landing/SocialMedia";

export default function Public() {
    return (
        <main>
            <Banner />
            <Hero />
            <Features />
            <Pricing />
            <ShortExamples />
            <CTA />
            <Newsletter />
            <SocialMedia />
        </main>
    );
}