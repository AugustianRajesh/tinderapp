# Tinder Clone - Flutter App

A Flutter-based Tinder clone application with swipe cards, matching functionality, and messaging features.

## ✅ Updated Configuration

This project has been updated to work with **Flutter 3.32.0** and **Dart 3.8.0** with null-safety support.

### Key Changes Made:
- ✨ Updated SDK constraint to `>=3.0.0 <4.0.0`
- ✨ Upgraded all dependencies to their latest stable, null-safe versions
- ✨ Replaced `flutter_tindercard` with `appinio_swiper` (modern null-safe alternative)
- ✨ Added `flutter_lints` for better code quality
- ✨ Created `analysis_options.yaml` for Dart analyzer configuration

### Updated Dependencies:
- `flutter_screenutil: ^5.9.0` (was ^1.1.0)
- `font_awesome_flutter: ^10.6.0` (was ^8.7.0)
- `bubble: ^1.2.1` (was ^1.1.9+1)
- `carousel_slider: ^4.2.1` (was ^1.4.1)
- `cupertino_icons: ^1.0.6` (was ^0.1.2)
- `appinio_swiper: ^2.1.1` (replaces flutter_tindercard ^0.1.8)

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.0.0 or higher
- Dart SDK 3.0.0 or higher
- Android Studio / VS Code with Flutter extensions
- A physical device or emulator for testing

### Installation & Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd tinder_clone
   ```

2. **Install dependencies** (already done):
   ```bash
   flutter pub get
   ```

3. **Check your Flutter setup**:
   ```bash
   flutter doctor
   ```

4. **Run the app**:
   ```bash
   flutter run
   ```

### Available Commands

- **Clean build artifacts**:
  ```bash
  flutter clean
  ```

- **Get dependencies**:
  ```bash
  flutter pub get
  ```

- **Run on specific device**:
  ```bash
  flutter devices          # List available devices
  flutter run -d <device-id>
  ```

- **Build for Android**:
  ```bash
  flutter build apk --release
  ```

- **Build for iOS** (macOS only):
  ```bash
  flutter build ios --release
  ```

- **Check for outdated packages**:
  ```bash
  flutter pub outdated
  ```

## 📱 Features

- Splash Screen
- Phone number authentication with OTP verification
- User profile management
- Swipe cards for matching (left = nope, right = like)
- Real-time messaging
- Match notifications
- User feeds

## 🛠️ Troubleshooting

### Common Issues:

1. **Build errors after update**:
   ```bash
   flutter clean
   flutter pub get
   ```

2. **Null safety migration issues**:
   - The codebase may need updates to fully support null safety
   - Run `dart migrate` to help with migration

3. **Android build issues**:
   - Check your Android SDK is up to date
   - Update `android/app/build.gradle` if needed

4. **iOS build issues** (macOS):
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 📄 Project Structure

```
lib/
├── main.dart           # App entry point
├── screens/           # UI screens
├── widgets/           # Reusable widgets
└── models/            # Data models

assets/
├── images/           # Image assets
└── fonts/            # Custom fonts
```

## 🔄 Migration Notes

### Replacing flutter_tindercard with appinio_swiper

The old `flutter_tindercard` package doesn't support null safety, so it was replaced with `appinio_swiper`. If you need to update the swipe card implementation:

**Old import**:
```dart
import 'package:flutter_tindercard/flutter_tindercard.dart';
```

**New import**:
```dart
import 'package:appinio_swiper/appinio_swiper.dart';
```

Refer to [appinio_swiper documentation](https://pub.dev/packages/appinio_swiper) for usage examples.

## 📚 Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter Cookbook](https://flutter.dev/docs/cookbook)
- [appinio_swiper Package](https://pub.dev/packages/appinio_swiper)

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Original Author

[Abhishek Kumar](https://github.com/iamabhishek229313)

---

**Last Updated**: December 11, 2025
**Flutter Version**: 3.32.0
**Dart Version**: 3.8.0
