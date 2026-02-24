<footer className="border-t border-gray-200 py-6 text-sm text-gray-500 bg-white">
  <div className="max-w-[1200px] mx-auto px-6">

    {/* MOBILE */}
    <div className="flex flex-col items-center text-center gap-4 md:hidden">

      {/* Logo + Instagram */}
      <div className="flex items-center gap-2 font-semibold text-gray-900">
        Lead<span className="text-blue-600">Worthy</span>

        <a
          href="https://instagram.com/leadworthy.ag"
          target="_blank"
          className="opacity-70 hover:opacity-100"
        >
          <img src="/instagram.svg" className="w-4 h-4"/>
        </a>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>

      {/* Copyright */}
      <div className="text-xs text-gray-400">
        © 2025 LeadWorthy Marketing. All rights reserved.
      </div>

    </div>

    {/* DESKTOP */}
    <div className="hidden md:flex items-center justify-between">

      <div className="flex items-center gap-2 min-w-[220px]">
        <span className="font-semibold text-gray-900">
          Lead<span className="text-blue-600">Worthy</span>
        </span>
        <img src="/instagram.svg" className="w-4 h-4"/>
      </div>

      <div className="flex gap-8">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>

      <div className="min-w-[320px] text-right">
        © 2025 LeadWorthy Marketing. All rights reserved.
      </div>

    </div>

  </div>
</footer>