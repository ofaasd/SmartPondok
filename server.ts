import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI server-side with User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint to dynamically generate a professional proposal for Pesantren boards
app.post("/api/generate-proposal", async (req, res) => {
  try {
    const { pesantrenName, santriCount, painPoints, selectedTier, pricingModel, addOns, contactName, phone } = req.body;

    if (!pesantrenName) {
      return res.status(400).json({ error: "Nama Pesantren wajib diisi" });
    }

    const systemInstruction = `Anda adalah Direktur Bisnis Senior dari SmartPondok by RMS (di bawah naungan RMS Technology), sebuah penyedia Sistem Informasi Manajemen (SIM) Pondok Pesantren terkemuka di Indonesia.
Tugas Anda adalah membuat proposal penawaran bisnis yang sangat profesional, persuasif, sopan, dan terstruktur rapi untuk ditujukan kepada Yayasan / Pimpinan Pondok Pesantren dalam Bahasa Indonesia yang formal dan beradab tinggi (menggunakan salam khas pesantren, bahasa yang menghormati kyai/ustadz).

Format output harus berupa JSON yang valid dengan kunci-kunci berikut untuk memudahkan rendering interaktif di frontend:
{
  "title": "PROPOSAL PENAWARAN SIM PONDOK PESANTREN...",
  "intro": "Salam pembuka islami formal, penghormatan kepada jajaran asatidzah dan pengurus, serta pengantar yang tulus...",
  "executiveSummary": "Ringkasan eksekutif tentang pentingnya digitalisasi pesantren demi mengoptimalkan khidmah kepada ummat dan mengapa SmartPondok by RMS adalah solusi terbaik.",
  "needAnalysis": "Analisis mendalam berdasarkan tantangan spesifik yang mereka hadapi saat ini (hubungkan langsung dengan tantangan: '${painPoints || "Efisiensi pengelolaan pondok"}'). Jelaskan secara logis bagaimana SmartPondok menyelesaikan permasalahan tersebut.",
  "featuresBreakdown": [
    {
      "category": "Kategori Fitur (contoh: Manajemen Akademik & Kedisiplinan)",
      "items": ["Nama Fitur - penjelasan fungsionalitas dan dampaknya bagi pondok"]
    }
  ],
  "addonsSelection": [
    {
      "name": "Nama Layanan Tambahan (Add-on)",
      "benefit": "Uraian mengapa layanan ini sangat disarankan untuk mengakselerasi kenyamanan santri dan wali santri."
    }
  ],
  "financialModel": {
    "modelName": "SaaS Bulanan / Tahunan ATAU Jual Putus (Sesuai pilihan)",
    "description": "Penjelasan mengapa skema ini sangat efisien, transparan, dan tidak memberatkan keuangan internal pondok.",
    "investmentBreakdown": "Uraian estimasi rincian biaya, insentif/diskon khusus (misal diskon paket tahunan atau bonus gratis training implementasi), serta jaminan pemeliharaan (SLA)."
  },
  "implementationRoadmap": [
    {
      "phase": "Tahap 1: Persiapan & Sosialisasi",
      "duration": "1 Minggu",
      "activities": "Pengumpulan data induk santri, konfigurasi server awal, dan sosialisasi ke pengurus."
    }
  ],
  "closing": "Salam penutup penuh doa keberkahan untuk perkembangan pondok pesantren, tanda tangan hormat dari Direktur SmartPondok by RMS, dan ajakan untuk melakukan audiensi langsung."
}

Harap pastikan konten proposal disesuaikan secara dinamis dengan nama pesantren ('${pesantrenName}') dan kapasitas '${santriCount}' santri agar terasa sangat personal, hangat, dan meyakinkan. Tonjolkan nilai spiritual (tahfidz tracker, pembentukan karakter, kedisiplinan) berpadu dengan keunggulan efisiensi operasional modern.`;

    const userPrompt = `Buatkan proposal penawaran SmartPondok by RMS untuk:
- Nama Pondok Pesantren: ${pesantrenName}
- Estimasi Jumlah Santri: ${santriCount} santri
- Masalah/Tantangan Utama Saat Ini: ${painPoints || "Efisiensi administrasi, pencatatan keuangan, dan pemantauan tahfidz santri."}
- Paket yang Dipilih: ${selectedTier}
- Model Skema Biaya: ${pricingModel}
- Fitur Tambahan (Add-ons) yang Diminati: ${addOns && addOns.length > 0 ? addOns.join(", ") : "Tidak ada add-on opsional"}
- Nama Kontak Pendaftar: ${contactName || "Pimpinan Pondok Pesantren"}
- Nomor Telepon/WhatsApp: ${phone || "-"}

Buat proposal yang sangat kaya informasi, berwibawa, beradab islami, dan dapat meyakinkan pihak Yayasan untuk menyetujui anggaran SmartPondok by RMS.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const proposalText = response.text;
    const proposalData = JSON.parse(proposalText || "{}");
    res.json(proposalData);
  } catch (error: any) {
    console.error("Error generating proposal via Gemini:", error);
    res.status(500).json({ error: error.message || "Gagal menghasilkan proposal" });
  }
});

// Configure Vite middleware or static serving depending on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartPondok server running on http://localhost:${PORT}`);
  });
}

startServer();
