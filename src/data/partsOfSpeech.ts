export type Level = "A2" | "B1" | "B2" | "C1" | "C2";

export interface VocabRow {
  word: string;
  level: Level;
  meaning: string;
  synonym: string;
  antonym: string;
  usage: string;
  example: string;
  exampleId: string;
}

export interface PartOfSpeech {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  usage: string;
  rules: string[];
  examples: string[];
  vocab: VocabRow[];
}

export const PARTS_OF_SPEECH: PartOfSpeech[] = [
  {
    id: "noun",
    name: "Noun",
    subtitle: "Kata Benda",
    icon: "📦",
    color: "from-sky-500/20 to-blue-500/10",
    description:
      "Noun (kata benda) adalah kata yang digunakan untuk menamai orang, tempat, benda, hewan, ide, atau konsep abstrak. Noun bisa berbentuk konkret (yang bisa dilihat/disentuh) maupun abstrak (perasaan, ide).",
    usage:
      "Noun biasanya berfungsi sebagai subjek atau objek dalam kalimat. Bisa didahului oleh artikel (a/an/the) atau kata sifat (adjective).",
    rules: [
      "Countable noun memiliki bentuk jamak (book → books).",
      "Uncountable noun tidak memiliki bentuk jamak (water, information).",
      "Proper noun (nama orang/tempat) selalu diawali huruf kapital.",
      "Noun bisa berfungsi sebagai subjek, objek, atau pelengkap.",
    ],
    examples: [
      "The teacher explained the lesson. (Guru itu menjelaskan pelajaran.)",
      "Happiness is important. (Kebahagiaan itu penting.)",
    ],
    vocab: [
      { word: "family", level: "A2", meaning: "keluarga", synonym: "household", antonym: "stranger", usage: "Digunakan untuk menyebut anggota rumah tangga.", example: "My family lives in Jakarta.", exampleId: "Keluarga saya tinggal di Jakarta." },
      { word: "knowledge", level: "B1", meaning: "pengetahuan", synonym: "wisdom", antonym: "ignorance", usage: "Noun abstrak, uncountable.", example: "Knowledge is power.", exampleId: "Pengetahuan adalah kekuatan." },
      { word: "opportunity", level: "B2", meaning: "kesempatan", synonym: "chance", antonym: "loss", usage: "Sering muncul dalam konteks formal/akademik.", example: "She got an opportunity to study abroad.", exampleId: "Dia mendapat kesempatan untuk belajar di luar negeri." },
      { word: "perspective", level: "C1", meaning: "sudut pandang", synonym: "viewpoint", antonym: "ignorance", usage: "Digunakan untuk membahas opini atau cara melihat.", example: "From my perspective, the plan is risky.", exampleId: "Dari sudut pandang saya, rencana itu berisiko." },
      { word: "paradigm", level: "C2", meaning: "paradigma", synonym: "model", antonym: "anomaly", usage: "Akademik, pola/model pemikiran.", example: "This discovery shifted the scientific paradigm.", exampleId: "Penemuan ini menggeser paradigma ilmiah." },
      { word: "research", level: "B1", meaning: "penelitian", synonym: "investigation", antonym: "guess", usage: "Uncountable, populer di TOEFL/Linguaskill.", example: "He is doing research on climate change.", exampleId: "Dia sedang melakukan penelitian tentang perubahan iklim." },
      { word: "environment", level: "B1", meaning: "lingkungan", synonym: "surroundings", antonym: "—", usage: "Sering muncul di tes akademik.", example: "We must protect the environment.", exampleId: "Kita harus melindungi lingkungan." },
      { word: "consequence", level: "B2", meaning: "akibat", synonym: "result", antonym: "cause", usage: "Akibat dari suatu tindakan.", example: "Every action has a consequence.", exampleId: "Setiap tindakan memiliki akibat." },
      { word: "phenomenon", level: "C1", meaning: "fenomena", synonym: "occurrence", antonym: "—", usage: "Plural: phenomena.", example: "Climate change is a global phenomenon.", exampleId: "Perubahan iklim adalah fenomena global." },
      { word: "integrity", level: "C1", meaning: "integritas", synonym: "honesty", antonym: "dishonesty", usage: "Karakter moral seseorang.", example: "She is a leader of great integrity.", exampleId: "Dia adalah pemimpin yang berintegritas tinggi." },
    ],
  },
  {
    id: "pronoun",
    name: "Pronoun",
    subtitle: "Kata Ganti",
    icon: "👤",
    color: "from-violet-500/20 to-purple-500/10",
    description:
      "Pronoun (kata ganti) adalah kata yang menggantikan noun agar kalimat tidak terdengar repetitif. Contohnya: I, you, he, she, it, we, they, this, that.",
    usage:
      "Gunakan pronoun setelah noun sudah disebut sebelumnya. Pronoun harus sesuai dengan jumlah (singular/plural) dan gender.",
    rules: [
      "Subject pronoun: I, you, he, she, it, we, they.",
      "Object pronoun: me, you, him, her, it, us, them.",
      "Possessive pronoun: mine, yours, his, hers, ours, theirs.",
      "Reflexive pronoun: myself, yourself, himself, dll.",
    ],
    examples: [
      "John is tired. He needs rest. (John lelah. Dia butuh istirahat.)",
      "This book is mine. (Buku ini milikku.)",
    ],
    vocab: [
      { word: "they", level: "A2", meaning: "mereka", synonym: "—", antonym: "—", usage: "Subject pronoun jamak.", example: "They are my friends.", exampleId: "Mereka adalah teman-teman saya." },
      { word: "ourselves", level: "B1", meaning: "kami sendiri", synonym: "—", antonym: "—", usage: "Reflexive pronoun untuk we.", example: "We did it ourselves.", exampleId: "Kami melakukannya sendiri." },
      { word: "whom", level: "B2", meaning: "siapa (objek)", synonym: "who", antonym: "—", usage: "Formal, sebagai object pronoun.", example: "To whom did you speak?", exampleId: "Kepada siapa kamu berbicara?" },
      { word: "whoever", level: "B2", meaning: "siapa pun", synonym: "anyone", antonym: "nobody", usage: "Indefinite pronoun.", example: "Whoever calls, tell them I'm out.", exampleId: "Siapa pun yang menelepon, katakan saya keluar." },
      { word: "oneself", level: "C1", meaning: "diri sendiri", synonym: "yourself", antonym: "—", usage: "Formal/general reflexive.", example: "One must believe in oneself.", exampleId: "Seseorang harus percaya pada diri sendiri." },
      { word: "themselves", level: "B1", meaning: "mereka sendiri", synonym: "—", antonym: "—", usage: "Reflexive pronoun jamak.", example: "They built the house themselves.", exampleId: "Mereka membangun rumah itu sendiri." },
      { word: "anybody", level: "A2", meaning: "siapa saja", synonym: "anyone", antonym: "nobody", usage: "Indefinite pronoun.", example: "Is anybody home?", exampleId: "Apakah ada orang di rumah?" },
      { word: "each other", level: "B1", meaning: "satu sama lain", synonym: "one another", antonym: "—", usage: "Reciprocal pronoun.", example: "They love each other.", exampleId: "Mereka saling mencintai." },
      { word: "such", level: "C1", meaning: "seperti itu", synonym: "like that", antonym: "—", usage: "Demonstrative formal.", example: "Such is life.", exampleId: "Begitulah hidup." },
      { word: "none", level: "B2", meaning: "tidak satupun", synonym: "no one", antonym: "all", usage: "Indefinite pronoun negatif.", example: "None of them came.", exampleId: "Tidak satupun dari mereka datang." },
    ],
  },
  {
    id: "verb",
    name: "Verb",
    subtitle: "Kata Kerja",
    icon: "⚡",
    color: "from-emerald-500/20 to-green-500/10",
    description:
      "Verb (kata kerja) adalah kata yang menyatakan tindakan, peristiwa, atau keadaan. Verb adalah inti dari setiap kalimat bahasa Inggris.",
    usage:
      "Verb harus dikonjugasi sesuai subjek dan tense (waktu). Ada action verb (run, eat) dan stative verb (know, love).",
    rules: [
      "Regular verb: tambah -ed untuk past (walk → walked).",
      "Irregular verb: bentuk berubah (go → went → gone).",
      "Subject-verb agreement: He runs (bukan run).",
      "Modal verb: can, could, will, would, should, must.",
    ],
    examples: [
      "She writes a letter. (Dia menulis surat.)",
      "They have finished. (Mereka sudah selesai.)",
    ],
    vocab: [
      { word: "achieve", level: "B1", meaning: "mencapai", synonym: "accomplish", antonym: "fail", usage: "Action verb, sering di esai.", example: "She achieved her goal.", exampleId: "Dia mencapai tujuannya." },
      { word: "analyze", level: "B2", meaning: "menganalisis", synonym: "examine", antonym: "ignore", usage: "Akademik, populer di TOEFL.", example: "We need to analyze the data.", exampleId: "Kita perlu menganalisis datanya." },
      { word: "demonstrate", level: "B2", meaning: "menunjukkan", synonym: "show", antonym: "hide", usage: "Memperlihatkan dengan bukti.", example: "He demonstrated the new product.", exampleId: "Dia mendemonstrasikan produk baru itu." },
      { word: "implement", level: "C1", meaning: "menerapkan", synonym: "execute", antonym: "neglect", usage: "Bisnis/akademik formal.", example: "The company will implement new rules.", exampleId: "Perusahaan akan menerapkan aturan baru." },
      { word: "elaborate", level: "C1", meaning: "menjelaskan secara rinci", synonym: "expand", antonym: "simplify", usage: "Sering muncul di speaking test.", example: "Could you elaborate on that idea?", exampleId: "Bisakah kamu menjelaskan ide itu lebih rinci?" },
      { word: "scrutinize", level: "C2", meaning: "memeriksa dengan cermat", synonym: "examine", antonym: "overlook", usage: "Pemeriksaan teliti.", example: "The auditor scrutinized the report.", exampleId: "Auditor memeriksa laporan itu dengan cermat." },
      { word: "discuss", level: "A2", meaning: "mendiskusikan", synonym: "debate", antonym: "ignore", usage: "Tidak diikuti 'about'.", example: "Let's discuss the plan.", exampleId: "Mari kita diskusikan rencana itu." },
      { word: "consider", level: "B1", meaning: "mempertimbangkan", synonym: "think about", antonym: "ignore", usage: "Diikuti gerund (-ing).", example: "I'm considering moving abroad.", exampleId: "Saya sedang mempertimbangkan pindah ke luar negeri." },
      { word: "enhance", level: "B2", meaning: "meningkatkan", synonym: "improve", antonym: "diminish", usage: "Formal, populer di Linguaskill.", example: "Reading enhances vocabulary.", exampleId: "Membaca meningkatkan kosakata." },
      { word: "advocate", level: "C1", meaning: "mendukung/membela", synonym: "support", antonym: "oppose", usage: "Verb & noun.", example: "She advocates for women's rights.", exampleId: "Dia membela hak-hak perempuan." },
    ],
  },
  {
    id: "adjective",
    name: "Adjective",
    subtitle: "Kata Sifat",
    icon: "🎨",
    color: "from-amber-500/20 to-orange-500/10",
    description:
      "Adjective (kata sifat) adalah kata yang mendeskripsikan atau memberi sifat pada noun atau pronoun. Memberi informasi tentang ukuran, warna, kualitas, jumlah, dll.",
    usage:
      "Adjective biasanya diletakkan sebelum noun (a beautiful house) atau setelah linking verb (She is beautiful).",
    rules: [
      "Comparative: -er atau more (faster, more beautiful).",
      "Superlative: -est atau most (fastest, most beautiful).",
      "Urutan: opinion-size-age-color (a nice big old red car).",
      "Adjective tidak memiliki bentuk jamak.",
    ],
    examples: [
      "She has a beautiful voice. (Dia memiliki suara yang indah.)",
      "This task is difficult. (Tugas ini sulit.)",
    ],
    vocab: [
      { word: "happy", level: "A2", meaning: "bahagia", synonym: "joyful", antonym: "sad", usage: "Sifat dasar untuk perasaan.", example: "I am happy today.", exampleId: "Saya bahagia hari ini." },
      { word: "important", level: "A2", meaning: "penting", synonym: "essential", antonym: "trivial", usage: "Sangat umum di semua tes.", example: "Education is important.", exampleId: "Pendidikan itu penting." },
      { word: "significant", level: "B2", meaning: "signifikan", synonym: "important", antonym: "minor", usage: "Akademik formal.", example: "There was a significant change.", exampleId: "Ada perubahan yang signifikan." },
      { word: "comprehensive", level: "C1", meaning: "menyeluruh", synonym: "thorough", antonym: "partial", usage: "Lengkap dan luas.", example: "We need a comprehensive plan.", exampleId: "Kita butuh rencana yang menyeluruh." },
      { word: "ubiquitous", level: "C2", meaning: "ada di mana-mana", synonym: "omnipresent", antonym: "rare", usage: "Akademik tinggi.", example: "Smartphones are ubiquitous today.", exampleId: "Smartphone ada di mana-mana saat ini." },
      { word: "reliable", level: "B1", meaning: "dapat diandalkan", synonym: "dependable", antonym: "unreliable", usage: "Karakter atau benda.", example: "He is a reliable friend.", exampleId: "Dia adalah teman yang dapat diandalkan." },
      { word: "efficient", level: "B2", meaning: "efisien", synonym: "effective", antonym: "wasteful", usage: "Sering di konteks bisnis.", example: "This is an efficient method.", exampleId: "Ini metode yang efisien." },
      { word: "ambiguous", level: "C1", meaning: "ambigu", synonym: "unclear", antonym: "clear", usage: "Memiliki banyak makna.", example: "His answer was ambiguous.", exampleId: "Jawabannya ambigu." },
      { word: "diverse", level: "B2", meaning: "beragam", synonym: "varied", antonym: "uniform", usage: "Populer di esai.", example: "Indonesia has diverse cultures.", exampleId: "Indonesia memiliki budaya yang beragam." },
      { word: "meticulous", level: "C2", meaning: "teliti sekali", synonym: "thorough", antonym: "careless", usage: "Sangat detail.", example: "She is meticulous in her work.", exampleId: "Dia sangat teliti dalam pekerjaannya." },
    ],
  },
  {
    id: "adverb",
    name: "Adverb",
    subtitle: "Kata Keterangan",
    icon: "💨",
    color: "from-rose-500/20 to-pink-500/10",
    description:
      "Adverb (kata keterangan) adalah kata yang memberi keterangan pada verb, adjective, atau adverb lain. Menjawab pertanyaan how, when, where, how often, atau to what extent.",
    usage:
      "Banyak adverb dibentuk dengan menambahkan -ly pada adjective (quick → quickly). Letaknya bisa di awal, tengah, atau akhir kalimat.",
    rules: [
      "Adverb of manner: quickly, slowly, carefully.",
      "Adverb of time: today, yesterday, soon.",
      "Adverb of frequency: always, often, never.",
      "Adverb of degree: very, quite, extremely.",
    ],
    examples: [
      "She runs quickly. (Dia berlari dengan cepat.)",
      "He always helps me. (Dia selalu membantu saya.)",
    ],
    vocab: [
      { word: "carefully", level: "A2", meaning: "dengan hati-hati", synonym: "cautiously", antonym: "carelessly", usage: "Adverb of manner.", example: "Drive carefully.", exampleId: "Berkendaralah dengan hati-hati." },
      { word: "usually", level: "A2", meaning: "biasanya", synonym: "normally", antonym: "rarely", usage: "Adverb of frequency.", example: "I usually wake up at 6.", exampleId: "Saya biasanya bangun jam 6." },
      { word: "frequently", level: "B1", meaning: "sering", synonym: "often", antonym: "seldom", usage: "Lebih formal dari 'often'.", example: "He frequently travels for work.", exampleId: "Dia sering bepergian untuk bekerja." },
      { word: "particularly", level: "B2", meaning: "khususnya", synonym: "especially", antonym: "generally", usage: "Adverb of degree.", example: "I particularly enjoyed the music.", exampleId: "Saya khususnya menikmati musiknya." },
      { word: "consequently", level: "C1", meaning: "akibatnya", synonym: "therefore", antonym: "—", usage: "Linker formal.", example: "It rained; consequently, the match was cancelled.", exampleId: "Hujan turun; akibatnya, pertandingan dibatalkan." },
      { word: "ostensibly", level: "C2", meaning: "seolah-olah", synonym: "apparently", antonym: "actually", usage: "Sangat formal.", example: "He came ostensibly to help.", exampleId: "Dia datang seolah-olah untuk membantu." },
      { word: "rarely", level: "B1", meaning: "jarang", synonym: "seldom", antonym: "often", usage: "Adverb of frequency negatif.", example: "She rarely eats meat.", exampleId: "Dia jarang makan daging." },
      { word: "thoroughly", level: "B2", meaning: "secara menyeluruh", synonym: "completely", antonym: "partially", usage: "Adverb of degree.", example: "Clean the room thoroughly.", exampleId: "Bersihkan kamar secara menyeluruh." },
      { word: "nevertheless", level: "C1", meaning: "meskipun demikian", synonym: "however", antonym: "—", usage: "Linker akademik.", example: "It was hard; nevertheless, he succeeded.", exampleId: "Itu sulit; meskipun demikian, dia berhasil." },
      { word: "henceforth", level: "C2", meaning: "mulai sekarang", synonym: "from now on", antonym: "previously", usage: "Sangat formal/legal.", example: "Henceforth, smoking is prohibited.", exampleId: "Mulai sekarang, merokok dilarang." },
    ],
  },
  {
    id: "preposition",
    name: "Preposition",
    subtitle: "Kata Depan",
    icon: "🔗",
    color: "from-cyan-500/20 to-teal-500/10",
    description:
      "Preposition (kata depan) adalah kata yang menghubungkan noun/pronoun dengan kata lain dalam kalimat. Menunjukkan hubungan tempat, waktu, arah, atau cara.",
    usage:
      "Preposition selalu diikuti oleh noun, pronoun, atau gerund (-ing form). Tidak pernah diikuti oleh verb dasar.",
    rules: [
      "Preposition of place: in, on, at, under, between.",
      "Preposition of time: at (jam), on (hari), in (bulan/tahun).",
      "Preposition of movement: to, into, onto, from.",
      "Setelah preposition, verb harus dalam bentuk -ing.",
    ],
    examples: [
      "The book is on the table. (Buku itu di atas meja.)",
      "We meet at 8 a.m. (Kami bertemu jam 8 pagi.)",
    ],
    vocab: [
      { word: "between", level: "A2", meaning: "di antara (dua)", synonym: "amid", antonym: "—", usage: "Untuk dua benda/orang.", example: "Sit between us.", exampleId: "Duduklah di antara kami." },
      { word: "among", level: "B1", meaning: "di antara (banyak)", synonym: "amid", antonym: "—", usage: "Untuk lebih dari dua.", example: "He is popular among students.", exampleId: "Dia populer di antara siswa." },
      { word: "despite", level: "B2", meaning: "meskipun", synonym: "in spite of", antonym: "because of", usage: "Diikuti noun/gerund, bukan klausa.", example: "Despite the rain, we went out.", exampleId: "Meskipun hujan, kami tetap keluar." },
      { word: "throughout", level: "B2", meaning: "sepanjang", synonym: "during", antonym: "—", usage: "Tempat atau waktu.", example: "He worked throughout the night.", exampleId: "Dia bekerja sepanjang malam." },
      { word: "regarding", level: "C1", meaning: "mengenai", synonym: "about", antonym: "—", usage: "Formal, surat resmi.", example: "I'm writing regarding your application.", exampleId: "Saya menulis mengenai lamaran Anda." },
      { word: "notwithstanding", level: "C2", meaning: "walaupun", synonym: "despite", antonym: "—", usage: "Sangat formal/legal.", example: "Notwithstanding the cost, we proceeded.", exampleId: "Walaupun biayanya tinggi, kami melanjutkan." },
      { word: "beneath", level: "B1", meaning: "di bawah", synonym: "under", antonym: "above", usage: "Lebih literer dari 'under'.", example: "The keys are beneath the mat.", exampleId: "Kuncinya ada di bawah keset." },
      { word: "across", level: "A2", meaning: "menyeberangi", synonym: "over", antonym: "—", usage: "Movement.", example: "He swam across the river.", exampleId: "Dia berenang menyeberangi sungai." },
      { word: "amongst", level: "C1", meaning: "di antara", synonym: "among", antonym: "—", usage: "Varian British formal.", example: "She walked amongst the crowd.", exampleId: "Dia berjalan di antara kerumunan." },
      { word: "via", level: "B2", meaning: "melalui", synonym: "through", antonym: "—", usage: "Jalur/medium.", example: "Send it via email.", exampleId: "Kirim melalui email." },
    ],
  },
  {
    id: "conjunction",
    name: "Conjunction",
    subtitle: "Kata Hubung",
    icon: "🪢",
    color: "from-indigo-500/20 to-blue-500/10",
    description:
      "Conjunction (kata hubung) adalah kata yang menghubungkan kata, frasa, atau klausa dalam sebuah kalimat. Membantu membuat kalimat kompleks.",
    usage:
      "Pilih conjunction sesuai hubungan: penambahan (and), kontras (but), sebab (because), waktu (when).",
    rules: [
      "Coordinating: FANBOYS (for, and, nor, but, or, yet, so).",
      "Subordinating: because, although, when, if, since.",
      "Correlative: either…or, neither…nor, both…and.",
      "Gunakan koma sebelum coordinating conjunction yang menggabungkan dua klausa.",
    ],
    examples: [
      "I was tired, but I kept working. (Saya lelah, tetapi saya terus bekerja.)",
      "She left because it was late. (Dia pergi karena sudah larut.)",
    ],
    vocab: [
      { word: "because", level: "A2", meaning: "karena", synonym: "since", antonym: "although", usage: "Subordinating, sebab.", example: "I left because I was tired.", exampleId: "Saya pergi karena saya lelah." },
      { word: "although", level: "B1", meaning: "meskipun", synonym: "though", antonym: "because", usage: "Subordinating, kontras.", example: "Although it rained, we went out.", exampleId: "Meskipun hujan, kami tetap keluar." },
      { word: "whereas", level: "B2", meaning: "sedangkan", synonym: "while", antonym: "—", usage: "Membandingkan dua hal.", example: "He is calm, whereas she is loud.", exampleId: "Dia tenang, sedangkan dia berisik." },
      { word: "moreover", level: "B2", meaning: "selain itu", synonym: "furthermore", antonym: "—", usage: "Linker tambahan formal.", example: "It's cheap; moreover, it's reliable.", exampleId: "Ini murah; selain itu, dapat diandalkan." },
      { word: "nonetheless", level: "C1", meaning: "namun", synonym: "however", antonym: "—", usage: "Formal kontras.", example: "It was hard; nonetheless, he won.", exampleId: "Itu sulit; namun, dia menang." },
      { word: "albeit", level: "C2", meaning: "walaupun", synonym: "although", antonym: "—", usage: "Sangat formal.", example: "He agreed, albeit reluctantly.", exampleId: "Dia setuju, walaupun dengan enggan." },
      { word: "unless", level: "B1", meaning: "kecuali jika", synonym: "if not", antonym: "if", usage: "Kondisi negatif.", example: "I won't go unless you come.", exampleId: "Saya tidak akan pergi kecuali kamu ikut." },
      { word: "whenever", level: "B1", meaning: "kapan pun", synonym: "any time", antonym: "—", usage: "Subordinating waktu.", example: "Call me whenever you need help.", exampleId: "Hubungi saya kapan pun butuh bantuan." },
      { word: "furthermore", level: "B2", meaning: "lebih lanjut", synonym: "moreover", antonym: "—", usage: "Linker akademik.", example: "It's healthy; furthermore, it's tasty.", exampleId: "Ini sehat; lebih lanjut, juga enak." },
      { word: "thus", level: "C1", meaning: "dengan demikian", synonym: "therefore", antonym: "—", usage: "Konsekuensi formal.", example: "He studied hard; thus, he passed.", exampleId: "Dia belajar keras; dengan demikian, dia lulus." },
    ],
  },
  {
    id: "interjection",
    name: "Interjection",
    subtitle: "Kata Seru",
    icon: "❗",
    color: "from-yellow-500/20 to-amber-500/10",
    description:
      "Interjection (kata seru) adalah kata atau ungkapan singkat untuk mengekspresikan emosi, reaksi, atau perasaan secara spontan. Sering diikuti tanda seru (!).",
    usage:
      "Interjection biasanya berdiri sendiri di awal kalimat dan tidak terikat secara gramatikal dengan kalimat lainnya.",
    rules: [
      "Diakhiri dengan tanda seru (!) atau koma.",
      "Lebih umum dalam bahasa lisan daripada tulisan formal.",
      "Bisa berupa satu kata: Wow! Oh! Ouch!",
      "Tidak digunakan dalam tulisan akademik formal.",
    ],
    examples: [
      "Wow! That's amazing. (Wah! Itu luar biasa.)",
      "Oops, I dropped it. (Ups, saya menjatuhkannya.)",
    ],
    vocab: [
      { word: "wow", level: "A2", meaning: "wah", synonym: "amazing", antonym: "—", usage: "Mengekspresikan kekaguman.", example: "Wow! What a view!", exampleId: "Wah! Pemandangan yang indah!" },
      { word: "ouch", level: "A2", meaning: "aduh", synonym: "ow", antonym: "—", usage: "Saat kesakitan.", example: "Ouch! That hurt.", exampleId: "Aduh! Itu sakit." },
      { word: "oops", level: "A2", meaning: "ups", synonym: "whoops", antonym: "—", usage: "Saat membuat kesalahan kecil.", example: "Oops, I forgot the keys.", exampleId: "Ups, saya lupa kuncinya." },
      { word: "alas", level: "C1", meaning: "sayang sekali", synonym: "unfortunately", antonym: "—", usage: "Literer, kesedihan.", example: "Alas, he never returned.", exampleId: "Sayang sekali, dia tidak pernah kembali." },
      { word: "hurray", level: "B1", meaning: "hore", synonym: "yay", antonym: "—", usage: "Kegembiraan.", example: "Hurray! We won!", exampleId: "Hore! Kita menang!" },
      { word: "phew", level: "B1", meaning: "fiuh", synonym: "whew", antonym: "—", usage: "Lega.", example: "Phew! That was close.", exampleId: "Fiuh! Itu nyaris saja." },
      { word: "bravo", level: "B2", meaning: "bagus", synonym: "well done", antonym: "—", usage: "Apresiasi penampilan.", example: "Bravo! Excellent performance!", exampleId: "Bagus! Penampilan yang luar biasa!" },
      { word: "eureka", level: "C1", meaning: "ketemu!", synonym: "aha", antonym: "—", usage: "Saat menemukan sesuatu.", example: "Eureka! I found the answer!", exampleId: "Ketemu! Saya menemukan jawabannya!" },
      { word: "behold", level: "C2", meaning: "lihatlah", synonym: "look", antonym: "—", usage: "Sangat literer/arkais.", example: "Behold, the king arrives!", exampleId: "Lihatlah, raja telah tiba!" },
      { word: "yikes", level: "B2", meaning: "astaga", synonym: "oh no", antonym: "—", usage: "Kaget/takut.", example: "Yikes! That's a big spider.", exampleId: "Astaga! Laba-laba itu besar." },
    ],
  },
];

export const LEVEL_COLORS: Record<Level, string> = {
  A2: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  B1: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  B2: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  C1: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  C2: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
};