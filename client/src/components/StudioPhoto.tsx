/*
  KAYAM RECORDS — StudioPhoto SVG placeholder
  Moody recording-room scene with warm lighting, mic, guitar, mixing desk
  From archive: studio-photo.jsx
*/

export default function StudioPhoto({ style }: { style?: React.CSSProperties }) {
  return (
    <picture style={{ display: 'block', width: '100%', height: '100%' }}>
      <source
        type="image/webp"
        srcSet="/assets/Rec_Podcast_47a04dba-400w.webp 400w, /assets/Rec_Podcast_47a04dba-800w.webp 800w, /assets/Rec_Podcast_47a04dba.webp 1512w"
        sizes="(max-width: 768px) 100vw, 45vw"
      />
      <img
        src="/assets/Rec_Podcast_47a04dba.jpeg"
        alt="Kayam Records Studio - Recording Room"
        fetchPriority="high"
        width={1512}
        height={2016}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          ...style,
        }}
      />
    </picture>
  );
}
