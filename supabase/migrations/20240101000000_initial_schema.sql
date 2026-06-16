-- INITIAL SCHEMA FOR PLAYMOOD

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. GENRES
CREATE TABLE genres (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  cover_image TEXT
);

-- 3. ARTISTS
CREATE TABLE artists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ALBUMS
CREATE TABLE albums (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  release_date DATE,
  cover_url TEXT,
  genre_id UUID REFERENCES genres(id)
);

-- 5. SONGS
CREATE TABLE songs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  duration INT NOT NULL, -- in seconds
  audio_url TEXT NOT NULL,
  plays_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PLAYLISTS
CREATE TABLE playlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PLAYLIST_SONGS
CREATE TABLE playlist_songs (
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (playlist_id, song_id)
);

-- 8. LIKED_SONGS
CREATE TABLE liked_songs (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  liked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, song_id)
);

-- 9. LIKED_ALBUMS
CREATE TABLE liked_albums (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  liked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, album_id)
);

-- 10. FOLLOWED_ARTISTS
CREATE TABLE followed_artists (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, artist_id)
);

-- 11. FOLLOWED_USERS
CREATE TABLE followed_users (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- 12. PODCASTS
CREATE TABLE podcasts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. EPISODES
CREATE TABLE episodes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  podcast_id UUID REFERENCES podcasts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration INT NOT NULL,
  release_date TIMESTAMPTZ DEFAULT NOW()
);

-- 14. FOLLOWED_PODCASTS
CREATE TABLE followed_podcasts (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  podcast_id UUID REFERENCES podcasts(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, podcast_id)
);

-- 15. DOWNLOADS
CREATE TABLE downloads (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id),
  episode_id UUID REFERENCES episodes(id),
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (song_id IS NOT NULL OR episode_id IS NOT NULL)
);

-- 16. NOTIFICATIONS
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. LISTENING_HISTORY
CREATE TABLE listening_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id),
  episode_id UUID REFERENCES episodes(id),
  listened_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. SEARCH_HISTORY
CREATE TABLE search_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. LYRICS
CREATE TABLE lyrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  text_content TEXT NOT NULL,
  synced_json JSONB
);

-- 20. PLAYLIST_COLLABORATORS
CREATE TABLE playlist_collaborators (
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (playlist_id, user_id)
);

-- 21. MOODS
CREATE TABLE moods (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  emoji TEXT,
  color_hex TEXT
);

INSERT INTO moods (name, emoji, color_hex) VALUES 
  ('Heureux', '😊', '#FFD700'),
  ('Relaxé', '😌', '#87CEEB'),
  ('Motivé', '💪', '#FF4500'),
  ('Triste', '😢', '#4682B4'),
  ('Amoureux', '❤️', '#FF69B4'),
  ('Festif', '🎉', '#9400D3'),
  ('Fatigué', '😴', '#708090'),
  ('Concentré', '🤔', '#32CD32');

-- 22. MOOD_RECOMMENDATIONS
CREATE TABLE mood_recommendations (
  mood_id UUID REFERENCES moods(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  PRIMARY KEY (mood_id, song_id)
);

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public playlists are viewable by everyone."
  ON playlists FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own playlists."
  ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own playlists."
  ON playlists FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own playlists."
  ON playlists FOR DELETE USING (auth.uid() = user_id);
