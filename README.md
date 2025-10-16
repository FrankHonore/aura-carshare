# Aura - Car Sharing Platform

A modern car sharing platform built with Next.js 15, similar to Turo, that connects car owners with renters in local communities.

## Features

- 🚗 **Car Listings**: Browse and search available cars
- 📅 **Booking System**: Schedule and manage car rentals
- 👤 **User Profiles**: Comprehensive user management and profiles
- 🔒 **Authentication**: Secure sign-in with NextAuth.js
- 💳 **Payment Ready**: Integration-ready payment system
- 📱 **Responsive Design**: Mobile-first responsive UI
- ⭐ **Reviews & Ratings**: User feedback system
- 🎯 **Smart Filtering**: Advanced search and filtering options

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Headless UI, Lucide Icons
- **Styling**: Tailwind CSS

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── bookings/          # Booking management
│   ├── cars/              # Car listings and details
│   ├── list-car/          # Car listing form
│   ├── profile/           # User profile
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── lib/                   # Utility functions and configs
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aura-carshare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and update with your values:
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/aura_carshare"
   
   # Next Auth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main models:

- **User**: User accounts and profiles
- **Car**: Vehicle listings with details and features
- **Booking**: Rental reservations and scheduling
- **Review**: User feedback and ratings
- **Account/Session**: NextAuth.js authentication

## Key Features

### Car Listings
- Detailed car information with photos
- Feature lists and specifications
- Owner profiles and ratings
- Location-based search

### Booking System
- Date/time selection
- Pricing calculation
- Booking status management
- Host-guest communication

### User Management
- Profile creation and editing
- Booking history
- Earnings tracking (for hosts)
- Review system

### Search & Filtering
- Location-based search
- Price range filtering
- Car type and feature filters
- Availability calendar

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database commands
npx prisma studio          # Open database browser
npx prisma migrate dev     # Create and apply migrations
npx prisma generate        # Generate Prisma client
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | App URL for authentication | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Real-time messaging between hosts and guests
- [ ] Integration with payment processors (Stripe, PayPal)
- [ ] Mobile app development
- [ ] GPS tracking and smart locks integration
- [ ] Insurance partnership integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## Support

For support and questions, please open an issue in the GitHub repository.
