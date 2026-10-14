---
name: Dogtoralia Vet
description: Veterinaria de barrio en Puente Alto y Santiago Centro; el sitio es la vitrina vinilada de la propia sede.
colors:
  vinilo-azul: "#1d6f91"
  vinilo-verde: "#4f7a2a"
  vinilo-mostaza: "#d0911a"
  grafito: "#2b2727"
  grafito-suave: "#4a4444"
  muro: "#eceeed"
  background: "#ffffff"
  whatsapp: "#0f7d43"
  whatsapp-dark: "#0b6435"
  error: "#b42318"
  error-suave: "#fdeceb"
typography:
  display:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.05rem, 5.2vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  titulo-pagina:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  cierre:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.8vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  title:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  legal-rotulo:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "0.01em"
  rotulo-barra:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  rotulo-nav:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0.01em"
  numeral:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "8rem"
    fontWeight: 800
    lineHeight: 0.8
  numeral-movil:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "6rem"
    fontWeight: 800
    lineHeight: 0.8
  cartel:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.025em"
  nombre-producto:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
  cita-destacada:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  cita:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
  legal-cuerpo:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.375
  etiqueta:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.025em"
rounded:
  panel: "3px"
  etiqueta: "4px"
  casilla: "5px"
  marco: "6px"
  rotulo: "8px"
  placa: "10px"
  disco: "9999px"
spacing:
  marco-movil: "6px"
  marco: "8px"
  gutter-movil: "12px"
  gutter: "24px"
  seccion-movil: "56px"
  seccion: "80px"
  seccion-home-movil: "64px"
  seccion-home: "96px"
components:
  marco-vitrina:
    backgroundColor: "{colors.grafito}"
    rounded: "{rounded.marco}"
    padding: "8px"
  panel-azul:
    backgroundColor: "{colors.vinilo-azul}"
    textColor: "{colors.background}"
    rounded: "{rounded.panel}"
    padding: "28px 28px"
  panel-verde:
    backgroundColor: "{colors.vinilo-verde}"
    textColor: "{colors.background}"
    rounded: "{rounded.panel}"
    padding: "40px 36px"
  panel-mostaza:
    backgroundColor: "{colors.vinilo-mostaza}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.panel}"
    padding: "28px 28px"
  panel-grafito:
    backgroundColor: "{colors.grafito-suave}"
    textColor: "{colors.background}"
    rounded: "{rounded.panel}"
    padding: "28px 28px"
  panel-blanco:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.panel}"
    padding: "40px 36px"
  letrero-puerta:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.placa}"
    padding: "24px 16px 16px"
  cartel-abierto:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.background}"
    typography: "{typography.cartel}"
    rounded: "{rounded.marco}"
    padding: "2px 10px"
  cartel-cierra-pronto:
    backgroundColor: "{colors.vinilo-mostaza}"
    textColor: "{colors.grafito}"
    typography: "{typography.cartel}"
    rounded: "{rounded.marco}"
    padding: "2px 10px"
  cartel-cerrado:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.background}"
    typography: "{typography.cartel}"
    rounded: "{rounded.marco}"
    padding: "2px 10px"
  boton-placa:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.placa}"
    padding: "6px 6px 6px 16px"
    height: "48px"
  boton-placa-grafito:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.background}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.placa}"
    padding: "6px 6px 6px 20px"
    height: "48px"
  boton-secundario:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.placa}"
    padding: "0 24px"
    height: "48px"
  disco-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.background}"
    rounded: "{rounded.disco}"
    size: "48px"
  disco-whatsapp-hover:
    backgroundColor: "{colors.whatsapp-dark}"
  disco-whatsapp-tarjeta:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.background}"
    rounded: "{rounded.disco}"
    size: "44px"
  estado-hero:
    backgroundColor: "{colors.vinilo-azul}"
    textColor: "{colors.background}"
    typography: "{typography.label}"
    height: "32px"
  fila-servicio:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    typography: "{typography.title}"
    padding: "24px 0"
  retrato:
    backgroundColor: "{colors.grafito}"
    rounded: "{rounded.marco}"
  franja-domicilio:
    backgroundColor: "{colors.vinilo-verde}"
    textColor: "{colors.background}"
    padding: "48px 24px"
  placa-numero:
    backgroundColor: "{colors.vinilo-azul}"
    textColor: "{colors.background}"
    typography: "{typography.title}"
    rounded: "{rounded.marco}"
    padding: "6px 16px"
  barra-rotulo-mostaza:
    backgroundColor: "{colors.vinilo-mostaza}"
    textColor: "{colors.grafito}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.rotulo}"
    padding: "10px 16px"
    height: "48px"
  barra-rotulo-azul:
    backgroundColor: "{colors.vinilo-azul}"
    textColor: "{colors.background}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.rotulo}"
    padding: "10px 16px"
    height: "48px"
  barra-rotulo-verde:
    backgroundColor: "{colors.vinilo-verde}"
    textColor: "{colors.background}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.rotulo}"
    padding: "10px 16px"
    height: "48px"
  barra-rotulo-grafito:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.background}"
    typography: "{typography.rotulo-barra}"
    rounded: "{rounded.rotulo}"
    padding: "10px 16px"
    height: "48px"
  filtro-rotulo:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.background}"
    typography: "{typography.cartel}"
    rounded: "{rounded.rotulo}"
    height: "48px"
  filtro-rotulo-activo:
    backgroundColor: "{colors.vinilo-mostaza}"
    textColor: "{colors.grafito}"
  placa-enlace:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    typography: "{typography.label}"
    rounded: "{rounded.rotulo}"
    padding: "8px 14px"
    height: "44px"
  placa-enlace-hover:
    backgroundColor: "{colors.muro}"
  campo:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.rotulo}"
    padding: "10px 14px"
    height: "48px"
  casilla:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.casilla}"
    size: "24px"
  casilla-marcada:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.background}"
  aviso-exito:
    backgroundColor: "{colors.vinilo-verde}"
    textColor: "{colors.background}"
    rounded: "{rounded.panel}"
    padding: "12px 16px"
  aviso-error:
    backgroundColor: "{colors.error-suave}"
    textColor: "{colors.error}"
    rounded: "{rounded.panel}"
    padding: "12px 16px"
  etiqueta-receta:
    backgroundColor: "{colors.vinilo-mostaza}"
    textColor: "{colors.grafito}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.etiqueta}"
    padding: "2px 6px"
  tarjeta-producto:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.marco}"
    padding: "12px"
  panel-sin-foto:
    backgroundColor: "{colors.vinilo-azul}"
    textColor: "{colors.background}"
    typography: "{typography.rotulo-barra}"
    padding: "0 16px"
  nota-resena:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.marco}"
    padding: "20px"
  texto-legal:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    typography: "{typography.legal-cuerpo}"
    rounded: "{rounded.panel}"
    padding: "40px 40px"
    width: "72ch"
  nav-letrero:
    backgroundColor: "{colors.background}"
    textColor: "{colors.grafito}"
    height: "72px"
  barra-whatsapp-boton:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.background}"
    rounded: "{rounded.rotulo}"
    padding: "0 8px"
    height: "44px"
  footer:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.background}"
    padding: "56px 24px"
