export type Service = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  promise: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  metrics: { value: string; label: string }[];
  challenges: { title: string; text: string }[];
  pillars: { title: string; text: string }[];
  portfolio: { title: string; text: string; benefit?: string }[];
  cases: { tag: string; title: string; text: string; metric?: string }[];
  dataTitle: string;
  dataText: string;
  dataBullets: string[];
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "contact-center",
    name: "Contact Center",
    shortName: "Contact Center",
    eyebrow: "Experiencia y operación",
    promise: "Más que llamadas, conexiones que sostienen la relación con el cliente.",
    description:
      "Integramos voz, chat, WhatsApp, correo y redes en una operación omnicanal con respaldo jurídico y datos en tiempo real.",
    image: "/images/img-apoyo-contact-center-emdecob-web-3.webp",
    imageAlt: "Equipo de Contact Center de EMDECOB",
    accent: "#00A53E",
    metrics: [
      { value: "24/7", label: "operación multicanal" },
      { value: "360°", label: "centro de operaciones" },
      { value: "1", label: "historial por cliente" },
    ],
    challenges: [
      {
        title: "Clientes que repiten su caso.",
        text: "Cada canal funciona como una isla: el cliente vuelve a explicar lo mismo y la empresa pierde contexto.",
      },
      {
        title: "Atención que no se puede medir.",
        text: "Sin trazabilidad, el equipo trabaja, pero no sabe dónde se pierde tiempo, calidad o conversión.",
      },
      {
        title: "Riesgo legal en la conversación.",
        text: "Una cobranza mal gestionada o una queja mal escalada puede convertirse en un problema reputacional.",
      },
    ],
    pillars: [
      {
        title: "Omnicanalidad real",
        text: "Llamadas, chat, WhatsApp, correo y redes integrados en una sola plataforma y un solo historial.",
      },
      {
        title: "Respaldo jurídico",
        text: "Asesoría legal inmediata para orientar cobranza, conciliación y defensa preventiva.",
      },
      {
        title: "Operación 360°",
        text: "PQR, soporte técnico, ventas, back-office y fidelización bajo un mismo centro de operaciones.",
      },
      {
        title: "Trazabilidad y control",
        text: "Dashboards para monitorear cada interacción, tiempo de respuesta y resultado.",
      },
      {
        title: "Valor consultivo",
        text: "Decisiones empresariales con base en datos y análisis legal-financiero.",
      },
    ],
    portfolio: [
      {
        title: "Cobranza telefónica y digital",
        text: "Cobranza preventiva, administrativa y judicial con protocolos éticos y negociación profesional. Integramos teléfono, correo, SMS, chatbot y WhatsApp Business.",
        benefit: "Más recuperación, menos tiempos de respuesta y mejor percepción del cliente.",
      },
      {
        title: "Servicio al cliente corporativo",
        text: "Atención postventa, soporte técnico, gestión de reclamos y retención con equipos especializados B2B y B2C.",
        benefit: "Fidelización y reducción del churn rate.",
      },
      {
        title: "Retención y fidelización",
        text: "Campañas proactivas, segmentación predictiva y oportunidades de renovación, venta cruzada o actualización.",
        benefit: "Incremento del valor del cliente a largo plazo.",
      },
      {
        title: "Agendamiento, ventas y leads",
        text: "Gestión de citas, telemarketing y calificación de prospectos con registro automatizado e integración a CRM.",
        benefit: "Un embudo comercial más ordenado y medible.",
      },
      {
        title: "Encuestas y calidad",
        text: "Encuestas, auditoría de llamadas y medición de NPS y CSAT. Los resultados se integran en EMDATA.",
        benefit: "Visibilidad de la satisfacción y la eficiencia operativa.",
      },
    ],
    cases: [
      {
        tag: "Entidades financieras",
        title: "Atención a miles de clientes",
        text: "Reducción significativa en tiempos de espera y gestión de PQR.",
        metric: "− espera",
      },
      {
        tag: "Servicios públicos",
        title: "Canales digitales que sí se usan",
        text: "Implementación de canales digitales con aumento de satisfacción del cliente.",
        metric: "+40%",
      },
      {
        tag: "Retail",
        title: "Posventa que sostiene la relación",
        text: "Soporte y fidelización para consolidar relaciones comerciales de largo plazo.",
        metric: "largo plazo",
      },
    ],
    dataTitle: "Cada conversación deja un dato.",
    dataText:
      "EMDATA conecta la operación del Contact Center con analítica de voz, seguimiento y tableros de desempeño. El equipo deja de reportar y empieza a anticipar.",
    dataBullets: [
      "Tiempo promedio de atención (AHT).",
      "Porcentaje de contactos efectivos.",
      "Nivel de servicio (SL).",
      "Tasa de recuperación o conversión.",
      "Satisfacción del cliente (CSAT / NPS).",
    ],
    faq: [
      {
        q: "¿Pueden operar solo un canal o varios?",
        a: "Sí. Podemos iniciar con voz, WhatsApp o chat y ampliar la operación según la demanda. La omnicanalidad se diseña por etapas.",
      },
      {
        q: "¿Cómo se integra el respaldo jurídico?",
        a: "El equipo jurídico acompaña los casos que requieren orientación, conciliación o escalamiento. No es un servicio separado: hace parte del protocolo de atención.",
      },
      {
        q: "¿Qué pasa con los datos de los clientes?",
        a: "La operación se diseña con trazabilidad, accesos controlados y reportes. EMDATA no reemplaza los sistemas del cliente: integra la información para leerla.",
      },
    ],
    seo: {
      title: "Contact Center omnicanal en Armenia, Quindío",
      description:
        "Contact Center BPS con voz, chat, WhatsApp, correo y datos en tiempo real. Operación omnicanal con respaldo jurídico y trazabilidad.",
    },
  },
  {
    slug: "recuperacion-de-cartera",
    name: "Recuperación de cartera",
    shortName: "Cartera",
    eyebrow: "Liquidez y recuperación",
    promise: "Recuperar la cartera sin romper la relación con el cliente.",
    description:
      "Diseñamos planes de cobranza preventiva, administrativa y jurídica que combinan analítica, negociación y respaldo legal.",
    image: "/images/apoyo-img-propiedad-2-emdecob-web.webp",
    imageAlt: "Análisis de cartera y recuperación",
    accent: "#01633A",
    metrics: [
      { value: "+35%", label: "tasa de recuperación" },
      { value: "−40%", label: "días de mora (DSO)" },
      { value: "70%", label: "conciliación prejurídica" },
    ],
    challenges: [
      {
        title: "La cartera vencida presiona el flujo de caja.",
        text: "Cada día de mora reduce la probabilidad de pago y aumenta el costo de recuperación.",
      },
      {
        title: "Pasar directo a lo jurídico sale caro.",
        text: "Sin una etapa prejurídica bien gestionada, el proceso se vuelve largo, costoso y difícil de conciliar.",
      },
      {
        title: "Cobrar mal también tiene un costo.",
        text: "Una gestión agresiva o desordenada deteriora la relación y expone la reputación de la empresa.",
      },
    ],
    pillars: [
      {
        title: "Análisis y segmentación",
        text: "Clasificamos por antigüedad, monto, perfil y probabilidad de pago.",
      },
      {
        title: "Estrategia personalizada",
        text: "Definimos protocolos, mensajes y cronogramas por tipo de cliente.",
      },
      {
        title: "Gestión preventiva y administrativa",
        text: "Contacto temprano, negociación y acuerdos documentados.",
      },
      {
        title: "Gestión jurídica",
        text: "Activación de procesos legales con respaldo especializado cuando la vía administrativa no alcanza.",
      },
      {
        title: "Seguimiento con datos",
        text: "Reportes de desempeño, indicadores de recuperación y acceso a EMDATA.",
      },
    ],
    portfolio: [
      {
        title: "Cobranza preventiva",
        text: "Detectamos señales tempranas de morosidad y activamos comunicación oportuna antes de que la obligación se venza.",
        benefit: "Menos cartera vencida y mejor relación con el cliente.",
      },
      {
        title: "Cobranza administrativa",
        text: "Equipos de Contact Center, comunicación multicanal y protocolos de negociación con enfoque humano.",
        benefit: "Recuperación medible sin escalar prematuramente.",
      },
      {
        title: "Cobranza jurídica",
        text: "Representación legal, estrategia procesal y documentación rigurosa cuando la etapa administrativa se agota.",
        benefit: "Recuperación efectiva con control del riesgo reputacional.",
      },
      {
        title: "Cartera castigada",
        text: "Diagnóstico, segmentación y planes de recuperación para cartera que ya salió del balance.",
        benefit: "Una segunda oportunidad para el flujo de caja.",
      },
    ],
    cases: [
      {
        tag: "CrediOrbe",
        title: "Recuperación de cartera castigada",
        text: "Recuperación del 90% de la cartera castigada y ampliación del contrato para cartera activa.",
        metric: "90%",
      },
      {
        tag: "FNA",
        title: "Conciliación y contención",
        text: "Tasa de conciliación del 70%, reducción del 30% en riesgo y contención del 100% de PQR.",
        metric: "70%",
      },
      {
        tag: "Sector financiero",
        title: "Indicadores que mueven la operación",
        text: "Clientes de servicios financieros, retail, servicios públicos, educación y telecomunicaciones han mejorado su recuperación.",
        metric: "+35%",
      },
    ],
    dataTitle: "La cartera se gestiona con datos, no con intuición.",
    dataText:
      "EMDATA integra la gestión de cartera, los acuerdos y los indicadores de recuperación en una sola vista. El equipo sabe qué está funcionando y dónde ajustar.",
    dataBullets: [
      "Cartera por estado, edad y probabilidad de pago.",
      "Acuerdos, recaudos y cumplimiento.",
      "Indicadores por canal y campaña.",
      "Proyecciones de flujo de caja.",
    ],
    faq: [
      {
        q: "¿Trabajan cartera castigada?",
        a: "Sí. Analizamos la cartera, segmentamos por perfil y definimos una estrategia de recuperación según el estado de cada obligación.",
      },
      {
        q: "¿Cuándo se pasa a la etapa jurídica?",
        a: "Cuando la gestión administrativa no logra un acuerdo sostenible. La decisión se toma con criterio legal y financiero, no por defecto.",
      },
      {
        q: "¿Cómo se mide el resultado?",
        a: "Con indicadores de recuperación, días de mora, conciliaciones y costo operativo. Los reportes se revisan con el cliente.",
      },
    ],
    seo: {
      title: "Recuperación de cartera empresarial en Colombia",
      description:
        "Cobranza preventiva, administrativa y jurídica con analítica, negociación y respaldo legal. Recupere liquidez sin deteriorar la relación con sus clientes.",
    },
  },
  {
    slug: "propiedad-horizontal",
    name: "Propiedad horizontal",
    shortName: "Propiedad horizontal",
    eyebrow: "Comunidad y sostenibilidad",
    promise: "Administrar un conjunto es retador. Hacerlo sostenible es un arte.",
    description:
      "Combinamos estrategia, rigor jurídico y recuperación de cartera para proteger las finanzas y la convivencia de la copropiedad.",
    image: "/images/apoyo-img-propiedad-1-emdecob-web.webp",
    imageAlt: "Conjunto residencial administrado",
    accent: "#01633A",
    metrics: [
      { value: "50+", label: "conjuntos gestionados" },
      { value: "100%", label: "recuperación en casos clave" },
      { value: "70%", label: "conciliación extrajudicial" },
    ],
    challenges: [
      {
        title: "La cartera común se vuelve invisible.",
        text: "Cuotas vencidas, intereses y acuerdos informales terminan afectando el mantenimiento y la operación.",
      },
      {
        title: "Decisiones sin respaldo jurídico.",
        text: "Actas, sanciones y contratos mal documentados abren frentes de conflicto con propietarios.",
      },
      {
        title: "Comunicación que desgasta la convivencia.",
        text: "Cobrar sin empatía o sin claridad puede convertir un problema financiero en un conflicto comunitario.",
      },
    ],
    pillars: [
      {
        title: "Rigor jurídico",
        text: "Procesos ajustados a la Ley 675 de 2001 y a la normativa de propiedad horizontal.",
      },
      {
        title: "Gestión financiera",
        text: "Sostenibilidad del fondo común y estabilidad del flujo de caja.",
      },
      {
        title: "Transparencia",
        text: "Cada movimiento, gestión y recaudo con trazabilidad a través de EMDATA.",
      },
      {
        title: "Comunicación ética",
        text: "Atención empática y profesional que evita conflictos y promueve la cultura de pago.",
      },
    ],
    portfolio: [
      {
        title: "Recuperación de cuotas vencidas",
        text: "Cobranza preventiva, administrativa y judicial con segmentación por perfil y antigüedad de mora, acuerdos documentados y procesos ejecutivos cuando son necesarios.",
        benefit: "Recuperación ágil sin afectar la convivencia.",
      },
      {
        title: "Representación jurídica",
        text: "Representación de la copropiedad ante juzgados, entidades públicas, conciliadores y notarías. Procesos ejecutivos, demandas, actas, contratos y reclamaciones.",
        benefit: "Decisiones de asamblea y consejo con respaldo legal.",
      },
      {
        title: "Asesoría permanente",
        text: "Acompañamiento a administradores y consejos en contratos, sanciones, actas, normativa y conflictos entre propietarios.",
        benefit: "Seguridad jurídica para la administración.",
      },
    ],
    cases: [
      {
        tag: "50+ conjuntos",
        title: "Gestión activa de cartera",
        text: "Torre 100, Inter Norte, Torre San Marino II, Torre Verde, Getsemaní, entre otros.",
        metric: "50+",
      },
      {
        tag: "Torre Verde · Inter Plaza",
        title: "Recuperación total",
        text: "Recuperación del 100% de la cartera en copropiedades con mora histórica.",
        metric: "100%",
      },
      {
        tag: "Conciliación",
        title: "Menos litigio, más acuerdo",
        text: "Altas tasas de conciliación extrajudicial y reducción del riesgo jurídico en comunidades con mora.",
        metric: "70%",
      },
    ],
    dataTitle: "La copropiedad también merece datos claros.",
    dataText:
      "EMDATA permite ver la cartera, los acuerdos y la gestión jurídica de la copropiedad en tiempo real. Administradores y consejos dejan de discutir sobre cifras y empiezan a decidir.",
    dataBullets: [
      "Cartera por unidad y estado.",
      "Acuerdos de pago y recaudo.",
      "Procesos jurídicos asociados.",
      "Reportes para asamblea y consejo.",
    ],
    faq: [
      {
        q: "¿Atienden conjuntos fuera del Quindío?",
        a: "Sí. La operación puede ser remota y se adapta a la ubicación de la copropiedad. La representación jurídica se coordina según la jurisdicción.",
      },
      {
        q: "¿Pueden acompañar la asamblea?",
        a: "Sí. Ofrecemos acompañamiento legal en asambleas, revisión de actas, contratos y decisiones del consejo de administración.",
      },
      {
        q: "¿Cómo evitan el conflicto con los propietarios?",
        a: "Con comunicación ética, acuerdos documentados y una ruta clara de escalamiento. La cobranza no se separa de la convivencia.",
      },
    ],
    seo: {
      title: "Gestión jurídica y de cartera para propiedad horizontal",
      description:
        "Recuperación de cuotas, representación jurídica y asesoría permanente para conjuntos y edificios. Ley 675 y trazabilidad con EMDATA.",
    },
  },
  {
    slug: "juridicos",
    name: "Servicios jurídicos",
    shortName: "Jurídicos",
    eyebrow: "Prevención y defensa",
    promise: "Prevención jurídica que protege y fortalece su organización.",
    description:
      "Acompañamos empresas y personas en procesos civiles, comerciales, laborales, administrativos y de familia con visión empresarial.",
    image: "/images/imagen-de-apoyo-servicio-Servicios-Juridicos-Especializados_2-emdecob-web.webp",
    imageAlt: "Equipo jurídico de EMDECOB",
    accent: "#1D1E1F",
    metrics: [
      { value: "70%", label: "conciliación extrajudicial" },
      { value: "80%", label: "efectividad judicial" },
      { value: "−30%", label: "exposición económica" },
    ],
    challenges: [
      {
        title: "Litigar sin estrategia.",
        text: "Un proceso judicial sin lectura financiera puede ganar el caso y perder la operación.",
      },
      {
        title: "Contratos que abren riesgos.",
        text: "Cláusulas ambiguas, garantías débiles y acuerdos informales se convierten en contingencias costosas.",
      },
      {
        title: "Casos sin trazabilidad.",
        text: "Sin expediente, responsables ni fechas claras, el cliente no sabe en qué va su proceso.",
      },
    ],
    pillars: [
      { title: "Seguridad jurídica", text: "Normas claras, actualizadas y aplicadas con rigor." },
      { title: "Cumplimiento normativo", text: "Operaciones alineadas con la ley y menores riesgos de sanción." },
      { title: "Prevención de riesgos", text: "Auditamos y anticipamos conflictos antes de que escalen." },
      { title: "Representación y defensa", text: "Estrategia en procesos prejurídicos, jurídicos, conciliaciones y litigios." },
      { title: "Ética y transparencia", text: "Confidencialidad, integridad y claridad en cada actuación." },
      { title: "Resolución alternativa", text: "Acuerdos y conciliaciones ágiles y económicas." },
    ],
    portfolio: [
      {
        title: "Cobranza judicial y prejurídica",
        text: "Procesos adaptados al tipo de deudor, monto, antigüedad y sector económico.",
        benefit: "Recuperación con estrategia procesal y control del riesgo.",
      },
      {
        title: "Asesoría y defensa empresarial",
        text: "Procesos ejecutivos, ordinarios, laborales y comerciales con seguimiento detallado de plazos y pruebas.",
        benefit: "Defensa técnica y oportuna.",
      },
      {
        title: "Riesgos legales y cumplimiento",
        text: "Diagnósticos de riesgo jurídico, revisión de cláusulas y cumplimiento regulatorio.",
        benefit: "Menos contingencias y decisiones informadas.",
      },
      {
        title: "Acompañamiento contractual",
        text: "Contratos comerciales, acuerdos de confidencialidad, mandatos, garantías y convenios de pago.",
        benefit: "Relaciones comerciales mejor documentadas.",
      },
    ],
    cases: [
      {
        tag: "Empresas regionales",
        title: "Conciliaciones que evitan litigios",
        text: "Acuerdos extrajudiciales que evitaron procesos costosos y prolongados.",
        metric: "70%",
      },
      {
        tag: "Propiedad horizontal",
        title: "Recuperación con respaldo legal",
        text: "Cuotas atrasadas gestionadas con índices de conciliación del 70% en procesos prejurídicos.",
        metric: "70%",
      },
      {
        tag: "Clientes corporativos",
        title: "Defensa laboral",
        text: "Resultados favorables que redujeron la exposición económica en un 30%.",
        metric: "−30%",
      },
    ],
    dataTitle: "El expediente también es un dato.",
    dataText:
      "Juricob ordena la gestión jurídica y EMDATA conecta esa información con la operación. El cliente ve el estado de su caso y la empresa entiende su impacto financiero.",
    dataBullets: [
      "Estado de cada expediente.",
      "Actuaciones y fechas críticas.",
      "Documentos y soportes.",
      "Impacto en cartera y finanzas.",
    ],
    faq: [
      {
        q: "¿Atienden personas naturales?",
        a: "Sí. Acompañamos empresas y personas en asuntos civiles, comerciales, laborales, administrativos y de familia.",
      },
      {
        q: "¿Juricob es el portal de clientes?",
        a: "Juricob es el sistema de gestión jurídica y autenticación. La web de EMDECOB solo enlaza a sus flujos de acceso; no replica el login.",
      },
      {
        q: "¿Pueden revisar contratos existentes?",
        a: "Sí. Revisamos cláusulas, garantías y riesgos, y proponemos ajustes antes de firmar o renovar.",
      },
    ],
    seo: {
      title: "Servicios jurídicos empresariales en Armenia, Quindío",
      description:
        "Asesoría y representación legal en procesos civiles, comerciales, laborales, administrativos y de familia. Prevención, defensa y trazabilidad.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
