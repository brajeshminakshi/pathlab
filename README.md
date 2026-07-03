# PathLab - Pathology Laboratory Management System (SaaS)

A comprehensive, production-ready, multi-tenant SaaS platform for managing pathology laboratories efficiently.

## 📋 Overview

PathLab is designed to streamline laboratory operations with features including:

- **Multi-Tenant Architecture**: Complete data isolation per organization
- **Role-Based Access Control (RBAC)**: 6 roles with granular permissions
- **Patient Management**: Comprehensive patient registry with search
- **Test Master & Catalog**: 100+ standard tests with dynamic parameters
- **Smart Report Entry**: Conditional rendering with auto-flagging
- **PDF Generation**: A4-optimized professional reports
- **Billing & Invoicing**: Complete financial management
- **Inventory Management**: Stock and reagent tracking
- **Audit Trails**: Healthcare compliance logging
- **Analytics Dashboard**: Real-time insights and statistics

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Components**: Lucide React (icons)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Chart.js + react-chartjs-2
- **PDF**: pdf-lib
- **QR/Barcode**: qrcode.react + jsbarcode

### Backend/BaaS
- **Authentication**: Firebase Auth
- **Database**: Firestore (NoSQL)
- **Storage**: Firebase Storage

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project (free tier is sufficient)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brajeshminakshi/pathlab.git
   cd pathlab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linting
npm run type-check   # Type checking
npm run format       # Format code
```

## 📁 Project Structure

```
patlab/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable UI components
│   ├── features/            # Feature-specific modules
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and libraries
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper functions
│   ├── env.ts               # Environment configuration
│   └── ...
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

## 🎯 Roadmap

1. ✅ **Phase 1**: Project Initialization & Architecture
2. ⏳ **Phase 2**: Authentication & RBAC
3. ⏳ **Phase 3**: Multi-Tenant Database Setup
4. ⏳ **Phase 4**: Dashboard & Navigation
5. ⏳ **Phase 5**: Test Master & Inventory
6. ⏳ **Phase 6**: Patient Registration & Invoicing
7. ⏳ **Phase 7**: Smart Report Entry
8. ⏳ **Phase 8**: PDF Report Engine
9. ⏳ **Phase 9**: Search & Audit Trails
10. ⏳ **Phase 10**: Polish & Documentation

## 👨‍💻 Author

**Brajesh Minakshi** - [@brajeshminakshi](https://github.com/brajeshminakshi)

---

**Status**: Phase 1 Complete - Awaiting Phase 2 Confirmation
