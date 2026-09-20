import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Menu,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";

const SERVICES = [
  {
    id: "ceramic",
    title: "Vitrificação cerâmica",
    description: "Uma camada de proteção que realça a profundidade da cor, facilita a limpeza e preserva o acabamento da pintura por muito mais tempo.",
    price: 1490,
    duration: "1 a 2 dias",
    image: "/images/luxure-detail.jpg",
    alt: "Aplicação cuidadosa de proteção cerâmica na pintura de um esportivo",
    caption: "Proteção que você sente. Brilho que você vê.",
  },
  {
    id: "polish",
    title: "Polimento técnico",
    description: "Correção criteriosa de marcas e micro-riscos para devolver à pintura a profundidade, a uniformidade e o reflexo que ela merece.",
    price: 690,
    duration: "6 a 10 horas",
    image: "https://images.pexels.com/photos/35149468/pexels-photo-35149468.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Profissional realizando polimento técnico com uma politriz",
    caption: "Precisão em cada passagem. Perfeição em cada reflexo.",
  },
  {
    id: "interior",
    title: "Higienização interna",
    description: "Limpeza profunda de bancos, carpetes e acabamentos, com produtos específicos para cada material. Um interior renovado, sem disfarçar odores.",
    price: 390,
    duration: "4 a 6 horas",
    image: "https://images.pexels.com/photos/17339323/pexels-photo-17339323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Acabamento e volante de um interior automotivo de alto padrão",
    caption: "A sensação de entrar no seu carro pela primeira vez.",
  },
  {
    id: "wash",
    title: "Lavagem detalhada",
    description: "Muito além de água e espuma. Pré-lavagem, limpeza de rodas, técnica de contato seguro e acabamento manual, sem abrir mão de nenhum detalhe.",
    price: 180,
    duration: "2 a 3 horas",
    image: "https://images.pexels.com/photos/6872595/pexels-photo-6872595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Carro preto com a pintura brilhante em um estúdio de estética automotiva",
    caption: "O cuidado começa onde uma lavagem comum termina.",
  },
];

const PROJECTS = [
  {
    image: "https://images.pexels.com/photos/18928476/pexels-photo-18928476.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Detalhe da lanterna e da pintura prateada de um esportivo",
    category: "PINTURA & PROTEÇÃO",
    title: "Um novo olhar para o brilho.",
    description: "A luz revela cada curva. O cuidado certo com a pintura valoriza o desenho do carro e protege o que torna cada detalhe especial.",
    service: "ceramic",
  },
  {
    image: "https://images.pexels.com/photos/17339323/pexels-photo-17339323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Volante, painel e detalhes do interior de um carro de luxo",
    category: "CUIDADO INTERNO",
    title: "Refinamento de dentro para fora.",
    description: "Couro, costuras, telas e superfícies recebem tratamentos próprios. Higienizar também é preservar a textura e a personalidade de cada material.",
    service: "interior",
  },
  {
    image: "https://images.pexels.com/photos/27972272/pexels-photo-27972272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Roda preta de um esportivo com pinça de freio amarela",
    category: "DETALHAMENTO EXTERNO",
    title: "Nenhum detalhe fica para trás.",
    description: "Rodas, caixas de roda, grades e emblemas também fazem parte do resultado. A limpeza técnica alcança os pontos que costumam passar despercebidos.",
    service: "wash",
  },
  {
    image: "/images/luxure-detail.jpg",
    alt: "Detalhe de aplicação de proteção na pintura de um Porsche",
    category: "ACABAMENTO SIGNATURE",
    title: "Precisão que faz a diferença.",
    description: "A avaliação da pintura vem antes de qualquer correção. O objetivo é um acabamento equilibrado, com respeito à espessura e à condição do verniz.",
    service: "polish",
  },
];

