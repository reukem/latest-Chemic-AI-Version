/**
 * @file opticalProperties.ts
 * @description Advanced optical physics and precipitate morphology engine for Chemic-AI.
 * Implements Beer-Lambert absorption profiles, refractive index (IOR), kinematic viscosity,
 * density for immiscible organic phase separation, and distinct precipitate morphologies.
 */

export type PrecipitateMorphology =
  | 'none'
  | 'curdy'          // AgCl - clumpy white clouds sinking fast
  | 'gelatinous'     // Cu(OH)2, Al(OH)3, Fe(OH)2, Cr(OH)3 - suspended jelly-like volume
  | 'crystalline'    // PbI2 (Golden Rain), CHI3, Picric Acid - sparkling high-specular flakes
  | 'milky_colloid'  // CaCO3, BaSO4, Sulfur (Na2S2O3 + HCl) - Tyndall milky turbidity
  | 'dense_powder'   // Cu2O, Fe(OH)3, MnO2, PbS, CuS - heavy bottom sediment layer
  | 'silver_mirror'  // Tollens Ag - metallic reflective coating on inner glass wall
  | 'carbon_column'; // Sucrose + H2SO4 - rising porous black foam tower

export interface OpticalProfile {
  baseColor: string;
  absorptionColor: string; // Deep core color (Beer-Lambert optical depth)
  transmission: number;    // 0.0 (opaque solid) to 0.96 (crystal clear water/acid)
  ior: number;             // Index of refraction (Water = 1.333, H2SO4 = 1.429, Benzene = 1.501)
  viscosity: number;       // 1.0 = water, 15.0 = conc. H2SO4, 80.0 = Glycerol/Oil
  density: number;         // g/cm³ for immiscible layering (< 0.95 floats on water!)
  isImmiscibleAq: boolean; // True for Hexane, Benzene, Toluene, Ethyl Acetate, Triglyceride
  metalness: number;
  roughness: number;
  morphology: PrecipitateMorphology;
  shimmerIntensity?: number;
}

