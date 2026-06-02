// ================================
// EDIT DATA UNDANGAN DI SINI
// ================================
const invitation = {
  childName: 'Muhammad Al Fatih',
  fatherName: 'Ahmad',
  motherName: 'Aisyah',
  familyName: 'Keluarga Bapak Ahmad',

  // Nama default jika undangan dibuka tanpa slug, misalnya domain.com
  defaultGuestName: 'Bapak/Ibu/Saudara/i',

  // Opsional: isi jika ingin nama tertentu tidak mengikuti format otomatis slug.
  // Contoh: domain.com/bpk-haris-dan-keluarga akan menjadi Bpk Haris & Keluarga.
  guestNameOverrides: {
    'bpk-haris-dan-keluarga': 'Bpk Haris & Keluarga'
  },

  // Foto utama di halaman pertama.
  // Ganti dengan file fotomu, contoh: /assets/foto-anak-cover.jpg
  coverPhoto: '/assets/photo-1.svg',

  // Format tanggal untuk countdown: YYYY-MM-DDTHH:mm:ss+07:00
  eventDateISO: '2026-06-30T10:00:00+07:00',
  eventDateText: 'Minggu, 30 Juni 2026',
  eventTimeText: '10.00 WIB - Selesai',
  eventPlace: 'Rumah Keluarga Besar, Jl. Contoh Alamat No. 123, Jakarta',

  // Ganti dengan link Google Maps lokasi acara
  mapUrl: 'https://maps.google.com/?q=Jakarta',

  // Ganti nomor WhatsApp tujuan RSVP. Format: 62xxxxxxxxxxx
  whatsappNumber: '6281234567890',
  whatsappMessage: 'Assalamu’alaikum, saya ingin konfirmasi kehadiran di acara Aqiqah Muhammad Al Fatih.',

  // 4 tempat foto galeri.
  // Masukkan foto ke folder assets, lalu ganti src-nya di sini.
  photos: [
    { src: '/assets/photo-1.svg', caption: 'Foto Pertama' },
    { src: '/assets/photo-2.svg', caption: 'Senyum Manis' },
    { src: '/assets/photo-3.svg', caption: 'Doa Keluarga' },
    { src: '/assets/photo-4.svg', caption: 'Hari Bahagia' }
  ]
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setImage(id, src, altText) {
  const img = document.getElementById(id);
  if (!img || !src) return;

  img.src = src;
  if (altText) img.alt = altText;
}

function toTitleCase(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function getGuestSlug() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');

  // Jika dibuka dari domain utama, tampilkan nama default.
  if (!path || path === 'index.html') return '';

  // Ambil segment pertama saja: /bpk-haris-dan-keluarga
  // File seperti style.css tidak dianggap sebagai slug.
  const firstSegment = decodeURIComponent(path.split('/')[0]).toLowerCase();
  if (!firstSegment || firstSegment.includes('.')) return '';

  return firstSegment
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatGuestNameFromSlug(slug) {
  if (!slug) return invitation.defaultGuestName;

  if (invitation.guestNameOverrides && invitation.guestNameOverrides[slug]) {
    return invitation.guestNameOverrides[slug];
  }

  const specialWords = {
    bpk: 'Bpk',
    bapak: 'Bapak',
    pak: 'Pak',
    ibu: 'Ibu',
    bu: 'Bu',
    sdr: 'Sdr',
    sdri: 'Sdri',
    dr: 'Dr',
    h: 'H.',
    hj: 'Hj.',
    alm: 'Alm.',
    almh: 'Almh.',
    dan: '&',
    keluarga: 'Keluarga'
  };

  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => specialWords[word] || toTitleCase(word))
    .join(' ')
    .replace(/\s*&\s*/g, ' & ')
    .trim();
}

const guestSlug = getGuestSlug();
const guestName = formatGuestNameFromSlug(guestSlug);

setText('childName', invitation.childName);
setText('fatherName', invitation.fatherName);
setText('motherName', invitation.motherName);
setText('familyName', invitation.familyName);
setText('guestName', guestName);
setText('eventDateText', invitation.eventDateText);
setText('eventTimeText', invitation.eventTimeText);
setText('eventPlace', invitation.eventPlace);

setImage('coverPhoto', invitation.coverPhoto, `Foto utama ${invitation.childName}`);

const mapButton = document.getElementById('mapButton');
const waButton = document.getElementById('waButton');

if (mapButton) mapButton.href = invitation.mapUrl;

if (waButton) {
  const rsvpMessage = `${invitation.whatsappMessage}\n\nNama tamu: ${guestName}`;
  waButton.href = `https://wa.me/${invitation.whatsappNumber}?text=${encodeURIComponent(rsvpMessage)}`;
}

invitation.photos.forEach((photo, index) => {
  const photoNumber = index + 1;
  const img = document.getElementById(`photo${photoNumber}`);
  const caption = document.getElementById(`photoCaption${photoNumber}`);

  if (img && photo.src) {
    img.src = photo.src;
    img.alt = photo.caption || `Foto anak ${photoNumber}`;
  }

  if (caption && photo.caption) {
    caption.textContent = photo.caption;
  }
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

function updateCountdown() {
  const eventDate = new Date(invitation.eventDateISO).getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    setText('days', '00');
    setText('hours', '00');
    setText('minutes', '00');
    setText('seconds', '00');
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  setText('days', String(days).padStart(2, '0'));
  setText('hours', String(hours).padStart(2, '0'));
  setText('minutes', String(minutes).padStart(2, '0'));
  setText('seconds', String(seconds).padStart(2, '0'));
}

updateCountdown();
setInterval(updateCountdown, 1000);

const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

if (musicBtn && bgMusic) {
  musicBtn.addEventListener('click', async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        musicBtn.classList.add('playing');
      } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
      }
    } catch (error) {
      alert('Tambahkan file music.mp3 di folder assets agar musik bisa diputar.');
    }
  });
}