---

# Design System: Dogtoralia Vet

## Overview

**Creative North Star: "Vitrina vinilada de la sede"**

El sitio es la vitrina de la propia clínica, modelada sobre los paneles de vinilo reales de la fachada de Av. Presidente Balmaceda 2776: planchas de color sólido (azul, verde, mostaza, grafito) con rótulos blancos en mayúsculas gruesas, enmarcadas por el perfil grafito de la vitrina y separadas por un muro claro. No es una plantilla de hero con degradado y tarjetas flotantes: es letrero, panel, placa y cartel, los objetos que una familia del barrio ve cuando pasa por la puerta.

La densidad es de vitrina: bloques grandes, pocos por pantalla, con el texto corrido corto y dicho de tú. El color llega por superficie entera, nunca como acento tímido. Las piezas con volumen son las que cuelgan delante de los paneles: el letrero de puerta, que es el botón de WhatsApp de cada sede y lleva el estado ABIERTO/CERRADO en vivo, el botón placa que ofrece la acción principal de un panel y la placa con el número de la puerta montada sobre cada fachada.

La home no repite un molde: cada sección tiene su forma y su fondo a sangre, y el ritmo alterna superficies y espaciados (azul, blanco, muro, verde, mostaza, muro, grafito). El hero es vinilo azul plano con la foto real del equipo llegando al borde; los servicios son una lista editorial en filas; el equipo, retratos grandes; las reseñas, una cifra y una cita grandes; las sedes, sus fachadas. Las páginas interiores (servicios, tienda, ficha de producto, contacto, páginas legales y 404) abren con un marco grafito sobre el muro y su panel de encabezado de color.

El movimiento es físico y breve: lo que se toca se hunde un poco, el cartel de estado se balancea una vez como si colgara de su clavo y la barra de WhatsApp móvil sube como un cajón. Todo tiene versión sin movimiento.

**Key Characteristics:**
- Superficies planas de vinilo con texto blanco (o grafito sobre mostaza): a sangre en la home; en las páginas interiores, el encabezado va dentro de un marco grafito y el resto de los paneles van sueltos sobre el muro.
- Titulares en rótulo: Rubik 800 en mayúsculas, interlineado 1,02.
- Muro gris claro como fondo entre marcos y en las secciones de equipo y sedes; blanco en la sección de servicios y dentro de paneles, placas, campos y notas.
- Verde WhatsApp reservado a la acción de escribir; rojo error reservado a errores de formulario.
- Radios pequeños y escalonados por objeto (panel, etiqueta, casilla, marco, rótulo, placa), nunca píldoras salvo el disco.
- Contorno grafito sólido de 3px en placas, campos, fachadas y líneas de lista, 2px en piezas chicas.
- Solo fotos reales de la clínica: el equipo, las fachadas y la vitrina. Nada de fotos de stock.

## Colors

Una paleta de fachada: tres vinilos profundos sacados del logo, un grafito de perfil metálico, un muro claro, un verde funcional para WhatsApp y un rojo funcional para errores.

### Primary
- **Azul Vitrina** (vinilo-azul): el panel principal. Fondo a sangre del hero, de los encabezados de servicios, contacto y páginas legales, del formulario de agenda, del panel de peluquería en /service, de las etiquetas de peluquería y el disco de consultas en la home, del menú móvil, de la placa con el número de la puerta y del panel sin foto de producto. También marca las viñetas del texto legal. Es la versión profunda del azul del logo, elegida para que el texto blanco pase AA.

### Secondary
- **Mostaza Rótulo** (vinilo-mostaza): el vinilo cálido. Fondo a sangre de la sección de reseñas (donde estrellas destacadas, cifra y texto van en grafito), panel "Tienda", panel de vacunas, disco de vacunas en la lista de servicios, barras de rótulo alternas, filtro activo, etiqueta "Con receta", subrayado activo de la navegación, subrayado de enlaces de texto (3px), borde superior del footer, estrellas, selección de texto y anillo de foco. Sobre mostaza el texto es siempre grafito, nunca blanco.

