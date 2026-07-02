# NP Wedding Day — Online Invitation Card

เว็บการ์ดงานแต่งออนไลน์ · Pure HTML/CSS/JS · GitHub Pages

**URL:** https://np-wedding-day.github.io/

---

## โครงสร้างไฟล์

```
online-card/
├── index.html              # หน้าหลัก (single-page, 4 sections)
├── css/style.css           # ทุก style
├── js/main.js              # navigation + gallery slideshow
└── images/
    ├── flowers/
    │   ├── flower-top.png      # ดอกไม้ watercolor ด้านบน Hero
    │   ├── flower-mid.png      # ดอกไม้ watercolor กลาง
    │   └── flower-bottom.png   # ดอกไม้ watercolor ด้านล่าง
    ├── gallery/
    │   ├── G1.jpg … G6.jpg     # รูป pre-wedding (เพิ่ม/ลดได้)
    └── qr.png                  # QR Code สำหรับ RSVP
```

---

## งานที่ต้องทำต่อ

### 1. เติมข้อมูลจริงใน `index.html`
ค้นหา `XXXX` เพื่อหาทุกจุดที่ต้องแก้:

- [ ] ชื่อฝ่ายหญิง (อังกฤษ) — `.bride-name`
- [ ] ชื่อฝ่ายชาย (อังกฤษ) — `.groom-name`
- [ ] วันที่งาน (อังกฤษ) — `.wedding-date`
- [ ] ชื่อสถานที่ + เมือง — `.venue-name`, `.venue-city`
- [ ] ชื่อผู้ปกครองฝ่ายหญิง (2 คน)
- [ ] ชื่อผู้ปกครองฝ่ายชาย (2 คน)
- [ ] ชื่อเต็ม (ไทย) ฝ่ายหญิง + ชื่อเล่น
- [ ] ชื่อเต็ม (ไทย) ฝ่ายชาย + ชื่อเล่น
- [ ] ห้อง ชั้น สถานที่ ที่อยู่ วันที่ (ไทย)
- [ ] เดือน + ปีกำหนดตอบรับ RSVP
- [ ] ชื่อสถานที่ + ที่อยู่ + เบอร์โทร (section แผนที่)
- [ ] `href="tel:..."` ในปุ่มโทรศัพท์

### 2. เพิ่มรูปภาพ
- [ ] รูปดอกไม้ watercolor PNG (พื้นหลังใส) → `images/flowers/`
  - แนะนำ: [freepik.com](https://freepik.com) ค้นหา "watercolor flowers PNG transparent"
- [ ] รูป pre-wedding → `images/gallery/G1.jpg` … `G6.jpg`
  - เพิ่มหรือลด `<div class="gallery-slide">` ใน index.html ตามจำนวนรูป
- [ ] รูป QR Code → `images/qr.png`

### 3. ฟอร์ม RSVP (Tally.so)
- [ ] สร้างฟอร์มบน [tally.so](https://tally.so) (ฟรี)
  - Fields: ชื่อ / กลุ่ม / จำนวนผู้ติดตาม
- [ ] Share → Embed → Copy code
- [ ] ใน `index.html` แทน `<div class="tally-placeholder">...</div>` ด้วย embed code

### 4. Google Maps
- [ ] เปิด [maps.google.com](https://maps.google.com) → ค้นหาสถานที่
- [ ] กด Share → Embed a map → Copy HTML
- [ ] ใน `index.html` วาง URL ใส่ `src="..."` ของ `<iframe>` ใน section แผนที่

### 5. Deploy บน GitHub Pages
- [ ] Login GitHub account `np-wedding-day`
- [ ] สร้าง Personal Access Token (Settings → Developer settings → PAT → Classic → scope: `repo`)
- [ ] รันคำสั่ง:
  ```bash
  git remote set-url origin https://TOKEN@github.com/np-wedding-day/np-wedding-day.github.io.git
  git push -u origin main
  ```
- [ ] ไป repo Settings → Pages → Branch: `main` → Save
- [ ] รอ ~2 นาที → เปิด https://np-wedding-day.github.io/

### 6. หลัง deploy — ทดสอบบนมือถือ
- [ ] เปิดบนมือถือจริง ทดสอบ bottom nav ทั้ง 4 tabs
- [ ] ทดสอบ swipe gallery
- [ ] ทดสอบกรอกฟอร์ม RSVP

---

## Tech Stack
- HTML / CSS / JavaScript (ไม่มี framework)
- Google Fonts: Sarabun · Dancing Script · Cormorant Garamond
- Form: Tally.so embed
- Host: GitHub Pages (free)
