// src/pages/PoliticaPrivacidad.jsx
//
// Página: https://logicafit.com/politica-privacidad
//
// ⚠️ ANTES DE PUBLICAR: rellena los campos marcados con [[ ]] en la sección 1
//    y confirma la región de Supabase en la sección 6. Google Play rechaza
//    políticas con datos de contacto genéricos o sin responsable identificado.
//
// Nota: usa `navy` de tu theme de Tailwind. Si el token no existe en algún
// contexto, sustituye por `slate-900`.

import { useEffect } from "react";

const ULTIMA_ACTUALIZACION = "7 de septiembre de 2026";

const SECCIONES = [
  ["responsable", "Quién trata tus datos"],
  ["datos", "Qué datos recogemos"],
  ["salud", "Datos de salud y actividad física"],
  ["finalidades", "Para qué usamos cada dato"],
  ["strava", "Conexión con Strava"],
  ["terceros", "Proveedores y transferencias internacionales"],
  ["conservacion", "Cuánto tiempo conservamos los datos"],
  ["derechos", "Tus derechos"],
  ["eliminar", "Cómo eliminar tu cuenta"],
  ["permisos", "Permisos de la aplicación Android"],
  ["menores", "Menores de edad"],
  ["seguridad", "Seguridad"],
  ["cambios", "Cambios en esta política"],
  ["contacto", "Contacto"],
];

function Seccion({ id, titulo, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-navy/10 pt-10">
      <h2 className="text-2xl font-semibold text-navy">{titulo}</h2>
      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-navy/80">
        {children}
      </div>
    </section>
  );
}

