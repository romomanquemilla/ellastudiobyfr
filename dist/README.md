# Ella Studio by FR

Boudoir photography website - Optimized for GitHub Pages

## 📁 Estructura del sitio

```
/
├── index.html          # Página principal
├── assets/             # CSS y JS compilados
│   ├── index-*.css
│   └── index-*.js
└── images/             # Imágenes optimizadas
    ├── hero_signature.jpg
    ├── studio_notes.jpg
    ├── collection_seated.jpg
    ├── session_kneeling.jpg
    ├── booking_lying.jpg
    ├── editorial_left.jpg
    ├── editorial_right.jpg
    ├── testimonial.jpg
    └── contact_closing.jpg
```

## 🚀 Deploy en GitHub Pages

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos de esta carpeta `dist/` al repositorio
3. Ve a **Settings** → **Pages**
4. En "Source" selecciona "Deploy from a branch"
5. Selecciona la rama `main` y carpeta `/ (root)`
6. Guarda y espera unos minutos

## ⚡ Optimizaciones realizadas

- ✅ Imágenes comprimidas (604KB total)
- ✅ Lazy loading en imágenes secundarias
- ✅ Preload de imagen hero crítica
- ✅ Eliminado efecto grain overlay (pesado)
- ✅ Animaciones simplificadas
- ✅ Rutas relativas para GitHub Pages
- ✅ CSS crítico inline

## 📝 Personalización

Para cambiar el número de WhatsApp, edita el archivo `assets/index-*.js` y busca:
```javascript
window.open(`https://wa.me/TUNUMERO?text=${message}`, '_blank')
```

Reemplaza `TUNUMERO` con tu número (formato internacional sin +, ej: 34612345678)
