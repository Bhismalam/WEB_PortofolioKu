# Ide Redesign Portofolio

Catatan diskusi untuk mengubah tampilan web ini supaya tidak terasa "template AI" lagi.

## Masalah dengan Desain Sekarang

- Palet ungu-cyan glassmorphism = ciri khas template AI generator
- Font mono-tech dipakai di hampir semua teks, termasuk yang bukan konteks "coding"
- Micro-copy generic: "Verified Full-Stack Developer", "CMS Ready", "GitHub Integration"
- Banyak ikon Sparkles / efek glow berlebihan
- Kartu kode palsu (`developer_profile.tsx`) di Hero terasa gimmicky

## Arah Baru (isi saat diskusi berjalan)

- Palet warna: **Graphite + Electric Blue** (tema teknologi, foto pribadi jadi fokus)
  - Background: `#0A0E14` (near-black, sedikit biru)
  - Surface/card: `#12161F`
  - Text: `#E5E7EB`
  - Accent: `#3B82F6` (electric blue) — dipakai tunggal, bukan gradient banyak warna
  - Muted/secondary text: `#6B7280`
  - Kesan yang dituju: clean, engineering, terpercaya (mirip Vercel/Linear/Stripe), foto pribadi tidak "berebut warna" dengan UI
- Tipografi: tetap pakai yang sekarang — Geist (sans-serif, body/heading) + Geist Mono (`font-mono-tech`, dipakai buat aksen teknis/label)
- Gaya visual: **flat/solid, glassmorphism dihapus total** (bukan dihaluskan)
  - Card: solid background (surface color), border 1px tipis, shadow halus — no blur, no transparansi berat
  - Alasan: blur berat = ciri khas "template AI"; juga bikin foto pribadi kurang tajam kalau dikelilingi elemen blur
  - Sentuhan teknologi/glow dipindah jadi aksen kecil saja (misal border glow tipis saat hover), bukan efek besar di seluruh card
  - Referensi rasa: Linear / Vercel / Stripe
- Referensi / mood board:
- Nada micro-copy:
- Foto pribadi:
  - Menggantikan kartu "kode palsu" di Hero (Hero.tsx baris 126-193) sebagai elemen visual utama, bukan avatar kecil
  - Treatment: apa adanya (tidak di-filter berat), sudut membulat halus, border tipis 1px warna aksen biru `#3B82F6`
  - Tidak pakai duotone/efek berat — foto natural lebih personal & kredibel

## Komponen yang Perlu Diubah

- [ ] Navbar
- [ ] Hero
- [ ] Skills Bento
- [ ] Certificates Section
- [ ] Portfolio Showcase
- [ ] Contact Section
- [ ] Footer
- [ ] Admin Dashboard (opsional, boleh belakangan)

## Keputusan yang Sudah Fix

- Palet warna: Graphite + Electric Blue (lihat detail di atas)
- Tipografi: tetap Geist + Geist Mono (tidak diganti)
- Gaya visual: flat/solid, glassmorphism dihapus total (lihat detail di atas)
- Foto pribadi: ganti kartu kode palsu di Hero, apa adanya + border tipis aksen biru (lihat detail di atas)

## Belum Diputuskan / Masih Didiskusikan

_(diisi seiring diskusi)_
