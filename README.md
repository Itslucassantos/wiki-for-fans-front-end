# Wiki For Fans - Frontend

A modern frontend application to search movies and TV shows, explore details and cast information, and manage favorites.

Built with Next.js App Router, TypeScript, React Query, and Tailwind CSS.

## Features

- Search movies and TV shows from the header search bar
- View your library on the home page
- Auto-rotating hero banners (up to 2 movies + 2 TV shows)
- Open detailed pages for movies and TV shows
- Toggle favorites for movies
- Browse favorites on a dedicated page
- Open cast/character details pages
- Responsive UI for desktop and mobile

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS 4, Lucide icons
- Data Fetching/Cache: @tanstack/react-query
- Forms and Validation: react-hook-form, zod, @hookform/resolvers
- HTTP Client: axios

## Project Structure

```text
src/
	app/
		page.tsx                      # Home page
		favorites/page.tsx            # Favorites page
		details/[type]/[id]/page.tsx # Movie/TV details
		details/[type]/[id]/character/page.tsx # Character details
	components/
		header/
		home-banners/
		library/
		card/
		characters-card/
		container/
	lib/
		api.ts
		library.ts
		library-detail.ts
	providers/
		query-provider.tsx
	types/
```

## Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm, yarn, pnpm, or bun
- A running backend API compatible with the endpoints used by this app

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

`NEXT_PUBLIC_API_URL` is used by `axios` in `src/lib/api.ts` as the base URL for all API requests.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables (`.env.local`).

3. Start the development server:

```bash
npm run dev
```

4. Open the app:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run start`: run production server

## Backend Endpoints Used

The frontend expects endpoints similar to:

- `POST /movie` and `POST /tvshow` for search
- `GET /movie/searchAllMovies`
- `GET /tvshow/searchAllTvShows`
- `GET /movie/searchAllFavorites`
- `GET /tvshow/searchAllFavorites`
- `GET /movie/searchMovieById?id=<id>`
- `GET /tvshow/searchTvShowById?id=<id>`
- `POST /movie/favorite` and `POST /tvshow/favorite`

Adjust these routes in the frontend if your backend uses different naming.

## Images Configuration

External images are configured in `next.config.ts` to allow:

- `https://image.tmdb.org/t/p/**`

## Notes

- React Query is used to invalidate and refresh library/favorites/details after updates.
- Character details currently receive payload through URL query params from the details page.

## License

See `LICENSE`.
