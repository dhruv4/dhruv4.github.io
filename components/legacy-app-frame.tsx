export function LegacyAppFrame({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      className="legacy-app-frame"
      src={src}
      title={title}
      allow="autoplay"
    />
  );
}
