export interface NewsArticle {
    title: string
    description: string | null;
    url: string
    urlToImage: string | null;
    publishedAt: string
    source: {
      name: string
    }
  }
  
  export interface NewsResponse {
    status: string
    totalResults: number
    articles: NewsArticle[]
  }
  
  