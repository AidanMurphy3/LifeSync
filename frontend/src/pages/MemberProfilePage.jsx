 //src/pages/MemberProfile/MemberProfilePage.jsx
import MemberProfile from "@components/MemberProfile.jsx"; 

export default function MemberProfilePage() {
  return (
    <div className="flex justify-center items-center py-10">
      <MemberProfile
        initialName="Member Name"
        initialEmail="member@example.com"
      />
    </div>
  );
}
