import {
  FaBandcamp,
  FaAmazon,
  FaApple,
  FaSpotify,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export type SocialLink = {
  key: string;
  label: string;
  href: string;
  Icon: IconType;
};

// Streaming / store profiles (real links from soundbathvibrations.com).
export const STREAMING: SocialLink[] = [
  {
    key: "bandcamp",
    label: "Bandcamp",
    href: "https://soundbathvibrations.bandcamp.com/",
    Icon: FaBandcamp,
  },
  {
    key: "amazon",
    label: "Amazon",
    href: "https://music.amazon.com/artists/B07D9D5QY2/sound-bath?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_uiFCrizIPfpuNuyV46iOoFTCY",
    Icon: FaAmazon,
  },
  {
    key: "apple",
    label: "Apple",
    href: "https://music.apple.com/us/artist/sound-bath/1388721493",
    Icon: FaApple,
  },
  {
    key: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/artist/1wuPfTKt5zzbZixeifF5DO?si=LYLkstC_QmitwZs5n8Tfcw",
    Icon: FaSpotify,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@sound_bath",
    Icon: FaYoutube,
  },
];

export const INSTAGRAM: SocialLink = {
  key: "instagram",
  label: "Instagram",
  href: "https://www.instagram.com/sound__bath/",
  Icon: FaInstagram,
};

// Icons shown on the right of the nav bar.
export const NAV_SOCIALS: SocialLink[] = [...STREAMING, INSTAGRAM];

export const CONTACT_EMAIL = "Soundbathvibrations@gmail.com";

// ── Catalog categories ──────────────────────────────────────────────────────
export type PlaylistLink = { label: string; href: string; Icon: IconType };
export type Frequency = { hz: string; href: string };

export type Category = {
  slug: string;
  name: string;
  blurb: string; // short summary (Catalog page card)
  intro: string; // full description (category page)
  playlistLabel: string;
  embed: { type: "spotify" | "youtube"; src: string };
  links: PlaylistLink[];
  frequencies?: Frequency[];
};

export const CATEGORY_ORDER = [
  "solfeggio",
  "sleep",
  "nature",
  "meditation",
] as const;

export const CATEGORIES: Record<string, Category> = {
  solfeggio: {
    slug: "solfeggio",
    name: "Solfeggio",
    blurb:
      "Ancient tones tuned to the body's natural rhythms. Solfeggio frequencies support healing, balance, and transformation.",
    intro:
      "Solfeggio frequencies are ancient tones believed to align with the body's natural energy centers. First used in sacred Gregorian chants, these specific sound frequencies are thought to support healing, balance the nervous system, and promote deep emotional and spiritual well-being. Many turn to Solfeggio tracks for stress relief, meditation, and sound-based healing.",
    playlistLabel: "Solfeggio Playlist",
    embed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/videoseries?list=PLDwwWJecTYf0CDo50YBBRlovpQDqaZOvN",
    },
    links: [
      {
        label: "Bandcamp",
        href: "https://soundbathvibrations.bandcamp.com/album/solfeggio-drone-sound-bath-30-minute-soundscapes",
        Icon: FaBandcamp,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/playlist?list=PLDwwWJecTYf0CDo50YBBRlovpQDqaZOvN",
        Icon: FaYoutube,
      },
    ],
    frequencies: [
      { hz: "396 Hz", href: "https://youtu.be/eMAEpAPXkrA" },
      { hz: "417 Hz", href: "https://youtu.be/7MSJRVATQz4" },
      { hz: "528 Hz", href: "https://youtu.be/FyhaUqkfEDY" },
      { hz: "639 Hz", href: "https://youtu.be/fT6pO8sJuh0" },
      { hz: "741 Hz", href: "https://youtu.be/Hze8zW-f0SA" },
      { hz: "852 Hz", href: "https://youtu.be/_pYVhis2lRo" },
      { hz: "963 Hz", href: "https://youtu.be/aEHGh4UCh_E" },
    ],
  },
  sleep: {
    slug: "sleep",
    name: "Sleep",
    blurb:
      "Gentle, restorative soundscapes to quiet the mind and ease you into deep rest. Includes Theta wave tracks to support natural sleep cycles.",
    intro:
      "Rest doesn't always come easily—so we've created soundscapes that help. These tracks are designed to slow brainwave activity, relax the body, and prepare the mind for deep, restorative sleep. With soothing textures and Theta wave frequencies, this collection supports a calm nervous system and natural circadian rhythm.",
    playlistLabel: "Sleep Sampler Playlist",
    embed: {
      type: "spotify",
      src: "https://open.spotify.com/embed/playlist/7ewUCAp4wbXhon3KhsMcka?utm_source=generator&theme=0",
    },
    links: [
      {
        label: "Bandcamp",
        href: "https://soundbathvibrations.bandcamp.com/album/sleep-sound-bath",
        Icon: FaBandcamp,
      },
      {
        label: "Amazon",
        href: "https://music.amazon.com/user-playlists/bd115016c4614e02a436be68ed03c27asune",
        Icon: FaAmazon,
      },
      {
        label: "Apple",
        href: "https://music.apple.com/us/playlist/sleep-sound-bath-peaceful-ambient-tones-for-restful/pl.u-25vLhb9b47",
        Icon: FaApple,
      },
      {
        label: "Spotify",
        href: "https://open.spotify.com/playlist/7ewUCAp4wbXhon3KhsMcka?si=13004e1bffb74170",
        Icon: FaSpotify,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/playlist?list=PLDwwWJecTYf2gHzh6rsrrjme-SZ7ZXw2K",
        Icon: FaYoutube,
      },
    ],
  },
  nature: {
    slug: "nature",
    name: "Nature",
    blurb:
      "From forest rains to ocean tides, these immersive nature sounds help you reconnect with the rhythms of the earth.",
    intro:
      "Immersing yourself in the sounds of the natural world can have profound calming effects on the body and mind. This collection features field recordings and nature-inspired sound design—from gentle rainfall to forest winds—to restore a sense of connection, quiet the mind, and ground you in the present moment.",
    playlistLabel: "Nature Sampler Playlist",
    embed: {
      type: "spotify",
      src: "https://open.spotify.com/embed/playlist/1RhtrGb83NkSccGcfEcmaR?utm_source=generator&theme=0",
    },
    links: [
      {
        label: "Amazon",
        href: "https://music.amazon.com/user-playlists/4704775e887b4005a877ec7a3d19b8aasune",
        Icon: FaAmazon,
      },
      {
        label: "Apple",
        href: "https://music.apple.com/us/playlist/rain-oceans-rivers-natural-water-sounds/pl.u-keLJC323BZ",
        Icon: FaApple,
      },
      {
        label: "Spotify",
        href: "https://open.spotify.com/playlist/1RhtrGb83NkSccGcfEcmaR?si=440dbbba641a4ec1",
        Icon: FaSpotify,
      },
    ],
  },
  meditation: {
    slug: "meditation",
    name: "Meditation",
    blurb:
      "Music to center, ground, and open the inner space. Binaural beats and ambient tones support deeper focus, presence, and clarity.",
    intro:
      "Whether you're just beginning or deepening your practice, this music helps support stillness, focus, and inner clarity. Many of the tracks feature binaural beats, which use gently shifting frequencies to encourage calm, meditative brainwave states. Let each sound guide you inward, moment by moment.",
    playlistLabel: "Meditation Sampler Playlist",
    embed: {
      type: "spotify",
      src: "https://open.spotify.com/embed/playlist/48xqoaZDyci2wpp72aiTFr?utm_source=generator&theme=0",
    },
    links: [
      {
        label: "Bandcamp",
        href: "https://soundbathvibrations.bandcamp.com/",
        Icon: FaBandcamp,
      },
      {
        label: "Amazon",
        href: "https://music.amazon.com/user-playlists/a063a2e370574bc8a0be0f53df7a927esune?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_k8k4mHCc2PmmrkamDgfPJKCRa",
        Icon: FaAmazon,
      },
      {
        label: "Apple",
        href: "https://music.apple.com/us/playlist/meditation-sound-bath/pl.u-25kDFb9b47",
        Icon: FaApple,
      },
      {
        label: "Spotify",
        href: "https://open.spotify.com/playlist/48xqoaZDyci2wpp72aiTFr?si=a38976c11f01478b",
        Icon: FaSpotify,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/playlist?list=PLDwwWJecTYf0kLLWjN5BT-5_Vy5VzHqVw",
        Icon: FaYoutube,
      },
    ],
  },
};