export default function PoliticaPrivacidad() {
  useEffect(() => {
    document.title = "Política de Privacidad | Lógica Fit";
  }, []);

  return (
    <main className="bg-white pt-24 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="pb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-navy/60">
            Última actualización: {ULTIMA_ACTUALIZACION}
          </p>
          <p className="mt-6 text-[17px] leading-relaxed text-navy/80">
            Esta política explica qué datos personales tratamos en la web{" "}
            <span className="font-medium">logicafit.com</span> y en la
            aplicación Android <span className="font-medium">Lógica Fit</span>{" "}
            (<code className="text-[15px]">com.logicafit.app</code>), con qué
            finalidad, durante cuánto tiempo y con quién los compartimos. Se
            aplica el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018
            (LOPDGDD).
          </p>
        </header>

        <nav
          aria-label="Índice de contenidos"
          className="rounded-lg bg-navy/[0.04] px-6 py-5"
        >
          <ol className="space-y-1.5 text-navy/70">
            {SECCIONES.map(([id, titulo], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="hover:text-navy hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  <span className="tabular-nums text-navy/40">{i + 1}.</span>{" "}
                  {titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 space-y-12">
          <Seccion id="responsable" titulo="1. Quién trata tus datos">
            <p>
              El responsable del tratamiento es{" "}
              <span className="font-medium">Alberto Miguel García Simó</span>,
              con NIF <span className="font-medium">[[NIF]]</span> y domicilio
              a efectos de notificaciones en{" "}
              <span className="font-medium">[[DIRECCIÓN COMPLETA]]</span>,
              España.
            </p>
            <p>
              Correo de contacto en materia de protección de datos:{" "}
              <a
                href="mailto:tulogicafit@gmail.com"
                className="font-medium text-navy underline underline-offset-4"
              >
                tulogicafit@gmail.com
              </a>
            </p>
            <p>
              No hemos designado un Delegado de Protección de Datos, al no
              concurrir ninguno de los supuestos del artículo 37 del RGPD.
            </p>
          </Seccion>

          <Seccion id="datos" titulo="2. Qué datos recogemos">
            <p>
              Solo recogemos datos que tú nos facilitas o que se generan al usar
              el servicio. No compramos bases de datos ni obtenemos tus datos de
              fuentes externas.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Datos de cuenta y acceso
            </h3>
            <p>
              Dirección de correo electrónico y contraseña. La contraseña se
              almacena cifrada mediante función hash y en ningún momento es
              legible por nosotros. Al iniciar sesión se generan un
              identificador de usuario y un token de sesión.
            </p>

            <h3 className="pt-2 font-semibold text-navy">Datos de perfil</h3>
            <p>
              Nombre, y los datos que introduzcas para que podamos programar tu
              entrenamiento: edad o fecha de nacimiento, sexo, altura, peso,
              nivel de experiencia y objetivos.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Datos de entrenamiento y nutrición
            </h3>
            <p>
              Rutinas asignadas, series, repeticiones y cargas registradas,
              dietas asignadas por comida y día, alimentos y gramajes, historial
              de rutinas y dietas anteriores, y las mediciones de progreso que
              registres.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Datos de actividad deportiva importados de Strava
            </h3>
            <p>
              Si conectas tu cuenta de Strava: nombre y tipo de actividad,
              fecha, duración, distancia, ritmo, desnivel, frecuencia cardiaca
              cuando esté disponible, y los tokens de acceso necesarios para
              mantener la conexión. Ver el apartado 5.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Datos técnicos de conexión
            </h3>
            <p>
              Nuestros proveedores de alojamiento registran de forma automática
              la dirección IP, la fecha y hora de acceso y el tipo de navegador
              o dispositivo, con fines de seguridad y prevención de abuso. No
              utilizamos estos registros para elaborar perfiles.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Comunicaciones contigo
            </h3>
            <p>
              Si nos escribes por correo electrónico o WhatsApp, conservamos el
              contenido de esa conversación para poder atenderte.
            </p>

            <div className="rounded-lg border border-navy/15 bg-navy/[0.03] p-5">
              <p className="font-semibold text-navy">Lo que no hacemos</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  No usamos herramientas de publicidad ni redes de anuncios.
                </li>
                <li>
                  No usamos SDK de analítica de terceros ni identificadores
                  publicitarios.
                </li>
                <li>No vendemos ni cedemos tus datos con fines comerciales.</li>
                <li>
                  No accedemos a tu ubicación en tiempo real, tu cámara, tu
                  micrófono ni tu agenda de contactos.
                </li>
                <li>
                  No tomamos decisiones automatizadas con efectos jurídicos
                  sobre ti.
                </li>
              </ul>
            </div>
          </Seccion>

          <Seccion id="salud" titulo="3. Datos de salud y actividad física">
            <p>
              Tu peso, tus medidas, tus registros de entrenamiento, tu dieta y
              tus datos de frecuencia cardiaca son{" "}
              <span className="font-medium">
                datos relativos a la salud
              </span>
              , considerados categoría especial por el artículo 9 del RGPD.
            </p>
            <p>
              Los tratamos únicamente sobre la base de tu{" "}
              <span className="font-medium">consentimiento explícito</span>,
              que prestas al registrarte y al introducir cada dato, y con la
              única finalidad de diseñar y ajustar tu programa de entrenamiento
              y alimentación. Puedes retirar ese consentimiento en cualquier
              momento eliminando los datos o tu cuenta, sin que ello afecte a la
              licitud del tratamiento previo.
            </p>
            <p>
              Estos datos son accesibles exclusivamente por ti y por el
              entrenador responsable de tu seguimiento. No se comparten con
              aseguradoras, empleadores ni ningún tercero con fines comerciales.
            </p>
          </Seccion>

          <Seccion id="finalidades" titulo="4. Para qué usamos cada dato">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[16px]">
                <thead>
                  <tr className="border-b border-navy/20 text-navy">
                    <th className="py-3 pr-4 font-semibold">Finalidad</th>
                    <th className="py-3 pr-4 font-semibold">Datos</th>
                    <th className="py-3 font-semibold">Base jurídica</th>
                  </tr>
                </thead>
                <tbody className="text-navy/80">
                  <tr className="border-b border-navy/10">
                    <td className="py-3 pr-4 align-top">
                      Crear y mantener tu cuenta
                    </td>
                    <td className="py-3 pr-4 align-top">Correo, contraseña</td>
                    <td className="py-3 align-top">
                      Ejecución del contrato (art. 6.1.b)
                    </td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-3 pr-4 align-top">
                      Diseñar tu rutina y tu dieta y hacer seguimiento
                    </td>
                    <td className="py-3 pr-4 align-top">
                      Perfil, entrenamiento, nutrición, medidas
                    </td>
                    <td className="py-3 align-top">
                      Consentimiento explícito (art. 9.2.a)
                    </td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-3 pr-4 align-top">
                      Mostrar tu actividad deportiva en el panel de progreso
                    </td>
                    <td className="py-3 pr-4 align-top">Datos de Strava</td>
                    <td className="py-3 align-top">
                      Consentimiento (art. 6.1.a y 9.2.a)
                    </td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-3 pr-4 align-top">
                      Generar los PDF de tu rutina o dieta
                    </td>
                    <td className="py-3 pr-4 align-top">
                      Entrenamiento, nutrición
                    </td>
                    <td className="py-3 align-top">
                      Ejecución del contrato (art. 6.1.b)
                    </td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-3 pr-4 align-top">
                      Atender tus consultas
                    </td>
                    <td className="py-3 pr-4 align-top">
                      Comunicaciones, correo
                    </td>
                    <td className="py-3 align-top">
                      Interés legítimo en atender al usuario (art. 6.1.f)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 align-top">
                      Seguridad del servicio y prevención de fraude
                    </td>
                    <td className="py-3 pr-4 align-top">
                      IP, registros de acceso
                    </td>
                    <td className="py-3 align-top">
                      Interés legítimo en proteger el servicio (art. 6.1.f)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Seccion>

          <Seccion id="strava" titulo="5. Conexión con Strava">
            <p>
              La conexión con Strava es{" "}
              <span className="font-medium">voluntaria</span>. La app funciona
              con normalidad sin ella.
            </p>
            <p>
              Si decides conectarla, se te redirige a Strava para que autorices
              el acceso. Nosotros no vemos ni almacenamos tus credenciales de
              Strava: recibimos únicamente un token de autorización, que se
              guarda en nuestro servidor con acceso restringido y no es legible
              desde la aplicación.
            </p>
            <p>
              Importamos las actividades del alcance que hayas autorizado para
              mostrarlas en tu panel de progreso. Puedes desconectar Strava en
              cualquier momento desde la pestaña Progreso. Al desconectar,
              revocamos la autorización y eliminamos de nuestros sistemas tanto
              los tokens como las actividades importadas.
            </p>
            <p>
              El tratamiento que Strava haga de tus datos en su propia
              plataforma se rige por su política de privacidad, disponible en{" "}
              <a
                href="https://www.strava.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy underline underline-offset-4"
              >
                strava.com/legal/privacy
              </a>
              .
            </p>
          </Seccion>

          <Seccion
            id="terceros"
            titulo="6. Proveedores y transferencias internacionales"
          >
            <p>
              Para prestar el servicio recurrimos a los siguientes encargados
              del tratamiento, con los que mantenemos el contrato exigido por el
              artículo 28 del RGPD:
            </p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <span className="font-medium">Supabase</span> — base de datos,
                autenticación, almacenamiento de archivos y funciones de
                servidor. Aloja la práctica totalidad de tus datos, incluidos
                los datos de salud. Servidores situados en{" "}
                <span className="font-medium">Irlanda (Unión Europea)</span>,
                por lo que estos datos no salen del Espacio Económico Europeo.
              </li>
              <li>
                <span className="font-medium">Netlify</span> — alojamiento y
                distribución de la web. Trata direcciones IP y registros de
                acceso.
              </li>
              <li>
                <span className="font-medium">Strava</span> — únicamente si
                activas la integración descrita en el apartado 5.
              </li>
              <li>
                <span className="font-medium">Google Play</span> — distribución
                de la aplicación Android. Google trata los datos de descarga e
                instalación como responsable independiente, conforme a su propia
                política.
              </li>
            </ul>
            <p>
              Tu perfil, tus rutinas, tus dietas, tus mediciones y tus
              actividades importadas se almacenan íntegramente en servidores de
              la Unión Europea y no se transfieren fuera del Espacio Económico
              Europeo.
            </p>
            <p>
              Sí existe transferencia internacional en dos supuestos concretos.
              Primero, los registros técnicos de conexión (dirección IP, fecha
              y navegador) que genera Netlify al servir la web, ya que su red
              de distribución opera nodos fuera de la UE. Segundo, los datos que
              intercambiamos con Strava si activas voluntariamente esa
              integración. En ambos casos la transferencia se ampara en las
              Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o
              en el Marco de Privacidad de Datos UE-EE. UU., junto con las
              medidas técnicas adicionales aplicadas por cada proveedor.
            </p>
            <p>
              También podremos comunicar datos a las Fuerzas y Cuerpos de
              Seguridad, juzgados o administraciones públicas cuando exista una
              obligación legal.
            </p>
          </Seccion>

          <Seccion
            id="conservacion"
            titulo="7. Cuánto tiempo conservamos los datos"
          >
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Datos de cuenta, perfil, entrenamiento y nutrición: mientras
                mantengas la cuenta activa.
              </li>
              <li>
                Datos importados de Strava: hasta que desconectes la
                integración.
              </li>
              <li>
                Tras solicitar la eliminación de la cuenta: se eliminan en un
                plazo máximo de 30 días.
              </li>
              <li>
                Registros técnicos de seguridad: hasta 12 meses desde su
                generación.
              </li>
              <li>
                Documentación con relevancia fiscal o contable derivada de
                pagos: los plazos legalmente exigidos, con acceso bloqueado para
                cualquier otra finalidad.
              </li>
            </ul>
          </Seccion>

          <Seccion id="derechos" titulo="8. Tus derechos">
            <p>
              Puedes ejercer en cualquier momento los derechos de acceso,
              rectificación, supresión, oposición, limitación del tratamiento,
              portabilidad y retirada del consentimiento.
            </p>
            <p>
              Escríbenos a{" "}
              <a
                href="mailto:tulogicafit@gmail.com"
                className="font-medium text-navy underline underline-offset-4"
              >
                tulogicafit@gmail.com
              </a>{" "}
              indicando qué derecho quieres ejercer. Responderemos en el plazo
              máximo de un mes. Podemos pedirte que acredites tu identidad si
              existen dudas razonables sobre quién realiza la solicitud.
            </p>
            <p>
              Si consideras que no hemos atendido correctamente tu solicitud,
              puedes presentar una reclamación ante la Agencia Española de
              Protección de Datos (C/ Jorge Juan 6, 28001 Madrid —{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy underline underline-offset-4"
              >
                aepd.es
              </a>
              ).
            </p>
          </Seccion>

          <Seccion id="eliminar" titulo="9. Cómo eliminar tu cuenta">
            <p>
              Puedes eliminar tu cuenta y todos los datos asociados de dos
              formas:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Desde la aplicación o la web, en el apartado de tu perfil.
              </li>
              <li>
                Escribiendo a{" "}
                <a
                  href="mailto:tulogicafit@gmail.com"
                  className="font-medium text-navy underline underline-offset-4"
                >
                  tulogicafit@gmail.com
                </a>{" "}
                desde el correo con el que te registraste.
              </li>
            </ul>
            <p>
              Al eliminar la cuenta se borran tu perfil, tus rutinas, tus
              dietas, tu historial, tus mediciones y las actividades importadas
              de Strava. El borrado se completa en un plazo máximo de 30 días,
              incluidas las copias de seguridad. Solo se conserva la
              documentación que estemos legalmente obligados a mantener por
              motivos fiscales.
            </p>
            <p>
              Puedes consultar el procedimiento detallado en{" "}
              <a
                href="/eliminar-cuenta"
                className="font-medium text-navy underline underline-offset-4"
              >
                logicafit.com/eliminar-cuenta
              </a>
              .
            </p>
          </Seccion>

          <Seccion
            id="permisos"
            titulo="10. Permisos de la aplicación Android"
          >
            <p>
              La aplicación es un contenedor de la web y solicita el mínimo
              imprescindible:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium">Acceso a Internet</span> —
                necesario para conectar con el servidor y mostrar tus datos.
              </li>
              <li>
                <span className="font-medium">
                  Estado de la conexión de red
                </span>{" "}
                — para detectar si estás sin conexión.
              </li>
            </ul>
            <p>
              La aplicación no solicita permisos de ubicación, cámara,
              micrófono, contactos, almacenamiento externo ni sensores
              corporales.
            </p>
          </Seccion>

          <Seccion id="menores" titulo="11. Menores de edad">
            <p>
              El servicio está dirigido a personas mayores de 18 años. Los
              menores de 14 años no pueden registrarse por sí mismos, conforme
              al artículo 7 de la LOPDGDD. Si detectamos una cuenta creada por
              un menor sin el consentimiento de su titular de la patria potestad
              o tutela, la eliminaremos junto con sus datos.
            </p>
          </Seccion>

          <Seccion id="seguridad" titulo="12. Seguridad">
            <p>
              Todo el tráfico viaja cifrado mediante HTTPS. El acceso a la base
              de datos está protegido por políticas de seguridad a nivel de fila
              (Row Level Security), de modo que cada usuario solo puede leer y
              modificar sus propios registros. Las contraseñas se almacenan
              cifradas y los tokens de integraciones externas se manejan
              exclusivamente en el servidor.
            </p>
            <p>
              Ningún sistema es infalible. Si se produjera una brecha de
              seguridad que suponga un riesgo alto para tus derechos, te
              informaremos y lo notificaremos a la AEPD en el plazo de 72 horas
              previsto en el artículo 33 del RGPD.
            </p>
          </Seccion>

          <Seccion id="cambios" titulo="13. Cambios en esta política">
            <p>
              Si modificamos esta política, actualizaremos la fecha del
              encabezado. Cuando el cambio afecte de forma sustancial a cómo
              tratamos tus datos, te avisaremos por correo electrónico o
              mediante un aviso dentro de la aplicación antes de que entre en
              vigor.
            </p>
          </Seccion>

          <Seccion id="contacto" titulo="14. Contacto">
            <p>
              Para cualquier duda sobre esta política o sobre el tratamiento de
              tus datos:
            </p>
            <p>
              Correo:{" "}
              <a
                href="mailto:tulogicafit@gmail.com"
                className="font-medium text-navy underline underline-offset-4"
              >
                tulogicafit@gmail.com
              </a>
              <br />
              WhatsApp:{" "}
              <a
                href="https://wa.me/34678951544"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy underline underline-offset-4"
              >
                +34 678 951 544
              </a>
            </p>
          </Seccion>
        </div>
      </div>
    </main>
  );
}