### Tertiary
- **Verde Domicilio** (vinilo-verde): el tercer vinilo. Franja a sangre "Vamos a tu casa", panel de exámenes, disco de exámenes en la lista de servicios, barras de rótulo y el aviso de envío exitoso del formulario de contacto. Profundizado desde el verde del logo para sostener texto blanco.
- **Verde WhatsApp** (whatsapp) y su hover (whatsapp-dark): solo la acción de escribir por WhatsApp (disco del letrero, del botón placa y de la tarjeta de producto, botones de la barra móvil, ícono del enlace de WhatsApp en contacto) y el estado "Abierto" (cartel del letrero y estado del hero). No es un vinilo decorativo.

### Funcional
- **Rojo Aviso** (error): borde y texto de un campo inválido, mensaje de error bajo el campo y texto del aviso de envío fallido. Contraste AA sobre blanco.
- **Rojo Aviso Suave** (error-suave): fondo del aviso de envío fallido, siempre con texto error.

### Neutral
- **Grafito** (grafito): el perfil de la vitrina. Marcos de sección, contornos de placas, campos, notas, tarjetas, fachadas y foto destacada, líneas de 3px entre las filas de servicios, borde inferior de la navegación, texto principal sobre claro, fondo de los retratos, disco de procedimientos, fondo del cierre, de la sección de agenda en servicios y del footer, filtros inactivos, casilla marcada, botón placa de envío y cartel "Cerrado".
- **Grafito Suave** (grafito-suave): texto secundario sobre claro (direcciones, quién atiende, horarios, conteo de resultados) y panel oscuro interior (panel del buscador, índice legal, marco del formulario de agenda, panel de procedimientos en /service).
- **Muro** (muro): fondo de la página entre marcos y de las secciones de equipo y sedes en la home, separador fino dentro de las notas de reseña, hover de placas de enlace, nota de receta en la ficha.
- **Blanco** (background): fondo a sangre de la sección de servicios de la home, interior de placas, letreros, campos, notas, tarjetas, el panel de texto legal, la franja de navegación y la barra móvil.

### Color del navegador
- **Azul del logo** (THEME_COLOR en data/site.ts): el azul del logo tal cual, sin token en globals.css, vive solo como theme-color del navegador y del manifest. No se usa en la interfaz; dentro de la página el azul es siempre vinilo-azul.

### Named Rules
**La Regla del Vinilo Profundo.** Un panel con texto blanco usa vinilo-azul, vinilo-verde, grafito o grafito-suave. Nunca el azul ni el verde del logo tal cual: no sostienen texto blanco con contraste AA.

**La Regla del Mostaza con Grafito.** Sobre vinilo-mostaza el texto, los íconos y los enlaces van en grafito. El mostaza nunca lleva texto blanco.

**La Regla del Verde que Escribe.** whatsapp y whatsapp-dark solo aparecen donde tocar abre un WhatsApp o donde el cartel dice "Abierto". Para un panel verde se usa vinilo-verde.

**La Regla del Rojo que Avisa.** error y error-suave aparecen solo en errores de formulario. Un éxito se dice en vinilo-verde, nunca en whatsapp.

**La Regla del Texto que Hereda.** Títulos y párrafos heredan el color del bloque. El texto secundario sobre un panel de color es blanco con opacidad (90% o 85% sobre azul y grafito), nunca gris; sobre vinilo-verde el texto corrido va en blanco al 100% (al 90% baja a 4,46:1) y sobre mostaza al 100% de grafito.

## Typography

**Display Font:** Rubik (con ui-sans-serif, system-ui, sans-serif), pesos 600, 700 y 800 cargados vía next/font como --font-rubik y expuestos como --font-rotulo.
**Body Font:** Figtree (con ui-sans-serif, system-ui, sans-serif), vía next/font como --font-figtree y expuesta como --font-sans.

**Character:** Rubik en 800 y mayúsculas es la letra de rotulación de la vitrina: redonda, gruesa y legible desde la vereda. Figtree acompaña con un texto corrido amable y claro, sin competir.

