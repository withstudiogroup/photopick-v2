import { studios } from "@/data/mock";
import StudioDetailClient from "./StudioDetailClient";

export function generateStaticParams() {
  return studios.map((studio) => ({
    id: studio.id,
  }));
}

export default function StudioDetailPage() {
  return <StudioDetailClient />;
}
