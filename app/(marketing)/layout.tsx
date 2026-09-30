import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/components/ContentProvider";
import { getSiteContent } from "@/lib/siteContent.server";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <ContentProvider content={content}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ContentProvider>
  );
}
