import Nav from "@/components/Nav"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"

const Home = async () => {
  const user = await currentUser()
  if(user){
    redirect("/dashboard")
  }
  return (
    <>
    <Nav />
    <section className="w-full min-h-screen py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
    <div className="container px-4 md:px-6 text-center text-primary-foreground">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Ace Your Next Interview</h1>
        <p className="text-lg md:text-xl">
          Prepare with our expert-led mock interviews and get personalized feedback to land your dream job.
        </p>
        <div className="flex justify-center">
          <Link
            href="/sign-in"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
            >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </section>
            </>
  )
}

export default Home