import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

const SITE = "https://nady4.com";
const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;
const ORG_ID = `${SITE}/#organization`;

const SAME_AS = [
  "https://github.com/nady4",
  "https://www.linkedin.com/in/nady4",
  "https://x.com/_nady4",
  "https://www.instagram.com/nady4_dev",
];

const KNOWS_ABOUT = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Serverless",
  "Cloudflare Workers",
  "Qwik",
];

const CERTIFICATIONS = [
  { name: "Full Stack Developer", issuer: "ZTM Academy" },
  { name: "Testing QA", issuer: "Instituto Web" },
  { name: "UX Design", issuer: "Platzi" },
  { name: "Scrum Foundation Professional", issuer: "Certiprof" },
  { name: "English C2 Proficiency", issuer: "EF Education First" },
];

function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Nadya Jerochim",
    givenName: "Nadya",
    familyName: "Jerochim",
    url: `${SITE}/`,
    image: `${SITE}/dev.png`,
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer experienced in building web apps and serverless services with React, Node.js, TypeScript and Next.js.",
    email: "mailto:dev@nady4.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    nationality: { "@type": "Country", name: "Argentina" },
    sameAs: SAME_AS,
    knowsAbout: KNOWS_ABOUT,
    worksFor: { "@id": ORG_ID },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "National University of Lanús",
      sameAs: "https://www.unla.edu.ar/",
    },
    hasCredential: CERTIFICATIONS.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
  };
}

function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Nadya Jerochim - Portfolio",
    url: `${SITE}/`,
    inLanguage: ["en", "es"],
    publisher: { "@id": PERSON_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/blog/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function professionalServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: "Nadya Jerochim",
    url: `${SITE}/`,
    image: `${SITE}/dev.png`,
    logo: `${SITE}/dev.png`,
    sameAs: SAME_AS,
    founder: { "@id": PERSON_ID },
    serviceType: "Full Stack Web Development",
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
  };
}

function webpageLd(headTitle: string, headDescription: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: headTitle,
    description: headDescription,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    url: `${SITE}/`,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE}/dev.png`,
    },
  };
}

interface BlogPostLite {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

function blogPostingLd(post: BlogPostLite, locale: string) {
  const baseLocale = locale === "es" ? "es" : "en";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description:
      post.description ??
      "Full Stack Developer blog post by Nadya Jerochim.",
    datePublished: post.date,
    inLanguage: baseLocale,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/blog/${post.slug}/`,
    },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export const JsonLd = component$<{ post?: BlogPostLite }>(({ post }) => {
  const head = useDocumentHead();
  const loc = useLocation();
  const locale = loc.url.pathname.startsWith("/es/") ? "es" : "en";

  const headTitle =
    head.title || "Nadya Jerochim - FullStack Developer";
  const headDescription =
    head.meta.find((m) => m.name === "description")?.content ??
    "Full Stack Developer experienced in building web apps and serverless services with React, Node.js, TypeScript and Next.js.";

  const blocks: object[] = [personLd(), websiteLd(), professionalServiceLd()];

  if (post) {
    blocks.push(blogPostingLd(post, locale));
  } else {
    blocks.push(webpageLd(headTitle, headDescription, locale));
  }

  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={JSON.stringify(b)}
        />
      ))}
    </>
  );
});
