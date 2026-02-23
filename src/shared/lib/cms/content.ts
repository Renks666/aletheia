import type {Locale} from "@/shared/lib/i18n/types";

import {fetchStrapiCollection} from "./client";
import type {CaseItem, FaqItem, LandingCmsContent, ServiceItem} from "./types";

const fallbackContent: Record<Locale, LandingCmsContent> = {
  ru: {
    services: [
      {
        slug: "rfs-disputes",
        title: "Споры в юрисдикции РФС",
        summary:
          "Представительство в Палате и иных органах РФС по трудовым и регламентным спорам в футболе.",
        audience: ["player", "club", "coach"],
        order: 1,
      },
      {
        slug: "uefa-fifa-cas",
        title: "UEFA, FIFA, CAS",
        summary:
          "Международные дисциплинарные и контрактные споры с единой стратегией от подачи до обжалования.",
        audience: ["player", "club", "agent"],
        order: 2,
      },
      {
        slug: "transfers-contracts",
        title: "Трансферы и договоры",
        summary:
          "Подготовка и проверка контрактов, переговорная защита и снижение рисков досрочного расторжения.",
        audience: ["player", "club", "agent", "parent"],
        order: 3,
      },
      {
        slug: "licensing-compliance",
        title: "Лицензирование и комплаенс",
        summary:
          "Аудит клубных и агентских процедур на соответствие нормам РФС, FIFA и внутренним актам.",
        audience: ["club", "agent", "coach"],
        order: 4,
      },
      {
        slug: "disciplinary-defense",
        title: "Дисциплинарная защита",
        summary:
          "Защита в вопросах спортивных санкций, восстановление процессуальных прав и репутационное сопровождение.",
        audience: ["player", "coach", "club"],
        order: 5,
      },
      {
        slug: "academy-parents",
        title: "Сопровождение юных футболистов",
        summary:
          "Правовая поддержка семей и академий: договоры, права несовершеннолетних и переходные решения.",
        audience: ["parent", "player"],
        order: 6,
      },
    ],
    cases: [
      {
        title: "Анонимизированный кейс: задолженность по заработной плате",
        challenge:
          "Клуб допустил накопленную просрочку по регулярным выплатам свыше двух средних месячных заработков.",
        result:
          "Требования игрока подтверждены, получено решение о выплате задолженности и компенсации.",
        metrics: ["2+ средних заработка подтверждены", "Платежный график зафиксирован"],
        isAnonymized: true,
      },
      {
        title: "Анонимизированный кейс: дискриминационные условия подготовки",
        challenge:
          "Игрок был выведен из общего тренировочного процесса при формально действующем контракте.",
        result:
          "Собрана процессуальная база, позиция усилена в претензионном и юрисдикционном порядке.",
        metrics: ["Документированная позиция по срокам", "Снижен риск санкций для игрока"],
        isAnonymized: true,
      },
      {
        title: "Анонимизированный кейс: спор о досрочном расторжении",
        challenge:
          "Требовалось подтвердить уважительные причины расторжения и избежать статуса нарушившей стороны.",
        result:
          "Выстроена стратегия расторжения через претензию и Палату с учетом сроков и финансовых рисков.",
        metrics: ["Процедура 10/30 дней соблюдена", "Компенсационный риск минимизирован"],
        isAnonymized: true,
      },
    ],
    faq: [
      {
        question: "С какими категориями дел вы работаете?",
        answer:
          "Сопровождаем споры в РФС, FIFA, UEFA и CAS, а также трансферы, договоры, лицензирование и дисциплинарные процедуры.",
        locale: "ru",
        order: 1,
      },
      {
        question: "Что в практике чаще признают существенным нарушением клуба?",
        answer:
          "Чаще всего это задолженность по выплатам, дискриминационный режим подготовки и спорный статус игрока в заявке.",
        locale: "ru",
        order: 2,
      },
      {
        question: "Как действовать при признаках существенного нарушения?",
        answer:
          "Обычно начинаем с письменной претензии, фиксируем сроки устранения и при необходимости обращаемся в Палату.",
        locale: "ru",
        order: 3,
      },
      {
        question: "Можно ли обратиться, если спор уже начался?",
        answer:
          "Да. Подключаемся на любой стадии и формируем стратегию с учетом сроков и рисков.",
        locale: "ru",
        order: 4,
      },
      {
        question: "Как соблюдается конфиденциальность?",
        answer:
          "Информация обрабатывается в закрытом контуре, публичные кейсы публикуются только в анонимизированном виде.",
        locale: "ru",
        order: 5,
      },
      {
        question: "Вы работаете только по России?",
        answer:
          "Базовая юрисдикция - Россия и постсоветское пространство, также сопровождаем международные кейсы с участием FIFA, UEFA и CAS.",
        locale: "ru",
        order: 6,
      },
      {
        question: "Сколько занимает первичный разбор?",
        answer:
          "Первичная правовая оценка обычно дается в день обращения при наличии базовых документов.",
        locale: "ru",
        order: 7,
      },
      {
        question: "Какие форматы взаимодействия доступны?",
        answer:
          "Очно, онлайн и в гибридном формате. Для срочных вопросов используем защищенные каналы и ускоренный SLA.",
        locale: "ru",
        order: 8,
      },
    ],
  },
  en: {
    services: [
      {
        slug: "rfu-disputes",
        title: "RFU Disputes",
        summary:
          "Representation before RFU dispute bodies in football labor and regulatory conflicts.",
        audience: ["player", "club", "coach"],
        order: 1,
      },
      {
        slug: "uefa-fifa-cas",
        title: "UEFA, FIFA, CAS",
        summary:
          "International disciplinary and contractual disputes with end-to-end strategy and appeal support.",
        audience: ["player", "club", "agent"],
        order: 2,
      },
      {
        slug: "transfers-contracts",
        title: "Transfers and Contracts",
        summary:
          "Contract drafting, negotiation protection and early risk control for transfer and employment terms.",
        audience: ["player", "club", "agent", "parent"],
        order: 3,
      },
      {
        slug: "licensing-compliance",
        title: "Licensing and Compliance",
        summary:
          "Compliance review of club and agency workflows under RFU, FIFA and internal football regulations.",
        audience: ["club", "agent", "coach"],
        order: 4,
      },
      {
        slug: "disciplinary-defense",
        title: "Disciplinary Defense",
        summary:
          "Defense against sporting sanctions with procedural recovery and reputation-sensitive support.",
        audience: ["player", "coach", "club"],
        order: 5,
      },
      {
        slug: "academy-parents",
        title: "Youth Football Legal Support",
        summary:
          "Legal support for families and academies: agreements, minor rights and lawful transition pathways.",
        audience: ["parent", "player"],
        order: 6,
      },
    ],
    cases: [
      {
        title: "Anonymized case: overdue salary obligations",
        challenge:
          "The club accumulated overdue regular payments above the threshold of two average monthly salaries.",
        result:
          "Player claims were confirmed, with debt and compensation parameters fixed for execution.",
        metrics: ["2+ monthly salary threshold confirmed", "Payment execution schedule secured"],
        isAnonymized: true,
      },
      {
        title: "Anonymized case: discriminatory training regime",
        challenge:
          "The player was excluded from the main training process while the employment contract remained active.",
        result:
          "A defensible evidentiary file was built for notice and chamber-level positioning within deadlines.",
        metrics: ["Timeline-proofed evidence package", "Sanction exposure reduced"],
        isAnonymized: true,
      },
      {
        title: "Anonymized case: early termination dispute",
        challenge:
          "The mandate required proving just cause and avoiding breach-side qualification.",
        result:
          "Termination strategy was built through formal notice and chamber pathway with compensation risk control.",
        metrics: ["10/30 day procedural window observed", "Compensation risk minimized"],
        isAnonymized: true,
      },
    ],
    faq: [
      {
        question: "What disputes do you handle?",
        answer:
          "We cover RFU, FIFA, UEFA and CAS disputes, plus transfers, contracts, licensing and disciplinary matters.",
        locale: "en",
        order: 1,
      },
      {
        question: "What is most often treated as a material club breach?",
        answer:
          "Typical patterns include overdue pay obligations, discriminatory training conditions and registration-status issues.",
        locale: "en",
        order: 2,
      },
      {
        question: "What is the usual action path in a material breach scenario?",
        answer:
          "We usually start with a formal notice, track cure deadlines and proceed to the RFU dispute chamber if needed.",
        locale: "en",
        order: 3,
      },
      {
        question: "Can we engage you after the dispute has started?",
        answer:
          "Yes. We join at any stage and build a strategy around deadlines and legal risks.",
        locale: "en",
        order: 4,
      },
      {
        question: "How do you ensure confidentiality?",
        answer:
          "All case data is handled in a restricted workflow. Public materials use anonymized narratives only.",
        locale: "en",
        order: 5,
      },
      {
        question: "Do you work only in Russia?",
        answer:
          "Primary geography is Russia and CIS. We also support international matters with FIFA, UEFA and CAS.",
        locale: "en",
        order: 6,
      },
      {
        question: "How fast is the initial review?",
        answer:
          "Typically on the same day when core documents are provided.",
        locale: "en",
        order: 7,
      },
      {
        question: "What communication formats are available?",
        answer: "In-person, online and hybrid. Urgent cases are handled through an expedited SLA.",
        locale: "en",
        order: 8,
      },
    ],
  },
};

function sortByOrder<T extends {order?: number}>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getLandingCmsContent(locale: Locale): Promise<LandingCmsContent> {
  if (!process.env.STRAPI_API_URL) {
    return fallbackContent[locale];
  }

  try {
    const [servicesRaw, casesRaw, faqRaw] = await Promise.all([
      fetchStrapiCollection<ServiceItem>("services", locale),
      fetchStrapiCollection<CaseItem>("cases", locale),
      fetchStrapiCollection<FaqItem>("faq", locale),
    ]);
    const filteredCases = casesRaw.filter((item) => item.isAnonymized);

    return {
      services: servicesRaw.length ? sortByOrder(servicesRaw) : fallbackContent[locale].services,
      cases: filteredCases.length ? filteredCases : fallbackContent[locale].cases,
      faq: faqRaw.length ? sortByOrder(faqRaw) : fallbackContent[locale].faq,
    };
  } catch {
    return fallbackContent[locale];
  }
}

