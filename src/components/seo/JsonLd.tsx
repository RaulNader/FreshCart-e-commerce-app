/**
 * Renders schema.org structured data for search engines.
 * `<` is escaped so text from the API (product titles, descriptions)
 * can never close the script tag and inject HTML.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
