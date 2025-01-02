export interface NewsArticle {
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    source: {
      name: string
    }
  }
  
  export interface NewsResponse {
    articles: NewsArticle[]
    totalResults: number
    status: string
  }
  
  