export function getOpticalProfile(
  chemId: string,
  fallbackHex: string = '#bae6fd',
  category: string = 'solvent',
  reactionClass: string = 'solvent'
): OpticalProfile {
  // 1. Special Masterpiece Overrides
  const overrides: Record<string, Partial<OpticalProfile>> = {
    DISTILLED_WATER: {
      baseColor: '#e0f2fe',
      absorptionColor: '#0284c7',
      transmission: 0.95,
      ior: 1.333,
      viscosity: 1.0,
      density: 1.0,
      morphology: 'none'
    },
    SALT_WATER: {
      baseColor: '#e0f2fe',
      absorptionColor: '#0369a1',
      transmission: 0.94,
      ior: 1.345,
      viscosity: 1.1,
      density: 1.03,
      morphology: 'none'
    },
    H2SO4: {
      baseColor: '#fefce8',
      absorptionColor: '#fde047',
      transmission: 0.88,
      ior: 1.429,
      viscosity: 24.0,
      density: 1.84,
      morphology: 'none'
    },
    HCl: {
      baseColor: '#e0f2fe',
      absorptionColor: '#38bdf8',
      transmission: 0.94,
      ior: 1.342,
      viscosity: 1.2,
      density: 1.18,
      morphology: 'none'
    },
    HNO3: {
      baseColor: '#fefce8',
      absorptionColor: '#fef08a',
      transmission: 0.91,
      ior: 1.397,
      viscosity: 1.8,
      density: 1.41,
      morphology: 'none'
    },
    NaOH: {
      baseColor: '#e0f2fe',
      absorptionColor: '#0284c7',
      transmission: 0.94,
      ior: 1.357,
      viscosity: 1.4,
      density: 1.15,
      morphology: 'none'
    },
    GLYCEROL: {
      baseColor: '#f8fafc',
      absorptionColor: '#cbd5e1',
      transmission: 0.92,
      ior: 1.474,
      viscosity: 95.0,
      density: 1.26,
      morphology: 'none'
    },
    TRIGLYCERIDE: {
      baseColor: '#fde047',
      absorptionColor: '#ca8a04',
      transmission: 0.78,
      ior: 1.468,
      viscosity: 45.0,
      density: 0.91,
      isImmiscibleAq: true,
      morphology: 'none'
    },
    HEXANE: {
      baseColor: '#f8fafc',
      absorptionColor: '#e2e8f0',
      transmission: 0.96,
      ior: 1.375,
      viscosity: 0.3,
      density: 0.66,
      isImmiscibleAq: true,
      morphology: 'none'
    },
    BENZENE: {
      baseColor: '#f8fafc',
      absorptionColor: '#e2e8f0',
      transmission: 0.94,
      ior: 1.501,
      viscosity: 0.65,
      density: 0.88,
      isImmiscibleAq: true,
      morphology: 'none'
    },
    TOLUENE: {
      baseColor: '#f8fafc',
      absorptionColor: '#e2e8f0',
      transmission: 0.94,
      ior: 1.497,
      viscosity: 0.59,
      density: 0.87,
      isImmiscibleAq: true,
      morphology: 'none'
    },
    ETHYL_ACETATE: {
      baseColor: '#f8fafc',
      absorptionColor: '#fef08a',
      transmission: 0.93,
      ior: 1.372,
      viscosity: 0.45,
      density: 0.90,
      isImmiscibleAq: true,
      morphology: 'none'
    },
    CuSO4: {
      baseColor: '#38bdf8',
      absorptionColor: '#1d4ed8',
      transmission: 0.72,
      ior: 1.345,
      viscosity: 1.2,
      density: 1.05,
      morphology: 'none'
    },
    TETRAAMMINE_COPPER: {
      baseColor: '#2563eb',
      absorptionColor: '#1e1b4b',
      transmission: 0.45,
      ior: 1.36,
      viscosity: 1.3,
      density: 1.04,
      morphology: 'none'
    },
    COPPER_POLYOL_COMPLEX: {
      baseColor: '#1d4ed8',
      absorptionColor: '#172554',
      transmission: 0.50,
      ior: 1.38,
      viscosity: 3.5,
      density: 1.08,
      morphology: 'none'
    },
    KMnO4: {
      baseColor: '#a855f7',
      absorptionColor: '#3b0764',
      transmission: 0.28,
      ior: 1.35,
      viscosity: 1.1,
      density: 1.02,
      morphology: 'none'
    },
    FeCl3: {
      baseColor: '#f59e0b',
      absorptionColor: '#78350f',
      transmission: 0.60,
      ior: 1.36,
      viscosity: 1.4,
      density: 1.08,
      morphology: 'none'
    },
    CHROMIUM_CHLORIDE: {
      baseColor: '#10b981',
      absorptionColor: '#064e3b',
      transmission: 0.62,
      ior: 1.35,
      viscosity: 1.2,
      density: 1.06,
      morphology: 'none'
    },
    PINK_BASE: {
      baseColor: '#fb7185',
      absorptionColor: '#be123c',
      transmission: 0.68,
      ior: 1.335,
      viscosity: 1.0,
      density: 1.01,
      morphology: 'none'
    },

    // Precipitates and Solid Morphologies
    SILVER: {
      baseColor: '#f8fafc',
      absorptionColor: '#94a3b8',
      transmission: 0.0,
      metalness: 1.0,
      roughness: 0.04,
      morphology: 'silver_mirror'
    },
    PbI2_PRECIPITATE: {
      baseColor: '#facc15',
      absorptionColor: '#ca8a04',
      transmission: 0.15,
      metalness: 0.85,
      roughness: 0.15,
      morphology: 'crystalline',
      shimmerIntensity: 1.0
    },
    AgCl_PRECIPITATE: {
      baseColor: '#ffffff',
      absorptionColor: '#cbd5e1',
      transmission: 0.1,
      roughness: 0.7,
      morphology: 'curdy'
    },
    CuOH2_PRECIPITATE: {
      baseColor: '#0ea5e9',
      absorptionColor: '#0369a1',
      transmission: 0.25,
      roughness: 0.4,
      morphology: 'gelatinous'
    },
    AlOH3_PRECIPITATE: {
      baseColor: '#f1f5f9',
      absorptionColor: '#94a3b8',
      transmission: 0.35,
      roughness: 0.5,
      morphology: 'gelatinous'
    },
    CaCO3_PRECIPITATE: {
      baseColor: '#ffffff',
      absorptionColor: '#e2e8f0',
      transmission: 0.20,
      roughness: 0.6,
      morphology: 'milky_colloid'
    },
    BaSO4_PRECIPITATE: {
      baseColor: '#ffffff',
      absorptionColor: '#cbd5e1',
      transmission: 0.08,
      roughness: 0.8,
      morphology: 'dense_powder'
    },
    Cu2O_PRECIPITATE: {
      baseColor: '#dc2626',
      absorptionColor: '#7f1d1d',
      transmission: 0.05,
      roughness: 0.75,
      morphology: 'dense_powder'
    },
    MANGANESE_DIOXIDE: {
      baseColor: '#442b21',
      absorptionColor: '#271813',
      transmission: 0.02,
      roughness: 0.85,
      morphology: 'dense_powder'
    },
    CARBON: {
      baseColor: '#18181b',
      absorptionColor: '#09090b',
      transmission: 0.0,
      roughness: 0.92,
      morphology: 'carbon_column'
    }
  };

  if (overrides[chemId]) {
    return {
      baseColor: fallbackHex,
      absorptionColor: fallbackHex,
      transmission: 0.85,
      ior: 1.333,
      viscosity: 1.0,
      density: 1.0,
      isImmiscibleAq: false,
      metalness: 0.0,
      roughness: 0.1,
      morphology: 'none',
      ...overrides[chemId],
    };
  }

  // 2. Smart Rule-Based Defaults:
  // If a liquid was hardcoded to '#f8fafc', '#f1f5f9', '#f0fdf4' or '#bae6fd'
  // make it CRYSTAL CLEAR borosilicate appearance instead of chalky white paint!
  const hexLower = (fallbackHex || '').toLowerCase();
  const isClearLiquid =
    (hexLower === '#f8fafc' ||
     hexLower === '#f1f5f9' ||
     hexLower === '#f0fdf4' ||
     hexLower === '#f0fdfa' ||
     hexLower === '#bae6fd') &&
    reactionClass !== 'precipitate';

  if (isClearLiquid) {
    return {
      baseColor: '#e0f2fe',
      absorptionColor: '#7dd3fc',
      transmission: 0.94, // Crystal clear borosilicate liquid!
      ior: 1.338,
      viscosity: 1.0,
      density: 1.02,
      isImmiscibleAq: false,
      metalness: 0.0,
      roughness: 0.05,
      morphology: 'none',
    };
  }

  if (reactionClass === 'precipitate' || chemId.endsWith('_PRECIPITATE')) {
    return {
      baseColor: hexLower === '#f8fafc' ? '#ffffff' : fallbackHex,
      absorptionColor: '#94a3b8',
      transmission: 0.12,
      ior: 1.5,
      viscosity: 10.0,
      density: 2.2,
      isImmiscibleAq: false,
      metalness: 0.05,
      roughness: 0.6,
      morphology: 'dense_powder',
    };
  }

  return {
    baseColor: fallbackHex,
    absorptionColor: fallbackHex,
    transmission: 0.65,
    ior: 1.35,
    viscosity: 1.2,
    density: 1.05,
    isImmiscibleAq: false,
    metalness: category === 'element' ? 0.85 : 0.0,
    roughness: category === 'element' ? 0.25 : 0.1,
    morphology: 'none',
  };
}
