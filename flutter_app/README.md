# Bible Pronunciation Helper (Flutter)

A beginner-friendly Flutter app for iOS and Android that helps users search difficult Bible words and hear pronunciation audio.

## Features

- Search bar on home screen
- Local dataset with 50+ difficult Bible names
- Detail screen with word + phonetic spelling
- Play/pause pronunciation audio with placeholder URLs
- Dark mode support (follows system setting)
- Favorites (saved locally on device)

## Project structure

```text
flutter_app/
├── lib/
│   ├── data/
│   │   └── bible_words_data.dart
│   ├── models/
│   │   └── bible_word.dart
│   ├── screens/
│   │   ├── home_screen.dart
│   │   └── word_detail_screen.dart
│   ├── services/
│   │   ├── audio_service.dart
│   │   └── favorites_service.dart
│   ├── widgets/
│   │   └── word_list_item.dart
│   └── main.dart
├── test/
│   └── widget_test.dart
├── analysis_options.yaml
└── pubspec.yaml
```

## Prerequisites

1. Install Flutter SDK: <https://docs.flutter.dev/get-started/install>
2. Verify setup:
   ```bash
   flutter doctor
   ```
3. Have one of these ready:
   - Android Studio emulator OR physical Android device
   - Xcode iOS Simulator (macOS only) OR physical iPhone

## Run locally

From the repository root:

```bash
cd flutter_app
flutter pub get
flutter run
```

If multiple devices are connected:

```bash
flutter devices
flutter run -d <device_id>
```

## Notes for beginners

- Audio URLs are placeholders (`https://example.com/...`). Replace with your real audio files to hear real pronunciations.
- Favorites are stored with `shared_preferences`, so they persist across app restarts.
- Search matches both the word and phonetic spelling.

## Useful commands

```bash
flutter analyze
flutter test
```
