import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PlasmicStudioPage() {
  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Redirect to Plasmic Studio with the current site as the preview
  redirect(
    `https://studio.plasmic.app/projects/${process.env.PLASMIC_PROJECT_ID}?platform=nextjs&preview-url=${protocol}://${host}`
  );
}
