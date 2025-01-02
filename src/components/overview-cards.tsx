import { FileText, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsArticle } from "@/types/news"

interface ArticlesOverviewProps {
  articles: NewsArticle[]
  totalResults: number
}

export function OverviewCards({ articles, totalResults }: ArticlesOverviewProps) {
  // Ensure we have valid numbers
  const articleCount = articles?.length || 0
  const totalArticleCount = totalResults || 0
  
  console.log("OverviewCards received:", { articleCount, totalArticleCount }) // Debug log

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArticleCount}</div>
          <div className="text-xs text-muted-foreground">
            +20.1% from last month
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div 
              className="h-1 rounded-full bg-primary" 
              style={{ width: `${Math.min((totalArticleCount / 100) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{articleCount}</div>
          <div className="text-xs text-muted-foreground">
            +12.5% from last month
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div 
              className="h-1 rounded-full bg-primary"
              style={{ width: `${Math.min((articleCount / 100) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,450</div>
          <div className="text-xs text-muted-foreground">
            +8.2% from last month
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[45%] rounded-full bg-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

