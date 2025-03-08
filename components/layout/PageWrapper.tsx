import Image from 'next/image';
import Link from 'next/link';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="w-full border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          Company Name, Inc
        </div>
      </footer>
    </div>
  );
} 