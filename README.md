<div align="center">

# 🍽️ Crave AI

### Smart Restaurant Assistant Backend

AI-powered restaurant discovery, dish recommendations, and conversational menu assistance built with Node.js, MongoDB, and Google Gemini.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)](https://js.langchain.com/)

</div>

---

## ✨ Overview

**Crave AI** is a modular backend for an intelligent restaurant assistant. It combines a MongoDB-backed menu, LangChain tools, structured input validation, and Google's Gemini generative AI to help users discover dishes and receive personalized recommendations.

## 🚀 Features

- Fetch all available restaurant dishes
- Search dishes by name or category
- Recommend dishes by budget, dietary preference, and spice level
- Generate AI responses through Google Gemini
- Validate tool and API inputs with Zod
- Connect MongoDB automatically before server startup
- Store restaurant menu data using Mongoose
- Support ES Modules throughout the backend

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|---|---|---|
| Runtime | Node.js | JavaScript backend runtime |
| Framework | Express.js | REST API server and routing |
| Database | MongoDB | Restaurant and application data storage |
| ODM | Mongoose | Schemas, models, and MongoDB queries |
| AI Provider | Google Gemini | Natural-language AI generation |
| AI Framework | LangChain.js | Gemini integration and structured tools |
| Validation | Zod | API and tool input schemas |
| Configuration | dotenv | Environment variable management |
| Middleware | CORS | Browser and frontend API access |
| Development | Nodemon | Automatic server restart |

## 📦 Packages Used

```text
express                 REST API framework
mongoose                MongoDB object modeling
dotenv                  Environment configuration
cors                    Cross-origin resource sharing
langchain               LangChain JavaScript framework
@langchain/core         Core LangChain abstractions and tools
@langchain/google-genai Google Gemini chat integration
zod                     Runtime schema validation
nodemon                 Development server watcher
```

## 📁 Project Structure

```text
smart-restaurant-assistant/
├── config/
│   ├── db.js                 MongoDB connection
│   └── gemini.js             Google Gemini model configuration
├── controllers/
│   ├── ai.controller.js      AI API request handling
│   ├── chatcontroller.js     Conversation request handling
│   └── menucontroller.js     Menu CRUD request handling
├── models/
│   ├── Menu.js               Restaurant menu schema
│   └── Conversation.js       Conversation schema
├── routes/
│   ├── ai.routes.js          Gemini test route
│   └── chatroutes.js         Chat routes
├── services/
│   └── ai.service.js         Gemini response service
├── tools/
│   ├── restaurant.tools.js   Menu, search, and recommendation tools
│   └── recommendationtool.js Additional recommendation implementation
├── .env                      Local environment variables
├── .gitignore                Ignored files and secrets
├── package.json              Dependencies and scripts
└── server.js                 Application entry point
```

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/pooja701691/craveai.git
cd craveai/smart-restaurant-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create or update `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart-restaurant-assistant
GOOGLE_API_KEY=your_google_gemini_api_key
```

> Never commit your real API key or database credentials.

### 4. Start the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server is available at:

```text
http://localhost:5000
```

## 🔌 API Endpoint

### Test Gemini

```http
POST /api/ai/test
Content-Type: application/json
```

**Request**

```json
{
  "message": "Suggest popular Indian vegetarian dishes."
}
```

**Success Response**

```json
{
  "success": true,
  "response": "Popular Indian vegetarian dishes include..."
}
```

## 🤖 Restaurant LangChain Tools

### `get_menu`

Returns every currently available dish with its category, price, dietary preference, and spice level.

### `search_dishes`

Searches available dishes by name or category using case-insensitive MongoDB regular expressions.

### `recommend_dishes`

Filters available dishes using:

- Maximum budget
- Dietary preference: `Veg`, `Non-Veg`, or `Vegan`
- Spice level: `Low`, `Medium`, or `High`

All tool schemas are validated through Zod before database queries execute.

## 🧪 Health Check

```http
GET http://localhost:5000/
```

```json
{
  "success": true,
  "message": "Smart Restaurant Assistant API is running."
}
```

## 🔐 Security

- Keep `.env` out of Git using `.gitignore`
- Rotate API keys if they are accidentally exposed
- Restrict database access in production
- Enable environment-specific configuration before deployment

## 🗺️ Development Scope

This repository currently contains the backend foundation and AI/menu integration. Frontend development, full autonomous tool execution, and conversation-memory architecture are not required for the initial implementation scope.

---

<div align="center">

Built with ❤️ for smarter restaurant experiences.

</div>
