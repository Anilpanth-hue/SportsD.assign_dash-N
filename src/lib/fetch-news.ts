const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY // Changed to NEXT_PUBLIC for debugging
const API_URL = "https://newsapi.org/v2/top-headlines"

export async function fetchNews() {
  console.log("Fetching news with API key:", API_KEY?.slice(0, 5) + "...") // Debug log

  if (!API_KEY) {
    console.error("NEWS_API_KEY is not defined")
    throw new Error("NEWS_API_KEY is not defined")
  }

  try {
    const url = `${API_URL}?country=in&category=sports&apiKey=${API_KEY}`
    console.log("Fetching from URL:", url) // Debug log

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText) // Debug log
      throw new Error(`Failed to fetch news: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log("API Response:", data) // Debug log

    return {
      status: data.status,
      totalResults: data.totalResults || 0,
      articles: data.articles || []
    }
  } catch (error) {
    console.error('Error fetching news:', error) // Debug log
    return {
      status: "error",
      totalResults: 0,
      articles: []
    }
  }
}

