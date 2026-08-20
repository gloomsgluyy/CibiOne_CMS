// Source reference supplied by PIC on 2026-08-18.
// The full source is retained in the task transcript. Its implementation pattern is:
// - responsive grid: sm:grid-cols-2 lg:grid-cols-3;
// - each column has independent stacked images;
// - portrait/landscape ratios vary per image;
// - images are lazy loaded and fade in once in view.
//
// Project adaptation notes:
// - image ratios are stored in local data rather than Math.random(), preventing
//   hydration/layout instability and making dot pagination deterministic;
// - Next/Image supplies lazy loading and intrinsic sizing;
// - the layout is implemented in components/sections/berita/prestasi-gallery.tsx.

export const imageGalleryReference = "ImageGallery component source supplied by PIC.";
