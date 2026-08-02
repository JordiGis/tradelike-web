import type { ReactNode } from "react";
import { Nav } from "./components/Nav";
import { CandleField } from "./components/CandleField";
import { Footer } from "./components/Footer";

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[var(--color-hairline)] py-10">
      <div className="mb-4 flex items-baseline gap-4">
        <span className="font-display text-xs text-champagne-dim">{n}</span>
        <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
      </div>
      <div className="space-y-3 text-sm leading-relaxed font-light text-ink-dim">{children}</div>
    </section>
  );
}

export function Legal() {
  return (
    <div className="min-h-screen text-ink">
      <CandleField className="fixed inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
      <Nav variant="legal" />

      <main className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow mb-5">Legal</p>
        <h1 className="font-display text-4xl font-medium text-ink">Política de privacidad</h1>
        <p className="mt-3 text-xs tracking-wide text-ink-mute">
          Última actualización: 2 de agosto de 2026
        </p>

        <p className="mt-10 text-sm leading-relaxed font-light text-ink-dim">
          Esta política explica qué datos trata la aplicación <span className="text-ink">Tradelike</span> (en
          adelante, «la app»), disponible en Google Play, y los motivos por los que se tratan.
          Aplica el Reglamento General de Protección de Datos de la UE (RGPD/GDPR) y la normativa
          española de protección de datos.
        </p>

        <Section n="01" title="Responsable del tratamiento">
          <p>
            Jordi Gisbert Ferriz, con domicilio en España, es responsable del tratamiento de los
            datos descritos en esta política. Contacto para cualquier consulta o para ejercer tus
            derechos:{" "}
            <a className="text-champagne hover:underline" href="mailto:hola@jordigis.dev">
              hola@jordigis.dev
            </a>.
          </p>
        </Section>

        <Section n="02" title="Qué datos se tratan">
          <p>
            Tradelike <span className="text-ink">no requiere registro ni cuenta</span>: no hay
            login, no hay nombre, email ni contraseña que enviarnos. La partida se guarda
            únicamente en el propio dispositivo.
          </p>
          <p>
            El único tratamiento de datos personales viene de los proveedores de publicidad que
            financian la app gratuita, que pueden recoger de forma automática:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Identificador de publicidad del dispositivo (p. ej. el AAID de Android), para
              poder mostrar o medir anuncios.</li>
            <li>Dirección IP aproximada y datos técnicos del dispositivo (modelo, sistema
              operativo, idioma).</li>
            <li>Interacción con los anuncios mostrados (impresiones, clics, vídeos completados).</li>
          </ul>
          <p>
            La app no accede a contactos, ubicación precisa, cámara, micrófono ni almacenamiento
            del dispositivo más allá de su propia carpeta de guardado.
          </p>
        </Section>

        <Section n="03" title="Proveedores de terceros">
          <p>El siguiente servicio procesa datos en nombre propio, según su propia política de privacidad:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="text-ink">Google AdMob</span> — servicio de anuncios, con su
              plataforma de gestión del consentimiento (UMP) para usuarios en la UE/Reino Unido.{" "}
              <a className="text-champagne hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener">
                Política de privacidad de Google
              </a>
            </li>
          </ul>
          <p>
            Esta lista se ampliará si en el futuro se añade una red de mediación publicitaria o
            un servicio de analítica — la fecha de la última actualización, arriba, refleja
            cuándo cambió por última vez.
          </p>
        </Section>

        <Section n="04" title="Finalidad y base legal">
          <p>Los datos anteriores se tratan para:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Mostrar anuncios que permiten que la app sea gratuita (interés legítimo para
              anuncios no personalizados; consentimiento explícito para anuncios personalizados,
              solicitado antes de mostrarlos a usuarios en la UE/Reino Unido a través del mensaje
              de consentimiento).</li>
            <li>Medir el rendimiento de los anuncios y prevenir fraude.</li>
          </ul>
        </Section>

        <Section n="05" title="Tus derechos">
          <p>
            Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
            oposición, limitación y portabilidad escribiendo a{" "}
            <a className="text-champagne hover:underline" href="mailto:hola@jordigis.dev">
              hola@jordigis.dev
            </a>. También puedes retirar el consentimiento de anuncios personalizados desde el
            propio mensaje de consentimiento que muestra la app, o presentar una reclamación ante
            la{" "}
            <a className="text-champagne hover:underline" href="https://www.aepd.es/" target="_blank" rel="noopener">
              Agencia Española de Protección de Datos
            </a>.
          </p>
        </Section>

        <Section n="06" title="Menores de edad">
          <p>
            Tradelike no está dirigida a menores de 13 años y no solicita ni recoge
            intencionadamente datos de menores. Si un padre o tutor cree que un menor nos ha
            facilitado datos, puede contactar para su eliminación.
          </p>
        </Section>

        <Section n="07" title="Transferencias internacionales">
          <p>
            El proveedor mencionado en el punto 3 puede procesar datos fuera del Espacio
            Económico Europeo. En esos casos se apoya en las Cláusulas Contractuales Tipo de la
            Comisión Europea u otro mecanismo de transferencia válido conforme al RGPD.
          </p>
        </Section>

        <Section n="08" title="Conservación">
          <p>
            Los identificadores de publicidad se conservan el tiempo que determine el proveedor
            conforme a sus propias políticas; la app no mantiene un servidor propio ni una base
            de datos propia de usuarios.
          </p>
        </Section>

        <Section n="09" title="Cambios en esta política">
          <p>
            Esta política puede actualizarse para reflejar cambios técnicos, legales o de
            proveedores. La fecha de la última actualización aparece al principio de esta página.
          </p>
        </Section>
      </main>

      <Footer />
      </div>
    </div>
  );
}
