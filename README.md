# 🎬 Angular Content Explorer

A modern, feature-rich content discovery platform built with Angular that leverages the Trakt API to help users explore movies, TV shows, and episodes with advanced filtering and search capabilities.

## 🚀 Live Demo

**Deployed on Firebase:** [Your Deployment Link Here]

---

## ✨ Features

### 🔍 **Search & Discovery**
- **Universal Search**: Search across movies, TV shows, and episodes
- **Real-time Results**: Instant search results with optimized API calls
- **Content Cards**: Beautiful, responsive cards displaying key information
- **Lazy Loading**: Optimized image loading for better performance

### 🎛️ **Advanced Filtering**
- **Genre Filtering**: Multi-select genre filtering with virtual scrolling
- **Year Range**: Slider-based year range selection (1990-2025)
- **Runtime Filter**: Filter content by duration (20-240 minutes)
- **IMDB Rating**: Rating range filtering (0-10 stars)
- **Country Filter**: Filter by country availability
- **Persistent Filters**: Filter state preserved across page reloads

### 📄 **Pagination & Navigation**
- **Smart Pagination**: Efficient pagination with state persistence
- **URL-based State**: All filters and pagination state stored in URL
- **Browser Navigation**: Full support for back/forward navigation
- **Deep Linking**: Share filtered results with direct links

### 🎭 **Detailed Content Pages**
- **Rich Media Display**: High-quality posters and fanart backgrounds
- **Comprehensive Info**: Runtime, language, genres, ratings, and descriptions
- **External Links**: Direct links to trailers (YouTube) and official websites
- **Season Overview**: For TV shows, browse all seasons with episode counts
- **Responsive Design**: Optimized for all screen sizes

### 🎨 **User Experience**
- **Modern UI**: Clean, intuitive interface with PrimeNG components
- **Dark Mode Support**: Seamless dark/light theme switching
- **Loading States**: Elegant loading dialogs and placeholders
- **Error Handling**: Graceful error handling with user-friendly messages
- **Accessibility**: WCAG compliant with proper ARIA labels

### ⚡ **Performance Optimizations**
- **Signal-based Architecture**: Reactive state management with Angular Signals
- **Lazy Loading**: Components and images loaded on demand
- **Virtual Scrolling**: Efficient rendering of large lists
- **Optimized Images**: WebP support with fallbacks
- **Caching**: Smart API response caching

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **Angular 18+** - Modern web framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming with observables

### **UI Components & Styling**
- **PrimeNG** - Rich UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeIcons** - Comprehensive icon library
- **CSS Grid & Flexbox** - Modern layout techniques

### **API Integration**
- **Trakt API** - Comprehensive movie and TV show database
- **HTTP Client** - Angular's built-in HTTP client
- **Signal Integration** - Reactive API state management

### **Development Tools**
- **Angular CLI** - Project scaffolding and build tools
- **ESLint** - Code linting and formatting
- **TypeScript Compiler** - Static type checking

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (`npm install -g @angular/cli`)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Angular-Content-Explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create environment files for API configuration
   - Add your Trakt API credentials (if required)

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200/`

### **Build for Production**
```bash
ng build --prod
```

---

## 🔌 API Integration

### **Trakt API**
This application integrates with the Trakt API to provide:
- **Movie Database**: Comprehensive movie information
- **TV Show Database**: Detailed show and season data
- **Episode Information**: Individual episode details
- **Search Functionality**: Multi-type content search
- **Filtering Options**: Advanced content filtering

### **API Service Architecture**
- **Centralized Service**: Single API service handling all requests
- **Error Handling**: Robust error handling with user feedback
- **Response Caching**: Intelligent caching for better performance
- **Type Safety**: Full TypeScript interfaces for API responses

---

## 📁 Project Structure

```
src/
├── app/
│   ├── content/                    # Content detail components
│   │   ├── movie-content.component/
│   │   └── show-content.component/
│   ├── searchResults/              # Search and filtering
│   │   ├── search-results.component/
│   │   ├── content-card.component/
│   │   └── filter.component/
│   ├── services/
│   │   ├── api.service.ts          # Trakt API integration
│   │   └── loading.service.ts      # Loading state management
│   ├── models/
│   │   └── media.model.ts          # TypeScript interfaces
│   └── data/
│       └── GENRES.ts               # Genre definitions
├── assets/                         # Static assets
└── environments/                   # Environment configurations
```

---

## 📖 Usage Guide

### **🔍 Searching Content**
1. Use the search bar to find movies, shows, or episodes
2. Results are displayed in a responsive card layout
3. Click on any card to view detailed information

### **🎛️ Using Filters**
1. Access the filter panel on search results pages
2. Select genres using the multi-select dropdown
3. Adjust year, runtime, and rating ranges with sliders
4. Toggle country filtering as needed
5. Click "Apply Filters" to update results

### **📄 Navigation**
1. Use pagination controls to browse through results
2. Filter and page states are preserved in the URL
3. Use browser back/forward buttons for navigation
4. Share URLs to share specific filtered results

### **🎭 Content Details**
1. Click on any content card to view details
2. Explore high-quality images and comprehensive information
3. Access external links for trailers and official sites
4. For TV shows, browse through available seasons

---

## 🎯 Key Components

### **SearchResultsComponent**
- Main search interface with pagination
- Integrates filtering and content display
- Manages URL-based state persistence

### **FilterComponent**
- Advanced filtering interface
- Form-based filter management
- Query parameter synchronization

### **ContentCardComponent**
- Reusable content display cards
- Responsive design with lazy loading
- Type-safe content rendering

### **Movie/ShowContentComponent**
- Detailed content pages
- Rich media display
- External link integration

---

## 🔧 Development Features

### **State Management**
- **Angular Signals**: Modern reactive state management
- **URL Synchronization**: All state reflected in URL parameters
- **Persistent State**: Filters and pagination survive page reloads

### **Performance**
- **Lazy Loading**: Components and images loaded on demand
- **Virtual Scrolling**: Efficient large list rendering
- **Optimized Change Detection**: Minimal re-renders with OnPush strategy

### **Code Quality**
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components
- **Separation of Concerns**: Clear service and component boundaries

---

## 🌟 Future Enhancements

- [ ] **User Authentication**: Personal watchlists and favorites
- [ ] **Advanced Search**: More sophisticated search algorithms
- [ ] **Recommendations**: AI-powered content recommendations
- [ ] **Social Features**: User reviews and ratings
- [ ] **Offline Support**: PWA capabilities with offline caching
- [ ] **Mobile App**: Native mobile application
- [ ] **Internationalization**: Multi-language support

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow Angular style guide
- Write comprehensive tests
- Update documentation
- Ensure TypeScript compliance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Trakt API** - For providing comprehensive entertainment data
- **Angular Team** - For the amazing framework
- **PrimeNG Team** - For the excellent UI components
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

**Happy Content Exploring! 🎬✨**