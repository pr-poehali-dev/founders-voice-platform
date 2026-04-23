import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/dedaeed8-bdac-4736-b0c2-98caf7a128e3/files/ae7fd5c7-cec3-484d-9c64-da29f7bdb56b.jpg";
const FOUNDER_IMAGE = "https://cdn.poehali.dev/projects/dedaeed8-bdac-4736-b0c2-98caf7a128e3/files/e8b9b061-8546-40f5-9220-831bcb68227a.jpg";

const NAV_ITEMS = [
  { id: "statements", label: "Заявления" },
  { id: "analytics", label: "Аналитика" },
  { id: "panels", label: "Дискуссии" },
  { id: "calendar", label: "События" },
  { id: "tops", label: "Топы" },
  { id: "experts", label: "Эксперты" },
  { id: "about", label: "О платформе" },
];

const TICKER_ITEMS = [
  "Илья Сачков: «Кибербезопасность — это новая нефть»",
  "Аркадий Волож комментирует ИИ-регуляцию в Европе",
  "Михаил Гришин о будущем венчурного рынка",
  "Николай Давыдов: 3 тренда EdTech 2025",
  "Ренат Ахтямов об инвестициях в Центральной Азии",
];

const STATEMENTS = [
  {
    id: 1,
    author: "Дмитрий Волков",
    role: "CEO, NovaTech",
    avatar: "DV",
    color: "#00ff88",
    time: "2 часа назад",
    tag: "ИИ & Технологии",
    tagColor: "verified-badge",
    text: "Компании, которые не внедряют ИИ в операции до конца 2025 года, потеряют конкурентоспособность. Это уже не тренд — это новая реальность рынка.",
    likes: 847,
    comments: 124,
    shares: 213,
    verified: true,
  },
  {
    id: 2,
    author: "Анна Кравцова",
    role: "Founder, GreenScale",
    avatar: "АК",
    color: "#00cfff",
    time: "5 часов назад",
    tag: "Инвестиции",
    tagColor: "hot-badge",
    text: "Мы закрыли раунд А на $12M. Главный инсайт: инвесторы хотят видеть не только продукт, но и команду, способную к кризисному мышлению.",
    likes: 1243,
    comments: 89,
    shares: 456,
    verified: true,
  },
  {
    id: 3,
    author: "Сергей Малинин",
    role: "CTO, BlockBridge",
    avatar: "СМ",
    color: "#ff2d78",
    time: "вчера",
    tag: "Web3",
    tagColor: "live-badge",
    text: "Web3 умер трижды, и каждый раз возрождался сильнее. То, что сейчас происходит с инфраструктурой — переломный момент для всей отрасли.",
    likes: 562,
    comments: 203,
    shares: 94,
    verified: false,
  },
];

const ANALYTICS = [
  {
    id: 1,
    category: "Прогноз",
    title: "ИИ-агенты заменят 40% B2B SaaS к 2027 году",
    author: "Павел Рощин",
    authorRole: "Partner, Insight Ventures",
    readTime: "8 мин",
    views: "14.2K",
    trending: true,
  },
  {
    id: 2,
    category: "Анализ",
    title: "Почему российский финтех обгоняет европейский по темпам роста",
    author: "Марина Зайцева",
    authorRole: "CFO, FinSpark",
    readTime: "12 мин",
    views: "8.7K",
    trending: false,
  },
  {
    id: 3,
    category: "Исследование",
    title: "Стартап-экосистема 2025: карта возможностей и угроз",
    author: "Иван Петров",
    authorRole: "CEO, EcoMap Labs",
    readTime: "15 мин",
    views: "21.5K",
    trending: true,
  },
];

const PANELS = [
  {
    id: 1,
    title: "ИИ vs Человек: кто управляет бизнесом будущего?",
    status: "live",
    speakers: 4,
    viewers: 1847,
    topic: "Технологии",
    time: "Сейчас",
  },
  {
    id: 2,
    title: "Венчурный рынок 2025: куда текут деньги",
    status: "upcoming",
    speakers: 3,
    viewers: null,
    topic: "Инвестиции",
    time: "Завтра, 15:00",
  },
  {
    id: 3,
    title: "Регуляция крипто: угроза или возможность для стартапов",
    status: "upcoming",
    speakers: 5,
    viewers: null,
    topic: "Web3",
    time: "25 апр, 18:00",
  },
];

