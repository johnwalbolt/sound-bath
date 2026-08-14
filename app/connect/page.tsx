import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/pages/PageShell";
import ConnectForm from "@/components/pages/ConnectForm";
import { CONTACT_EMAIL } from "@/components/site";
import { BODY } from "@/components/home/panel";
import connectHeader from "@/public/assets/connect-header.webp";
import connectPageBg from "@/public/assets/connect-page-bg.webp";

export const metadata: Metadata = {
  title: "Connect — Sound Bath",
  description:
    "We want to hear from you. Share feedback, questions, or collaboration ideas with Sound Bath.",
};

export default function ConnectPage() {
  return (
    <PageShell
      background={
        <Image
          src={connectPageBg}
          alt=""
          aria-hidden
          priority
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover"
        />
      }
    >
      <section className="mx-auto max-w-5xl px-6">
        <Image
          src={connectHeader}
          alt="Connect"
          priority
          className="h-auto max-h-12 w-auto max-w-full md:max-h-16"
        />
        <p className="mt-8 font-sans text-lg font-bold tracking-[0.03em] text-white md:text-xl">
          We want to hear from you!
        </p>
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
