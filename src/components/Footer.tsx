import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-7 text-sm text-gray-500 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        {/* LEFT — Logo + Instagram */}
        <div className="flex items-center gap-2 min-w-[220px]">
          <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
            <span>
              Lead<span className="text-blue-600">Worthy</span>
            </span>
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            className="opacity-70 hover:opacity-100 transition"
          >
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={18}
              height={18}
            />
          </Link>
        </div>

        {/* CENTER — Links */}
        <div className="flex gap-8 text-center">
          <Link href="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-900">
            Terms of Service
          </Link>
        </div>

        {/* RIGHT — Copyright */}
        <div className="text-right min-w-[320px]">
          © 2025 LeadWorthy Marketing. All rights reserved.
        </div>

      </div>
    </footer>
  )
}