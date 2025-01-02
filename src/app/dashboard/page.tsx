import { Suspense } from "react"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { OverviewCards } from "@/components/overview-cards"
import { ArticlesTable } from "@/components/articles-table"
import { AnalyticsChart } from "@/components/analytics-chart"
import { fetchNews } from "@/lib/fetch-news"
import { Card, CardContent } from "@/components/ui/card"

// Loading component
function LoadingState() {
  return <div className="animate-pulse space-y-4">
    <div className="h-8 w-48 bg-muted rounded"></div>
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="h-32"></CardContent>
        </Card>
      ))}
    </div>
  </div>
}

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  try {
    const newsData = await fetchNews()
    console.log("Dashboard received news data:", newsData) // Debug log

    if (!newsData || !newsData.articles) {
      throw new Error("Invalid news data received")
    }

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome {user.firstName ?? 'back'}
            </h1>
          </div>
          <Suspense fallback={<LoadingState />}>
            <div className="space-y-4">
              <OverviewCards 
                articles={newsData.articles} 
                totalResults={newsData.totalResults} 
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <AnalyticsChart />
                </div>
                <div className="col-span-3">
                  <ArticlesTable articles={newsData.articles} />
                </div>
              </div>
            </div>
          </Suspense>
        </main>
      </div>
    )
  } catch (error) {
    console.error("Dashboard error:", error) // Debug log
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="alert alert-error">
            <p>Error loading dashboard data. Please try again later.</p>
          </div>
        </main>
      </div>
    )
  }
}

