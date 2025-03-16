import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold mb-6">Географска Игра</h1>
        <p className="text-xl mb-8">
          Тествайте своите географски познания! Познайте държави по техните контури, знамена или столици и съберете точки.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/login">Влезте в акаунта си</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/play">Играйте като гост</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
