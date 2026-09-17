import { VocabItem } from '../types';

export const VOCAB_LIST: VocabItem[] = [
  // Page 1
  {
    id: 'abasia',
    word: 'abasia',
    phoneticTh: 'อะเบเซีย',
    meaning: 'ภาวะเดินไม่ได้',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ความผิดปกติของการเคลื่อนไหว (Locomotion Disorders)',
    tags: ['เดินไม่ได้', 'การเคลื่อนไหว', 'ระบบประสาท'],
    rootMeaning: 'a- (ไร้/ไม่) + basis (ก้าวเดิน)',
    connectedWordIds: ['ataxia', 'lameness', 'paralysis', 'paresis']
  },
  {
    id: 'abrasion',
    word: 'abrasion',
    phoneticTh: 'อะเบรชัน',
    meaning: 'แผลถลอก',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'บาดแผลและรอยโรคผิวหนัง (Wounds & Skin Lesions)',
    tags: ['แผล', 'ถลอก', 'ผิวหนัง'],
    connectedWordIds: ['excoriation', 'laceration', 'contusion', 'ulceration']
  },
  {
    id: 'abscess',
    word: 'abscess',
    phoneticTh: 'แอ็บเซส',
    meaning: 'ฝี หรือ โพรงหนอง',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'การติดเชื้อและโพรงหนอง (Suppuration & Pus)',
    tags: ['ฝี', 'หนอง', 'อักเสบ'],
    connectedWordIds: ['furuncle', 'pus', 'pustules', 'pyoderma']
  },
  {
    id: 'absence',
    word: 'absence',
    phoneticTh: 'แอ็บเซนส์',
    meaning: 'การหมดสติชั่วคราว',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ภาวะหมดสติและการชัก (Loss of Consciousness & Seizures)',
    tags: ['หมดสติ', 'ชั่วคราว', 'สมอง'],
    connectedWordIds: ['syncope', 'unconscious', 'seizure', 'epilepsy']
  },
  {
    id: 'acariasis',
    word: 'acariasis',
    phoneticTh: 'อะคาริเอซิส',
    meaning: 'สภาพสัตว์ที่มีเห็บ-หมัด หรือไรปรสิต',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'ปรสิตภายนอกและภูมิแพ้ (Parasitic Infestation)',
    tags: ['เห็บ', 'หมัด', 'ไร', 'ปรสิต'],
    connectedWordIds: ['demodicosis', 'infestation', 'flea_allergy_dermatitis']
  },
  {
    id: 'accessory_mamma',
    word: 'accessory mamma',
    phoneticTh: 'แอคเซสโซรี แมมมา',
    meaning: 'เต้านมเกิน',
    category: 'ระบบสืบพันธุ์',
    relatedGroup: 'ความผิดปกติของเต้านม (Mammary Disorders)',
    tags: ['เต้านม', 'เกิน', 'สืบพันธุ์'],
    connectedWordIds: ['mamma', 'mastitis', 'mammary_gland_tumor', 'nipple']
  },
  {
    id: 'adipsia',
    word: 'adipsia',
    phoneticTh: 'อะดิพเซีย',
    meaning: 'อาการเบื่อน้ำ / ไม่ยอมกินน้ำ',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ความผิดปกติของการกินและดื่ม (Feeding & Drinking)',
    tags: ['เบื่อน้ำ', 'ไม่กินน้ำ'],
    rootMeaning: 'a- (ไม่) + dipsa (ความกระหายน้ำ)',
    connectedWordIds: ['polydipsia', 'anorexia', 'dehydration']
  },
  {
    id: 'aerophagia',
    word: 'aerophagia',
    phoneticTh: 'แอโรเฟเจีย',
    meaning: 'ภาวะการกลืนอากาศ',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของทางเดินอาหารส่วนต้น (Upper GI)',
    tags: ['กลืนอากาศ', 'ลมในท้อง'],
    rootMeaning: 'aero- (อากาศ) + phagia (การกลืน/กิน)',
    connectedWordIds: ['flatulence', 'dysphagia', 'distended_stomach']
  },
  {
    id: 'afebrile',
    word: 'afebrile',
    phoneticTh: 'อะฟีไบรล์',
    meaning: 'ไม่มีไข้',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'อุณหภูมิร่างกายและไข้ (Body Temperature & Fever)',
    tags: ['ไม่มีไข้', 'อุณหภูมิปกติ'],
    rootMeaning: 'a- (ไม่มี) + febris (ไข้)',
    connectedWordIds: ['febrile', 'fever', 'pyrexia', 'apyretic']
  },
  {
    id: 'air_hunger',
    word: 'air hunger',
    phoneticTh: 'แอร์ ฮังเกอร์',
    meaning: 'อาการพะงาบ งับอากาศ (หายใจขวนขวาย)',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['พะงาบ', 'งับอากาศ', 'หายใจหอบ'],
    connectedWordIds: ['dyspnea', 'cyanosis', 'orthopnea', 'panting']
  },
  {
    id: 'alacrima',
    word: 'alacrima',
    phoneticTh: 'อะแลคริมา',
    meaning: 'ภาวะไร้น้ำตา หรือ น้ำตาน้อย',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของต่อมน้ำตาและผิวกระจกตา (Ocular Secretion)',
    tags: ['ไร้น้ำตา', 'ตาแห้ง', 'น้ำตาน้อย'],
    rootMeaning: 'a- (ไร้) + lacrima (น้ำตา)',
    connectedWordIds: ['epiphora', 'keratoconjunctivitis_sicca', 'dacryocystitis']
  },
  {
    id: 'alopecia',
    word: 'alopecia',
    phoneticTh: 'อะโลพีเชีย',
    meaning: 'ขนร่วง / ผมร่วง',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'ความผิดปกติของขนและหนัง (Hair & Coat Disorders)',
    tags: ['ขนร่วง', 'ผมร่วง', 'ผิวหนัง'],
    connectedWordIds: ['hypotrichosis', 'hypertrichosis', 'dermatitis']
  },
  {
    id: 'amblyopia',
    word: 'amblyopia',
    phoneticTh: 'แอมบลีโอเปีย',
    meaning: 'ตามัว / สายตาเลือนราง',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของการมองเห็น (Visual Impairments)',
    tags: ['ตามัว', 'มองไม่ชัด'],
    connectedWordIds: ['blindness', 'cataract', 'glaucoma']
  },
  {
    id: 'anal_sacculitis',
    word: 'anal sacculitis',
    phoneticTh: 'เอนัล แซคคิวไลติส',
    meaning: 'ถุงทวารหนักอักเสบ',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของทวารหนักและลำไส้ตรง (Anorectal Disorders)',
    tags: ['ถุงทวารหนัก', 'อักเสบ', 'ต่อมก้น'],
    connectedWordIds: ['scooting', 'proctitis', 'tenesmus']
  },
  {
    id: 'anisocoria',
    word: 'anisocoria',
    phoneticTh: 'แอนไอโซโคเรีย',
    meaning: 'ภาวะรูม่านตาไม่เท่ากัน',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของรูม่านตา (Pupillary Abnormalities)',
    tags: ['รูม่านตา', 'ไม่เท่ากัน'],
    rootMeaning: 'an- (ไม่) + iso (เท่ากัน) + kore (รูม่านตา)',
    connectedWordIds: ['miosis', 'mydriasis', 'dyscoria']
  },
  {
    id: 'ankyloblepharon',
    word: 'ankyloblepharon',
    phoneticTh: 'แองคิโลเบลฟารอน',
    meaning: 'ภาวะหนังตาติดกัน',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเปลือกตา (Eyelid Disorders)',
    tags: ['หนังตาติด', 'เปลือกตา'],
    rootMeaning: 'ankyle (ติดกัน) + blepharon (เปลือกตา)',
    connectedWordIds: ['blepharitis', 'blepharoptosis', 'blepharospasm']
  },
  {
    id: 'ankylosis',
    word: 'ankylosis',
    phoneticTh: 'แองคิโลซิส',
    meaning: 'ข้อยึดติด / ข้อติดแข็ง',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['ข้อยึดติด', 'ข้อติด'],
    connectedWordIds: ['arthritis', 'arthrocele', 'panarthritis']
  },
  {
    id: 'anophthalmos',
    word: 'anophthalmos',
    phoneticTh: 'แอนอฟทัลมอส',
    meaning: 'ภาวะไร้ลูกตาแต่กำเนิด',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติทางกายวิภาคของตา (Ocular Structural Anomalies)',
    tags: ['ไร้ลูกตา', 'กำเนิด'],
    rootMeaning: 'an- (ไม่มี) + ophthalmos (ลูกตา)',
    connectedWordIds: ['microphthalmos', 'blindness', 'exophthalmos']
  },
  {
    id: 'anorexia',
    word: 'anorexia',
    phoneticTh: 'แอนอเร็กเซีย',
    meaning: 'เบื่ออาหาร / ไม่ยอมกินอาหาร',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ความผิดปกติของการกินและดื่ม (Feeding & Drinking)',
    tags: ['เบื่ออาหาร', 'ไม่กินข้าว'],
    rootMeaning: 'an- (ไม่มี) + orexis (ความอยากอาหาร)',
    connectedWordIds: ['appetite', 'polyphagia', 'cachectic', 'weight_loss']
  },
  {
    id: 'anuria',
    word: 'anuria',
    phoneticTh: 'อะนูเรีย',
    meaning: 'ภาวะไร้ปัสสาวะ / ปัสสาวะไม่ออก',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'ปริมาณและการขับถ่ายปัสสาวะ (Urinary Output Abnormalities)',
    tags: ['ไร้ปัสสาวะ', 'ปัสสาวะไม่ออก'],
    rootMeaning: 'an- (ไม่มี) + uria (ปัสสาวะ)',
    connectedWordIds: ['oliguria', 'polyuria', 'dysuria', 'hematuria']
  },
  {
    id: 'aortic_regurgitation',
    word: 'aortic regurgitation',
    phoneticTh: 'เอออร์ติก รีเกอร์จิเทชัน',
    meaning: 'การไหลทวนของเลือดที่ลิ้นหัวใจเอออร์ติก',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'โรคลิ้นหัวใจและหลอดเลือด (Valvular & Vascular Diseases)',
    tags: ['หัวใจ', 'ลิ้นหัวใจ', 'ไหลย้อน'],
    connectedWordIds: ['aortic_stenosis', 'murmurs', 'arrhythmia']
  },
  {
    id: 'aortic_stenosis',
    word: 'aortic stenosis',
    phoneticTh: 'เอออร์ติก สเตโนซิส',
    meaning: 'ลิ้นเอออร์ติกตีบ',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'โรคลิ้นหัวใจและหลอดเลือด (Valvular & Vascular Diseases)',
    tags: ['ลิ้นหัวใจตีบ', 'เอออร์ติก'],
    rootMeaning: 'stenosis (การตีบแคบ)',
    connectedWordIds: ['aortic_regurgitation', 'cardiac_arrest', 'murmurs']
  },
  {
    id: 'appetite',
    word: 'appetite',
    phoneticTh: 'แอพพะไทต์',
    meaning: 'ความอยากอาหาร',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ความผิดปกติของการกินและดื่ม (Feeding & Drinking)',
    tags: ['ความอยากอาหาร', 'กิน'],
    connectedWordIds: ['anorexia', 'polyphagia', 'cachectic']
  },
  {
    id: 'apyretic',
    word: 'apyretic',
    phoneticTh: 'เอไพเรติก',
    meaning: 'ไม่มีไข้',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'อุณหภูมิร่างกายและไข้ (Body Temperature & Fever)',
    tags: ['ไม่มีไข้', 'ไร้ไข้'],
    rootMeaning: 'a- (ไม่มี) + pyretos (ไข้)',
    connectedWordIds: ['afebrile', 'pyrexia', 'fever', 'febrile']
  },
  {
    id: 'arrhythmia',
    word: 'arrhythmia',
    phoneticTh: 'อะริธเมีย',
    meaning: 'ภาวะหัวใจเสียจังหวะ / หัวใจเต้นผิดจังหวะ',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'จังหวะและการเต้นของหัวใจ (Cardiac Rhythms & Rates)',
    tags: ['หัวใจเต้นผิดจังหวะ', 'หัวใจ'],
    rootMeaning: 'a- (ไม่) + rhythmos (จังหวะ)',
    connectedWordIds: ['tachycardia', 'bradycardia', 'fibrillation', 'cardiac_arrest']
  },
  {
    id: 'arthritis',
    word: 'arthritis',
    phoneticTh: 'อาร์ไทรติส',
    meaning: 'ข้ออักเสบ',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['ข้ออักเสบ', 'ปวดข้อ'],
    rootMeaning: 'arthr- (ข้อ) + -itis (อักเสบ)',
    connectedWordIds: ['arthrocele', 'panarthritis', 'ankylosis', 'lameness']
  },
  {
    id: 'arthrocele',
    word: 'arthrocele',
    phoneticTh: 'อาร์โธรซีล',
    meaning: 'ข้อบวม / ถุงน้ำในข้อ',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['ข้อบวม', 'บวม'],
    rootMeaning: 'arthr- (ข้อ) + -cele (บวม/โป่ง)',
    connectedWordIds: ['arthritis', 'panarthritis', 'ankylosis']
  },
  {
    id: 'ascites',
    word: 'ascites',
    phoneticTh: 'แอสไซตีส',
    meaning: 'ท้องมาน / มีน้ำคั่งในช่องท้อง',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'การสะสมสารน้ำในร่างกาย (Fluid Accumulation & Edema)',
    tags: ['ท้องมาน', 'น้ำในท้อง', 'บวมน้ำ'],
    connectedWordIds: ['pleural_effusion', 'distended_stomach', 'pendulous_abdomen']
  },
  {
    id: 'ataxia',
    word: 'ataxia',
    phoneticTh: 'อะแท็กเซีย',
    meaning: 'ภาวะการเดินเซ หรือ การเคลื่อนไหวที่ไม่ประสานกัน',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ความผิดปกติของการเคลื่อนไหว (Locomotion Disorders)',
    tags: ['เดินเซ', 'ทรงตัวไม่อยู่', 'กล้ามเนื้อไม่ประสาน'],
    rootMeaning: 'a- (ไร้) + taxis (ระเบียบ/การประสาน)',
    connectedWordIds: ['abasia', 'lameness', 'head_tilt', 'paralysis']
  },
  {
    id: 'atopic',
    word: 'atopic',
    phoneticTh: 'อะทอปิก',
    meaning: 'ผิวหนังอักเสบจากภูมิแพ้',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'โรคผิวหนังอักเสบและภูมิแพ้ (Allergic Dermatitis)',
    tags: ['ภูมิแพ้', 'ผิวหนังอักเสบ', 'คัน'],
    connectedWordIds: ['dermatitis', 'pruritus', 'flea_allergy_dermatitis', 'urticaria']
  },
  {
    id: 'atrophy',
    word: 'atrophy',
    phoneticTh: 'แอโทรฟี',
    meaning: 'การฝ่อลีบ',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ความผิดปกติของขนาดเนื้อเยื่อ (Tissue Growth & Size)',
    tags: ['ฝ่อลีบ', 'เล็กลง'],
    rootMeaning: 'a- (ไม่) + trophe (การเจริญเติบโต/อาหาร)',
    connectedWordIds: ['hypertrophy', 'myoatrophy', 'dysplasia']
  },
  {
    id: 'aural_hematoma',
    word: 'aural hematoma',
    phoneticTh: 'ออรัล ฮีมาโทมา',
    meaning: 'ใบหูคั่งเลือด / เลือดออกสะสมในใบหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['ใบหูคั่งเลือด', 'หูบวมเลือด'],
    connectedWordIds: ['auricle', 'pinna', 'otitis_externa', 'otorrhagia']
  },
  {
    id: 'auricle',
    word: 'auricle',
    phoneticTh: 'ออริเคิล',
    meaning: 'ใบหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โครงสร้างหู (Ear Anatomy)',
    tags: ['ใบหู', 'หู'],
    connectedWordIds: ['pinna', 'cochlea', 'malleus', 'incus', 'stapes']
  },
  {
    id: 'bilious_stool',
    word: 'bilious stool',
    phoneticTh: 'บิเลียส สตูล',
    meaning: 'อุจจาระปนน้ำดี',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ลักษณะอุจจาระผิดปกติ (Abnormal Stool Characteristics)',
    tags: ['อุจจาระ', 'น้ำดี', 'ขับถ่าย'],
    connectedWordIds: ['biliuria', 'jaundice', 'icterus', 'hematochezia', 'melena']
  },
  {
    id: 'biliuria',
    word: 'biliuria',
    phoneticTh: 'บิลิยูเรีย',
    meaning: 'ปัสสาวะมีสารสีน้ำดี',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'สีและสารปนเปื้อนในปัสสาวะ (Abnormal Urine Contents)',
    tags: ['ปัสสาวะ', 'น้ำดี', 'เหลืองเข้ม'],
    rootMeaning: 'bili- (น้ำดี) + -uria (ปัสสาวะ)',
    connectedWordIds: ['bilious_stool', 'jaundice', 'icterus', 'hematuria', 'pyuria']
  },
  {
    id: 'bladder_atony',
    word: 'bladder atony',
    phoneticTh: 'แบลดเดอร์ แอตทอนี',
    meaning: 'การขาดความตึงของกระเพาะปัสสาวะ (กระเพาะปัสสาวะหย่อน)',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'โรคกระเพาะปัสสาวะและการควบคุม (Bladder Disorders)',
    tags: ['กระเพาะปัสสาวะ', 'กลั้นไม่อยู่', 'กล้ามเนื้อหย่อน'],
    connectedWordIds: ['cystitis', 'cystalgia', 'incontinence', 'enuresis']
  },
  {
    id: 'blepharitis',
    word: 'blepharitis',
    phoneticTh: 'เบลฟาริติส',
    meaning: 'หนังตาอักเสบ / เปลือกตาอักเสบ',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเปลือกตา (Eyelid Disorders)',
    tags: ['หนังตาอักเสบ', 'เปลือกตา'],
    rootMeaning: 'blephar- (เปลือกตา) + -itis (อักเสบ)',
    connectedWordIds: ['blepharoptosis', 'blepharospasm', 'conjunctivitis', 'ankyloblepharon']
  },

  // Page 2
  {
    id: 'blepharoptosis',
    word: 'blepharoptosis',
    phoneticTh: 'เบลฟาโรโทซิส',
    meaning: 'หนังตาตก / เปลือกตาบนตก',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเปลือกตา (Eyelid Disorders)',
    tags: ['หนังตาตก', 'เปลือกตา'],
    rootMeaning: 'blephar- (เปลือกตา) + -ptosis (ตก/หย่อน)',
    connectedWordIds: ['blepharitis', 'blepharospasm', 'ectropion', 'entropion']
  },
  {
    id: 'blepharospasm',
    word: 'blepharospasm',
    phoneticTh: 'เบลฟาโรสปาสซึม',
    meaning: 'ตาปิดเกร็ง / หนังตากระตุกเกร็ง',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเปลือกตา (Eyelid Disorders)',
    tags: ['ตาปิดเกร็ง', 'กระตุก'],
    rootMeaning: 'blephar- (เปลือกตา) + spasm (การเกร็ง)',
    connectedWordIds: ['blepharitis', 'photophobia', 'spasm', 'nystagmus']
  },
  {
    id: 'blindness',
    word: 'blindness',
    phoneticTh: 'ไบลนด์เนส',
    meaning: 'ตาบอด',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของการมองเห็น (Visual Impairments)',
    tags: ['ตาบอด', 'มองไม่เห็น'],
    connectedWordIds: ['amblyopia', 'cataract', 'glaucoma', 'anophthalmos']
  },
  {
    id: 'bradycardia',
    word: 'bradycardia',
    phoneticTh: 'แบรดดิคาร์เดีย',
    meaning: 'หัวใจเต้นช้ากว่าปกติ',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'จังหวะและการเต้นของหัวใจ (Cardiac Rhythms & Rates)',
    tags: ['หัวใจเต้นช้า', 'ชีพจรช้า'],
    rootMeaning: 'brady- (ช้า) + cardia (หัวใจ)',
    connectedWordIds: ['tachycardia', 'arrhythmia', 'fibrillation']
  },
  {
    id: 'bradyuria',
    word: 'bradyuria',
    phoneticTh: 'แบรดดิยูเรีย',
    meaning: 'อาการถ่ายปัสสาวะช้า',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'ปริมาณและการขับถ่ายปัสสาวะ (Urinary Output Abnormalities)',
    tags: ['ปัสสาวะช้า', 'ขับถ่ายช้า'],
    rootMeaning: 'brady- (ช้า) + -uria (ปัสสาวะ)',
    connectedWordIds: ['dysuria', 'stranguria', 'oliguria', 'pollakiuria']
  },
  {
    id: 'breast',
    word: 'breast',
    phoneticTh: 'เบรสต์',
    meaning: 'เต้านม',
    category: 'ระบบสืบพันธุ์',
    relatedGroup: 'ความผิดปกติของเต้านม (Mammary Disorders)',
    tags: ['เต้านม', 'สืบพันธุ์'],
    connectedWordIds: ['mamma', 'accessory_mamma', 'mastitis', 'nipple']
  },
  {
    id: 'burn',
    word: 'burn',
    phoneticTh: 'เบิร์น',
    meaning: 'รอยไหม้ / แผลไฟไหม้',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'บาดแผลและรอยโรคผิวหนัง (Wounds & Skin Lesions)',
    tags: ['รอยไหม้', 'แผลไหม้'],
    connectedWordIds: ['scald', 'erythema', 'blister', 'abrasion']
  },
  {
    id: 'cachectic',
    word: 'cachectic',
    phoneticTh: 'คาเค็กติก',
    meaning: 'ผอมหนังหุ้มกระดูก / ซูบผอมรุนแรง',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ภาวะโภชนาการและน้ำหนักตัว (Body Weight & Nutrition)',
    tags: ['ผอมแห้ง', 'หนังหุ้มกระดูก'],
    connectedWordIds: ['emaciated', 'weight_loss', 'anorexia', 'obese']
  },
  {
    id: 'callus',
    word: 'callus',
    phoneticTh: 'แคลลัส',
    meaning: 'ผิวหนังที่ด้านหนา หรือ ก้อนกระดูกที่เกิดใหม่สมานแผล',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'การซ่อมแซมเนื้อเยื่อ (Tissue Repair)',
    tags: ['ผิวหนังด้าน', 'กระดูกสมาน'],
    connectedWordIds: ['keratosis', 'hyperkeratosis', 'closed_fracture']
  },
  {
    id: 'canine_tooth',
    word: 'canine tooth',
    phoneticTh: 'เคไนน์ ทูธ',
    meaning: 'ฟันเขี้ยว',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'กายวิภาคและโรคฟัน (Dental Anatomy & Disorders)',
    tags: ['ฟันเขี้ยว', 'ฟัน'],
    connectedWordIds: ['incisor_tooth', 'premolar_tooth', 'molar_tooth', 'dental_caries']
  },
  {
    id: 'canthus',
    word: 'canthus',
    phoneticTh: 'แคนทัส',
    meaning: 'หางตา / หัวตา (มุมเปลือกตา)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'กายวิภาคของตา (Ocular Anatomy)',
    tags: ['หางตา', 'หัวตา', 'มุมตา'],
    connectedWordIds: ['epiphora', 'dacryocystitis', 'blepharitis']
  },
  {
    id: 'cardiac_arrest',
    word: 'cardiac arrest',
    phoneticTh: 'คาร์ดิแอก อะเรสต์',
    meaning: 'หัวใจหยุดเต้น',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'ภาวะวิกฤตและฉุกเฉิน (Emergency & Critical States)',
    tags: ['หัวใจหยุดเต้น', 'วิกฤต', 'หัวใจ'],
    connectedWordIds: ['respiratory_arrest', 'syncope', 'moribund', 'arrhythmia']
  },
  {
    id: 'cardiomegaly',
    word: 'cardiomegaly',
    phoneticTh: 'คาร์ดิโอเมกะลี',
    meaning: 'ภาวะหัวใจโต',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'โรคกล้ามเนื้อหัวใจและขนาด (Cardiac Enlargement & Pathology)',
    tags: ['หัวใจโต', 'หัวใจ'],
    rootMeaning: 'cardio- (หัวใจ) + -megaly (โตผิดปกติ)',
    connectedWordIds: ['microcardia', 'dilated_cardiomyopathy', 'hepatomegaly', 'splenomegaly']
  },
  {
    id: 'carditis',
    word: 'carditis',
    phoneticTh: 'คาร์ไดติส',
    meaning: 'หัวใจอักเสบ',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'การอักเสบของหัวใจ (Cardiac Inflammation)',
    tags: ['หัวใจอักเสบ', 'อักเสบ'],
    rootMeaning: 'card- (หัวใจ) + -itis (อักเสบ)',
    connectedWordIds: ['endocarditis', 'pericardial_disease', 'myositis']
  },
  {
    id: 'cataract',
    word: 'cataract',
    phoneticTh: 'แคทแทแรกต์',
    meaning: 'ต้อกระจก (เลนส์ตาขุ่น)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'โรคเลนส์และต้อในตา (Cataracts & Lens Pathology)',
    tags: ['ต้อกระจก', 'เลนส์ตาขุ่น'],
    connectedWordIds: ['senile_cataract', 'glaucoma', 'blindness', 'keratitis']
  },
  {
    id: 'caudal_abdomen',
    word: 'caudal abdomen',
    phoneticTh: 'คอร์ดัล แอบโดเมน',
    meaning: 'ช่องท้องส่วนท้าย',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ตำแหน่งทางกายวิภาคช่องท้อง (Abdominal Regions)',
    tags: ['ช่องท้องส่วนท้าย', 'กายวิภาค'],
    connectedWordIds: ['cranial_abdomen', 'mid_abdomen', 'pendulous_abdomen']
  },
  {
    id: 'cerumen',
    word: 'cerumen',
    phoneticTh: 'ซีรูเมน',
    meaning: 'ขี้หู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'สารคัดหลั่งของหู (Ear Secretions)',
    tags: ['ขี้หู', 'หู'],
    connectedWordIds: ['earwax', 'otitis_externa', 'otopyosis']
  },
  {
    id: 'cheilitis',
    word: 'cheilitis',
    phoneticTh: 'ไคลิติส',
    meaning: 'ริมฝีปากอักเสบ',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'การอักเสบในช่องปาก (Oral Cavity Inflammations)',
    tags: ['ริมฝีปากอักเสบ', 'ปาก'],
    rootMeaning: 'cheil- (ริมฝีปาก) + -itis (อักเสบ)',
    connectedWordIds: ['stomatitis', 'gingivitis', 'uloglossitis', 'gingivostomatitis']
  },
  {
    id: 'chemosis',
    word: 'chemosis',
    phoneticTh: 'คีโมซิส',
    meaning: 'เยื่อตาบวมน้ำ',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเยื่อบุตา (Conjunctival Disorders)',
    tags: ['เยื่อตาบวม', 'ตาบวมน้ำ'],
    connectedWordIds: ['conjunctivitis', 'keratitis', 'uveitis']
  },
  {
    id: 'choke',
    word: 'choke',
    phoneticTh: 'โช้ก',
    meaning: 'หายใจไม่ออก / สำลักสิ่งแปลกปลอม',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['สำลัก', 'หายใจไม่ออก'],
    connectedWordIds: ['air_hunger', 'dyspnea', 'stridor', 'respiratory_arrest']
  },
  {
    id: 'cleft_lip',
    word: 'cleft lip',
    phoneticTh: 'เคลฟต์ ลิป',
    meaning: 'ปากแหว่ง',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'ความพิการแต่กำเนิด (Congenital Malformations)',
    tags: ['ปากแหว่ง', 'พิการแต่กำเนิด'],
    connectedWordIds: ['cleft_palate', 'oral_cavity', 'dysphagia']
  },
  {
    id: 'cleft_palate',
    word: 'cleft palate',
    phoneticTh: 'เคลฟต์ พาเลต',
    meaning: 'เพดานโหว่',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'ความพิการแต่กำเนิด (Congenital Malformations)',
    tags: ['เพดานโหว่', 'พิการแต่กำเนิด'],
    connectedWordIds: ['cleft_lip', 'oral_cavity', 'dysphagia']
  },
  {
    id: 'clonic_spasm',
    word: 'clonic spasm',
    phoneticTh: 'โคลนิก สปาสซึม',
    meaning: 'การชักกระตุกเกร็ง (เป็นจังหวะคลายสลับเกร็ง)',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ภาวะหมดสติและการชัก (Loss of Consciousness & Seizures)',
    tags: ['ชักกระตุกเกร็ง', 'ชัก'],
    connectedWordIds: ['clonus_spasm', 'convulsion', 'seizure', 'tetany']
  },
  {
    id: 'clonus_spasm',
    word: 'clonus spasm',
    phoneticTh: 'โคลนัส สปาสซึม',
    meaning: 'การชักกระตุกถี่ๆ รัวๆ',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ภาวะหมดสติและการชัก (Loss of Consciousness & Seizures)',
    tags: ['ชักกระตุกถี่', 'กระตุกรัว'],
    connectedWordIds: ['clonic_spasm', 'myoclonus', 'convulsion', 'spasm']
  },
  {
    id: 'closed_fracture',
    word: 'closed fracture',
    phoneticTh: 'โคลสด์ แฟรคเจอร์',
    meaning: 'กระดูกหักแบบปิด (ไม่มีแผลทะลุผิวหนัง)',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกหักปิด', 'กระดูกหัก'],
    connectedWordIds: ['open_fracture', 'comminuted_fracture', 'complete_fracture', 'spiral_fracture']
  },
  {
    id: 'cochlea',
    word: 'cochlea',
    phoneticTh: 'คอเคลีย',
    meaning: 'หูชั้นในรูปหอยโข่ง (อวัยวะรับเสียง)',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โครงสร้างหู (Ear Anatomy)',
    tags: ['หูชั้นใน', 'หอยโข่ง', 'รับเสียง'],
    connectedWordIds: ['tympanic_membrane', 'malleus', 'incus', 'stapes', 'deafness']
  },
  {
    id: 'comminuted_fracture',
    word: 'comminuted fracture',
    phoneticTh: 'คอมมินูเทด แฟรคเจอร์',
    meaning: 'กระดูกแตกย่อย / แตกเป็นชิ้นเล็กชิ้นน้อย',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกแตกย่อย', 'กระดูกหัก'],
    connectedWordIds: ['closed_fracture', 'open_fracture', 'complete_fracture', 'transverse_fracture']
  },
  {
    id: 'complete_fracture',
    word: 'complete fracture',
    phoneticTh: 'คอมพลีต แฟรคเจอร์',
    meaning: 'กระดูกหักตลอดแนวความหนาของกระดูก',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกหักสมบูรณ์', 'หักตลอดแนว'],
    connectedWordIds: ['closed_fracture', 'oblique_fracture', 'spiral_fracture', 'transverse_fracture']
  },
  {
    id: 'conjunctivitis',
    word: 'conjunctivitis',
    phoneticTh: 'คอนจังติไวติส',
    meaning: 'เยื่อตาขาวอักเสบ / ตาแดง',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเยื่อบุตา (Conjunctival Disorders)',
    tags: ['ตาแดง', 'เยื่อตาอักเสบ'],
    rootMeaning: 'conjunctiv- (เยื่อบุตา) + -itis (อักเสบ)',
    connectedWordIds: ['chemosis', 'keratoconjunctivitis', 'keratitis', 'uveitis']
  },
  {
    id: 'conscious',
    word: 'conscious',
    phoneticTh: 'คอนเชียส',
    meaning: 'ความรู้สึกตัว / ตื่นรู้สติดี',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ระดับความรู้สึกตัว (Levels of Consciousness)',
    tags: ['รู้สึกตัว', 'มีสติ'],
    connectedWordIds: ['unconscious', 'absence', 'syncope', 'lethargy']
  },
  {
    id: 'constipation',
    word: 'constipation',
    phoneticTh: 'คอนสติเพชัน',
    meaning: 'อาการท้องผูก',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของการขับถ่ายอุจจาระ (Bowel Movement Disorders)',
    tags: ['ท้องผูก', 'ถ่ายไม่ออก'],
    connectedWordIds: ['obstipation', 'diarrhea', 'dyschezia', 'tenesmus']
  },
  {
    id: 'contusion',
    word: 'contusion',
    phoneticTh: 'คอนทูชัน',
    meaning: 'รอยฟกช้ำ / รอยช้ำใต้ผิวหนัง',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'บาดแผลและรอยโรคผิวหนัง (Wounds & Skin Lesions)',
    tags: ['รอยฟกช้ำ', 'ช้ำเลือด'],
    connectedWordIds: ['ecchymosis', 'abrasion', 'laceration', 'hematoma']
  },
  {
    id: 'convergent_strabismus',
    word: 'convergent strabismus',
    phoneticTh: 'คอนเวอร์เจนต์ สตราบิสมัส',
    meaning: 'ตาเหล่เข้า (ตาดำเบนเข้าด้านใน)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ตาเหล่และความผิดปกติของกล้ามเนื้อตา (Strabismus & Eye Alignment)',
    tags: ['ตาเหล่เข้า', 'ตาเข'],
    connectedWordIds: ['divergent_strabismus', 'nystagmus', 'amblyopia']
  },
  {
    id: 'convulsion',
    word: 'convulsion',
    phoneticTh: 'คอนวัลชัน',
    meaning: 'การชัก / ภาวะชักเกร็ง',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ภาวะหมดสติและการชัก (Loss of Consciousness & Seizures)',
    tags: ['ชัก', 'กระตุกเกร็ง'],
    connectedWordIds: ['seizure', 'epilepsy', 'clonic_spasm', 'tetany']
  },
  {
    id: 'coprophagia',
    word: 'coprophagia',
    phoneticTh: 'โคโพรเฟเจีย',
    meaning: 'พฤติกรรมการกินอุจจาระตัวเอง',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'พฤติกรรมการกินผิดปกติ (Abnormal Ingestion)',
    tags: ['กินอึ', 'กินอุจจาระ'],
    rootMeaning: 'copro- (อุจจาระ) + phagia (การกิน)',
    connectedWordIds: ['polyphagia', 'anorexia', 'pica']
  },
  {
    id: 'corneal_ulcer',
    word: 'corneal ulcer',
    phoneticTh: 'คอร์เนียล อัลเซอร์',
    meaning: 'แผลหลุมกระจกตา',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'โรคกระจกตา (Corneal Pathology)',
    tags: ['แผลกระจกตา', 'ตาเป็นแผล'],
    connectedWordIds: ['keratitis', 'keratoconjunctivitis', 'hypopyon', 'hyphaema']
  },
  {
    id: 'cough',
    word: 'cough',
    phoneticTh: 'คัฟ',
    meaning: 'ไอ',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'อาการไอและเสียงหายใจ (Cough & Respiratory Sounds)',
    tags: ['ไอ', 'ทางเดินหายใจ'],
    connectedWordIds: ['dry_cough', 'productive_cough', 'haemoptysis', 'sneeze']
  },
  {
    id: 'crackles',
    word: 'crackles',
    phoneticTh: 'แครกเกิลส์',
    meaning: 'เสียงแซมหายใจ (เสียงกรอบแกรบในปอดขณะหายใจเข้า)',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'อาการไอและเสียงหายใจ (Cough & Respiratory Sounds)',
    tags: ['เสียงปอด', 'เสียงกรอบแกรบ'],
    connectedWordIds: ['wheeze', 'stridor', 'stertor', 'dull']
  },
  {
    id: 'cranial_abdomen',
    word: 'cranial abdomen',
    phoneticTh: 'เครเนียล แอบโดเมน',
    meaning: 'ช่องท้องส่วนหน้า (ใกล้กะบังลม/ตับ)',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ตำแหน่งทางกายวิภาคช่องท้อง (Abdominal Regions)',
    tags: ['ช่องท้องส่วนหน้า', 'กายวิภาค'],
    connectedWordIds: ['mid_abdomen', 'caudal_abdomen', 'distended_stomach']
  },
  {
    id: 'crust',
    word: 'crust',
    phoneticTh: 'ครัสต์',
    meaning: 'สะเก็ดแผล / สะเก็ดผิวหนังแห้งกรัง',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'รอยโรคปฐมภูมิและทุติยภูมิ (Dermatological Lesions)',
    tags: ['สะเก็ดแผล', 'สะเก็ด'],
    connectedWordIds: ['scale', 'papules', 'pustules', 'plaques']
  },
  {
    id: 'cryptorchidism',
    word: 'cryptorchidism',
    phoneticTh: 'คริปทอร์คิดิซึม',
    meaning: 'อัณฑะค้างในช่องท้อง (ภาวะทองแดง)',
    category: 'ระบบสืบพันธุ์',
    relatedGroup: 'โรคระบบสืบพันธุ์เพศผู้ (Male Reproductive Disorders)',
    tags: ['ทองแดง', 'อัณฑะไม่ลงถุง'],
    rootMeaning: 'kryptos (ซ่อน) + orchis (อัณฑะ)',
    connectedWordIds: ['orchitis', 'penitis', 'prostatomegaly']
  },
  {
    id: 'cyanosis',
    word: 'cyanosis',
    phoneticTh: 'ไซยาโนซิส',
    meaning: 'อาการเขียวคล้ำ (ภาวะขาดออกซิเจนในเลือด)',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'ภาวะวิกฤตและฉุกเฉิน (Emergency & Critical States)',
    tags: ['เขียวคล้ำ', 'ขาดออกซิเจน'],
    rootMeaning: 'kyanos (สีน้ำเงินเข้ม)',
    connectedWordIds: ['air_hunger', 'dyspnea', 'hypoxia', 'cardiac_arrest']
  },
  {
    id: 'cystalgia',
    word: 'cystalgia',
    phoneticTh: 'ซิสทาลเจีย',
    meaning: 'อาการปวดกระเพาะปัสสาวะ',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'โรคกระเพาะปัสสาวะและการควบคุม (Bladder Disorders)',
    tags: ['ปวดกระเพาะปัสสาวะ', 'ปวด'],
    rootMeaning: 'cyst- (กระเพาะปัสสาวะ) + -algia (อาการปวด)',
    connectedWordIds: ['cystitis', 'dysuria', 'stranguria', 'nephralgia']
  },
  {
    id: 'cystitis',
    word: 'cystitis',
    phoneticTh: 'ซิสไตติส',
    meaning: 'กระเพาะปัสสาวะอักเสบ',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'โรคกระเพาะปัสสาวะและการควบคุม (Bladder Disorders)',
    tags: ['กระเพาะปัสสาวะอักเสบ', 'อักเสบ'],
    rootMeaning: 'cyst- (กระเพาะปัสสาวะ) + -itis (อักเสบ)',
    connectedWordIds: ['cystalgia', 'pollakiuria', 'hematuria', 'pyuria']
  },
  {
    id: 'cysts',
    word: 'cysts',
    phoneticTh: 'ซิสต์',
    meaning: 'ถุงน้ำ / ซีสต์',
    category: 'อื่นๆ',
    relatedGroup: 'ก้อนเนื้อและถุงน้ำ (Cysts & Tumors)',
    tags: ['ถุงน้ำ', 'ซีสต์'],
    connectedWordIds: ['tumors', 'sialocele', 'arthrocele', 'nodules']
  },
  {
    id: 'dacryocystitis',
    word: 'dacryocystitis',
    phoneticTh: 'แดครีโอซิสไตติส',
    meaning: 'ถุงน้ำตาอักเสบ',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของต่อมน้ำตาและผิวกระจกตา (Ocular Secretion)',
    tags: ['ถุงน้ำตาอักเสบ', 'น้ำตา'],
    rootMeaning: 'dacryo- (น้ำตา) + cyst (ถุง) + -itis (อักเสบ)',
    connectedWordIds: ['epiphora', 'alacrima', 'canthus']
  },
  {
    id: 'deafness',
    word: 'deafness',
    phoneticTh: 'เดฟเนส',
    meaning: 'หูหนวก / การสูญเสียการได้ยิน',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูหนวก', 'ไม่ได้ยิน'],
    connectedWordIds: ['cochlea', 'tympanic_membrane', 'otitis_interna']
  },
  {
    id: 'deciduous_tooth',
    word: 'deciduous tooth',
    phoneticTh: 'เดซิดูอัส ทูธ',
    meaning: 'ฟันน้ำนม',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'กายวิภาคและโรคฟัน (Dental Anatomy & Disorders)',
    tags: ['ฟันน้ำนม', 'ฟัน'],
    connectedWordIds: ['eruption', 'maleruption', 'canine_tooth', 'impacted_tooth']
  }
];
