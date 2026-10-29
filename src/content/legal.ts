export type LegalSection = {
  title: string;
  body: string[];
  list?: string[];
};

export const privacy = {
  eyebrow: "Legal",
  title: "Política de privacidad",
  updated: "29 de octubre de 2026",
  intro:
    "En EMDECOB S.A.S. tratamos la información personal con reserva y la utilizamos únicamente para las finalidades descritas en este documento. Esta política aplica al sitio emdecob.com y a los canales de contacto publicados en él.",
  sections: [
    {
      title: "Responsable del tratamiento",
      body: [
        "El responsable es EMDECOB S.A.S., con domicilio en Cra 19 # 15 Norte - 40 Local 11, Armenia, Quindío, Colombia.",
        "Para consultas relacionadas con datos personales puede escribir a directoroperaciones@emdecob.com.",
      ],
    },
    {
      title: "Información que recopilamos",
      body: [
        "Recopilamos los datos que usted proporciona voluntariamente en el formulario de contacto: nombre, correo electrónico, teléfono, empresa o cargo, servicio de interés y mensaje. En la pestaña de talento también puede adjuntar su hoja de vida.",
        "El sitio puede registrar datos técnicos básicos, como dirección IP, fecha y hora de acceso, navegador y páginas solicitadas, con fines de seguridad, diagnóstico y funcionamiento del servicio. No utilizamos estos registros para elaborar perfiles publicitarios.",
      ],
    },
    {
      title: "Cómo usamos la información",
      body: ["Utilizamos los datos personales para:"],
      list: [
        "Atender consultas, solicitudes comerciales y solicitudes de talento.",
        "Evaluar procesos de selección cuando usted envía su hoja de vida.",
        "Prestar y administrar los servicios contratados.",
        "Cumplir obligaciones legales, contractuales y de seguridad.",
        "Mejorar la claridad y el funcionamiento del sitio web.",
      ],
    },
    {
      title: "Autorización y finalidad",
      body: [
        "Al enviar el formulario, usted autoriza el tratamiento de sus datos para las finalidades indicadas. No utilizamos la información del formulario para enviar publicidad o promociones sin una autorización adicional.",
        "Si no desea entregar sus datos, puede comunicarse por teléfono o WhatsApp a través de los canales publicados.",
      ],
    },
    {
      title: "Conservación y seguridad",
      body: [
        "Conservamos la información durante el tiempo necesario para atender la solicitud, mantener la relación contractual o cumplir una obligación legal. Cuando deja de ser necesaria, se elimina o se anonimiza de forma razonable.",
        "Aplicamos medidas técnicas y organizativas para proteger la información contra acceso no autorizado, pérdida o alteración. El acceso está limitado al personal que lo necesita para cumplir las finalidades descritas.",
      ],
    },
    {
      title: "Terceros y transferencias",
      body: [
        "No vendemos ni alquilamos datos personales. Podemos apoyarnos en proveedores tecnológicos de hosting, seguridad y envío de correo que tratan la información por cuenta de EMDECOB y bajo obligaciones de confidencialidad.",
        "El sitio enlaza al portal externo Juricob y puede incluir un mapa de Google Maps. Cuando usted utiliza esos servicios, se aplican sus propias políticas de privacidad. EMDECOB no administra la autenticación ni las contraseñas de Juricob.",
      ],
    },
    {
      title: "Sus derechos",
      body: [
        "De acuerdo con la Ley 1581 de 2012 y las normas que la complementan, usted puede:",
      ],
      list: [
        "Conocer, actualizar y rectificar sus datos personales.",
        "Solicitar prueba de la autorización otorgada, cuando corresponda.",
        "Ser informado sobre el uso que se ha dado a sus datos.",
        "Solicitar la eliminación cuando el tratamiento no respete la ley o la finalidad autorizada.",
        "Revocar la autorización y presentar quejas ante la Superintendencia de Industria y Comercio.",
      ],
    },
    {
      title: "Actualizaciones de la política",
      body: [
        "Esta política puede actualizarse cuando cambien las finalidades, los proveedores o la normativa aplicable. La fecha de la última actualización aparece al inicio de esta página.",
      ],
    },
  ] satisfies LegalSection[],
  contact:
    "Para ejercer sus derechos o resolver dudas sobre el tratamiento de sus datos, escríbanos a directoroperaciones@emdecob.com.",
};

export const cookies = {
  eyebrow: "Legal",
  title: "Política de cookies",
  updated: "29 de octubre de 2026",
  intro:
    "Las cookies son archivos pequeños que un sitio web puede almacenar en su dispositivo. Esta política explica qué ocurre en emdecob.com y cómo puede administrar sus preferencias.",
  sections: [
    {
      title: "Cookies que utiliza este sitio",
      body: [
        "Actualmente emdecob.com no utiliza cookies propias de analítica, publicidad o seguimiento. Tampoco crea perfiles de navegación con fines comerciales.",
        "La plataforma de hosting y seguridad puede utilizar cookies o almacenamiento técnico estrictamente necesario para entregar el sitio, recordar preferencias de seguridad y prevenir abusos. Estas tecnologías no se usan para publicidad.",
      ],
    },
    {
      title: "Servicios de terceros",
      body: [
        "La página de contacto incluye un mapa de Google Maps. Al cargar ese contenido, Google puede establecer cookies o recibir datos técnicos conforme a sus propias políticas. Si prefiere evitarlo, puede utilizar el enlace de mapa para abrirlo en una pestaña externa.",
        "Los enlaces a Juricob, WhatsApp, Instagram, Facebook y LinkedIn llevan a servicios externos que tienen sus propias políticas de cookies y privacidad.",
      ],
    },
    {
      title: "Cómo administrar las cookies",
      body: [
        "Puede bloquear, eliminar o limitar las cookies desde la configuración de su navegador. También puede usar el modo de navegación privada. Si bloquea tecnologías estrictamente necesarias, algunas funciones del sitio podrían no operar correctamente.",
      ],
      list: ["Google Chrome", "Mozilla Firefox", "Safari", "Microsoft Edge"],
    },
    {
      title: "Consentimiento y cambios",
      body: [
        "Como este sitio no utiliza cookies no esenciales propias, no se muestra un banner de consentimiento. Si en el futuro se incorporan herramientas de analítica o publicidad, esta política y el mecanismo de consentimiento se actualizarán antes de su activación.",
      ],
    },
  ] satisfies LegalSection[],
  contact:
    "Si tiene preguntas sobre el uso de cookies, escríbanos a directoroperaciones@emdecob.com.",
};
