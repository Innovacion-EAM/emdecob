import { NextResponse } from "next/server";
import { company } from "@/content/site";

export const runtime = "nodejs";

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const tipo = text(form.get("tipo")) === "empleo" ? "empleo" : "comercial";
    const nombre = text(form.get("nombre"));
    const correo = text(form.get("correo"));
    const telefono = text(form.get("telefono"));
    const mensaje = text(form.get("mensaje"));
    const consentimiento = text(form.get("consentimiento"));

    if (!nombre || !correo || !telefono || !mensaje || !consentimiento) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json(
        { ok: false, error: "El correo electrónico no es válido." },
        { status: 400 },
      );
    }

    if (
      nombre.length > 120 ||
      correo.length > 254 ||
      telefono.length > 40 ||
      mensaje.length > 5000
    ) {
      return NextResponse.json(
        { ok: false, error: "Uno de los campos supera la longitud permitida." },
        { status: 400 },
      );
    }

    const file = form.get("hojaDeVida");
    if (file instanceof File && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, error: "La hoja de vida supera el límite de 5 MB." },
          { status: 400 },
        );
      }
      if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
        return NextResponse.json(
          { ok: false, error: "La hoja de vida debe ser PDF, DOC o DOCX." },
          { status: 400 },
        );
      }
    }

    const fields: Record<string, string> = {
      Tipo: tipo,
      Nombre: nombre,
      Correo: correo,
      Teléfono: telefono,
      Mensaje: mensaje,
    };

    if (tipo === "comercial") {
      fields.Empresa = text(form.get("empresa")) || "No indicada";
      fields.Servicio = text(form.get("servicio")) || "No indicado";
    } else {
      fields.Cargo = text(form.get("cargo")) || "No indicado";
      fields.LinkedIn = text(form.get("linkedin")) || "No indicado";
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Local / prototype mode: validates and acknowledges without a provider.
      console.info(
        `[contacto] Solicitud ${tipo} recibida (modo local, sin envío de correo).`,
      );
      return NextResponse.json({ ok: true, mode: "local" });
    }

    const attachments: { filename: string; content: string }[] = [];
    if (file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name || "hoja-de-vida.pdf",
        content: buffer.toString("base64"),
      });
    }

    const html = `
      <h2>Nueva solicitud desde emdecob.com</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        ${Object.entries(fields)
          .map(
            ([key, value]) =>
              `<tr><td style="border-bottom:1px solid #e5e5e5;color:#5e6863;font-weight:700">${escapeHtml(
                key,
              )}</td><td style="border-bottom:1px solid #e5e5e5">${escapeHtml(
                value,
              ).replaceAll("\n", "<br />")}</td></tr>`,
          )
          .join("")}
      </table>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "EMDECOB Web <web@emdecob.com>",
        to: [process.env.CONTACT_TO_EMAIL ?? company.email],
        reply_to: correo,
        subject: `[Web EMDECOB] Solicitud ${tipo} · ${nombre}`,
        html,
        attachments,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contacto] Resend error:", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "No pudimos enviar el mensaje. Intente por WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  } catch (error) {
    console.error("[contacto] Error inesperado:", error);
    return NextResponse.json(
      { ok: false, error: "Ocurrió un error inesperado. Intente de nuevo." },
      { status: 500 },
    );
  }
}
