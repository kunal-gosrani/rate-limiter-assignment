import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
	title: "rate-limiter-assignment",
	description: "rate-limiter-assignment",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">{children}</body>
		</html>
	);
}
