import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ne pas wrapper avec <html><body> ici
  // Les routes [locale] ont leur propre structure HTML complète
  // Cela évite le HTML imbriqué (<html> dans <body>)
  return children;
}
