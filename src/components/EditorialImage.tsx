import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  caption,
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative w-full h-full overflow-hidden bg-[#0F2350] border border-[#FACC15]/30 rounded-sm">
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          className={className}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0F2350] via-[#1E3A8A] to-[#0A1633]"
        >
          <Compass className="w-10 h-10 text-[#FACC15] mb-3 opacity-85" aria-hidden="true" />
          <p className="font-editorial text-lg text-[#F8FAFC] max-w-md">{alt}</p>
        </div>
      )}
      {caption && (
        <figcaption className="px-4 py-2.5 bg-[#0A1633]/90 text-xs text-[#FDE047] border-t border-[#FACC15]/25">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
