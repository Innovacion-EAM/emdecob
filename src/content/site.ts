export const company = {
  legalName: "EMDECOB S.A.S.",
  descriptor: "Contact Center BPS · Cartera · Jurídico · Datos",
  shortName: "EMDECOB",
  city: "Armenia, Quindío",
  address: "Cra 19 # 15 Norte - 40 Local 11, Armenia, Quindío",
  phone: "324 618 0051",
  phoneHref: "tel:+573246180051",
  whatsapp: "https://wa.me/573246180051",
  hours: "Lunes a viernes · 8:00 AM – 5:30 PM",
  email: "directoroperaciones@emdecob.com",
  map: "https://maps.google.com/?q=Emdecob,+Cra+19+%2315+Norte-40,+Armenia,+Quind%C3%ADo",
  juricob: "https://juricob.emdecob.com/",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/emdecob" },
    { label: "Instagram", href: "https://www.instagram.com/emdecob_sas" },
    { label: "Facebook", href: "https://www.facebook.com/emdecobarmenia/" },
  ],
  partner: { name: "CST Business", href: "https://cstbusiness.co/" },
};

export const nav = [
  { label: "Inicio", href: "/" },
  {
    label: "Servicios",
    href: "/servicios/",
    children: [
      { label: "Contact Center", href: "/servicios/contact-center/", note: "Experiencia omnicanal" },
      { label: "Recuperación de cartera", href: "/servicios/recuperacion-de-cartera/", note: "Cobranza y liquidez" },
      { label: "Propiedad horizontal", href: "/servicios/propiedad-horizontal/", note: "Gestión jurídica y financiera" },
      { label: "Servicios jurídicos", href: "/servicios/juridicos/", note: "Prevención y defensa" },
    ],
  },
  { label: "EMDATA", href: "/emdata/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contacto", href: "/contacto/" },
];

export const stats = [
  { value: "2006", label: "operando desde", detail: "Nacimos en el Quindío y seguimos aquí." },
  { value: "4", label: "líneas integradas", detail: "Contact Center, cartera, propiedad horizontal y jurídico." },
  { value: "360°", label: "visión de la operación", detail: "Datos, gestión y respaldo legal en una sola conversación." },
  { value: "1", label: "equipo responsable", detail: "Un solo aliado para operar, conciliar y decidir." },
];

