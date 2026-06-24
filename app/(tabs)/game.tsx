import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GAMES = [
  {
    title: 'Memory Match',
    desc: 'Flip cards and find matching pairs',
    emoji: '🃏',
    color: '#FFF0D4',
    accent: '#E8813A',
    difficulty: 'Easy',
    points: 120,
    badge: '⭐ Favorite',
  },
  {
    title: 'Word Puzzle',
    desc: 'Unscramble letters to form words',
    emoji: '🔤',
    color: '#E4F0FF',
    accent: '#4A90D9',
    difficulty: 'Medium',
    points: 85,
    badge: null,
  },
  {
    title: 'Number Sudoku',
    desc: 'Fill the grid with the right numbers',
    emoji: '🔢',
    color: '#E4FFE8',
    accent: '#4CAF50',
    difficulty: 'Medium',
    points: 200,
    badge: '🏆 Best Score',
  },
  {
    title: 'Picture Quiz',
    desc: "Guess what's in the photo",
    emoji: '🖼️',
    color: '#F0E4FF',
    accent: '#9B5CF6',
    difficulty: 'Easy',
    points: 60,
    badge: null,
  },
  {
    title: 'Simple Math',
    desc: 'Quick addition and subtraction',
    emoji: '➕',
    color: '#FFE4E4',
    accent: '#E05555',
    difficulty: 'Easy',
    points: 45,
    badge: null,
  },
];

const ACHIEVEMENTS = [
  { label: '7-Day Streak', emoji: '🔥', earned: true },
  { label: 'Memory Master', emoji: '🧠', earned: true },
  { label: 'Word Wizard', emoji: '✨', earned: false },
  { label: 'Number Ninja', emoji: '⚡', earned: false },
];

const DIFF_COLOR: Record<string, string> = {
  Easy: '#4CAF50',
  Medium: '#FF9800',
  Hard: '#F44336',
};

export default function GameScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Score Banner */}
        <View style={styles.scoreBanner}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>Total Points</Text>
            <Text style={styles.scoreValue}>510</Text>
            <Text style={styles.scoreLevel}>🎖️ Level 5 — Senior Explorer</Text>
          </View>
          <Text style={styles.scoreTrophy}>🏆</Text>
        </View>

        {/* Daily Challenge */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeBadge}>⚡ Daily Challenge</Text>
            <Text style={styles.challengeTimer}>Ends in 4h 32m</Text>
          </View>
          <Text style={styles.challengeTitle}>Play 3 games today</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '33%' }]} />
          </View>
          <Text style={styles.progressText}>1 of 3 completed</Text>
        </View>

        {/* Games List */}
        <Text style={styles.sectionTitle}>Games</Text>
        <View style={styles.gamesList}>
          {GAMES.map((game) => (
            <TouchableOpacity key={game.title} style={[styles.gameCard, { backgroundColor: game.color }]} activeOpacity={0.85}>
              <Text style={styles.gameEmoji}>{game.emoji}</Text>
              <View style={styles.gameInfo}>
                <View style={styles.gameTitleRow}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  {game.badge && <Text style={styles.gameBadge}>{game.badge}</Text>}
                </View>
                <Text style={styles.gameDesc}>{game.desc}</Text>
                <View style={styles.gameMeta}>
                  <View style={[styles.diffTag, { backgroundColor: DIFF_COLOR[game.difficulty] + '22' }]}>
                    <Text style={[styles.diffText, { color: DIFF_COLOR[game.difficulty] }]}>{game.difficulty}</Text>
                  </View>
                  <Text style={styles.gamePoints}>🌟 {game.points} pts</Text>
                </View>
              </View>
              <View style={[styles.playBtn, { backgroundColor: game.accent }]}>
                <Text style={styles.playBtnText}>▶</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsRow}>
          {ACHIEVEMENTS.map((a) => (
            <View key={a.label} style={[styles.achievementItem, !a.earned && styles.achievementLocked]}>
              <Text style={[styles.achievementEmoji, !a.earned && styles.achievementEmojiLocked]}>{a.emoji}</Text>
              <Text style={[styles.achievementLabel, !a.earned && styles.achievementLabelLocked]}>{a.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const shadow = Platform.select({
  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  android: { elevation: 3 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5EB' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 12 },

  scoreBanner: {
    backgroundColor: '#3D2B1F',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#3D2B1F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
      android: { elevation: 6 },
    }),
  },
  scoreLeft: {},
  scoreLabel: { fontSize: 14, color: '#BBA080', marginBottom: 4 },
  scoreValue: { fontSize: 42, fontWeight: '900', color: '#FFD580', lineHeight: 48 },
  scoreLevel: { fontSize: 13, color: '#BBA080', marginTop: 4 },
  scoreTrophy: { fontSize: 56 },

  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#E8813A',
    ...shadow,
  },
  challengeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  challengeBadge: { fontSize: 14, fontWeight: '700', color: '#E8813A' },
  challengeTimer: { fontSize: 13, color: '#8B7355' },
  challengeTitle: { fontSize: 17, fontWeight: '700', color: '#3D2B1F', marginBottom: 12 },
  progressBarBg: { height: 10, backgroundColor: '#F0E6D8', borderRadius: 5, overflow: 'hidden', marginBottom: 6 },
  progressBarFill: { height: '100%', backgroundColor: '#E8813A', borderRadius: 5 },
  progressText: { fontSize: 13, color: '#8B7355' },

  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#3D2B1F', marginBottom: 12 },

  gamesList: { gap: 12, marginBottom: 24 },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    ...shadow,
  },
  gameEmoji: { fontSize: 36 },
  gameInfo: { flex: 1 },
  gameTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  gameTitle: { fontSize: 17, fontWeight: '700', color: '#3D2B1F' },
  gameBadge: { fontSize: 11, fontWeight: '600', color: '#8B7355' },
  gameDesc: { fontSize: 13, color: '#666', marginTop: 3, marginBottom: 8 },
  gameMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  diffTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  diffText: { fontSize: 12, fontWeight: '700' },
  gamePoints: { fontSize: 13, color: '#8B7355' },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  playBtnText: { fontSize: 16, color: '#FFFFFF' },

  achievementsRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 24 },
  achievementItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    ...shadow,
  },
  achievementLocked: { opacity: 0.5 },
  achievementEmoji: { fontSize: 30 },
  achievementEmojiLocked: { opacity: 0.4 },
  achievementLabel: { fontSize: 13, fontWeight: '600', color: '#3D2B1F', textAlign: 'center' },
  achievementLabelLocked: { color: '#AAAAAA' },
});
