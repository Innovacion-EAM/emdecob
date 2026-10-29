export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  author: string;
  readingTime: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional",
    title: "Qué es EMDATA y por qué es diferente a un software tradicional",
    excerpt:
      "Los datos abundan en las empresas, pero lo que importa es convertirlos en decisiones. Así funciona EMDATA, el tablero de EMDECOB.",
    date: "11 de noviembre de 2025",
    dateISO: "2025-11-11",
    category: "Datos",
    author: "Equipo EMDECOB",
    readingTime: "4 min",
    cover: "/images/portadas-blog-emdecob-web-2.webp",
    coverAlt: "Analítica y tableros de datos de EMDATA",
    featured: true,
    body: [
      {
        type: "p",
        text: "Los datos abundan en las empresas, pero lo que realmente importa es convertirlos en decisiones. Esa es la misión de EMDATA, el dashboard de EMDECOB.",
      },
      {
        type: "p",
        text: "A diferencia de un software tradicional, EMDATA integra información de cartera, gestión jurídica, Contact Center y finanzas en un solo lugar. Su valor está en la visualización clara y dinámica que permite entender qué pasa en segundos.",
      },
      { type: "h2", text: "Métricas que se pueden accionar" },
      {
        type: "p",
        text: "Cada métrica está pensada para tomar decisiones: reforzar la cobranza, priorizar un canal de atención o anticipar un riesgo. No se trata de acumular reportes, sino de saber cuál mover.",
      },
      {
        type: "list",
        items: [
          "Cartera por estado, edad y probabilidad de pago.",
          "Gestión de Contact Center y tiempos de respuesta.",
          "Procesos jurídicos y fechas críticas.",
          "Indicadores financieros y proyecciones.",
        ],
      },
      { type: "h2", text: "Personalizable, seguro y disponible" },
      {
        type: "p",
        text: "EMDATA se adapta a las necesidades de cada cliente, desde copropiedades hasta empresas financieras. El acceso es seguro y los reportes se actualizan en tiempo real.",
      },
      {
        type: "quote",
        text: "EMDATA no es solo un software: es un aliado que convierte información en claridad, y claridad en acción.",
      },
      {
        type: "p",
        text: "Tus datos ya están hablando. La diferencia está en escucharlos bien. Solicita una demo y convierte la información en decisiones.",
      },
    ],
  },
  {
    slug: "riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado",
    title: "Riesgos de no contar con un plan de recuperación estructurado",
    excerpt:
      "La etapa prejurídica no es un trámite menor: es la clave para proteger la liquidez, reducir costos y sostener la relación con el cliente.",
    date: "11 de noviembre de 2025",
    dateISO: "2025-11-11",
    category: "Cartera",
    author: "Equipo EMDECOB",
    readingTime: "5 min",
    cover: "/images/portadas-blog-emdecob-web-1.webp",
    coverAlt: "Gestión y recuperación de cartera empresarial",
    body: [
      {
        type: "p",
        text: "La cartera vencida es uno de los mayores desafíos financieros de cualquier empresa. Sin un plan estructurado en la etapa prejurídica, los riesgos se multiplican.",
      },
      { type: "h2", text: "1. Falta de liquidez" },
      {
        type: "p",
        text: "Los pagos atrasados afectan directamente el flujo de caja. La empresa sigue operando, pero con menos recursos para cubrir nómina, proveedores o inversión.",
      },
      { type: "h2", text: "2. Costos que crecen" },
      {
        type: "p",
        text: "Pasar de inmediato a procesos judiciales largos y costosos consume tiempo, honorarios y capacidad del equipo. La vía prejurídica permite explorar acuerdos antes de escalar.",
      },
      { type: "h2", text: "3. Incobrabilidad" },
      {
        type: "p",
        text: "Mientras más tiempo pasa, menos posibilidades hay de recuperar la deuda. Un plan prejurídico ágil puede lograr conciliaciones de hasta el 70%.",
      },
      { type: "h2", text: "4. Deterioro de relaciones" },
      {
        type: "p",
        text: "Una gestión poco profesional puede dañar la confianza de clientes o copropietarios. La prejurídica, en cambio, ofrece la posibilidad de conciliar y mantener vínculos.",
      },
      {
        type: "quote",
        text: "La etapa prejurídica no es un trámite menor: es la clave para proteger la estabilidad financiera y reducir riesgos legales.",
      },
      {
        type: "p",
        text: "En EMDECOB hemos comprobado que un plan prejurídico sólido protege la salud financiera del negocio. No esperes a que la deuda crezca ni a que el riesgo legal te sorprenda.",
      },
    ],
  },
  {
    slug: "pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente",
    title: "Cómo un Contact Center mejora la experiencia del cliente y reduce riesgos",
    excerpt:
      "Omnicanalidad, historial unificado, respaldo jurídico y analítica en tiempo real: cuatro pasos para convertir la atención en una ventaja.",
    date: "11 de noviembre de 2025",
    dateISO: "2025-11-11",
    category: "Contact Center",
    author: "Equipo EMDECOB",
    readingTime: "5 min",
    cover: "/images/portadas-blog-emdecob-web-3.webp",
    coverAlt: "Atención omnicanal de Contact Center",
    body: [
      {
        type: "p",
        text: "Durante mucho tiempo, el call center fue sinónimo de largas esperas y clientes molestos. Hoy, las empresas necesitan más que eso: un Contact Center estratégico que actúe como el centro de operaciones, donde comunicación, datos y respaldo legal trabajan juntos.",
      },
      { type: "h2", text: "1. Omnicanalidad real" },
      {
        type: "p",
        text: "Los clientes quieren elegir cómo comunicarse: WhatsApp, correo, chat o teléfono, y recibir siempre la misma calidad de atención. Cuando lo logran, sienten que la empresa realmente los escucha.",
      },
      { type: "h2", text: "2. Un historial unificado" },
      {
        type: "p",
        text: "Evitar que el cliente repita su caso una y otra vez ahorra tiempo y mejora la confianza. El contexto debe viajar con la conversación, no quedarse en el canal donde empezó.",
      },
      { type: "h2", text: "3. Respaldo jurídico" },
      {
        type: "p",
        text: "Contar con asesoría inmediata en procesos de cartera o quejas protege a la empresa y reduce riesgos legales. La conversación y el expediente no deberían vivir separados.",
      },
      { type: "h2", text: "4. Analítica en tiempo real" },
      {
        type: "p",
        text: "Con dashboards como EMDATA es posible identificar cuellos de botella, medir la satisfacción del cliente y anticipar problemas antes de que escalen.",
      },
      {
        type: "quote",
        text: "Un Contact Center no solo atiende llamadas: fortalece relaciones, previene riesgos y genera confianza a largo plazo.",
      },
      {
        type: "p",
        text: "¿Quieres transformar la forma en que tus clientes viven la atención? Conoce cómo nuestro Contact Center puede convertirse en el centro de operaciones de tu empresa.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