const FAQS = [
  {
    question: "Qual cuidado é ideal para o meu carro?",
    answer: "Depende da condição da pintura, do uso do veículo e do resultado que você busca. A lavagem detalhada é um ótimo começo. Para corrigir marcas, indicamos uma avaliação para polimento; para preservar o acabamento, a vitrificação pode ser o próximo passo.",
  },
  {
    question: "Quanto tempo preciso deixar o carro?",
    answer: "Uma lavagem detalhada leva, em média, de 2 a 3 horas. Higienizações e polimentos podem ocupar boa parte do dia. A vitrificação costuma precisar de 1 a 2 dias, considerando preparação e cura. O prazo exato é combinado após a avaliação.",
  },
  {
    question: "A vitrificação substitui a lavagem?",
    answer: "Não. Ela cria uma camada protetora que facilita a manutenção, mas a lavagem correta continua essencial. Também não torna a pintura imune a riscos. A durabilidade depende do produto, da preparação e dos cuidados posteriores.",
  },
  {
    question: "O orçamento online é o valor final?",
    answer: "O simulador apresenta uma estimativa inicial pelo serviço e pelo porte do veículo. O estado da pintura, dos materiais e a necessidade de etapas extras são avaliados antes da confirmação. Nenhum serviço adicional deve ser feito sem a sua aprovação.",
  },
  {
    question: "Como funciona o agendamento?",
    answer: "Monte sua estimativa e compartilhe o resumo pelo WhatsApp para conversar com o estúdio. O serviço, o valor final e a data são confirmados diretamente no atendimento. O simulador não reserva horários automaticamente.",
  },
];

const VEHICLES = [
  { id: "compact", label: "Hatch", factor: 1 },
  { id: "sedan", label: "Sedã / cupê", factor: 1.15 },
  { id: "suv", label: "SUV / picape", factor: 1.35 },
];

const NAV_LINKS = [
  { label: "Serviços", target: "servicos" },
  { label: "Detalhes", target: "detalhes" },
  { label: "O estúdio", target: "estudio" },
  { label: "Dúvidas", target: "duvidas" },
];

const DRAFT_KEY = "luxure-estimate-v1";
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");
const money = (amount: number) => new Intl.NumberFormat("pt-BR", {
  style: "currency", currency: "BRL", maximumFractionDigits: 0,
}).format(amount);
const motionBehavior = (): ScrollBehavior => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

function readDraft() {
  const defaults = { service: "ceramic", vehicle: "compact", model: "" };
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (!saved || typeof saved !== "object") return defaults;
    return {
      service: SERVICES.some((item) => item.id === saved.service) ? saved.service as string : defaults.service,
      vehicle: VEHICLES.some((item) => item.id === saved.vehicle) ? saved.vehicle as string : defaults.vehicle,
      model: typeof saved.model === "string" ? saved.model.slice(0, 64) : "",
    };
  } catch {
    return defaults;
  }
}

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M12 3h7l-7 22h17l-2 6H3L12 3Zm13 0h7l-5 16h-7l5-16Z" />
    </svg>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a className="brand" href="#inicio" onClick={onClick} aria-label="Luxure, voltar ao início">
      <BrandMark />
      <span>luxure<span className="brand-dot">.</span></span>
    </a>
  );
}

function Modal({ children, labelId, className = "", onClose }: {
  children: ReactNode; labelId: string; className?: string; onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelId}
      className={`modal ${className}`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="modal-surface">
        {children}
        <button className="icon-button modal-close" aria-label="Fechar janela" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </dialog>
  );
}

