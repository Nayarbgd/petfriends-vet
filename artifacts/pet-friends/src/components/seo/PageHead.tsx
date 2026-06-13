import { useEffect } from "react";

interface PageHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schema?: object;
  schemas?: object[];
  noIndex?: boolean;
}

export default function PageHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://petfriendsvet.ae/opengraph.jpg",
  schema,
  schemas,
  noIndex = false,
}: PageHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]',         "name",     "description",         description);
    setMeta('meta[property="og:title"]',         "property", "og:title",            ogTitle || title);
    setMeta('meta[property="og:description"]',   "property", "og:description",      ogDescription || description);
    setMeta('meta[property="og:image"]',         "property", "og:image",            ogImage);
    setMeta('meta[property="og:type"]',          "property", "og:type",             "website");
    setMeta('meta[name="twitter:card"]',         "name",     "twitter:card",        "summary_large_image");
    setMeta('meta[name="twitter:title"]',        "name",     "twitter:title",       ogTitle || title);
    setMeta('meta[name="twitter:description"]',  "name",     "twitter:description", ogDescription || description);
    setMeta('meta[name="twitter:image"]',        "name",     "twitter:image",       ogImage);

    setMeta('meta[name="robots"]', "name", "robots",
      noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1"
    );

    const url = canonical || window.location.href;
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", url);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    document.querySelectorAll("script[data-page-schema]").forEach((el) => el.remove());

    const allSchemas: object[] = [];
    if (schemas && schemas.length > 0) allSchemas.push(...schemas);
    else if (schema) allSchemas.push(schema);

    allSchemas.forEach((s, i) => {
      const script = document.createElement("script");
      script.setAttribute("data-page-schema", String(i));
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, schema, schemas, noIndex]);

  return null;
}
