
# Tirupati Aquarium

A premium modern website for **Tirupati Aquarium**, an aquatic specialist store. This application features a responsive design, product showcase, service listings, and an AI-powered aquatic consultant powered by the Google Gemini API.

## Features

- **Modern UI/UX**: Built with React and Tailwind CSS for a sleek, responsive experience.
- **Product Showcase**: Filterable gallery of freshwater fish, marine life, plants, and accessories.
- **AI Consultant ('AquaBot')**: Integrated with Google Gemini 2.5 Flash to provide real-time advice on fish care, tank maintenance, and disease diagnosis.
- **Service Listings**: Detailed information on custom tank designs and maintenance plans.
- **Testimonials**: Customer success stories.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **AI**: @google/genai (Gemini 2.5 Flash)
- **Fonts**: Google Fonts (Inter & Montserrat)

## Setup

1.  Ensure you have a valid Google Gemini API Key.
2.  The application uses standard ES Modules and React.
3.  The API Key is accessed via `process.env.API_KEY`.

## Project Structure

- `components/`: UI components (Hero, Navbar, ProductShowcase, etc.)
- `services/`: API integration services (Gemini Service)
- `constants.tsx`: Static data for products and testimonials.
- `types.ts`: TypeScript interface definitions.
- `index.tsx`: Application entry point.