### Hierarchy
- **Display** (Rubik 800, mayúsculas, clamp(2.05rem, 5.2vw, 4rem), 1,02): solo el h1 del hero, "Veterinaria en Puente Alto y Santiago Centro", en un solo bloque.
- **Título de página** (Rubik 800, mayúsculas, clamp(2.6rem, 6vw, 4.4rem), 1,02): el h1 del panel de encabezado de servicios, tienda y contacto. Las páginas legales usan un paso menor, clamp(2.2rem, 5vw, 3.5rem), porque sus títulos son largos.
- **Cierre** (Rubik 800, mayúsculas, clamp(2.4rem, 5.5vw, 4rem), 1,02): el titular del bloque grafito final ("¿Te damos hora?") en inicio y en servicios.
- **Headline** (Rubik 800, mayúsculas, clamp(2.1rem, 4.8vw, 3.6rem), 1,02): títulos de sección de la home ("Lo que hacemos adentro", "Dónde estamos"). El titular del equipo usa clamp(2rem, 4vw, 3.3rem), la franja de domicilio clamp(1.9rem, 3.6vw, 2.8rem), el destacado de peluquería clamp(1.9rem, 3.4vw, 2.6rem), el formulario de contacto clamp(2rem, 4.5vw, 3.25rem), cada panel de /service clamp(1.9rem, 3.4vw, 2.75rem) y el panel sin foto en la ficha clamp(1.75rem, 3.4vw, 3rem).
- **Title** (Rubik 800, mayúsculas, 1.6rem en móvil y 2rem desde sm): nombre de cada fila de la lista de servicios. El nombre de sede bajo su fachada usa 1.9rem / 2.3rem, el número de puerta 2rem / 2.6rem, el nombre en un retrato 1.125rem / 1.5rem, el título "Clínica" de la lista 1.5rem y los nombres de sede en letreros 1.35rem / 1.5rem; el rótulo "No está en la vitrina" usa 1.5rem a 1.875rem.
- **Rótulo legal** (Rubik 800, mayúsculas, 1.375rem, interlineado 1,15): los h2 de privacidad y términos.
- **Rótulo de barra** (Rubik 800, mayúsculas, 1.05rem en móvil, 1.125rem desde sm): texto de barras de rótulo, botones placa y botón secundario. El botón de la barra móvil baja a 0.85rem.
- **Rótulo de navegación** (Rubik 800, mayúsculas, 0.95rem, 1rem desde lg): enlaces del letrero superior.
- **Numeral** (Rubik 800, 6rem en móvil y 8rem desde sm, interlineado 0,8): el 4,9 de Google. El "404" usa 5.5rem / 6.5rem con interlineado 0,85.
- **Cartel** (Rubik 700, mayúsculas, 0.72rem, espaciado 0.025em; 0.78rem en el estado del hero): ABIERTO / CIERRA PRONTO / CERRADO. El mismo 0.72rem es el tamaño mínimo de los filtros de la tienda bajo 400px (en rótulo 800), que suben a 0.875rem y 1rem.
- **Nombre de producto** (Figtree 700, clamp(1.6rem, 3vw, 2.25rem), interlineado 1,25): el h1 de la ficha de producto. En la tarjeta, Figtree 600 a 0.875rem / 1rem, completo y sin "…", con dos líneas reservadas.
- **Cita destacada** (Figtree 600, 1.45rem en móvil y 2rem desde sm, interlineado 1,375, máximo 38ch): la reseña grande sobre el mostaza, recortada a 3 líneas.
- **Body** (Figtree 400, 1rem en móvil y 1.125rem desde sm, interlineado 1,625): párrafos de panel, entre 34ch y 60ch de ancho.
- **Cita** (Figtree 400, 0.95rem, interlineado 1,625): el texto de cada nota de la fila de reseñas, recortado a 3 líneas.
- **Cuerpo legal** (Figtree 400, 1.0625rem, interlineado 1,7, máximo 72ch): texto de privacidad y términos, con 1rem entre bloques y 2.5rem entre secciones.
- **Label** (Figtree 500 a 600, 0.75rem a 0.875rem): etiquetas de campo, direcciones, quién atiende, autoría de reseñas, enlaces de texto, conteo de resultados.
- **Etiqueta** (Figtree 700, mayúsculas, 0.7rem, espaciado 0.025em): "Con receta", la misma en la tarjeta y en la ficha.

### Named Rules
**La Regla del Rótulo.** Todo titular, nombre de sede, etiqueta de barra y botón principal va en rótulo (Rubik 800, mayúsculas, interlineado 1,02, text-wrap balance). El texto corrido nunca va en mayúsculas. La única excepción es el nombre de producto, que es un nombre de catálogo largo y va en Figtree 700.

**La Regla de una Sola Voz Gruesa.** Rubik se usa solo en rótulo y cartel; párrafos, etiquetas de campo, captions y enlaces de texto son Figtree.

**La Regla de la Lectura Larga.** Un texto que se lee de corrido más allá de un párrafo (las páginas legales) va en panel blanco a 72ch, 1.0625rem e interlineado 1,7, con sus h2 en rótulo de 1.375rem.

## Layout

Contenedor de 1280px centrado para inicio, servicios, tienda y contacto, y de 1152px para la ficha de producto, las páginas legales y la 404. Gutter de 16px en móvil y 24px desde sm en la home (12px en los marcos de las páginas interiores).

**Home.** Cada sección es una franja a sangre con su propio fondo y su propio aire, para que el ritmo no sea uniforme: hero azul sin aire inferior (la foto llega al borde), servicios en blanco con 64px / 96px arriba y abajo, equipo en muro con 64px / 96px arriba y 56px / 80px abajo, franja verde de domicilio de 40px / 48px, reseñas en mostaza con 64px / 96px, sedes en muro con 56px / 80px arriba y 64px / 96px abajo, y cierre grafito con 48px / 64px. Las grillas son asimétricas y en CSS Grid: hero 1fr / 1fr con la foto a sangre a la derecha y el texto alineado al contenedor, servicios 1fr / 1.1fr (destacado y lista), equipo 1fr / 1.15fr (titular y retratos), reseñas auto / 1fr (cifra y cita) más una fila de 3, sedes 2 columnas con la segunda bajada 80px, cierre 1fr / 1.1fr.

**Páginas interiores.** El marco de vitrina (contenedor grafito con 6px de padding en móvil y 8px desde sm, y el mismo valor entre los paneles que contiene) se usa una sola vez por página: en el encabezado. Esa franja grafito es el perfil de la vitrina, no un borde. Debajo del encabezado los paneles van sueltos sobre el muro, con radio 6px y 12px / 16px de separación (móvil / desde sm). Cada bloque deja 56px de aire inferior en móvil y 80px desde sm. Encabezado de servicios 1fr / 1.1fr, de tienda 1fr / 1.2fr, de contacto 0.8fr / 1.4fr, 404 1.1fr / 1fr, legal 16rem / 1fr. En /service los paneles comparten una grilla de 6 columnas (3+3, 2+4 y 6). La tienda muestra 2 columnas en móvil, 3 desde sm y 4 desde lg, con 8px / 12px de separación.

