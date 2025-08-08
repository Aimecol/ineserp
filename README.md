# Springfield University ERP System

A comprehensive Enterprise Resource Planning (ERP) system built with Next.js for institutional management.

## 🚀 Features

### Core Modules
- **Dashboard** - Real-time KPIs, analytics, and system overview
- **Student Accounts** - Student management, fee tracking, and payment processing
- **Project Accounts** - Project budget management and expense tracking
- **Payroll** - Employee payroll management with comprehensive forms
- **Procurement** - Purchase order management and vendor tracking
- **Fixed Assets** - Asset management with depreciation calculations
- **Reports** - Interactive analytics and reporting with charts
- **Settings** - System configuration and administration
- **Inventory** - Basic inventory management

### Authentication & Security
- **Login System** - Secure authentication with role-based access
- **Protected Routes** - All routes require authentication
- **Session Management** - Persistent user sessions
- **Role-Based Permissions** - Different access levels for different roles

### Technical Features
- **Responsive Design** - Mobile-friendly interface
- **Interactive Charts** - Data visualization with Recharts
- **Form Management** - Complex multi-step forms
- **State Management** - React Context API
- **TypeScript** - Full type safety
- **Modern UI** - Built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ineserp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## 🔐 Demo Login Credentials

See [DEMO_CREDENTIALS.md](./DEMO_CREDENTIALS.md) for available demo accounts.

Quick access:
- **Admin**: `admin@example.com` / `password`
- **Finance**: `finance@example.com` / `finance123`
- **HR**: `hr@example.com` / `hr123`

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (app)/             # Protected app routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── student-accounts/
│   │   ├── project-accounts/
│   │   ├── payroll/
│   │   ├── procurement/
│   │   ├── fixed-assets/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── inventory/
│   ├── login/             # Login page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page (redirects to login)
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── auth-form.tsx     # Login form
│   ├── app-sidebar.tsx   # Navigation sidebar
│   ├── site-header.tsx   # Header component
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth-context.tsx  # Authentication context
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 UI Components

The system uses shadcn/ui components for consistent design:
- Cards, Tables, Forms
- Dialogs, Dropdowns, Tabs
- Charts, Progress bars
- Buttons, Inputs, Selects
- And many more...

## 📊 Data & State Management

- **Authentication**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts library
- **Mock Data**: Realistic sample data for demonstration
- **Local Storage**: Session persistence

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in `app/(app)/`
2. Add components in `components/`
3. Update navigation in `components/app-sidebar.tsx`
4. Add proper TypeScript types
5. Follow existing patterns for consistency

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
1. Run `npm run build`
2. Deploy the `.next` folder
3. Set up environment variables

## 🔒 Security Considerations

**For Production:**
- Implement proper backend authentication
- Use secure password hashing (bcrypt)
- Add CSRF protection
- Implement rate limiting
- Use HTTPS
- Secure environment variables
- Add input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is for educational/demonstration purposes.

## 🆘 Support

For issues and questions:
1. Check existing issues
2. Create a new issue with detailed description
3. Include steps to reproduce

## 🔄 Updates

The system is actively maintained with regular updates for:
- Security patches
- Feature enhancements
- Bug fixes
- UI improvements

---

**Built with ❤️ for institutional management**
