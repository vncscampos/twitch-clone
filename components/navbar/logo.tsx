import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1">
          <Image src="/logo.svg" alt="tuiti" width={32} height={32} />
        </div>
        <div className={cn(font.className)}>
        <p className="text-lg font-semibold">
          Tuiti
        </p>
        <p className="text-xs text-muted-foreground">
          Let&apos;s play
        </p>
      </div>
      </div>
    </Link>
  );
}
