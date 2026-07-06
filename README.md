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

- [ ] ชื่อ + วันที่ ในหน้าเปิดการ์ด (ซองจดหมาย) — `.intro-names`, `.intro-date`
- [ ] อักษรย่อบนตราผนึกขี้ผึ้ง — `.seal-initials`
- [ ] เวลา/ระยะเวลาแต่ละพิธีใน `data-time` / `data-dur` (นาที) ของ `.schedule-item` — ใช้ไฮไลต์ "ตอนนี้" อัตโนมัติในวันงาน (ต้องใส่ `data-date` ของ countdown ด้วย)
- [ ] ชื่อฝ่ายหญิง (อังกฤษ) — `.bride-name`
- [ ] ชื่อฝ่ายชาย (อังกฤษ) — `.groom-name`
- [ ] วันที่งาน (อังกฤษ) — `.wedding-date`
- [ ] วันเวลาจริงใน countdown — `#countdown` ใส่ `data-date="2026-XX-XXT09:00:00+07:00"` (ปล่อยว่าง = ซ่อน countdown)
- [ ] ชื่อย่อคู่บ่าวสาวใน footer — `.footer-monogram`
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

## ตั้งค่า Countdown และกำหนดการ (ไฮไลต์ "ตอนนี้" อัตโนมัติ)

มี 2 ส่วนที่ผูกกับวันเวลาจริงของงาน และใช้ "วันที่" เดียวกันอ้างอิงร่วมกัน:

1. **Countdown** (`#countdown`) — นับถอยหลังไปยังงาน
2. **กำหนดการ** (`.schedule-item` ใต้ `#scheduleTimeline`) — ไฮไลต์พิธีที่กำลังดำเนินอยู่ด้วยป้าย
   "ตอนนี้" และขีด/ติ๊กถูกพิธีที่จบไปแล้ว **โดยอัตโนมัติในวันงานจริง**

### 1) Countdown — `#countdown`

```html
<div class="countdown reveal" id="countdown" data-date="2026-11-21T07:00:00+07:00" hidden>
```

- แก้ `data-date` เป็นวันที่ + เวลาเริ่มงานจริง รูปแบบ `YYYY-MM-DDTHH:MM:SS+07:00` (เวลาไทย)
- ปล่อยว่าง หรือใส่ค่าที่ parse ไม่ได้ → countdown จะไม่แสดง (ยังคง `hidden`)
- **ส่วนวันที่ (10 ตัวอักษรแรก `YYYY-MM-DD`)** ของค่านี้ จะถูกใช้ซ้ำเป็น "วันงาน" สำหรับคำนวณกำหนดการในข้อ 2 ด้วย — ไม่ต้องตั้งวันที่ซ้ำที่อื่น

### 2) กำหนดการ — แต่ละ `.schedule-item`

```html
<div class="schedule-item" data-time="07:19" data-dur="120">
  <span class="schedule-icon"><img src="images/program/buhda.svg" alt=""></span>
  <p class="schedule-time">07:19</p>
  <p class="schedule-label">พิธีสงฆ์</p>
</div>
```

- `data-time` = เวลาเริ่มพิธีนั้น (`HH:MM` แบบ 24 ชม.)
- `data-dur` = ระยะเวลาของพิธี **(หน่วยเป็นนาที)** — ใช้คำนวณเวลาจบ = `data-time + data-dur`
- `<p class="schedule-time">` = ข้อความเวลาที่แสดงบนหน้าเว็บ **ต้องแก้ให้ตรงกับ `data-time` เอง** (คนละส่วนกัน ไม่ sync อัตโนมัติ)

ระบบจะเทียบเวลาปัจจุบันกับช่วง `[data-time, data-time + data-dur)` ของแต่ละพิธีทุก 1 นาที
(เทียบเฉพาะวันที่ตรงกับ `data-date` ของ countdown เท่านั้น):

| สถานะ | เงื่อนไข | แสดงผล |
|---|---|---|
| ยังไม่ถึง | now < เวลาเริ่ม | ไอคอนปกติ |
| **กำลังดำเนินอยู่** | เวลาเริ่ม ≤ now < เวลาจบ | ไฮไลต์ + ป้าย **"ตอนนี้"** (เต้นๆ) |
| จบแล้ว | now ≥ เวลาจบ | จาง + ติ๊กถูก |

