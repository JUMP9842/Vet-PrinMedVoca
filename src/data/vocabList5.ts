import { VocabItem } from '../types';

export const VOCAB_LIST_PART5: VocabItem[] = [
  // Page 7
  {
    id: 'neuritis',
    word: 'neuritis',
    phoneticTh: 'นิวไรติส',
    meaning: 'เส้นประสาทอักเสบ',
    category: 'ระบบประสาทส่วนปลาย',
    relatedGroup: 'การอักเสบของระบบประสาท (Neuroinflammation)',
    tags: ['ประสาทอักเสบ', 'ปวดเส้นประสาท'],
    rootMeaning: 'neur- (เส้นประสาท) + -itis (อักเสบ)',
    connectedWordIds: ['encephalitis', 'hyperesthesia', 'numbness', 'paralysis']
  },
  {
    id: 'nipple',
    word: 'nipple',
    phoneticTh: 'นิปเปิล',
    meaning: 'หัวนม',
    category: 'ระบบสืบพันธุ์และต่อมน้ำนม',
    relatedGroup: 'ความผิดปกติของเต้านม (Mammary Disorders)',
    tags: ['หัวนม', 'เต้านม'],
    connectedWordIds: ['thelitis', 'mamma', 'mastitis', 'breast']
  },
  {
    id: 'nociception',
    word: 'nociception',
    phoneticTh: 'โนซิเซปชัน',
    meaning: 'การรับรู้และส่งสัญญาณความรู้สึกเจ็บปวดทางระบบประสาท',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ความผิดปกติของความรู้สึก (Sensory Perception)',
    tags: ['ความรู้สึกเจ็บปวด', 'ประสาทรับความเจ็บ'],
    rootMeaning: 'nocere (อันตราย/เจ็บปวด) + cept (รับรู้)',
    connectedWordIds: ['hyperesthesia', 'numbness', 'reflex']
  },
  {
    id: 'nocturia',
    word: 'nocturia',
    phoneticTh: 'น็อคทูเรีย',
    meaning: 'อาการปัสสาวะบ่อยตอนกลางคืน',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'ปริมาณและการขับถ่ายปัสสาวะ (Urinary Output Abnormalities)',
    tags: ['ปัสสาวะกลางคืน', 'ตื่นมาฉี่'],
    rootMeaning: 'noct- (กลางคืน) + -uria (ปัสสาวะ)',
    connectedWordIds: ['pollakiuria', 'polyuria', 'enuresis', 'cystitis']
  },
  {
    id: 'nodules',
    word: 'nodules',
    phoneticTh: 'นอดดูลส์',
    meaning: 'ปุ่มเนื้อ / ตุ่มนูนแข็งใต้ผิวหนังขนาดใหญ่กว่า 1 ซม.',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'รอยโรคปฐมภูมิและทุติยภูมิ (Dermatological Lesions)',
    tags: ['ปุ่มเนื้อ', 'ตุ่มนูนแข็ง'],
    connectedWordIds: ['papules', 'tumors', 'cysts', 'plaques']
  },
  {
    id: 'nonunion',
    word: 'nonunion',
    phoneticTh: 'นอนยูเนียน',
    meaning: 'กระดูกเชื่อมต่อไม่ติด (ภาวะกระดูกไม่สมานตัวหลังหัก)',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกไม่ติด', 'ไม่สมาน'],
    rootMeaning: 'non- (ไม่) + union (การติดสมาน)',
    connectedWordIds: ['malunion', 'closed_fracture', 'callus']
  },
  {
    id: 'numbness',
    word: 'numbness',
    phoneticTh: 'นัมเนส',
    meaning: 'อาการชา หรือ ความรู้สึกสัมผัสลดลง',
    category: 'ระบบประสาทและความรู้สึก',
    relatedGroup: 'ความผิดปกติของความรู้สึก (Sensory Perception)',
    tags: ['อาการชา', 'ไม่รู้สึกตัว'],
    connectedWordIds: ['hyperesthesia', 'nociception', 'paresis', 'paralysis']
  },
  {
    id: 'nystagmus',
    word: 'nystagmus',
    phoneticTh: 'นิสแทกมัส',
    meaning: 'อาการตากระตุก / ลูกตาสั่นกระตุกเป็นจังหวะต่อเนื่อง',
    category: 'ระบบตาและระบบประสาททรงตัว',
    relatedGroup: 'ตาเหล่และความผิดปกติของกล้ามเนื้อตา (Strabismus & Eye Alignment)',
    tags: ['ตากระตุก', 'ลูกตาสั่น', 'ระบบทรงตัว'],
    connectedWordIds: ['head_tilt', 'ataxia', 'blepharospasm', 'otitis_interna']
  },
  {
    id: 'obese',
    word: 'obese',
    phoneticTh: 'โอปีส',
    meaning: 'ภาวะอ้วน / ไขมันสะสมในร่างกายเกินมาตรฐาน',
    category: 'อาการทั่วไปและโภชนาการ',
    relatedGroup: 'ภาวะโภชนาการและน้ำหนักตัว (Body Weight & Nutrition)',
    tags: ['อ้วน', 'น้ำหนักเกิน'],
    connectedWordIds: ['cachectic', 'emaciated', 'weight_loss', 'polyphagia']
  },
  {
    id: 'oblique_fracture',
    word: 'oblique fracture',
    phoneticTh: 'ออบลิค แฟรคเจอร์',
    meaning: 'กระดูกหักเฉียง (แนวรอยหักทำมุมเฉียงกับแนวกระดูก)',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกหักเฉียง', 'กระดูกหัก'],
    connectedWordIds: ['transverse_fracture', 'spiral_fracture', 'comminuted_fracture', 'closed_fracture']
  },
  {
    id: 'obstipation',
    word: 'obstipation',
    phoneticTh: 'ออบสติเพชัน',
    meaning: 'อาการท้องผูกขั้นรุนแรงดื้อด้าน (อุจจาระแห้งแข็งอุดกั้นสิ้นเชิง)',
    category: 'ระบบทางเดินอาหารและขับถ่าย',
    relatedGroup: 'ความผิดปกติของการขับถ่ายอุจจาระ (Bowel Movement Disorders)',
    tags: ['ท้องผูกรุนแรง', 'ถ่ายไม่ออกสิ้นเชิง'],
    connectedWordIds: ['constipation', 'megacolon', 'dyschezia', 'tenesmus']
  },
  {
    id: 'odontoseisis',
    word: 'odontoseisis',
    phoneticTh: 'โอโดนโทซีซิส',
    meaning: 'ฟันโยกคลอน',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'กายวิภาคและโรคฟัน (Dental Anatomy & Disorders)',
    tags: ['ฟันโยก', 'ฟันคลอน'],
    rootMeaning: 'odonto- (ฟัน) + seisis (การสั่นสะเทือน/โยก)',
    connectedWordIds: ['dental_caries', 'gingivitis', 'impacted_tooth']
  },
  {
    id: 'odynophagia',
    word: 'odynophagia',
    phoneticTh: 'โอดิโนเฟเจีย',
    meaning: 'อาการเจ็บปวดขณะกลืนอาหาร',
    category: 'ระบบทางเดินอาหาร',
    relatedGroup: 'ความผิดปกติของทางเดินอาหารส่วนต้น (Upper GI)',
    tags: ['กลืนเจ็บ', 'เจ็บคอตอนกลืน'],
    rootMeaning: 'odyno- (ความเจ็บ) + phagia (การกลืน)',
    connectedWordIds: ['dysphagia', 'pharyngitis', 'stomatitis']
  },
  {
    id: 'oligohydruria',
    word: 'oligohydruria',
    phoneticTh: 'โอลิโกไฮดรูเรีย',
    meaning: 'ภาวะปัสสาวะเข้มข้นจัด (สารน้ำในปัสสาวะน้อยมาก)',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'ปริมาณและการขับถ่ายปัสสาวะ (Urinary Output Abnormalities)',
    tags: ['ปัสสาวะข้น', 'ขาดน้ำ'],
    rootMeaning: 'oligo- (น้อย) + hydr- (น้ำ) + -uria (ปัสสาวะ)',
    connectedWordIds: ['oliguria', 'dehydration', 'anuria']
  },
  {
    id: 'oligonea',
    word: 'oligonea',
    phoneticTh: 'โอลิกอฟเนีย',
    meaning: 'ภาวะระบายลมหายใจพร่อง หรือ การหายใจน้อยช้า (Oligopnea)',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['หายใจน้อย', 'หายใจแผ่วช้า'],
    rootMeaning: 'oligo- (น้อย) + -pnea (การหายใจ)',
    connectedWordIds: ['hypopnea', 'hypoventilation', 'hyperpnea']
  },
  {
    id: 'oliguria',
    word: 'oliguria',
    phoneticTh: 'โอลิกูเรีย',
    meaning: 'ภาวะปัสสาวะออกน้อยกว่าปกติ',
    category: 'ระบบทางเดินปัสสาวะ',
    relatedGroup: 'ปริมาณและการขับถ่ายปัสสาวะ (Urinary Output Abnormalities)',
    tags: ['ปัสสาวะน้อย', 'ฉี่น้อย'],
    rootMeaning: 'oligo- (น้อย) + -uria (ปัสสาวะ)',
    connectedWordIds: ['anuria', 'polyuria', 'dysuria', 'dehydration']
  },
  {
    id: 'open_fracture',
    word: 'open fracture',
    phoneticTh: 'โอเพน แฟรคเจอร์',
    meaning: 'กระดูกหักแบบเปิด (หัวกระดูกแทงทะลุผิวหนังออกมา)',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'ประเภทของกระดูกหัก (Types of Fractures)',
    tags: ['กระดูกหักเปิด', 'กระดูกทิ่มทะลุ'],
    connectedWordIds: ['closed_fracture', 'perforating_fracture', 'comminuted_fracture', 'osteomyelitis']
  },
  {
    id: 'oral_cavity',
    word: 'oral cavity',
    phoneticTh: 'ออรัล แควิตี',
    meaning: 'ช่องปาก',
    category: 'ระบบช่องปากและฟัน',
    relatedGroup: 'การอักเสบในช่องปาก (Oral Cavity Inflammations)',
    tags: ['ช่องปาก', 'ปาก'],
    connectedWordIds: ['stomatitis', 'gingival', 'lips', 'cleft_palate']
  },
  {
    id: 'orchitis',
    word: 'orchitis',
    phoneticTh: 'ออร์ไคติส',
    meaning: 'อัณฑะอักเสบ',
    category: 'ระบบสืบพันธุ์เพศผู้',
    relatedGroup: 'โรคระบบสืบพันธุ์เพศผู้ (Male Reproductive Disorders)',
    tags: ['อัณฑะอักเสบ', 'บวมอัณฑะ'],
    rootMeaning: 'orchi- (อัณฑะ) + -itis (อักเสบ)',
    connectedWordIds: ['cryptorchidism', 'penitis', 'prostatomegaly']
  },
  {
    id: 'orthopnea',
    word: 'orthopnea',
    phoneticTh: 'ออร์ธ็อพเนีย',
    meaning: 'อาการหอบเหนื่อยที่ต้องนั่งหรือยืนตัวตรงถึงจะหายใจได้',
    category: 'ระบบทางเดินหายใจและหัวใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['หอบต้องนั่ง', 'นอนราบไม่ได้', 'หัวใจวาย'],
    rootMeaning: 'ortho- (ตรง/ตั้ง) + -pnea (การหายใจ)',
    connectedWordIds: ['dyspnea', 'air_hunger', 'pleural_effusion', 'cardiomegaly']
  },
  {
    id: 'osteectopia',
    word: 'osteectopia',
    phoneticTh: 'ออสทีเอ็กโทเปีย',
    meaning: 'กระดูกเคลื่อนหลุดออกจากตำแหน่งปกติ',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['กระดูกเคลื่อน', 'กระดูกหลุด'],
    rootMeaning: 'osteo- (กระดูก) + ectopia (ผิดตำแหน่ง)',
    connectedWordIds: ['displaced_fracture', 'ankylosis', 'lameness']
  },
  {
    id: 'osteoma',
    word: 'osteoma',
    phoneticTh: 'ออสทีโอมา',
    meaning: 'เนื้องอกกระดูก (ชนิดไม่ร้ายแรง)',
    category: 'ระบบกระดูกและเนื้องอก',
    relatedGroup: 'ก้อนเนื้อและถุงน้ำ (Cysts & Tumors)',
    tags: ['เนื้องอกกระดูก', 'ก้อนกระดูก'],
    rootMeaning: 'osteo- (กระดูก) + -oma (เนื้องอก)',
    connectedWordIds: ['osteosarcoma', 'exostosis', 'tumors']
  },
  {
    id: 'osteomyelitis',
    word: 'osteomyelitis',
    phoneticTh: 'ออสทีโอไมอีไลติส',
    meaning: 'กระดูกและไขกระดูกอักเสบติดเชื้อเป็นหนอง',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['กระดูกอักเสบเป็นหนอง', 'ติดเชื้อในกระดูก'],
    rootMeaning: 'osteo- (กระดูก) + myel- (ไขกระดูก) + -itis (อักเสบ)',
    connectedWordIds: ['osteitis', 'open_fracture', 'pus']
  },
  {
    id: 'osteoporosis',
    word: 'osteoporosis',
    phoneticTh: 'ออสทีโอโพโรซิส',
    meaning: 'ภาวะกระดูกพรุน / มวลกระดูกบางเปราะหักง่าย',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['กระดูกพรุน', 'กระดูกเปราะ'],
    rootMeaning: 'osteo- (กระดูก) + poros (รูพรุน) + -osis (ภาวะ)',
    connectedWordIds: ['closed_fracture', 'callus', 'osteosarcoma']
  },
  {
    id: 'osteosarcoma',
    word: 'osteosarcoma',
    phoneticTh: 'ออสทีโอซาร์โคมา',
    meaning: 'มะเร็งกระดูกชนิดร้ายแรง (พบได้บ่อยในสุนัขพันธุ์ใหญ่)',
    category: 'ระบบกระดูกและเนื้องอก',
    relatedGroup: 'ก้อนเนื้อและถุงน้ำ (Cysts & Tumors)',
    tags: ['มะเร็งกระดูก', 'เนื้อร้ายกระดูก'],
    rootMeaning: 'osteo- (กระดูก) + sarkoma (มะเร็งเนื้อเยื่อเกี่ยวพัน)',
    connectedWordIds: ['osteoma', 'tumors', 'lameness', 'amputation']
  },
  {
    id: 'osteitis',
    word: 'ostitis',
    phoneticTh: 'ออสทีไอติส',
    meaning: 'กระดูกอักเสบ',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['กระดูกอักเสบ', 'เจ็บกระดูก'],
    rootMeaning: 'oste- (กระดูก) + -itis (อักเสบ)',
    connectedWordIds: ['osteomyelitis', 'arthritis', 'panarthritis']
  },
  {
    id: 'otalgia',
    word: 'otalgia',
    phoneticTh: 'โอทาลเจีย',
    meaning: 'อาการปวดหู / เจ็บในช่องหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['ปวดหู', 'เจ็บหู'],
    rootMeaning: 'ot- (หู) + -algia (อาการปวด)',
    connectedWordIds: ['otitis', 'otitis_externa', 'myringitis']
  },
  {
    id: 'otitis',
    word: 'otitis',
    phoneticTh: 'โอไทติส',
    meaning: 'หูอักเสบ',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูอักเสบ', 'ช่องหูอักเสบ'],
    rootMeaning: 'ot- (หู) + -itis (อักเสบ)',
    connectedWordIds: ['otitis_externa', 'otitis_media', 'otitis_interna', 'panotitis']
  },
  {
    id: 'otitis_externa',
    word: 'otitis externa',
    phoneticTh: 'โอไทติส เอ็กซ์เทอร์นา',
    meaning: 'หูชั้นนอกอักเสบ / ช่องหูส่วนนอกอักเสบ',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูชั้นนอกอักเสบ', 'คันหู', 'ขี้หูเหม็น'],
    connectedWordIds: ['otitis', 'otitis_media', 'cerumen', 'otorrhea']
  },
  {
    id: 'otitis_interna',
    word: 'otitis interna',
    phoneticTh: 'โอไทติส อินเทอร์นา',
    meaning: 'หูชั้นในอักเสบ (ส่งผลต่อการได้ยินและการทรงตัว)',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูชั้นในอักเสบ', 'หัวเอียง', 'บ้านหมุน'],
    connectedWordIds: ['head_tilt', 'nystagmus', 'ataxia', 'deafness']
  },
  {
    id: 'otitis_media',
    word: 'otitis media',
    phoneticTh: 'โอไทติส มีเดีย',
    meaning: 'หูชั้นกลางอักเสบ',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูชั้นกลางอักเสบ', 'แก้วหูทะลุ'],
    connectedWordIds: ['tympanic_membrane', 'myringitis', 'otitis_externa', 'otitis_interna']
  },
  {
    id: 'otopathy',
    word: 'otopathy',
    phoneticTh: 'โอโทพาธี',
    meaning: 'โรคหรือพยาธิสภาพใดๆ ของหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['โรคของหู', 'หู'],
    rootMeaning: 'oto- (หู) + -pathy (โรค)',
    connectedWordIds: ['otitis', 'otopyosis', 'otalgia']
  },
  {
    id: 'otopyosis',
    word: 'otopyosis',
    phoneticTh: 'โอโทไพโอซิส',
    meaning: 'โรคหูน้ำหนวก / มีหนองไหลออกจากหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูน้ำหนวก', 'หนองไหลจากหู'],
    rootMeaning: 'oto- (หู) + pyon (หนอง) + -osis (ภาวะ)',
    connectedWordIds: ['otorrhea', 'otitis_media', 'pus']
  },
  {
    id: 'otorrhagia',
    word: 'otorrhagia',
    phoneticTh: 'โอทอร์เรเจีย',
    meaning: 'การตกเลือดออกจากช่องหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'เลือดออกและจุดจ้ำเลือด (Hemorrhage & Bleeding)',
    tags: ['เลือดออกจากหู', 'เลือดออกหู'],
    rootMeaning: 'oto- (หู) + -rrhagia (เลือดออกมาก)',
    connectedWordIds: ['otorrhea', 'aural_hematoma', 'tympanic_membrane']
  },
  {
    id: 'otorrhea',
    word: 'otorrhea',
    phoneticTh: 'โอทอร์เรีย',
    meaning: 'ของเหลวหรือหนองไหลออกจากช่องหู',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หนองไหลจากหู', 'น้ำออกจากหู'],
    rootMeaning: 'oto- (หู) + -rrhea (การไหล)',
    connectedWordIds: ['otopyosis', 'otorrhagia', 'otitis_externa']
  },
  {
    id: 'otoscope',
    word: 'otoscope',
    phoneticTh: 'โอโทสโคป',
    meaning: 'กล้องส่องตรวจช่องหู',
    category: 'การตรวจร่างกายและวินิจฉัย',
    relatedGroup: 'การตรวจพิเศษและวินิจฉัย (Diagnostic Procedures)',
    tags: ['กล้องตรวจหู', 'ส่องหู'],
    rootMeaning: 'oto- (หู) + skopein (การตรวจดู)',
    connectedWordIds: ['tympanic_membrane', 'otitis_externa', 'cerumen']
  },
  {
    id: 'pachyvaginitis',
    word: 'pachyvaginitis',
    phoneticTh: 'แพคคีแวจิไนติส',
    meaning: 'ช่องคลอดหนาตัวผิดปกติจากการอักเสบเรื้อรัง',
    category: 'ระบบสืบพันธุ์เพศเมีย',
    relatedGroup: 'โรคระบบสืบพันธุ์เพศเมีย (Female Reproductive Disorders)',
    tags: ['ช่องคลอดหนาอักเสบ', 'ช่องคลอด'],
    rootMeaning: 'pachy- (หนา) + vagina (ช่องคลอด) + -itis (อักเสบ)',
    connectedWordIds: ['vaginitis', 'vaginal_hyperplasia', 'vaginocele']
  },
  {
    id: 'panarthritis',
    word: 'panarthritis',
    phoneticTh: 'แพนอาร์ไทรติส',
    meaning: 'การอักเสบของข้อต่อทั่วร่างกายทุกข้อ',
    category: 'ระบบกระดูกและข้อ',
    relatedGroup: 'โรคข้อและกระดูก (Joint & Bone Disorders)',
    tags: ['ข้ออักเสบทุกข้อ', 'ปวดข้อทั่วตัว'],
    rootMeaning: 'pan- (ทั้งหมด/ทั่ว) + arthr- (ข้อ) + -itis (อักเสบ)',
    connectedWordIds: ['arthritis', 'arthrocele', 'ankylosis', 'lameness']
  },
  {
    id: 'panophthalmitis',
    word: 'panophthalmitis',
    phoneticTh: 'แพนอฟทัลไมติส',
    meaning: 'การอักเสบติดเชื้อลุกลามทั่วทั้งโครงสร้างของลูกตา',
    category: 'ระบบตาและการมองเห็น',
    relatedGroup: 'การอักเสบในลูกตา (Intraocular Inflammation)',
    tags: ['ตาอักเสบทั้งลูกตา', 'ติดเชื้อในตา'],
    rootMeaning: 'pan- (ทั้งหมด) + ophthalmos (ตา) + -itis (อักเสบ)',
    connectedWordIds: ['uveitis', 'endophthalmitis', 'blindness', 'hypopyon']
  },
  {
    id: 'panotitis',
    word: 'panotitis',
    phoneticTh: 'แพนโอไทติส',
    meaning: 'หูอักเสบครอบคลุมทุกส่วน (ชั้นนอก ชั้นกลาง และชั้นใน)',
    category: 'ระบบหูและช่องหู',
    relatedGroup: 'โรคและความผิดปกติของหู (Ear Disorders)',
    tags: ['หูอักเสบทุกส่วน', 'หูอักเสบรุนแรง'],
    rootMeaning: 'pan- (ทั้งหมด) + ot- (หู) + -itis (อักเสบ)',
    connectedWordIds: ['otitis', 'otitis_externa', 'otitis_media', 'otitis_interna']
  },
  {
    id: 'panting',
    word: 'panting',
    phoneticTh: 'แพนติ้ง',
    meaning: 'อาการหอบ / หายใจหอบแลบลิ้นระบายความร้อน',
    category: 'ระบบทางเดินหายใจ',
    relatedGroup: 'ภาวะหายใจลำบากและฉุกเฉิน (Dyspnea & Respiratory Distress)',
    tags: ['หายใจหอบ', 'แลบลิ้นหอบ', 'ระบายความร้อน'],
    connectedWordIds: ['hyperthermia', 'dyspnea', 'hyperpnea', 'air_hunger']
  },
  {
    id: 'papules',
    word: 'papules',
    phoneticTh: 'แพพพูลส์',
    meaning: 'ผื่นนูนแดงขนาดเล็ก (เส้นผ่านศูนย์กลาง < 1 ซม.)',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'รอยโรคปฐมภูมิและทุติยภูมิ (Dermatological Lesions)',
    tags: ['ตุ่มนูนแดง', 'ผื่นนูน'],
    connectedWordIds: ['pustules', 'macules', 'nodules', 'wheals', 'rash']
  },
  {
    id: 'paralysis',
    word: 'paralysis',
    phoneticTh: 'พะราลิซิส',
    meaning: 'อัมพาต / ภาวะสูญเสียการเคลื่อนไหวของกล้ามเนื้ออย่างสิ้นเชิง',
    category: 'ระบบประสาทและกล้ามเนื้อ',
    relatedGroup: 'อัมพาตและกล้ามเนื้ออ่อนแรง (Paralysis & Paresis)',
    tags: ['อัมพาต', 'ขยับไม่ได้'],
    connectedWordIds: ['paresis', 'hemiplegia', 'monoplegia', 'flaccid']
  },
  {
    id: 'paraphimosis',
    word: 'paraphimosis',
    phoneticTh: 'พาราไฟโมซิส',
    meaning: 'หนังหุ้มปลายองคชาตร่นรัด (องคชาตยื่นโผล่แล้วรูดกลับไม่ได้)',
    category: 'ระบบสืบพันธุ์เพศผู้',
    relatedGroup: 'โรคระบบสืบพันธุ์เพศผู้ (Male Reproductive Disorders)',
    tags: ['องคชาตติดคา', 'หนังหุ้มร่นรัด', 'ฉุกเฉิน'],
    connectedWordIds: ['phimosis', 'penitis', 'priapism']
  },
  {
    id: 'paresis',
    word: 'paresis',
    phoneticTh: 'พาเรซิส',
    meaning: 'อัมพฤกษ์ / ภาวะกล้ามเนื้ออ่อนแรงแต่ยังเคลื่อนไหวได้บางส่วน',
    category: 'ระบบประสาทและกล้ามเนื้อ',
    relatedGroup: 'อัมพาตและกล้ามเนื้ออ่อนแรง (Paralysis & Paresis)',
    tags: ['อัมพฤกษ์', 'อ่อนแรง'],
    connectedWordIds: ['paralysis', 'hemiparesis', 'myasthenia', 'monoplegia']
  },
  {
    id: 'patches',
    word: 'patches',
    phoneticTh: 'แพทเชส',
    meaning: 'ปื้น / รอยด่างราบเรียบบนผิวหนังขนาดใหญ่กว่า 1 ซม.',
    category: 'ระบบผิวหนังและขน',
    relatedGroup: 'รอยโรคปฐมภูมิและทุติยภูมิ (Dermatological Lesions)',
    tags: ['ปื้นผิวหนัง', 'รอยด่างใหญ่'],
    connectedWordIds: ['macules', 'plaques', 'erythema']
  },
  {
    id: 'pendulous_abdomen',
    word: 'pendulous abdomen',
    phoneticTh: 'เพนดูลัส แอบโดเมน',
    meaning: 'ท้องยาน / ท้องห้อยย้อยลงล่าง (เช่น โรคคุชชิ่ง Cushing)',
    category: 'ระบบทางเดินอาหารและต่อมไร้ท่อ',
    relatedGroup: 'ตำแหน่งทางกายวิภาคช่องท้อง (Abdominal Regions)',
    tags: ['ท้องยาน', 'ท้องห้อย', 'คุชชิ่ง'],
    connectedWordIds: ['ascites', 'distended_stomach', 'cranial_abdomen']
  },
  {
    id: 'penitis',
    word: 'penitis',
    phoneticTh: 'เพไนทิส',
    meaning: 'องคชาตอักเสบ',
    category: 'ระบบสืบพันธุ์เพศผู้',
    relatedGroup: 'โรคระบบสืบพันธุ์เพศผู้ (Male Reproductive Disorders)',
    tags: ['องคชาตอักเสบ', 'อักเสบ'],
    rootMeaning: 'penis + -itis (อักเสบ)',
    connectedWordIds: ['posthitis', 'paraphimosis', 'phimosis', 'orchitis']
  }
];
