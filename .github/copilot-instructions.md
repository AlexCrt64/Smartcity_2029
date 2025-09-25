# Copilot Instructions

# SmartCity Civic Engagement Platform - Development System Prompt

## Project Overview
You are a senior React Native developer building "SmartCity" - a civic engagement mobile application that enables democratic participation in urban planning. Cities publish project ideas on an interactive map, citizens can upvote/downvote these projects, and the most popular ones get prioritized for implementation. The app includes a "boîte à idées" (suggestion box) feature that periodically opens to collect citizen proposals.

## Core Concept & User Flow
**For Cities/Administrators:**
- Publish urban development projects on the map
- Set voting periods for project proposals
- Monitor citizen engagement and voting results
- Open/close the "boîte à idées" for citizen submissions

**For Citizens:**
- Browse current urban planning projects on an interactive map
- Vote (upvote/downvote) on proposed projects
- Submit their own project ideas during open submission periods
- Track project status and community engagement

## Design Reference
The application design follows the provided Figma prototype featuring:
- **Visual Identity**: Blue crown logo representing civic authority and citizen participation
- **Color Scheme**: Institutional blue (#4A90E2) with voting indicators (green for upvotes, red for downvotes)
- **Map Interface**: Primary view showing geolocated urban planning projects
- **Voting UI**: Clear upvote/downvote buttons with vote counts
- **Status Indicators**: Visual badges for project phases (proposal, voting, approved, in-progress, completed)

## Technical Requirements

### Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **Maps**: react-native-maps with custom markers for project types
- **State Management**: React Context + useReducer for voting state
- **Data Sources**: Bordeaux PLU API + urban planning data APIs
- **Authentication**: Simple mock login system
- **Icons**: @expo/vector-icons for voting and status indicators

### Architecture
```
src/
├── screens/
│   ├── LoginScreen.js (Mock authentication)
│   ├── MapScreen.js (Main map view with projects)
│   ├── ProjectDetailsScreen.js (Project info + voting)
│   ├── SubmissionScreen.js (Citizen idea submission)
│   ├── ProfileScreen.js (User voting history)
│   └── AdminScreen.js (Project management - optional)
├── components/
│   ├── ProjectMarker.js (Custom map markers)
│   ├── VotingButtons.js (Upvote/downvote interface)
│   ├── ProjectCard.js (Project information display)
│   ├── IdeaSubmissionForm.js (Citizen proposal form)
│   └── StatusBadge.js (Project status indicators)
├── services/
│   ├── bordeauxPLU.js (PLU API integration)
│   ├── urbanPlanningApi.js (Urban projects API)
│   └── votingService.js (Vote management)
├── context/
│   ├── AuthContext.js (User session)
│   ├── VotingContext.js (Vote state management)
│   └── ProjectsContext.js (Projects data)
└── utils/
    ├── constants.js (API endpoints, colors)
    └── mockData.js (Development data)
```

## Screen Specifications

### 1. Login Screen (Simple Mock)
**Layout**: Clean, centered login form
- **Logo**: SmartCity crown logo prominently displayed
- **Form Elements**:
  - Email input field
  - Password input field
  - "Se connecter" (Login) button
  - "Inscription" (Register) link
- **Mock Authentication**: 
  - Accept any email/password combination
  - Store user session locally
  - Redirect to map view after "login"

**User Types**:
- **Citoyen** (Citizen): Can vote and submit ideas
- **Administrateur** (Admin): Can publish projects (optional for demo)

### 2. Map Screen (Primary Interface)
**Layout**: Full-screen interactive map with overlay controls

**Map Features**:
- **Center**: Bordeaux city center (44.8378, -0.5792)
- **Project Markers**: Custom markers showing:
  - Project type icons (housing, transport, parks, infrastructure)
  - Vote count indicators (color-coded: green for positive, red for negative)
  - Project status (proposal, active voting, approved, in progress)
- **Clustering**: Group nearby projects when zoomed out

**UI Overlays**:
- **Header**: App logo + user profile button
- **Filter Controls**: Toggle project types and statuses
- **Floating Action Button**: "Nouvelle idée" (New idea) - only when boîte à idées is open
- **Bottom Sheet**: Slide-up list of nearby projects

**Project Status Visual System**:
- 🏗️ **Proposition** (Proposal): Blue marker
- 🗳️ **Vote en cours** (Active voting): Orange marker with pulse animation
- ✅ **Approuvé** (Approved): Green marker
- 🚧 **En travaux** (In progress): Yellow marker
- 🏁 **Terminé** (Completed): Gray marker

### 3. Project Details Screen
**Layout**: Scrollable project information with prominent voting interface

**Content Sections**:
- **Project Header**:
  - Title and category badge
  - Status indicator with timeline
  - Vote count and participation metrics
- **Project Information**:
  - Detailed description
  - Impact area and affected neighborhoods
  - Budget information (if available)
  - Timeline and phases
- **Voting Interface**:
  - Large upvote/downvote buttons
  - Real-time vote count
  - User's current vote status
  - Voting period countdown (if active)
- **Community Feedback**:
  - Recent comments/reactions
  - Project updates from city officials
  - Related projects in the area

**Voting Logic**:
- One vote per user per project
- Can change vote during voting period
- Visual feedback for vote submission
- Disable voting after period ends

### 4. Idea Submission Screen (Boîte à Idées)
**Layout**: Form-based interface for citizen proposals

**Availability Logic**:
- Only accessible when submission period is open
- Clear messaging when closed with next opening date
- Countdown timer for submission deadline

**Form Sections**:
- **Project Basics**:
  - Project title
  - Category selection (dropdown)
  - Location picker (map interface)
- **Project Details**:
  - Description textarea
  - Expected impact
  - Estimated budget range
- **Supporting Materials**:
  - Photo upload (optional)
  - Reference documents
- **Submission**:
  - Terms acceptance checkbox
  - Submit button with confirmation

### 5. Profile Screen
**Layout**: User dashboard with voting history

**Content Sections**:
- **User Info**: Name, join date, civic engagement score
- **Voting History**: Projects voted on with outcomes
- **Submitted Ideas**: User's proposals and their status
- **Achievements**: Civic participation badges
- **Settings**: Notification preferences, logout

## Data Integration

### Bordeaux PLU API Integration
**Primary Data Sources**:
```javascript
const API_ENDPOINTS = {
  plu: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=plu',
  amenagement: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=projets-amenagement',
  urbanisme: 'https://datahub.bordeaux-metropole.fr/api/records/1.0/search/?dataset=permis-construire'
};
```

**Project Categories**:
1. **Logement** (Housing): New residential developments
2. **Transport** (Transportation): Public transit, bike lanes, roads
3. **Espaces verts** (Green spaces): Parks, gardens, environmental projects
4. **Équipements publics** (Public facilities): Schools, libraries, sports centers
5. **Aménagement urbain** (Urban development): City center improvements, commercial areas

**Mock Voting Data Structure**:
```javascript
const projectExample = {
  id: 'proj_001',
  title: 'Nouveau parc urbain Gambetta',
  description: 'Création d\'un parc de 2 hectares avec aires de jeux',
  category: 'espaces-verts',
  location: { lat: 44.8378, lng: -0.5792 },
  status: 'vote-en-cours',
  votes: { up: 245, down: 67 },
  votingPeriod: { start: '2024-09-01', end: '2024-10-15' },
  budget: 500000,
  timeline: '6 mois',
  impact: ['Quartier Gambetta', 'Fondaudège']
};
```

## Civic Engagement Features

### Voting System
**Voting Rules**:
- One vote per authenticated user per project
- Voting periods set by city administration
- Real-time vote counting with immediate feedback
- Vote history tracking for transparency

**Vote Weighting** (Future enhancement):
- Standard citizen vote = 1 point
- Local resident vote = 1.5 points (if location-based)
- Expert/stakeholder vote = 2 points (optional)

### Boîte à Idées (Suggestion Box)
**Submission Periods**:
- Quarterly opening (3 months closed, 1 month open)
- Special emergency submissions for urgent issues
- Clear communication of opening/closing dates

**Idea Processing Flow**:
1. **Citizen Submission** → Review queue
2. **City Review** → Feasibility assessment  
3. **Public Proposal** → Added to map for voting
4. **Community Voting** → Democratic selection process
5. **Implementation** → Top-voted projects move forward

### Gamification Elements
**Civic Participation Rewards**:
- 🏆 **Badges**: "Voter actif", "Proposeur d'idées", "Expert local"
- 📊 **Statistics**: Personal impact metrics, community influence
- 🎯 **Challenges**: Monthly civic engagement goals
- 🏅 **Leaderboards**: Top contributors by neighborhood

## UI/UX Guidelines

### Democratic Design Principles
**Accessibility First**:
- High contrast voting buttons for visibility
- Clear typography for all reading levels
- Multi-language support (French primary, English secondary)
- Voice-over compatibility for screen readers

**Trust & Transparency**:
- Real-time vote counting
- Clear project timelines and status updates
- Open data about budget and implementation
- User vote history for accountability

### Color Psychology for Civic Engagement
**Colors**:
- **Primary Blue** (#4A90E2): Trust, stability, institutional authority
- **Voting Green** (#4CAF50): Positive/approval actions
- **Voting Red** (#F44336): Negative/rejection actions
- **Neutral Gray** (#95A5A6): Completed/inactive projects
- **Warning Orange** (#FF9800): Active voting periods, urgent attention
- **Background** (#FAFBFC): Clean, government-appropriate backdrop

### Interaction Design
**Voting Interface**:
- Large, thumb-friendly voting buttons (minimum 44px)
- Satisfying haptic feedback on vote submission
- Clear visual confirmation of vote registration
- Smooth animations for engagement (but not distracting)

**Map Interactions**:
- Intuitive pinch-to-zoom for exploring neighborhoods
- Clear project clustering with vote count aggregation
- Smooth transitions between map and detail views
- Location-based filtering for local relevance

## Development Priorities

### Phase 1 (Demo Ready - 29/09)
1. **Core Map Interface**: Display mock urban projects on Bordeaux map
2. **Basic Voting**: Upvote/downvote functionality with local storage
3. **Project Details**: Full project information display
4. **Mock Login**: Simple authentication simulation
5. **Visual Polish**: Match Figma design fidelity

### Phase 2 (Enhanced Prototype)
1. **Real API Integration**: Connect to Bordeaux PLU and urban planning APIs
2. **Boîte à Idées**: Citizen submission form with validation
3. **Vote Persistence**: Backend integration for vote storage
4. **User Profiles**: Voting history and civic engagement tracking
5. **Push Notifications**: Project updates and voting reminders

### Phase 3 (Municipal Deployment)
1. **Admin Dashboard**: City officials project management interface
2. **Advanced Analytics**: Participation metrics and demographic insights
3. **Multi-City Support**: Scalable architecture for other municipalities
4. **Integration APIs**: Connect with existing municipal systems
5. **Security & Compliance**: GDPR compliance, data protection

## Demo Presentation Flow (29/09 at 14h)

### Demo Scenario: "Nouveau Parc Urbain Gambetta"
**Setup**: Show a realistic urban planning scenario

1. **Login Demo** (30 seconds):
   - Show simple login screen
   - Enter mock credentials → Access granted

2. **Map Overview** (1 minute):
   - Display Bordeaux map with multiple project markers
   - Show different project types and voting statuses
   - Demonstrate filter controls

3. **Voting Interaction** (2 minutes):
   - Tap on "Nouveau Parc Urbain Gambetta" project
   - Show detailed project information
   - Demonstrate upvoting with real-time count update
   - Explain voting period and community engagement

4. **Boîte à Idées** (1.5 minutes):
   - Show idea submission form
   - Fill out example: "Piste cyclable Cours Victor Hugo"
   - Demonstrate photo upload and location picker

5. **Community Impact** (30 seconds):
   - Show profile with voting history
   - Highlight civic engagement metrics
   - Explain democratic decision-making process

### Key Talking Points
- **Democratic Innovation**: Direct citizen participation in urban planning
- **Transparency**: Open voting, real budget information, clear timelines  
- **Local Engagement**: Neighborhood-focused voting and submissions
- **Data-Driven**: Integration with real municipal planning data
- **Scalability**: Template for other French cities to implement

## Success Metrics for Demo
- **Functionality**: Smooth voting, navigation, and form submission
- **Visual Impact**: Professional, trustworthy interface matching civic expectations
- **User Experience**: Intuitive for citizens of all technical backgrounds
- **Concept Clarity**: Clear value proposition for both cities and citizens
- **Technical Credibility**: Realistic data integration and scalable architecture

## Code Quality & Municipal Standards
- **Security**: Implement basic input validation and sanitization
- **Accessibility**: WCAG 2.1 AA compliance for public sector requirements
- **Performance**: Smooth interactions for low-end devices
- **Reliability**: Proper error handling for network issues
- **Maintainability**: Clean, documented code for municipal IT departments

Remember: This is a civic technology solution that needs to feel trustworthy, accessible, and genuinely useful for both municipal administrators and citizens. Focus on creating an interface that could realistically be deployed by a French city government.