function QuoteBuilder({ initialService }: { initialService?: string }) {
  const [draft] = useState(readDraft);
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(initialService || draft.service);
  const [vehicleId, setVehicleId] = useState(draft.vehicle);
  const [model, setModel] = useState(draft.model);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(1);
  const service = SERVICES.find((item) => item.id === serviceId) || SERVICES[0];
  const vehicle = VEHICLES.find((item) => item.id === vehicleId) || VEHICLES[0];
  const estimate = Math.ceil(service.price * vehicle.factor / 10) * 10;

  // Persist only vehicle preferences; names and personal notes stay in memory.
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ service: serviceId, vehicle: vehicleId, model }));
    } catch { /* The quote also works when browser storage is unavailable. */ }
  }, [serviceId, vehicleId, model]);

  useEffect(() => {
    if (previousStep.current !== step) {
      headingRef.current?.focus();
      headingRef.current?.closest(".modal")?.scrollTo({ top: 0, behavior: "instant" });
      previousStep.current = step;
    }
  }, [step]);

  const quoteText = [
    "Olá! Gostaria de conversar sobre um cuidado Luxure.",
    name.trim() ? `Nome: ${name.trim()}` : "",
    `Veículo: ${model.trim()} (${vehicle.label})`,
    `Serviço: ${service.title}`,
    `Estimativa inicial: a partir de ${money(estimate)}`,
    `Tempo estimado: ${service.duration}`,
    note.trim() ? `Observações: ${note.trim()}` : "",
    "",
    "Estimativa ilustrativa, sujeita à avaliação. Não representa agendamento ou contratação.",
  ].filter((line, index) => line || index > 5).join("\n");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 2 && model.trim().length < 2) {
      setError("Informe a marca e o modelo do seu carro.");
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, 3));
  };

  const downloadQuote = () => {
    const blob = new Blob(["\uFEFF", quoteText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "luxure-orcamento.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopyStatus("Resumo copiado. Pronto para compartilhar.");
    } catch {
      setCopyStatus("Não foi possível copiar. Você pode baixar o resumo.");
    }
  };

  const titles = ["Qual cuidado o seu carro merece?", "Conte um pouco sobre ele.", "Seu cuidado, do seu jeito."];
  return (
    <div className="quote-builder">
      <div className="quote-topline">
        <span className="eyebrow">LUXURE / SEU ORÇAMENTO</span>
        <span className="step-count">0{step} <span>/ 03</span></span>
      </div>
      <div className="quote-progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Etapa ${step} de 3`}>
        <span style={{ width: `${step / 3 * 100}%` }} />
      </div>
      <h2 id="quote-title" ref={headingRef} tabIndex={-1}>{titles[step - 1]}</h2>
      <p className="quote-intro">
        {step === 1 && "Um primeiro passo para colocar seu carro em outro nível."}
        {step === 2 && "Só o essencial para uma estimativa sob medida."}
        {step === 3 && "Uma primeira estimativa. Sem compromisso."}
      </p>

      {step < 3 ? (
        <form onSubmit={submit}>
          {step === 1 ? (
            <div className="quote-step" key="care">
              <fieldset className="service-choices">
                <legend className="field-label">Escolha o cuidado</legend>
                {SERVICES.map((item) => (
                  <label key={item.id} className={`service-choice ${serviceId === item.id ? "selected" : ""}`}>
                    <input className="sr-only" type="radio" name="service" value={item.id} checked={serviceId === item.id} onChange={() => setServiceId(item.id)} />
                    <span className="radio-indicator">{serviceId === item.id && <Check size={12} />}</span>
                    <span className="choice-name">{item.title}<small>{item.duration}</small></span>
                    <span className="choice-price"><small>a partir de</small>{money(item.price)}</span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="vehicle-choices">
                <legend className="field-label">Qual é o porte do seu carro?</legend>
                <div className="vehicle-options">
                  {VEHICLES.map((item) => (
                    <label key={item.id} className={vehicleId === item.id ? "selected" : ""}>
                      <input className="sr-only" type="radio" name="vehicle" checked={vehicleId === item.id} onChange={() => setVehicleId(item.id)} />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : (
            <div className="quote-step quote-fields" key="vehicle">
              <label className="form-field">
                <span className="field-label">Marca e modelo <span aria-hidden="true">*</span></span>
                <input required minLength={2} maxLength={64} autoComplete="off" placeholder="Ex.: Porsche 911, Honda Civic..." value={model} onChange={(event) => { setModel(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "quote-error" : undefined} />
              </label>
              <label className="form-field">
                <span className="field-label">Como podemos chamar você? <small>Opcional</small></span>
                <input maxLength={60} autoComplete="given-name" placeholder="Seu primeiro nome" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label className="form-field">
                <span className="field-label">Algum detalhe importante? <small>Opcional</small></span>
                <textarea rows={3} maxLength={400} placeholder="Conte o que você gostaria de melhorar no seu carro." value={note} onChange={(event) => setNote(event.target.value)} />
              </label>
              <p className="form-note">Nada é enviado automaticamente. Você poderá revisar e compartilhar o resumo na próxima etapa.</p>
            </div>
          )}
          {error && <p id="quote-error" className="form-error" role="alert">{error}</p>}
          <div className="quote-actions">
            {step === 2 && <button className="icon-button back-button" type="button" aria-label="Voltar para a escolha do cuidado" onClick={() => setStep(1)}><ArrowLeft size={19} /></button>}
            <button className="button button-dark" type="submit">{step === 1 ? "Continuar" : "Ver minha estimativa"}<ArrowRight size={17} /></button>
          </div>
          <p className="quote-fineprint">Sem cadastro. Sem compromisso. Do seu jeito.</p>
        </form>
      ) : (
        <div className="quote-step quote-summary">
          <div className="estimate-price">
            <span>Investimento estimado, a partir de</span>
            <strong>{money(estimate)}</strong>
            <small>Valor final definido após avaliação do veículo.</small>
          </div>
          <dl className="estimate-details">
            <div><dt>Cuidado</dt><dd>{service.title}</dd></div>
            <div><dt>Seu carro</dt><dd>{model.trim()}</dd></div>
            <div><dt>Porte</dt><dd>{vehicle.label}</dd></div>
            <div><dt>Tempo previsto</dt><dd>{service.duration}</dd></div>
            {name.trim() && <div><dt>Preparado para</dt><dd>{name.trim()}</dd></div>}
          </dl>
          {note.trim() && <p className="summary-note"><strong>Sua observação</strong>{note.trim()}</p>}
          <a className="button button-dark whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(quoteText)}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} />
            {WHATSAPP_NUMBER ? "Enviar para a Luxure" : "Compartilhar no WhatsApp"}
            <ArrowUpRight size={17} />
          </a>
          <p className="share-disclaimer">{WHATSAPP_NUMBER ? "O serviço e a data serão confirmados no atendimento." : "Escolha o contato do estúdio no WhatsApp. Nenhuma reserva é feita automaticamente."}</p>
          <div className="summary-tools">
            <button onClick={copyQuote}><Copy size={15} />Copiar</button>
            <button onClick={downloadQuote}><Download size={15} />Baixar resumo</button>
          </div>
          <p className="copy-status" role="status">{copyStatus}</p>
          <button className="edit-estimate" onClick={() => { setStep(1); setCopyStatus(""); }}><ArrowLeft size={15} />Ajustar meu orçamento</button>
        </div>
      )}
    </div>
  );
}

function WorkGallery({ onOpen }: { onOpen: (index: number) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, canBack: false, canNext: true });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const first = rail.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      setPosition({
        index: Math.round(rail.scrollLeft / ((first?.offsetWidth || 1) + gap)),
        canBack: rail.scrollLeft > 4,
        canNext: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
      });
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    return () => { rail.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const move = (direction: number) => {
    const rail = railRef.current;
    const item = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !item) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: motionBehavior() });
  };

  return (
    <section className="work-section" id="detalhes" aria-labelledby="work-title">
      <div className="container">
        <div className="work-heading reveal">
          <div>
            <p className="eyebrow"><span />O EXTRAORDINÁRIO ESTÁ AQUI</p>
            <h2 id="work-title" className="section-title">A diferença está<br />nos detalhes.</h2>
          </div>
          <div className="work-controls">
            <span className="gallery-counter" aria-live="polite">0{position.index + 1}<span> / 04</span></span>
            <button className="icon-button" onClick={() => move(-1)} disabled={!position.canBack} aria-label="Ver fotos anteriores"><ChevronLeft size={19} /></button>
            <button className="icon-button" onClick={() => move(1)} disabled={!position.canNext} aria-label="Ver próximas fotos"><ChevronRight size={19} /></button>
          </div>
        </div>
        <div ref={railRef} className="gallery-rail reveal" aria-label="Galeria de detalhes automotivos">
          {PROJECTS.map((project, index) => (
            <button key={project.title} className="project" onClick={() => onOpen(index)} aria-label={`Ampliar: ${project.title}`}>
              <span className="project-image"><img src={project.image} alt={project.alt} loading="lazy" decoding="async" width={800} height={1200} draggable={false} /></span>
              <span className="project-category">{project.category}</span>
              <span className="project-title">{project.title}<ArrowUpRight size={20} /></span>
            </button>
          ))}
        </div>
        <div className="gallery-bottom"><span>O cuidado é nosso. A presença é sua.</span><small>Fotografias ilustrativas.</small></div>
      </div>
    </section>
  );
}

function PrivacyContent() {
  const [cleared, setCleared] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="privacy-content">
      <p className="eyebrow">PRIVACIDADE</p>
      <h2 id="privacy-title">Seus dados.<br />Seu controle.</h2>
      <p>O simulador funciona no seu navegador. O serviço escolhido, o porte e o modelo do carro podem ser salvos localmente para você continuar depois.</p>
      <p>Seu nome e suas observações não são salvos no rascunho. Nenhum pedido, pagamento ou agendamento é enviado ao preencher o formulário.</p>
      <p>Ao compartilhar, o WhatsApp recebe o texto do orçamento e permite que você envie a mensagem. Fontes e algumas fotografias são carregadas do Google Fonts e do Pexels.</p>
      <button className="button button-dark" onClick={() => {
        try { localStorage.removeItem(DRAFT_KEY); setCleared(true); setError(false); }
        catch { setError(true); }
      }}>{cleared ? "Rascunho removido" : "Apagar meu rascunho"}{cleared ? <Check size={17} /> : <ArrowRight size={17} />}</button>
      <p className="privacy-status" role="status">{cleared ? "Suas escolhas locais foram apagadas deste navegador." : error ? "O armazenamento está indisponível neste navegador." : ""}</p>
    </div>
  );
}

export default function App() {
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dialog, setDialog] = useState<"menu" | "quote" | "project" | "privacy" | null>(null);
  const [quoteService, setQuoteService] = useState<string | undefined>();
  const [projectIndex, setProjectIndex] = useState(0);
  const [showDock, setShowDock] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const project = PROJECTS[projectIndex];

  useEffect(() => {
    const items = rootRef.current?.querySelectorAll(".reveal") || [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const heroObserver = new IntersectionObserver(([entry]) => setShowDock(entry.intersectionRatio < 0.12), { threshold: [0, 0.12] });
    const contactObserver = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0 });
    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (contactRef.current) contactObserver.observe(contactRef.current);
    return () => { heroObserver.disconnect(); contactObserver.disconnect(); };
  }, []);

  const openQuote = (service?: string) => {
    setQuoteService(service);
    setDialog("quote");
  };

  const navigate = (target: string) => {
    setDialog(null);
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: motionBehavior() }));
  };

  const moveProject = (direction: number) => setProjectIndex((index) => (index + direction + PROJECTS.length) % PROJECTS.length);
  const dockVisible = showDock && !contactVisible && dialog === null;

  return (
    <div ref={rootRef} className="site">
      <a className="skip-link" href="#servicos">Pular para o conteúdo</a>
      <main>
        <section className="hero" id="inicio" ref={heroRef} aria-labelledby="hero-title">
          <picture className="hero-visual">
            <source media="(max-width: 640px)" srcSet="/images/luxure-hero-mobile.jpg" />
            <img src="/images/luxure-hero.jpg" alt="Porsche prateado em um estúdio escuro, com pintura impecável refletida no piso" fetchPriority="high" width={1536} height={1024} />
          </picture>
          <header className="site-header container">
            <Brand />
            <nav className="desktop-nav" aria-label="Navegação principal">
              {NAV_LINKS.map((link) => <a key={link.target} href={`#${link.target}`}>{link.label}</a>)}
            </nav>
            <button className="header-quote" onClick={() => openQuote()}>Solicitar orçamento<ArrowUpRight size={15} /></button>
            <button className="mobile-menu-button" aria-label="Abrir menu de navegação" aria-haspopup="dialog" onClick={() => setDialog("menu")}><span>Menu</span><Menu size={21} /></button>
          </header>
          <div className="hero-content container">
            <p className="hero-category hero-enter">ESTÉTICA AUTOMOTIVA, REDEFINIDA.</p>
            <h1 id="hero-title" className="hero-enter hero-title">
              <span className="hero-wordmark">luxure<span>.</span></span>
              <span className="hero-promise">Seu carro. Em outro nível.</span>
            </h1>
            <p className="hero-description hero-enter">Cuidado de verdade, do primeiro olhar<br className="mobile-break" /> ao último detalhe.</p>
            <div className="hero-actions hero-enter">
              <button className="button button-light" onClick={() => openQuote()}>Quero cuidar do meu carro<ArrowUpRight size={18} /></button>
              <a className="hero-services-link" href="#servicos">Explorar serviços<ArrowDown size={15} /></a>
            </div>
          </div>
        </section>

        <section className="services-section container section-space" id="servicos" aria-labelledby="services-title">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow"><span />CUIDADO SOB MEDIDA</p>
              <h2 className="section-title" id="services-title">Muito além<br />de uma lavagem.</h2>
            </div>
            <p className="section-intro">Cada carro tem uma história. A nossa especialidade é cuidar de cada detalhe para que a sua continue impecável.</p>
          </div>
          <div className="service-layout">
            <div className="service-list reveal">
              {SERVICES.map((service, index) => {
                const isOpen = activeService === index;
                return (
                  <div className={`service-item ${isOpen ? "active" : ""}`} key={service.id}>
                    <h3>
                      <button id={`service-trigger-${service.id}`} aria-expanded={isOpen} aria-controls={`service-panel-${service.id}`} onClick={() => setActiveService(index)}>
                        <span className="service-number">0{index + 1}</span>
                        <span className="service-name">{service.title}</span>
                        <Plus size={19} className="service-plus" />
                      </button>
                    </h3>
                    <div className={`accordion-panel ${isOpen ? "open" : ""}`} id={`service-panel-${service.id}`} role="region" aria-labelledby={`service-trigger-${service.id}`} aria-hidden={!isOpen} inert={!isOpen}>
                      <div className="accordion-inner">
                        <div className="service-body">
                          <p>{service.description}</p>
                          <div className="service-meta"><span>A partir de <strong>{money(service.price)}</strong></span><span>{service.duration}</span></div>
                          <button className="text-link" onClick={() => openQuote(service.id)}>Quero esse cuidado<ArrowUpRight size={17} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="service-footnote">Um serviço de cada vez. Atenção por inteiro.</p>
            </div>
            <figure className="service-figure reveal">
              <div className="service-photo"><img key={SERVICES[activeService].image} src={SERVICES[activeService].image} alt={SERVICES[activeService].alt} loading="lazy" decoding="async" width={800} height={1000} /></div>
              <figcaption><span>{SERVICES[activeService].caption}</span><BrandMark /></figcaption>
            </figure>
          </div>
        </section>

        <WorkGallery onOpen={(index) => { setProjectIndex(index); setDialog("project"); }} />

        <section className="studio-section container section-space" id="estudio" aria-labelledby="studio-title">
          <figure className="studio-figure reveal">
            <img src="https://images.pexels.com/photos/6872595/pexels-photo-6872595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Carro preto em um estúdio iluminado de detalhamento automotivo" width={1200} height={800} loading="lazy" decoding="async" />
            <figcaption>Técnica, tempo e atenção. Sem atalhos.</figcaption>
          </figure>
          <div className="studio-content reveal">
            <p className="eyebrow"><span />O JEITO LUXURE</p>
            <h2 className="section-title" id="studio-title">Para nós,<br />nunca é só um carro.</h2>
            <p>A gente entende o olhar de quem estaciona e olha para trás mais uma vez. Por isso, tratamos o seu carro com a mesma paixão que você tem por ele.</p>
            <ol className="studio-principles">
              <li><span>01</span>Ouvimos antes de recomendar.</li>
              <li><span>02</span>Cuidamos, sem apressar o processo.</li>
              <li><span>03</span>Entregamos atenção em cada detalhe.</li>
            </ol>
            <button className="text-link" onClick={() => openQuote()}>Conheça o cuidado Luxure<ArrowUpRight size={17} /></button>
          </div>
        </section>

        <section className="faq-section" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-intro reveal">
              <p className="eyebrow"><span />SEM FICAR NA DÚVIDA</p>
              <h2 className="section-title" id="faq-title">Antes de<br />deixar as chaves.</h2>
              <p>Transparência também faz<br />parte do nosso cuidado.</p>
            </div>
            <div className="faq-list reveal">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? "active" : ""}`} key={faq.question}>
                    <h3><button id={`faq-trigger-${index}`} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}><span>{faq.question}</span><Plus size={19} /></button></h3>
                    <div className={`accordion-panel ${isOpen ? "open" : ""}`} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} aria-hidden={!isOpen} inert={!isOpen}>
                      <div className="accordion-inner"><p>{faq.answer}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato" ref={contactRef} aria-labelledby="contact-title">
          <div className="container contact-content reveal">
            <div>
              <p className="eyebrow"><span />O PRÓXIMO PASSO É SEU</p>
              <h2 id="contact-title">Seu carro merece.<br /><span>A Luxure cuida.</span></h2>
              <p>Vamos encontrar o cuidado certo para ele?</p>
            </div>
            <button className="button button-accent" onClick={() => openQuote()}>Montar meu orçamento<ArrowUpRight size={19} /></button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div><Brand /><p>Estética automotiva.<br />Cuidado em outro nível.</p></div>
            <nav aria-label="Navegação do rodapé"><a href="#servicos">Nossos cuidados</a><a href="#estudio">O estúdio</a><a href="#duvidas">Dúvidas frequentes</a></nav>
            <div className="footer-contact"><span>SEU TEMPO TAMBÉM IMPORTA.</span><p>Atendimento com hora marcada.</p><button onClick={() => openQuote()}>Vamos conversar<ArrowUpRight size={15} /></button></div>
          </div>
          <div className="footer-bottom"><p>© {new Date().getFullYear()} Luxure. Cada detalhe importa.</p><button onClick={() => setDialog("privacy")}>Privacidade</button><a href="#inicio">Voltar ao topo<ArrowUpRight size={13} /></a></div>
        </div>
      </footer>

      <div className={`mobile-dock ${dockVisible ? "visible" : ""}`} aria-hidden={!dockVisible} inert={!dockVisible}>
        <button className="button button-dark" onClick={() => openQuote()}><BrandMark />Solicitar orçamento<ArrowUpRight size={18} /></button>
      </div>

      {dialog === "menu" && (
        <Modal className="menu-modal" labelId="menu-title" onClose={() => setDialog(null)}>
          <div className="mobile-menu-content">
            <p id="menu-title" className="menu-wordmark">luxure<span>.</span></p>
            <p className="eyebrow">CUIDADO EM OUTRO NÍVEL.</p>
            <nav aria-label="Menu mobile">
              {NAV_LINKS.map((link, index) => <a href={`#${link.target}`} key={link.target} onClick={(event) => { event.preventDefault(); navigate(link.target); }}><span className="menu-link-number">0{index + 1}</span><span>{link.label}</span><ArrowUpRight size={24} /></a>)}
            </nav>
            <button className="button button-accent" onClick={() => openQuote()}>Solicitar orçamento<ArrowUpRight size={19} /></button>
            <p className="menu-note">Sem pressa. Sem atalhos. Sem deixar passar um detalhe.</p>
          </div>
        </Modal>
      )}

      {dialog === "quote" && <Modal className="quote-modal" labelId="quote-title" onClose={() => setDialog(null)}><QuoteBuilder initialService={quoteService} /></Modal>}

      {dialog === "project" && (
        <Modal className="project-modal" labelId="project-title" onClose={() => setDialog(null)}>
          <div className="project-modal-layout" onKeyDown={(event) => { if (event.key === "ArrowLeft") moveProject(-1); if (event.key === "ArrowRight") moveProject(1); }}>
            <div className="project-modal-image"><img key={project.image} src={project.image} alt={project.alt} /><div className="project-modal-controls"><button className="icon-button" onClick={() => moveProject(-1)} aria-label="Foto anterior"><ChevronLeft size={20} /></button><span aria-live="polite">0{projectIndex + 1} / 04</span><button className="icon-button" onClick={() => moveProject(1)} aria-label="Próxima foto"><ChevronRight size={20} /></button></div></div>
            <div className="project-modal-copy"><p className="eyebrow">{project.category}</p><h2 id="project-title">{project.title}</h2><p>{project.description}</p><button className="button button-dark" onClick={() => openQuote(project.service)}>Quero esse cuidado<ArrowUpRight size={18} /></button><small>Imagem ilustrativa. Cada veículo recebe uma avaliação individual.</small></div>
          </div>
        </Modal>
      )}

      {dialog === "privacy" && <Modal className="privacy-modal" labelId="privacy-title" onClose={() => setDialog(null)}><PrivacyContent /></Modal>}
    </div>
  );
}