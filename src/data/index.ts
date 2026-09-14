import { VocabItem } from '../types';
import { VOCAB_LIST } from './vocabList';
import { VOCAB_LIST_PART2 } from './vocabList2';
import { VOCAB_LIST_PART3 } from './vocabList3';
import { VOCAB_LIST_PART4 } from './vocabList4';
import { VOCAB_LIST_PART5 } from './vocabList5';
import { VOCAB_LIST_PART6 } from './vocabList6';

export const ALL_VOCAB: VocabItem[] = [
  ...VOCAB_LIST,
  ...VOCAB_LIST_PART2,
  ...VOCAB_LIST_PART3,
  ...VOCAB_LIST_PART4,
  ...VOCAB_LIST_PART5,
  ...VOCAB_LIST_PART6,
];

// Map for quick ID lookups
export const VOCAB_MAP = new Map<string, VocabItem>(
  ALL_VOCAB.map((item) => [item.id, item])
);

// Major Organ System Categories
export const SYSTEM_CATEGORIES = [
  { id: 'all', nameTh: 'ทั้งหมด', nameEn: 'All Terms', icon: 'Sparkles', color: 'emerald' },
  { id: 'ระบบหัวใจและหลอดเลือด', nameTh: 'หัวใจและหลอดเลือด', nameEn: 'Cardiovascular', icon: 'Heart', color: 'rose' },
  { id: 'ระบบทางเดินหายใจ', nameTh: 'ทางเดินหายใจ', nameEn: 'Respiratory', icon: 'Wind', color: 'sky' },
  { id: 'ระบบทางเดินอาหาร', nameTh: 'ทางเดินอาหารและตับ', nameEn: 'Gastrointestinal & Liver', icon: 'Utensils', color: 'amber' },
  { id: 'ระบบทางเดินปัสสาวะ', nameTh: 'ทางเดินปัสสาวะและไต', nameEn: 'Urinary & Renal', icon: 'Droplets', color: 'blue' },
  { id: 'ระบบสืบพันธุ์', nameTh: 'ระบบสืบพันธุ์และสูติฯ', nameEn: 'Reproductive & Obstetrics', icon: 'Baby', color: 'pink' },
  { id: 'ระบบตาและการมองเห็น', nameTh: 'ตาและการมองเห็น', nameEn: 'Ophthalmology', icon: 'Eye', color: 'indigo' },
  { id: 'ระบบหูและช่องหู', nameTh: 'หูและการได้ยิน', nameEn: 'ENT & Otology', icon: 'Ear', color: 'purple' },
  { id: 'ระบบช่องปากและฟัน', nameTh: 'ช่องปากและฟัน', nameEn: 'Oral & Dental', icon: 'Smile', color: 'teal' },
  { id: 'ระบบผิวหนังและขน', nameTh: 'ผิวหนัง ขน และบาดแผล', nameEn: 'Dermatology & Wounds', icon: 'Layers', color: 'orange' },
  { id: 'ระบบประสาทและความรู้สึก', nameTh: 'ประสาทและสมอง', nameEn: 'Neurology & Sensory', icon: 'Brain', color: 'violet' },
  { id: 'ระบบกระดูกและข้อ', nameTh: 'กระดูก ข้อ และการเคลื่อนไหว', nameEn: 'Orthopedics & Joints', icon: 'Activity', color: 'stone' },
  { id: 'อาการทั่วไปและสัญญาณชีพ', nameTh: 'อาการทั่วไป ไข้ และสารน้ำ', nameEn: 'General & Vital Signs', icon: 'Thermometer', color: 'red' },
];

// Special Related / Semantic Clusters
export interface RelatedCluster {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  icon: string;
  color: string;
  wordIds: string[];
}

