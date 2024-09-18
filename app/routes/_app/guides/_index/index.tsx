import GuideWelcomeMessage from "../GuideWelcomeMessage";

export default function GuideNullPage() {
  return (
    <div className="grid h-full place-items-center">
      <GuideWelcomeMessage className="max-w-sm" />
    </div>
  );
}
