import { notFoundContent } from "@/content/not-found";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";

export default function NotFound() {
  return <NotFoundPage content={notFoundContent} />;
}
