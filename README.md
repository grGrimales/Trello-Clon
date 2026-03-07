
# 🚀 Trello Clone (React + Supabase)

A functional and collaborative Trello clone built with **React 19**, **Tailwind CSS v4**, and **Supabase**. This project replicates the Trello user experience, featuring boards, lists, drag-and-drop cards, real-time comments, and member management.

## ✨ Key Features

### 📋 Task Management

* **Dynamic Boards:** Create unlimited lists and cards.
* **Drag & Drop (DnD):** Move cards between columns and reorder lists using `@hello-pangea/dnd`.
* **Inline Editing:** Instantly edit list and card titles on the fly.

### 📝 Card Details (Modal)

* **Pixel-Perfect Design:** Trello-style modal featuring a sleek "Dark Mode".
* **Descriptions:** Text editor for detailed task descriptions.
* **Comments:** Real-time commenting system with timestamps and user identification.
* **Activity History:** Automated audit log when a card is moved across lists (e.g., *"Carlos moved this card from To Do to Done"*).

### 🤝 Collaboration & Security

* **Email Invitations:** Built-in logic to invite registered users to collaborate on a board.
* **Roles & Permissions:** Visual and functional distinction between `Admin` (Owner) and `Member`.
* **Row Level Security (RLS):**
* Strict PostgreSQL security policies.
* Protection against infinite recursion using `SECURITY DEFINER` functions.
* Content is strictly restricted to authorized board members.



### ⚡ Performance (Optimistic UI)

* **Global State with Zustand:** Lightweight, fast, and scalable state management.
* **Optimistic Updates:** The UI updates instantly before confirming with the database, providing a seamless, zero-latency feel.

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite.
* **Styling:** Tailwind CSS v4, Lucide React (Icons).
* **State Management:** Zustand.
* **Drag & Drop:** @hello-pangea/dnd.
* **Backend / DB:** Supabase (PostgreSQL, Auth, Realtime).

## 🗄️ Database Structure (Supabase)

The project relies on the following relational tables:

1. **`boards`**: Workspaces (includes `owner_id`).
2. **`lists`**: Columns within boards (ordered by `position`).
3. **`cards`**: Draggable tasks within lists.
4. **`comments`**: User comments attached to cards.
5. **`activities`**: Audit log for card movements and updates.
6. **`board_members`**: Pivot table to handle access and collaboration (M:N relationship).

> **Note:** Custom PostgreSQL RPC functions (`invite_user_to_board`, `is_board_member`) were implemented to handle complex security and invitation logic.

## 🚀 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/trello-clone.git
cd trello-clone

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```


4. **Run the project:**
```bash
npm run dev

```



## 🔮 Roadmap (Next Steps)

* [ ] Attachment support (File uploads via Supabase Storage).
* [ ] Checklists inside card details.

---

Developed with ❤️ by **[Grediana Natividad Rojas Grimales]**.

---

