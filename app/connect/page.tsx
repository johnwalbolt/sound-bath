import type { Metadata } from "next";
import PageShell from "@/components/pages/PageShell";
import ConnectForm from "@/components/pages/ConnectForm";
import { CONTACT_EMAIL } from "@/components/site";
import { BODY, shimmerTextStyle } from "@/components/home/panel";

export const metadata: Metadata = {
  title: "Connect — Sound Bath",
  description:
    "We want to hear from you. Share feedback, questions, or collaboration ideas with Sound Bath.",
};

export default function ConnectPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6">
        <h1
          className="text-[clamp(2.5rem,8vw,5rem)] leading-none"
          style={shimmerTextStyle}
        >
          We want to hear from you!
        </h1>
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          Our favorite way to grow and improve is through feedback from our
          listeners. If you have any other questions or comments, you can share
          those through the form below.
        </p>
        <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-[#FFFFE5]/55">
          Message goes to: {CONTACT_EMAIL}
        </p>

        <ConnectForm />
      </section>
    </PageShell>
  );
}
