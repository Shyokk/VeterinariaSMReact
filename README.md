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
src/main.jsx          inicia React, BrowserRouter y carga los CSS
src/App.jsx           header, rutas y footer
src/assets/css        hojas de estilo del proyecto original
src/components        piezas reutilizables (Header, Footer)
src/core              almacenamiento en localStorage y conversión de datos
src/validaciones      validaciones de fecha y hora para agendar
src/pages             una página por cada HTML original
```
