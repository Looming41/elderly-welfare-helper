import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const today = new Date();
const dateString = today.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const QUICK_STATS = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', emoji: '💓', color: '#FFE8E8', accent: '#E05555' },
  { label: 'Steps Today', value: '3,241', unit: 'steps', emoji: '👟', color: '#E8F4FF', accent: '#4A90D9' },
  { label: 'Sleep', value: '7.5', unit: 'hrs', emoji: '😴', color: '#F0E8FF', accent: '#8B5CF6' },
];

const SCHEDULE = [
  { time: '9:00 AM', label: 'Morning Walk', emoji: '🌳', done: true },
  { time: '10:30 AM', label: 'Doctor Appointment', emoji: '🏥', done: false },
  { time: '12:00 PM', label: 'Lunch with Family', emoji: '🍽️', done: false },
  { time: '3:00 PM', label: 'Medication Reminder', emoji: '💊', done: false },
  { time: '5:00 PM', label: 'Evening Exercise', emoji: '🧘', done: false },
];

const FAMILY_MSGS = [
  { name: 'Sarah (Daughter)', msg: 'Good morning! Hope you slept well 😊', time: '8:02 AM' },
  { name: 'Tom (Son)', msg: 'See you at lunch today!', time: '7:45 AM' },
];

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Good Morning, Grandpa! 👋</Text>
          <Text style={styles.dateText}>{dateString}</Text>
        </View>

        <TouchableOpacity style={styles.emergencyBtn} activeOpacity={0.8}>
          <Text style={styles.emergencyIcon}>🚨</Text>
          <Text style={styles.emergencyText}>Emergency Help</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsRow}>
          {QUICK_STATS.map((stat) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: stat.color }]}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={[styles.statValue, { color: stat.accent }]}>{stat.value}</Text>
              <Text style={styles.statUnit}>{stat.unit}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <View style={styles.card}>
          {SCHEDULE.map((item, i) => (
            <View key={i} style={[styles.scheduleItem, i < SCHEDULE.length - 1 && styles.divider]}>
              <View style={[styles.dot, { backgroundColor: item.done ? '#4CAF50' : '#E0E0E0' }]} />
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <Text style={styles.scheduleEmoji}>{item.emoji}</Text>
              <Text style={[styles.scheduleLabel, item.done && styles.done]}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Messages from Family</Text>
        <View style={styles.card}>
          {FAMILY_MSGS.map((msg, i) => (
            <View key={i} style={[styles.msgItem, i < FAMILY_MSGS.length - 1 && styles.divider]}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{msg.name[0]}</Text>
              </View>
              <View style={styles.msgBody}>
                <View style={styles.msgHeader}>
                  <Text style={styles.msgName}>{msg.name}</Text>
                  <Text style={styles.msgTime}>{msg.time}</Text>
                </View>
                <Text style={styles.msgText}>{msg.msg}</Text>
              </View>
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

  greeting: { marginBottom: 16 },
  greetingText: { fontSize: 26, fontWeight: '700', color: '#3D2B1F', marginBottom: 4 },
  dateText: { fontSize: 15, color: '#8B7355' },

  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    gap: 10,
    ...Platform.select({
      ios: { shadowColor: '#FF4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  emergencyIcon: { fontSize: 26 },
  emergencyText: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },

  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#3D2B1F', marginBottom: 12, marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '800' },
  statUnit: { fontSize: 12, color: '#666', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#555', textAlign: 'center', fontWeight: '600' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
    ...shadow,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: '#F5F0EB' },

  scheduleItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  scheduleTime: { fontSize: 14, color: '#8B7355', width: 72, fontWeight: '600' },
  scheduleEmoji: { fontSize: 20 },
  scheduleLabel: { fontSize: 16, color: '#3D2B1F', flex: 1, fontWeight: '500' },
  done: { textDecorationLine: 'line-through', color: '#AAAAAA' },

  msgItem: { flexDirection: 'row', padding: 14, gap: 12, alignItems: 'flex-start' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8813A', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  msgBody: { flex: 1 },
  msgHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  msgName: { fontSize: 15, fontWeight: '700', color: '#3D2B1F' },
  msgTime: { fontSize: 13, color: '#AAAAAA' },
  msgText: { fontSize: 15, color: '#555555', lineHeight: 21 },
});
