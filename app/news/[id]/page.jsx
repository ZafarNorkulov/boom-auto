import ClientPage from "./page.client";
import api, { fetchNewsData } from "@/lib/api";



// Define the main server-side page component
const ServerPage = async ({ params }) => {
  const { id } = params;

  try {
    const res = await api.get(`/news/${id}`);
    const newsData = res.data; // Ensure this matches your API response structure
    return <ClientPage newsData={newsData} />;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return <div>Error loading news data</div>; // Render a fallback UI
  }
};

export default ServerPage;
