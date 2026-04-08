import 'package:bible_pronunciation_helper/main.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('app renders home title', (tester) async {
    await tester.pumpWidget(const PronounceBibleWordsApp());

    expect(find.text('Bible Pronunciation Helper'), findsOneWidget);
  });
}
