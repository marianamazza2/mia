import type { ReactNode } from 'react'
import { contacto, titular } from '@/lib/contacto'

// Textos legales del sitio (LSSI-CE, RGPD y LOPDGDD). Son una base redactada para Mía:
// conviene que los revise una persona asesora legal antes de publicarlos.

export type IdDocumento = 'aviso-legal' | 'privacidad' | 'cookies'

type Apartado = { titulo: string; contenido: ReactNode }

type Documento = {
  id: IdDocumento
  ruta: string
  nombre: string
  titulo: string
  descripcion: string
  apartados: Apartado[]
}

export const ultimaActualizacion = '25 de octubre de 2026'

const correo = <a href={`mailto:${contacto.email}`}>{contacto.email}</a>

const datosTitular = (
  <ul>
    <li>
      <strong>Titular:</strong> {titular.nombre}, que opera con el nombre comercial «{titular.nombreComercial}».
    </li>
    <li>
      <strong>NIF:</strong> {titular.nif}
    </li>
    <li>
      <strong>Domicilio:</strong> {contacto.direccion}
    </li>
    <li>
      <strong>Correo electrónico:</strong> {correo}
    </li>
    <li>
      <strong>Teléfono:</strong> {contacto.telefonoVisible}
    </li>
  </ul>
)

