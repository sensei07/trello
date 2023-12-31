import { Navbar } from '@/components'
import { ReactQueryProvider } from '@/providers'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Trello clone',
	description: 'Trello clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className='h-full'>
			<body className='dark bg-gray-900 h-full'>
				<ReactQueryProvider>
					<Navbar />
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	)
}
