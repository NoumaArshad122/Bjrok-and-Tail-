/**
 * Verified customer reviews for BJÖRK & TALL apothecary formulations.
 */

export const INITIAL_REVIEWS = {
  'nordic-1': [
    {
      id: 'rev-101',
      author: 'Freja Lindqvist',
      location: 'Stockholm, Sweden',
      verified: true,
      rating: 5,
      date: 'October 14, 2026',
      title: 'Transformed my moisture barrier during autumn frost',
      comment: 'Living near the sea winds in Stockholm usually parches my skin by mid-October. This elixir absorbs without any greasiness and leaves a velvet-like shield. The botanical birch aroma is grounding and calming.',
      ritual: 'Applied morning & night under facial cream',
      helpful: 24,
    },
    {
      id: 'rev-102',
      author: 'Kari H.',
      location: 'Tromsø, Norway',
      verified: true,
      rating: 5,
      date: 'September 28, 2026',
      title: 'The chaga quality is unmatched',
      comment: 'As someone who has wild-harvested chaga in the past, I can smell the authenticity of this extraction. The Miron glass bottle keeps it potent even after weeks of use. Worth every crown.',
      ritual: '4 drops blended with botanical oil',
      helpful: 19,
    },
    {
      id: 'rev-103',
      author: 'Elena R.',
      location: 'Copenhagen, Denmark',
      verified: true,
      rating: 4,
      date: 'August 19, 2026',
      title: 'Deeply calming formulation',
      comment: 'Skin feels visibly more resilient after three weeks. The scent is very earthy and medicinal, which I personally enjoy, but may be strong for people used to synthetic fragrances.',
      ritual: 'Nightly restorative ritual',
      helpful: 11,
    },
  ],
  'nordic-2': [
    {
      id: 'rev-201',
      author: 'Magnus Berglund',
      location: 'Kiruna, Sweden',
      verified: true,
      rating: 5,
      date: 'October 2, 2026',
      title: 'Essential for sub-zero wind chills',
      comment: 'Works wonders on windburned cheekbones and dry cuticles. The spruce resin fragrance is authentic and nostalgic. You only need a tiny pea-sized amount.',
      ritual: 'Daily wind barrier protection',
      helpful: 32,
    },
    {
      id: 'rev-202',
      author: 'Sara K.',
      location: 'Helsinki, Finland',
      verified: true,
      rating: 5,
      date: 'September 12, 2026',
      title: 'Real cloudberry gold in a pot',
      comment: 'Golden color and luxurious balm-to-oil texture. Heals chapped lips overnight.',
      ritual: 'Overnight lip & skin treatment',
      helpful: 15,
    },
  ],
  'nordic-3': [
    {
      id: 'rev-301',
      author: 'Linnea S.',
      location: 'Gothenburg, Sweden',
      verified: true,
      rating: 5,
      date: 'October 18, 2026',
      title: 'Unbelievable radiance and omega cushion',
      comment: 'The whole-berry sea buckthorn gives an immediate sun-kissed healthy glow. The texture is non-comedogenic and leaves my complexion rested.',
      ritual: '3 drops after cleansing mist',
      helpful: 28,
    },
  ],
  'nordic-4': [
    {
      id: 'rev-401',
      author: 'Henrik V.',
      location: 'Oslo, Norway',
      verified: true,
      rating: 5,
      date: 'October 5, 2026',
      title: 'Pure cabin forest serenity in a cup',
      comment: 'The aroma of young Scots pine shoots combined with wild chamomile is extraordinary. Unwinds tense shoulders within minutes.',
      ritual: 'Steeped for 8 minutes at sunset',
      helpful: 17,
    },
  ],
};

const REVIEWS_STORAGE_KEY = 'bjork_tall_product_reviews';

export function getProductReviews(productId) {
  try {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return [...(parsed[productId] || []), ...(INITIAL_REVIEWS[productId] || [])];
  } catch {
    return INITIAL_REVIEWS[productId] || [];
  }
}

export function saveProductReview(productId, review) {
  try {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    const existing = parsed[productId] || [];
    parsed[productId] = [review, ...existing];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.warn('Could not persist review to storage', e);
  }
}
