import AppHeader from "@/components/layout/AppHeader"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Locale } from "@/lib/i18n/types"

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;
  const dictionary = getDictionary(lang)

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 container pt-8">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{dictionary.game.title}</h1>
          <p className="text-lg mb-8 text-center">{dictionary.game.instructions}</p>
          
          <div className="grid gap-4 w-full max-w-lg">
            <a 
              href={`/${lang}/game`} 
              className="bg-primary text-white py-3 px-8 rounded-md text-center font-medium hover:bg-primary/90 transition-colors"
            >
              {dictionary.game.start}
            </a>
          </div>
        </div>
      </main>
    </div>
  )
} 