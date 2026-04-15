# Ideas de Diseño — Portfolio Carlos Martínez Lasierra

<response>
<text>
## Opción A — "Brutalist Chromatic"

**Design Movement:** Brutalismo digital con explosión de color cromático
**Core Principles:**
1. Tipografía enorme y sin miedo — texto como elemento visual dominante
2. Colores que "infectan" la pantalla al hacer hover — transiciones de fondo completas
3. Elementos sin padding excesivo, bordes crudos, composición asimétrica
4. Física 2D para las skills — pills que flotan y rebotan

**Color Philosophy:** Fondo negro profundo como lienzo. Cada categoría tiene un color neón asignado que toma el control del fondo al activarse. El contraste extremo negro/neón genera impacto visual inmediato.

**Layout Paradigm:** Una sola página larga con secciones que ocupan el 100vw. El hero tiene las skills flotando con Matter.js. La sección de proyectos usa un grid asimétrico donde las tarjetas tienen diferentes tamaños.

**Signature Elements:**
- Bordes punteados verdes neón en hover (como Skylrk)
- Texto enorme que sangra fuera del viewport
- Números de sección en tipografía monospace gigante como decoración

**Interaction Philosophy:** Cada hover cambia el color de fondo de toda la sección. Las skills flotan con física real. El cursor tiene un trail de color.

**Animation:** Transiciones de color de fondo con ease-in-out 0.6s. Skills con Matter.js gravity. Entrada de secciones con slide-up desde abajo.

**Typography System:** Display: "Space Grotesk" bold 900 para títulos. Body: "DM Mono" para detalles técnicos. Contraste máximo entre pesos.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Opción B — "Grain & Glow" ← ELEGIDA

**Design Movement:** Post-digital minimalismo con textura analógica y color vivo
**Core Principles:**
1. Fondo con textura de grano fotográfico (noise filter) — como Skylrk pero en oscuro
2. Colores que emergen del negro como luz — no planos, sino luminosos
3. Elementos flotantes en canvas libre — sin grid rígido
4. Transiciones de color de fondo suaves al navegar entre categorías

**Color Philosophy:** Fondo negro/muy oscuro con grano. Cada categoría emite su propio "glow" de color. Los colores son saturados pero no agresivos: naranja cálido, azul eléctrico, verde lima, coral, violeta. El grano hace que los colores se sientan orgánicos y no digitales.

**Layout Paradigm:** Hero con canvas de física (Matter.js) donde las skills flotan. Secciones de ancho completo con transición de color de fondo. Proyectos en grid asimétrico con hover que revela el color de la categoría.

**Signature Elements:**
- Textura de grano SVG en overlay sobre todo el fondo
- Pills de skills con física de rebote real
- Color de fondo que transiciona suavemente al hacer hover en proyectos

**Interaction Philosophy:** El usuario "descubre" los colores al explorar. Cada sección tiene su temperatura cromática. El cursor interactúa con las pills flotantes.

**Animation:** Framer Motion para transiciones de página y secciones. Matter.js para física de pills. CSS filter grain en overlay animado sutilmente.

**Typography System:** Display: "Bebas Neue" para impacto en títulos grandes. Subtítulos: "Space Grotesk" medium. Body: "Inter" 400 para legibilidad. Contraste de personalidad entre display y body.
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## Opción C — "Editorial Tech"

**Design Movement:** Editorial de revista de tecnología/moda — Kinfolk meets Wired
**Core Principles:**
1. Grid editorial con columnas irregulares
2. Fotografía y tipografía como elementos de igual peso visual
3. Colores de acento muy específicos, no paletas amplias
4. Animaciones de entrada tipo periódico — texto que aparece línea a línea

**Color Philosophy:** Blanco roto como base. Un único color de acento por sección (no múltiples). El color es escaso y por tanto más poderoso cuando aparece.

**Layout Paradigm:** Grid de 12 columnas editorial. Algunos elementos ocupan 8 columnas, otros 4. Asimetría calculada.

**Signature Elements:**
- Líneas finas horizontales como separadores
- Números de página en esquinas
- Texto que aparece carácter a carácter en hover

**Interaction Philosophy:** Sutil y refinado. Las animaciones son lentas y deliberadas. El usuario siente que está leyendo algo importante.

**Animation:** Typewriter effect en títulos. Fade-in editorial en secciones. Sin física — todo es control y elegancia.

**Typography System:** "Playfair Display" para títulos. "IBM Plex Mono" para datos técnicos. "Lato" para body. Jerarquía muy marcada.
</text>
<probability>0.07</probability>
</response>

---

## Decisión Final: Opción B — "Grain & Glow"

Esta opción captura perfectamente las dos referencias de Carlos:
- El efecto de cambio de color de Skylrk (fondo que cambia por categoría/hover)
- La física de antigravedad del vídeo (Matter.js para pills flotantes)
- Añade la textura de grano que hace que todo se sienta artesanal y no genérico
