import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
