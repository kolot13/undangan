# Project Undangan Online Aqiqah - Vercel

Project ini adalah undangan online Aqiqah statis yang bisa langsung di-upload ke Vercel.

## Cara edit data acara

Buka file `script.js`, lalu ubah bagian:

```js
const invitation = {
  childName: 'Muhammad Al Fatih',
  fatherName: 'Ahmad',
  motherName: 'Aisyah',
  familyName: 'Keluarga Bapak Ahmad',
  defaultGuestName: 'Bapak/Ibu/Saudara/i',
  guestNameOverrides: {
    'bpk-haris-dan-keluarga': 'Bpk Haris & Keluarga'
  },
  eventDateISO: '2026-06-30T10:00:00+07:00',
  eventDateText: 'Minggu, 30 Juni 2026',
  eventTimeText: '10.00 WIB - Selesai',
  eventPlace: 'Rumah Keluarga Besar, Jl. Contoh Alamat No. 123, Jakarta',
  mapUrl: 'https://maps.google.com/?q=Jakarta',
  whatsappNumber: '6281234567890',
  whatsappMessage: 'Assalamu’alaikum, saya ingin konfirmasi kehadiran di acara Aqiqah Muhammad Al Fatih.'
};
```

## Cara tambah musik

Masukkan file musik dengan nama:

```txt
assets/music.mp3
```

Kalau tidak menambahkan musik, tombol musik tetap tampil tetapi tidak akan memutar lagu.

## Cara upload ke Vercel

1. Upload folder project ini ke GitHub.
2. Buka Vercel.
3. Klik `Add New Project`.
4. Pilih repository project ini.
5. Framework Preset pilih `Other` atau biarkan default.
6. Klik `Deploy`.

Karena project ini statis, tidak perlu install package atau build command.


## Cara membuat link undangan personal dengan nama tamu

Project ini sudah mendukung slug otomatis di Vercel.

Contoh link:

```txt
https://domainkamu.com/bpk-haris-dan-keluarga
```

Nanti di website akan tampil:

```txt
Kepada Yth.
Bpk Haris & Keluarga
```

Aturan otomatisnya:

```txt
bpk-haris-dan-keluarga  -> Bpk Haris & Keluarga
ibu-siti-dan-keluarga   -> Ibu Siti & Keluarga
pak-andi                -> Pak Andi
keluarga-besar-hasan    -> Keluarga Besar Hasan
```

Kalau ingin nama tertentu tampil custom, buka `script.js`, lalu edit bagian:

```js
guestNameOverrides: {
  'bpk-haris-dan-keluarga': 'Bpk Haris & Keluarga',
  'keluarga-haji-mansur': 'Keluarga H. Mansur'
}
```

Bagian kiri adalah slug URL, bagian kanan adalah nama yang akan tampil di website.

Agar link seperti `/bpk-haris-dan-keluarga` tidak error ketika dibuka langsung atau di-refresh, file `vercel.json` sudah diberi rewrite ke `index.html`.

## File utama

- `index.html` = struktur halaman undangan
- `style.css` = tampilan desain
- `script.js` = data undangan, countdown, tombol WhatsApp, tombol maps, dan musik
- `vercel.json` = konfigurasi sederhana Vercel


## Cara ganti 4 foto galeri

Masukkan foto anak ke folder `assets`, misalnya:

```txt
assets/foto-anak-1.jpg
assets/foto-anak-2.jpg
assets/foto-anak-3.jpg
assets/foto-anak-4.jpg
```

Lalu buka `script.js` dan ubah bagian `photos`:

```js
photos: [
  { src: 'assets/foto-anak-1.jpg', caption: 'Foto Pertama' },
  { src: 'assets/foto-anak-2.jpg', caption: 'Senyum Manis' },
  { src: 'assets/foto-anak-3.jpg', caption: 'Doa Keluarga' },
  { src: 'assets/foto-anak-4.jpg', caption: 'Hari Bahagia' }
]
```

Ukuran foto yang disarankan: potret atau kotak, minimal 900 px agar tetap tajam di HP.

## Animasi yang ditambahkan

- Ikon anak-anak melayang seperti botol susu, bintang, boneka, bulan, awan, dan domba.
- Sticker kecil di hero.
- Animasi masuk halus saat halaman discroll.
- Galeri foto memiliki gerakan lembut agar terlihat ramah anak.

Animasi tetap ringan dan aman untuk Vercel karena hanya memakai CSS dan JavaScript biasa.
