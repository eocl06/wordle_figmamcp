import React from 'react';
import { images } from '../assets/images';

export const Header: React.FC = () => {
  const handleShare = async () => {
    const shareData = {
      title: 'Wordle Mix - Bundle Games',
      text: 'Bundle Games\'e yeni oyun: Wordle Mix! Aklındaki 5 harfli kelimeyi gönder, sırası geldiğinde herkes senin kelimeni oynasın!',
      url: window.location.href,
    };

    try {
      // Web Share API'yi dene (mobil cihazlarda çalışır)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: URL'yi clipboard'a kopyala
        await navigator.clipboard.writeText(window.location.href);
        alert('Link kopyalandı!');
      }
    } catch (error) {
      // Kullanıcı paylaşımı iptal etti veya hata oluştu
      if ((error as Error).name !== 'AbortError') {
        // Hata varsa clipboard'a kopyalamayı dene
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link kopyalandı!');
        } catch (clipboardError) {
          console.error('Paylaşım hatası:', error);
        }
      }
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon-wrapper">
            <div className="logo-icon-top"></div>
            <div className="logo-icon-bottom"></div>
          </div>
          <span className="logo-text">WORDLE</span>
          <div className="mix-badges">
            <img src={images.mixBadge1} alt="M" className="badge badge-1" />
            <img src={images.mixBadge2} alt="I" className="badge badge-2" />
            <img src={images.mixBadge3} alt="X" className="badge badge-3" />
          </div>
        </div>
        <button className="share-button" onClick={handleShare}>
          <span>Paylaş</span>
          <div className="share-icon">
            <img src={images.shareArrow} alt="Share" />
          </div>
        </button>
      </div>
    </div>
  );
};

