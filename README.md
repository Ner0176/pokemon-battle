# Pokémon Teams & Battle Simulator ⚔️

### 1. Funcionalidades

- **Gestión de Equipos:** Creación de múltiples equipos personalizados (máx. 6 Pokémon).
- **Consumo de API:** Selección de Pokémon desde `pokeapi.co` con buscador y filtro por tipos.
- **Drag & Drop:** Reordenamiento visual, orden aleatorio y orden por estadística de ataque.
- **Persistencia:** Guardado de equipos y sistema de **Borradores Automáticos** (si el usuario sale sin guardar).
- **Combate:** Simulación 1 vs 1 por posición basada en reglas de _Speed_, _Attack_ y _Defense_.
- **Resultados:** Reporte de ganadores por ronda y resultado global.

## 🚀 Tecnologías y Herramientas

- **Core:** React 19 + Vite 7.
- **Lenguaje:** JavaScript (ESModules).
- **Estado Global:** Zustand v5 (Gestión de equipos, combates y borradores).
- **Estado del Servidor:** TanStack Query v5 (Consumo optimizado de PokéAPI).
- **Estilos:** Tailwind CSS v4.
- **Drag & Drop:** @dnd-kit.
- **Enrutado:** React Router DOM v7.
- **Testing:** Vitest + React Testing Library.
- **Gestor de Paquetes:** pnpm.

## 📂 Arquitectura del Proyecto

Se ha implementado una arquitectura modular que separa claramente la **UI genérica** de la **lógica de negocio**, facilitando la escalabilidad y el mantenimiento.

```text
src/
├── api/              # Configuración de Axios e interceptores
├── assets/           # Imágenes y recursos estáticos
├── components/
│   ├── base/         # UI Kit: Componentes atómicos reutilizables (Button, Modal, Toast...)
│   ├── battle-arena/ # Feature: Vistas y lógica de la simulación de combate
│   ├── home/         # Feature: Landing page
│   └── team-builder/ # Feature: Constructor de equipos, búsqueda y Drag & Drop
├── hooks/            # Custom Hooks transversales (useClickOutside)
├── router/           # Configuración de rutas (React Router v7)
├── stores/           # Stores de Zustand separados por dominio (battle, team, drafts)
├── utils/            # Funciones puras compartidas
├── App.jsx           # Layout principal y configuración de Providers
└── main.jsx          # Entry point
```
