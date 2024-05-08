import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "EasierForm",
    description: "Make form creation easier with EasierForm",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full bg-white">
            <head>
                {/* Font Awesome icons */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                {/* React grid layout */}
                <link rel="stylesheet" href="/3rd-party/react-grid-layout/css/styles.css"/>
                <link rel="stylesheet" href="/3rd-party/react-resizable/css/styles.css"/>
            </head>
            <body className={`${inter.className} h-full`}>
                {children}
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" integrity="sha512-u3fPA7V8qQmhBPNT5quvaXVa1mnnLSXUep5PS1qo5NRzHwG19aHmNJnj1Q8hpA/nBWZtZD4r4AX6YOt5ynLN2g==" crossOrigin="anonymous" referrerPolicy="no-referrer"></Script>
            </body>
        </html>
    );
}
