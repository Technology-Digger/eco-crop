
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/hooks/use-theme";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-800 py-6 transition-colors duration-200">
          <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; 2025 Eco Crop Advisor | Designed by A(n)esthetic Deployers 🌱</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};