const EVENTS = [
  { date: "24", month: "АПР", title: "Loudly Summit: Основатели меняют мир", type: "Конференция", location: "Москва + онлайн", price: "Бесплатно" },
  { date: "26", month: "АПР", title: "Мастерминд: Масштабирование до $10M ARR", type: "Закрытая встреча", location: "Онлайн", price: "По приглашению" },
  { date: "30", month: "АПР", title: "Pitch Night: Инвесторы слушают основателей", type: "Нетворкинг", location: "Санкт-Петербург", price: "2 500 ₽" },
  { date: "05", month: "МАЙ", title: "Loudly LIVE: Будущее EdTech", type: "Прямой эфир", location: "Онлайн", price: "Бесплатно" },
];

const TOPS = [
  { rank: 1, name: "Дмитрий Волков", company: "NovaTech", score: 9847, change: "+12%", topic: "ИИ" },
  { rank: 2, name: "Анна Кравцова", company: "GreenScale", score: 8234, change: "+8%", topic: "CleanTech" },
  { rank: 3, name: "Роман Тихонов", company: "DataStream", score: 7612, change: "+23%", topic: "Data" },
  { rank: 4, name: "Юлия Морозова", company: "MedBridge", score: 6891, change: "+5%", topic: "HealthTech" },
  { rank: 5, name: "Игорь Соколов", company: "CyberShield", score: 5430, change: "+17%", topic: "Кибербез" },
];

const EXPERTS = [
  { name: "Владимир Кузнецов", role: "Серийный предприниматель, 4 экзита", topics: ["M&A", "Стратегия"], verified: true, media: 127, avatar: "ВК", color: "#00ff88" },
  { name: "Светлана Орлова", role: "Partner, Alpha Ventures", topics: ["VC", "EdTech", "SaaS"], verified: true, media: 89, avatar: "СО", color: "#00cfff" },
  { name: "Максим Беляев", role: "Ex-CEO, Unicorn Corp", topics: ["Скейлинг", "HR"], verified: true, media: 203, avatar: "МБ", color: "#ff2d78" },
  { name: "Татьяна Попова", role: "Chief Digital Officer", topics: ["Digital", "AI", "Retail"], verified: false, media: 64, avatar: "ТП", color: "#ff8c42" },
];

function useScrollVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ScrollSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollVisible();
  return (
    <div ref={ref} className={`scroll-fade-in ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

type ModalType = "none" | "login" | "register";

function AuthModal({ type, onClose, onSwitch }: { type: ModalType; onClose: () => void; onSwitch: (t: ModalType) => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", company: "", linkedin: "", password: "" });

  if (type === "none") return null;

  const isRegister = type === "register";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card rounded-3xl w-full max-w-md p-8 border border-[#2a2a2a] animate-fade-in-up">
        <button onClick={onClose} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors">
          <Icon name="X" size={18} />
        </button>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#00ff88] flex items-center justify-center">
            <span className="text-black font-display font-black text-sm">L</span>
          </div>
          <span className="font-display font-black text-lg">LOUDLY</span>
        </div>

        {isRegister ? (
          <>
            {/* Шаги */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-black transition-all ${step >= s ? "bg-[#00ff88] text-black" : "bg-[#1e1e1e] text-white/30"}`}>
                    {step > s ? <Icon name="Check" size={12} /> : s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-0.5 transition-all ${step > s ? "bg-[#00ff88]" : "bg-[#1e1e1e]"}`} />}
                </div>
              ))}
            </div>

            <h2 className="font-display font-black text-2xl mb-1">
              {step === 1 && "Основная информация"}
              {step === 2 && "Верификация статуса"}
              {step === 3 && "Почти готово!"}
            </h2>
            <p className="text-white/40 text-sm font-body mb-6">
              {step === 1 && "Расскажи о себе"}
              {step === 2 && "Подтверди, что ты основатель"}
              {step === 3 && "Создай пароль для входа"}
            </p>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs font-body mb-1.5 block">Имя и фамилия *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                    placeholder="Иван Петров"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs font-body mb-1.5 block">Корпоративный email *</label>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    type="email"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                    placeholder="ivan@yourcompany.com"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs font-body mb-1.5 block">Название компании *</label>
                  <input
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                    placeholder="NovaTech Inc."
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.name || !form.email || !form.company}
                  className="btn-neon w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                >
                  Далее <Icon name="ArrowRight" size={15} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs font-body mb-1.5 block">LinkedIn профиль</label>
                  <input
                    value={form.linkedin}
                    onChange={e => setForm({ ...form, linkedin: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                    placeholder="linkedin.com/in/yourname"
                  />
                </div>
                <div className="glass-card rounded-xl p-4 border border-[#00ff88]/15">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Mail" size={14} className="text-[#00ff88]" />
                    </div>
                    <div>
                      <div className="font-body font-semibold text-sm mb-1">Проверка email</div>
                      <p className="text-white/40 text-xs font-body leading-relaxed">
                        Мы отправим письмо на <span className="text-[#00ff88]">{form.email || "твой email"}</span> для подтверждения корпоративного адреса
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline-neon px-5 py-3 rounded-xl text-sm flex items-center gap-1.5">
                    <Icon name="ArrowLeft" size={14} /> Назад
                  </button>
                  <button onClick={() => setStep(3)} className="btn-neon flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                    Продолжить <Icon name="ArrowRight" size={15} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs font-body mb-1.5 block">Пароль *</label>
                  <input
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    type="password"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                    placeholder="Минимум 8 символов"
                  />
                </div>
                <div className="glass-card rounded-xl p-4 border border-[#00ff88]/15">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="BadgeCheck" size={14} className="text-[#00ff88]" />
                    <span className="text-sm font-body font-semibold">Твой профиль:</span>
                  </div>
                  <div className="text-white/50 text-xs font-body space-y-1">
                    <div>{form.name} · {form.company}</div>
                    <div>{form.email}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline-neon px-5 py-3 rounded-xl text-sm flex items-center gap-1.5">
                    <Icon name="ArrowLeft" size={14} /> Назад
                  </button>
                  <button
                    disabled={!form.password}
                    className="btn-neon flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Icon name="UserCheck" size={15} /> Зарегистрироваться
                  </button>
                </div>
                <p className="text-white/20 text-xs font-body text-center">
                  Нажимая кнопку, ты соглашаешься с{" "}
                  <span className="text-white/40 underline cursor-pointer">условиями использования</span>
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-[#1e1e1e] text-center">
              <span className="text-white/30 text-sm font-body">Уже есть аккаунт? </span>
              <button onClick={() => onSwitch("login")} className="text-[#00ff88] text-sm font-body font-semibold hover:underline">
                Войти
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-display font-black text-2xl mb-1">Добро пожаловать</h2>
            <p className="text-white/40 text-sm font-body mb-6">Войди в свой аккаунт Loudly</p>

            <div className="space-y-4">
              <div>
                <label className="text-white/40 text-xs font-body mb-1.5 block">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                  placeholder="ivan@yourcompany.com"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs font-body mb-1.5 block">Пароль</label>
                <input
                  type="password"
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end">
                <button className="text-white/40 text-xs font-body hover:text-[#00ff88] transition-colors">Забыл пароль?</button>
              </div>
              <button className="btn-neon w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                <Icon name="LogIn" size={15} /> Войти
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e1e] text-center">
              <span className="text-white/30 text-sm font-body">Нет аккаунта? </span>
              <button onClick={() => onSwitch("register")} className="text-[#00ff88] text-sm font-body font-semibold hover:underline">
                Зарегистрироваться
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("statements");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [modal, setModal] = useState<ModalType>("none");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AuthModal type={modal} onClose={() => setModal("none")} onSwitch={setModal} />
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00ff88] flex items-center justify-center">
              <span className="text-black font-display font-black text-sm">L</span>
            </div>
            <span className="font-display font-black text-lg tracking-tight">LOUDLY</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setModal("login")} className="hidden md:flex btn-outline-neon px-4 py-2 rounded-xl text-sm">
              Войти
            </button>
            <button onClick={() => setModal("register")} className="btn-neon px-4 py-2 rounded-xl text-sm whitespace-nowrap">
              Стать основателем
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1e1e1e] bg-[#0a0a0a] px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link text-left py-3 border-b border-[#1a1a1a] last:border-0"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-3 pt-4 mt-2">
              <button onClick={() => { setModal("login"); setMobileMenuOpen(false); }} className="btn-outline-neon flex-1 py-3 rounded-xl text-sm">
                Войти
              </button>
              <button onClick={() => { setModal("register"); setMobileMenuOpen(false); }} className="btn-neon flex-1 py-3 rounded-xl text-sm">
                Регистрация
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* TICKER */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#00ff88]/5 border-b border-[#00ff88]/20 py-2 overflow-hidden">
        <div className="ticker-wrap">
          <div
            className="ticker"
            style={{ animationPlayState: tickerPaused ? "paused" : "running" }}
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8 text-sm font-body text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] inline-block flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-32 md:pt-36 pb-16 md:pb-20 overflow-hidden grid-pattern">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00ff88]/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#00ff88]/8 pointer-events-none" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#00ff88]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#00cfff]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 tag-badge verified-badge mb-6 animate-fade-in-up">
              <Icon name="Zap" size={12} />
              Платформа для основателей нового поколения
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl xl:text-8xl leading-[0.95] mb-5 md:mb-6 animate-fade-in-up-delay-1">
              ГОВОРИ
              <br />
              <span className="gradient-text">ГРОМКО.</span>
              <br />
              <span className="text-white/30">ВЛИЯЙ.</span>
            </h1>

            <p className="text-white/60 text-base md:text-xl font-body max-w-xl mb-7 md:mb-8 leading-relaxed animate-fade-in-up-delay-2">
              Платформа публичных заявлений, экспертной аналитики и живых дискуссий для тех, кто строит будущее прямо сейчас.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-16 animate-fade-in-up-delay-3">
              <button
                onClick={() => setModal("register")}
                className="btn-neon px-6 md:px-8 py-4 rounded-2xl text-sm md:text-base flex items-center justify-center gap-2"
              >
                <Icon name="UserCheck" size={18} />
                Получить верификацию
              </button>
              <button className="btn-outline-neon px-6 md:px-8 py-4 rounded-2xl text-sm md:text-base flex items-center justify-center gap-2">
                <Icon name="Play" size={18} />
                Смотреть эфир
              </button>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 animate-fade-in-up-delay-4">
              {[
                { num: "2 400+", label: "Верифицированных основателей" },
                { num: "14K", label: "Заявлений и публикаций" },
                { num: "180+", label: "Экспертов для СМИ" },
                { num: "98%", label: "Точность верификации" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="stat-number text-2xl md:text-4xl neon-text">{stat.num}</div>
                  <div className="text-white/40 text-xs md:text-sm mt-1 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENTS */}
      <section id="statements" className="py-14 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <ScrollSection>
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <div className="tag-badge verified-badge mb-3 inline-flex">Публичные заявления</div>
              <h2 className="font-display font-black text-2xl md:text-4xl">Голос основателей</h2>
            </div>
            <button className="btn-outline-neon px-5 py-2.5 rounded-xl text-sm hidden md:flex items-center gap-2">
              Все заявления <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </ScrollSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STATEMENTS.map((s, i) => (
            <ScrollSection key={s.id}>
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col hover:border-white/20 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-black text-sm text-black flex-shrink-0"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-body font-semibold text-sm">{s.author}</span>
                        {s.verified && <Icon name="BadgeCheck" size={14} className="text-[#00ff88]" />}
                      </div>
                      <div className="text-white/40 text-xs font-body">{s.role}</div>
                    </div>
                  </div>
                  <span className="text-white/30 text-xs font-body flex-shrink-0">{s.time}</span>
                </div>

                <div className={`tag-badge ${s.tagColor} mb-4 self-start`}>{s.tag}</div>

                <p className="text-white/75 text-sm font-body leading-relaxed flex-1 mb-5">
                  "{s.text}"
                </p>

                <div className="flex items-center gap-5 text-white/40 text-sm border-t border-[#1e1e1e] pt-4">
                  <button className="flex items-center gap-1.5 hover:text-[#00ff88] transition-colors">
                    <Icon name="Heart" size={14} />
                    {s.likes.toLocaleString()}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#00cfff] transition-colors">
                    <Icon name="MessageCircle" size={14} />
                    {s.comments}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                    <Icon name="Share2" size={14} />
                    {s.shares}
                  </button>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>
      </section>

      {/* ANALYTICS */}
      <section id="analytics" className="py-14 md:py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="tag-badge hot-badge mb-3 inline-flex">Аналитика</div>
                <h2 className="font-display font-black text-3xl md:text-4xl">Экспертные прогнозы</h2>
              </div>
              <button className="btn-outline-neon px-5 py-2.5 rounded-xl text-sm hidden md:flex items-center gap-2">
                Все статьи <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </ScrollSection>

          <div className="flex flex-col gap-4">
            {ANALYTICS.map((a, i) => (
              <ScrollSection key={a.id}>
                <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-white/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-display font-black text-4xl text-white/10 w-12 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`tag-badge ${a.trending ? "verified-badge" : "hot-badge"} text-xs`}>
                          {a.trending ? "🔥 Тренд" : a.category}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base md:text-lg group-hover:text-[#00ff88] transition-colors leading-snug">
                        {a.title}
                      </h3>
                      <div className="text-white/40 text-sm mt-1 font-body">
                        {a.author} · {a.authorRole}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-white/30 text-sm flex-shrink-0">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={13} />
                      {a.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Eye" size={13} />
                      {a.views}
                    </span>
                    <Icon name="ChevronRight" size={16} className="text-white/20 group-hover:text-[#00ff88] transition-colors" />
                  </div>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* PANELS */}
      <section id="panels" className="py-14 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <ScrollSection>
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="tag-badge live-badge mb-3 inline-flex">
                <span className="pulse-dot" />
                Live дискуссии
              </div>
              <h2 className="font-display font-black text-3xl md:text-4xl">Тематические панели</h2>
            </div>
          </div>
        </ScrollSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PANELS.map((p) => (
            <ScrollSection key={p.id}>
              <div className={`glass-card rounded-2xl p-6 h-full flex flex-col cursor-pointer hover:border-white/20 transition-all ${p.status === "live" ? "border-[#ff2d78]/40 glow-blue" : ""}`}>
                <div className="flex items-center justify-between mb-4">
                  {p.status === "live" ? (
                    <span className="tag-badge live-badge">
                      <span className="pulse-dot" />
                      В ЭФИРЕ
                    </span>
                  ) : (
                    <span className="tag-badge" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                      Скоро
                    </span>
                  )}
                  <span className="text-white/40 text-xs font-body">{p.time}</span>
                </div>

                <h3 className="font-display font-bold text-base leading-snug mb-4 flex-1">{p.title}</h3>

                <div className="flex items-center justify-between text-sm text-white/40">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size={13} />
                      {p.speakers} спикера
                    </span>
                    {p.viewers && (
                      <span className="flex items-center gap-1 text-[#ff2d78]">
                        <Icon name="Eye" size={13} />
                        {p.viewers.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="tag-badge" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>
                    {p.topic}
                  </span>
                </div>

                {p.status === "live" ? (
                  <button className="mt-5 btn-neon w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                    <Icon name="Play" size={14} />
                    Присоединиться
                  </button>
                ) : (
                  <button className="mt-5 btn-outline-neon w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                    <Icon name="Bell" size={14} />
                    Напомнить
                  </button>
                )}
              </div>
            </ScrollSection>
          ))}
        </div>
      </section>

      {/* CALENDAR */}
      <section id="calendar" className="py-14 md:py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollSection>
            <div className="mb-12">
              <div className="tag-badge mb-3 inline-flex" style={{ background: "rgba(0,207,255,0.1)", border: "1px solid rgba(0,207,255,0.3)", color: "#00cfff" }}>
                <Icon name="Calendar" size={12} />
                &nbsp;Календарь событий
              </div>
              <h2 className="font-display font-black text-3xl md:text-4xl mt-3">Ближайшие события</h2>
            </div>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVENTS.map((e, i) => (
              <ScrollSection key={i}>
                <div className="glass-card rounded-2xl p-5 flex gap-5 items-start hover:border-white/20 transition-all cursor-pointer group">
                  <div className="flex-shrink-0 text-center w-14">
                    <div className="font-display font-black text-3xl text-[#00cfff] leading-none">{e.date}</div>
                    <div className="text-white/40 text-xs font-body mt-0.5">{e.month}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="tag-badge mb-2 inline-flex" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>
                      {e.type}
                    </div>
                    <h3 className="font-body font-semibold text-base leading-snug group-hover:text-[#00cfff] transition-colors">
                      {e.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-white/40 text-xs font-body">
                      <span className="flex items-center gap-1">
                        <Icon name="MapPin" size={11} />
                        {e.location}
                      </span>
                      <span className="font-semibold" style={{ color: e.price === "Бесплатно" ? "#00ff88" : e.price === "По приглашению" ? "#ff8c42" : "rgba(255,255,255,0.5)" }}>
                        {e.price}
                      </span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-white/20 group-hover:text-[#00cfff] transition-colors flex-shrink-0 mt-1" />
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* TOPS */}
      <section id="tops" className="py-14 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <ScrollSection>
          <div className="mb-12">
            <div className="tag-badge hot-badge mb-3 inline-flex">
              <Icon name="TrendingUp" size={12} />
              &nbsp;Рейтинг влиятельности
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl">
              Топ основателей <span className="text-white/20">этой недели</span>
            </h2>
          </div>
        </ScrollSection>

        <ScrollSection>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-3 border-b border-[#1e1e1e] text-white/30 text-xs font-body uppercase tracking-wider">
              <span className="col-span-1">#</span>
              <span className="col-span-5">Основатель</span>
              <span className="col-span-2 hidden md:block">Тема</span>
              <span className="col-span-2 text-right hidden md:block">Очки</span>
              <span className="col-span-2 text-right">Рост</span>
            </div>
            {TOPS.map((t) => (
              <div
                key={t.rank}
                className="grid grid-cols-12 px-6 py-4 border-b border-[#1e1e1e] last:border-0 items-center hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <span className="col-span-1">
                  {t.rank <= 3 ? (
                    <span className="font-display font-black" style={{ color: t.rank === 1 ? "#ffd700" : t.rank === 2 ? "#c0c0c0" : "#cd7f32" }}>
                      {t.rank}
                    </span>
                  ) : (
                    <span className="text-white/30 font-body">{t.rank}</span>
                  )}
                </span>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00cfff]/20 flex items-center justify-center text-xs font-display font-black text-[#00ff88]">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-sm group-hover:text-[#00ff88] transition-colors">{t.name}</div>
                    <div className="text-white/40 text-xs font-body">{t.company}</div>
                  </div>
                </div>
                <span className="col-span-2 hidden md:block">
                  <span className="tag-badge" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
                    {t.topic}
                  </span>
                </span>
                <span className="col-span-2 text-right hidden md:block font-display font-bold text-sm text-white/60">
                  {t.score.toLocaleString()}
                </span>
                <span className="col-span-2 text-right font-body text-sm font-semibold text-[#00ff88]">
                  {t.change}
                </span>
              </div>
            ))}
          </div>
        </ScrollSection>
      </section>

      {/* EXPERTS */}
      <section id="experts" className="py-14 md:py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="tag-badge verified-badge mb-3 inline-flex">База экспертов</div>
                <h2 className="font-display font-black text-3xl md:text-4xl">Для журналистов и СМИ</h2>
                <p className="text-white/50 font-body mt-2 max-w-md">
                  Верифицированные эксперты, готовые к комментариям и интервью
                </p>
              </div>
              <button className="hidden md:flex btn-outline-neon px-5 py-2.5 rounded-xl text-sm items-center gap-2">
                Вся база <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPERTS.map((ex, i) => (
              <ScrollSection key={i}>
                <div className="glass-card rounded-2xl p-5 flex flex-col h-full hover:border-white/20 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-sm text-black"
                      style={{ backgroundColor: ex.color }}
                    >
                      {ex.avatar}
                    </div>
                    {ex.verified && (
                      <div className="tag-badge verified-badge text-xs">
                        <Icon name="BadgeCheck" size={10} />
                        &nbsp;Верифицирован
                      </div>
                    )}
                  </div>
                  <div className="font-body font-semibold text-base group-hover:text-[#00ff88] transition-colors">{ex.name}</div>
                  <div className="text-white/40 text-xs font-body mt-1 mb-3">{ex.role}</div>
                  <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                    {ex.topics.map((t) => (
                      <span key={t} className="tag-badge text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-[#1e1e1e] pt-3">
                    <span className="text-white/40 text-xs font-body flex items-center gap-1">
                      <Icon name="Newspaper" size={11} />
                      {ex.media} публикаций
                    </span>
                    <button className="text-[#00ff88] text-xs font-body font-semibold hover:underline">
                      Запросить
                    </button>
                  </div>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFICATION CTA */}
      <section className="py-14 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <ScrollSection>
          <div className="relative rounded-3xl overflow-hidden border border-[#00ff88]/20 glow-green">
            <div className="absolute inset-0 grid-pattern opacity-50" />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00ff88]/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#00cfff]/5 blur-3xl" />

            <div className="relative z-10 p-10 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="tag-badge verified-badge mb-6 inline-flex">
                  <Icon name="Shield" size={12} />
                  &nbsp;Верификация основателя
                </div>
                <h2 className="font-display font-black text-3xl md:text-5xl leading-tight mb-6">
                  Подтверди свой<br />
                  <span className="gradient-text">статус основателя</span>
                </h2>
                <p className="text-white/60 font-body text-lg leading-relaxed mb-8">
                  Система верификации через корпоративный email и профили в соцсетях. Один раз — и твои слова звучат авторитетно.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "Mail" as const, text: "Корпоративный email компании" },
                    { icon: "Linkedin" as const, text: "LinkedIn профиль основателя" },
                    { icon: "Globe" as const, text: "Сайт или регистрация юрлица" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-white/70 font-body">
                      <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} size={14} className="text-[#00ff88]" />
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-[#1e1e1e]">
                <div className="flex items-center gap-3 mb-6">
                  <img src={FOUNDER_IMAGE} alt="founder" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-body font-semibold text-sm">Начни верификацию</div>
                    <div className="text-white/40 text-xs font-body">Займёт ~3 минуты</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-white/40 text-xs font-body mb-1 block">Имя и фамилия</label>
                    <input
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs font-body mb-1 block">Корпоративный email</label>
                    <input
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                      placeholder="ivan@yourcompany.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs font-body mb-1 block">Ссылка на LinkedIn</label>
                    <input
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                      placeholder="linkedin.com/in/yourname"
                    />
                  </div>
                </div>

                <button onClick={() => setModal("register")} className="btn-neon w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2">
                  <Icon name="UserCheck" size={16} />
                  Подать заявку на верификацию
                </button>
                <p className="text-white/30 text-xs font-body text-center mt-3">
                  Проверяем в течение 24 часов
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="tag-badge mb-6 inline-flex" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                  О платформе
                </div>
                <h2 className="font-display font-black text-3xl md:text-5xl leading-tight mb-6">
                  Медиа для тех,<br />
                  кто <span className="gradient-text-pink">делает,</span><br />
                  а не говорит
                </h2>
                <p className="text-white/60 font-body text-lg leading-relaxed mb-6">
                  Loudly — это пространство, где реальные основатели делятся настоящими мнениями. Без PR-фильтров, без корпоративного новояза.
                </p>
                <p className="text-white/40 font-body leading-relaxed mb-8">
                  Мы верифицируем каждого участника, обеспечиваем достоверность и создаём среду, где слово основателя имеет вес.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setModal("register")} className="btn-neon px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                    <Icon name="UserCheck" size={15} /> Присоединиться
                  </button>
                  <button className="btn-outline-neon px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                    <Icon name="FileText" size={15} /> Медиакит
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield" as const, title: "100% верификация", desc: "Каждый основатель проходит проверку статуса" },
                  { icon: "Zap" as const, title: "Моментальный отклик", desc: "Публикуй мнения и получай реакцию в реальном времени" },
                  { icon: "Globe" as const, title: "Медиа-охват", desc: "Журналисты топ-изданий мониторят платформу ежедневно" },
                  { icon: "TrendingUp" as const, title: "Влияние растёт", desc: "Алгоритм продвигает самые резонансные высказывания" },
                ].map((f) => (
                  <div key={f.title} className="glass-card rounded-2xl p-5 border border-[#1e1e1e] hover:border-white/15 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center mb-4">
                      <Icon name={f.icon} size={18} className="text-[#00ff88]" />
                    </div>
                    <div className="font-display font-bold text-sm mb-2">{f.title}</div>
                    <div className="text-white/40 text-xs font-body leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ff88] flex items-center justify-center">
                <span className="text-black font-display font-black text-base">L</span>
              </div>
              <div>
                <div className="font-display font-black text-lg">LOUDLY</div>
                <div className="text-white/30 text-xs font-body">Голос основателей</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 text-white/40 text-sm font-body">
              {["О платформе", "Для СМИ", "Верификация", "Реклама", "Контакты"].map((link) => (
                <button key={link} className="hover:text-white transition-colors">{link}</button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {(["Twitter", "Linkedin", "Youtube", "Send"] as const).map((icon) => (
                <button key={icon} className="w-9 h-9 rounded-xl border border-[#2a2a2a] flex items-center justify-center text-white/40 hover:text-[#00ff88] hover:border-[#00ff88]/30 transition-all">
                  <Icon name={icon} size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#1e1e1e] flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-xs font-body">
            <span>© 2025 Loudly. Все права защищены.</span>
            <div className="flex gap-6">
              <button className="hover:text-white/40 transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-white/40 transition-colors">Пользовательское соглашение</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}