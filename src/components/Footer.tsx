import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-auto bg-charcoal-light text-offwhite">
      <Container className="py-8 text-sm text-offwhite/70">
        <p>&copy; {new Date().getFullYear()} Kenzoil Lubricants. All rights reserved.</p>
      </Container>
    </footer>
  );
}