export const RELATED_CLUSTERS: RelatedCluster[] = [
  {
    id: 'cluster_fractures',
    titleTh: 'ประเภทของกระดูกหัก (Fractures)',
    titleEn: 'Bone Fracture Classifications',
    descriptionTh: 'คำศัพท์จำแนกชนิดของกระดูกหักตามลักษณะทางกายวิภาคและบาดแผล',
    icon: 'Bone',
    color: 'amber',
    wordIds: [
      'closed_fracture',
      'open_fracture',
      'complete_fracture',
      'comminuted_fracture',
      'displaced_fracture',
      'oblique_fracture',
      'spiral_fracture',
      'transverse_fracture',
      'perforating_fracture',
      'malunion',
      'nonunion',
      'callus'
    ]
  },
  {
    id: 'cluster_hyper_hypo',
    titleTh: 'คู่คำตรงข้าม Hyper- vs Hypo-',
    titleEn: 'Hyper- (เกิน/สูง) vs Hypo- (น้อย/ต่ำ)',
    descriptionTh: 'รากศัพท์ทางการแพทย์บ่งบอกความมากเกิน (Hyper-) และความบกพร่อง/ต่ำ (Hypo-)',
    icon: 'ArrowUpDown',
    color: 'blue',
    wordIds: [
      'hyperthermia',
      'hypothermia',
      'hyperpnea',
      'hypopnea',
      'hyperventilation',
      'hypoventilation',
      'hyperpigmentation',
      'hypopigmentation',
      'hypertrichosis',
      'hypotrichosis',
      'hyperkeratosis',
      'hypertrophy',
      'atrophy'
    ]
  },
  {
    id: 'cluster_tachy_brady',
    titleTh: 'อัตราเร็ว vs ช้า (Tachy- vs Brady- & Rates)',
    titleEn: 'Heart Rate & Rhythm Disorders',
    descriptionTh: 'ความผิดปกติของอัตราการเต้นหัวใจและการขับถ่าย',
    icon: 'Activity',
    color: 'rose',
    wordIds: [
      'tachycardia',
      'bradycardia',
      'arrhythmia',
      'fibrillation',
      'bradyuria',
      'pollakiuria',
      'systole',
      'disystole'
    ]
  },
  {
    id: 'cluster_eye_eyelid',
    titleTh: 'กลุ่มโรคตาและเปลือกตา (Ophthalmology Pairings)',
    titleEn: 'Eye & Eyelid Abnormalities',
    descriptionTh: 'รอยโรคของเปลือกตา ม่านตา กระจกตา และต้อ',
    icon: 'Eye',
    color: 'indigo',
    wordIds: [
      'ectropion',
      'entropion',
      'distichiasis',
      'trichiasis',
      'blepharitis',
      'blepharoptosis',
      'blepharospasm',
      'third_eyelid_prolapse',
      'cataract',
      'glaucoma',
      'keratitis',
      'keratoconjunctivitis_sicca',
      'corneal_ulcer',
      'uveitis',
      'hyphaema',
      'hypopyon',
      'alacrima',
      'epiphora',
      'convergent_strabismus',
      'divergent_strabismus',
      'miosis',
      'mydriasis',
      'anisocoria'
    ]
  },
  {
    id: 'cluster_ear_anatomy',
    titleTh: 'กลุ่มโรคหูและโครงสร้างหู (Ear & Hearing)',
    titleEn: 'Auditory & Vestibular Disorders',
    descriptionTh: 'โครงสร้างกระดูกหู แก้วหู การอักเสบของหู และการทรงตัว',
    icon: 'Ear',
    color: 'purple',
    wordIds: [
      'auricle',
      'pinna',
      'aural_hematoma',
      'cerumen',
      'earwax',
      'eardrum',
      'tympanic_membrane',
      'malleus',
      'incus',
      'stapes',
      'cochlea',
      'myringitis',
      'otitis_externa',
      'otitis_media',
      'otitis_interna',
      'panotitis',
      'otopyosis',
      'otorrhea',
      'head_tilt',
      'nystagmus',
      'deafness'
    ]
  },
  {
    id: 'cluster_urinary_symptoms',
    titleTh: 'อาการทางระบบปัสสาวะ (-uria & Output)',
    titleEn: 'Urinary Signs & Output Patterns',
    descriptionTh: 'รากศัพท์ -uria บ่งบอกความผิดปกติของการขับถ่ายและลักษณะปัสสาวะ',
    icon: 'Droplets',
    color: 'sky',
    wordIds: [
      'anuria',
      'oliguria',
      'polyuria',
      'dysuria',
      'stranguria',
      'pollakiuria',
      'nocturia',
      'hematuria',
      'pyuria',
      'biliuria',
      'incontinence',
      'enuresis',
      'cystitis',
      'cystalgia',
      'bladder_atony'
    ]
  },
  {
    id: 'cluster_megaly',
    titleTh: 'อวัยวะโตผิดปกติ (-megaly)',
    titleEn: 'Organ Enlargement (-megaly)',
    descriptionTh: 'คำศัพท์ที่ลงท้ายด้วย -megaly หมายถึงภาวะที่อวัยวะนั้นๆ ขยายขนาดโตผิดปกติ',
    icon: 'Maximize',
    color: 'emerald',
    wordIds: [
      'cardiomegaly',
      'hepatomegaly',
      'splenomegaly',
      'nephromegaly',
      'prostatomegaly',
      'megacolon',
      'megaesophagus'
    ]
  },
  {
    id: 'cluster_gi_emergency',
    titleTh: 'กลุ่มโรคทางเดินอาหารและภาวะฉุกเฉินในช่องท้อง',
    titleEn: 'Gastrointestinal & Abdominal Emergencies',
    descriptionTh: 'ภาวะกระเพาะขยาย ลำไส้อืด อาเจียน และเลือดออกในทางเดินอาหาร',
    icon: 'AlertCircle',
    color: 'red',
    wordIds: [
      'gastric_dilation',
      'volvulus',
      'distended_stomach',
      'ileus',
      'intestinal_intussusception',
      'flatulence',
      'aerophagia',
      'emesis',
      'vomiting',
      'regurgitation',
      'hematemesis',
      'melanemesis',
      'melena',
      'hematochezia',
      'bilious_stool',
      'steatorrhea',
      'ascites'
    ]
  },
  {
    id: 'cluster_neuro_seizures',
    titleTh: 'ระบบประสาท การชัก และระดับความรู้สึกตัว',
    titleEn: 'Neurology, Consciousness & Spasms',
    descriptionTh: 'อาการชัก อัมพาต อัมพฤกษ์ และระดับความรู้สึกตัว',
    icon: 'Brain',
    color: 'violet',
    wordIds: [
      'conscious',
      'unconscious',
      'absence',
      'syncope',
      'lethargy',
      'depression',
      'moribund',
      'seizure',
      'convulsion',
      'epilepsy',
      'clonic_spasm',
      'clonus_spasm',
      'myoclonus',
      'tetany',
      'opisthotonus',
      'paralysis',
      'paresis',
      'hemiplegia',
      'hemiparesis',
      'monoplegia',
      'myasthenia',
      'flaccid',
      'ataxia',
      'abasia'
    ]
  },
  {
    id: 'cluster_skin_lesions',
    titleTh: 'รอยโรคผิวหนัง (Dermatological Lesions)',
    titleEn: 'Primary & Secondary Skin Lesions',
    descriptionTh: 'คำศัพท์จำแนกลักษณะแผล ผื่น ตุ่ม และสะเก็ดผิวหนัง',
    icon: 'Layers',
    color: 'orange',
    wordIds: [
      'macules',
      'papules',
      'patches',
      'plaques',
      'nodules',
      'vesicles',
      'pustules',
      'wheals',
      'scale',
      'crust',
      'abrasion',
      'excoriation',
      'laceration',
      'contusion',
      'ulceration',
      'decubitus',
      'dehiscence',
      'abscess',
      'furuncle',
      'pyoderma',
      'alopecia',
      'pruritus',
      'urticaria'
    ]
  }
];
