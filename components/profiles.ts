// Sound Bath's official profiles, in one place. The FAQ, the site-wide
// structured data (app/layout.tsx) and public/llms.txt all list these same six.
// If a profile is added or changes, update it here and in public/llms.txt.
export type OfficialProfile = { label: string; href: string };

export const SITE_URL = "https://soundbathvibrations.com";

export const OFFICIAL_PROFILES: OfficialProfile[] = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/1wuPfTKt5zzbZixeifF5DO",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/sound-bath/1388721493",
  },
  {
    label: "Amazon Music",
    href: "https://music.amazon.com/artists/B07D9D5QY2/sound-bath",
  },
  { label: "YouTube", href: "https://www.youtube.com/@sound_bath" },
  { label: "Bandcamp", href: "https://soundbathvibrations.bandcamp.com/" },
  { label: "Instagram", href: "https://www.instagram.com/sound__bath/" },
];
