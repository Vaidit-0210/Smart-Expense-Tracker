import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center mt-2">
      <UserProfile routing="hash" />
    </div>
  );
}
