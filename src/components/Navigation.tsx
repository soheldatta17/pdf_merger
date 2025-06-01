'use client';

import Link from 'next/link';
import UsersList from './UsersList';

export default function Navigation() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm text-white text-center">
            🚀 Experience the fastest PDF merger tool online!
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center space-x-2"
            >
              <div className="bg-red-500 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PDF Merger</h1>
                <p className="text-xs text-gray-400">Merge PDFs instantly</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <UsersList />
              <button 
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth'))}
              >
                Login
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth'))}
              >
                <span>Sign up</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 