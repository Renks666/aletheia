import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

export type HeroTone = {
  title: string;
  subtitle: string;
};

export type ExpertiseCard = {
  title: string;
  description: string;
  bullets: string[];
};

export type ProcessStep = {
  stage: string;
  title: string;
  description: string;
};

export type LandingCopy = {
  audienceLabels: Record<AudienceRole, string>;
  heroTitle: string;
  heroSubtitle: string;
  heroByRole: Record<AudienceRole, HeroTone>;
  heroImageAlt: string;
  companyStats: string[];
  trustBadges: string[];
  process: ProcessStep[];
  audienceIntro: string;
  servicesIntro: string;
  processIntro: string;
  proofIntro: string;
  expertiseTitle: string;
  expertiseIntro: string;
  expertiseCards: ExpertiseCard[];
  expertiseCtaLabel: string;
  serviceTrackLabel: string;
  serviceSegmentLabel: string;
  caseTag: string;
  aboutTitle: string;
  aboutText: string;
  proofTitle: string;
  servicesTitle: string;
  processTitle: string;
  faqTitle: string;
};

const ruCopy: LandingCopy = {
  audienceLabels: {
    player: "Игрок",
    club: "Клуб",
    agent: "Агент",
    coach: "Тренер",
    parent: "Родитель",
  },
  heroTitle: "Юридическая защита в профессиональном футболе: от контракта до арбитража",
  heroSubtitle:
    "Сопровождаем игроков, клубы, агентов, тренеров и семьи спортсменов в спорах, переговорах и регуляторных вопросах.",
  heroByRole: {
    player: {
      title: "Юридическая защита карьеры профессионального футболиста",
      subtitle:
        "Берем на себя споры, контракты и дисциплинарные дела, чтобы вы концентрировались на игре.",
    },
    club: {
      title: "Стратегическая правовая поддержка футбольных клубов",
      subtitle:
        "Управляем регуляторными и договорными рисками, защищаем интересы клуба в национальных и международных юрисдикциях.",
    },
    agent: {
      title: "Правовая устойчивость агентских сделок",
      subtitle:
        "Сопровождаем агентские соглашения, комиссии и трансферные процессы с полной юридической прозрачностью.",
    },
    coach: {
      title: "Юридическая защита тренерских контрактов и репутации",
      subtitle:
        "Поддерживаем в трудовых и дисциплинарных вопросах, формируем сильную переговорную позицию.",
    },
    parent: {
      title: "Безопасная правовая траектория юного футболиста",
      subtitle:
        "Защищаем интересы семьи при выборе академии, заключении договоров и развитии спортивной карьеры.",
    },
  },
  heroImageAlt: "Вертикальный логотип Алетейя",
  companyStats: [
    "10+ лет в футбольном праве",
    "500+ дел в профильных инстанциях",
    "До 95% успешности по завершенным кейсам",
  ],
  trustBadges: [
    "Работаем в рамках регламентов РФС / UEFA / FIFA / CAS",
    "Анонимизированная публикация кейсов",
    "Конфиденциальный контур сопровождения",
  ],
  audienceIntro:
    "Персонализируйте экран под вашу роль, чтобы увидеть релевантный фокус сопровождения и приоритетные направления.",
  servicesIntro:
    "Ключевые услуги сфокусированы на контрактной стабильности, защите прав игроков и процессах в юрисдикциях РФС, FIFA, UEFA и CAS.",
  processIntro:
    "Процесс включает досудебную фиксацию нарушений, стратегию позиции и контроль исполнения решений в спортивной юрисдикции.",
  proofIntro:
    "В кейсах используются только анонимизированные формулировки, отражающие типовые паттерны из практики: задолженность, дискриминация, спорные расторжения.",
  expertiseTitle: "Экспертный фокус: существенные нарушения и защита футболиста",
  expertiseIntro:
    "Краткая рамка по теме выступления ЮФМ 2024: когда нарушение клуба может считаться существенным и как действовать процессуально корректно.",
  expertiseCards: [
    {
      title: "Что относится к существенному нарушению",
      description:
        "В спортивной практике ключевыми триггерами чаще всего выступают системные финансовые и статусные нарушения со стороны клуба.",
      bullets: [
        "Задолженность по выплатам на уровне 2+ средних месячных заработков",
        "Невключение игрока 18+ в заявку без законных оснований",
        "Дискриминационные условия подготовки и иные совокупные нарушения",
      ],
    },
    {
      title: "Алгоритм действий игрока или тренера",
      description:
        "Основной риск снижается дисциплиной процедуры: претензия, срок на устранение, затем обращение в Палату по разрешению споров.",
      bullets: [
        "Претензия в клуб с фиксацией нарушения и намерения расторгнуть договор",
        "Ожидание претензионного срока: обычно 10 или 30 календарных дней",
        "Расторжение на основании установленного нарушения и процессуальных документов",
      ],
    },
    {
      title: "Компенсация и ключевые риски",
      description:
        "При ошибке в квалификации оснований инициатор расторжения может стать нарушившей стороной с финансовыми и дисциплинарными последствиями.",
      bullets: [
        "Размер компенсации зависит от договора и критериев Палаты",
        "При отсутствии фиксированной суммы ориентиром служит минимум 3 средних заработка",
        "Неверная стратегия может привести к санкциям в защищенный период",
      ],
    },
  ],
  expertiseCtaLabel: "Разобрать ситуацию с юристом",
  serviceTrackLabel: "Правовой трек",
  serviceSegmentLabel: "сегмента",
  caseTag: "Кейс",
  process: [
    {
      stage: "Тайм 1",
      title: "Бриф и первичная квалификация",
      description: "Фиксируем факты, документы, дедлайны и процессуальные риски.",
    },
    {
      stage: "Тайм 2",
      title: "Правовая стратегия",
      description: "Выстраиваем позицию, сценарии и тактику на краткосрочный и долгосрочный горизонт.",
    },
    {
      stage: "Тайм 3",
      title: "Представительство",
      description: "Ведем переговоры и защищаем интересы в органах, комиссиях и арбитраже.",
    },
    {
      stage: "Тайм 4",
      title: "Контроль исполнения",
      description: "Закрепляем результат, контролируем документы, платежи и юридические обязательства.",
    },
  ],
  aboutTitle: "Сильная правовая позиция в мире профессионального футбола",
  aboutText:
    "С 2014 года Алетейя ведет профильные футбольные дела и сопровождает игроков, тренеров, агентов и клубы в чувствительных спорах. Мы работаем коротко, предметно и с процессуальным контролем на каждом этапе.",
  proofTitle: "Портфель анонимизированных кейсов",
  servicesTitle: "Ключевые направления",
  processTitle: "4 тайма правовой защиты",
  faqTitle: "Ответы на ключевые вопросы",
};

