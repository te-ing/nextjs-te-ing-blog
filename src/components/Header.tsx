import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Write-ing Code</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              All Posts
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
