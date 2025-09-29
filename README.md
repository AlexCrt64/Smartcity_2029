# SmartCity 2029 🏛️

> **Civic Engagement Platform for Democratic Urban Planning**

A React Native mobile application that revolutionizes how citizens participate in urban development decisions. Cities publish project proposals on an interactive map, citizens vote on them, and the most popular projects get prioritized for implementation.

![SmartCity Demo](https://img.shields.io/badge/Demo-Ready-success) ![React Native](https://img.shields.io/badge/React_Native-0.74-blue) ![Expo](https://img.shields.io/badge/Expo-51-black) ![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748)

## 🎯 Project Vision

**Empowering Democratic Participation in Urban Planning**

SmartCity bridges the gap between municipal authorities and citizens by providing a transparent, accessible platform for community engagement. Citizens can:
- 📍 **Explore** urban planning projects on an interactive map
- 🗳️ **Vote** on proposed developments in their neighborhoods  
- 💡 **Propose** their own civic improvement ideas
- 📊 **Track** project progress from proposal to completion

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/AlexCrt64/Smartcity_2029.git
cd Smartcity_2029/Smartcity

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

## 🏗️ Architecture Overview

```
SmartCity/
├── 📱 app/                 # Expo Router screens
│   ├── home.tsx           # Interactive map with projects
│   ├── boite-a-idees.tsx  # Citizen submission form
│   ├── project/[id].tsx   # Project details & voting
│   └── api/               # Backend API routes
├── 🎨 assets/             # Images, icons, logos
├── 🗄️ prisma/             # Database schema & migrations
├── 🛠️ services/          # Data synchronization
└── 📊 generated/          # Prisma client
```

### Tech Stack
- **Frontend**: React Native + Expo Router
- **Maps**: react-native-maps with OpenStreetMap
- **Database**: SQLite + Prisma ORM
- **Navigation**: Expo Router (file-based)
- **Icons**: @expo/vector-icons
- **Typography**: Manrope font family

---

## 🗺️ Core Features

### 🏛️ **For Municipal Administrators**
- Publish urban development projects with detailed information
- Set voting periods and project timelines
- Monitor citizen engagement and voting patterns
- Track project implementation progress

### 👥 **For Citizens**  
- Browse current projects on interactive Bordeaux map
- Vote (👍/👎) on proposed developments
- Submit ideas through "Boîte à Idées" (suggestion box)
- View project status and community engagement

### 🎨 **Visual Design**
- **Crown logo**: Represents civic authority and citizen participation
- **Institutional blue** (#4A90E2) with green/red voting indicators
- **Status-based markers**: Color-coded project phases
- **Accessibility-first**: High contrast, readable typography

---

## 📊 Database Schema

### Projects
```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  category    ProjectCategory  # LOGEMENT, TRANSPORT, ESPACES_VERTS...
  status      ProjectStatus    # PROPOSAL, VOTE_EN_COURS, APPROUVE...
  submittedBy SubmissionType   # CITY or CITIZEN
  latitude    Float
  longitude   Float
  votingStart DateTime?
  votingEnd   DateTime?
  votes       Vote[]
}
```

### Voting System
```prisma
model Vote {
  id        String   @id @default(cuid())
  projectId String
  voteType  VoteType # UPVOTE or DOWNVOTE
  sessionId String?  # Demo session tracking
}
```

---

## 🌍 Data Integration

### Bordeaux Open Data
- **PLU (Plan Local d'Urbanisme)**: Urban planning documents
- **Projets d'Aménagement**: Development projects data
- **Permis de Construire**: Building permits information

### API Endpoints
```
GET  /api/projects       # Fetch all projects with vote counts
POST /api/projects       # Create new citizen-submitted project
POST /api/vote           # Cast vote on project
```

---

## 🎭 Demo Features

### Mock Authentication
- **No real login required** - simplified for demonstration
- **Instant access** to all civic engagement features
- **Session-based voting** to simulate user preferences

### Sample Projects
- **Nouveau parc urbain Gambetta** - Parks & green spaces
- **Piste cyclable Cours Victor Hugo** - Transportation 
- **Réaménagement Place Saint-Pierre** - Urban development
- All with realistic Bordeaux locations and municipal context

### Voting Mechanics
- **7-day voting periods** for all projects
- **Real-time vote counting** and immediate feedback
- **Visual vote indicators** on map markers
- **Democratic decision-making** simulation

---

## 🚀 Deployment

### Local Development
```bash
npm start          # Start Expo development server
npx prisma studio  # Open database management UI
npm run build      # Build for production
```

### Production Considerations
- **Environment Variables**: Configure API keys and database URLs
- **Database Migration**: Use PostgreSQL for production
- **Authentication**: Implement real user authentication system
- **Push Notifications**: Add project updates and voting reminders

---

## 🎯 Civic Impact

### Democratic Innovation
- **Direct participation** in urban planning decisions
- **Transparent voting** with open vote counts
- **Community-driven** project prioritization
- **Accessible civic engagement** for all citizens

### Municipal Benefits
- **Increased citizen engagement** in community processes
- **Data-driven decision making** based on community input
- **Reduced consultation costs** through digital participation
- **Enhanced transparency** in urban development

---

## 🤝 Contributing

We welcome contributions to improve SmartCity's community engagement capabilities!

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/community-enhancement`)
3. **Commit** your changes (`git commit -m 'Add neighborhood-based filtering'`)
4. **Push** to the branch (`git push origin feature/community-enhancement`)
5. **Create** a Pull Request

### Development Guidelines
- Follow React Native best practices
- Maintain accessibility standards (WCAG 2.1 AA)
- Write tests for new community engagement features
- Update documentation for API changes

---

## 📜 License

**MIT License** - Built for civic good and democratic participation

---

## 🏛️ About

**SmartCity** was developed as a proof-of-concept for modernizing community engagement in French municipalities. The platform demonstrates how technology can enhance democratic participation while maintaining the trust and transparency essential for public sector applications.

**Built with ❤️ for community engagement and democratic innovation**

---

## 📞 Contact

For questions about municipal technology implementation or community deployment:

- **GitHub**: [@AlexCrt64](https://github.com/AlexCrt64)
- **Project**: [SmartCity 2029](https://github.com/AlexCrt64/Smartcity_2029)

*Empowering citizens, enhancing democracy, building better cities.* 🏙️✨