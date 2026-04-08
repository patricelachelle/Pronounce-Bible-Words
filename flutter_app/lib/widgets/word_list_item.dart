import 'package:flutter/material.dart';

import '../models/bible_word.dart';

class WordListItem extends StatelessWidget {
  const WordListItem({
    super.key,
    required this.item,
    required this.isFavorite,
    required this.onTap,
    required this.onFavoriteToggle,
  });

  final BibleWord item;
  final bool isFavorite;
  final VoidCallback onTap;
  final VoidCallback onFavoriteToggle;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        title: Text(item.word, style: Theme.of(context).textTheme.titleMedium),
        subtitle: Text(item.phonetic),
        trailing: IconButton(
          icon: Icon(isFavorite ? Icons.favorite : Icons.favorite_border),
          onPressed: onFavoriteToggle,
          tooltip: isFavorite ? 'Remove from favorites' : 'Add to favorites',
        ),
        onTap: onTap,
      ),
    );
  }
}
