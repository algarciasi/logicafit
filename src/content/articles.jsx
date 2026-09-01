import { CoachNote, ExerciseVideo, RoutineTable } from '../components/blog/ArticleBlocks'

export const articles = [
  {
    slug: '20-anos-entrenando',
    title: 'Lo que he aprendido después de más de 20 años entrenando',
    description: 'Después de más de dos décadas entrenando he cambiado muchas veces de rutina, de opinión y de prioridades. Estas son algunas de las cosas que me habría gustado entender mucho antes.',
    category: 'Experiencia',
    readingTime: '8 min',
    date: 'Sep 2026',
    featured: true,
    // PLACEHOLDER FOTO: Usa una foto real entrenando, formato apaisado.
    image: '/brand/alberto-gym3.jpg', 
    content: (
      <>
        <p className="lead text-xl leading-relaxed text-slate-600 mb-10">
          Si soy sincero, cuando llevaba dos o tres años entrenando creía que lo sabía todo. Sentía que había encontrado "la rutina perfecta". Hoy, más de dos décadas después, no siento que tenga todas las respuestas. Más bien ocurre lo contrario: he aprendido a distinguir lo que de verdad importa de lo que es simple ruido secundario.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">1. Cambiar de rutina constantemente no es progresar</h2>
        <p className="mb-6">
          Al principio es tentador. Entras a internet, ves un sistema nuevo que promete ser revolucionario, y cambias tu entrenamiento. Dos semanas después, pruebas otro. Durante mucho tiempo pensé que "sorprender al músculo" cambiando la rutina significaba mejores resultados.
        </p>
        <p className="mb-6">
          La realidad es que el músculo no se sorprende, se adapta a la tensión que le aplicas. Si cambias los ejercicios cada semana, es imposible saber si estás ganando fuerza real o simplemente mejorando neurológicamente en un movimiento nuevo. Tienes que darle tiempo a una programación para que funcione y, sobre todo, para poder medir si estás progresando de verdad.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">2. Más ejercicios no significa mejor entrenamiento</h2>
        <p className="mb-6">
          Con los años tiendes a simplificar. Antes podía meter siete u ocho ejercicios distintos el día de pecho para "atacar todos los ángulos". Ahora sé que la calidad del esfuerzo y la selección adecuada de tres o cuatro movimientos es infinitamente superior a acumular fatiga sin sentido.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">3. No existe una rutina perfecta</h2>
        <p className="mb-6">
          He pasado por casi todas las estructuras que existen. He hecho rutinas divididas tradicionales (Weider), he entrenado con frecuencia dos, he probado Push/Pull/Legs y Torso/Pierna.
        </p>
        <p className="mb-6">
          ¿La conclusión? Todas pueden funcionar. El contexto de cada persona determina cuál tiene sentido. Si solo puedes ir tres días, una Torso/Pierna igual no es lo ideal y te compensa una Full Body. Si vas cinco, la distribución cambia. Defender un único sistema como el "definitivo" demuestra poca visión.
        </p>

        <CoachNote title="Lo que hago yo">
          Actualmente prefiero mantener una selección relativamente estable de ejercicios. Cambiar una rutina cada pocas semanas me parece mucho menos importante que exprimir realmente la que ya tengo.
        </CoachNote>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">4. La técnica importa, pero no necesitas hacer una tesis</h2>
        <p className="mb-6">
          Debes tener un buen control, un recorrido completo y buscar la estabilidad. Eso es innegociable. Pero a veces veo a gente obsesionada con modificar milimétricamente la rotación de la muñeca o el grado de inclinación del codo, olvidándose de lo básico: mover peso con intención y acercarse al fallo.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">5. Comer bien no necesita ser complicado</h2>
        <p className="mb-6">
          He contado macros al gramo y he comido por intuición. Al final, se trata de principios simples: asegúrate de comer suficiente proteína, mantén las calorías en el rango de tu objetivo (superávit o déficit), elige alimentos razonablemente nutritivos la mayor parte del tiempo y ten flexibilidad. Si no hay adherencia y te supone un estrés constante, la dieta fracasará. No necesitas dietas cerradas de pechuga y brócoli.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">6. El mejor plan es el que puedes mantener</h2>
        <p className="mb-6">
          Tienes un trabajo, quizá una familia, días con más estrés, noches donde duermes peor y un tiempo disponible limitado. El programa tiene que adaptarse a ti, no tú al programa. Si tu plan sobre el papel es perfecto pero en tu vida real es inviable, es un mal plan.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">7. Descansar también forma parte del entrenamiento</h2>
        <p className="mb-6">
          Crecemos cuando nos recuperamos, no mientras estamos levantando pesas. Entrenar siempre pensando que "más es mejor" solo te lleva a acumular fatiga residual que termina frenando tu progreso o causando molestias articulares.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">8. Tener experiencia no significa no necesitar ayuda</h2>
        <p className="mb-6">
          Llevo toda una vida entre hierros, me he formado profesionalmente para esto, y sin embargo, yo también tengo mi propio entrenador.
        </p>
        <p className="mb-6">
          ¿Por qué? Porque la perspectiva externa es vital. Alguien objetivo que vea mis entrenamientos, que evite que modifique cosas continuamente cuando tengo un mal día, y que me obligue a rendir cuentas. Tener entrenador no significa no saber entrenar; significa entender el valor de la objetividad.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">9. He cambiado de opinión muchas veces</h2>
        <p className="mb-6">
          Aprender implica revisar ideas. Cosas que defendía a muerte hace quince años, hoy sé que no son ciertas. Y no pasa nada. Cambiar de opinión frente a nueva evidencia o nueva experiencia no es una debilidad, es parte natural de avanzar.
        </p>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">10. Si tuviera que resumirlo</h2>
        <p className="mb-6">
          Después de tantos años sigo entrenando por la misma razón por la que empecé: porque me gusta. Disfruto del proceso. La diferencia es que ahora necesito muchas menos cosas para saber si voy por buen camino.
        </p>
        <p className="mb-6">
          Al final, se trata exactamente de eso: menos ruido, más progreso.
        </p>
      </>
    )
  },
  {
    slug: 'press-inclinado-mancuernas',
    title: 'Press inclinado con mancuernas: cómo lo hago y por qué lo utilizo',
    description: 'Analizamos uno de los movimientos más completos para el pectoral. Ejecución, errores comunes y cómo integrarlo en tu rutina.',
    category: 'Ejercicios',
    readingTime: '4 min',
    date: 'Sep 2026',
    featured: false,
    // PLACEHOLDER: Foto tuya haciendo press inclinado
    image: '/brand/estudiando1.jpg', 
    content: (
      <>
        <p className="lead text-lg leading-relaxed text-slate-600 mb-8">
          Si tuviera que quedarme con muy pocos ejercicios para el trabajo de empuje, el press inclinado con mancuernas estaría sin duda en la lista. Ofrece un rango de recorrido excelente, libertad articular y permite cargar pesado con relativa seguridad.
        </p>

        {/* PLACEHOLDER: Video real tuyo haciendo press */}
        <ExerciseVideo 
          videoUrl={null} 
          poster="/brand/estudiando1.jpg"
          caption="Control en la fase excéntrica y empuje vertical. Fíjate en la estabilidad de los hombros."
        />

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">Errores que veo habitualmente</h2>
        <div className="space-y-6 mb-10">
          <div>
            <span className="font-display font-bold text-orange text-lg">01</span>
            <h3 className="font-bold text-navy mt-1">Demasiada inclinación en el banco</h3>
            <p className="text-slate-600 mt-2">Un banco a 45 grados o más suele desplazar demasiado el trabajo hacia el deltoides anterior. Una inclinación sutil (15 a 30 grados) suele ser el punto dulce para la mayoría.</p>
          </div>
          <div>
            <span className="font-display font-bold text-orange text-lg">02</span>
            <h3 className="font-bold text-navy mt-1">Chocar las mancuernas arriba</h3>
            <p className="text-slate-600 mt-2">Hacer chocar las mancuernas en la parte alta del movimiento elimina la tensión mecánica sobre el pectoral y solo desgasta las articulaciones. Detén el movimiento justo antes.</p>
          </div>
          <div>
            <span className="font-display font-bold text-orange text-lg">03</span>
            <h3 className="font-bold text-navy mt-1">Codos en cruz (a 90 grados)</h3>
            <p className="text-slate-600 mt-2">Abrir completamente los codos formando una "T" con el cuerpo es muy agresivo para la articulación del hombro. Busca un ángulo de unos 45-60 grados respecto al torso.</p>
          </div>
        </div>

        <h2 className="mt-12 mb-6 font-display text-2xl font-bold text-navy">Cómo lo incluyo en un día de torso</h2>
        <p className="mb-6 text-slate-600">
          Suelo colocarlo como primer o segundo ejercicio del día, cuando el sistema nervioso central está fresco y podemos aplicar máxima intensidad.
        </p>

        <RoutineTable 
          headers={['Ejercicio', 'Series', 'Reps']}
          rows={[
            ['Press inclinado con mancuernas', '3', '6-10'],
            ['Press plano en máquina', '3', '8-12'],
            ['Aperturas en polea baja', '2', '12-15']
          ]}
        />
      </>
    )
  },
  // PLACEHOLDERS PARA LOS OTROS 10 ARTÍCULOS
  { slug: 'ganar-masa-muscular', title: 'Cómo entrenaría para ganar masa muscular si empezara hoy', category: 'Musculación', date: 'Borrador', description: 'Lo que simplificaría actualmente después de años complicando las cosas sin necesidad.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'weider-torso-pierna-ppl', title: '¿Weider, Torso/Pierna o PPL? La rutina depende más de ti de lo que parece', category: 'Musculación', date: 'Borrador', description: 'Explicar pros y contras sin afirmar que existe un único sistema perfecto.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'cuantos-dias-entrenar-ganar-musculo', title: '¿Cuántos días hay que entrenar para ganar músculo?', category: 'Musculación', date: 'Borrador', description: 'Volumen, frecuencia, recuperación y cómo adaptarlo a tu vida.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'elevaciones-laterales', title: 'Elevaciones laterales: errores que pueden estar limitando tus hombros', category: 'Ejercicios', date: 'Borrador', description: 'Técnica correcta y por qué no necesitas levantar pesos enormes.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'entrenar-espalda', title: 'Cómo entrenar la espalda sin complicarlo más de la cuenta', category: 'Ejercicios', date: 'Borrador', description: 'Tracciones verticales y horizontales. Lo básico suele ser lo más efectivo.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'cuanta-proteina-necesitas', title: 'Cuánta proteína necesitas realmente si entrenas', category: 'Nutrición', date: 'Borrador', description: 'Hablemos de rangos óptimos basados en ciencia, sin necesidad de comer pechuga a todas horas.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'comer-antes-despues-entrenar', title: 'Qué comer antes y después de entrenar sin complicarte', category: 'Nutrición', date: 'Borrador', description: 'Recomendaciones prácticas y hábitos en torno a tu entrenamiento.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'suplementos-deportivos', title: 'Suplementos deportivos: los que considero útiles y los que no', category: 'Nutrición', date: 'Borrador', description: 'Analizamos con tono crítico qué suplementos merecen tu dinero.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'combinar-musculacion-running', title: 'Cómo combinar musculación y running sin que uno arruine al otro', category: 'Running', date: 'Borrador', description: 'Programar fuerza y carrera en la misma semana es posible si gestionas bien la fatiga.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> },
  { slug: 'correr-perder-masa-muscular', title: '¿Correr te hace perder masa muscular?', category: 'Running', date: 'Borrador', description: 'Desmintiendo el mito de que el cardio destruye tus músculos.', featured: false, image: '/brand/placeholder.jpg', content: <p>Borrador...</p> }
]