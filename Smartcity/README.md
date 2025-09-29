# SmartCity - Civic Engagement Mobile App 🏛️📱

**A React Native application for democratic participation in urban planning**

> Transform how citizens engage with their city's development through interactive maps, real-time voting, and transparent civic processes.

---

## 🎯 Application Overview

SmartCity is a mobile community engagement platform that enables:
- **Citizens** to vote on urban development projects and submit their own ideas
- **Municipal authorities** to gather community input on municipal initiatives
- **Transparent democracy** through open voting and project tracking

### Core User Flows

1. **Browse Projects** → Interactive map showing municipal initiatives
2. **Vote & Engage** → Democratic participation in urban planning  
3. **Submit Ideas** → "Boîte à Idées" for citizen-driven proposals
4. **Track Progress** → Follow projects from proposal to completion

---

## 🛠️ Technical Stack

### Frontend Architecture
```
React Native 0.74 + Expo SDK 51
├── Expo Router (file-based navigation)
├── react-native-maps (OpenStreetMap integration)
├── @expo/vector-icons (UI iconography)
├── Manrope font family (professional typography)
└── SafeAreaView (iOS/Android compatibility)
```

### Backend & Data
```
SQLite + Prisma ORM
├── Auto-generated TypeScript types
├── Migration-based schema management
├── Seed scripts for demo data
└── API routes (/api/projects, /api/vote)
```

### Key Dependencies
```json
{
  "@expo/vector-icons": "^14.0.0",
  "expo-router": "~3.5.14",
  "react-native-maps": "1.14.0",
  "@prisma/client": "5.14.0",
  "expo-font": "~12.0.5"
}
```

---

## 📂 Project Structure

```
SmartCity/
├── 📱 app/                    # Expo Router screens
│   ├── _layout.tsx           # Root navigation layout
│   ├── index.tsx             # Splash/welcome screen
│   ├── login.tsx             # Mock authentication
│   ├── home.tsx              # ⭐ Main map interface
│   ├── boite-a-idees.tsx     # ⭐ Citizen idea submission
│   ├── profile.tsx           # User profile & settings
│   ├── project/
│   │   └── [id].tsx          # ⭐ Project details & voting
│   └── api/                  # Backend API routes
│       ├── projects+api.ts   # CRUD operations
│       └── vote/+api.ts      # Voting system
│
├── 🎨 assets/
│   └── images/
│       ├── Crown_Logo.png    # Civic authority branding
│       └── Logo_*.svg        # Various logo formats
│
├── 🗄️ prisma/
│   ├── schema.prisma         # Database schema definition
│   ├── dev.db               # SQLite database file
│   ├── seed.js              # Demo data population
│   └── migrations/          # Schema version control
│
├── 🛠️ services/
│   ├── syncBordeaux.js      # Real civic data integration
│   └── syncScheduler.js     # Automated data updates
│
└── 📊 generated/
    └── prisma/              # Auto-generated client code
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (optional)

### Installation

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev
npx prisma generate
node prisma/seed.js

# Start the development server
npm start
```

### Testing the App

1. **Scan QR code** with Expo Go app (iOS/Android)
2. **Or press `w`** to open in web browser
3. **Or press `i`** for iOS simulator / `a` for Android emulator

---

## 🗺️ Key Features

### Interactive Community Map (`home.tsx`)
- **Bordeaux-focused mapping** with OpenStreetMap integration
- **Custom project markers** showing category, status, and vote counts
- **User icons** for citizen-submitted projects (👤 indicator)
- **Real-time vote display** on map markers
- **Layered top bar** with perfectly centered crown logo

### Democratic Voting System (`project/[id].tsx`)
- **Status-aware voting** (only active during `VOTE_EN_COURS`)
- **7-day voting periods** for all projects
- **Real-time vote counting** with immediate UI updates
- **Session-based voting** for demo purposes
- **Vote validation** with period checking

### Citizen Idea Submission (`boite-a-idees.tsx`)
- **"Boîte à Idées"** form for democratic project proposals
- **Category selection** (Transport, Housing, Green Spaces, etc.)
- **Direct-to-voting** submission (no approval queue)
- **Automatic geolocation** around Bordeaux coordinates
- **Instant map integration** after submission

---

## 🗄️ Database Schema

### Core Tables
```prisma
model Project {
  id          String          @id @default(cuid())
  title       String          # "Nouveau parc urbain Gambetta"
  description String          # Detailed project information
  category    ProjectCategory # ESPACES_VERTS, TRANSPORT, etc.
  status      ProjectStatus   # VOTE_EN_COURS, APPROUVE, etc.
  submittedBy SubmissionType  # CITY or CITIZEN
  latitude    Float          # Bordeaux coordinates
  longitude   Float
  votingStart DateTime?       # Democratic voting period
  votingEnd   DateTime?       # 7 days from start
  votes       Vote[]         # All votes cast
}

model Vote {
  id        String   @id @default(cuid())
  projectId String   # Foreign key to Project
  voteType  VoteType # UPVOTE or DOWNVOTE
  sessionId String?  # Demo session tracking
}
```

