export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <span className="font-serif text-xl tracking-[0.12em]">
          mindfulness + frequency = healing
        </span>
        <p className="text-xs tracking-[0.15em] text-muted">
          © {new Date().getFullYear()} SOUND BATH
        </p>
      </div>
    </footer>
  );
}