Responsive: en móvil todo apila en una columna. En el hero la foto del equipo va arriba a sangre (proporción 4/3, encuadrada abajo para dejar fuera el logo de la foto) y antes de la primera placa hay solo tres bloques de texto: estado, h1 y una frase; a 390px la primera placa entra completa en la primera pantalla. Por debajo de 768px una barra fija inferior lleva los dos WhatsApp mientras ningún bloque de letreros está a la vista (el body reserva 76px abajo). En escritorio el índice legal queda fijo al hacer scroll. La navegación es una franja fija de 64px (72px desde lg) más 3px de borde: el hero arranca justo debajo (67px / 75px) y las páginas interiores con 76px / 88px de padding superior. En la ficha de producto móvil la imagen baja a 4:3 con un alto máximo de 38vh.

Todo objeto tocable mide al menos 44px de alto (también los enlaces "Ver…" y "Leer completa"); barras de rótulo, campos, filtros y botones placa, 48px.

## Elevation & Depth

La vitrina es plana: paneles, marcos, barras, campos, notas y placas de enlace no llevan sombra, y la profundidad se da por el anidado marco grafito, panel de color y muro. Proyectan sombra solo las piezas que cuelgan o se ofrecen delante de los paneles: el letrero de puerta, todo botón placa (blanco o grafito) y la placa con el número de la puerta montada sobre la fachada, siempre con la misma sombra. La tarjeta de producto gana una sombra solo al pasar el cursor.

### Shadow Vocabulary
- **Letrero colgado** (`--shadow-letrero`: `0 6px 14px -6px rgb(43 39 39 / 0.45)`, utilidad shadow-letrero): reposo del letrero de puerta, de todo botón placa y de la placa de número de puerta.
- **Letrero levantado** (`--shadow-letrero-alto`: `0 12px 22px -10px rgb(43 39 39 / 0.5)`, utilidad hover:shadow-letrero-alto): hover del letrero, junto con el ascenso de 2px.
- **Tarjeta tomada** (`--shadow-tarjeta`: `0 10px 20px -12px rgb(43 39 39 / 0.55)`, utilidad hover:shadow-tarjeta): hover de la tarjeta de producto, en 200ms.

Las tres sombras son tokens de @theme en globals.css; no hay valores de sombra escritos a mano en los componentes.

### Named Rules
**La Regla del Vinilo Plano.** Paneles, marcos, barras de rótulo, campos, notas y placas de enlace no tienen sombra. Solo lo que cuelga delante de un panel (letrero, botón placa, placa de número) proyecta sombra, y la tarjeta de producto solo al hover; siempre con uno de los tres tokens de sombra, nunca un valor suelto ni una sombra dura.

## Shapes

Esquinas apenas redondeadas, escalonadas según el objeto físico que representan: el panel de vinilo casi recto (3px) dentro de un marco algo más suave (6px); la etiqueta "Con receta" y el anillo de foco a 4px; la casilla de consentimiento a 5px; barras de rótulo, campos, filtros, placas de enlace y cuadros de íconos a 8px; letreros, botones placa y botón secundario a 10px. El cartel de estado, las notas de reseña, la tarjeta de producto, las fotos de la home (fachadas, retratos, recorte de peluquería), la placa de número y las etiquetas de peluquería comparten los 6px del marco. Lo único circular es el disco (48px en letreros y en la lista de servicios, 56px en esa lista desde sm, 44px en la tarjeta de producto, 40px en botones placa) y el subrayado de 4px de la navegación.

Los contornos son grafito sólido: 3px en letreros, botones placa, campos, casilla, notas de reseña, tarjetas de producto (y sus divisiones internas), el borde inferior de la navegación y el superior de la barra móvil; 2px en el cartel de estado, las placas de enlace y los botones de la barra móvil. Dentro de un panel oscuro los bordes y divisores son blancos o del color del texto con opacidad: 35% en filtros inactivos, 30% en los cuadros sociales del footer, 25% en la nota de un panel de servicio y 15% (1px) en el pie del footer. En las páginas interiores las fotos no llevan borde propio: las recorta el panel de 3px dentro del marco grafito. En la home las fachadas y el recorte de peluquería llevan contorno grafito de 3px y radio 6px; la foto del hero va a sangre, sin borde ni radio; los retratos, radio 6px sin contorno. Entre las filas de servicios hay líneas grafito de 3px; entre los bloques de horario de una sede, líneas grafito al 15% de 2px.

### Named Rules
**La Regla del Perfil Grafito.** Sobre claro, un contorno es grafito y sólido, de 3px en piezas grandes y 2px en piezas chicas. Nunca gris claro, nunca punteado. Solo cambia de color por estado: a error en un campo inválido y a mostaza en el filtro activo. Sobre un panel oscuro, el contorno es blanco con opacidad.

## Components

### Letrero de puerta (componente firma)
La placa blanca de cada sede que es el botón de agendar. Aparece en el hero, en el cierre de inicio y en el encabezado de contacto. En el hero va sin cartel (el estado ya está arriba, una sola vez) y con 16px de padding parejo; en el cierre y en contacto lleva su cartel.
- **Forma:** radio 10px, contorno grafito de 3px, padding 24px arriba y 16px al resto, sombra "Letrero colgado".
- **Contenido:** nombre de sede en rótulo, debajo quién atiende y, si lleva cartel, el detalle de horario separado por coma ("con la Dra. Sara, hasta las 18:00") en grafito-suave; a la derecha el disco WhatsApp de 48px. Nunca puntos medios como separador.
- **Cartel:** colgado 14px por encima del borde superior, contorno grafito de 2px, radio 6px, en estilo cartel. Abierto en whatsapp, cierra pronto en vinilo-mostaza con texto grafito, cerrado en grafito. Reserva su espacio antes de conocer el estado para que nada salte.
- **Estados:** presionable, sombra "Letrero levantado" al hover, el disco pasa a whatsapp-dark.
- **Movimiento:** el cartel se balancea una vez al aparecer (700ms, de -7° a 3° a -1° a 0°, con ease-out-fuerte, origen arriba al centro). Con movimiento reducido solo aparece con opacidad en 200ms.

