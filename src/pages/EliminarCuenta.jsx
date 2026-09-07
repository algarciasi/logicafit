// src/pages/EliminarCuenta.jsx
//
// Página: https://logicafit.com/eliminar-cuenta
//
// Esta es la URL que se pega en Play Console → Contenido de la app →
// Seguridad de los datos → Eliminación de datos → "URL de solicitud de
// eliminación de cuenta".
//
// Debe ser pública: sin login, sin NativeOnly, sin geobloqueo.

import { useEffect } from "react";

const ASUNTO = encodeURIComponent("Solicitud de eliminación de cuenta");
const CUERPO = encodeURIComponent(
  `Hola,

Solicito la eliminación de mi cuenta de Lógica Fit y de todos los datos asociados.

Correo con el que me registré:
`
);
const MAILTO = `mailto:tulogicafit@gmail.com?subject=${ASUNTO}&body=${CUERPO}`;

export default function EliminarCuenta() {
  useEffect(() => {
    document.title = "Eliminar tu cuenta | Lógica Fit";
  }, []);

  return (
    <main className="bg-white pt-24 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
          Eliminar tu cuenta
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-navy/80">
          Esta página explica cómo eliminar tu cuenta de Lógica Fit
          (aplicación <code className="text-[15px]">com.logicafit.app</code> y
          web logicafit.com) y qué ocurre con tus datos.
        </p>

        <section className="mt-14 border-t border-navy/10 pt-10">
          <h2 className="text-2xl font-semibold text-navy">
            Desde la aplicación
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[17px] leading-relaxed text-navy/80">
            <li>Inicia sesión y entra en tu panel.</li>
            <li>Abre el apartado de tu perfil.</li>
            <li>Pulsa «Eliminar cuenta» y confirma.</li>
          </ol>
          <p className="mt-4 text-[17px] leading-relaxed text-navy/80">
            La acción es definitiva y no se puede deshacer.
          </p>
        </section>

        <section className="mt-12 border-t border-navy/10 pt-10">
          <h2 className="text-2xl font-semibold text-navy">Por correo</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-navy/80">
            Si no puedes acceder a tu cuenta, escríbenos desde la dirección con
            la que te registraste. Verificaremos que la solicitud procede del
            titular antes de eliminar nada.
          </p>
          <a
            href={MAILTO}
            className="mt-6 inline-block rounded-md bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Solicitar la eliminación por correo
          </a>
          <p className="mt-4 text-[15px] text-navy/60">
            O escribe directamente a tulogicafit@gmail.com
          </p>
        </section>

        <section className="mt-12 border-t border-navy/10 pt-10">
          <h2 className="text-2xl font-semibold text-navy">
            Qué datos se eliminan
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-navy/80">
            <li>Tu cuenta de acceso y tu correo electrónico.</li>
            <li>
              Tu perfil: nombre, edad, sexo, altura, peso, nivel y objetivos.
            </li>
            <li>Tus rutinas asignadas y todo tu historial de rutinas.</li>
            <li>Tus dietas asignadas y todo tu historial de dietas.</li>
            <li>Tus mediciones y registros de progreso.</li>
            <li>
              Tu conexión con Strava y las actividades importadas desde ella.
            </li>
          </ul>
        </section>

        <section className="mt-12 border-t border-navy/10 pt-10">
          <h2 className="text-2xl font-semibold text-navy">Plazos</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-navy/80">
            La eliminación desde la aplicación es inmediata. Las solicitudes por
            correo se atienden en un máximo de 30 días. Las copias de seguridad
            que puedan contener tus datos se sobrescriben dentro de ese mismo
            plazo.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-navy/80">
            No conservamos ningún dato después de ese periodo, salvo la
            documentación de facturación que la normativa fiscal española nos
            obliga a mantener. Esa documentación queda bloqueada y no se usa
            para ninguna otra finalidad.
          </p>
        </section>

        <section className="mt-12 border-t border-navy/10 pt-10">
          <h2 className="text-2xl font-semibold text-navy">
            Eliminar solo algunos datos
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-navy/80">
            Si prefieres mantener la cuenta pero borrar contenido concreto —por
            ejemplo tu historial de entrenamientos o tus datos de Strava—
            escríbenos indicando qué quieres eliminar. La desconexión de Strava
            puedes hacerla tú desde la pestaña Progreso: al desconectar se
            borran los tokens y las actividades importadas.
          </p>
        </section>

        <p className="mt-12 border-t border-navy/10 pt-10 text-[17px] leading-relaxed text-navy/80">
          Más información sobre cómo tratamos tus datos en la{" "}
          <a
            href="/politica-privacidad"
            className="font-medium text-navy underline underline-offset-4"
          >
            Política de Privacidad
          </a>
          .
        </p>
      </div>
    </main>
  );
}