const enCopy: LandingCopy = {
  audienceLabels: {
    player: "Player",
    club: "Club",
    agent: "Agent",
    coach: "Coach",
    parent: "Parent",
  },
  heroTitle: "Legal defense in professional football: from contracts to arbitration",
  heroSubtitle:
    "We support players, clubs, agents, coaches and families in disputes, negotiations and regulatory matters.",
  heroByRole: {
    player: {
      title: "Legal defense for a professional football career",
      subtitle:
        "We handle disputes, contracts and disciplinary matters so you can stay focused on performance.",
    },
    club: {
      title: "Strategic legal support for football clubs",
      subtitle:
        "We manage regulatory and contractual risk and represent club interests in domestic and international forums.",
    },
    agent: {
      title: "Legal resilience for agency deals",
      subtitle:
        "We support agency agreements, commissions and transfer processes with full legal clarity.",
    },
    coach: {
      title: "Legal protection of coaching contracts and reputation",
      subtitle:
        "We support labor and disciplinary matters while strengthening negotiation leverage.",
    },
    parent: {
      title: "Safe legal trajectory for young football talents",
      subtitle:
        "We protect family interests in academy agreements, player rights and long-term career development.",
    },
  },
  heroImageAlt: "Aletheia vertical logo (RU wordmark)",
  companyStats: [
    "10+ years in football law",
    "500+ cases across key forums",
    "Up to 95% success rate on closed matters",
  ],
  trustBadges: [
    "Operating within RFU / UEFA / FIFA / CAS frameworks",
    "Anonymized case storytelling",
    "Confidential advisory workflow",
  ],
  audienceIntro:
    "Switch your role to view the most relevant legal focus and priority service tracks for your profile.",
  servicesIntro:
    "Core services are focused on contractual stability, player rights protection and proceedings before RFU, FIFA, UEFA and CAS forums.",
  processIntro:
    "Our workflow combines pre-dispute evidence discipline, legal strategy and execution control across football dispute mechanisms.",
  proofIntro:
    "Case summaries remain anonymized while reflecting real dispute patterns: overdue payments, discriminatory treatment and contested terminations.",
  expertiseTitle: "Expert Focus: Material Breaches and Player Protection",
  expertiseIntro:
    "A concise framework based on UFM 2024: when a club breach may qualify as material and how to proceed without procedural errors.",
  expertiseCards: [
    {
      title: "What is treated as a material breach",
      description:
        "In football dispute practice, the most frequent triggers are systemic financial defaults and status-related violations by clubs.",
      bullets: [
        "Overdue pay obligations at 2+ average monthly salaries",
        "Failure to register an 18+ player without lawful grounds",
        "Discriminatory training regime or a cumulative pattern of serious breaches",
      ],
    },
    {
      title: "Action path for player or coach",
      description:
        "Risk is reduced by procedural discipline: formal notice, cure period, then filing to the RFU dispute resolution chamber.",
      bullets: [
        "Serve a formal notice describing the breach and intent to terminate",
        "Observe the cure period, typically 10 or 30 calendar days",
        "Terminate only on a procedurally defensible basis with supporting records",
      ],
    },
    {
      title: "Compensation and key risks",
      description:
        "If legal grounds are misqualified, the terminating party may be treated as the breaching side with financial and sporting consequences.",
      bullets: [
        "Compensation is assessed under contract terms and chamber criteria",
        "If not fixed in contract, the minimum benchmark is often 3 monthly salaries",
        "Incorrect strategy may trigger sanctions within a protected period",
      ],
    },
  ],
  expertiseCtaLabel: "Discuss your situation with counsel",
  serviceTrackLabel: "Legal track",
  serviceSegmentLabel: "segments",
  caseTag: "Case study",
  process: [
    {
      stage: "Half 1",
      title: "Briefing and qualification",
      description: "We capture facts, documents, deadlines and procedural risks.",
    },
    {
      stage: "Half 2",
      title: "Legal strategy",
      description: "We design legal position, scenarios and tactical options for each horizon.",
    },
    {
      stage: "Half 3",
      title: "Representation",
      description: "We represent your interests in negotiations, committees and arbitration.",
    },
    {
      stage: "Half 4",
      title: "Execution control",
      description: "We lock in outcomes and supervise documents, payments and obligations.",
    },
  ],
  aboutTitle: "Strong legal positioning in professional football",
  aboutText:
    "Since 2014, Aletheia has run football-focused legal mandates for players, coaches, agents and clubs in high-risk disputes. We operate with concise communication, procedural rigor and measurable outcomes.",
  proofTitle: "Anonymized case portfolio",
  servicesTitle: "Core legal practices",
  processTitle: "4 halves of legal defense",
  faqTitle: "Frequently asked questions",
};

export function getLandingCopy(locale: Locale): LandingCopy {
  return locale === "en" ? enCopy : ruCopy;
}

