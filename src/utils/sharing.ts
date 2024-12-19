import html2canvas from 'html2canvas';
import { Post } from '../types';

export const sharePostAsImage = async (post: Post) => {
  const postElement = document.getElementById(`post-${post.id}`);
  if (!postElement) return;

  try {
    const canvas = await html2canvas(postElement);
    const image = canvas.toDataURL('image/png');
    
    // Créer l'URL de partage WhatsApp
    const shareText = encodeURIComponent('Découvert sur GaibrairHub');
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
    
    // Partager l'image
    if (navigator.share) {
      const blob = await (await fetch(image)).blob();
      const file = new File([blob], 'post.png', { type: 'image/png' });
      await navigator.share({
        files: [file],
        title: 'Post from GaibrairHub',
        text: post.content
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API de partage
      window.open(whatsappUrl, '_blank');
    }
  } catch (error) {
    console.error('Erreur lors du partage:', error);
  }
};