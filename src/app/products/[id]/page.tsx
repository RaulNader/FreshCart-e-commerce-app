import AddToCartButton from "@/components/product/AddToCartButton";
import ProductGrid from "@/components/product/ProductGrid";
import WishlistButton from "@/components/product/WishlistButton";
import JsonLd from "@/components/seo/JsonLd";
import { productsHref } from "@/lib/product-query";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import {
  getProduct,
  getRelatedProducts,
} from "@/services/products.service";
import type { Product } from "@/types/product.type";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

// Search results show about 155 characters of the description.
function summarize(text: string, maxLength = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > maxLength
    ? `${clean.slice(0, maxLength - 1).trimEnd()}…`
    : clean;
}

// Next.js de-duplicates this fetch with the one in the page, so the
// product is requested only once per render.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found" };

  const description = summarize(product.description);
  const image = { url: product.imageCover, alt: product.title };

  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: product.title,
      description,
      url: `/products/${product.id}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: [image],
    },
  };
}

function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.imageCover, ...product.images],
    sku: product.id,
    category: product.category.name,
    brand: product.brand && { "@type": "Brand", name: product.brand.name },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.id}`),
      price: product.price,
      priceCurrency: "EGP",
      availability:
        product.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    ...(product.ratingsQuantity > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.ratingsAverage,
        ratingCount: product.ratingsQuantity,
        bestRating: 5,
      },
    }),
  };
}

function breadcrumbJsonLd(product: Product) {
  const items = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    {
      name: product.category.name,
      path: productsHref({ category: product.category._id }),
    },
    { name: product.title, path: `/products/${product.id}` },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) notFound();

  const relatedProducts = (await getRelatedProducts(product.category._id))
    .filter((related) => related.id !== product.id);
  const categoryHref = productsHref({ category: product.category._id });
  const inStock = product.quantity > 0;

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(product)} />

      <div className="container w-full max-w-6xl px-3 sm:px-5 mx-auto my-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:underline">Products</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryHref} className="hover:underline">
                {product.category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1 text-foreground">
              {product.title}
            </li>
          </ol>
        </nav>

        <article className="flex flex-col md:flex-row items-center justify-center gap-6">
          <figure className="w-full max-w-xs bg-white rounded-xl border border-default p-3 shadow-sm">
            <Image
              src={product.imageCover}
              className="w-full h-auto rounded-lg object-cover"
              alt={product.title}
              width={500}
              height={500}
              priority
            />
          </figure>

          <div className="w-full max-w-2xl bg-white rounded-xl border border-default p-4 md:p-5 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-stretch-100%">
              {product.title}
            </h1>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-xl my-2">
              <Link
                href={categoryHref}
                className="text-emerald-400 hover:underline"
              >
                {product.category.name}
              </Link>
            </p>
            <p className={inStock ? "text-blue-500" : "text-red-500"}>
              {inStock ? `Available: ${product.quantity}` : "Out of stock"}
            </p>

            <div className="w-full flex justify-between my-2">
              <p className="font-bold">Price: {product.price} EGP</p>
              <p>
                <span className="sr-only">Rated </span>
                {product.ratingsAverage}
                <span className="sr-only"> out of 5</span>
                <i
                  className="fas fa-star text-yellow-400 px-0.5"
                  aria-hidden="true"
                ></i>
              </p>
            </div>
            <div className="flex gap-2">
              <AddToCartButton id={product.id} className="flex-1 min-w-0" />
              <WishlistButton id={product.id} className="flex-1 min-w-0" />
            </div>
          </div>
        </article>
      </div>

      {relatedProducts.length > 0 && (
        <section
          aria-labelledby="related-products"
          className="container mx-auto w-full max-w-6xl px-3 sm:px-5 mt-6"
        >
          <h2
            id="related-products"
            className="font-bold text-center mt-2.5 text-2xl"
          >
            Related Products
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </>
  );
}
