import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Showcase from "@/components/landing/Showcase";
import CTA from "@/components/landing/CTA";
import Newsletter from "@/components/landing/Newsletter";
import SocialMedia from "@/components/landing/SocialMedia";

export default function Public() {
    return (
        <main>
            <Hero />
            <Features />
            <Pricing />
            <Showcase />
            <CTA />
            <Newsletter />
            <SocialMedia />
        </main>
    );
}