export const allies = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/aliado-${i + 1}.webp`,
  alt: `Aliado EMDECOB ${i + 1}`,
}));

export const testimonials = [
  {
    quote:
      "Con EMDECOB logramos procesos de cobro efectivos y oportunos que hoy nos permiten tener estabilidad financiera.",
    name: "Villa Antawara",
    role: "Copropiedad",
  },
  {
    quote:
      "El acompañamiento de EMDECOB nos ha permitido organizar la cartera y recuperar saldos en mora, generando sostenibilidad y tranquilidad para nuestra comunidad.",
    name: "Ciudadela Sorrento",
    role: "Copropiedad",
  },
  {
    quote:
      "Gracias a su gestión profesional hemos optimizado el seguimiento y la recuperación de saldos pendientes, lo que nos da mayor confianza en la administración.",
    name: "Inter Plaza Parque Residencial",
    role: "Copropiedad",
  },
];

export const process = [
  {
    number: "01",
    title: "Diagnóstico",
    text: "Leemos la operación, la cartera y los puntos de fricción antes de proponer una solución.",
  },
  {
    number: "02",
    title: "Diseño",
    text: "Definimos canales, protocolos, equipo y respaldo jurídico según el contexto de cada cliente.",
  },
  {
    number: "03",
    title: "Operación",
    text: "Ejecutamos con un equipo especializado, trazabilidad y comunicación permanente.",
  },
  {
    number: "04",
    title: "Medición",
    text: "Convertimos cada interacción en datos accionables con EMDATA y reportes claros.",
  },
];

export const faqs = [
  {
    q: "¿Atienden tanto a personas como a empresas?",
    a: "Sí. Brindamos soluciones jurídicas y de cobranza a personas naturales, empresas, entidades financieras, copropiedades y organizaciones de distintos sectores.",
  },
  {
    q: "¿Qué hace diferente a EMDECOB de otras empresas de cobranza?",
    a: "Integramos Contact Center, recuperación de cartera, propiedad horizontal, servicios jurídicos y analítica de datos. La operación no se terceriza por partes: se diseña y se mide como un solo sistema.",
  },
  {
    q: "¿Trabajan solo en el Quindío o en toda Colombia?",
    a: "Nuestra operación nace en Armenia, Quindío, y atiende clientes de diferentes regiones del país. La gestión puede ser presencial o remota según el servicio.",
  },
  {
    q: "¿Cómo garantizan un trato respetuoso en la cobranza?",
    a: "Aplicamos protocolos éticos, comunicación clara y respaldo jurídico. La recuperación no debe poner en riesgo la relación con el cliente ni la reputación de la empresa.",
  },
  {
    q: "¿EMDATA reemplaza mis sistemas actuales?",
    a: "No. EMDATA integra información de cartera, Contact Center, procesos jurídicos y finanzas en una sola vista. Se conecta con contabilidad, CRM, ERP, Excel y otras fuentes.",
  },
  {
    q: "¿Juricob es el portal de EMDECOB?",
    a: "Juricob es el sistema externo de gestión jurídica y autenticación. La web de EMDECOB solo enlaza a sus flujos de acceso; no replica login, registro ni contraseñas.",
  },
];

export const values = [
  {
    title: "Excelencia",
    text: "Buscamos la mejora continua en cada proceso y en cada interacción.",
  },
  {
    title: "Integridad",
    text: "Actuamos con ética, responsabilidad y compromiso con clientes y colaboradores.",
  },
  {
    title: "Innovación",
    text: "Usamos la tecnología como motor de crecimiento y diferenciación.",
  },
];

export const team = [
  { name: "Juan José Escobar", role: "Gerente general", initials: "JE" },
  { name: "Tatiana Marín", role: "Directora ejecutiva", initials: "TM" },
  { name: "Martín Missie", role: "Director de operaciones", initials: "MM" },
  { name: "Karina Flórez", role: "Directora analítica de datos", initials: "KF" },
  { name: "Julián Cuartas", role: "Director de propiedad horizontal", initials: "JC" },
  { name: "Paul Jaramillo", role: "Director FNA", initials: "PJ" },
  { name: "Cristina Cruz", role: "Coordinadora portafolio jurídico", initials: "CC" },
  { name: "Diana Bernal", role: "Coordinadora de tesorería", initials: "DB" },
];

export const timeline = [
  {
    period: "2006 – 2008",
    title: "Los inicios",
    text: "Los hermanos Escobar comenzaron con recursos limitados y una idea clara: construir un servicio basado en disciplina, cercanía y profesionalismo.",
  },
  {
    period: "2008 – 2010",
    title: "Primeros clientes",
    text: "El primer contrato de impacto llegó con una empresa de confecciones de la región. EMDECOB empezó a posicionarse como una alternativa seria y confiable.",
  },
  {
    period: "2010 – 2012",
    title: "Consolidación",
    text: "Llegaron más clientes y relaciones de largo plazo. Una crisis financiera obligó a reorganizar la operación y a garantizar la continuidad del proyecto.",
  },
  {
    period: "2012 – 2014",
    title: "Local familiar",
    text: "La oficina se trasladó a una vivienda familiar. Ese espacio se convirtió en el nuevo centro de operaciones y en símbolo de la resiliencia de la empresa.",
  },
  {
    period: "2015 – hoy",
    title: "Crecimiento y evolución",
    text: "EMDECOB diversificó su portafolio y desarrolló EMDATA, su tablero de datos para operar con trazabilidad y tomar decisiones en tiempo real.",
  },
];

export const clientLogosNote =
  "Aliados reconocidos en los sectores público, privado y mixto respaldan la solidez y el alcance de nuestra operación.";

export const juricob = {
  name: "Juricob",
  tagline: "La gestión jurídica de EMDECOB, en un solo lugar.",
  description:
    "Juricob es el sistema de gestión jurídica de EMDECOB. Allí viven los expedientes, documentos, audiencias y notificaciones de cada proceso. La web institucional solo enlaza al acceso; la autenticación ocurre en Juricob.",
  features: [
    { title: "Expedientes", text: "Cada caso con su estado, actuaciones y responsables." },
    { title: "Documentos", text: "Archivos y soportes organizados por proceso." },
    { title: "Audiencias", text: "Agenda y seguimiento de diligencias." },
    { title: "Notificaciones", text: "Avisos y cambios relevantes del expediente." },
  ],
  flows: [
    { label: "Ingresar", href: "https://juricob.emdecob.com/login", note: "Usuarios existentes" },
    { label: "Crear cuenta", href: "https://juricob.emdecob.com/register", note: "Nuevo acceso" },
    { label: "Recuperar contraseña", href: "https://juricob.emdecob.com/forgot-password", note: "Soporte de acceso" },
  ],
};
