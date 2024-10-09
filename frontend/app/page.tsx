// app/hero/page.tsx

import LandingPage from "@/auth/landing-page/page"; // Now this will work

export default function HeroPage() {
  return (
    <div>
      {/* Render the Landing Page component */}
      <LandingPage />
    </div>
  );
}
