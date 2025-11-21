"use client";

import Link from "next/link";

type NavigationLink = {
  label: string;
  href: string;
};

type NavigationLinksProps = {
  links: NavigationLink[];
};

export const NavigationLinks = ({ links }: NavigationLinksProps) => {
  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-4 py-2 text-sm font-medium bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors border border-gray-300"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
