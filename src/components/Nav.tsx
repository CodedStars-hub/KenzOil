import Link from "next/link";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="bg-charcoal text-offwhite">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Kenzoil
        </Link>
        <nav>
          <ul className="flex gap-4 text-sm sm:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-offwhite/80 transition-colors hover:text-oil-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
