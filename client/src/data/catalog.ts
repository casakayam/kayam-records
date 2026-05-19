export type PackageItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: 'studio' | 'accommodation';
};

export const PACKAGE_ITEMS: ReadonlyArray<PackageItem> = [
  { id: 'recording_hour', name: 'Recording Hour',     price: 25,  unit: '/hour',           category: 'studio' },
  { id: 'recording_day',  name: 'Recording Day (8h)', price: 180, unit: '/day',             category: 'studio' },
  { id: 'production',     name: 'Music Production',   price: 350, unit: '/track',           category: 'studio' },
  { id: 'mixing',         name: 'Mixing',             price: 180, unit: '/track',           category: 'studio' },
  { id: 'mastering',      name: 'Mastering',          price: 70,  unit: '/track',           category: 'studio' },
  { id: 'rehearsal',      name: 'Rehearsal',          price: 10,  unit: '/hour',            category: 'studio' },
  { id: 'class',          name: 'Production Class',   price: 20,  unit: '/hour',            category: 'studio' },
  { id: 'glamping',       name: 'Glamping',           price: 65,  unit: '/night · 2 pers',  category: 'accommodation' },
  { id: 'private',        name: 'Private Room',       price: 45,  unit: '/night · 2 pers',  category: 'accommodation' },
  { id: 'dorm',           name: 'Dormitory Bed',      price: 22,  unit: '/night',           category: 'accommodation' },
];

// O(1) lookup by id — avoids Array.find() inside hot render paths
export const PACKAGE_BY_ID: ReadonlyMap<string, PackageItem> = new Map(
  PACKAGE_ITEMS.map(i => [i.id, i])
);

export const STUDIO_ITEMS = PACKAGE_ITEMS.filter(i => i.category === 'studio');
export const ACCOM_ITEMS  = PACKAGE_ITEMS.filter(i => i.category === 'accommodation');

export const BUNDLE_DISCOUNT = 0.15;
