import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const today = new Date();
const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

const VITALS = [
  { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', emoji: '🫀', color: '#FFE8E8', accent: '#E05555', status: 'Normal', statusColor: '#4CAF50' },
  { label: 'Heart Rate', value: '72', unit: 'bpm', emoji: '💓', color: '#FFF0D4', accent: '#E8813A', status: 'Normal', statusColor: '#4CAF50' },
  { label: 'Temperature', value: '36.5', unit: '°C', emoji: '🌡️', color: '#E4F0FF', accent: '#4A90D9', status: 'Normal', statusColor: '#4CAF50' },
  { label: 'Blood Sugar', value: '98', unit: 'mg/dL', emoji: '🩸', color: '#E4FFE8', accent: '#4CAF50', status: 'Normal', statusColor: '#4CAF50' },
  { label: 'Weight', value: '68.2', unit: 'kg', emoji: '⚖️', color: '#F0E4FF', accent: '#9B5CF6', status: '↓ 0.3 kg', statusColor: '#4A90D9' },
  { label: 'SpO2', value: '98', unit: '%', emoji: '🫁', color: '#E4EEFF', accent: '#3B6ECC', status: 'Excellent', statusColor: '#4CAF50' },
];

const MEDICATIONS = [
  { name: 'Metformin 500mg', time: '8:00 AM', taken: true, note: 'With breakfast' },
  { name: 'Amlodipine 5mg', time: '8:00 AM', taken: true, note: 'Blood pressure' },
  { name: 'Vitamin D 1000IU', time: '12:00 PM', taken: false, note: 'With lunch' },
  { name: 'Omega-3', time: '6:00 PM', taken: false, note: 'With dinner' },
];

const MOOD_OPTIONS = [
  { label: 'Great', emoji: '😄' },
  { label: 'Good', emoji: '🙂' },
  { label: 'Okay', emoji: '😐' },
  { label: 'Tired', emoji: '😴' },
  { label: 'Unwell', emoji: '🤒' },
];

const ACTIVITIES = [
  { label: 'Morning walk', duration: '25 min', emoji: '🚶', calories: 85 },
  { label: 'Stretching', duration: '10 min', emoji: '🧘', calories: 30 },
];

const WATER_CUPS = 5;
const WATER_GOAL = 8;

export default function TodayStatusScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Date Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateTitle}>{dateStr}</Text>
          <View style={styles.overallBadge}>
            <Text style={styles.overallText}>✅ Looking Good Today!</Text>
          </View>
        </View>

        {/* Mood */}
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.moodCard}>
          <View style={styles.moodRow}>
            {MOOD_OPTIONS.map((m, i) => (
              <TouchableOpacity key={m.label} style={[styles.moodBtn, i === 1 && styles.moodBtnActive]} activeOpacity={0.75}>
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                <Text style={[styles.moodLabel, i === 1 && styles.moodLabelActive]}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vitals */}
        <Text style={styles.sectionTitle}>Vital Signs</Text>
        <View style={styles.vitalsGrid}>
          {VITALS.map((v) => (
            <View key={v.label} style={[styles.vitalCard, { backgroundColor: v.color }]}>
              <Text style={styles.vitalEmoji}>{v.emoji}</Text>
              <Text style={[styles.vitalValue, { color: v.accent }]}>{v.value}</Text>
              <Text style={styles.vitalUnit}>{v.unit}</Text>
              <Text style={styles.vitalLabel}>{v.label}</Text>
              <View style={[styles.vitalStatusBadge, { backgroundColor: v.statusColor + '22' }]}>
                <Text style={[styles.vitalStatusText, { color: v.statusColor }]}>{v.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Medications */}
        <Text style={styles.sectionTitle}>Medications</Text>
        <View style={styles.card}>
          {MEDICATIONS.map((med, i) => (
            <View key={i} style={[styles.medRow, i < MEDICATIONS.length - 1 && styles.divider]}>
              <View style={[styles.medCheckBox, med.taken && styles.medCheckBoxDone]}>
                {med.taken && <Text style={styles.medCheckMark}>✓</Text>}
              </View>
              <View style={styles.medInfo}>
                <Text style={[styles.medName, med.taken && styles.medNameDone]}>{med.name}</Text>
                <Text style={styles.medNote}>{med.note} · {med.time}</Text>
              </View>
              {!med.taken && (
                <TouchableOpacity style={styles.medTakeBtn} activeOpacity={0.8}>
                  <Text style={styles.medTakeBtnText}>Take</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Water Intake */}
        <Text style={styles.sectionTitle}>Water Intake</Text>
        <View style={styles.card}>
          <View style={styles.waterHeader}>
            <Text style={styles.waterCount}>💧 {WATER_CUPS} / {WATER_GOAL} cups</Text>
            <Text style={styles.waterPercent}>{Math.round((WATER_CUPS / WATER_GOAL) * 100)}%</Text>
          </View>
          <View style={styles.waterBarBg}>
            <View style={[styles.waterBarFill, { width: `${(WATER_CUPS / WATER_GOAL) * 100}%` }]} />
          </View>
          <View style={styles.waterCupsRow}>
            {Array.from({ length: WATER_GOAL }).map((_, i) => (
              <Text key={i} style={[styles.waterCup, i >= WATER_CUPS && styles.waterCupEmpty]}>💧</Text>
            ))}
          </View>
          <TouchableOpacity style={styles.addWaterBtn} activeOpacity={0.8}>
            <Text style={styles.addWaterText}>+ Add a cup</Text>
          </TouchableOpacity>
        </View>

        {/* Activity */}
        <Text style={styles.sectionTitle}>Today's Activity</Text>
        <View style={styles.card}>
          {ACTIVITIES.length === 0 ? (
            <Text style={styles.emptyText}>No activities logged yet</Text>
          ) : (
            ACTIVITIES.map((act, i) => (
              <View key={i} style={[styles.actRow, i < ACTIVITIES.length - 1 && styles.divider]}>
                <Text style={styles.actEmoji}>{act.emoji}</Text>
                <View style={styles.actInfo}>
                  <Text style={styles.actLabel}>{act.label}</Text>
                  <Text style={styles.actMeta}>{act.duration} · {act.calories} kcal</Text>
                </View>
              </View>
            ))
          )}
          <TouchableOpacity style={styles.logActivityBtn} activeOpacity={0.8}>
            <Text style={styles.logActivityText}>+ Log Activity</Text>
          </TouchableOpacity>
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

  dateHeader: { marginBottom: 20, gap: 8 },
  dateTitle: { fontSize: 22, fontWeight: '700', color: '#3D2B1F' },
  overallBadge: { alignSelf: 'flex-start', backgroundColor: '#DFFCE8', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  overallText: { fontSize: 14, fontWeight: '700', color: '#2E7D45' },

  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#3D2B1F', marginBottom: 12, marginTop: 4 },

  moodCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 24, ...shadow },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12, gap: 4 },
  moodBtnActive: { backgroundColor: '#FFF0D4' },
  moodEmoji: { fontSize: 26 },
  moodLabel: { fontSize: 11, color: '#8B7355', fontWeight: '600' },
  moodLabelActive: { color: '#E8813A', fontWeight: '700' },

  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  vitalCard: {
    width: '47%',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 3,
    ...shadow,
  },
  vitalEmoji: { fontSize: 24 },
  vitalValue: { fontSize: 22, fontWeight: '800' },
  vitalUnit: { fontSize: 12, color: '#666' },
  vitalLabel: { fontSize: 12, color: '#555', fontWeight: '600', textAlign: 'center' },
  vitalStatusBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  vitalStatusText: { fontSize: 11, fontWeight: '700' },

  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 4, marginBottom: 24, ...shadow },
  divider: { borderBottomWidth: 1, borderBottomColor: '#F5F0EB' },

  medRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  medCheckBox: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center' },
  medCheckBoxDone: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  medCheckMark: { fontSize: 14, color: '#FFFFFF', fontWeight: '800' },
  medInfo: { flex: 1 },
  medName: { fontSize: 16, fontWeight: '600', color: '#3D2B1F' },
  medNameDone: { textDecorationLine: 'line-through', color: '#AAAAAA' },
  medNote: { fontSize: 13, color: '#8B7355', marginTop: 2 },
  medTakeBtn: { backgroundColor: '#E8813A', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  medTakeBtnText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },

  waterHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 14 },
  waterCount: { fontSize: 16, fontWeight: '700', color: '#3D2B1F' },
  waterPercent: { fontSize: 16, fontWeight: '700', color: '#4A90D9' },
  waterBarBg: { height: 10, backgroundColor: '#E8F4FF', borderRadius: 5, overflow: 'hidden', marginHorizontal: 14, marginVertical: 10 },
  waterBarFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 5 },
  waterCupsRow: { flexDirection: 'row', paddingHorizontal: 14, gap: 4, flexWrap: 'wrap' },
  waterCup: { fontSize: 22 },
  waterCupEmpty: { opacity: 0.25 },
  addWaterBtn: { margin: 14, backgroundColor: '#E8F4FF', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  addWaterText: { fontSize: 15, fontWeight: '700', color: '#4A90D9' },

  actRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  actEmoji: { fontSize: 28 },
  actInfo: { flex: 1 },
  actLabel: { fontSize: 16, fontWeight: '600', color: '#3D2B1F' },
  actMeta: { fontSize: 13, color: '#8B7355', marginTop: 2 },
  emptyText: { padding: 14, fontSize: 15, color: '#AAAAAA', textAlign: 'center' },
  logActivityBtn: { margin: 14, backgroundColor: '#E4FFE8', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  logActivityText: { fontSize: 15, fontWeight: '700', color: '#4CAF50' },
});
