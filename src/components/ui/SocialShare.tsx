'use client';

import { Facebook, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  excerpt: string;
  url: string;
}

export default function SocialShare({ title, excerpt, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} - ${excerpt} Par Maître Laura Baron, avocat spécialisé en dommage corporel.`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <div className="bg-beige p-6 rounded-sm border-l-4 border-or">
      <h3 className="text-lg font-playfair font-semibold text-anthracite mb-4 flex items-center">
        <MessageCircle size={20} className="mr-2 text-or" />
        Partager cet article
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        Partagez cette ressource juridique avec vos proches ou sur vos réseaux professionnels
      </p>
      
      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm transition-colors"
          aria-label="Partager sur Facebook"
        >
          <Facebook size={18} />
          <span className="text-sm font-medium">Facebook</span>
        </a>
        
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-sm transition-colors"
          aria-label="Partager sur Twitter/X"
        >
          <Twitter size={18} />
          <span className="text-sm font-medium">Twitter</span>
        </a>
        
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-sm transition-colors"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin size={18} />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-sm transition-colors"
          aria-label="Copier le lien"
        >
          <Link2 size={18} />
          <span className="text-sm font-medium">
            {copied ? 'Copié !' : 'Copier'}
          </span>
        </button>
      </div>
    </div>
  );
}