---

## 🔌 API Endpoints

### Projects API
```
GET  /api/projects       # Fetch all civic projects with vote counts
POST /api/projects       # Create new citizen-submitted project
```

### Voting API
```
POST /api/vote          # Cast democratic vote on project
```

**Example Vote Request**:
```json
{
  "projectId": "proj_123",
  "voteType": "UPVOTE",
  "sessionId": "demo_1234567890_0.123"
}
```

---

## 🎨 Design System

### Municipal Color Palette
- **Primary Blue**: #4A90E2 (institutional trust)
- **Vote Green**: #4CAF50 (approval/upvotes)  
- **Vote Red**: #F44336 (opposition/downvotes)
- **Active Orange**: #FF9800 (voting period)

### Typography
- **Font Family**: Manrope (professional municipal appearance)
- **Accessibility**: High contrast ratios, readable sizes
- **Touch Targets**: Minimum 44px for thumb-friendly interaction

---

## 🌍 Bordeaux Data Integration

### Open Data Sources
```javascript
const BORDEAUX_APIS = {
  plu: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=plu',
  projets: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=projets-amenagement'
};
```

### Demo Projects
- **Nouveau parc urbain Gambetta** - Environmental/Green spaces
- **Piste cyclable Cours Victor Hugo** - Transportation/Cycling
- **Réaménagement Place Saint-Pierre** - Urban development

---

## 🎭 Demo Features

### Mock Authentication
- **No real login required** - simplified for demonstration
- **Instant community access** to all engagement features

### Voting Simulation
- **7-day voting periods** demonstrate democratic processes
- **Session-based voting** simulates different citizen perspectives
- **Real-time updates** show community engagement in action

### Presentation Ready
1. **"Digital Democracy"** - Live voting demonstration
2. **"Citizen Empowerment"** - Idea submission walkthrough
3. **"Municipal Transparency"** - Open vote counting
4. **"Scalable Solution"** - Multi-city deployment potential

---

## 🚀 Development Commands

```bash
# Database Management
npx prisma studio            # Visual database browser (localhost:5555)
npx prisma migrate dev       # Apply schema changes
node prisma/seed.js          # Fresh demo data

# Development Server
npm start                    # Expo development server
# Choose: (w) web, (i) iOS, (a) Android, or scan QR

# Production Build
npm run build               # Build for deployment
```

---

## 🔐 Environment Variables

1. Copy `.env.example` to `.env`
2. Replace `EXPO_PUBLIC_API_KEY` with your actual API key
3. Never commit the `.env` file (already in `.gitignore`)

Usage in code:
```typescript
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
```

**Important**: Variables prefixed with `EXPO_PUBLIC_` are bundled client-side and visible to users. For sensitive secrets, use a backend proxy instead.

---

## 🎯 Production Deployment

### Security Considerations
- Replace mock authentication with real municipal login
- Implement rate limiting for voting endpoints
- Add GDPR compliance for citizen data protection
- Enable HTTPS and secure session management

### Scaling for Municipalities
- PostgreSQL for production database
- Docker containerization for municipal servers
- Multi-language support (French, English, Spanish)
- Integration APIs for existing civic systems

---

## 🤝 Municipal Partnership

Interested in deploying SmartCity in your municipality?

- **Free pilot program** for French cities
- **Customization services** for local civic processes
- **Staff training** and ongoing technical support
- **Open source approach** building public trust

---

## 📊 Civic Impact Metrics

### Democratic Engagement
- **Increased participation** in urban planning decisions
- **Transparent voting** with real-time community feedback
- **Accessible municipal processes** for all technical skill levels
- **Data-driven municipal decisions** based on citizen input

### Municipal Benefits
- **Reduced consultation costs** through digital engagement
- **Enhanced transparency** in urban development
- **Community-driven prioritization** of public projects
- **Improved citizen satisfaction** with civic participation

---

**SmartCity - Empowering citizens, enhancing democracy, building better cities** 🏛️✨

*Built with ❤️ for community engagement and democratic innovation*

---

## 📞 Contact & Support

- **GitHub Repository**: [SmartCity 2029](https://github.com/AlexCrt64/Smartcity_2029)
- **Technical Issues**: Create GitHub issues for bugs and features
- **Municipal Inquiries**: Contact for pilot program information

*Transforming civic engagement through technology and democratic innovation*
