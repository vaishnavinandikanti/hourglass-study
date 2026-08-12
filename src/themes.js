// Aesthetic gradient themes with Spotify playlists
export const AESTHETIC_THEMES = [
  {
    id: 'ember',
    label: 'Ember',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWXRwVJmlkKqJ',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWZeKCadgRdKQ',
  },
  {
    id: 'tide',
    label: 'Tide',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DX4sWSpwq3LiO',
  },
  {
    id: 'grove',
    label: 'Grove',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWYeKT834DGNC',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWZAqNoBGZDYN',
  },
]

// Video themes WITHOUT Spotify
export const VIDEO_THEMES = [
  {
    id: 'cafe',
    label: 'Café',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/sYwC7lhccis' },
      { id: 2, url: 'https://youtu.be/lj3WRojfdLs' },
    ],
  },
  {
    id: 'train',
    label: 'Train Window',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/q8nPaqfRm_c' },
      { id: 2, url: 'https://youtu.be/dQFTPqTKePw' },
    ],
  },
  {
    id: 'tokyo',
    label: 'Tokyo / Japan',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/-Xh4BNbxpI8' },
      { id: 2, url: 'https://youtu.be/Kw6rby5SZ7w' },
    ],
  },
  {
    id: 'forest',
    label: 'Rainy Forest',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/29XymHesxa0' },
      { id: 2, url: 'https://youtu.be/lP4wSXSH9nM' },
    ],
  },
  {
    id: 'rain',
    label: 'Rain on Window',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/J4d-a7dVtiQ' },
      { id: 2, url: 'https://youtu.be/IUfA_J4eES0' },
    ],
  },
  {
    id: 'fireplace',
    label: 'Fireplace',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/hEaIebMtRZc' },
    ],
  },
  {
    id: 'bookshelf',
    label: 'Bookshelf',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/hTLa16ZwgX0' },
    ],
  },
]

export const ALL_THEMES = [...AESTHETIC_THEMES, ...VIDEO_THEMES]

export function getYouTubeEmbedUrl(url, isMuted = false) {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/)?.[1]
  if (!videoId) return null
  // mute=0 allows sound to play, mute=1 silences it
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}`
}
