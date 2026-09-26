import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const SITE_URL = "https://www.lizmutisya.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Liz Mutisya",
    template: "%s | Liz Mutisya",
  },
  description:
    "Elizabeth Waeni Mutisya (Liz Mutisya) is a Product Manager at Microsoft focused on platform governance, developer experiences, and enterprise-scale systems. Building products that untangle complexity.",
  applicationName: "Liz Mutisya",
  authors: [{ name: "Elizabeth Waeni Mutisya", url: SITE_URL }],
  creator: "Elizabeth Waeni Mutisya",
  publisher: "Elizabeth Waeni Mutisya",
  category: "Technology",
  keywords: [
    "Elizabeth Waeni Mutisya",
    "Elizabeth Mutisya",
    "Liz Mutisya",
    "Liz Waeni Mutisya",
    "Waeni Mutisya",
    "Elizabeth Waeni",
    "Liz Waeni",
    "Elizabeth",
    "Waeni",
    "Mutisya",
    "Liz",
    "Elizabeth Mutisya Microsoft",
    "Product Manager",
    "Microsoft Product Manager",
    "Microsoft Graph",
    "Platform Governance",
    "Developer Experience",
    "Enterprise Systems",
    "Product Management Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Elizabeth",
    lastName: "Mutisya",
    username: "lizmutisya",
    title: "Elizabeth Waeni Mutisya — Product Manager at Microsoft",
    description:
      "Elizabeth Waeni Mutisya (Liz Mutisya) — Product Manager at Microsoft. Platform governance, developer experiences, and enterprise-scale systems.",
    url: SITE_URL,
    siteName: "Liz Mutisya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elizabeth Waeni Mutisya — Product Manager at Microsoft",
    description:
      "Elizabeth Waeni Mutisya (Liz Mutisya) — Product Manager at Microsoft. Building products that untangle complexity.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Elizabeth Waeni Mutisya",
      alternateName: [
        "Liz Mutisya",
        "Elizabeth Mutisya",
        "Waeni Mutisya",
        "Liz Waeni Mutisya",
        "Elizabeth Waeni",
      ],
      givenName: "Elizabeth",
      additionalName: "Waeni",
      familyName: "Mutisya",
      jobTitle: "Product Manager",
      description:
        "Product Manager at Microsoft focused on platform governance, developer experiences, and enterprise-scale systems.",
      url: SITE_URL,
      mainEntityOfPage: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      gender: "Female",
      knowsLanguage: ["English"],
      worksFor: {
        "@type": "Organization",
        name: "Microsoft",
        url: "https://www.microsoft.com",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Product Manager",
        occupationLocation: {
          "@type": "Organization",
          name: "Microsoft",
        },
        skills: [
          "Product Management",
          "Platform Governance",
          "Developer Experience",
          "API Strategy",
          "Enterprise Systems",
        ],
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Strathmore University",
      },
      knowsAbout: [
        "Product Management",
        "Platform Governance",
        "Microsoft Graph",
        "Developer Experience",
        "API Strategy",
        "Enterprise Systems",
      ],
      sameAs: [
        "https://www.linkedin.com/in/elizabeth-waeni-m-11983ab4",
        "https://github.com/Emutisya",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Liz Mutisya",
      description:
        "The personal portfolio of Elizabeth Waeni Mutisya (Liz Mutisya), Product Manager at Microsoft.",
      inLanguage: "en-US",
      publisher: { "@id": PERSON_ID },
      author: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Elizabeth Waeni Mutisya — Product Manager at Microsoft",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
