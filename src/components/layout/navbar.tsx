import { Clapperboard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm md:px-6">
        <Link className="flex items-center gap-2" href="#">
          {/* <MountainIcon className="h-6 w-6" /> */}
          <Clapperboard className="h-6 w-6" />
          <span className="text-lg font-semibold">Movie Database</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link className="hover:underline hover:underline-offset-4" href="/">
            หน้าแรก
          </Link>
          <Link className="hover:underline hover:underline-offset-4" href="/movie">
            ภาพยนตร์
          </Link>
          <Link className="hover:underline hover:underline-offset-4" href="/tv">
            ทีวีซีรี่ย์
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" data-skip-auto-scroll>
            <div className="grid gap-6 p-4">
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="/">
                หน้าแรก
              </Link>
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="/movie">
                ภาพยนตร์
              </Link>
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="/tv">
                ทีวีซีรี่ย์
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Navbar;
