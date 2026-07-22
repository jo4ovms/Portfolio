export type Lang = 'pt' | 'en';

export interface Project {
  title: string;
  href: string;
  desc: string;
  tech: string;
  image?: string;
}

export interface ExperienceItem {
  years: string;
  title: string;
  role: string;
  status: string;
  desc: string;
  tech?: string;
}

export interface Content {
  locale: string;
  place: string;
  who: string;
  headline: [string, string];
  lead: string;
  hint: string;
  toggle: { label: string; href: string; hreflang: string };
  projectsLabel: string;
  projects: Project[];
  contactAnchor: string;
  metaContact: string;
  experienceTitle: string;
  experience: ExperienceItem[];
  aboutTitle: string;
  about: string[];
  contactTitle: string;
  contactLead: string;
  email: string;
  footer: string;
}

export const content: Record<Lang, Content> = {
  pt: {
    locale: 'pt-BR',
    place: 'Fraiburgo, SC',
    who: 'desenvolvedor full-stack · ContaGou',
    headline: ['João Victor', 'Maciel dos Santos'],
    lead: 'Trabalho na ContaGou com Node, TypeScript, React e MongoDB, em sistemas que escritórios contábeis usam todos os dias.',
    hint: 'o fundo reage ao seu cursor',
    toggle: { label: 'EN', href: '/en/', hreflang: 'en' },
    projectsLabel: 'Projetos',
    projects: [
      {
        title: 'Monitor de anomalias em APIs',
        href: 'https://github.com/jo4ovms/TCC',
        desc: 'Meu TCC. Detecta anomalias em tempo real com rate limiting, impossible travel e um modelo IsolationForest. As explicações vêm de um LLM.',
        tech: 'node · typescript · python · rabbitmq · redis · prometheus · docker',
        image: '/previews/tcc.png',
      },
      {
        title: 'Stockify',
        href: 'https://github.com/jo4ovms/Stockify',
        desc: 'Meu primeiro projeto full-stack: um sistema de gestão de estoque em Java e React.',
        tech: 'java · spring boot · react · kafka · postgresql',
        image: '/previews/stockify.png',
      },
    ],
    contactAnchor: '#contato',
    metaContact: 'Contato',
    experienceTitle: 'Trajetória',
    experience: [
      {
        years: '2025–',
        title: 'ContaGou',
        role: 'desenvolvedor full-stack pleno',
        status: 'ativo',
        desc: 'Lidero tecnicamente o time: sprints, arquitetura das APIs e revisão de código. Desenvolvo backend em Node e frontend em React, mantenho integrações com o WhatsApp Business, webhooks e serviços em tempo real, além do MongoDB e do deploy na AWS.',
        tech: 'node · typescript · react · mongodb · aws ec2 · websockets',
      },
      {
        years: '2024–25',
        title: 'Inovea Tecnologia',
        role: 'desenvolvedor web jr',
        status: 'concluído',
        desc: 'Desenvolvimento e manutenção de sistemas web internos em VB.NET com SQL Server: novas funcionalidades, otimização de código, correção de bugs e suporte.',
        tech: 'vb.net · sql server · javascript',
      },
      {
        years: '2023–25',
        title: 'IFC Campus Fraiburgo',
        role: 'análise e desenvolvimento de sistemas',
        status: 'formado',
        desc: 'Curso superior de tecnologia em Análise e Desenvolvimento de Sistemas, concluído em dezembro de 2025. O TCC é o monitor de anomalias em APIs que está na lista de projetos.',
      },
    ],
    aboutTitle: 'Sobre',
    about: [
      'Sou de Dourados, MS, e trabalho com desenvolvimento web desde 2024. Comecei mantendo sistemas legados e hoje lidero tecnicamente um time. O caminho entre uma coisa e outra foi estudo por conta própria e muito projeto pessoal.',
      'O que mais me interessa é backend: arquitetura de software, mensageria e APIs que escalam bem. Foi o tema do meu TCC e é o que estudo no tempo livre.',
    ],
    contactTitle: 'Contato',
    contactLead:
      'Estou aberto a novas oportunidades. O jeito mais rápido de falar comigo é por e-mail:',
    email: 'joaovictormacields@gmail.com',
    footer: 'João Victor · julho de 2026',
  },
  en: {
    locale: 'en',
    place: 'Fraiburgo, Brazil',
    who: 'full-stack developer · ContaGou',
    headline: ['João Victor', 'Maciel dos Santos'],
    lead: 'I work at ContaGou with Node, TypeScript, React and MongoDB, on systems accounting firms use every day.',
    hint: 'the background reacts to your cursor',
    toggle: { label: 'PT', href: '/', hreflang: 'pt-BR' },
    projectsLabel: 'Projects',
    projects: [
      {
        title: 'API anomaly monitor',
        href: 'https://github.com/jo4ovms/TCC',
        desc: 'My capstone project. Detects anomalies in real time with rate limiting, impossible travel and an IsolationForest model. Explanations come from an LLM.',
        tech: 'node · typescript · python · rabbitmq · redis · prometheus · docker',
        image: '/previews/tcc.png',
      },
      {
        title: 'Stockify',
        href: 'https://github.com/jo4ovms/Stockify',
        desc: 'My first full-stack project: an inventory management system in Java and React.',
        tech: 'java · spring boot · react · kafka · postgresql',
        image: '/previews/stockify.png',
      },
    ],
    contactAnchor: '#contact',
    metaContact: 'Contact',
    experienceTitle: 'Experience',
    experience: [
      {
        years: '2025–',
        title: 'ContaGou',
        role: 'mid-level full-stack developer',
        status: 'active',
        desc: "I'm the technical lead of the team: sprints, API architecture and code review. I build backend services in Node and frontend in React, maintain WhatsApp Business integrations, webhooks and real-time services, and handle MongoDB and AWS deploys.",
        tech: 'node · typescript · react · mongodb · aws ec2 · websockets',
      },
      {
        years: '2024–25',
        title: 'Inovea Tecnologia',
        role: 'junior web developer',
        status: 'done',
        desc: 'Built and maintained internal web systems in VB.NET with SQL Server: new features, code optimization, bug fixes and support.',
        tech: 'vb.net · sql server · javascript',
      },
      {
        years: '2023–25',
        title: 'IFC Campus Fraiburgo',
        role: 'systems analysis and development',
        status: 'degree',
        desc: 'Technology degree in Systems Analysis and Development, completed in December 2025. My capstone project is the API anomaly monitor listed above.',
      },
    ],
    aboutTitle: 'About',
    about: [
      "I'm from Dourados, Brazil, and I've been working with web development since 2024. I started out maintaining legacy systems and today I'm the technical lead of a team. What got me from one to the other was self-study and a lot of personal projects.",
      "What interests me most is backend: software architecture, messaging and APIs that scale well. It was the subject of my capstone and it's what I study in my free time.",
    ],
    contactTitle: 'Contact',
    contactLead:
      "I'm open to new opportunities. The fastest way to reach me is email:",
    email: 'joaovictormacields@gmail.com',
    footer: 'João Victor · July 2026',
  },
};
