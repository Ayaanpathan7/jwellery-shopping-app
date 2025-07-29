import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Story
            </h1>
            <div className="space-y-6 text-muted-foreground font-body text-base md:text-lg">
              <p>
                Luna Gems was born from a passion for timeless beauty and a deep respect for the earth. Our founder, a second-generation artisan, envisioned a jewelry line that was not only beautiful but also meaningful—a collection that told a story of care, craftsmanship, and conscious creation.
              </p>
              <p>
                We believe that the most precious items are those made with intention. That's why every piece in our collection is handcrafted in our small studio, where traditional techniques meet modern design. We pour our hearts into every detail, from the initial sketch to the final polish.
              </p>
              <p>
                Our commitment extends to the materials we use. We partner with trusted suppliers who share our values, ensuring that all our metals are recycled and our gemstones are ethically sourced. This dedication allows us to create stunning jewelry that you can wear with pride, knowing it was made with love and respect for both people and the planet.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://placehold.co/800x800"
                alt="Artisan crafting jewelry at a workbench"
                fill
                className="object-cover"
                data-ai-hint="artisan jewelry"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
