import 'package:audioplayers/audioplayers.dart';

/// Small wrapper service so UI code stays clean.
class AudioService {
  AudioService() {
    _player.onPlayerComplete.listen((_) {
      _isPlaying = false;
    });
  }

  final AudioPlayer _player = AudioPlayer();
  bool _isPlaying = false;

  bool get isPlaying => _isPlaying;

  Future<void> togglePlayPause(String url) async {
    if (_isPlaying) {
      await _player.pause();
      _isPlaying = false;
    } else {
      await _player.play(UrlSource(url));
      _isPlaying = true;
    }
  }

  Future<void> stop() async {
    await _player.stop();
    _isPlaying = false;
  }

  Future<void> dispose() async {
    await _player.dispose();
  }
}