export const documentos: Documento[] = [
  {
    id: 'aviso-legal',
    ruta: '/aviso-legal',
    nombre: 'Aviso legal',
    titulo: 'Aviso legal',
    descripcion: 'Quién está detrás de este sitio web y en qué condiciones se puede usar.',
    apartados: [
      {
        titulo: 'Datos identificativos',
        contenido: (
          <>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
              Información y de Comercio Electrónico (LSSI-CE), se informa de los datos de la titular del sitio web{' '}
              {titular.dominio}:
            </p>
            {datosTitular}
            <p>La actividad que se presenta en este sitio es la {titular.actividad}.</p>
          </>
        ),
      },
      {
        titulo: 'Objeto y condiciones de uso',
        contenido: (
          <>
            <p>
              Este sitio web tiene como finalidad dar a conocer a {titular.nombreComercial} y sus servicios, y ofrecer
              un canal para ponerse en contacto. Navegar por él atribuye la condición de persona usuaria e implica
              aceptar las condiciones de este aviso legal.
            </p>
            <p>
              La persona usuaria se compromete a hacer un uso adecuado del sitio y de sus contenidos, de acuerdo con
              la ley, la buena fe y el orden público, y a no emplearlos para actividades ilícitas o que puedan dañar
              los derechos de terceros o el funcionamiento del propio sitio.
            </p>
          </>
        ),
      },
      {
        titulo: 'Propiedad intelectual e industrial',
        contenido: (
          <>
            <p>
              Los textos, el diseño, la marca y el logotipo de {titular.nombreComercial}, las fotografías y el resto de
              elementos del sitio pertenecen a su titular o se usan con la autorización correspondiente, y están
              protegidos por la normativa de propiedad intelectual e industrial.
            </p>
            <p>
              No está permitida su reproducción, distribución, comunicación pública o transformación, total o
              parcial, sin autorización expresa y por escrito de la titular, salvo para uso personal y privado.
            </p>
          </>
        ),
      },
      {
        titulo: 'Responsabilidad',
        contenido: (
          <>
            <p>
              La titular procura que la información del sitio sea correcta y esté actualizada, pero no garantiza la
              ausencia de errores ni se responsabiliza de las decisiones que se tomen a partir de ella. Los contenidos
              tienen carácter informativo y no sustituyen un proceso de acompañamiento personalizado.
            </p>
            <p>
              Tampoco se responsabiliza de interrupciones del servicio, fallos técnicos o daños causados por virus u
              otros elementos ajenos a su control, aunque adopta medidas razonables para evitarlos.
            </p>
          </>
        ),
      },
      {
        titulo: 'Enlaces a otros sitios',
        contenido: (
          <p>
            El sitio puede incluir enlaces a servicios de terceros, como WhatsApp o Google Maps. La titular no
            controla esos sitios ni es responsable de sus contenidos ni de sus políticas de privacidad, que conviene
            consultar al acceder a ellos.
          </p>
        ),
      },
      {
        titulo: 'Legislación aplicable y jurisdicción',
        contenido: (
          <p>
            Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a
            los juzgados y tribunales que correspondan según la normativa aplicable; cuando la persona usuaria tenga la
            condición de consumidora, serán los de su domicilio.
          </p>
        ),
      },
    ],
  },
  {
    id: 'privacidad',
    ruta: '/privacidad',
    nombre: 'Privacidad',
    titulo: 'Política de privacidad',
    descripcion: 'Qué datos personales se tratan cuando escribes a Mía, para qué y cuáles son tus derechos.',
    apartados: [
      {
        titulo: 'Responsable del tratamiento',
        contenido: (
          <>
            <p>
              De acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
              Personales y garantía de los derechos digitales (LOPDGDD), la responsable del tratamiento de tus datos
              es:
            </p>
            {datosTitular}
          </>
        ),
      },
      {
        titulo: 'Qué datos tratamos',
        contenido: (
          <>
            <p>Solo los que nos facilitas al ponerte en contacto:</p>
            <ul>
              <li>Mediante el formulario: nombre, correo electrónico, mensaje y, si los indicas, teléfono y empresa.</li>
              <li>Por correo electrónico, teléfono o WhatsApp: los datos y el contenido de la comunicación que nos envíes.</li>
            </ul>
            <p>
              Te pedimos que no incluyas en el mensaje datos especialmente sensibles (por ejemplo, de salud) que no sean
              necesarios para responder a tu consulta.
            </p>
          </>
        ),
      },
      {
        titulo: 'Para qué los usamos',
        contenido: (
          <ul>
            <li>Responder a tu consulta y mantener la conversación que inicies con nosotras.</li>
            <li>
              Si decides contratar un servicio, preparar la propuesta y gestionar la relación profesional, incluidas
              las obligaciones administrativas y fiscales que se deriven.
            </li>
          </ul>
        ),
      },
      {
        titulo: 'Base legal',
        contenido: (
          <ul>
            <li>
              <strong>Tu consentimiento</strong> (art. 6.1.a RGPD), que das al enviar el formulario o escribirnos, y que
              puedes retirar en cualquier momento.
            </li>
            <li>
              <strong>La aplicación de medidas precontractuales o la ejecución de un contrato</strong> (art. 6.1.b
              RGPD), cuando la consulta se refiere a la contratación de un servicio.
            </li>
            <li>
              <strong>El cumplimiento de obligaciones legales</strong> (art. 6.1.c RGPD), por ejemplo, en materia
              fiscal y contable si llega a haber una relación profesional.
            </li>
          </ul>
        ),
      },
      {
        titulo: 'Cuánto tiempo los conservamos',
        contenido: (
          <p>
            Conservamos los datos de las consultas el tiempo necesario para responderlas y, si no se inicia una relación
            profesional, como máximo doce meses. Si se inicia, durante la relación y, después, durante los plazos que
            exige la ley. Pasado ese tiempo, los datos se eliminan.
          </p>
        ),
      },
      {
        titulo: 'Con quién los compartimos',
        contenido: (
          <>
            <p>
              No cedemos tus datos a terceros, salvo obligación legal. Para que el sitio funcione, algunos proveedores
              acceden a ellos como encargados del tratamiento, con contratos que garantizan su protección:
            </p>
            <ul>
              <li>El proveedor de alojamiento del sitio web (Vercel Inc.).</li>
              <li>El proveedor del servicio que recibe los mensajes del formulario y el del correo electrónico.</li>
            </ul>
            <p>
              Algunos de estos proveedores están en Estados Unidos. Las transferencias se amparan en el Marco de
              Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.
            </p>
          </>
        ),
      },
      {
        titulo: 'Tus derechos',
        contenido: (
          <>
            <p>
              Puedes acceder a tus datos, rectificarlos, pedir que se supriman, oponerte a su tratamiento o pedir que se
              limite, solicitar su portabilidad y retirar tu consentimiento en cualquier momento. Para hacerlo, escribe
              a {correo} indicando qué derecho quieres ejercer.
            </p>
            <p>
              Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la
              Agencia Española de Protección de Datos (
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
                www.aepd.es
              </a>
              ).
            </p>
          </>
        ),
      },
      {
        titulo: 'Personas menores de edad',
        contenido: (
          <p>
            Este sitio y sus servicios están dirigidos a personas adultas. No tratamos conscientemente datos de menores
            de 14 años.
          </p>
        ),
      },
      {
        titulo: 'Seguridad y cambios en esta política',
        contenido: (
          <p>
            Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos. Podemos actualizar esta
            política para adaptarla a cambios legales o del propio sitio; la fecha de la última actualización aparece
            al principio de la página.
          </p>
        ),
      },
    ],
  },
  {
    id: 'cookies',
    ruta: '/cookies',
    nombre: 'Cookies',
    titulo: 'Política de cookies',
    descripcion: 'Qué guarda este sitio en tu navegador mientras lo visitas.',
    apartados: [
      {
        titulo: 'Qué son las cookies',
        contenido: (
          <p>
            Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu
            visita, como tus preferencias o tu recorrido por las páginas.
          </p>
        ),
      },
      {
        titulo: 'Qué cookies usa este sitio',
        contenido: (
          <>
            <p>
              Este sitio <strong>no utiliza cookies</strong> ni tecnologías similares de análisis, publicidad o
              seguimiento. Tampoco carga contenidos de terceros que las instalen: las tipografías se sirven desde el
              propio sitio y los mapas o la mensajería solo se abren si haces clic en sus enlaces.
            </p>
            <p>Por eso no te mostramos un aviso para aceptarlas.</p>
          </>
        ),
      },
      {
        titulo: 'Enlaces a servicios de terceros',
        contenido: (
          <p>
            Si haces clic en los enlaces a WhatsApp o Google Maps, saldrás de este sitio y esos servicios podrán
            instalar sus propias cookies, según sus políticas.
          </p>
        ),
      },
      {
        titulo: 'Cambios en esta política',
        contenido: (
          <p>
            Si en el futuro incorporamos cookies que no sean estrictamente necesarias, actualizaremos esta política y te
            pediremos tu consentimiento antes de instalarlas. Para cualquier duda, escríbenos a {correo}.
          </p>
        ),
      },
    ],
  },
]
