export const THEMES = [
  {
    id: 'cafe',
    label: 'Café',
    videos: [
      { id: 1, url: 'https://youtu.be/sYwC7lhccis' },
      { id: 2, url: 'https://youtu.be/lj3WRojfdLs' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWXRwVJmlkKqJ',
  },
  {
    id: 'train',
    label: 'Train Window',
    videos: [
      { id: 1, url: 'https://youtu.be/q8nPaqfRm_c' },
      { id: 2, url: 'https://youtu.be/dQFTPqTKePw' },
    ],
    spotifyPlaylistId: '37i9dQZF1DXcZQhOHkzX08',
  },
  {
    id: 'tokyo',
    label: 'Tokyo / Japan',
    videos: [
      { id: 1, url: 'https://youtu.be/-Xh4BNbxpI8' },
      { id: 2, url: 'https://youtu.be/Kw6rby5SZ7w' },
    ],
    spotifyPlaylistId: '37i9dQZF1DX9PCZHTxVFsK',
  },
  {
    id: 'forest',
    label: 'Rainy Forest/Nature',
    videos: [
      { id: 1, url: 'https://youtu.be/29XymHesxa0' },
      { id: 2, url: 'https://youtu.be/lP4wSXSH9nM' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWYeKT834DGNC',
  },
  {
    id: 'rain',
    label: 'Rain on Window',
    videos: [
      { id: 1, url: 'https://youtu.be/J4d-a7dVtiQ' },
      { id: 2, url: 'https://youtu.be/IUfA_J4eES0' },
    ],
    spotifyPlaylistId: '37i9dQZF1DXcZQhOHkzX08',
  },
  {
    id: 'fireplace',
    label: 'Fireplace',
    videos: [
      { id: 1, url: 'https://youtu.be/hEaIebMtRZc' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWSJHnPUd5VrJ',
  },
  {
    id: 'bookshelf',
    label: 'Bookshelf',
    videos: [
      { id: 1, url: 'https://youtu.be/hTLa16ZwgX0' },
    ],
    spotifyPlaylistId: '37i9dQZF1DWZAqNoBGZDYN',
  },
]

export function getYouTubeEmbedUrl(url) {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/)?.[1]
  if (!videoId) return null
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`
}
