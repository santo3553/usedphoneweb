import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const IPHONE_PHOTOS = [
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1695048065053-cfbb42981ce1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80',
];

export const SAMSUNG_PHOTOS = [
  'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=80',
];

export const PIXEL_PHOTOS = [
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
];

export async function ensureDatabaseSeeded() {
  try {
    const adminCount = await prisma.adminUser.count().catch(() => 0);
    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash('AdminPass123!', 12);
      await prisma.adminUser.create({
        data: {
          email: 'admin@swishphones.com',
          passwordHash,
          fullName: 'Chief Operations Officer',
          role: 'SUPER_ADMIN',
        },
      });
      console.log('[SEED] Auto-seeded default admin: admin@swishphones.com');
    }

    const productCount = await prisma.product.count().catch(() => 0);
    if (productCount === 0) {
      await prisma.product.create({
        data: {
          brand: 'Apple',
          modelName: 'iPhone 15 Pro Max',
          slug: 'iphone-15-pro-max',
          basePrice: 899.0,
          description:
            'Certified refurbished iPhone 15 Pro Max in aerospace-grade titanium. Bench-tested with genuine components and 50-point diagnostic certification.',
          specsJson: JSON.stringify({
            display: '6.7-inch Super Retina XDR OLED, ProMotion 120Hz, 2000 nits',
            chipset: 'Apple A17 Pro (3nm), 6-core CPU, 6-core GPU',
            camera: '48MP Quad-Pixel Main + 12MP 5x Optical Telephoto + 12MP Ultra Wide',
            battery: '4422 mAh, MagSafe 15W wireless charging',
            chassis: 'Grade 5 Aerospace Titanium with Matte Glass Back',
          }),
          imagesJson: JSON.stringify(IPHONE_PHOTOS),
          isFeatured: true,
          inventoryItems: {
            create: [
              {
                imeiOrSerial: '354892110482910',
                storage: '256GB',
                color: 'Natural Titanium',
                conditionGrade: 'PRISTINE',
                batteryHealth: 98,
                salePrice: 899.0,
                stockStatus: 'AVAILABLE',
                inspectionNotes: 'Zero cosmetic marks. 50-point diagnostic certified.',
                imagesJson: JSON.stringify(IPHONE_PHOTOS),
              },
              {
                imeiOrSerial: '354892110482911',
                storage: '512GB',
                color: 'Space Black',
                conditionGrade: 'GOOD',
                batteryHealth: 94,
                salePrice: 949.0,
                stockStatus: 'AVAILABLE',
                inspectionNotes: 'Faint micro-scratch on bottom bevel. Fully tested.',
                imagesJson: JSON.stringify(IPHONE_PHOTOS),
              },
            ],
          },
        },
      });

      await prisma.product.create({
        data: {
          brand: 'Samsung',
          modelName: 'Galaxy S24 Ultra',
          slug: 'galaxy-s24-ultra',
          basePrice: 849.0,
          description:
            'Certified pre-owned Galaxy S24 Ultra featuring integrated S-Pen, titanium armor frame, and quad telephoto zoom system.',
          specsJson: JSON.stringify({
            display: '6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits peak',
            chipset: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
            camera: '200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra Wide',
            battery: '5000 mAh, 45W Fast Charging',
            chassis: 'Titanium Frame with Corning Gorilla Armor Glass',
          }),
          imagesJson: JSON.stringify(SAMSUNG_PHOTOS),
          isFeatured: true,
          inventoryItems: {
            create: [
              {
                imeiOrSerial: '990001234567890',
                storage: '256GB',
                color: 'Titanium Gray',
                conditionGrade: 'PRISTINE',
                batteryHealth: 100,
                salePrice: 849.0,
                stockStatus: 'AVAILABLE',
                inspectionNotes: 'Screen spotless. Grade A+ benchmark tested.',
                imagesJson: JSON.stringify(SAMSUNG_PHOTOS),
              },
            ],
          },
        },
      });

      await prisma.product.create({
        data: {
          brand: 'Google',
          modelName: 'Pixel 8 Pro',
          slug: 'pixel-8-pro',
          basePrice: 599.0,
          description:
            'Google flagship with Tensor G3 chip, pro triple camera array, and all-day intelligent battery.',
          specsJson: JSON.stringify({
            display: '6.7-inch Super Actua LTPO OLED, 120Hz, 2400 nits',
            chipset: 'Google Tensor G3 (4nm) with Titan M2 security coprocessor',
            camera: '50MP Main + 48MP Ultra Wide with Macro + 48MP 5x Telephoto',
            battery: '5050 mAh, 30W Fast Charging',
            chassis: 'Polished aluminum frame with matte rear glass',
          }),
          imagesJson: JSON.stringify(PIXEL_PHOTOS),
          isFeatured: false,
          inventoryItems: {
            create: [
              {
                imeiOrSerial: '353819098231456',
                storage: '128GB',
                color: 'Obsidian Black',
                conditionGrade: 'GOOD',
                batteryHealth: 92,
                salePrice: 599.0,
                stockStatus: 'AVAILABLE',
                inspectionNotes: 'Grade A body. Pure Android 14. 50-point certified.',
                imagesJson: JSON.stringify(PIXEL_PHOTOS),
              },
            ],
          },
        },
      });

      console.log('[SEED] Auto-seeded default products');
    } else {
      // Ensure existing records have photography populated
      const existingProducts = await prisma.product.findMany().catch(() => []);
      for (const p of existingProducts) {
        let photos = IPHONE_PHOTOS;
        if (p.brand === 'Samsung') photos = SAMSUNG_PHOTOS;
        if (p.brand === 'Google') photos = PIXEL_PHOTOS;

        if (!p.imagesJson || p.imagesJson === '[]') {
          await prisma.product
            .update({
              where: { id: p.id },
              data: { imagesJson: JSON.stringify(photos) },
            })
            .catch(() => {});
        }

        await prisma.deviceInventoryItem
          .updateMany({
            where: {
              productId: p.id,
              OR: [{ imagesJson: null }, { imagesJson: '' }, { imagesJson: '[]' }],
            },
            data: { imagesJson: JSON.stringify(photos) },
          })
          .catch(() => {});
      }
    }
  } catch (err) {
    console.error('[SEED] Error ensuring seed data:', err);
  }
}
