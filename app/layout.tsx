export const metadata = {
  title: 'Carma',
  description: 'Welcome to Carma Dashboard!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
