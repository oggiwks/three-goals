import Link from "next/link";

const NotFound = () => <div className="flex flex-col items-stretch justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center py-24">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page not found</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>;

export default NotFound;
