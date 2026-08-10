export default async function Gate({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/";
  const error = sp.error === "1";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-[#FFFFE5]">
      <h1
        className="text-[clamp(2.5rem,7vw,4.5rem)] leading-none"
        style={{ fontFamily: "var(--font-instrument-serif), serif" }}
      >
        Sound Bath
      </h1>
      <p className="mt-3 text-sm tracking-[0.15em] text-[#FFFFE5]/60">
        Enter the password to continue
      </p>

      <form
        method="post"
        action="/api/gate"
        className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3"
      >
        <input type="hidden" name="next" value={next} />
        <input
          type="password"
          name="password"
          autoFocus
          placeholder="Password"
          className="rounded-full border border-[#FFFFE5]/25 bg-transparent px-5 py-3 text-center text-[#FFFFE5] outline-none placeholder:text-[#FFFFE5]/30 focus:border-[#FFFFE5]/60"
        />
        <button
          type="submit"
          className="rounded-full bg-[#FFFFE5] px-5 py-3 text-sm font-medium tracking-[0.15em] text-black transition-opacity hover:opacity-90"
        >
          ENTER
        </button>
        {error && (
          <p className="text-center text-sm text-[#c084fc]">
            Incorrect password
          </p>
        )}
      </form>
    </main>
  );
}
