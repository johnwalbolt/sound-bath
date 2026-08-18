export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <p className="text-xs tracking-[0.15em] text-muted">
          © {new Date().getFullYear()} SOUND BATH, Registered in the U.S. Patent
          and Trademark Office
        </p>
      </div>
    </footer>
  );
}
