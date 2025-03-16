# Geography Game

## Description

The Geography Game is an interactive web application designed to help users learn about countries, their capitals, and flags through engaging quizzes. Built with Next.js, Supabase, and TailwindCSS, this application provides a seamless user experience with real-time data fetching and dynamic content.

## Features

- **Interactive Quizzes**: Test your knowledge of countries, capitals, and flags.
- **Multilingual Support**: Available in multiple languages, including Bulgarian, English, and Spanish.
- **User Authentication**: Secure login and registration using Supabase.
- **Real-time Data**: Fetch and display user statistics and game scores.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Daooobg/geography-game.git
   cd geography-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Sign up or log in to start playing the geography quizzes.
- Choose a quiz type (countries, capitals, or flags) and test your knowledge.
- Track your scores and statistics in your user profile.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Supabase team for providing an excellent backend solution.
- Special thanks to the open-source community for their contributions and support.
