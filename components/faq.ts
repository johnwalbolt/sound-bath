// FAQ content. Rendered by app/faq/page.tsx, which also emits the same
// questions and answers as FAQPage structured data (JSON-LD), built from this
// file so the two cannot drift apart. Keep answers as plain text: no HTML.
//
// To edit: change the text here. `links` render as a short list under the
// answer. Internal links start with "/", external ones with "https://".

import { OFFICIAL_PROFILES } from "@/components/profiles";

export type FaqLink = { label: string; href: string };

export type FaqItem = {
  q: string;
  a: string[]; // paragraphs
  links?: FaqLink[];
};

export type FaqSection = { id: string; title: string; items: FaqItem[] };

export const FAQ_UPDATED = "2026-10-07";

export const FAQ: FaqSection[] = [
  {
    id: "basics",
    title: "The basics",
    items: [
      {
        q: "Is Sound Bath an artist or an activity?",
        a: [
          "Both. A sound bath is a listening practice: you rest while sustained tones wash over you. Sound Bath, with capital letters, is also the name of an ambient music project by music producer Andrew Heringer.",
          "This website is the official home of Sound Bath, the music project.",
        ],
      },
      {
        q: "What is a sound bath?",
        a: [
          "A traditional sound bath is an immersive listening experience using sustained tones often produced by singing bowls, gongs, and chimes while the listener rests, usually lying down. Streaming ambient music lets people enjoy the same tones without needing a live practitioner or venue.",
          "When you stream ambient music, approach it with intention and stillness. Active listening is not required.",
        ],
      },
      {
        q: "What are solfeggio frequencies?",
        a: [
          "A set of specific tones, most commonly cited as 174, 285, 396, 417, 528, 639, 741, 852, and 963 Hz. These numbers are part of the tradition of using solfeggio frequencies for intention setting, though there isn't any rigorous historical documentation that ancient cultures used these exact frequencies intentionally. They're a helpful reference for setting intentions for your mind, body, and spirit.",
        ],
        links: [
          {
            label: "Discovery UK: What are solfeggio frequencies?",
            href: "https://www.discoveryuk.com/mysteries/what-are-solfeggio-frequencies-is-there-science-behind-these-sacred-sounds/",
          },
          {
            label: "HowStuffWorks: Solfeggio frequencies",
            href: "https://science.howstuffworks.com/science-vs-myth/unexplained-phenomena/solfeggio-frequencies.html",
          },
          { label: "Listen: Sound Bath Solfeggio collection", href: "/solfeggio" },
        ],
      },
      {
        q: "What is 528 Hz, the \"Love Frequency\"?",
        a: [
          "This is one of the more popular solfeggio frequencies, often associated with \"transformation,\" \"DNA repair,\" and \"emotional healing.\"",
          "Those associations come from the solfeggio tradition. They are not established by scientific research.",
        ],
      },
      {
        q: "What are binaural beats?",
        a: [
          "Two slightly different tones played separately in each ear (for example, 400 Hz and 410 Hz). The brain perceives a third \"beat\" at the difference between them (here, 10 Hz). For best results, use headphones or stereo separation so the frequencies interact as designed.",
          "The beat itself is a well-documented effect of how hearing works. The research on its benefits is covered below.",
        ],
      },
      {
        q: "What's the difference between a sound bath, sound healing, sound therapy, and music therapy?",
        a: [
          "Sound bath: an informal, passive listening experience, live or recorded.",
          "Sound healing: a broader umbrella term, which includes solfeggio and frequency-based claims, often outside of clinical or scientific frameworks.",
          "Sound therapy: a loose term, often used to mean the same thing as sound healing. It is not a regulated clinical title.",
          "Music therapy: a clinical discipline, delivered by a credentialed music therapist, used in medical and mental-health settings.",
        ],
      },
    ],
  },
  {
    id: "evidence",
    title: "What the research says",
    items: [
      {
        q: "Is there scientific evidence behind solfeggio frequencies?",
        a: [
          "The evidence here is mostly anecdotal. While frequency-specific healing claims are not scientifically established, the general calming effect of steady, low-stimulation tones is plausible and consistent with broader relaxation research.",
        ],
        links: [
          {
            label: "Discovery UK: Is there science behind these sounds?",
            href: "https://www.discoveryuk.com/mysteries/what-are-solfeggio-frequencies-is-there-science-behind-these-sacred-sounds/",
          },
        ],
      },
      {
        q: "Do binaural beats really work?",
        a: [
          "Recent research suggests binaural beats can help combat anxiety. A 2019 meta-analysis (Garcia-Argibay et al.) found a medium, statistically significant overall effect of binaural beats on cognition, anxiety, and pain perception. A 2025 systematic review and meta-analysis focused on anxiety before surgery found binaural beats significantly reduced anxiety compared with blank-audio controls.",
          "Effects were stronger when beats were played before and during a task or stressor, not only during. Longer exposure time also seems to help.",
          "Our suggestion? Start looping Theta Waves 4 Hz about 45 minutes before you plan to shut your eyes. That's a listening idea from us, not a finding from the studies above. They did not test our recordings or this routine, and it isn't a treatment.",
        ],
        links: [
          {
            label: "Garcia-Argibay et al. (2019), Psychological Research",
            href: "https://link.springer.com/article/10.1007/s00426-018-1066-8",
          },
          {
            label: "Xiong et al. (2025), Complementary Therapies in Medicine",
            href: "https://doi.org/10.1016/j.ctim.2025.103299",
          },
          {
            label: "Listen: Theta Waves 4 Hz on Spotify",
            href: "https://open.spotify.com/album/5T1rIbINUEvwEL9ocK5FUT",
          },
        ],
      },
      {
        q: "Can ambient or relaxing music actually reduce stress?",
        a: [
          "This is a more mixed picture. Some broad studies found music interventions could reduce cortisol, heart rate, and blood pressure, plus reduce subjective anxiety or worry in participants. But under strict controls, it's harder to see if music will reliably outperform no music: a 2022 review of lab experiments with healthy volunteers found no clear benefit for recovering after a stressful task. That doesn't mean music never helps. Positive effects will depend on the setting and how you gauge your own stress.",
        ],
        links: [
          {
            label: "de Witte et al. (2020), Health Psychology Review",
            href: "https://doi.org/10.1080/17437199.2019.1627897",
          },
          {
            label: "Adiasto et al. (2022), PLOS ONE",
            href: "https://doi.org/10.1371/journal.pone.0270031",
          },
        ],
      },
      {
        q: "Can music improve sleep quality?",
        a: [
          "It may, at least for how people rate their own sleep. A 2022 Cochrane review covered 13 studies of adults with insomnia symptoms (1,007 people in all). Pooling the 10 studies that measured sleep quality (708 people), it found moderate-certainty evidence that listening to music improved scores on the Pittsburgh Sleep Quality Index (PSQI), a self-report questionnaire, compared with no treatment or usual care. People in those studies listened to recorded music daily for 25 to 60 minutes.",
          "The limits matter. Participants knew they were getting music, and for other measures, like how long it takes to fall asleep, the evidence was low or very low certainty. The review does not show that music is the best sleep treatment, and it did not test our catalog.",
        ],
        links: [
          {
            label: "Cochrane (2022): Listening to music for insomnia in adults",
            href: "https://doi.org/10.1002/14651858.CD010459.pub3",
          },
          { label: "Listen: Sound Bath Sleep collection", href: "/sleep" },
        ],
      },
    ],
  },
  {
    id: "choosing",
    title: "Choosing what to listen to",
    items: [
      {
        q: "What's the best type of music for sleep?",
        a: [
          "Slow, instrumental music with uncluttered arrangements and no jarring shifts are favorites for sleep. We suggest listening in the 30 to 45 minutes before bed. Our Sleep playlist is the best place to start when you're getting ready to settle in for the night.",
        ],
        links: [{ label: "Listen: Sound Bath Sleep collection", href: "/sleep" }],
      },
      {
        q: "What's the best music for anxiety or stress relief?",
        a: [
          "Use binaural beats and ambient music as part of a broader toolkit for stress relief. The research on binaural beats and anxiety is promising in some settings: in trials with patients around surgery, binaural beats lowered anxiety compared with blank audio and, in fewer trials, compared with audio without the beats. Results varied a lot from study to study, and that doesn't rank binaural beats above other calming music in everyday life. Try our Meditation playlist and set an intention for calm.",
        ],
        links: [
          { label: "Listen: Sound Bath Meditation collection", href: "/meditation" },
          {
            label: "Xiong et al. (2025), Complementary Therapies in Medicine",
            href: "https://doi.org/10.1016/j.ctim.2025.103299",
          },
        ],
      },
      {
        q: "What's the best music for meditation or yoga practice?",
        a: [
          "Our meditation collection is drone and binaural-beat based: sustained tones meant to sit quietly in the background of a yoga or meditation practice. The research on binaural beats is covered above. It looked at memory, attention, anxiety, and pain, not at yoga.",
        ],
        links: [
          { label: "Listen: Sound Bath Meditation collection", href: "/meditation" },
        ],
      },
      {
        q: "What's the best music for studying or deep work?",
        a: [
          "When working on anything that requires language-based thinking, instrumental music without lyrics is less likely to interfere with your own thoughts. This is widely accepted in attention research. Instrumental music hasn't been shown to reliably improve performance over silence, though. Whether you prefer solfeggio frequencies, binaural beats, or nature sounds, our catalog has something to try.",
        ],
        links: [
          { label: "Browse the Sound Bath catalog", href: "/catalog" },
          {
            label: "Souza & Leal Barbosa (2023), Journal of Cognition",
            href: "https://doi.org/10.5334/joc.273",
          },
        ],
      },
      {
        q: "Can sound baths or ambient music help with grief, burnout, postpartum recovery, or major life transitions?",
        a: [
          "Anything that encourages relaxation and has sleep-support benefits matters during high-stress seasons of life. We've had listeners use our music to help them through many difficult moments: when grieving a loved one, experiencing burnout at work, and even during labor!",
        ],
      },
    ],
  },
  {
    id: "how-to",
    title: "How to listen",
    items: [
      {
        q: "How long should a sound bath or listening session be?",
        a: [
          "There's no proven ideal length. As a starting point, we suggest 20 to 30 minutes. For reference, the sleep studies above used sessions of 25 to 60 minutes, and the binaural beat research found longer listening somewhat more effective.",
        ],
      },
      {
        q: "Headphones or speakers: does it matter?",
        a: [
          "It matters for binaural beats. Each ear needs to receive its own tone, so headphones are how the effect is designed to work. For everything else in our catalog (solfeggio, nature, general ambient), speakers are fine.",
        ],
      },
      {
        q: "How do I do a sound bath at home?",
        a: [
          "Find a quiet space and get comfortable, lying down if you can. Put your phone out of reach. Choose one long track or one collection so nothing interrupts you. Headphones are optional unless you're listening to binaural beats. Then rest. You don't need to concentrate on the sound.",
        ],
      },
    ],
  },
  {
    id: "about",
    title: "About Sound Bath",
    items: [
      {
        q: "What is Sound Bath, the music project?",
        a: [
          "Sound Bath is an ambient music project by Andrew Heringer. It started as an experiment in minimalist, gentle ambient soundscapes in his California studio, and grew into a full project as more listeners tuned in.",
        ],
        links: [{ label: "About Sound Bath", href: "/about" }],
      },
      {
        q: "Who is Andrew Heringer?",
        a: [
          "Andrew Heringer is a music producer and singer-songwriter. He releases ambient music as Sound Bath, and indie and alternative music under his own name and as The Guest and The Host.",
        ],
        links: [
          { label: "andrewheringer.com", href: "https://www.andrewheringer.com/" },
          {
            label: "theguestandthehost.com",
            href: "https://www.theguestandthehost.com/",
          },
        ],
      },
      {
        q: "What collections does Sound Bath's catalog include?",
        a: ["Four: Solfeggio, Sleep, Nature, and Meditation."],
        links: [
          { label: "Solfeggio", href: "/solfeggio" },
          { label: "Sleep", href: "/sleep" },
          { label: "Nature", href: "/nature" },
          { label: "Meditation", href: "/meditation" },
        ],
      },
      {
        q: "Where can I stream or buy Sound Bath's music?",
        a: [
          "You can stream Sound Bath on Spotify, Apple Music, Amazon Music, and YouTube, and buy the music on Bandcamp. Updates are posted on Instagram.",
        ],
        links: OFFICIAL_PROFILES,
      },
      {
        q: "Which pages are official Sound Bath pages?",
        a: [
          "This website, soundbathvibrations.com, is Sound Bath's official site. Our official profiles are on Spotify, Apple Music, Amazon Music, YouTube, Bandcamp, and Instagram. Each one is linked here and from the top of every page on this site.",
        ],
        links: OFFICIAL_PROFILES,
      },
    ],
  },
];