### Estado en vivo del hero
Una línea sobre el h1: el cartel (abierto en whatsapp, cierra pronto en mostaza con texto grafito, cerrado en grafito; contorno grafito 2px, radio 6px) y a su lado el detalle en Figtree 500 ("abre mañana a las 10:00", y desde sm ", en las dos sedes"). Se calcula en el navegador con la hora de Chile, se anuncia con aria-live y reserva sus 32px antes de conocerse.

### Recortes de foto
Mientras no haya fotos propias de cada cosa, los retratos individuales y el vinilo de peluquería son recortes de fotos reales guardados como archivos aparte en public/images/recortes/ (sara.jpg y gabriel.jpg de la foto del equipo, peluqueria-vitrina.jpg de la fachada de Santiago Centro), en proporción 4:5 y a su resolución real. Nunca se agranda la foto completa en el navegador para recortarla: pesaría la foto entera.

### Botones
- **Botón placa** ("Pedir a domicilio", "Pedir hora", "Preguntar", "Consultar por WhatsApp", "Solicitar hora en {sede}", "Agendar aquí", "Volver al inicio"): blanco, sombra "Letrero colgado", contorno grafito 3px, radio 10px, alto mínimo 48px (56px en el formulario de agenda), rótulo a la izquierda y disco de 40px a la derecha. El disco es whatsapp cuando abre un chat y grafito con un ícono blanco (flecha, casa) cuando lleva a otra parte del sitio.
- **Botón placa grafito** (envío del formulario de contacto): fondo grafito, texto blanco, sombra "Letrero colgado", disco blanco con avión de papel que pasa a un círculo girando mientras envía; deshabilitado al 80% de opacidad.
- **Botón de barra móvil:** whatsapp con texto blanco, contorno grafito 2px, radio 8px, alto 44px, ícono y nombre de sede en rótulo.
- **Botón secundario** ("Ver más productos"): blanco, contorno grafito 3px, radio 10px, alto 48px, texto en rótulo de 1.125rem, sin disco ni sombra.
- **Hover / Focus:** todo lo presionable sube 2px al hover (solo con hover real y puntero fino) y escala a 0.97 al presionar, con transform en 160ms y sombra y fondo en 200ms. El foco es un anillo mostaza de 3px separado 3px, con radio 4px.

### Barras de rótulo
Rótulos de vinilo apilados, como los de la vitrina: el índice del encabezado de /service, los puntos destacados de cada panel de /service y las secciones del menú móvil.
- **Forma:** radio 8px, alto mínimo 48px, padding 10px 16px (12px 16px con descripción), separadas 10px.
- **Color:** alternan vinilo-mostaza (texto grafito), vinilo-azul, vinilo-verde y grafito (texto blanco). Dos barras seguidas no repiten color, y una barra no repite el color del panel que la contiene: en /service los puntos destacados alternan grafito y azul sobre un panel mostaza, mostaza y azul sobre un panel grafito o grafito-suave, y grafito y mostaza sobre los demás.
- **Contenido:** rótulo a la izquierda e ícono Phosphor bold a la derecha al 90%. Los puntos destacados agregan una línea Figtree de 0.875rem bajo el rótulo; el índice son barras sin ícono.

### Servicios de la home
- **Destacado:** peluquería canina y felina, con el recorte del vinilo real de la vitrina (proporción 4/5, contorno grafito 3px, radio 6px, al lado del texto desde sm), titular en rótulo, una frase, las etiquetas "Corte y baño" y "Baño medicado" en vinilo-azul (rótulo 0.875rem, radio 6px) y el enlace "Ver peluquería".
- **Lista editorial:** "Clínica" en rótulo y cuatro filas sin cajas separadas por líneas grafito de 3px. Cada fila es un enlace de toda la fila: disco de color de 48px / 56px con su ícono, nombre en title y una línea en Figtree grafito-suave, flecha a la derecha que se corre 4px al hover. Cierra con "Ver todos los servicios" y "Y lo que te recetamos, en la tienda".

### Retratos del equipo
Dos retratos grandes en proporción 4/5, sin tarjeta ni contorno, radio 6px sobre grafito; el segundo baja 40px / 64px para que no se lean como grilla. Debajo, el nombre completo en rótulo y "Cirujana en Puente Alto" en Figtree grafito-suave. Sin foto, la persona no aparece: nunca iniciales sobre un degradado.

### Franja de domicilio
Franja vinilo-verde a sangre: ícono de casa (desde md), titular "Vamos a tu casa", una frase y el botón placa "Pedir a domicilio" con disco whatsapp.

### Paneles y marcos
- **Marco:** grafito, radio 6px, padding y separación interna de 6px / 8px. Solo en el encabezado de cada página interior (y en el bloque principal de la ficha de producto y de la 404); nunca alrededor de paneles de contenido, tarjetas ni formularios.
- **Panel:** radio 3px, color plano de vinilo, blanco o grafito-suave, padding de 20px a 44px según tamaño.
- **Enlace de panel:** texto semibold con subrayado de 3px separado 5px a 6px y flecha, empujado al pie del panel. Sobre claro el subrayado es mostaza y pasa a grafito al hover.
- **Sombra:** ninguna (ver La Regla del Vinilo Plano).

