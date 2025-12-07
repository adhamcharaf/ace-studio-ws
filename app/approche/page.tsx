import { redirect } from "next/navigation";

// Redirect old /approche URL to new /le-studio
export default function ApprochePage() {
  redirect("/le-studio");
}
