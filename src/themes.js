// Aesthetic gradient themes with Spotify playlists
export const AESTHETIC_THEMES = [
  {
    id: 'ember',
    label: 'Ember',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWXRwVJmlkKqJ', // Lofi Café
  },
  {
    id: 'aurora',
    label: 'Aurora',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWZeKCadgRdKQ', // Deep Focus
  },
  {
    id: 'tide',
    label: 'Tide',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
  },
  {
    id: 'grove',
    label: 'Grove',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWYeKT834DGNC', // Forest & Nature
  },
  {
    id: 'midnight',
    label: 'Midnight',
    type: 'gradient',
    spotifyPlaylistId: '37i9dQZF1DWZAqNoBGZDYN', // Study Lofi
  },
]

// Video themes WITH Spotify playlists
export const VIDEO_THEMES = [
  {
    id: 'cafe',
    label: 'Café',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/sYwC7lhccis' },
      { id: 2, url: 'https://youtu.be/lj3WRojfdLs' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWXRwVJmlkKqJ', // Lofi Café
  },
  {
    id: 'train',
    label: 'Train Window',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/q8nPaqfRm_c' },
      { id: 2, url: 'https://youtu.be/dQFTPqTKePw' },
    ],
    spotifyPlaylistId: '37i9dQZF1DXcZQhOHkzX08', // Travel & Adventure
  },
  {
    id: 'tokyo',
    label: 'Tokyo / Japan',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/-Xh4BNbxpI8' },
      { id: 2, url: 'https://youtu.be/Kw6rby5SZ7w' },
    ],
    spotifyPlaylistId: '37i9dQZF1DX9PCZHTxVFsK', // Tokyo Lofi
  },
  {
    id: 'forest',
    label: 'Rainy Forest',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/29XymHesxa0' },
      { id: 2, url: 'https://youtu.be/lP4wSXSH9nM' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWYeKT834DGNC', // Forest & Nature
  },
  {
    id: 'rain',
    label: 'Rain on Window',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/J4d-a7dVtiQ' },
      { id: 2, url: 'https://youtu.be/IUfA_J4eES0' },
    ],
    spotifyPlaylistId: '37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano & Rain
  },
  {
    id: 'fireplace',
    label: 'Fireplace',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/hEaIebMtRZc' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWSJHnPUd5VrJ', // Cozy Fireplace
  },
  {
    id: 'bookshelf',
    label: 'Bookshelf',
    type: 'video',
    videos: [
      { id: 1, url: 'https://youtu.be/hTLa16ZwgX0' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWZAqNoBGZDYN', // Study Lofi
  },
]

export const ALL_THEMES = [...AESTHETIC_THEMES, ...VIDEO_THEMES]

export function getYouTubeEmbedUrl(url, isMuted = false) {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/)?.[1]
  if (!videoId) return null
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}`
}
