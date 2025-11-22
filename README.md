# 🎧 Last.fm Dashboard

Sistema web para gerenciar dados musicais com login, busca e inserção de músicas/artistas.

---

## 📋 Funcionalidades

- ✅ **Login**: Autenticação de usuários
- ✅ **Busca**: Visualizar perfil, última música e top 5 artistas
- ✅ **Inserção**: Adicionar novas músicas e artistas
- ✅ **Segurança**: Senhas criptografadas, proteção contra ataques

---

## 🛠️ Tecnologias

**Frontend:** React.js + Material-UI + Vite  
**Backend:** Express.js + MongoDB + JWT  
**Banco:** MongoDB Atlas (nuvem)

---

## 🚀 Como Executar

### **1. Backend**
```bash
cd backend
npm install
cp .env.example .env  # Configure suas credenciais
node src/createUsers.js  # Cria usuários de teste
npm run dev
```

**Rodando em:** `http://localhost:5000`

---

### **2. Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Rodando em:** `http://localhost:5173`

---

## 🔑 Login de Teste

- **Username:** `admin2`
- **Senha:** `admin123`

---

## 📂 Estrutura
```
projeto2/
├── backend/
│   ├── src/
│   │   ├── config/     # Banco, cache, logs
│   │   ├── models/     # User, Track, Artist
│   │   ├── routes/     # auth, search, insert
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/ # UserProfile, RecentTrack, TopArtists
    │   ├── contexts/   # AuthContext, DataContext
    │   ├── pages/      # Login, Dashboard
    │   └── services/   # API
    └── package.json
```

---

## 🎧 Como Usar

1. **Faça login** com `admin2` / `admin123`
2. **Veja seu perfil** e dados musicais no Dashboard
3. **Adicione músicas/artistas** na aba "Inserir Dados"
4. **Atualize** para ver os novos dados

---

## 👤 Autoras

**Ana Beatriz Maciel Ferraz** - [@anabmferraz](https://github.com/anabmferraz)

**Nathalia Miyuki** - [@nathaliamiyuki](https://github.com/nathaliamiyuki)
