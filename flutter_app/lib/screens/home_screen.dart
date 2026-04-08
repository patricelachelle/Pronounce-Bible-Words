import 'package:flutter/material.dart';

import '../data/bible_words_data.dart';
import '../models/bible_word.dart';
import '../services/favorites_service.dart';
import '../widgets/word_list_item.dart';
import 'word_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _searchController = TextEditingController();
  final _favoritesService = FavoritesService();

  Set<String> _favorites = {};
  bool _showFavoritesOnly = false;

  @override
  void initState() {
    super.initState();
    _loadFavorites();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _loadFavorites() async {
    final loaded = await _favoritesService.loadFavorites();
    setState(() => _favorites = loaded);
  }

  Future<void> _toggleFavorite(BibleWord word) async {
    final updated = Set<String>.from(_favorites);
    if (updated.contains(word.word)) {
      updated.remove(word.word);
    } else {
      updated.add(word.word);
    }
    setState(() => _favorites = updated);
    await _favoritesService.saveFavorites(updated);
  }

  List<BibleWord> get _filteredWords {
    final query = _searchController.text.trim().toLowerCase();
    return bibleWords.where((item) {
      final matchesText = item.word.toLowerCase().contains(query) ||
          item.phonetic.toLowerCase().contains(query);
      final matchesFavorites = !_showFavoritesOnly || _favorites.contains(item.word);
      return matchesText && matchesFavorites;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final words = _filteredWords;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Bible Pronunciation Helper'),
        actions: [
          IconButton(
            onPressed: () => setState(() => _showFavoritesOnly = !_showFavoritesOnly),
            tooltip: _showFavoritesOnly ? 'Show all words' : 'Show favorites only',
            icon: Icon(_showFavoritesOnly ? Icons.favorite : Icons.favorite_border),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: TextField(
              controller: _searchController,
              onChanged: (_) => setState(() {}),
              decoration: InputDecoration(
                hintText: 'Search Bible words',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text('${words.length} words found', style: Theme.of(context).textTheme.bodySmall),
            ),
          ),
          Expanded(
            child: words.isEmpty
                ? const Center(child: Text('No matching words found.'))
                : ListView.builder(
                    itemCount: words.length,
                    itemBuilder: (context, index) {
                      final item = words[index];
                      return WordListItem(
                        item: item,
                        isFavorite: _favorites.contains(item.word),
                        onFavoriteToggle: () => _toggleFavorite(item),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => WordDetailScreen(word: item)),
                          );
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
