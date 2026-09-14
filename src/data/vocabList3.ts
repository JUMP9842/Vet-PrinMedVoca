import { VocabItem } from '../types';

export const VOCAB_LIST_PART3: VocabItem[] = [
  // Page 4
  {
    id: 'epiphora',
    word: 'epiphora',
    phoneticTh: 'เอพิโฟรา',
    meaning: 'อาการมีน้ำตาไหลตลอดเวลา / น้ำตาล้นเบ้าตา',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของต่อมน้ำตาและผิวกระจกตา (Ocular Secretion)',
    tags: ['น้ำตาไหลตลอด', 'ท่อน้ำตาตัน'],
    connectedWordIds: ['alacrima', 'dacryocystitis', 'canthus', 'conjunctivitis']
  },
  {
    id: 'opisthotonus',
    word: 'episthotonus',
    phoneticTh: 'โอพิสโธโทนัส',
    meaning: 'อาการเกร็งหลังแอ่น / คอและหลังแอ่นเกร็งไปด้านหลัง',
    category: 'ระบบประสาทและกล้ามเนื้อ',
    relatedGroup: 'ภาวะหมดสติและการชัก (Loss of Consciousness & Seizures)',
    tags: ['หลังแอ่น', 'เกร็ง', 'บาดทะยัก'],
    connectedWordIds: ['tetany', 'spasm', 'myospasm', 'convulsion']
  },
  {
    id: 'eruption',
    word: 'eruption',
    phoneticTh: 'อิรัพชัน',
    meaning: 'ฟันขึ้น (การงอกโผล่พ้นเหงือกของฟัน)',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'กายวิภาคและโรคฟัน (Dental Anatomy & Disorders)',
    tags: ['ฟันขึ้น', 'งอกฟัน'],
    connectedWordIds: ['maleruption', 'impacted_tooth', 'deciduous_tooth']
  },
  {
    id: 'erythema',
    word: 'erythema',
    phoneticTh: 'เอริทีมา',
    meaning: 'ลักษณะผิวหนังแดง (จากการขยายตัวของเส้นเลือดฝอย)',
    category: 'ระบบผิวหนังและหลอดเลือด',
    relatedGroup: 'รอยโรคปฐมภูมิและทุติยภูมิ (Dermatological Lesions)',
    tags: ['ผิวหนังแดง', 'ผื่นแดง'],
    rootMeaning: 'erythros (สีแดง)',
    connectedWordIds: ['rash', 'hyperemia', 'dermatitis', 'burn']
  },
  {
    id: 'eutocia',
    word: 'eutocia',
    phoneticTh: 'ยูโทเชีย',
    meaning: 'การคลอดปกติ / คลอดง่ายราบรื่น',
    category: 'ระบบสืบพันธุ์และสูติศาสตร์',
    relatedGroup: 'การตั้งครรภ์และการคลอด (Obstetrics & Parturition)',
    tags: ['คลอดปกติ', 'คลอดง่าย'],
    rootMeaning: 'eu- (ดี/ปกติ) + tokos (การคลอด)',
    connectedWordIds: ['dystocia', 'pregnancy', 'postpartum_hemorrhage']
  },
  {
    id: 'excoriation',
    word: 'excoriation',
    phoneticTh: 'เอ็กซ์โคริเอชัน',
    meaning: 'รอยถลอก / รอยขีดข่วนบนผิวหนัง (มักจากการเกา)',
    category: 'ระบบผิวหนังและบาดแผล',
    relatedGroup: 'บาดแผลและรอยโรคผิวหนัง (Wounds & Skin Lesions)',
    tags: ['รอยถลอก', 'รอยเกา', 'ผิวหนัง'],
    connectedWordIds: ['abrasion', 'pruritus', 'itching', 'laceration']
  },
  {
    id: 'exophthalmos',
    word: 'exophthalmos',
    phoneticTh: 'เอ็กซอฟธัลมอส',
    meaning: 'ตาโปน / ลูกตายื่นนูนออกนอกเบ้าตา',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติทางกายวิภาคของตา (Ocular Structural Anomalies)',
    tags: ['ตาโปน', 'ลูกตายื่น'],
    rootMeaning: 'ex- (ออกนอก) + ophthalmos (ลูกตา)',
    connectedWordIds: ['proptosis', 'sunken_eye', 'anophthalmos', 'microphthalmos']
  },
  {
    id: 'exostosis',
    word: 'exostosis',
    phoneticTh: 'เอ็กซอสโทซิส',
    meaning: 'กระดูกงอก / ก้อนกระดูกงอกบนผิวกระดูกเดิม',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['กระดูกงอก', 'กระดูก'],
    rootMeaning: 'ex- (ออกนอก) + osteon (กระดูก) + -osis (ภาวะ)',
    connectedWordIds: ['osteoma', 'callus', 'ankylosis', 'osteitis']
  },
  {
    id: 'expiratory',
    word: 'expiratory',
    phoneticTh: 'เอ็กซ์ไปราทอรี',
    meaning: 'การหายใจออก / เกี่ยวกับช่วงหายใจออก',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'กลไกและระยะการหายใจ (Respiratory Phases)',
    tags: ['หายใจออก', 'การหายใจ'],
    connectedWordIds: ['inspiratory', 'dyspnea', 'wheeze', 'hyperventilation']
  },
  {
    id: 'eyelashes',
    word: 'eyelashes',
    phoneticTh: 'อายแลชเชส',
    meaning: 'ขนตา',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของขนตาและเปลือกตา (Eyelashes Pathology)',
    tags: ['ขนตา', 'ตา'],
    connectedWordIds: ['distichiasis', 'trichiasis', 'blepharitis']
  },
  {
    id: 'febrile',
    word: 'febrile',
    phoneticTh: 'ฟีไบรล์',
    meaning: 'เป็นไข้ / มีไข้',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'อุณหภูมิร่างกายและไข้ (Body Temperature & Fever)',
    tags: ['มีไข้', 'ตัวร้อน'],
    rootMeaning: 'febris (ไข้)',
    connectedWordIds: ['afebrile', 'fever', 'pyrexia', 'hyperthermia']
  },
  {
    id: 'fecal_incontinence',
    word: 'fecal incontinence',
    phoneticTh: 'ฟีคอล อินคอนทิเนนส์',
    meaning: 'การกลั้นอุจจาระไม่ได้ / ถ่ายอุจจาระราด',
    category: 'ระบบทางเดินอาหารและขับถ่าย',
    relatedGroup: 'ความผิดปกติของการขับถ่ายอุจจาระ (Bowel Movement Disorders)',
    tags: ['กลั้นอุจจาระไม่ได้', 'ถ่ายราด'],
    connectedWordIds: ['incontinence', 'dyschezia', 'diarrhea']
  },
  {
    id: 'fever',
    word: 'fever',
    phoneticTh: 'ฟีเวอร์',
    meaning: 'ภาวะเป็นไข้ / ไข้',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'อุณหภูมิร่างกายและไข้ (Body Temperature & Fever)',
    tags: ['ไข้', 'ตัวร้อน'],
    connectedWordIds: ['febrile', 'afebrile', 'pyrexia', 'hyperthermia']
  },
  {
    id: 'fibrillation',
    word: 'fibrillation',
    phoneticTh: 'ฟิบริลเลชัน',
    meaning: 'ภาวะหัวใจเต้นแผ่วระรัว / หัวใจห้องล่างหรือบนเต้นพลิ้ว',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'จังหวะและการเต้นของหัวใจ (Cardiac Rhythms & Rates)',
    tags: ['หัวใจเต้นพลิ้ว', 'เต้นระรัว', 'หัวใจ'],
    connectedWordIds: ['arrhythmia', 'tachycardia', 'cardiac_arrest', 'thrill']
  },
  {
    id: 'fistular',
    word: 'fistular',
    phoneticTh: 'ฟิสทูลาร์',
    meaning: 'มีลักษณะเป็นท่อ หรือ ทางทะลุเชื่อมระหว่างอวัยวะ (Fistula)',
    category: 'พยาธิสภาพและรอยโรคทั่วไป',
    relatedGroup: 'ทางเชื่อมผิดปกติและโพรงหนอง (Fistulae & Sinuses)',
    tags: ['ทางทะลุ', 'ท่อเชื่อม', 'แผลทะลุ'],
    connectedWordIds: ['abscess', 'ulceration', 'dehiscence']
  },
  {
    id: 'flaccid',
    word: 'flaccid',
    phoneticTh: 'แฟล็กซิด',
    meaning: 'ปวกเปียก / กล้ามเนื้ออ่อนปวกเปียกไร้แรงตึง',
    category: 'ระบบประสาทและกล้ามเนื้อ',
    relatedGroup: 'ความตึงตัวของกล้ามเนื้อ (Muscle Tone Abnormalities)',
    tags: ['ปวกเปียก', 'กล้ามเนื้ออ่อนแรง'],
    connectedWordIds: ['paralysis', 'paresis', 'myasthenia', 'spasm']
  },
  {
    id: 'flatulence',
    word: 'flatulence',
    phoneticTh: 'แฟลทูเลนส์',
    meaning: 'ท้องอืด / มีแก๊สในทางเดินอาหารมาก',
    category: 'ระบบทางเดินอาหารและช่องท้อง',
    relatedGroup: 'ความผิดปกติของกระเพาะและลำไส้ (Gastric & Intestinal Pathology)',
    tags: ['ท้องอืด', 'มีแก๊สในท้อง', 'ผายลมบ่อย'],
    connectedWordIds: ['aerophagia', 'distended_stomach', 'gastric_dilation', 'ileus']
  },
  {
    id: 'flea_allergy_dermatitis',
    word: 'flea allergy dermatitis',
    phoneticTh: 'ฟรี แอลเลอร์จี เดอร์มาไทติส',
    meaning: 'ผิวหนังอักเสบจากภูมิแพ้น้ำลายหมัด (FAD)',
    category: 'ระบบผิวหนังและปรสิต',
    relatedGroup: 'ปรสิตภายนอกและภูมิแพ้ (Parasitic Infestation)',
    tags: ['ภูมิแพ้น้ำลายหมัด', 'FAD', 'คันผิวหนัง'],
    connectedWordIds: ['atopic', 'dermatitis', 'pruritus', 'alopecia', 'acariasis']
  },
  {
    id: 'furuncle',
    word: 'furuncle',
    phoneticTh: 'ฟิวรังเคิล',
    meaning: 'ฝี / ฝีหัวเดียวที่เกิดบริเวณต่อมขน',
    category: 'ระบบผิวหนังและบาดแผล',
    relatedGroup: 'การติดเชื้อและโพรงหนอง (Suppuration & Pus)',
    tags: ['ฝี', 'ตุ่มหนอง', 'ขุมขนอักเสบ'],
    connectedWordIds: ['abscess', 'pus', 'pustules', 'pyoderma']
  },
  {
    id: 'gait',
    word: 'gait',
    phoneticTh: 'เกต',
    meaning: 'ท่าทาง / ท่าทางการเดินของร่างกาย',
    category: 'ระบบประสาทและกระดูก',
    relatedGroup: 'ความผิดปกติของการเคลื่อนไหว (Locomotion Disorders)',
    tags: ['ท่าเดิน', 'การเดิน'],
    connectedWordIds: ['ataxia', 'abasia', 'lameness', 'head_tilt']
  },
  {
    id: 'galactorrhea',
    word: 'galactorrhea',
    phoneticTh: 'กาแลกทอร์เรีย',
    meaning: 'อาการน้ำนมไหลผิดปกติ (ไหลไม่ตรงตามช่วงให้นม)',
    category: 'ระบบสืบพันธุ์และต่อมน้ำนม',
    relatedGroup: 'ความผิดปกติของเต้านม (Mammary Disorders)',
    tags: ['น้ำนมไหล', 'เต้านม'],
    rootMeaning: 'galakt- (น้ำนม) + -rrhea (ไหลหลั่ง)',
    connectedWordIds: ['mamma', 'mastitis', 'pseudopregnancy']
  },
  {
    id: 'gangrene',
    word: 'gangrene',
    phoneticTh: 'แกงกรีน',
    meaning: 'การเกิดเนื้อตายเน่าจากการขาดเลือดมาเลี้ยง',
    category: 'พยาธิสภาพและหลอดเลือด',
    relatedGroup: 'เนื้อตายและการสลายตัว (Necrosis & Tissue Death)',
    tags: ['เนื้อตายเน่า', 'ขาดเลือด', 'เนื้อตาย'],
    connectedWordIds: ['necrosis', 'ulceration', 'cyanosis']
  },
  {
    id: 'gastric_dilation',
    word: 'gastric dilation',
    phoneticTh: 'แกสทริก ไดเลชัน',
    meaning: 'กระเพาะอาหารขยายตัว / กระเพาะอาหารบวมพองผิดปกติ',
    category: 'ระบบทางเดินอาหารและช่องท้อง',
    relatedGroup: 'ความผิดปกติของกระเพาะและลำไส้ (Gastric & Intestinal Pathology)',
    tags: ['กระเพาะขยาย', 'กระเพาะบวม', 'GDV'],
    rootMeaning: 'gastr- (กระเพาะอาหาร) + dilation (การขยาย)',
    connectedWordIds: ['distended_stomach', 'volvulus', 'flatulence', 'emesis']
  },
  {
    id: 'gastroenteritis',
    word: 'gastroenteritis',
    phoneticTh: 'แกสโทรเอ็นเทอไรติส',
    meaning: 'กระเพาะอาหารและลำไส้เล็กอักเสบ',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'การอักเสบของกระเพาะและลำไส้ (Gastrointestinal Inflammations)',
    tags: ['กระเพาะและลำไส้อักเสบ', 'ท้องร่วง', 'อาเจียน'],
    rootMeaning: 'gastro- (กระเพาะ) + enter- (ลำไส้) + -itis (อักเสบ)',
    connectedWordIds: ['enteritis', 'enterocolitis', 'diarrhea', 'vomiting']
  },
  {
    id: 'genitalia',
    word: 'genitalia',
    phoneticTh: 'เจนิเทเลีย',
    meaning: 'อวัยวะสืบพันธุ์',
    category: 'ระบบสืบพันธุ์',
    relatedGroup: 'กายวิภาคระบบสืบพันธุ์ (Reproductive Anatomy)',
    tags: ['อวัยวะสืบพันธุ์', 'สืบพันธุ์'],
    connectedWordIds: ['penitis', 'vaginitis', 'orchitis', 'labia']
  },
  {
    id: 'gingival',
    word: 'gingival',
    phoneticTh: 'จิงจิวาล',
    meaning: 'เหงือก / เกี่ยวกับเหงือก',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'การอักเสบในช่องปาก (Oral Cavity Inflammations)',
    tags: ['เหงือก', 'ช่องปาก'],
    connectedWordIds: ['gingivitis', 'gingivostomatitis', 'uloncus', 'dental_caries']
  },
  {
    id: 'gingivitis',
    word: 'gingivitis',
    phoneticTh: 'จิงจิไวติส',
    meaning: 'เหงือกอักเสบ',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'การอักเสบในช่องปาก (Oral Cavity Inflammations)',
    tags: ['เหงือกอักเสบ', 'เหงือกบวมแดง'],
    rootMeaning: 'gingiv- (เหงือก) + -itis (อักเสบ)',
    connectedWordIds: ['gingivostomatitis', 'uloglossitis', 'uloncus', 'halitosis']
  },
  {
    id: 'gingivostomatitis',
    word: 'gingivostomatitis',
    phoneticTh: 'จิงจิโวสโตมาไททิส',
    meaning: 'เหงือกและเยื่อบุช่องปากอักเสบ',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'การอักเสบในช่องปาก (Oral Cavity Inflammations)',
    tags: ['เหงือกและปากอักเสบ', 'ปากเปื่อย'],
    rootMeaning: 'gingivo- (เหงือก) + stomat- (ปาก) + -itis (อักเสบ)',
    connectedWordIds: ['gingivitis', 'stomatitis', 'uloglossitis', 'cheilitis']
  },
  {
    id: 'glaucoma',
    word: 'glaucoma',
    phoneticTh: 'กลอโคมา',
    meaning: 'ต้อหิน (ความดันในลูกตาสูง)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'โรคเลนส์และต้อในตา (Cataracts & Lens Pathology)',
    tags: ['ต้อหิน', 'ความดันตาสูง', 'ตาบอด'],
    connectedWordIds: ['cataract', 'blindness', 'uveitis', 'corneal_ulcer']
  },
  {
    id: 'greasy',
    word: 'greasy',
    phoneticTh: 'กรีสซี',
    meaning: 'การชุ่มไขมัน / มันเยิ้ม',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'ความผิดปกติของต่อมไขมัน (Sebaceous Gland Pathology)',
    tags: ['มันเยิ้ม', 'ชุ่มไขมัน'],
    connectedWordIds: ['seborrhea', 'steatorrhea', 'dermatitis']
  },
  {
    id: 'haemoptysis',
    word: 'haemoptysis',
    phoneticTh: 'ฮีมอฟทิซิส',
    meaning: 'การไอเป็นเลือด',
    category: 'ระบบทางเดินหายใจและหลอดเลือด',
    relatedGroup: 'เลือดออกและจุดจ้ำเลือด (Hemorrhage & Bleeding)',
    tags: ['ไอเป็นเลือด', 'เลือดออกทางเดินหายใจ'],
    rootMeaning: 'haemo- (เลือด) + ptysis (การถ่ม/ไอออก)',
    connectedWordIds: ['cough', 'hematemesis', 'productive_cough', 'pulmonary']
  },
  {
    id: 'halitosis',
    word: 'halitosis',
    phoneticTh: 'แฮลิโทซิส',
    meaning: 'กลิ่นปากเหม็น / ปากเหม็น',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'กายวิภาคและโรคฟัน (Dental Anatomy & Disorders)',
    tags: ['ปากเหม็น', 'กลิ่นปาก'],
    rootMeaning: 'halitus (ลมหายใจ) + -osis (ภาวะ)',
    connectedWordIds: ['dental_caries', 'gingivitis', 'stomatitis', 'sialolith']
  },
  {
    id: 'head_tilt',
    word: 'head tilt',
    phoneticTh: 'เฮด ทิลต์',
    meaning: 'หัวเอียง / ศีรษะเอียงข้างใดข้างหนึ่ง (โรคระบบทรงตัว/หูชั้นใน)',
    category: 'ระบบประสาทและหู',
    relatedGroup: 'ความผิดปกติของการเคลื่อนไหว (Locomotion Disorders)',
    tags: ['หัวเอียง', 'ระบบทรงตัว', 'หูชั้นใน'],
    connectedWordIds: ['ataxia', 'nystagmus', 'otitis_interna', 'cochlea']
  },
  {
    id: 'hematemesis',
    word: 'hematemesis',
    phoneticTh: 'ฮีมาเทเมซิส',
    meaning: 'การอาเจียนเป็นเลือดสด',
    category: 'ระบบทางเดินอาหารและหลอดเลือด',
    relatedGroup: 'เลือดออกและจุดจ้ำเลือด (Hemorrhage & Bleeding)',
    tags: ['อาเจียนเป็นเลือด', 'อ้วกเป็นเลือด'],
    rootMeaning: 'hemat- (เลือด) + emesis (การอาเจียน)',
    connectedWordIds: ['melanemesis', 'emesis', 'vomiting', 'haemoptysis', 'melena']
  },
  {
    id: 'hematochezia',
    word: 'hematochezia',
    phoneticTh: 'ฮีมาโตคีเซีย',
    meaning: 'การถ่ายอุจจาระเป็นเลือดสด (จากลำไส้ใหญ่หรือทวาร)',
    category: 'ระบบทางเดินอาหารและขับถ่าย',
    relatedGroup: 'เลือดออกและจุดจ้ำเลือด (Hemorrhage & Bleeding)',
    tags: ['ถ่ายเป็นเลือดสด', 'อุจจาระเป็นเลือด'],
    rootMeaning: 'hemato- (เลือด) + chezein (ถ่ายอุจจาระ)',
    connectedWordIds: ['melena', 'bilious_stool', 'proctitis', 'dyschezia']
  },
  {
    id: 'hematuria',
    word: 'hematuria',
    phoneticTh: 'ฮีมาทูเรีย',
    meaning: 'ปัสสาวะเป็นเลือด / มีเม็ดเลือดแดงในปัสสาวะ',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'สีและสารปนเปื้อนในปัสสาวะ (Abnormal Urine Contents)',
    tags: ['ปัสสาวะเป็นเลือด', 'ฉี่เป็นเลือด'],
    rootMeaning: 'hemat- (เลือด) + -uria (ปัสสาวะ)',
    connectedWordIds: ['pyuria', 'biliuria', 'cystitis', 'dysuria']
  },
  {
    id: 'hemiparesis',
    word: 'hemiparesis',
    phoneticTh: 'เฮมิพาเรซิส',
    meaning: 'อัมพฤกษ์ครึ่งซีก (กล้ามเนื้ออ่อนแรงครึ่งซีก)',
    category: 'ระบบประสาทและกล้ามเนื้อ',
    relatedGroup: 'อัมพาตและกล้ามเนื้ออ่อนแรง (Paralysis & Paresis)',
    tags: ['อัมพฤกษ์ครึ่งซีก', 'อ่อนแรงครึ่งซีก'],
    rootMeaning: 'hemi- (ครึ่ง) + paresis (อ่อนแรง)',
    connectedWordIds: ['hemiplegia', 'monoplegia', 'paralysis', 'paresis']
  },
  {
    id: 'hemiplegia',
    word: 'hemiplegia',
    phoneticTh: 'เฮมิพลีเจีย',
    meaning: 'อัมพาตครึ่งซีก (สูญเสียการเคลื่อนไหวสมบูรณ์ครึ่งซีก)',
    category: 'ระบบประสาทและกล้ามเนื้อ',
    relatedGroup: 'อัมพาตและกล้ามเนื้ออ่อนแรง (Paralysis & Paresis)',
    tags: ['อัมพาตครึ่งซีก', 'ขยับไม่ได้ครึ่งซีก'],
    rootMeaning: 'hemi- (ครึ่ง) + plegia (อัมพาต)',
    connectedWordIds: ['hemiparesis', 'monoplegia', 'paralysis', 'paresis']
  },
  {
    id: 'hepatomegaly',
    word: 'hepatomegaly',
    phoneticTh: 'เฮพาโทเมกะลี',
    meaning: 'ตับโตผิดปกติ',
    category: 'ระบบทางเดินอาหารและตับ',
    relatedGroup: 'อวัยวะโตผิดปกติ (-megaly)',
    tags: ['ตับโต', 'ตับ'],
    rootMeaning: 'hepato- (ตับ) + -megaly (โตผิดปกติ)',
    connectedWordIds: ['splenomegaly', 'cardiomegaly', 'nephromegaly', 'jaundice']
  },
  {
    id: 'hoarseness',
    word: 'hoarseness',
    phoneticTh: 'ฮอร์สเนส',
    meaning: 'เสียงแหบห้าว / เสียงเปลี่ยน',
    category: 'ระบบทางเดินหายใจและกล่องเสียง',
    relatedGroup: 'เสียงและกล่องเสียง (Voice & Larynx)',
    tags: ['เสียงแหบ', 'กล่องเสียง'],
    connectedWordIds: ['larynx', 'pharyngolaryngitis', 'tracheitis', 'cough']
  },
  {
    id: 'hydrocephalus',
    word: 'hydrocephalus',
    phoneticTh: 'ไฮโดรเซฟฟะลัส',
    meaning: 'ภาวะโพรงสมองคั่งน้ำ (น้ำคั่งในกะโหลกศีรษะ)',
    category: 'ระบบประสาทส่วนกลาง',
    relatedGroup: 'ความผิดปกติของระบบประสาท (Neurological Anomalies)',
    tags: ['น้ำคั่งในสมอง', 'หัวโต'],
    rootMeaning: 'hydro- (น้ำ) + cephal- (ศีรษะ/สมอง)',
    connectedWordIds: ['encephalitis', 'encephalomalacia', 'seizure']
  },
  {
    id: 'hyperemia',
    word: 'hyperemia',
    phoneticTh: 'ไฮเปอร์รีเมีย',
    meaning: 'ภาวะเลือดคั่ง / การมีเลือดมาคั่งในเนื้อเยื่อมากเกิน',
    category: 'ระบบหลอดเลือดและการไหลเวียน',
    relatedGroup: 'เลือดออกและจุดจ้ำเลือด (Hemorrhage & Bleeding)',
    tags: ['เลือดคั่ง', 'บวมแดง'],
    rootMeaning: 'hyper- (มากเกิน) + -emia (เลือด)',
    connectedWordIds: ['erythema', 'aural_hematoma', 'congestion']
  },
  {
    id: 'hyperesthesia',
    word: 'hyperesthesia',
    phoneticTh: 'ไฮเปอร์เอสธีเชีย',
    meaning: 'ความรู้สึกสัมผัสไวหรือมากเกินปกติ (ไวต่อความเจ็บปวดสัมผัส)',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ความผิดปกติของความรู้สึก (Sensory Perception)',
    tags: ['รู้สึกไวเกิน', 'เจ็บปวดง่าย'],
    rootMeaning: 'hyper- (มากเกิน) + aisthesis (ความรู้สึก)',
    connectedWordIds: ['numbness', 'nociception', 'hyperalgesia']
  }
];
