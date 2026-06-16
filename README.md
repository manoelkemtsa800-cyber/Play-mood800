# PlayMood 🎵
**Every mood has its soundtrack.**

PlayMood is a premium music streaming platform that adapts recommendations to users' emotions and tastes.

## Highlights
- **Mood Match**: Intelligent playlist generation based on current mood.
- **Modern UI**: Full Dark Mode, React Native Reanimated gestures, sleek styling.
- **Supabase Backend**: Complete Auth, Realtime Postgres, and Edge Storage configured.
- **High Performance**: Optimized with FlashList, MMKV storage, and pure React Native CLI.

## Prerequisites
- **Node.js**: v18+
- **React Native Environment**: Configure according to [official docs](https://reactnative.dev/docs/environment-setup)
- **Supabase**: Access to a new Supabase project.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd PlayMood
   npm install
   ```

2. **Supabase Configuration**
   - Copy `.env.example` to `.env` and fill in your Supabase project credentials.
   - Run the SQL migration located in `supabase/migrations/20240101000000_initial_schema.sql` via your Supabase SQL Editor.
   - Go to Supabase Storage and create the following Public Buckets:
     - `avatars`
     - `song-covers`
     - `songs`
     - `playlist-covers`
     - `artist-images`
     - `podcast-covers`
     - `podcast-audio`
     - `lyrics-files`

3. **Run Android**
   ```bash
   npm run android
   ```
   *To generate an APK:*
   ```bash
   cd android && ./gradlew assembleRelease
   ```
   *The APK will be available in `android/app/build/outputs/apk/release/`.*

4. **Run iOS**
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```
   *To generate an iOS Build, open `ios/PlayMood.xcworkspace` in Xcode, select Product > Archive.*

## Architecture Structure
- `src/screens`: Organized by feature (`auth`, `home`, `mood`, `player`, `library`, `profile`).
- `src/components`: Reusable, styled UI blocks.
- `src/navigation`: App-wide and modular routing.
- `src/store`: Zustand state management (Auth, Mood, Player).
- `src/services`: Supabase hooks, MMKV configuration.
- `src/theme`: Centralized Design System (`colors.ts`, `typography.ts`).
