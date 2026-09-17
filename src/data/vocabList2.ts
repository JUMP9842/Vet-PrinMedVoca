import { VocabItem } from '../types';

export const VOCAB_LIST_PART2: VocabItem[] = [
  // Page 3
  {
    id: 'decubitus',
    word: 'decubitus',
    phoneticTh: 'เดคิวบิทัส',
    meaning: 'แผลกดทับ (แผลจากการนอนนาน)',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'บาดแผลและรอยโรคผิวหนัง (Wounds & Skin Lesions)',
    tags: ['แผลกดทับ', 'นอนติดเตียง', 'แผล'],
    connectedWordIds: ['abrasion', 'ulceration', 'necrosis', 'dehiscence']
  },
  {
    id: 'dehiscence',
    word: 'dehiscence',
    phoneticTh: 'เดฮิสเซนส์',
    meaning: 'แผลปริ / แผลผ่าตัดแยกตัว',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'บาดแผลและรอยโรคผิวหนัง (Wounds & Skin Lesions)',
    tags: ['แผลปริ', 'แผลแยก'],
    connectedWordIds: ['laceration', 'ulceration', 'decubitus']
  },
  {
    id: 'dehydration',
    word: 'dehydration',
    phoneticTh: 'ดีไฮเดรชัน',
    meaning: 'ภาวะขาดน้ำ',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'การสะสมสารน้ำในร่างกาย (Fluid Accumulation & Edema)',
    tags: ['ขาดน้ำ', 'ผิวหนังหย่อน', 'ตาจมลึก'],
    rootMeaning: 'de- (ขาด/ลด) + hydr- (น้ำ)',
    connectedWordIds: ['sunken_eye', 'adipsia', 'polydipsia', 'shock']
  },
  {
    id: 'demodicosis',
    word: 'demodicosis',
    phoneticTh: 'เดโมดิโคซิส',
    meaning: 'โรคผิวหนังที่เกิดจากไรขี้เรื้อนขุมขน (Demodex canis)',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'ปรสิตภายนอกและภูมิแพ้ (Parasitic Infestation)',
    tags: ['ขี้เรื้อนเปียก', 'ไรขุมขน', 'ผิวหนัง'],
    connectedWordIds: ['acariasis', 'infestation', 'alopecia', 'pyoderma']
  },
  {
    id: 'dental_caries',
    word: 'dental caries',
    phoneticTh: 'เดนทัล แครีส์',
    meaning: 'ฟันผุ',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'กายวิภาคและโรคฟัน (Dental Anatomy & Disorders)',
    tags: ['ฟันผุ', 'ฟัน'],
    connectedWordIds: ['odontoseisis', 'halitosis', 'gingivitis', 'impacted_tooth']
  },
  {
    id: 'depression',
    word: 'depression',
    phoneticTh: 'ดิเพรสชัน',
    meaning: 'ซึม หงอย ไม่ร่าเริง',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ระดับความรู้สึกตัว (Levels of Consciousness)',
    tags: ['ซึม', 'หงอย', 'ไม่ร่าเริง'],
    connectedWordIds: ['lethargy', 'moribund', 'conscious', 'unconscious']
  },
  {
    id: 'dermatitis',
    word: 'dermatitis',
    phoneticTh: 'เดอร์มาไททิส',
    meaning: 'ผิวหนังอักเสบ',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'โรคผิวหนังอักเสบและภูมิแพ้ (Allergic Dermatitis)',
    tags: ['ผิวหนังอักเสบ', 'อักเสบ'],
    rootMeaning: 'dermat- (ผิวหนัง) + -itis (อักเสบ)',
    connectedWordIds: ['dermatosis', 'dermatomycosis', 'atopic', 'flea_allergy_dermatitis']
  },
  {
    id: 'dermatomycosis',
    word: 'dermatomycosis',
    phoneticTh: 'เดอร์มาโตไมโคซิส',
    meaning: 'โรคผิวหนังที่เกิดจากเชื้อรา (เชื้อราผิวหนัง / ขี้กลาก)',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'โรคผิวหนังอักเสบและภูมิแพ้ (Allergic Dermatitis)',
    tags: ['เชื้อรา', 'ผิวหนัง', 'ขี้กลาก'],
    rootMeaning: 'dermat- (ผิวหนัง) + myco- (เชื้อรา) + -osis (ภาวะโรค)',
    connectedWordIds: ['dermatitis', 'dermatosis', 'alopecia', 'crust']
  },
  {
    id: 'dermatosis',
    word: 'dermatosis',
    phoneticTh: 'เดอร์มาโทซิส',
    meaning: 'โรคผิวหนัง (พยาธิสภาพของผิวหนังทั่วไป)',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'โรคผิวหนังอักเสบและภูมิแพ้ (Allergic Dermatitis)',
    tags: ['โรคผิวหนัง', 'ผิว'],
    connectedWordIds: ['dermatitis', 'dermatomycosis', 'pyoderma', 'seborrhea']
  },
  {
    id: 'dermis',
    word: 'dermis',
    phoneticTh: 'เดอร์มิส',
    meaning: 'ชั้นผิวหนังแท้',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'โครงสร้างชั้นผิวหนัง (Skin Anatomy)',
    tags: ['ผิวหนังแท้', 'กายวิภาค'],
    connectedWordIds: ['epidermis', 'subcutaneous_emphysema', 'ecchymosis']
  },
  {
    id: 'diaphragmatic_hernia',
    word: 'diaphragmatic hernia',
    phoneticTh: 'ไดอะแฟรกมาติก เฮอร์เนีย',
    meaning: 'ไส้เลื่อนกะบังลม (อวัยวะช่องท้องเลื่อนเข้าช่องอก)',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ไส้เลื่อนและความผิดปกติของผนังช่องท้อง (Hernias)',
    tags: ['ไส้เลื่อนกะบังลม', 'ไส้เลื่อน'],
    connectedWordIds: ['umbilical_hernia', 'dyspnea', 'cyanosis']
  },
  {
    id: 'diarrhea',
    word: 'diarrhea',
    phoneticTh: 'ไดอาเรีย',
    meaning: 'อาการท้องร่วง / ท้องเสีย ถ่ายเหลว',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของการขับถ่ายอุจจาระ (Bowel Movement Disorders)',
    tags: ['ท้องร่วง', 'ท้องเสีย', 'ถ่ายเหลว'],
    rootMeaning: 'dia- (ทะลุ/ผ่าน) + rhein (ไหล)',
    connectedWordIds: ['constipation', 'gastroenteritis', 'enteritis', 'dyschezia']
  },
  {
    id: 'dilated_cardiomyopathy',
    word: 'dilated cardiomyopathy',
    phoneticTh: 'ไดเลเทด คาร์ดิโอไมโอพาธี',
    meaning: 'โรคกล้ามเนื้อหัวใจขยายตัวผิดปกติ (DCM)',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'โรคกล้ามเนื้อหัวใจและขนาด (Cardiac Enlargement & Pathology)',
    tags: ['กล้ามเนื้อหัวใจขยาย', 'โรคหัวใจ', 'DCM'],
    rootMeaning: 'cardio (หัวใจ) + myo (กล้ามเนื้อ) + pathy (โรค)',
    connectedWordIds: ['cardiomegaly', 'microcardia', 'arrhythmia', 'ascites']
  },
  {
    id: 'displaced_fracture',
    word: 'displace fracture',
    phoneticTh: 'ดิสเพลสด์ แฟรคเจอร์',
    meaning: 'กระดูกหักเกย / ชิ้นกระดูกเคลื่อนหลุดจากแนวเดิม',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกหักเกย', 'กระดูกเคลื่อน'],
    connectedWordIds: ['malunion', 'nonunion', 'closed_fracture', 'open_fracture']
  },
  {
    id: 'distended_stomach',
    word: 'distended stomach',
    phoneticTh: 'ดิสเทนเดด สตอมัค',
    meaning: 'กระเพาะอาหารกางพอง / กระเพาะขยายตัว',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของกระเพาะและลำไส้ (Gastric & Intestinal Pathology)',
    tags: ['กระเพาะกาง', 'ท้องพอง'],
    connectedWordIds: ['gastric_dilation', 'distension', 'flatulence', 'volvulus']
  },
  {
    id: 'distension',
    word: 'distension',
    phoneticTh: 'ดิสเทนชัน',
    meaning: 'การพอง / การขยายตัวของอวัยวะกลวง',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ความผิดปกติของกระเพาะและลำไส้ (Gastric & Intestinal Pathology)',
    tags: ['การพอง', 'ท้องอืดพอง'],
    connectedWordIds: ['distended_stomach', 'gastric_dilation', 'megacolon', 'flatulence']
  },
  {
    id: 'distichiasis',
    word: 'distichiasis',
    phoneticTh: 'ดิสติคิเอซิส',
    meaning: 'ขนตาซ้อนแย้ง (ขนตางอกผิดตำแหน่งจากต่อมไมโบเมียน)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของขนตาและเปลือกตา (Eyelashes Pathology)',
    tags: ['ขนตาซ้อนแย้ง', 'ขนตาทิ่มตา'],
    connectedWordIds: ['trichiasis', 'entropion', 'corneal_ulcer', 'eyelashes']
  },
  {
    id: 'disystole',
    word: 'disystole',
    phoneticTh: 'ไดซิสโทลี',
    meaning: 'เสียงหรือช่วงระยะของการคลายตัวของหัวใจ (Diastole)',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'เสียงและกลไกการบีบคลายตัวของหัวใจ (Cardiac Cycle)',
    tags: ['หัวใจคลายตัว', 'เสียงหัวใจ'],
    connectedWordIds: ['systole', 'murmurs', 'arrhythmia']
  },
  {
    id: 'divergent_strabismus',
    word: 'divergent strabismus',
    phoneticTh: 'ไดเวอร์เจนต์ สตราบิสมัส',
    meaning: 'ตาเหล่ออก (ตาดำเบนออกด้านนอก)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ตาเหล่และความผิดปกติของกล้ามเนื้อตา (Strabismus & Eye Alignment)',
    tags: ['ตาเหล่ออก', 'ตาเข'],
    connectedWordIds: ['convergent_strabismus', 'nystagmus', 'amblyopia']
  },
  {
    id: 'dry_cough',
    word: 'dry cough',
    phoneticTh: 'ดราย คัฟ',
    meaning: 'ไอแห้งๆ (ไอไม่มีเสมหะ)',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'อาการไอและเสียงหายใจ (Cough & Respiratory Sounds)',
    tags: ['ไอแห้ง', 'ไอ'],
    connectedWordIds: ['cough', 'productive_cough', 'haemoptysis', 'tracheobronchitis']
  },
  {
    id: 'dull',
    word: 'dull',
    phoneticTh: 'ดัล',
    meaning: 'เสียงทึบ (จากการเคาะตรวจช่องอก/ช่องท้องเมื่อมีน้ำหรือเนื้อทึบ)',
    category: 'อื่นๆ',
    relatedGroup: 'เสียงตรวจร่างกายและการฟัง (Auscultation & Percussion Sounds)',
    tags: ['เสียงทึบ', 'เคาะตรวจ'],
    connectedWordIds: ['crackles', 'wheeze', 'pleural_effusion', 'ascites']
  },
  {
    id: 'dyschezia',
    word: 'dyschezia',
    phoneticTh: 'ดิสคีเซีย',
    meaning: 'การขับถ่ายอุจจาระลำบาก / เจ็บปวดขณะถ่ายอุจจาระ',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของการขับถ่ายอุจจาระ (Bowel Movement Disorders)',
    tags: ['ถ่ายลำบาก', 'เจ็บก้น'],
    rootMeaning: 'dys- (ลำบาก/ผิดปกติ) + chezein (อุจจาระ)',
    connectedWordIds: ['constipation', 'obstipation', 'tenesmus', 'anal_sacculitis']
  },
  {
    id: 'dyscoria',
    word: 'dyscoria',
    phoneticTh: 'ดิสโคเรีย',
    meaning: 'รูม่านตามีรูปร่างผิดปกติ',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของรูม่านตา (Pupillary Abnormalities)',
    tags: ['รูม่านตาผิดปกติ', 'รูม่านตาบิดเบี้ยว'],
    rootMeaning: 'dys- (ผิดปกติ) + kore (รูม่านตา)',
    connectedWordIds: ['anisocoria', 'miosis', 'mydriasis', 'uveitis']
  },
  {
    id: 'dysphagia',
    word: 'dysphagia',
    phoneticTh: 'ดิสเฟเจีย',
    meaning: 'การกลืนลำบาก',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของทางเดินอาหารส่วนต้น (Upper GI)',
    tags: ['กลืนลำบาก', 'กลืนเจ็บ'],
    rootMeaning: 'dys- (ลำบาก) + phagia (การกลืน/กิน)',
    connectedWordIds: ['odynophagia', 'megaesophagus', 'stomatitis', 'choke']
  },
  {
    id: 'dysplasia',
    word: 'dysplasia',
    phoneticTh: 'ดิสเพลเซีย',
    meaning: 'การเจริญเติบโตผิดปกติของเนื้อเยื่อหรือข้อต่อ (เช่น สะโพกเสื่อม/หลวม)',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ความผิดปกติของขนาดเนื้อเยื่อ (Tissue Growth & Size)',
    tags: ['เจริญผิดปกติ', 'ข้อสะโพกเสื่อม'],
    rootMeaning: 'dys- (ผิดปกติ) + plasis (การสร้าง/เจริญ)',
    connectedWordIds: ['atrophy', 'hypertrophy', 'ankylosis']
  },
  {
    id: 'dyspnea',
    word: 'dyspnea',
    phoneticTh: 'ดิสพ์เนีย',
    meaning: 'หายใจลำบาก / หายใจเหนื่อยหอบ',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['หายใจลำบาก', 'หอบเหนื่อย', 'หายใจขัด'],
    rootMeaning: 'dys- (ลำบาก) + pnoia (การหายใจ)',
    connectedWordIds: ['air_hunger', 'cyanosis', 'orthopnea', 'hyperpnea', 'hypopnea']
  },
  {
    id: 'dystocia',
    word: 'dystocia',
    phoneticTh: 'ดิสโทเชีย',
    meaning: 'การคลอดลำบาก / ภาวะคลอดยาก',
    category: 'ระบบสืบพันธุ์',
    relatedGroup: 'การตั้งครรภ์และการคลอด (Obstetrics & Parturition)',
    tags: ['คลอดลำบาก', 'คลอดยาก'],
    rootMeaning: 'dys- (ลำบาก) + tokos (การคลอด)',
    connectedWordIds: ['eutocia', 'pregnancy', 'postpartum_hemorrhage', 'intrapartum_hemorrhage']
  },
  {
    id: 'dysuria',
    word: 'dysuria',
    phoneticTh: 'ดิสยูเรีย',
    meaning: 'การถ่ายปัสสาวะลำบาก / เจ็บปวดขณะปัสสาวะ',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'ปริมาณและการขับถ่ายปัสสาวะ (Urinary Output Abnormalities)',
    tags: ['ปัสสาวะลำบาก', 'ฉี่แสบขัด'],
    rootMeaning: 'dys- (ลำบาก) + -uria (ปัสสาวะ)',
    connectedWordIds: ['stranguria', 'pollakiuria', 'anuria', 'cystalgia']
  },
  {
    id: 'eardrum',
    word: 'ear drum',
    phoneticTh: 'แอร์ ดรัม',
    meaning: 'เยื่อแก้วหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โครงสร้างหู (Ear Anatomy)',
    tags: ['เยื่อแก้วหู', 'หู'],
    connectedWordIds: ['tympanic_membrane', 'myringitis', 'otitis_media', 'cochlea']
  },
  {
    id: 'earwax',
    word: 'earwax',
    phoneticTh: 'แอร์แวกซ์',
    meaning: 'ขี้หู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'สารคัดหลั่งของหู (Ear Secretions)',
    tags: ['ขี้หู', 'หู'],
    connectedWordIds: ['cerumen', 'otitis_externa', 'otopyosis']
  },
  {
    id: 'ecchymosis',
    word: 'ecchymosis',
    phoneticTh: 'เอคไคโมซิส',
    meaning: 'เลือดออกใต้ผิวหนังเป็นปื้นใหญ่ / รอยฟกช้ำเลือด',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'เลือดออกและจุดจ้ำเลือด (Hemorrhage & Bleeding)',
    tags: ['จ้ำเลือด', 'เลือดออกใต้ผิวหนัง'],
    connectedWordIds: ['petechial', 'contusion', 'hematoma', 'hyperemia']
  },
  {
    id: 'echocardiography',
    word: 'echocardiography',
    phoneticTh: 'เอคโคคาร์ดิโอกราฟี',
    meaning: 'การตรวจบันทึกภาพหัวใจด้วยคลื่นความถี่สูง (อัลตราซาวด์หัวใจ)',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'การตรวจพิเศษและวินิจฉัย (Diagnostic Procedures)',
    tags: ['อัลตราซาวด์หัวใจ', 'ตรวจหัวใจ'],
    connectedWordIds: ['dilated_cardiomyopathy', 'cardiomegaly', 'aortic_stenosis']
  },
  {
    id: 'ectropion',
    word: 'ectropion',
    phoneticTh: 'เอ็กโทรเปียน',
    meaning: 'ขอบตาแบะออก / เปลือกตาม้วนออกนอก',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเปลือกตา (Eyelid Disorders)',
    tags: ['ขอบตาแบะ', 'เปลือกตาม้วนออก'],
    rootMeaning: 'ek- (ออกข้างนอก) + trepein (หมุน/ม้วน)',
    connectedWordIds: ['entropion', 'blepharitis', 'epiphora', 'conjunctivitis']
  },
  {
    id: 'emaciated',
    word: 'emaciated',
    phoneticTh: 'อิเมซิเอเทด',
    meaning: 'ผอมแห้ง / ร่างกายซูบซีดอย่างมาก',
    category: 'อาการทั่วไปและสัญญาณชีพ',
    relatedGroup: 'ภาวะโภชนาการและน้ำหนักตัว (Body Weight & Nutrition)',
    tags: ['ผอมแห้ง', 'ซูบผอม'],
    connectedWordIds: ['cachectic', 'weight_loss', 'anorexia', 'obese']
  },
  {
    id: 'emesis',
    word: 'emesis',
    phoneticTh: 'เอเมซิส',
    meaning: 'การอาเจียน',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'อาการอาเจียนและขย้อน (Vomiting & Regurgitation)',
    tags: ['อาเจียน', 'อ้วก'],
    rootMeaning: 'emein (อาเจียน)',
    connectedWordIds: ['vomiting', 'nausea', 'regurgitation', 'hematemesis', 'melanemesis']
  },
  {
    id: 'emphysema',
    word: 'emphysema',
    phoneticTh: 'เอมฟีซีมา',
    meaning: 'ภาวะมีอากาศคั่งในเนื้อเยื่อ (ถุงลมโป่งพอง)',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['ถุงลมโป่งพอง', 'อากาศในเนื้อเยื่อ'],
    connectedWordIds: ['subcutaneous_emphysema', 'pneumothorax', 'dyspnea']
  },
  {
    id: 'encephalitis',
    word: 'encephalitis',
    phoneticTh: 'เอ็นเซฟฟะไลติส',
    meaning: 'สมองอักเสบ',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'การอักเสบของระบบประสาท (Neuroinflammation)',
    tags: ['สมองอักเสบ', 'สมอง'],
    rootMeaning: 'encephal- (สมอง) + -itis (อักเสบ)',
    connectedWordIds: ['meningitis', 'encephalomyelitis', 'encephalomalacia', 'seizure']
  },
  {
    id: 'encephalomalacia',
    word: 'encephalomalacia',
    phoneticTh: 'เอ็นเซฟฟะโลมะเลเชีย',
    meaning: 'เนื้อสมองน่วม / สมองเสื่อมสลายตัวนิ่ม',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'การอักเสบของระบบประสาท (Neuroinflammation)',
    tags: ['สมองน่วม', 'สมองเสื่อม'],
    rootMeaning: 'encephal- (สมอง) + malakia (น่วม/นิ่ม)',
    connectedWordIds: ['encephalitis', 'nephromalacia', 'hydrocephalus']
  },
  {
    id: 'encephalomyelitis',
    word: 'encephalomyelitis',
    phoneticTh: 'เอ็นเซฟฟะโลไมอีไลติส',
    meaning: 'สมองและไขสันหลังอักเสบ',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'การอักเสบของระบบประสาท (Neuroinflammation)',
    tags: ['สมองอักเสบ', 'ไขสันหลังอักเสบ'],
    rootMeaning: 'encephal- (สมอง) + myel- (ไขสันหลัง) + -itis (อักเสบ)',
    connectedWordIds: ['encephalitis', 'meningitis', 'neuritis', 'paralysis']
  },
  {
    id: 'endocarditis',
    word: 'endocarditis',
    phoneticTh: 'เอ็นโดคาร์ไดติส',
    meaning: 'เยื่อบุหัวใจอักเสบ',
    category: 'ระบบหัวใจและหลอดเลือด',
    relatedGroup: 'การอักเสบของหัวใจ (Cardiac Inflammation)',
    tags: ['เยื่อบุหัวใจอักเสบ', 'หัวใจ'],
    rootMeaning: 'endo- (ด้านใน) + card- (หัวใจ) + -itis (อักเสบ)',
    connectedWordIds: ['carditis', 'pericardial_disease', 'murmurs']
  },
  {
    id: 'enteritis',
    word: 'enteritis',
    phoneticTh: 'เอ็นเทอไรติส',
    meaning: 'ลำไส้เล็กอักเสบ',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'การอักเสบของกระเพาะและลำไส้ (Gastrointestinal Inflammations)',
    tags: ['ลำไส้เล็กอักเสบ', 'ลำไส้อักเสบ'],
    rootMeaning: 'enter- (ลำไส้) + -itis (อักเสบ)',
    connectedWordIds: ['enterocolitis', 'gastroenteritis', 'diarrhea', 'proctitis']
  },
  {
    id: 'enterocolitis',
    word: 'enterocolitis',
    phoneticTh: 'เอ็นเทอโรโคไลติส',
    meaning: 'ลำไส้เล็กและลำไส้ใหญ่อักเสบ',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'การอักเสบของกระเพาะและลำไส้ (Gastrointestinal Inflammations)',
    tags: ['ลำไส้อักเสบ', 'ลำไส้ใหญ่'],
    rootMeaning: 'enter- (ลำไส้เล็ก) + col- (ลำไส้ใหญ่) + -itis (อักเสบ)',
    connectedWordIds: ['enteritis', 'gastroenteritis', 'megacolon', 'diarrhea']
  },
  {
    id: 'entropion',
    word: 'entropion',
    phoneticTh: 'เอ็นโทรเปียน',
    meaning: 'ขอบตาม้วนเข้าใน (ขนตาทิ่มกระจกตา)',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'ความผิดปกติของเปลือกตา (Eyelid Disorders)',
    tags: ['ขอบตาม้วนเข้า', 'ขนตาทิ่มตา'],
    rootMeaning: 'en- (เข้าข้างใน) + trepein (หมุน/ม้วน)',
    connectedWordIds: ['ectropion', 'trichiasis', 'distichiasis', 'corneal_ulcer']
  },
  {
    id: 'enuresis',
    word: 'enuresis',
    phoneticTh: 'เอนยูรีซิส',
    meaning: 'อาการปัสสาวะรด / ปัสสาวะราดขณะนอนหลับ',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'โรคกระเพาะปัสสาวะและการควบคุม (Bladder Disorders)',
    tags: ['ปัสสาวะรด', 'ปัสสาวะราด'],
    connectedWordIds: ['incontinence', 'inappropriate_urination', 'nocturia', 'bladder_atony']
  },
  {
    id: 'epidermis',
    word: 'epidermis',
    phoneticTh: 'เอพิเดอร์มิส',
    meaning: 'ชั้นหนังกำพร้า (ชั้นนอกสุดของผิวหนัง)',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'โครงสร้างชั้นผิวหนัง (Skin Anatomy)',
    tags: ['หนังกำพร้า', 'กายวิภาค'],
    rootMeaning: 'epi- (บน/นอก) + derma (ผิวหนัง)',
    connectedWordIds: ['dermis', 'hyperkeratosis', 'keratosis', 'scale']
  },
  {
    id: 'epilepsy',
    word: 'epilepsy',
    phoneticTh: 'เอพิเลปซี',
    meaning: 'โรคลมชัก / โรคลมบ้าหมู',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ภาวะหมดสติและการชัก (Loss of Consciousness & Seizures)',
    tags: ['โรคลมชัก', 'ชัก'],
    connectedWordIds: ['convulsion', 'seizure', 'clonic_spasm', 'absence']
  }
];
