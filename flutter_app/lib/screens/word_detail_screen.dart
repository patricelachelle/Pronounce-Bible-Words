import 'package:flutter/material.dart';

import '../models/bible_word.dart';
import '../services/audio_service.dart';

class WordDetailScreen extends StatefulWidget {
  const WordDetailScreen({super.key, required this.word});

  final BibleWord word;

  @override
  State<WordDetailScreen> createState() => _WordDetailScreenState();
}

class _WordDetailScreenState extends State<WordDetailScreen> {
  late final AudioService _audioService;
  bool _isPlaying = false;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _audioService = AudioService();
  }

  @override
  void dispose() {
    _audioService.dispose();
    super.dispose();
  }

  Future<void> _playOrPause() async {
    setState(() => _isLoading = true);
    await _audioService.togglePlayPause(widget.word.audioUrl);
    setState(() {
      _isLoading = false;
      _isPlaying = _audioService.isPlaying;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.word.word)),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.word.word, style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: 12),
            Text('Phonetic: ${widget.word.phonetic}', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: _isLoading ? null : _playOrPause,
              icon: _isLoading
                  ? const SizedBox.square(
                      dimension: 16,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : Icon(_isPlaying ? Icons.pause : Icons.play_arrow),
              label: Text(_isPlaying ? 'Pause Audio' : 'Play Audio'),
            ),
            const SizedBox(height: 12),
            Text(
              'Audio links are placeholders for now. Replace with real MP3 URLs later.',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }
}
