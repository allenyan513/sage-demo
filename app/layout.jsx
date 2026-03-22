import "./globals.css";

export const metadata = {
  title: "Sage — Your Personal Aristotle",
  description: "AI-powered Digital Mentors built from real people's knowledge, experiences, and values.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