### Inputs / Fields
- **Campo:** blanco, contorno grafito 3px, radio 8px, alto 48px, Figtree 1rem, placeholder en grafito-suave al 70% a 80%. Etiqueta Figtree semibold de 0.875rem encima (nunca el placeholder como etiqueta), pista opcional en grafito-suave.
- **Buscador de tienda:** el mismo campo con lupa a la izquierda y botón propio de 40px y radio 6px para borrar.
- **Select de agenda:** el mismo campo sobre el panel vinilo-azul.
- **Casilla de consentimiento:** 24px, radio 5px, contorno grafito 3px, blanca; marcada pasa a grafito con un check blanco.
- **Error:** contorno y texto en error, mensaje Figtree semibold de 0.875rem debajo, enlazado con aria-describedby y aria-invalid.
- **Foco:** el anillo mostaza global.

### Avisos de formulario
Panel de radio 3px con padding 12px 16px y texto Figtree semibold: vinilo-verde con texto blanco si el envío salió bien (role status), error-suave con texto error si falló (role alert).

### Navigation
- **Letrero superior:** franja blanca fija, 64px (72px desde lg), cerrada abajo por 3px de grafito. Logo a la izquierda (enlace a /home), no cambia al hacer scroll.
- **Saltar al contenido:** primer foco de cada página. Oculto hasta que llega el foco del teclado; entonces aparece arriba a la izquierda como placa blanca (contorno grafito 3px, radio 10px, 48px, sombra "Letrero colgado") y lleva al contenedor #contenido.
- **Enlaces:** rótulo de 0.95rem a 1rem, área de 44px. Activo y hover con una barra mostaza de 4px que crece en horizontal (200ms, ease-out-fuerte).
- **Móvil:** el botón de menú es un cuadro de 44px y radio 8px. El menú es un panel vinilo-azul a pantalla completa que entra bajando 12px con fundido (240ms); cada sección es una barra de rótulo de 56px en grafito y la activa en mostaza con texto grafito.

### Barra de WhatsApp móvil
Barra fija inferior blanca con borde superior grafito de 3px, solo bajo 768px. Se oculta mientras algún bloque de letreros está al menos 60% en pantalla y sube como un cajón (320ms, ease-cajon) cuando no; sale en 200ms. Respeta el safe-area inferior.

### Notas de reseña
Sección mostaza a sangre: el 4,9 en numeral con una estrella, "Más de 240 reseñas en Google" y "Varias nombran al Dr. Gabriel y a la Dra. Sara", junto a una cita destacada (estrellas en grafito, cita destacada, autor y sede). Debajo, una fila de tres notas blancas con contorno grafito 3px, radio 6px, padding 20px, estrellas en mostaza, cita en Figtree 0.95rem y pie con autor separado por una línea de 2px en muro. Toda reseña se recorta a 3 líneas y muestra "Leer completa" (44px) solo si de verdad no cabe, medido en el navegador. Cierran enlaces "Ver reseñas de {sede}" y "Reseñar".

### Placas de sede
- **Sede en la home:** la fachada es la protagonista (proporción 4/3, contorno grafito 3px, radio 6px) con la placa del número de la puerta montada sobre su borde inferior izquierdo (vinilo-azul, contorno grafito 3px, radio 6px, sombra "Letrero colgado", número en rótulo de 2rem / 2.6rem). Debajo: nombre de sede, calle y número, quién atiende, el horario como lista de definición entre líneas al 15% ("Lunes a Viernes 10:00 a 19:00", "Sábados 10:00 a 17:00", "Domingos Cerrado", sin guiones) y las acciones "Agendar aquí" (botón placa), Google Maps y Waze. No hay caja de horario aparte.
- **Número de puerta en contacto:** placa vinilo-azul de radio 3px con el número en rótulo grande, junto a la placa blanca con nombre, calle y quién atiende.
- **Placas de enlace** (Maps, Waze): blancas, contorno grafito 2px, radio 8px, alto 44px, Figtree semibold 0.875rem, presionables, hover a muro.
- **Horario en contacto:** cada sede tiene su horario, dentro de su tarjeta: lista de dos columnas (etiqueta en grafito-suave, hora en semibold tabular) bajo el nombre de la sede, separada por líneas grafito al 15%. Si las sedes están en estados distintos, la línea de estado del hero muestra el cartel más abierto y nombra cada sede ("Puente Alto hasta las 18:00 y el Centro hasta las 18:30").

### Panel de servicio (/service)
Cada servicio es un panel de vinilo suelto sobre el muro, con ancho distinto según su peso: ícono Phosphor de 36px, titular en rótulo, descripción en Figtree al 100% del color del panel (nunca con opacidad sobre mostaza), una nota opcional separada por una línea del color del texto al 25%, y los puntos destacados como barras de rótulo. Su botón placa "Pedir hora" lleva un disco grafito con flecha y baja al formulario de agenda con ese servicio ya elegido, donde la familia escoge la sede. El encabezado usa la foto real de la vitrina de Santiago Centro y un índice de barras de rótulo. Ningún panel lleva foto de stock.

### Formulario de agenda
Panel vinilo-azul de radio 6px, sin marco, sobre el bloque grafito de cierre de /service: etiquetas Figtree semibold encima de selects (ver Inputs / Fields); el envío es un botón placa a todo el ancho ("Solicitar hora en {sede}") que abre el WhatsApp de la sede elegida.

### Tienda: buscador y filtros
Dentro del marco, junto al panel mostaza "Tienda": un panel grafito-suave con el buscador y tres filtros de rótulo en una fila (grafito con borde blanco de 2px al 35% que sube al 70% al hover; el activo en mostaza con texto y borde a juego, aria-pressed). Debajo, el conteo de resultados (aria-live) y tandas de 24 productos con un botón secundario "Ver más productos". Sin resultados, un panel blanco "No está en la vitrina" con un botón placa "Preguntar".