### ตัวอย่าง: งานวันที่ 21/11/2026 พิธีแรกเริ่ม 7:19 น.

```html
<!-- Countdown: วันงาน 21 พ.ย. 2569 เริ่ม 07:19 -->
<div class="countdown reveal" id="countdown" data-date="2026-11-21T07:19:00+07:00" hidden>
```

```html
<div class="schedule-timeline reveal" id="scheduleTimeline">
  <div class="schedule-item" data-time="07:19" data-dur="120"> <!-- 07:19–09:19 -->
    <p class="schedule-time">07:19</p>
    <p class="schedule-label">พิธีสงฆ์</p>
  </div>
  <div class="schedule-item" data-time="09:19" data-dur="60"> <!-- 09:19–10:19 -->
    <p class="schedule-time">09:19</p>
    <p class="schedule-label">ขันหมาก</p>
  </div>
  <div class="schedule-item" data-time="10:19" data-dur="60"> <!-- 10:19–11:19 -->
    <p class="schedule-time">10:19</p>
    <p class="schedule-label">รดน้ำสังข์</p>
  </div>
  <div class="schedule-item" data-time="11:19" data-dur="120"> <!-- 11:19–13:19 -->
    <p class="schedule-time">11:19</p>
    <p class="schedule-label">ร่วมรับประทานอาหาร (โต๊ะจีน)</p>
  </div>
</div>
```

ผลลัพธ์ในวันงานจริง (21/11/2026):

- ก่อน 07:19 → ทุกพิธียังไม่ไฮไลต์
- 07:19–09:19 → **พิธีสงฆ์** ไฮไลต์ป้าย "ตอนนี้"
- 09:19–10:19 → พิธีสงฆ์จบ (ติ๊กถูก), **ขันหมาก** ไฮไลต์ป้าย "ตอนนี้"
- 10:19–11:19 → ขันหมากจบ, **รดน้ำสังข์** ไฮไลต์
- 11:19–13:19 → รดน้ำสังข์จบ, **ร่วมรับประทานอาหาร** ไฮไลต์
- หลัง 13:19 → ทุกพิธีจบหมด (ติ๊กถูกทั้งหมด)

### ทดสอบก่อนถึงวันงานจริง (ใส่ mock data ชั่วคราว)

ไฮไลต์ "ตอนนี้" จะทำงานเฉพาะวันที่ตรงกับ `data-date` เท่านั้น ถ้าอยากเห็นผลลัพธ์ทันทีโดยไม่ต้องรอถึงวันงาน
ให้แก้ค่าใน `index.html` ชั่วคราวตามนี้ **แล้วอย่าลืมเปลี่ยนกลับเป็นค่าจริงก่อน commit/deploy**:

1. เปลี่ยน `data-date` ของ `#countdown` ให้เป็น **วันนี้** (ตั้งเวลาให้ยังไม่ถึง เพื่อไม่ให้ countdown ขึ้นเลข 0)
2. เปลี่ยน `data-time` ของ `.schedule-item` อย่างน้อย 1 รายการให้คร่อมเวลาปัจจุบัน
   เช่น ถ้าตอนนี้เวลา 19:52 น. ให้ตั้ง `data-time="19:30" data-dur="60"` (ช่วง 19:30–20:30) จะเห็นป้าย
   "ตอนนี้" ทันที — ตั้งอีกรายการเป็นเวลาที่ผ่านไปแล้วเพื่อดูสถานะ "จบแล้ว" และอีกรายการเป็นเวลาที่ยังไม่ถึง
   เพื่อดูสถานะปกติ
3. รีโหลดหน้าเว็บ (ไม่ต้องเพิ่มเลข `?v=` เพราะเป็นแค่ attribute ใน HTML ไม่ใช่ไฟล์ CSS/JS)
4. **เปลี่ยนค่ากลับเป็นวันเวลาจริงของงานทุกครั้งก่อน commit/deploy**

---

## Tech Stack
- HTML / CSS / JavaScript (ไม่มี framework)
- ฟอนต์ไทยหลัก: **FC Ekaluck** (self-hosted, ไฟล์อยู่ที่ `fonts/`, ประกาศ `@font-face` ใน `css/style.css`) · fallback: Sarabun (Google Fonts)
- Google Fonts: Sarabun (fallback) · Great Vibes · Cormorant Garamond
- Form: Tally.so embed
- Host: GitHub Pages (free)
