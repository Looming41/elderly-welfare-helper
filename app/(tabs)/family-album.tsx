import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - 16 * 2 - 10) / 2;

// ─── Placeholder data ────────────────────────────────────────────────────────

const ALBUMS = [
  {
    title: 'Summer Vacation 2024',
    count: 24,
    date: 'July 2024',
    emoji: '🏖️',
    color: '#FFF0D4',
    strips: ['#FFD580', '#FFB347', '#FFA500', '#FF8C00'],
  },
  {
    title: "Tom's Birthday",
    count: 18,
    date: 'March 2024',
    emoji: '🎂',
    color: '#FFE4E4',
    strips: ['#FFB3B3', '#FF8080', '#FF6666', '#FF4D4D'],
  },
  {
    title: 'Christmas 2023',
    count: 36,
    date: 'Dec 2023',
    emoji: '🎄',
    color: '#E4FFE4',
    strips: ['#90EE90', '#66CC66', '#4CAF50', '#388E3C'],
  },
  {
    title: "Sarah's Wedding",
    count: 102,
    date: 'Oct 2023',
    emoji: '💍',
    color: '#F0E4FF',
    strips: ['#D8A4FF', '#C77DFF', '#B44FFF', '#9B00FF'],
  },
];

const PLACEHOLDER_PHOTOS = [
  { label: 'Grandkids at park', color: '#A8D8EA', emoji: '🌿', date: 'Jun 8' },
  { label: 'Family dinner', color: '#FAB1A0', emoji: '🍝', date: 'Jun 5' },
  { label: 'Morning walk', color: '#B2EBF2', emoji: '🌅', date: 'Jun 3' },
  { label: 'Garden flowers', color: '#C8E6C9', emoji: '🌸', date: 'Jun 1' },
  { label: 'Tom visits', color: '#FFE0B2', emoji: '👨‍👧', date: 'May 29' },
  { label: 'Cooking together', color: '#F8BBD0', emoji: '🧑‍🍳', date: 'May 26' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedPhoto {
  uri: string;
  date: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FamilyAlbumScreen() {
  const [uploaded, setUploaded] = useState<UploadedPhoto[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleTakePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to take photos.');
      return;
    }
    setLoading(true);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.85,
      aspect: [4, 3],
    });
    setLoading(false);
    if (!result.canceled && result.assets[0]) {
      const newPhoto: UploadedPhoto = {
        uri: result.assets[0].uri,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
      setUploaded((prev) => [newPhoto, ...prev]);
      setPreview(newPhoto.uri);
    }
  }

  async function handlePickFromLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Photo library access is required to upload photos.');
      return;
    }
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
      aspect: [4, 3],
    });
    setLoading(false);
    if (!result.canceled && result.assets[0]) {
      const newPhoto: UploadedPhoto = {
        uri: result.assets[0].uri,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
      setUploaded((prev) => [newPhoto, ...prev]);
      setPreview(newPhoto.uri);
    }
  }

  function handleDeletePreview(uri: string) {
    Alert.alert('Remove photo?', 'This will remove the photo from your album.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setUploaded((prev) => prev.filter((p) => p.uri !== uri)),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>📸</Text>
          <View>
            <Text style={styles.bannerTitle}>Family Album</Text>
            <Text style={styles.bannerSub}>
              {180 + uploaded.length} photos · 4 albums
            </Text>
          </View>
        </View>

        {/* ── Upload / Camera Widget ── */}
        <View style={styles.uploadWidget}>
          <Text style={styles.uploadWidgetTitle}>Add a New Memory</Text>
          <Text style={styles.uploadWidgetSub}>Take a photo or choose one from your library</Text>

          <View style={styles.uploadBtnsRow}>
            <TouchableOpacity style={styles.uploadBtnCamera} onPress={handleTakePhoto} activeOpacity={0.85} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Text style={styles.uploadBtnIcon}>📷</Text>
                  <Text style={styles.uploadBtnLabel}>Take Photo</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBtnLibrary} onPress={handlePickFromLibrary} activeOpacity={0.85} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#E8813A" size="small" />
              ) : (
                <>
                  <Text style={styles.uploadBtnIcon}>🖼️</Text>
                  <Text style={styles.uploadBtnLabelAlt}>From Library</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Uploaded Photos Preview Strip ── */}
        {uploaded.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Just Added</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentStrip}>
              {uploaded.map((photo, i) => (
                <TouchableOpacity key={i} onPress={() => setPreview(photo.uri)} activeOpacity={0.9}>
                  <Image source={{ uri: photo.uri }} style={styles.recentThumb} />
                  <View style={styles.recentOverlay}>
                    <Text style={styles.recentDate}>{photo.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Albums */}
        <Text style={styles.sectionTitle}>Albums</Text>
        <View style={styles.albumsList}>
          {ALBUMS.map((album) => (
            <TouchableOpacity key={album.title} style={[styles.albumCard, { backgroundColor: album.color }]} activeOpacity={0.8}>
              <View style={styles.albumStrips}>
                {album.strips.map((c, i) => (
                  <View key={i} style={[styles.albumStrip, { backgroundColor: c }]} />
                ))}
              </View>
              <Text style={styles.albumEmoji}>{album.emoji}</Text>
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumMeta}>{album.count} photos · {album.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Placeholder Recent Photos */}
        <Text style={styles.sectionTitle}>Recent Photos</Text>
        <View style={styles.photosGrid}>
          {PLACEHOLDER_PHOTOS.map((photo, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.photoTile, { backgroundColor: photo.color, width: PHOTO_SIZE, height: PHOTO_SIZE }]}
              activeOpacity={0.85}
            >
              <Text style={styles.photoEmoji}>{photo.emoji}</Text>
              <View style={styles.photoOverlay}>
                <Text style={styles.photoLabel}>{photo.label}</Text>
                <Text style={styles.photoDate}>{photo.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── Full-screen Preview Modal ── */}
      <Modal visible={preview !== null} transparent animationType="fade" onRequestClose={() => setPreview(null)}>
        <View style={styles.modalBackdrop}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setPreview(null)} activeOpacity={0.8}>
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>

          {preview && (
            <Image source={{ uri: preview }} style={styles.modalImage} resizeMode="contain" />
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalActionBtn}
              onPress={() => {
                if (preview) handleDeletePreview(preview);
                setPreview(null);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.modalActionIcon}>🗑️</Text>
              <Text style={styles.modalActionLabel}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalActionBtn, styles.modalActionPrimary]} onPress={() => setPreview(null)} activeOpacity={0.8}>
              <Text style={styles.modalActionIcon}>✅</Text>
              <Text style={[styles.modalActionLabel, { color: '#FFFFFF' }]}>Keep Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const shadow = Platform.select({
  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  android: { elevation: 3 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5EB' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 12 },

  // Header banner
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8CC',
    borderRadius: 18,
    padding: 20,
    gap: 16,
    marginBottom: 20,
    ...shadow,
  },
  bannerEmoji: { fontSize: 44 },
  bannerTitle: { fontSize: 22, fontWeight: '800', color: '#3D2B1F' },
  bannerSub: { fontSize: 14, color: '#8B7355', marginTop: 2 },

  // Upload widget
  uploadWidget: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#F0E0CC',
    borderStyle: 'dashed',
    alignItems: 'center',
    ...shadow,
  },
  uploadWidgetTitle: { fontSize: 18, fontWeight: '700', color: '#3D2B1F', marginBottom: 4 },
  uploadWidgetSub: { fontSize: 14, color: '#8B7355', textAlign: 'center', marginBottom: 18 },
  uploadBtnsRow: { flexDirection: 'row', gap: 12, width: '100%' },
  uploadBtnCamera: {
    flex: 1,
    backgroundColor: '#E8813A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    ...Platform.select({
      ios: { shadowColor: '#E8813A', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 6 },
      android: { elevation: 4 },
    }),
  },
  uploadBtnLibrary: {
    flex: 1,
    backgroundColor: '#FFF0D4',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#E8813A',
  },
  uploadBtnIcon: { fontSize: 26 },
  uploadBtnLabel: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  uploadBtnLabelAlt: { fontSize: 15, fontWeight: '700', color: '#E8813A' },

  // Just Added strip
  recentStrip: { paddingBottom: 16, gap: 10 },
  recentThumb: {
    width: 110,
    height: 110,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
  },
  recentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  recentDate: { fontSize: 11, fontWeight: '600', color: '#FFFFFF' },

  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#3D2B1F', marginBottom: 12 },

  // Albums
  albumsList: { gap: 12, marginBottom: 24 },
  albumCard: { borderRadius: 16, padding: 16, overflow: 'hidden', ...shadow },
  albumStrips: { flexDirection: 'row', height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 12 },
  albumStrip: { flex: 1 },
  albumEmoji: { fontSize: 28, marginBottom: 6 },
  albumTitle: { fontSize: 17, fontWeight: '700', color: '#3D2B1F', marginBottom: 4 },
  albumMeta: { fontSize: 13, color: '#8B7355' },

  // Placeholder photo grid
  photosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  photoTile: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadow,
  },
  photoEmoji: { fontSize: 44 },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  photoLabel: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  photoDate: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  // Preview Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 36,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalCloseText: { fontSize: 18, color: '#FFFFFF', fontWeight: '700' },
  modalImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  modalActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingVertical: 16,
  },
  modalActionPrimary: { backgroundColor: '#E8813A' },
  modalActionIcon: { fontSize: 20 },
  modalActionLabel: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