### Tarjeta de producto
Placa blanca con contorno grafito 3px y radio 6px, sin sombra en reposo y con "Tarjeta tomada" al hover: foto cuadrada sobre blanco separada por una línea grafito de 3px, nombre completo en Figtree semibold (sin "…", con dos líneas reservadas, subrayado al hover), y al pie el tipo de producto con la etiqueta mostaza "Con receta" cuando corresponde. En la esquina inferior derecha, un disco WhatsApp de 44px (presionable, hover a whatsapp-dark) para consultar; no hay fila ni botón a todo el ancho. No se muestran precios. Las consultas de productos van a un solo número (MAIN_WHATSAPP_PHONE), sin elegir sede.

### Panel sin foto
Cuando un producto no tiene foto propia se muestra un panel vinilo-azul con ícono de cámara, el tipo de producto en rótulo (0.85rem bajo 400px, 1rem y 1.125rem desde lg, para que "Antiparasitario" no se corte) y "Foto en camino" en blanco al 85% a 90%. Nunca la foto genérica de pastillas. En la ficha va en tamaño grande.

### Ficha de producto
Enlace de regreso con subrayado mostaza, luego un marco grafito con dos paneles: la foto (o el panel sin foto) y la información en panel blanco. El botón placa "Consultar por WhatsApp" va justo después del nombre; si requiere receta, una nota en muro de radio 3px lo explica.

### Páginas legales
Marco grafito con un encabezado vinilo-azul (título en rótulo y fecha en blanco al 85%), un índice opcional en panel grafito-suave (16rem, fijo en escritorio, enlaces con subrayado blanco al 30% que pasa a mostaza) y el texto en panel blanco con el estilo de lectura larga: viñetas en vinilo-azul y enlaces semibold con subrayado mostaza de 3px separado 4px que pasa a grafito al hover.

### Página no encontrada (404)
Marco grafito con dos paneles: un panel vinilo-azul con el "404" en numeral, el titular en rótulo de headline, el párrafo en blanco al 90%, el botón placa "Volver al inicio" con disco grafito y casa, y el enlace "Ir a contacto" con subrayado mostaza de 3px que pasa a blanco al hover; al lado, el panel con la foto del equipo sobre grafito-suave.

### Footer
Grafito con borde superior mostaza de 3px. Encabezados en rótulo, enlaces Figtree en blanco al 85% que pasan a mostaza al hover, íconos sociales en cuadros de 44px con borde blanco de 2px al 30% y radio 8px, pie legal en blanco al 70% sobre una línea blanca al 15%.

## Do's and Don'ts

### Do:
- **Do** dar a cada sección de la home su propia forma y su fondo a sangre, alternando superficies y espaciados.
- **Do** construir las páginas interiores sobre fondo muro: un marco grafito (radio 6px, padding 6px / 8px) con paneles planos de radio 3px solo en el encabezado, y el resto de los paneles sueltos con radio 6px.
- **Don't** envolver en marco grafito los paneles de contenido, tarjetas o formularios; un marco por página.
- **Do** abrir cada página interior con un marco que contenga un panel de encabezado de color y su título en rótulo.
- **Do** escribir todo titular, nombre de sede y etiqueta de barra en rótulo (Rubik 800, mayúsculas, interlineado 1,02).
- **Do** usar vinilo-azul, vinilo-verde, grafito o grafito-suave para paneles con texto blanco, y grafito sobre vinilo-mostaza.
- **Do** llevar la acción de agendar al letrero de puerta de cada sede, con el disco whatsapp y el estado en vivo (en el letrero o, en el hero, una sola vez arriba).
- **Do** usar solo fotos reales de la clínica; si falta una, guardar un recorte de una foto real en public/images/recortes/ o dejar el espacio fuera.
- **Do** usar contorno grafito sólido de 3px en placas, campos y notas, y de 2px en piezas chicas.
- **Do** poner la etiqueta encima de cada campo y el error debajo, en error, enlazado con aria-describedby.
- **Do** aplicar el comportamiento presionable (ascenso de 2px al hover real, escala 0.97 al presionar) a todo lo tocable, con su versión sin movimiento.
- **Do** mantener 44px de alto mínimo en todo objeto tocable y 48px en barras, campos, filtros y botones placa.

### Don't:
- **Don't** usar el azul ni el verde del logo tal cual como fondo de panel con texto blanco; no pasan AA.
- **Don't** poner texto blanco sobre vinilo-mostaza.
- **Don't** usar whatsapp como color decorativo; es solo para escribir por WhatsApp y para el cartel "Abierto".
- **Don't** usar error fuera de un error de formulario, ni whatsapp para decir que algo salió bien.
- **Don't** agregar sombras a paneles, marcos, barras, campos o notas; solo lo que cuelga (letrero, botón placa) proyecta sombra.
- **Don't** usar degradados, fondos grises tipo gray-50, tarjetas con sombra flotante ni radios grandes (rounded-lg, rounded-2xl); son el lenguaje de las páginas viejas.
- **Don't** repetir el molde H2 centrado + subtítulo gris + grilla de tarjetas iguales, ni números de sección (01, 02).
- **Don't** usar fotos de stock, ni iniciales sobre degradado cuando falta un retrato.
- **Don't** separar datos con puntos medios (·) ni abreviar días con guiones (L–V).
- **Don't** usar gris para texto secundario sobre un panel de color; se usa blanco al 90% o 85%.
- **Don't** usar contornos gris claro o punteados sobre claro; el perfil es grafito.
