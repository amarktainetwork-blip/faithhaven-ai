import { useState } from 'react';
import { Music, Play, Pause, Heart, Search, ListMusic } from 'lucide-react';

const playlists = [
  { id: 1, name: 'Sunday Worship', songs: 24, color: 'from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' },
  { id: 2, name: 'Morning Devotion', songs: 18, color: 'from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]' },
  { id: 3, name: 'Prayer & Meditation', songs: 32, color: 'from-[hsl(150,30%,55%)] to-[hsl(180,40%,50%)]' },
];

const songs = [
  { id: 1, title: 'Amazing Grace', artist: 'Traditional', duration: '3:45', category: 'Hymns' },
  { id: 2, title: '10,000 Reasons', artist: 'Matt Redman', duration: '4:12', category: 'Contemporary' },
  { id: 3, title: 'What a Beautiful Name', artist: 'Hillsong Worship', duration: '5:08', category: 'Contemporary' },
  { id: 4, title: 'How Great Thou Art', artist: 'Stuart Hine', duration: '3:28', category: 'Hymns' },
  { id: 5, title: 'Great Are You Lord', artist: 'All Sons & Daughters', duration: '4:35', category: 'Contemporary' },
];

export default function WorshipMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Worship Music</h1>
        <p className="text-slate-500">Curated playlists for every moment</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
        />
      </div>

      {/* Playlists */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={`bg-gradient-to-br ${playlist.color} rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform`}
          >
            <ListMusic className="w-8 h-8 mb-4" />
            <h3 className="font-bold">{playlist.name}</h3>
            <p className="text-white/70 text-sm">{playlist.songs} songs</p>
          </div>
        ))}
      </div>

      {/* Now Playing */}
      <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">{currentSong.title}</h3>
            <p className="text-slate-500">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-[hsl(210,70%,60%)] rounded-full flex items-center justify-center text-white hover:bg-[hsl(210,60%,50%)] transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
        </div>
      </div>

      {/* Song List */}
      <div className="flex-1 bg-white rounded-2xl border border-[hsl(48,30%,88%)] overflow-hidden">
        <div className="p-4 border-b border-[hsl(48,30%,88%)]">
          <h3 className="font-bold text-slate-800">All Songs</h3>
        </div>
        <div className="overflow-y-auto max-h-[300px]">
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => setCurrentSong(song)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                currentSong.id === song.id ? 'bg-[hsl(210,80%,95%)]' : 'hover:bg-[hsl(48,60%,98%)]'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSong(song);
                  setIsPlaying(true);
                }}
                className="w-10 h-10 rounded-full bg-[hsl(48,60%,96%)] flex items-center justify-center hover:bg-[hsl(210,70%,60%)] hover:text-white transition-colors"
              >
                <Play className="w-4 h-4 ml-0.5" />
              </button>
              <div className="flex-1">
                <p className={`font-medium ${currentSong.id === song.id ? 'text-[hsl(210,70%,50%)]' : 'text-slate-800'}`}>
                  {song.title}
                </p>
                <p className="text-sm text-slate-500">{song.artist}</p>
              </div>
              <span className="px-2 py-1 bg-[hsl(48,60%,96%)] text-slate-500 text-xs rounded-full">
                {song.category}
              </span>
              <span className="text-sm text-slate-400">{song.duration}</span>
              <button className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-full transition-colors">
                <Heart className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
