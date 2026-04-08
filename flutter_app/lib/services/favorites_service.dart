import 'package:shared_preferences/shared_preferences.dart';

/// Persists favorite words locally on the device.
class FavoritesService {
  static const _favoritesKey = 'favorite_words';

  Future<Set<String>> loadFavorites() async {
    final prefs = await SharedPreferences.getInstance();
    final values = prefs.getStringList(_favoritesKey) ?? [];
    return values.toSet();
  }

  Future<void> saveFavorites(Set<String> words) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_favoritesKey, words.toList()..sort());
  }
}
