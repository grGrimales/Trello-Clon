# 🚀 Trello Clone (React + Supabase)

Un clon funcional y colaborativo de Trello, construido con **React 19**, **Tailwind CSS v4** y **Supabase**. Este proyecto replica la experiencia de usuario de Trello, incluyendo tableros, listas, tarjetas arrastrables (Drag & Drop), comentarios en tiempo real y gestión de miembros.

![Preview](./public/preview.png)


## ✨ Características Principales

### 📋 Gestión de Tareas
* **Tableros Dinámicos:** Creación de listas y tarjetas ilimitadas.
* **Drag & Drop (DnD):** Mover tarjetas entre columnas y reordenar listas usando `@hello-pangea/dnd`.
* **Edición en Sitio:** Títulos de listas y tarjetas editables.

### 📝 Detalles de la Tarjeta (Modal)
* **Diseño Pixel-Perfect:** Modal estilo Trello "Dark Mode".
* **Descripciones:** Editor de texto para detalles de la tarea.
* **Comentarios:** Sistema de comentarios con fecha y usuario.
* **Historial de Actividad:** Registro automático (Audit Log) cuando una tarjeta se mueve de lista (ej: *"Carlos movió esta tarjeta de Pendientes a Finalizado"*).

### 🤝 Colaboración y Seguridad
* **Invitaciones por Email:** Lógica para invitar a otros usuarios registrados al tablero.
* **Roles:** Distinción visual entre `Administrador` (Dueño) y `Miembro`.
* **Seguridad RLS (Row Level Security):**
    * Políticas estrictas en PostgreSQL.
    * Protección contra recursión infinita usando funciones `SECURITY DEFINER`.
    * Solo los miembros del tablero pueden ver o editar el contenido.

### ⚡ Rendimiento (Optimistic UI)
* **Estado Global con Zustand:** Gestión de estado ligera y rápida.
* **Actualizaciones Optimistas:** La interfaz se actualiza instantáneamente antes de confirmar con la base de datos (sensación de "cero latencia").

## 🛠️ Stack Tecnológico

* **Frontend:** React 19, Vite.
* **Estilos:** Tailwind CSS v4, Lucide React (Iconos).
* **Estado:** Zustand.
* **Drag & Drop:** @hello-pangea/dnd.
* **Backend / DB:** Supabase (PostgreSQL, Auth, Realtime).

## 🗄️ Estructura de Base de Datos (Supabase)

El proyecto utiliza las siguientes tablas relacionales:

1.  **`boards`**: Tableros (con `owner_id`).
2.  **`lists`**: Listas dentro de tableros (ordenadas por `position`).
3.  **`cards`**: Tarjetas dentro de listas.
4.  **`comments`**: Comentarios de usuarios en tarjetas.
5.  **`activities`**: Log de movimientos y cambios.
6.  **`board_members`**: Tabla pivote para gestionar accesos (M:N).

> **Nota:** Se implementaron funciones RPC en PostgreSQL (`invite_user_to_board`, `is_board_member`) para manejar la lógica de seguridad compleja.

## 🚀 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/trello-clone.git](https://github.com/tu-usuario/trello-clone.git)
    cd trello-clone
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz y agrega tus credenciales de Supabase:
    ```env
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
    ```

4.  **Correr el proyecto:**
    ```bash
    npm run dev
    ```



## 🔮 Próximos Pasos (Roadmap)

* [ ] Funcionalidad de "Archivar" tarjetas.
* [ ] Soporte para adjuntos (Subida de archivos a Supabase Storage).
* [ ] Etiquetas de colores funcionales.
* [ ] Checklists dentro de las tarjetas.

---
Desarrollado con ❤️ por **[Grediana NAtividad Rojas Grimales]**.