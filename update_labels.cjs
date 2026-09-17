const fs = require('fs');
let content = fs.readFileSync('src/components/RelatedGroupsView.tsx', 'utf8');

content = content.replace('เรียนรู้คำศัพท์แยกตามระบบอวัยวะทั้ง 11 ระบบ กลุ่มรอยโรค อาการตรงข้าม และรากศัพท์การแพทย์ ช่วยให้จำแม่นยำและเชื่อมโยงได้รวดเร็ว', 'เรียนรู้คำศัพท์แยกตามระบบอวัยวะ หมวดหมู่ทั่วไป กลุ่มรอยโรค อาการตรงข้าม และรากศัพท์การแพทย์ ช่วยให้จำแม่นยำและเชื่อมโยงได้รวดเร็ว');
content = content.replace('<span>ระบบอวัยวะ ({groupCategories.length})</span>', '<span>หมวดหมู่ระบบ ({groupCategories.length})</span>');
content = content.replace('<span className="text-[#627D98] font-normal text-xs">ระบบอวัยวะ:</span>', '<span className="text-[#627D98] font-normal text-xs">หมวดหมู่:</span>');
content = content.replace('<span>เลือกระบบอวัยวะ (11 ระบบ)</span>', '<span>เลือกหมวดหมู่ระบบ ({groupCategories.length} หมวด)</span>');

fs.writeFileSync('src/components/RelatedGroupsView.tsx', content, 'utf8');
