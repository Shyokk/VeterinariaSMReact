# Veterinaria San Marcos - React

Migración a React (Vite) del proyecto HTML, CSS y JavaScript **VeterinariaSM**.

## Requisitos

- Node.js 22 LTS (o 20.19 o superior)
- npm

## Instalar y ejecutar

```
npm install
npm run dev
```

La terminal mostrará una dirección como `http://localhost:5173`.

## Otros comandos

```
npm run build     # genera la carpeta dist
npm run preview   # sirve la carpeta dist para revisarla
```

## Estructura

```
index.html            documento base con el nodo root
public/assets/img     imágenes del proyecto original
public/assets/data    archivos JSON del proyecto original
src/main.jsx          inicia React, BrowserRouter y carga Bootstrap y los CSS
src/App.jsx           header, rutas y footer
src/assets/css        hojas de estilo del proyecto original y bootstrapAjustes.css
src/components        piezas reutilizables (Header, Footer)
src/core              almacenamiento en localStorage y conversión de datos
src/validaciones      validaciones de fecha y hora para agendar
src/pages             una página por cada HTML original
```

## Bootstrap

Se usa Bootstrap y React Bootstrap (`npm install react-bootstrap bootstrap`):

- `bootstrap.min.css` se importa una sola vez en `main.jsx`, antes de los CSS del proyecto.
- `src/assets/css/bootstrapAjustes.css` devuelve las etiquetas a sus estilos normales (el "Reboot" de Bootstrap los cambia) para conservar el diseño original.
- Componentes usados: `Navbar`, `Nav` (Header), `Row` y `Col` (tarjetas de Inicio) y la clase `table-responsive` en las tablas.
