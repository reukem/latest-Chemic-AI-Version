/**
 * @file ChemicalRegistry.ts
 * @description The central thermodynamic, physical, and pedagogical data taxonomy for the Chemic-AI Quantum Engine.
 * Defines all authentic chemical substances, optical blending hues, physical states, and stoichiometric reaction pathways.
 */

export type ChemicalType = 'liquid' | 'solid' | 'gas';
export type LocalizedString = { EN: string; VN: string };

export type ChemicalCategory = 
    | 'element' 
    | 'acid' 
    | 'base' 
    | 'salt' 
    | 'organic' 
    | 'indicator' 
    | 'solvent';

export type ReactionClass = 
    | 'alkali_metal' 
    | 'alkaline_earth_metal'
    | 'transition_metal'
    | 'strong_acid' 
    | 'weak_acid'
    | 'strong_base' 
    | 'weak_base'
    | 'salt'
    | 'carbonate'
    | 'transition_metal_salt'
    | 'halogen'
    | 'non_metal'
    | 'alcohol'
    | 'polyol'
    | 'aldehyde'
    | 'ketone'
    | 'carboxylic_acid'
    | 'ester'
    | 'triglyceride'
    | 'carbohydrate'
    | 'amine'
    | 'indicator' 
    | 'solvent'
    | 'inert'
    | 'complex'
    | 'alkyne'
    | 'carbide'
    | 'protein'
    | 'precipitate';

export interface Chemical {
    id: string;
    name: LocalizedString;
    formula: string;
    color: string; 
    type: ChemicalType;
    category: ChemicalCategory;
    reactionClass: ReactionClass;
    ph: number;
    description: LocalizedString;
    isOrganic: boolean;
    stateOfMatter?: 'solid' | 'liquid' | 'gas' | 'aqueous';
    hazardTypes?: Array<'flammable' | 'corrosive' | 'toxic' | 'explosive' | 'oxidizer' | 'irritant'>;
    molarMass?: number;
}

export interface ReactionRule {
    reactants: [string, string];
    product: string;
    products?: string[];
    productColor?: string;
    minTemperature?: number;
    maxTemperature?: number;
    equation?: { EN: string; VN: string };
    reactionType?: { EN: string; VN: string };
    mechanism?: { EN: string; VN: string };
    message: LocalizedString;
    effect?: 'bubbles' | 'smoke' | 'fire' | 'explosion' | 'precipitate' | 'fizz' | 'color_shift';
    temperatureSpike?: number;
    requiresPopup?: boolean;
    orderMatters?: boolean;
    precipitateColor?: string;
    hazardLevel?: 'SAFE' | 'WARNING' | 'DANGER' | 'CRITICAL';
}

/**
 * Massive, scientifically authenticated Chemical Registry for Chemic-AI.
 * Covers foundational Grade 10-12, Advanced Placement (AP), and University Inorganic & Organic Chemistry.
 */
export const CHEMICAL_REGISTRY: Record<string, Chemical> = {
    // ==========================================
    // 1. SOLVENTS
    // ==========================================
    'DISTILLED_WATER': {
        id: 'DISTILLED_WATER',
        name: { EN: 'Distilled Water', VN: 'Nước Cất' },
        formula: 'H₂O',
        color: '#bae6fd',
        type: 'liquid',
        category: 'solvent',
        reactionClass: 'solvent',
        ph: 7.0,
        description: { EN: 'High-purity deionized water. The universal polar solvent for chemical reactions.', VN: 'Nước cất tinh khiết khử ion. Dung môi phân cực phổ biến cho các phản ứng hóa học.' },
        isOrganic: false,
        stateOfMatter: 'liquid',
        molarMass: 18.015
    },
    'HEXANE': {
        id: 'HEXANE',
        name: { EN: 'Hexane', VN: 'Hexan' },
        formula: 'C₆H₁₄',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'solvent',
        ph: 7.0,
        description: { EN: 'Non-polar hydrocarbon solvent.', VN: 'Dung môi hydrocacbon không phân cực.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 86.18
    },

    // ==========================================
    // 2. METALS & ELEMENTS (Alkali, Alkaline Earth, Transition)
    // ==========================================
    'LITHIUM': {
        id: 'LITHIUM',
        name: { EN: 'Lithium Metal', VN: 'Kim loại Liti' },
        formula: 'Li',
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Lightest alkali metal. Floats on water and reacts steadily, generating hydrogen gas and LiOH.', VN: 'Kim loại kiềm nhẹ nhất. Nổi trên nước và phản ứng đều đặn sinh khí hydro và LiOH.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable', 'corrosive'],
        molarMass: 6.94
    },
    'SODIUM': {
        id: 'SODIUM',
        name: { EN: 'Sodium Metal', VN: 'Kim loại Natri' },
        formula: 'Na',
        color: '#cbd5e1',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Soft silvery alkali metal. Melts into a skittering molten sphere on water and burns with an incandescent golden flame (589 nm).', VN: 'Kim loại kiềm mềm màu trắng bạc. Nóng chảy thành viên tròn chạy trên mặt nước và cháy với ngọn lửa vàng đặc trưng (589 nm).' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 22.99
    },
    'POTASSIUM': {
        id: 'POTASSIUM',
        name: { EN: 'Potassium Metal', VN: 'Kim loại Kali' },
        formula: 'K',
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Hyper-reactive alkali metal. Ignites spontaneously upon water contact with a brilliant lilac flame (766 nm).', VN: 'Kim loại kiềm hoạt động cực mạnh. Tự bốc cháy khi tiếp xúc với nước bằng ngọn lửa màu tím tráng lệ (766 nm).' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 39.10
    },
    'RUBIDIUM': {
        id: 'RUBIDIUM',
        name: { EN: 'Rubidium Metal', VN: 'Kim loại Rubidi' },
        formula: 'Rb',
        color: '#9ca3af',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Violently reactive. Sinks and explodes in water.', VN: 'Phản ứng dữ dội. Chìm và phát nổ trong nước.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 85.47
    },
    'CESIUM': {
        id: 'CESIUM',
        name: { EN: 'Cesium Metal', VN: 'Kim loại Xesi' },
        formula: 'Cs',
        color: '#d1d5db',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Most reactive alkali metal. Shatters glass containers in water.', VN: 'Kim loại kiềm phản ứng mạnh nhất. Làm vỡ bình thủy tinh khi gặp nước.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 132.91
    },
    'FRANCIUM': {
        id: 'FRANCIUM',
        name: { EN: 'Francium Metal', VN: 'Kim loại Franxi' },
        formula: 'Fr',
        color: '#64748b',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Extremely radioactive and hyper-reactive alkali metal.', VN: 'Kim loại kiềm cực kỳ phóng xạ và hoạt động mãnh liệt.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 223
    },
    'MAGNESIUM': {
        id: 'MAGNESIUM',
        name: { EN: 'Magnesium Ribbon', VN: 'Kim loại Magie' },
        formula: 'Mg',
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7.0,
        description: { EN: 'Shiny silvery-white alkaline earth metal. Burns with a blinding white light and reacts rapidly with acids.', VN: 'Kim loại kiềm thổ màu trắng bạc. Cháy với ánh sáng trắng chói lòa và phản ứng nhanh với axit.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable'],
        molarMass: 24.305
    },
    'CALCIUM': {
        id: 'CALCIUM',
        name: { EN: 'Calcium Metal', VN: 'Kim loại Canxi' },
        formula: 'Ca',
        color: '#d1d5db',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7.0,
        description: { EN: 'Reactive alkaline earth metal. Sinks in water and produces vigorous effervescence of hydrogen gas and Ca(OH)₂.', VN: 'Kim loại kiềm thổ hoạt động. Chìm trong nước và sủi bọt mạnh khí hydro và vôi tôi Ca(OH)₂.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable', 'corrosive'],
        molarMass: 40.08
    },
    'BARIUM': {
        id: 'BARIUM',
        name: { EN: 'Barium Metal', VN: 'Kim loại Bari' },
        formula: 'Ba',
        color: '#9ca3af',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7.0,
        description: { EN: 'Heavy reactive alkaline earth metal. Produces apple-green flame and insoluble sulfates.', VN: 'Kim loại kiềm thổ nặng. Cho ngọn lửa màu xanh lục táo và tạo kết tủa sunfat không tan.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['toxic', 'flammable'],
        molarMass: 137.33
    },
    'IRON': {
        id: 'IRON',
        name: { EN: 'Iron Powder / Shavings', VN: 'Bột Sắt' },
        formula: 'Fe',
        color: '#64748b',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Transition metal with multiple oxidation states (+2, +3). Reacts with dilute acids to give green Fe²⁺ solutions.', VN: 'Kim loại chuyển tiếp có nhiều số oxi hóa (+2, +3). Tác dụng với axit loãng tạo dung dịch Fe²⁺ màu xanh lục nhạt.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 55.845
    },
    'COPPER': {
        id: 'COPPER',
        name: { EN: 'Copper Metal', VN: 'Kim loại Đồng' },
        formula: 'Cu',
        color: '#f97316',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Reddish-orange transition metal. Unreactive with non-oxidizing acids, but reacts vigorously with concentrated nitric acid (HNO₃).', VN: 'Kim loại chuyển tiếp màu đỏ cam. Không tan trong axit thường, nhưng tan mạnh trong HNO₃ đặc tạo khí NO₂ màu nâu đỏ.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 63.546
    },
    'ZINC': {
        id: 'ZINC',
        name: { EN: 'Zinc Granules', VN: 'Kẽm Hạt' },
        formula: 'Zn',
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Amphoteric transition metal. Standard reagent for generating hydrogen gas with acids in laboratory settings.', VN: 'Kim loại lưỡng tính. Hóa chất tiêu chuẩn để điều chế khí hydro trong phòng thí nghiệm.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 65.38
    },
    'ALUMINUM': {
        id: 'ALUMINUM',
        name: { EN: 'Aluminum Foil / Powder', VN: 'Nhôm Lá / Bột' },
        formula: 'Al',
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Lightweight amphoteric metal. Reacts with both strong acids and strong alkalis with passive oxide layer removal.', VN: 'Kim loại lưỡng tính nhẹ. Phản ứng được với cả axit mạnh lẫn bazơ kiềm mạnh sinh khí hydro.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 26.98
    },
    'SILVER': {
        id: 'SILVER',
        name: { EN: 'Silver Mirror Film', VN: 'Bạc Kim Loại' },
        formula: 'Ag',
        color: '#f1f5f9',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Precious transition metal with the highest electrical and optical reflectivity. Forms silver mirror coatings in Tollens test.', VN: 'Kim loại quý có độ phản xạ quang học cao nhất. Tạo thành lớp gương sáng bóng trong phản ứng tráng bạc.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 107.87
    },
    'IODINE': {
        id: 'IODINE',
        name: { EN: 'Iodine Crystals', VN: 'Tinh thể Iot' },
        formula: 'I₂',
        color: '#4c1d95',
        type: 'solid',
        category: 'element',
        reactionClass: 'halogen',
        ph: 7.0,
        description: { EN: 'Dark purple/black lustrous solid. Sublimes into violet vapor.', VN: 'Chất rắn màu tím sẫm/đen lấp lánh. Thăng hoa thành hơi màu tím.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 253.808
    },
    'CARBON': {
        id: 'CARBON',
        name: { EN: 'Carbon (Graphite)', VN: 'Cacbon (Than chì)' },
        formula: 'C',
        color: '#334155',
        type: 'solid',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7.0,
        description: { EN: 'Black, conductive solid. Highly unreactive at room temperature.', VN: 'Chất rắn màu đen, dẫn điện. Rất kém phản ứng ở nhiệt độ phòng.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 12.011
    },
    'ENTROPY_SLUDGE': {
        id: 'ENTROPY_SLUDGE',
        name: { EN: 'Thermodynamic Sludge', VN: 'Bùn Hỗn Mang' },
        formula: '???',
        color: '#4a3b32',
        type: 'liquid',
        category: 'solvent',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'A permanent thermodynamic death state of chaotic chemical collapse. Inert.', VN: 'Trạng thái sụp đổ hóa học vĩnh viễn. Hoàn toàn trơ.' },
        isOrganic: false
    },

    // ==========================================
    // 3. INORGANIC ACIDS
    // ==========================================
    'HCl': {
        id: 'HCl',
        name: { EN: 'Hydrochloric Acid (1M)', VN: 'Axit Clohiđric (1M)' },
        formula: 'HCl',
        color: '#e0f2fe',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: 1.0,
        description: { EN: 'Strong monoprotic mineral acid. Completely dissociates into H⁺ and Cl⁻ ions.', VN: 'Axit vô cơ mạnh đơn chức. Phân ly hoàn toàn thành các ion H⁺ và Cl⁻.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive', 'irritant'],
        molarMass: 36.46
    },
    'H2SO4': {
        id: 'H2SO4',
        name: { EN: 'Sulfuric Acid (Concentrated)', VN: 'Axit Sunfuric (Đặc)' },
        formula: 'H₂SO₄',
        color: '#f8fafc',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: 0.1,
        description: { EN: 'Dense, oily, strongly dehydrating diprotic acid. Highly exothermic upon water dilution (always add acid to water!).', VN: 'Axit vô cơ hai chức đậm đặc, có tính háo nước cực mạnh. Tỏa nhiệt dữ dội khi pha loãng với nước (luôn rót axit vào nước!).' },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ['corrosive', 'toxic'],
        molarMass: 98.079
    },
    'HNO3': {
        id: 'HNO3',
        name: { EN: 'Nitric Acid (Concentrated)', VN: 'Axit Nitric (Đặc)' },
        formula: 'HNO₃',
        color: '#fef08a',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: 0.5,
        description: { EN: 'Powerful oxidizing mineral acid. Dissolves copper and gives off reddish-brown NO₂ gas.', VN: 'Axit vô cơ có tính oxi hóa cực mạnh. Hòa tan đồng kim loại và giải phóng khí NO₂ màu nâu đỏ độc hại.' },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ['corrosive', 'oxidizer', 'toxic'],
        molarMass: 63.01
    },
    'H3PO4': {
        id: 'H3PO4',
        name: { EN: 'Phosphoric Acid', VN: 'Axit Photphoric' },
        formula: 'H₃PO₄',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'weak_acid',
        ph: 2.2,
        description: { EN: 'Triprotic mineral acid of moderate strength. Used in rust conversion and biochemical phosphorylation.', VN: 'Axit ba chức có độ mạnh trung bình. Dùng trong tẩy gỉ sắt và hóa sinh.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 97.994
    },

    // ==========================================
    // 4. BASES & ALKALIS
    // ==========================================
    'NaOH': {
        id: 'NaOH',
        name: { EN: 'Sodium Hydroxide (1M)', VN: 'Natri Hydroxit (1M)' },
        formula: 'NaOH',
        color: '#f0fdf4',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 14.0,
        description: { EN: 'Caustic soda. Strong alkali that completely dissociates into Na⁺ and OH⁻. Essential for saponification and precipitation.', VN: 'Xút ăn da. Bazơ kiềm mạnh phân ly hoàn toàn thành Na⁺ và OH⁻. Dùng trong xà phòng hóa và kết tủa ion kim loại.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive'],
        molarMass: 39.997
    },
    'KOH': {
        id: 'KOH',
        name: { EN: 'Potassium Hydroxide (1M)', VN: 'Kali Hydroxit (1M)' },
        formula: 'KOH',
        color: '#f0fdf4',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 14.0,
        description: { EN: 'Caustic potash. Extremely hygroscopic strong alkali used for manufacturing liquid soaps and organic hydrolysis.', VN: 'Bazơ kiềm mạnh có tính hút ẩm cao, dùng trong sản xuất xà phòng lỏng và thủy phân este.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive'],
        molarMass: 56.11
    },
    'CaOH2': {
        id: 'CaOH2',
        name: { EN: 'Limewater / Calcium Hydroxide', VN: 'Nước Vôi Trong Ca(OH)₂' },
        formula: 'Ca(OH)₂',
        color: '#f8fafc',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 12.4,
        description: { EN: 'Clear limewater solution. Turns milky white in the presence of carbon dioxide (CO₂) due to CaCO₃ precipitate formation.', VN: 'Nước vôi trong suốt. Vẩn đục trắng khi sục khí CO₂ do tạo kết tủa Canxi Cacbonat (CaCO₃).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 74.093
    },
    'BaOH2': {
        id: 'BaOH2',
        name: { EN: 'Barium Hydroxide Solution', VN: 'Dung dịch Bari Hydroxit' },
        formula: 'Ba(OH)₂',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 13.5,
        description: { EN: 'Strong soluble alkaline solution. Excellent reagent for quantitative sulfate precipitation.', VN: 'Dung dịch bazơ kiềm mạnh. Thuốc thử hoàn hảo để nhận biết và kết tủa ion sunfat SO₄²⁻.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive', 'toxic'],
        molarMass: 171.34
    },
    'NH3_AQ': {
        id: 'NH3_AQ',
        name: { EN: 'Ammonia Solution (NH₄OH / Aqueous Ammonia)', VN: 'Dung dịch Amoniac (NH₄OH)' },
        formula: 'NH₃ (aq)',
        color: '#f0fdfa',
        type: 'liquid',
        category: 'base',
        reactionClass: 'weak_base',
        ph: 11.2,
        description: { EN: 'Pungent weak base with strong complexing ability. Dissolves AgCl and Cu(OH)₂ forming deep blue ammine complexes.', VN: 'Dung dịch bazơ yếu mùi khai có khả năng tạo phức mạnh. Hòa tan Cu(OH)₂ tạo phức chất amoniac màu xanh thẫm.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['irritant', 'toxic'],
        molarMass: 35.05
    },

    // ==========================================
    // 5. SALTS & SOLUTIONS
    // ==========================================
    'NaCl': {
        id: 'NaCl',
        name: { EN: 'Sodium Chloride (Brine)', VN: 'Natri Clorua (Nước Muối)' },
        formula: 'NaCl',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Standard table salt solution. Neutral electrolyte yielding white AgCl precipitate with silver nitrate.', VN: 'Dung dịch muối ăn trung tính. Cho kết tủa trắng AgCl khi tác dụng với Bạc Nitrat.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 58.44
    },
    'Na2CO3': {
        id: 'Na2CO3',
        name: { EN: 'Sodium Carbonate (Soda Ash)', VN: 'Natri Cacbonat (Soda)' },
        formula: 'Na₂CO₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'carbonate',
        ph: 11.6,
        description: { EN: 'Alkaline carbonate salt. Effervesces vigorously with acids to liberate CO₂ gas.', VN: 'Muối cacbonat có tính kiềm. Sủi bọt dữ dội giải phóng khí CO₂ khi gặp axit.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 105.99
    },
    'NaHCO3': {
        id: 'NaHCO3',
        name: { EN: 'Sodium Bicarbonate (Baking Soda)', VN: 'Natri Bicacbonat (Baking Soda)' },
        formula: 'NaHCO₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'carbonate',
        ph: 8.3,
        description: { EN: 'Mildly alkaline amphiprotic bicarbonate salt. Readily releases CO₂ bubbles upon reaction with vinegar / acetic acid.', VN: 'Muối bicacbonat lưỡng tính. Phản ứng sủi bọt CO₂ nhanh chóng với giấm ăn (axit axetic).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 84.007
    },
    'SODIUM_ACETATE': {
        id: 'SODIUM_ACETATE',
        name: { EN: 'Sodium Acetate Solution', VN: 'Dung dịch Natri Axetat' },
        formula: 'CH₃COONa',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 8.9,
        description: { EN: 'Organic salt formed from acetic acid neutralization or sodium reaction with vinegar. Hydrolyzes to give a mildly basic solution.', VN: 'Muối hữu cơ sinh ra từ phản ứng trung hòa axit axetic hoặc natri tác dụng với giấm. Thủy phân cho môi trường kiềm yếu.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 82.03
    },
    'CuSO4': {
        id: 'CuSO4',
        name: { EN: 'Copper(II) Sulfate (0.5M)', VN: 'Đồng(II) Sunfat (0.5M)' },
        formula: 'CuSO₄',
        color: '#3b82f6',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 4.5,
        description: { EN: 'Brilliant azure blue solution of hydrated Cu²⁺ ions. Forms Cu(OH)₂ blue precipitate with alkalis.', VN: 'Dung dịch màu xanh lam tuyệt đẹp của ion Cu²⁺. Tạo kết tủa xanh lam Cu(OH)₂ khi tác dụng với dung dịch kiềm.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 159.609
    },
    'FeCl3': {
        id: 'FeCl3',
        name: { EN: 'Iron(III) Chloride (0.5M)', VN: 'Sắt(III) Clorua (0.5M)' },
        formula: 'FeCl₃',
        color: '#d97706',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 2.0,
        description: { EN: 'Yellowish-brown solution of Fe³⁺ ions. Produces reddish-brown Fe(OH)₃ precipitate and purple phenol complexes.', VN: 'Dung dịch màu vàng nâu của ion Fe³⁺. Tạo kết tủa nâu đỏ Fe(OH)₃ với kiềm và tạo phức màu tím đặc trưng với phenol.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 162.20
    },
    'CoCl2': {
        id: 'CoCl2',
        name: { EN: 'Cobalt(II) Chloride (0.5M)', VN: 'Coban(II) Clorua (0.5M)' },
        formula: 'CoCl₂',
        color: '#f43f5e',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 5.0,
        description: { EN: 'Rose-pink aqueous solution of hydrated [Co(H₂O)₆]²⁺ ions.', VN: 'Dung dịch màu hồng cánh sen của ion phức [Co(H₂O)₆]²⁺.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 129.84
    },
    'NiSO4': {
        id: 'NiSO4',
        name: { EN: 'Nickel(II) Sulfate (0.5M)', VN: 'Niken(II) Sunfat (0.5M)' },
        formula: 'NiSO₄',
        color: '#10b981',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 5.5,
        description: { EN: 'Vibrant emerald green solution of Ni²⁺ ions.', VN: 'Dung dịch màu xanh lục ngọc bích của ion Ni²⁺.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 154.75
    },
    'AgNO3': {
        id: 'AgNO3',
        name: { EN: 'Silver Nitrate (0.1M)', VN: 'Bạc Nitrat (0.1M)' },
        formula: 'AgNO₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 6.0,
        description: { EN: 'Colorless silver salt solution. Standard analytical test for halide ions (Cl⁻, Br⁻, I⁻) forming distinct precipitates.', VN: 'Dung dịch muối bạc trong suốt. Thuốc thử phân tích kinh điển nhận biết các ion halogenua (Cl⁻, Br⁻, I⁻).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive', 'oxidizer'],
        molarMass: 169.87
    },
    'BaCl2': {
        id: 'BaCl2',
        name: { EN: 'Barium Chloride (0.2M)', VN: 'Bari Clorua (0.2M)' },
        formula: 'BaCl₂',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Colorless barium salt solution. Specifically detects sulfate ions (SO₄²⁻) by instantly forming insoluble white BaSO₄.', VN: 'Dung dịch muối bari trong suốt. Dùng đặc hiệu để nhận biết ion sunfat (SO₄²⁻) tạo kết tủa trắng BaSO₄ không tan trong axit.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['toxic'],
        molarMass: 208.23
    },
    'KI': {
        id: 'KI',
        name: { EN: 'Potassium Iodide Solution', VN: 'Kali Iodua (KI)' },
        formula: 'KI',
        color: '#fef3c7',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Iodide salt solution. Forms yellow PbI₂ precipitate with lead and dissolves elemental iodine to prepare Lugol reagent.', VN: 'Dung dịch muối iodua. Tạo kết tủa vàng tươi với chì và hòa tan iot để tạo dung dịch Lugol.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 166.00
    },
    'KMnO4': {
        id: 'KMnO4',
        name: { EN: 'Potassium Permanganate (0.05M)', VN: 'Thuốc Tím (KMnO₄)' },
        formula: 'KMnO₄',
        color: '#7e22ce',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 7.0,
        description: { EN: 'Intense violet-purple solution of MnO₄⁻. Classic oxidizing agent that decolorizes in acidic redox reactions with alkenes/Fe²⁺.', VN: 'Dung dịch màu tím đậm đặc trưng của ion MnO₄⁻. Chất oxi hóa mạnh bị mất màu tím trong môi trường axit khi gặp anken hoặc Fe²⁺.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['oxidizer'],
        molarMass: 158.034
    },

    'CaC2': {
        id: 'CaC2',
        name: { EN: 'Calcium Carbide', VN: 'Canxi Cacbua (Đất Đèn)' },
        formula: 'CaC₂',
        color: '#57534e',
        type: 'solid',
        category: 'salt',
        reactionClass: 'carbide',
        ph: 12.0,
        description: { EN: 'Grey rock carbide solid. Reacts violently and exothermically with water to produce acetylene gas (C₂H₂) and slaked lime.', VN: 'Khoáng chất đất đèn màu xám tro. Phản ứng mãnh liệt với nước tỏa nhiều nhiệt, sủi bọt giải phóng khí axetilen (C₂H₂) và tạo vôi tôi Ca(OH)₂.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable', 'corrosive'],
        molarMass: 64.10
    },

    // ==========================================
    // 6. ORGANIC COMPOUNDS (Alcohols, Acids, Esters, Fats, Sugars)
    // ==========================================
    'ETHANOL': {
        id: 'ETHANOL',
        name: { EN: 'Ethanol (Ethyl Alcohol 96%)', VN: 'Cồn Etylic / Rượu Etylic' },
        formula: 'C₂H₅OH',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'alcohol',
        ph: 7.0,
        description: { EN: 'Volatile, flammable primary alcohol. Reacts with sodium to form ethoxide and esterifies with acetic acid to give ethyl acetate.', VN: 'Ancol no đơn chức dễ cháy. Tác dụng với natri giải phóng H₂ và este hóa với axit axetic tạo etyl axetat có mùi thơm trái cây.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable'],
        molarMass: 46.07
    },
    'METHANOL': {
        id: 'METHANOL',
        name: { EN: 'Methanol (Methyl Alcohol)', VN: 'Rượu Metylic (Methanol)' },
        formula: 'CH₃OH',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'alcohol',
        ph: 7.0,
        description: { EN: 'Simplest alcohol. Highly toxic solvent that burns with a clean, almost invisible pale blue flame.', VN: 'Ancol đơn giản nhất. Dung môi hữu cơ độc hại, cháy với ngọn lửa màu xanh nhạt.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable', 'toxic'],
        molarMass: 32.04
    },
    'GLYCEROL': {
        id: 'GLYCEROL',
        name: { EN: 'Glycerol (Glycerin / Propane-1,2,3-triol)', VN: 'Glixerol / Glixerin' },
        formula: 'C₃H₅(OH)₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'polyol',
        ph: 7.0,
        description: { EN: 'Viscous, sweet polyalcohol with 3 adjacent -OH groups. Dissolves Cu(OH)₂ to form a signature deep sapphire blue complex.', VN: 'Ancol đa chức có 3 nhóm -OH liền kề. Hòa tan kết tủa Cu(OH)₂ tạo phức chất màu xanh lam thẫm (xanh thẫm đặc trưng của polyancol).' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 92.09
    },
    'PHENOL': {
        id: 'PHENOL',
        name: { EN: 'Phenol Solution', VN: 'Dung dịch Phenol' },
        formula: 'C₆H₅OH',
        color: '#fdf4ff',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'weak_acid',
        ph: 5.5,
        description: { EN: 'Aromatic hydroxy compound with weak acidic character. Reacts with NaOH and gives deep purple complex with FeCl₃.', VN: 'Hợp chất thơm có nhóm -OH đính trực tiếp vào vòng benzen. Phản ứng với NaOH và cho màu tím tím đậm đặc trưng với FeCl₃.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['toxic', 'corrosive'],
        molarMass: 94.11
    },
    'ACETIC_ACID': {
        id: 'ACETIC_ACID',
        name: { EN: 'Acetic Acid (Vinegar / Ethanoic Acid)', VN: 'Axit Axetic (Giấm Ăn)' },
        formula: 'CH₃COOH',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carboxylic_acid',
        ph: 2.8,
        description: { EN: 'Pungent weak carboxylic acid. Reacts with sodium to form sodium acetate + H₂ gas, and reacts with alcohols to form fragrant esters.', VN: 'Axit cacboxylic đơn chức có mùi chua giấm. Tác dụng với natri tạo natri axetat + khí H₂, và este hóa với rượu tạo este mùi thơm.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 60.052
    },
    'FORMIC_ACID': {
        id: 'FORMIC_ACID',
        name: { EN: 'Formic Acid (Methanoic Acid)', VN: 'Axit Fomic (HCOOH)' },
        formula: 'HCOOH',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carboxylic_acid',
        ph: 2.3,
        description: { EN: 'Simplest carboxylic acid containing an aldehyde group (-CHO). Uniquely undergoes the silver mirror reaction with Tollens reagent.', VN: 'Axit cacboxylic đơn giản nhất vừa có tính axit vừa có nhóm chức andehit (-CHO). Tham gia được phản ứng tráng bạc với thuốc thử Tollens.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['corrosive', 'toxic'],
        molarMass: 46.03
    },
    'TRIGLYCERIDE': {
        id: 'TRIGLYCERIDE',
        name: { EN: 'Vegetable Oil (Triglycerides / Triolein)', VN: 'Dầu Thực Vật (Chất Béo / Triolein)' },
        formula: '(C₁₇H₃₃COO)₃C₃H₅',
        color: '#fef08a',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'triglyceride',
        ph: 7.0,
        description: { EN: 'Lipid / triester of glycerol and fatty acids. Hydrolyzes in hot sodium hydroxide (saponification) to synthesize glycerol and soap.', VN: 'Chất béo hữu cơ (este của glixerol và axit béo). Khi đun nóng với dung dịch kiềm NaOH (phản ứng xà phòng hóa) tạo ra glixerol và muối xà phòng.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 885.4
    },
    'ETHYL_ACETATE': {
        id: 'ETHYL_ACETATE',
        name: { EN: 'Ethyl Acetate (Ester)', VN: 'Etyl Axetat (Este)' },
        formula: 'CH₃COOC₂H₅',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'ester',
        ph: 7.0,
        description: { EN: 'Fragrant sweet-smelling ester synthesized from acetic acid and ethanol. Immiscible with water, forming an upper organic layer.', VN: 'Este có mùi thơm ngọt của hoa quả, sinh ra từ phản ứng este hóa giữa axit axetic và ancol etylic. Nhẹ hơn nước và ít tan trong nước.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable'],
        molarMass: 88.11
    },
    'SOAP': {
        id: 'SOAP',
        name: { EN: 'Soap Solution (Sodium Oleate / Stearate)', VN: 'Xà Phòng Hóa (Muối Natri Axit Béo)' },
        formula: 'C₁₇H₃₃COONa',
        color: '#fefce8',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 9.5,
        description: { EN: 'Amphiphilic fatty acid salt produced by saponification. Forms cleansing micelles with hydrophobic hydrocarbon tails and hydrophilic ionic heads.', VN: 'Muối natri của axit béo sinh ra từ phản ứng xà phòng hóa. Phân tử lưỡng cực tạo hạt mixen giúp tẩy rửa dầu mỡ hiệu quả.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 304.44
    },
    'GLUCOSE': {
        id: 'GLUCOSE',
        name: { EN: 'Glucose Solution (0.5M)', VN: 'Dung dịch Glucozơ (Đường Đơn)' },
        formula: 'C₆H₁₂O₆',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carbohydrate',
        ph: 7.0,
        description: { EN: 'Aldohexose monosaccharide with 5 adjacent -OH groups and 1 aldehyde group. Reduces Tollens reagent to form a shining silver mirror.', VN: 'Đường đơn aldohexozơ có 5 nhóm -OH liền kề và 1 nhóm andehit (-CHO). Khử thuốc thử Tollens tạo lớp gương bạc sáng loáng.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 180.16
    },
    'ACETALDEHYDE': {
        id: 'ACETALDEHYDE',
        name: { EN: 'Acetaldehyde (Ethanal)', VN: 'Andehit Axetic (Axetanđehit)' },
        formula: 'CH₃CHO',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'aldehyde',
        ph: 7.0,
        description: { EN: 'Pungent volatile aldehyde. Undergoes nucleophilic oxidation in the Tollens test to form metallic silver precipitate.', VN: 'Andehit no đơn chức bay hơi. Tham gia phản ứng tráng bạc với thuốc thử Tollens tạo kết tủa bạc kim loại Ag.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable', 'toxic'],
        molarMass: 44.05
    },

    'STARCH': {
        id: 'STARCH',
        name: { EN: 'Starch Solution (Amylase)', VN: 'Hồ Tinh Bột ((C₆H₁₀O₅)ₙ)' },
        formula: '(C₆H₁₀O₅)ₙ',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carbohydrate',
        ph: 7.0,
        description: { EN: 'High-molecular polysaccharide composed of amylose and amylopectin. Forms a vibrant blue-black inclusion complex with iodine.', VN: 'Polisaccarit phân tử lớn gồm amilozơ và amilopectin. Tạo phức chất hấp phụ màu xanh tím đặc trưng khi gặp dung dịch iot.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 162.14
    },
    'ALBUMIN_PROTEIN': {
        id: 'ALBUMIN_PROTEIN',
        name: { EN: 'Egg Albumin (Protein Solution)', VN: 'Lòng Trắng Trứng (Protein Albumin)' },
        formula: 'Protein',
        color: '#fefce8',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'protein',
        ph: 7.4,
        description: { EN: 'Native globular polypeptide protein from egg white. Undergoes characteristic Biuret violet complexation with Cu(OH)₂.', VN: 'Dung dịch protein hình cầu tự nhiên từ lòng trắng trứng chứa nhiều liên kết peptit. Cho phản ứng màu Biuret tạo màu tím đặc trưng với Cu(OH)₂.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 45000
    },
    'ACETYLENE_GAS': {
        id: 'ACETYLENE_GAS',
        name: { EN: 'Acetylene Gas (Ethyne)', VN: 'Khí Axetilen (Ethyne / C₂H₂)' },
        formula: 'C₂H₂ ↑',
        color: '#f8fafc',
        type: 'gas',
        category: 'organic',
        reactionClass: 'alkyne',
        ph: 7.0,
        description: { EN: 'Simplest alkyne containing a carbon-carbon triple bond (C≡C). Decolorizes bromine water and burns with a luminous smoky flame.', VN: 'Hiđrocacbon không no có liên kết ba C≡C đầu mạch. Làm mất màu dung dịch nước brom và cháy với ngọn lửa sáng chói tỏa nhiệt cao (hàn xì).' },
        isOrganic: true,
        stateOfMatter: 'gas',
        hazardTypes: ['flammable', 'explosive'],
        molarMass: 26.04
    },

    // ==========================================
    // 7. INDICATORS & SPECIAL REAGENTS
    // ==========================================
    'PHENOLPHTHALEIN': {
        id: 'PHENOLPHTHALEIN',
        name: { EN: 'Phenolphthalein Indicator (1%)', VN: 'Chỉ Thị Phenolphtalein' },
        formula: 'C₂₀H₁₄O₄',
        color: '#f8fafc',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'indicator',
        ph: 7.0,
        description: { EN: 'pH indicator. Completely colorless in acidic and neutral solutions (pH < 8.2), turning brilliant fuchsia pink in alkaline media (pH > 8.2).', VN: 'Chất chỉ thị pH. Hoàn toàn không màu trong môi trường axit và trung tính (pH < 8.2), chuyển sang màu hồng cánh sen rực rỡ trong môi trường kiềm (pH > 8.2).' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 318.32
    },
    'UNIVERSAL_INDICATOR': {
        id: 'UNIVERSAL_INDICATOR',
        name: { EN: 'Universal pH Indicator', VN: 'Chỉ Thị Vạn Năng (Universal pH)' },
        formula: 'pH Indicator Sol',
        color: '#22c55e',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'indicator',
        ph: 7.0,
        description: { EN: 'Multi-component pH indicator solution exhibiting a continuous rainbow spectrum: Red (pH 1-3) -> Yellow (pH 5-6) -> Green (pH 7) -> Blue/Violet (pH 9-14).', VN: 'Dung dịch chỉ thị pH đa thành phần đổi màu dải quang phổ cầu vồng: Đỏ (pH 1-3) -> Vàng (pH 5-6) -> Xanh lục (pH 7) -> Xanh lam/Tím (pH 9-14).' },
        isOrganic: true,
        stateOfMatter: 'liquid'
    },
    'TOLLENS_REAGENT': {
        id: 'TOLLENS_REAGENT',
        name: { EN: 'Tollens Reagent (Ammoniacal Silver)', VN: 'Thuốc Thử Tollens (AgNO₃/NH₃)' },
        formula: '[Ag(NH₃)₂]OH',
        color: '#f0fdfa',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'transition_metal_salt',
        ph: 10.5,
        description: { EN: 'Diamminesilver(I) hydroxide complex. Selective mild oxidizing reagent that oxidizes aldehydes and reducing sugars to deposit a brilliant silver mirror (Ag).', VN: 'Phức chất điaminbạc(I) hydroxit. Thuốc thử chọn lọc oxi hóa nhóm andehit trong glucozơ/andehit tạo lớp gương bạc sáng loáng.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 158.94
    },
    'BROMINE_WATER': {
        id: 'BROMINE_WATER',
        name: { EN: 'Bromine Water (0.1M Br₂)', VN: 'Nước Brom (Dung dịch Br₂)' },
        formula: 'Br₂ (aq)',
        color: '#d97706',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'halogen',
        ph: 3.5,
        description: { EN: 'Aqueous bromine solution with characteristic reddish-amber color. Deeper analytical test for alkenes, alkynes, and phenol by decolorization or precipitation.', VN: 'Dung dịch brom trong nước có màu da cam nâu đỏ. Dùng làm thuốc thử đặc trưng nhận biết liên kết pi không no (anken, ankin) và phenol (tạo kết tủa trắng).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['toxic', 'corrosive'],
        molarMass: 159.808
    },
    'IODINE_SOLUTION': {
        id: 'IODINE_SOLUTION',
        name: { EN: 'Lugol Iodine Solution (I₂/KI)', VN: 'Dung dịch Iot (Lugol / I₂)' },
        formula: 'I₂ / KI',
        color: '#78350f',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'halogen',
        ph: 6.0,
        description: { EN: 'Iodine dissolved in potassium iodide. Forms an iconic deep navy blue-black complex with starch (Grade 12 carbohydrate test).', VN: 'Dung dịch iot hòa tan trong KI có màu nâu đỏ. Thuốc thử đặc trưng nhận biết hồ tinh bột bằng phản ứng tạo màu xanh tím thẫm.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 253.808
    },

    // ==========================================
    // 8. REACTION PRODUCTS & PRECIPITATES
    // ==========================================
    'Cu2O_PRECIPITATE': {
        id: 'Cu2O_PRECIPITATE',
        name: { EN: 'Copper(I) Oxide (Brick-Red Precipitate)', VN: 'Đồng(I) Oxit (Kết Tủa Đỏ Gạch)' },
        formula: 'Cu₂O ↓',
        color: '#b91c1c',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Insoluble brick-red copper(I) oxide precipitate. Formed by reducing Cu(OH)₂ or Fehling/Benedict solution with reducing sugars (glucose) under heating.', VN: 'Kết tủa màu đỏ gạch không tan của đồng(I) oxit. Sinh ra từ phản ứng khử Cu(OH)₂ bởi đường khử (glucozơ, fructozơ, mantozơ) khi đun nóng.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 143.09
    },
    'STARCH_IODINE_COMPLEX': {
        id: 'STARCH_IODINE_COMPLEX',
        name: { EN: 'Starch-Iodine Blue Complex', VN: 'Hợp Chất Bọc Tinh Bột - Iot (Xanh Tím)' },
        formula: '[I₅⁻@amylose]',
        color: '#1e1b4b',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'complex',
        ph: 6.8,
        description: { EN: 'Intense blue-purple inclusion compound where polyiodide ions are trapped inside helical amylose spirals. Discolors upon heating and returns on cooling.', VN: 'Hợp chất bọc màu xanh tím đặc trưng khi chuỗi polyiodua chui vào trong lòng xoắn ốc của amilozơ. Mất màu khi đun sôi và hiện màu lại khi để nguội.' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'TRIBROMOPHENOL_PRECIPITATE': {
        id: 'TRIBROMOPHENOL_PRECIPITATE',
        name: { EN: '2,4,6-Tribromophenol (White Precipitate)', VN: '2,4,6-Tribromophenol (Kết Tủa Trắng)' },
        formula: 'C₆H₂Br₃OH ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'organic',
        reactionClass: 'precipitate',
        ph: 4.5,
        description: { EN: 'Heavy white insoluble precipitate formed instantly when aqueous bromine is added to phenol. Highly sensitive analytical test for phenol (Grade 11/12).', VN: 'Kết tủa trắng lắng đọng ngay lập tức khi nhỏ nước brom vào dung dịch phenol do vòng benzen được kích hoạt mạnh. Dấu hiệu nhận biết đặc trưng của phenol.' },
        isOrganic: true,
        stateOfMatter: 'solid',
        molarMass: 330.80
    },
    'BIURET_COMPLEX': {
        id: 'BIURET_COMPLEX',
        name: { EN: 'Biuret Violet Peptide Complex', VN: 'Phức Chất Biuret Màu Tím (Hóa 12)' },
        formula: '[Cu(Peptide)₂]²⁺',
        color: '#7c3aed',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'complex',
        ph: 9.5,
        description: { EN: 'Signature royal violet-purple coordination complex formed between Cu²⁺ ions and peptide backbones (-CO-NH-) in alkaline solution.', VN: 'Dung dịch phức chất màu tím hoa cà đặc trưng sinh ra do các liên kết peptit (-CO-NH-) trong protein tạo phức chelat với ion Cu²⁺ trong môi trường kiềm.' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'CuOH2_PRECIPITATE': {
        id: 'CuOH2_PRECIPITATE',
        name: { EN: 'Copper(II) Hydroxide (Blue Precipitate)', VN: 'Đồng(II) Hydroxit (Kết Tủa Xanh Lam)' },
        formula: 'Cu(OH)₂ ↓',
        color: '#0284c7',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 8.5,
        description: { EN: 'Gelatinous azure-blue precipitate. Dissolves in acids (HCl) and dissolves in polyols (glycerol, glucose) to form deep sapphire blue complexes.', VN: 'Kết tủa keo màu xanh lam tươi. Tan trong axit giải phóng Cu²⁺ và tan trong polyancol (glixerol, glucozơ) tạo phức màu xanh lam thẫm.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 97.56
    },
    'COPPER_POLYOL_COMPLEX': {
        id: 'COPPER_POLYOL_COMPLEX',
        name: { EN: 'Copper-Glycerol Sapphire Complex', VN: 'Phức Đồng-Glixerol Xanh Thẫm' },
        formula: '[Cu(C₃H₇O₃)₂]',
        color: '#1d4ed8',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 8.0,
        description: { EN: 'Deep sapphire-blue soluble coordination complex. The definitive analytical identification test for vicinal polyhydroxy compounds (Grade 12).', VN: 'Dung dịch phức chất màu xanh lam thẫm trong suốt. Dấu hiệu nhận biết đặc trưng kinh điển của các hợp chất polyancol có nhóm -OH liền kề (Hóa 12).' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'FeOH3_PRECIPITATE': {
        id: 'FeOH3_PRECIPITATE',
        name: { EN: 'Iron(III) Hydroxide (Brown Precipitate)', VN: 'Sắt(III) Hydroxit (Kết Tủa Nâu Đỏ)' },
        formula: 'Fe(OH)₃ ↓',
        color: '#b45309',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 8.0,
        description: { EN: 'Dense reddish-brown rust precipitate. Insoluble in water, easily dissolved by mineral acids.', VN: 'Kết tủa màu nâu đỏ đặc trưng. Không tan trong nước, tan dễ dàng trong các dung dịch axit mạnh.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 106.87
    },
    'AgCl_PRECIPITATE': {
        id: 'AgCl_PRECIPITATE',
        name: { EN: 'Silver Chloride (Curdy White Precipitate)', VN: 'Bạc Clorua (Kết Tủa Trắng Vón)' },
        formula: 'AgCl ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Curdy white precipitate that darkens upon light exposure. Insoluble in HNO₃, readily dissolves in aqueous ammonia forming [Ag(NH₃)₂]⁺.', VN: 'Kết tủa trắng vón như sữa chua. Không tan trong axit HNO₃, tan trong dung dịch amoniac tạo phức tan [Ag(NH₃)₂]⁺.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 143.32
    },
    'BaSO4_PRECIPITATE': {
        id: 'BaSO4_PRECIPITATE',
        name: { EN: 'Barium Sulfate (Dense White Precipitate)', VN: 'Bari Sunfat (Kết Tủa Trắng Không Tan)' },
        formula: 'BaSO₄ ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Dense, extremely insoluble white precipitate. Completely impervious to mineral acids.', VN: 'Kết tủa trắng rất bền, nặng và mịn. Hoàn toàn không tan trong nước và các axit vô cơ mạnh.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 233.39
    },
    'HYDROGEN_GAS': {
        id: 'HYDROGEN_GAS',
        name: { EN: 'Hydrogen Gas (Bubbles)', VN: 'Khí Hydro (H₂)' },
        formula: 'H₂ ↑',
        color: '#e0f2fe',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Colorless, odorless, highly flammable gas produced by active metal-acid or metal-water redox reactions.', VN: 'Khí không màu, không mùi, rất nhẹ và dễ cháy nổ, sinh ra khi kim loại hoạt động tác dụng với axit hoặc nước.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 2.016
    },
    'CARBON_DIOXIDE': {
        id: 'CARBON_DIOXIDE',
        name: { EN: 'Carbon Dioxide Gas (Effervescence)', VN: 'Khí Cacbonic (CO₂)' },
        formula: 'CO₂ ↑',
        color: '#f1f5f9',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 6.0,
        description: { EN: 'Colorless gas that produces vigorous effervescence. Turns clear limewater milky white.', VN: 'Khí không màu gây sủi bọt mạnh. Làm đục nước vôi trong do tạo kết tủa CaCO₃.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 44.01
    },
    'PINK_BASE': {
        id: 'PINK_BASE',
        name: { EN: 'Alkaline Phenolphthalein (Fuchsia)', VN: 'Dung Dịch Bazơ Hồng Cánh Sen' },
        formula: 'Ind⁻ (Fuchsia)',
        color: '#f43f5e',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'indicator',
        ph: 11.0,
        description: { EN: 'Dianionic quinoid form of phenolphthalein displaying a dazzling fuchsia pink color in basic solution.', VN: 'Dạng ion mang điện tích âm của phenolphtalein có cấu trúc quinoid phát màu hồng cánh sen rực rỡ trong môi trường bazơ.' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'SALT_WATER': {
        id: 'SALT_WATER',
        name: { EN: 'Neutral Salt Solution (NaCl + H₂O)', VN: 'Dung Dịch Muối Trung Tính' },
        formula: 'NaCl (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Neutral aqueous salt solution produced by stoichiometric acid-base neutralization.', VN: 'Dung dịch muối ăn trung hòa sinh ra từ phản ứng trung hòa axit - bazơ.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 58.44
    },
    'KNO3': {
        id: 'KNO3',
        name: { EN: 'Potassium Nitrate', VN: 'Kali Nitrat' },
        formula: 'KNO₃ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Soluble potassium nitrate salt byproduct from the Golden Rain reaction.', VN: 'Muối kali nitrat tan trong dung dịch từ phản ứng Mưa Vàng.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 101.10
    },

    // ==========================================
    // 7. EXPANDED SCIENTIFIC SALTS, COMPLEXES & INORGANIC ELEMENTS
    // ==========================================
    'LiOH': {
        id: 'LiOH',
        name: { EN: 'Lithium Hydroxide', VN: 'Liti Hydroxit' },
        formula: 'LiOH (aq)',
        color: '#f0fdf4',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 13.5,
        description: { EN: 'Strong caustic alkali solution formed by reacting lithium metal with water.', VN: 'Dung dịch kiềm mạnh sinh ra từ phản ứng của kim loại liti với nước.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 23.95
    },
    'MgCl2': {
        id: 'MgCl2',
        name: { EN: 'Magnesium Chloride Solution', VN: 'Dung Dịch Magie Clorua' },
        formula: 'MgCl₂ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 6.5,
        description: { EN: 'Colorless aqueous salt solution formed from the single displacement of magnesium in hydrochloric acid.', VN: 'Dung dịch muối không màu sinh ra từ phản ứng thế của dải magie trong axit clohidric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 95.21
    },
    'AlCl3': {
        id: 'AlCl3',
        name: { EN: 'Aluminum Chloride Solution', VN: 'Dung Dịch Nhôm Clorua' },
        formula: 'AlCl₃ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 3.5,
        description: { EN: 'Slightly acidic aqueous aluminum salt formed by dissolving aluminum foil in hydrochloric acid.', VN: 'Dung dịch muối nhôm có tính axit nhẹ do thủy phân, sinh ra khi hòa tan nhôm trong axit clohidric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 133.34
    },
    'ZnCl2': {
        id: 'ZnCl2',
        name: { EN: 'Zinc Chloride Solution', VN: 'Dung Dịch Kẽm Clorua' },
        formula: 'ZnCl₂ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 5.5,
        description: { EN: 'Clear aqueous salt solution formed by dissolving zinc granules in hydrochloric acid.', VN: 'Dung dịch muối kẽm sinh ra khi hòa tan kẽm trong axit clohidric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 136.30
    },
    'FeCl2': {
        id: 'FeCl2',
        name: { EN: 'Iron(II) Chloride Solution', VN: 'Dung Dịch Sắt(II) Clorua' },
        formula: 'FeCl₂ (aq)',
        color: '#bbf7d0',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 4.5,
        description: { EN: 'Pale seafoam-green solution of Iron(II) chloride formed by the reaction of elemental iron with non-oxidizing hydrochloric acid.', VN: 'Dung dịch màu xanh lục nhạt đặc trưng của muối Sắt(II) sinh ra khi cho sắt tác dụng với axit clohidric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 126.75
    },
    'FeSO4': {
        id: 'FeSO4',
        name: { EN: 'Iron(II) Sulfate Solution (Green Vitriol)', VN: 'Dung Dịch Sắt(II) Sunfat' },
        formula: 'FeSO₄ (aq)',
        color: '#86efac',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 4.0,
        description: { EN: 'Pale jade-green solution of Iron(II) sulfate formed by single displacement of iron in copper sulfate or dilute sulfuric acid.', VN: 'Dung dịch màu xanh lục nhạt sinh ra khi sắt đẩy đồng ra khỏi dung dịch CuSO₄ hoặc tan trong axit H₂SO₄ loãng.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 151.91
    },
    'CuCl2': {
        id: 'CuCl2',
        name: { EN: 'Copper(II) Chloride Solution', VN: 'Dung Dịch Đồng(II) Clorua' },
        formula: 'CuCl₂ (aq)',
        color: '#06b6d4',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 4.0,
        description: { EN: 'Vibrant emerald-cyan solution of Copper(II) chloride formed when copper hydroxide dissolves in hydrochloric acid.', VN: 'Dung dịch màu xanh ngọc lam rực rỡ sinh ra khi hòa tan kết tủa Cu(OH)₂ trong axit clohidric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 134.45
    },
    'CuNO3_2': {
        id: 'CuNO3_2',
        name: { EN: 'Copper(II) Nitrate Solution', VN: 'Dung Dịch Đồng(II) Nitrat' },
        formula: 'Cu(NO₃)₂ (aq)',
        color: '#0284c7',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 4.0,
        description: { EN: 'Lustrous azure-blue copper solution synthesized by oxidizing metallic copper with concentrated nitric acid.', VN: 'Dung dịch màu xanh lam sapphire tráng lệ sinh ra từ phản ứng của kim loại đồng với axit nitric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 187.56
    },
    'NO2_GAS': {
        id: 'NO2_GAS',
        name: { EN: 'Nitrogen Dioxide (Toxic Brown Fumes)', VN: 'Khí Nitơ Dioxit (Khí Màu Nâu Đỏ)' },
        formula: 'NO₂ ↑',
        color: '#b45309',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 3.0,
        description: { EN: 'Dense, pungent reddish-brown paramagnetic toxic gas evolved when copper reduces concentrated nitric acid.', VN: 'Khí độc màu nâu đỏ đặc trưng, mùi hắc khó chịu, sinh ra mãnh liệt khi đồng tác dụng với axit nitric đặc.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        hazardTypes: ['toxic', 'corrosive', 'oxidizer'],
        molarMass: 46.01
    },
    'Na2SO4': {
        id: 'Na2SO4',
        name: { EN: 'Sodium Sulfate Solution', VN: 'Dung Dịch Natri Sunfat' },
        formula: 'Na₂SO₄ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Neutral aqueous solution of sodium sulfate produced by neutralizing sulfuric acid with sodium hydroxide or carbonates.', VN: 'Dung dịch muối trung tính sinh ra từ phản ứng trung hòa axit sunfuric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 142.04
    },
    'NH4Cl': {
        id: 'NH4Cl',
        name: { EN: 'Ammonium Chloride Solution', VN: 'Dung Dịch Amoni Clorua' },
        formula: 'NH₄Cl (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 5.5,
        description: { EN: 'Aqueous salt solution produced from the classic reaction of ammonia with hydrochloric acid.', VN: 'Dung dịch muối amoni tạo thành khi cho amoniac tác dụng với axit clohidric.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 53.49
    },
    'SODIUM_ETHOXIDE': {
        id: 'SODIUM_ETHOXIDE',
        name: { EN: 'Sodium Ethoxide', VN: 'Natri Etylat' },
        formula: 'C₂H₅ONa (aq)',
        color: '#fef08a',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'strong_base',
        ph: 13.0,
        description: { EN: 'Potent organic alkoxide base formed by dissolving sodium metal into dry ethanol, releasing hydrogen bubbles.', VN: 'Bazơ ancolat hữu cơ mạnh tạo thành khi cho kim loại natri phản ứng với rượu etylic, sủi bọt khí hydro.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 68.05
    },
    'SODIUM_FORMATE': {
        id: 'SODIUM_FORMATE',
        name: { EN: 'Sodium Formate', VN: 'Natri Fomiat' },
        formula: 'HCOONa (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 8.2,
        description: { EN: 'Aqueous organic sodium salt of formic acid formed by alkaline neutralization.', VN: 'Dung dịch muối hữu cơ của axit fomic sinh ra từ phản ứng trung hòa với kiềm.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 68.01
    },
    'SODIUM_PHENOLATE': {
        id: 'SODIUM_PHENOLATE',
        name: { EN: 'Sodium Phenolate', VN: 'Natri Phenolat' },
        formula: 'C₆H₅ONa (aq)',
        color: '#fef3c7',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 10.0,
        description: { EN: 'Clear aqueous phenoxide solution formed when insoluble phenol dissolves in sodium hydroxide.', VN: 'Dung dịch muối phenolat tan trong suốt sinh ra khi phenol tan trong dung dịch kiềm NaOH.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 116.09
    },
    'IRON_PHENOLATE_COMPLEX': {
        id: 'IRON_PHENOLATE_COMPLEX',
        name: { EN: 'Iron(III) Hexaphenolate (Purple Complex)', VN: 'Phức Tím Sắt(III) - Phenol' },
        formula: '[Fe(OC₆H₅)₆]³⁻',
        color: '#581c87',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'indicator',
        ph: 5.0,
        description: { EN: 'Intense royal purple/violet coordination complex specific to the analytical detection of phenolic hydroxyl groups.', VN: 'Phức chất màu tím hoàng gia đậm đặc trưng dùng để nhận biết nhóm hiđroxyl phenol với dung dịch FeCl₃.' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'TETRAAMMINE_COPPER': {
        id: 'TETRAAMMINE_COPPER',
        name: { EN: 'Tetraamminecopper(II) (Deep Royal Blue)', VN: 'Phức Đồng Tứ Ammin (Xanh Thẫm Swiss)' },
        formula: '[Cu(NH₃)₄]²⁺ (aq)',
        color: '#1d4ed8',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 9.5,
        description: { EN: 'Breathtaking deep royal-blue Swiss reagent complex formed when ammonia coordinates with copper(II) ions.', VN: 'Dung dịch phức chất màu xanh thẫm tráng lệ (nước Svayze) sinh ra khi cho Cu(OH)₂ hoặc CuSO₄ tác dụng với amoniac dư.' },
        isOrganic: false,
        stateOfMatter: 'aqueous'
    },
    'AgI_PRECIPITATE': {
        id: 'AgI_PRECIPITATE',
        name: { EN: 'Silver Iodide (Bright Yellow Precipitate)', VN: 'Bạc Iodua (Kết Tủa Vàng Đậm)' },
        formula: 'AgI ↓',
        color: '#facc15',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Intense canary-yellow precipitate insoluble in water, acids, and dilute ammonia.', VN: 'Kết tủa màu vàng đậm không tan trong nước, axit và amoniac loãng, dùng để nhận biết ion iodua I⁻.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 234.77
    },
    'CaCO3_PRECIPITATE': {
        id: 'CaCO3_PRECIPITATE',
        name: { EN: 'Calcium Carbonate (Milky White Precipitate)', VN: 'Canxi Cacbonat (Kết Tủa Trắng Đục)' },
        formula: 'CaCO₃ ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 8.5,
        description: { EN: 'Milky-white precipitate responsible for clouding clear limewater in the classic carbon dioxide confirmation test.', VN: 'Kết tủa trắng sữa làm đục nước vôi trong trong thí nghiệm kinh điển nhận biết khí CO₂.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 100.09
    },
    'BaCO3_PRECIPITATE': {
        id: 'BaCO3_PRECIPITATE',
        name: { EN: 'Barium Carbonate (Dense White Precipitate)', VN: 'Bari Cacbonat (Kết Tủa Trắng)' },
        formula: 'BaCO₃ ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 8.0,
        description: { EN: 'Dense white precipitate formed by the reaction of barium salts with soluble carbonates.', VN: 'Kết tủa trắng nặng tạo thành khi muối bari gặp ion cacbonat, tan trong axit sủi bọt CO₂.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 197.34
    },
    'FeOH2_PRECIPITATE': {
        id: 'FeOH2_PRECIPITATE',
        name: { EN: 'Iron(II) Hydroxide (Dirty Green Precipitate)', VN: 'Sắt(II) Hydroxit (Kết Tủa Trắng Xanh)' },
        formula: 'Fe(OH)₂ ↓',
        color: '#4ade80',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 9.0,
        description: { EN: 'Gelatinous dirty-green precipitate of Iron(II) hydroxide, rapidly oxidizing in air to reddish-brown Fe(OH)₃.', VN: 'Kết tủa màu trắng xanh rêu của Sắt(II) hidroxit, nhanh chóng bị oxy hóa trong không khí chuyển sang màu nâu đỏ Fe(OH)₃.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 89.86
    },
    'AlOH3_PRECIPITATE': {
        id: 'AlOH3_PRECIPITATE',
        name: { EN: 'Aluminum Hydroxide (Gelatinous White)', VN: 'Nhôm Hydroxit (Kết Tủa Keo Trắng)' },
        formula: 'Al(OH)₃ ↓',
        color: '#e2e8f0',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Classic amphoteric white gelatinous precipitate. Dissolves in both strong acids and excess strong bases.', VN: 'Kết tủa keo trắng lưỡng tính đặc trưng của nhôm. Tan trong cả axit mạnh lẫn kiềm dư tạo phức aluminat.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 78.00
    },
    'SODIUM_ALUMINATE': {
        id: 'SODIUM_ALUMINATE',
        name: { EN: 'Sodium Tetrahydroxoaluminate', VN: 'Natri Aluminat (Dung Dịch Tan)' },
        formula: 'Na[Al(OH)₄] (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 12.5,
        description: { EN: 'Clear soluble aluminate complex formed when aluminum or Al(OH)₃ dissolves in excess sodium hydroxide.', VN: 'Dung dịch phức aluminat tan trong suốt hình thành khi nhôm kim loại hoặc kết tủa Al(OH)₃ tan trong dung dịch NaOH dư.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 118.00
    },
    'PbNO3_2': {
        id: 'PbNO3_2',
        name: { EN: 'Lead(II) Nitrate Solution', VN: 'Dung Dịch Chì(II) Nitrat' },
        formula: 'Pb(NO₃)₂ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 4.5,
        description: { EN: 'Soluble toxic lead salt used to synthesize glittering Golden Rain crystals with potassium iodide.', VN: 'Dung dịch muối chì độc hại dùng để biểu diễn phản ứng mưa vàng lộng lẫy với kali iodua.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['toxic'],
        molarMass: 331.2
    },
    'PbI2_PRECIPITATE': {
        id: 'PbI2_PRECIPITATE',
        name: { EN: 'Lead(II) Iodide (Golden Rain Crystals)', VN: 'Chì(II) Iodua (Tinh Thể Mưa Vàng)' },
        formula: 'PbI₂ ↓ (Golden Rain)',
        color: '#eab308',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Dazzling golden hexagonal crystalline flakes that sparkle like falling glitter under light ("Golden Rain").', VN: 'Tinh thể hình vảy màu vàng óng ánh lấp lánh như cơn mưa vàng trong thí nghiệm hóa học kinh điển thế giới.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['toxic'],
        molarMass: 461.0
    },

    // --- INORGANIC GASES & ELEMENTS (From Periodic Table & Expansion) ---
    'H2': {
        id: 'H2',
        name: { EN: 'Hydrogen Gas', VN: 'Khí Hydro' },
        formula: 'H₂ (g)',
        color: '#38bdf8',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Lightest, most abundant element. Highly combustible diatomic gas.', VN: 'Nguyên tố nhẹ nhất, phổ biến nhất trong vũ trụ. Khí không màu, dễ cháy nổ.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 2.016
    },
    'He': {
        id: 'He',
        name: { EN: 'Helium', VN: 'Heli' },
        formula: 'He (g)',
        color: '#c084fc',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Inert, monatomic noble gas with lowest boiling point of any element.', VN: 'Khí trơ đơn nguyên tử, nhiệt độ sôi thấp nhất trong tất cả các nguyên tố.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 4.0026
    },
    'C': {
        id: 'C',
        name: { EN: 'Carbon (Graphite)', VN: 'Cacbon (Than chì)' },
        formula: 'C (s)',
        color: '#475569',
        type: 'solid',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7.0,
        description: { EN: 'Fundamental basis of organic life, exists as graphite and diamond.', VN: 'Nền tảng của sự sống hữu cơ, tồn tại dưới dạng than chì và kim cương.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 12.011
    },
    'N2': {
        id: 'N2',
        name: { EN: 'Nitrogen Gas', VN: 'Khí Nitơ' },
        formula: 'N₂ (g)',
        color: '#60a5fa',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Makes up 78% of Earth’s atmosphere, bonded with extremely strong triple bond.', VN: 'Chiếm 78% bầu khí quyển, liên kết ba bền vững bậc nhất.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 28.014
    },
    'O2': {
        id: 'O2',
        name: { EN: 'Oxygen Gas', VN: 'Khí Oxy' },
        formula: 'O₂ (g)',
        color: '#38bdf8',
        type: 'gas',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7.0,
        description: { EN: 'Essential life-supporting gas, powerful oxidizing agent in combustion.', VN: 'Khí duy trì hô hấp và sự sống, chất oxy hóa mạnh trong phản ứng cháy.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 31.998
    },
    'F2': {
        id: 'F2',
        name: { EN: 'Fluorine Gas', VN: 'Khí Flo' },
        formula: 'F₂ (g)',
        color: '#a3e635',
        type: 'gas',
        category: 'element',
        reactionClass: 'halogen',
        ph: 2.0,
        description: { EN: 'Extremely reactive, poisonous pale-yellow halogen gas.', VN: 'Khí halogen màu vàng nhạt, có độ âm điện cao nhất và tính oxy hóa cực mạnh.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        hazardTypes: ['toxic', 'corrosive', 'oxidizer'],
        molarMass: 37.996
    },
    'Ne': {
        id: 'Ne',
        name: { EN: 'Neon', VN: 'Neon' },
        formula: 'Ne (g)',
        color: '#f472b6',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Inert noble gas emitting intense reddish-orange luminescence in discharge tubes.', VN: 'Khí hiếm trơ phát ra ánh sáng đỏ cam rực rỡ khi phóng điện.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 20.180
    },
    'Si': {
        id: 'Si',
        name: { EN: 'Silicon', VN: 'Silic' },
        formula: 'Si (s)',
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7.0,
        description: { EN: 'Semiconducting crystalline metalloid, cornerstone of modern computer chips.', VN: 'Á kim bán dẫn dạng tinh thể, trái tim của ngành vi mạch bán dẫn.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 28.085
    },
    'P': {
        id: 'P',
        name: { EN: 'Red Phosphorus', VN: 'Photpho Đỏ' },
        formula: 'P (s)',
        color: '#ea580c',
        type: 'solid',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7.0,
        description: { EN: 'Highly reactive non-metal found in match heads, DNA backbones, and fertilizers.', VN: 'Phi kim hoạt động, thành phần trên đầu que diêm, DNA và phân bón.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable'],
        molarMass: 30.974
    },
    'S': {
        id: 'S',
        name: { EN: 'Sulfur Powder', VN: 'Bột Lưu Huỳnh' },
        formula: 'S (s)',
        color: '#facc15',
        type: 'solid',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7.0,
        description: { EN: 'Bright yellow crystalline non-metal forming sulfuric acid and vulcanized rubber.', VN: 'Chất rắn kết tinh màu vàng tươi, dùng sản xuất axit sunfuric và lưu hóa cao su.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable'],
        molarMass: 32.06
    },
    'Ar': {
        id: 'Ar',
        name: { EN: 'Argon', VN: 'Argon' },
        formula: 'Ar (g)',
        color: '#c084fc',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Inert gas widely utilized as a protective shielding atmosphere in welding.', VN: 'Khí trơ phổ biến thứ 3 trong khí quyển, dùng làm khí bảo vệ khi hàn kim loại.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 39.948
    },

    // ==========================================
    // 6.5. EXPANDED ORGANIC DERIVATIVES & SPECIAL PRECIPITATES
    // ==========================================
    'METHYL_ACETATE': {
        id: 'METHYL_ACETATE',
        name: { EN: 'Methyl Acetate (Fruity Apple Ester)', VN: 'Metyl Axetat (Ester Hương Táo)' },
        formula: 'CH₃COOCH₃',
        color: '#fdf4ff',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'ester',
        ph: 7,
        description: { EN: 'Volatile, pleasantly sweet fruity ester found in apples and glues.', VN: 'Este dễ bay hơi có mùi thơm hoa quả dịu ngọt (hương táo).' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 74.08
    },
    'ETHYL_FORMATE': {
        id: 'ETHYL_FORMATE',
        name: { EN: 'Ethyl Formate (Peach / Rum Aroma)', VN: 'Etyl Fomiat (Hương Đào / Rượu Rum)' },
        formula: 'HCOOC₂H₅',
        color: '#fdf2f8',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'ester',
        ph: 7,
        description: { EN: 'Characteristic rum aroma and peach flavor. Formed by esterification of formic acid and ethanol.', VN: 'Este có mùi thơm đặc trưng của quả đào chín và rượu rum.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 74.08
    },
    'SODIUM_METHOXIDE': {
        id: 'SODIUM_METHOXIDE',
        name: { EN: 'Sodium Methoxide Solution', VN: 'Dung Dịch Natri Metoxit' },
        formula: 'CH₃ONa (aq)',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'strong_base',
        ph: 13.5,
        description: { EN: 'Strong organic alkoxide base formed from deprotonation of methanol with sodium.', VN: 'Bazơ ancolat hữu cơ mạnh tạo thành khi cho natri tác dụng với metanol.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 54.02
    },
    'POTASSIUM_ETHOXIDE': {
        id: 'POTASSIUM_ETHOXIDE',
        name: { EN: 'Potassium Ethoxide Solution', VN: 'Dung Dịch Kali Etoxit' },
        formula: 'C₂H₅OK (aq)',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'strong_base',
        ph: 13.8,
        description: { EN: 'Powerful organic alkoxide base produced by potassium reacting with anhydrous ethanol.', VN: 'Bazơ ancolat cực mạnh sinh ra khi kali tác dụng với etanol khan.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 84.16
    },
    'POTASSIUM_ACETATE': {
        id: 'POTASSIUM_ACETATE',
        name: { EN: 'Potassium Acetate Solution', VN: 'Dung Dịch Kali Axetat' },
        formula: 'CH₃COOK (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 8.5,
        description: { EN: 'Mildly alkaline acetate salt solution used as buffer and food preserver.', VN: 'Muối kali của axit axetic có tính bazơ yếu do thủy phân.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 98.14
    },
    'MAGNESIUM_ACETATE': {
        id: 'MAGNESIUM_ACETATE',
        name: { EN: 'Magnesium Acetate Solution', VN: 'Dung Dịch Magie Axetat' },
        formula: '(CH₃COO)₂Mg (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.2,
        description: { EN: 'Soluble magnesium salt of acetic acid.', VN: 'Muối tan của magie với axit axetic.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 142.39
    },
    'ZINC_ACETATE': {
        id: 'ZINC_ACETATE',
        name: { EN: 'Zinc Acetate Solution', VN: 'Dung Dịch Kẽm Axetat' },
        formula: '(CH₃COO)₂Zn (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 6.5,
        description: { EN: 'Soluble zinc salt of acetic acid used in medical antiseptics.', VN: 'Muối tan kẽm axetat dùng trong y tế sát khuẩn.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 183.48
    },
    'COPPER_ACETATE': {
        id: 'COPPER_ACETATE',
        name: { EN: 'Copper(II) Acetate (Verdigris Cyan)', VN: 'Đồng(II) Axetat (Lam Ngọc Verdigris)' },
        formula: '(CH₃COO)₂Cu (aq)',
        color: '#06b6d4',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 5.5,
        description: { EN: 'Striking emerald-cyan copper(II) acetate solution synthesized by dissolving Cu(OH)₂ in acetic acid.', VN: 'Dung dịch màu xanh lam ngọc tuyệt đẹp sinh ra khi hòa tan Cu(OH)₂ vào giấm ăn.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 181.63
    },
    'CHI3_PRECIPITATE': {
        id: 'CHI3_PRECIPITATE',
        name: { EN: 'Triiodomethane / Iodoform (Yellow Crystals)', VN: 'Iodoform / Triiodometan (Kết Tủa Vàng Sát Trùng)' },
        formula: 'CHI₃ ↓',
        color: '#facc15',
        type: 'solid',
        category: 'organic',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: 'Characteristic pale yellow crystalline precipitate with distinct medicinal hospital odor. Hallmark of the positive Iodoform test for CH₃-CO- and CH₃-CH(OH)- groups.', VN: 'Kết tủa tinh thể màu vàng nhạt có mùi sát trùng bệnh viện đặc trưng. Dấu hiệu nhận biết nhóm axetyl và etanol trong phản ứng Iodoform.' },
        isOrganic: true,
        stateOfMatter: 'solid',
        molarMass: 393.73
    },
    'Ag2C2_PRECIPITATE': {
        id: 'Ag2C2_PRECIPITATE',
        name: { EN: 'Disilver Acetylide (Bright Yellow Precipitate)', VN: 'Bạc Axetylua (Kết Tủa Vàng Nhạt Ag₂C₂)' },
        formula: 'Ag₂C₂ ↓',
        color: '#eab308',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: 'Shock-sensitive yellow precipitate formed by bubbling acetylene through ammoniacal silver nitrate (Tollens reagent). Classic test for terminal alkynes (1-alkynes).', VN: 'Kết tủa màu vàng nhạt đặc trưng sinh ra khi sục khí axetilen vào thuốc thử Tollens. Phản ứng kinh điển nhận biết liên kết ba đầu mạch (ank-1-in).' },
        isOrganic: true,
        stateOfMatter: 'solid',
        hazardTypes: ["explosive"],
        molarMass: 239.76
    },
    'PICRIC_ACID': {
        id: 'PICRIC_ACID',
        name: { EN: 'Picric Acid (2,4,6-Trinitrophenol Crystals)', VN: 'Axit Picric (2,4,6-Trinitrophenol Tinh Thể Vàng)' },
        formula: 'C₆H₂(NO₂)₃OH ↓',
        color: '#f59e0b',
        type: 'solid',
        category: 'organic',
        reactionClass: 'precipitate',
        ph: 1,
        description: { EN: 'Intense canary yellow crystal formed by trinitration of phenol with concentrated nitric acid. Historically used as explosive and yellow dye.', VN: 'Tinh thể màu vàng chói sinh ra khi trinitro hóa phenol bằng axit nitric đặc. Dùng làm thuốc nổ và thuốc nhuộm.' },
        isOrganic: true,
        stateOfMatter: 'solid',
        hazardTypes: ["explosive","toxic"],
        molarMass: 229.1
    },
    'XANTHOPROTEIC_PRECIPITATE': {
        id: 'XANTHOPROTEIC_PRECIPITATE',
        name: { EN: 'Xanthoproteic Yellow Nitrated Protein', VN: 'Phức Vàng Xantoprotein (Nitro-Protein)' },
        formula: 'Nitrated Protein ↓',
        color: '#f59e0b',
        type: 'solid',
        category: 'organic',
        reactionClass: 'precipitate',
        ph: 3.5,
        description: { EN: 'Bright yellow coagulated protein resulting from nitration of aromatic amino acids (tyrosine, tryptophan) with concentrated nitric acid.', VN: 'Kết tủa màu vàng sinh ra khi axit nitric đặc tác dụng với protein chứa vòng benzen (lòng trắng trứng).' },
        isOrganic: true,
        stateOfMatter: 'solid',
        molarMass: 45000
    },
    'GLUCONIC_ACID': {
        id: 'GLUCONIC_ACID',
        name: { EN: 'D-Gluconic Acid Solution', VN: 'Dung Dịch Axit D-Gluconic' },
        formula: 'C₆H₁₂O₇ (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carboxylic_acid',
        ph: 3.2,
        description: { EN: 'Mild organic polyhydroxy carboxylic acid produced by selective oxidation of glucose aldehyde group with bromine water.', VN: 'Axit hữu cơ dịu nhẹ sinh ra khi oxi hóa chọn lọc nhóm andehit của glucozơ bằng nước brom.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 196.16
    },
    'CuI_PRECIPITATE': {
        id: 'CuI_PRECIPITATE',
        name: { EN: 'Copper(I) Iodide (Cream-White Precipitate)', VN: 'Đồng(I) Iodua (Kết Tủa Trắng Ngà)' },
        formula: 'CuI ↓',
        color: '#fef3c7',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: 'Insoluble cream-white copper(I) iodide formed during the reduction of Cu²⁺ by iodide ions.', VN: 'Kết tủa trắng ngà của đồng(I) iodua sinh ra trong phản ứng oxi hóa khử giữa Cu²⁺ và ion iodua.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 190.45
    },

    // ==========================================
    // PERIODIC TABLE EXPANSION & CURRICULUM REAGENTS
    // ==========================================
    'BERYLLIUM': {
        id: 'BERYLLIUM',
        name: { EN: "Beryllium Metal (Powder)", VN: "Beri Kim Loại (Dạng Bột)" },
        formula: "Be",
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7,
        description: { EN: "Steel-gray, strong, lightweight alkaline earth metal. Exhibits amphoteric behavior similar to aluminum.", VN: "Kim loại kiềm thổ màu xám thép nhẹ và cứng. Có tính chất lưỡng tính đặc trưng giống nhôm." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 9.012
    },
    'STRONTIUM': {
        id: 'STRONTIUM',
        name: { EN: "Strontium Metal", VN: "Stronti Kim Loại" },
        formula: "Sr",
        color: '#cbd5e1',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7,
        description: { EN: "Soft, silver-yellow alkaline earth metal that burns with a brilliant crimson-red flame in pyrotechnics.", VN: "Kim loại kiềm thổ màu vàng bạc mềm, cháy với ngọn lửa màu đỏ thắm rực rỡ trong pháo hoa." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 87.62
    },
    'TITANIUM': {
        id: 'TITANIUM',
        name: { EN: "Titanium Metal Shavings", VN: "Titan Kim Loại (Vụn Mảnh)" },
        formula: "Ti",
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Lustrous transition metal with high strength-to-density ratio and extraordinary corrosion resistance.", VN: "Kim loại chuyển tiếp sáng bóng, tỷ lệ độ bền trên trọng lượng cao và kháng ăn mòn siêu việt." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 47.87
    },
    'CHROMIUM': {
        id: 'CHROMIUM',
        name: { EN: "Chromium Metal (Hard Lustrous)", VN: "Crom Kim Loại (Bóng Cứng)" },
        formula: "Cr",
        color: '#cbd5e1',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Hardest metallic element in the periodic table (8.5 Mohs). Forms colorful oxidation states from +2 to +6.", VN: "Kim loại cứng nhất trong bảng tuần hoàn (độ cứng 8.5 Mohs). Tạo nhiều hợp chất màu rực rỡ từ +2 đến +6." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 51.996
    },
    'MANGANESE': {
        id: 'MANGANESE',
        name: { EN: "Manganese Metal Flakes", VN: "Mangan Kim Loại (Mảnh Vảy)" },
        formula: "Mn",
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Hard, brittle, silvery transition metal critical for steelmaking and redox catalytic cycles.", VN: "Kim loại chuyển tiếp màu xám bạc giòn, đóng vai trò then chốt trong luyện thép và xúc tác oxi hóa khử." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 54.938
    },
    'COBALT_METAL': {
        id: 'COBALT_METAL',
        name: { EN: "Cobalt Metal Granules", VN: "Coban Kim Loại (Hạt Xám Lam)" },
        formula: "Co",
        color: '#64748b',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Ferromagnetic transition metal with distinctive deep blue and pink complex ions.", VN: "Kim loại chuyển tiếp sắt từ màu xám ánh xanh, tạo các ion phức màu hồng đào và xanh lam coban rực rỡ." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 58.933
    },
    'NICKEL_METAL': {
        id: 'NICKEL_METAL',
        name: { EN: "Nickel Metal Pellets", VN: "Niken Kim Loại (Viên Bóng)" },
        formula: "Ni",
        color: '#cbd5e1',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Silvery-white lustrous metal with a slight golden tinge. Renowned hydrogenation catalyst (Raney Ni).", VN: "Kim loại bóng bạc hơi ánh vàng. Xúc tác hydro hóa kinh điển trong hóa hữu cơ (niken Raney)." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 58.693
    },
    'LEAD_METAL': {
        id: 'LEAD_METAL',
        name: { EN: "Lead Heavy Metal Ingot", VN: "Chì Kim Loại Nặng" },
        formula: "Pb",
        color: '#475569',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Dense, soft, highly malleable heavy post-transition metal. Excellent radiation shielding material.", VN: "Kim loại nặng mềm, dẻo, có tỷ trọng lớn và khả năng hấp thụ chắn bức xạ phóng xạ xuất sắc." },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ["toxic"],
        molarMass: 207.2
    },
    'TIN_METAL': {
        id: 'TIN_METAL',
        name: { EN: "Tin Metal Foil", VN: "Thiếc Kim Loại (Lá Trắng Bạc)" },
        formula: "Sn",
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Malleable, ductile post-transition metal with iconic crystalline \"tin cry\" sound upon bending.", VN: "Kim loại trắng bạc mềm dẻo, phát ra âm thanh \"tiếng khóc của thiếc\" khi bị bẻ gập." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 118.71
    },
    'PLATINUM_METAL': {
        id: 'PLATINUM_METAL',
        name: { EN: "Platinum Noble Metal Wire", VN: "Bạch Kim (Dây Kim Loại Quý)" },
        formula: "Pt",
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Extremely unreactive, dense noble metal. Highly prized for jewelry and industrial catalytic converters.", VN: "Kim loại quý cực kỳ trơ và bền hóa học. Được tôn vinh trong chế tác trang sức và xúc tác công nghiệp." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 195.08
    },
    'GOLD_METAL': {
        id: 'GOLD_METAL',
        name: { EN: "Gold Leaf Foil (24K Pure)", VN: "Vàng Kim Loại Lá (Nguyên Chất 24K)" },
        formula: "Au",
        color: '#facc15',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Iconic bright yellow noble metal. Impervious to all single acids, dissolves only in royal Aqua Regia.", VN: "Kim loại quý màu vàng ánh kim lộng lẫy. Bất khả xâm phạm trước mọi axit đơn lẻ, chỉ tan trong nước cường toan." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 196.97
    },
    'MERCURY_LIQUID': {
        id: 'MERCURY_LIQUID',
        name: { EN: "Mercury Liquid (Quicksilver)", VN: "Thủy Ngân Lỏng (Quicksilver)" },
        formula: "Hg (l)",
        color: '#94a3b8',
        type: 'liquid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7,
        description: { EN: "Only elemental metal liquid at standard temperature and pressure. Instantly neutralized by powdered sulfur into HgS.", VN: "Kim loại duy nhất ở thể lỏng ở điều kiện chuẩn. Được thu dọn và vô hiệu hóa tức thì bằng bột lưu huỳnh tạo HgS." },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ["toxic"],
        molarMass: 200.59
    },
    'CHLORINE_GAS': {
        id: 'CHLORINE_GAS',
        name: { EN: "Chlorine Gas (Pale Yellow-Green)", VN: "Khí Clo (Vàng Lục Nhạt)" },
        formula: "Cl₂ (g)",
        color: '#bef264',
        type: 'gas',
        category: 'element',
        reactionClass: 'halogen',
        ph: 5,
        description: { EN: "Suffocating, pungent greenish-yellow toxic halogen gas. Powerful disinfectant and oxidizing agent.", VN: "Khí halogen màu vàng lục mùi hắc cay nồng, độc hại. Chất oxi hóa mạnh và chất tẩy trắng khử trùng kinh điển." },
        isOrganic: false,
        stateOfMatter: 'gas',
        hazardTypes: ["toxic","corrosive","oxidizer"],
        molarMass: 70.9
    },
    'BROMINE_LIQUID': {
        id: 'BROMINE_LIQUID',
        name: { EN: "Bromine Elemental Liquid (Fuming Red-Brown)", VN: "Brom Lỏng Nguyên Chất (Nâu Đỏ Bốc Khói)" },
        formula: "Br₂ (l)",
        color: '#7f1d1d',
        type: 'liquid',
        category: 'element',
        reactionClass: 'halogen',
        ph: 4.5,
        description: { EN: "Heavy, fuming reddish-brown liquid halogen. Volatilizes readily into suffocating red vapors.", VN: "Chất lỏng màu nâu đỏ đậm đặc bốc khói cay nồng mãnh liệt. Halogen duy nhất ở thể lỏng tại STP." },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ["corrosive","toxic","oxidizer"],
        molarMass: 159.808
    },
    'BORON': {
        id: 'BORON',
        name: { EN: "Boron Amorphous Powder", VN: "Bo Vô Định Hình" },
        formula: "B",
        color: '#78716c',
        type: 'solid',
        category: 'element',
        reactionClass: 'non_metal',
        ph: 7,
        description: { EN: "Dark brown metalloid. Burns with an iconic bright green flame and forms boric acid.", VN: "Á kim màu nâu đen cứng. Cháy cho ngọn lửa màu xanh lá cây đặc trưng và tạo thành axit boric." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 10.81
    },
    'HYDROGEN_PEROXIDE': {
        id: 'HYDROGEN_PEROXIDE',
        name: { EN: "Hydrogen Peroxide 30% (High Purity)", VN: "Oxy Già Đậm Đặc 30% (H₂O₂)" },
        formula: "H₂O₂ (aq)",
        color: '#f0fdf4',
        type: 'liquid',
        category: 'solvent',
        reactionClass: 'weak_acid',
        ph: 4.5,
        description: { EN: "Powerful oxidizer that decomposes violently into water and oxygen gas upon contact with catalysts (Elephant Toothpaste).", VN: "Chất oxi hóa mạnh, phân hủy sinh bọt oxy cuồn cuộn khi gặp xúc tác MnO₂ hoặc KI (thí nghiệm Kem đánh răng con voi)." },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ["oxidizer","corrosive"],
        molarMass: 34.014
    },
    'MANGANESE_DIOXIDE': {
        id: 'MANGANESE_DIOXIDE',
        name: { EN: "Manganese(IV) Oxide (Pyrolusite Black)", VN: "Mangan Đioxit (Bột Đen MnO₂)" },
        formula: "MnO₂",
        color: '#1e293b',
        type: 'solid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7,
        description: { EN: "Insoluble black inorganic powder. Legendary catalytic engine for H₂O₂ decomposition and Scheele chlorine synthesis.", VN: "Bột oxit vô cơ màu đen tuyền. Chất xúc tác kinh điển phân hủy H₂O₂ và điều chế khí clo từ axit HCl đặc." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 86.94
    },
    'POTASSIUM_DICHROMATE': {
        id: 'POTASSIUM_DICHROMATE',
        name: { EN: "Potassium Dichromate (Vibrant Orange)", VN: "Kali Dicromat (Dung Dịch Cam Rực Rỡ)" },
        formula: "K₂Cr₂O₇ (aq)",
        color: '#ea580c',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 4,
        description: { EN: "Intense orange oxidizing solution. Classic breathalyzer reagent that turns emerald green upon ethanol reduction.", VN: "Dung dịch màu da cam rực rỡ. Thuốc thử nồng độ cồn kinh điển, chuyển sang màu xanh lục khi bị khử bởi cồn." },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ["oxidizer","toxic"],
        molarMass: 294.185
    },
    'POTASSIUM_CHROMATE': {
        id: 'POTASSIUM_CHROMATE',
        name: { EN: "Potassium Chromate (Lemon Yellow)", VN: "Kali Cromat (Dung Dịch Vàng Chanh)" },
        formula: "K₂CrO₄ (aq)",
        color: '#facc15',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 8.8,
        description: { EN: "Bright yellow solution in equilibrium with orange dichromate governed strictly by solution pH.", VN: "Dung dịch màu vàng chanh tươi sáng, cân bằng động với ion dicromat màu cam theo nồng độ pH của môi trường." },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ["toxic"],
        molarMass: 194.19
    },
    'SODIUM_THIOSULFATE': {
        id: 'SODIUM_THIOSULFATE',
        name: { EN: "Sodium Thiosulfate Solution", VN: "Natri Thiosunfat (Dung Dịch Na₂S₂O₃)" },
        formula: "Na₂S₂O₃ (aq)",
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.2,
        description: { EN: "Clear solution that decomposes upon acidification with HCl into milky colloidal sulfur and sulfur dioxide gas.", VN: "Dung dịch trong suốt, bị axit hóa bởi HCl tạo kết tủa lưu huỳnh vẩn đục như sữa và sủi bọt khí SO₂." },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 158.11
    },
    'SULFUR_DIOXIDE': {
        id: 'SULFUR_DIOXIDE',
        name: { EN: "Sulfur Dioxide Gas", VN: "Khí Sunfurơ (SO₂)" },
        formula: "SO₂ (g)",
        color: '#f1f5f9',
        type: 'gas',
        category: 'acid',
        reactionClass: 'weak_acid',
        ph: 3.5,
        description: { EN: "Choking, pungent acidic gas that bleaches organic dyes and decolorizes purple permanganate.", VN: "Khí axit mùi xốc hắc, có tính tẩy màu hoa tươi và làm mất màu dung dịch thuốc tím KMnO₄." },
        isOrganic: false,
        stateOfMatter: 'gas',
        hazardTypes: ["toxic","corrosive"],
        molarMass: 64.066
    },
    'HYDROGEN_SULFIDE': {
        id: 'HYDROGEN_SULFIDE',
        name: { EN: "Hydrogen Sulfide Gas (Rotten Egg Odor)", VN: "Khí Hiđro Sunfua (Mùi Trứng Thối H₂S)" },
        formula: "H₂S (g)",
        color: '#f8fafc',
        type: 'gas',
        category: 'acid',
        reactionClass: 'weak_acid',
        ph: 4.5,
        description: { EN: "Infamous rotten egg odor gas. Forms jet-black insoluble precipitates with lead (PbS) and copper (CuS).", VN: "Khí có mùi trứng thối đặc trưng. Tạo kết tủa màu đen tuyền không tan trong axit với chì (PbS) và đồng (CuS)." },
        isOrganic: false,
        stateOfMatter: 'gas',
        hazardTypes: ["toxic","flammable"],
        molarMass: 34.08
    },
    'CALCIUM_OXIDE': {
        id: 'CALCIUM_OXIDE',
        name: { EN: "Calcium Oxide (Quicklime)", VN: "Vôi Sống (Canxi Oxit CaO)" },
        formula: "CaO",
        color: '#f8fafc',
        type: 'solid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 12.5,
        description: { EN: "Caustic white solid that reacts violently and exothermically with water (lime slaking), bringing water to a boil.", VN: "Chất rắn màu trắng ăn da, phản ứng tỏa nhiệt dữ dội với nước làm sôi bùng dung dịch (phản ứng tôi vôi)." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 56.077
    },
    'ALUMINUM_OXIDE': {
        id: 'ALUMINUM_OXIDE',
        name: { EN: "Aluminum Oxide (Alumina White)", VN: "Nhôm Oxit (Al₂O₃ Lưỡng Tính)" },
        formula: "Al₂O₃",
        color: '#f1f5f9',
        type: 'solid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7,
        description: { EN: "Hard, refractory amphoteric oxide. Dissolves cleanly in both strong acids and strong alkali bases.", VN: "Oxit lưỡng tính màu trắng chịu nhiệt cao. Tan hoàn toàn trong cả axit mạnh (HCl) và kiềm mạnh (NaOH)." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 101.96
    },
    'CUPRIC_OXIDE': {
        id: 'CUPRIC_OXIDE',
        name: { EN: "Copper(II) Oxide (Tenorite Black)", VN: "Đồng(II) Oxit (Bột Đen CuO)" },
        formula: "CuO",
        color: '#0f172a',
        type: 'solid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7,
        description: { EN: "Jet-black copper oxide powder. Reduced by hot hydrogen or ethanol into brilliant reddish metallic copper.", VN: "Bột oxit đồng màu đen tuyền. Bị khử bởi khí hydro nóng hoặc hơi cồn etanol tạo thành đồng kim loại đỏ ánh kim." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 79.545
    },
    'FERRIC_OXIDE': {
        id: 'FERRIC_OXIDE',
        name: { EN: "Iron(III) Oxide (Rust Red)", VN: "Sắt(III) Oxit (Gỉ Sắt Đỏ Nâu Fe₂O₃)" },
        formula: "Fe₂O₃",
        color: '#7f1d1d',
        type: 'solid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7,
        description: { EN: "Reddish-brown rust oxide. Central component of the dazzling pyrotechnic thermite reaction with aluminum powder.", VN: "Bột gỉ sắt màu đỏ nâu. Thành phần chính trong phản ứng nhiệt nhôm chói lòa với bột nhôm Al ở 2500°C." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 159.69
    },
    'MAGNETIC_IRON_OXIDE': {
        id: 'MAGNETIC_IRON_OXIDE',
        name: { EN: "Iron(II,III) Oxide (Magnetite Black)", VN: "Oxit Sắt Từ (Magnetit Đen Fe₃O₄)" },
        formula: "Fe₃O₄",
        color: '#090d16',
        type: 'solid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7,
        description: { EN: "Naturally ferromagnetic black iron oxide formed when iron burns vigorously in pure oxygen.", VN: "Oxit sắt từ màu đen có từ tính tự nhiên, tạo thành khi đốt cháy sắt mãnh liệt trong khí oxy nguyên chất." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 231.53
    },
    'POTASSIUM_CHLORATE': {
        id: 'POTASSIUM_CHLORATE',
        name: { EN: "Potassium Chlorate Crystals", VN: "Kali Clorat (Tinh Thể KClO₃)" },
        formula: "KClO₃",
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7,
        description: { EN: "Powerful oxidizer that decomposes into oxygen and KCl. Famous for fireworks and the screaming gummy bear experiment.", VN: "Chất oxi hóa mạnh phân hủy sinh khí oxy và KCl khi đun nóng với MnO₂. Dùng trong thuốc pháo hoa." },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ["oxidizer","explosive"],
        molarMass: 122.55
    },
    'AQUA_REGIA': {
        id: 'AQUA_REGIA',
        name: { EN: "Aqua Regia (Royal Fuming Acid 3:1)", VN: "Nước Cường Toan (Axit Hoàng Gia 3:1)" },
        formula: "3HCl + HNO₃",
        color: '#d97706',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: -1,
        description: { EN: "Freshly mixed fuming yellow-orange acid concoction (3 parts HCl to 1 part HNO₃). Capable of dissolving noble Gold and Platinum.", VN: "Dung dịch axit màu vàng cam bốc khói nồng nặc (hỗn hợp 3 phần HCl và 1 phần HNO₃ đặc). Hòa tan được cả Vàng và Bạch kim." },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ["corrosive","toxic","oxidizer"],
        molarMass: 172.39
    },
    'ANILINE': {
        id: 'ANILINE',
        name: { EN: "Aniline (Phenylamine Liquid)", VN: "Anilin (Phenylamin C₆H₅NH₂)" },
        formula: "C₆H₅NH₂",
        color: '#fed7aa',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'amine',
        ph: 8.8,
        description: { EN: "Aromatic amine that forms a white precipitate of 2,4,6-tribromoaniline instantly with bromine water.", VN: "Amin thơm ít tan trong nước, tác dụng lập tức với nước brom tạo kết tủa trắng 2,4,6-tribromanilin." },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ["toxic"],
        molarMass: 93.13
    },
    'BENZENE': {
        id: 'BENZENE',
        name: { EN: "Benzene Pure Liquid", VN: "Benzen Tinh Khiết (C₆H₆)" },
        formula: "C₆H₆",
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'solvent',
        ph: 7,
        description: { EN: "Aromatic hydrocarbon with stable conjugated pi-electron ring. Undergoes electrophilic substitution with halogens.", VN: "Hiđrocacbon thơm với vòng 6 electron pi cộng hưởng siêu bền. Tham gia phản ứng thế brom xúc tác Fe." },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ["flammable","toxic"],
        molarMass: 78.11
    },
    'TOLUENE': {
        id: 'TOLUENE',
        name: { EN: "Toluene (Methylbenzene)", VN: "Toluen (Metylbenzen C₆H₅CH₃)" },
        formula: "C₆H₅CH₃",
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'solvent',
        ph: 7,
        description: { EN: "Aromatic hydrocarbon whose methyl side chain is oxidized by hot KMnO₄ into benzoic acid, decolorizing purple solution.", VN: "Hiđrocacbon thơm có nhánh metyl bị oxi hóa khi đun nóng với KMnO₄ tạo axit benzoic, làm mất màu thuốc tím." },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ["flammable","toxic"],
        molarMass: 92.14
    },
    'SUCROSE': {
        id: 'SUCROSE',
        name: { EN: "Sucrose (Cane Sugar Crystals)", VN: "Saccarozơ (Đường Mía Tinh Thể)" },
        formula: "C₁₂H₂₂O₁₁",
        color: '#f8fafc',
        type: 'solid',
        category: 'organic',
        reactionClass: 'carbohydrate',
        ph: 7,
        description: { EN: "Disaccharide sugar. Dehydrates violently in conc. H₂SO₄ into a rising steaming column of black carbon (Sugar Monster).", VN: "Đường mía disaccarit. Bị háo nước mãnh liệt bởi H₂SO₄ đặc, phun trào thành cột than cacbon đen xốp bốc khói." },
        isOrganic: true,
        stateOfMatter: 'solid',
        molarMass: 342.3
    },
    'FERROUS_SULFIDE': {
        id: 'FERROUS_SULFIDE',
        name: { EN: "Iron(II) Sulfide (Black Solid)", VN: "Sắt(II) Sunfua (Chất Rắn Đen FeS)" },
        formula: "FeS ↓",
        color: '#18181b',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: "Black insoluble sulfide synthesized from heating iron with sulfur. Dissolves in HCl to generate foul H₂S gas.", VN: "Hợp chất sunfua màu đen tuyền tạo thành khi nung sắt với lưu huỳnh. Tan trong axit HCl giải phóng khí H₂S." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 87.91
    },
    'LEAD_SULFIDE': {
        id: 'LEAD_SULFIDE',
        name: { EN: "Lead(II) Sulfide (Galena Black Precipitate)", VN: "Chì(II) Sunfua (Kết Tủa Đen PbS)" },
        formula: "PbS ↓",
        color: '#09090b',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: "Extremely insoluble jet-black precipitate formed upon testing H₂S with lead nitrate solution.", VN: "Kết tủa đen kịt cực kỳ bền vững, dấu hiệu nhận biết đặc trưng của khí H₂S với muối chì Pb(NO₃)₂." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 239.3
    },
    'COPPER_SULFIDE': {
        id: 'COPPER_SULFIDE',
        name: { EN: "Copper(II) Sulfide (Insoluble Black Precipitate)", VN: "Đồng(II) Sunfua (Kết Tủa Đen CuS)" },
        formula: "CuS ↓",
        color: '#020617',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: "Dense black precipitate insoluble even in non-oxidizing dilute acids (Ksp = 6 × 10⁻³⁶).", VN: "Kết tủa màu đen thẫm không tan ngay cả trong các axit loãng không có tính oxi hóa (Ksp = 6 × 10⁻³⁶)." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 95.61
    },
    'MERCURY_SULFIDE': {
        id: 'MERCURY_SULFIDE',
        name: { EN: "Mercury(II) Sulfide (Cinnabar Black/Red)", VN: "Thủy Ngân(II) Sunfua (Khoáng Chu Sa HgS)" },
        formula: "HgS ↓",
        color: '#450a0a',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: "Extremely stable, non-toxic mineral precipitate formed instantaneously by sweeping powdered sulfur over spilled mercury.", VN: "Hợp chất sunfua cực kỳ bền và không bay hơi, tạo thành tức thì khi rắc bột lưu huỳnh lên giọt thủy ngân rơi vãi." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 232.66
    },
    'CHROMIUM_HYDROXIDE': {
        id: 'CHROMIUM_HYDROXIDE',
        name: { EN: "Chromium(III) Hydroxide (Grey-Green Precipitate)", VN: "Crom(III) Hiđroxit (Kết Tủa Xanh Xám Lưỡng Tính)" },
        formula: "Cr(OH)₃ ↓",
        color: '#4d7c0f',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 7,
        description: { EN: "Grey-green gelatinous amphoteric precipitate that dissolves in excess NaOH to form deep green chromite solution.", VN: "Kết tủa keo màu xanh xám có tính lưỡng tính, tan trong dung dịch NaOH dư tạo dung dịch cromit màu xanh ngọc." },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 103.02
    },
    'CHROMIUM_CHLORIDE': {
        id: 'CHROMIUM_CHLORIDE',
        name: { EN: "Chromium(III) Chloride Solution", VN: "Crom(III) Clorua (Dung Dịch Tím Lục CrCl₃)" },
        formula: "CrCl₃ (aq)",
        color: '#65a30d',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 3.8,
        description: { EN: "Striking violet-green aqueous transition metal salt solution.", VN: "Dung dịch muối crom(III) có màu lục ánh tím đặc sắc của ion phức [Cr(H₂O)₆]³⁺." },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 158.36
    },
    'GOLD_CHLORIDE_COMPLEX': {
        id: 'GOLD_CHLORIDE_COMPLEX',
        name: { EN: "Chloroauric Acid Solution (Golden Aurora)", VN: "Axit Cloroauric (Dung Dịch Vàng Quý HAuCl₄)" },
        formula: "HAuCl₄ (aq)",
        color: '#eab308',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 1,
        description: { EN: "Brilliant yellow solution of tetrachloroaurate ions formed by royal dissolution of pure gold in Aqua Regia.", VN: "Dung dịch màu vàng óng ánh tuyệt đẹp của ion tetracloroaurat sinh ra khi vàng tan trong nước cường toan." },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 339.79
    },
    'SODIUM_CHROMITE': {
        id: 'SODIUM_CHROMITE',
        name: { EN: "Sodium Tetrahydroxochromate(III) (Emerald Green)", VN: "Natri Cromit (Dung Dịch Xanh Lục Bảo)" },
        formula: "Na[Cr(OH)₄] (aq)",
        color: "#10b981",
        type: "liquid",
        category: "salt",
        reactionClass: "transition_metal_salt",
        ph: 12.5,
        description: {
            EN: "Deep emerald-green alkaline complex formed when amphoteric Cr(OH)₃ dissolves in excess NaOH.",
            VN: "Dung dịch phức chất màu xanh lục bảo trong suốt tạo thành khi kết tủa Cr(OH)₃ tan trong kiềm NaOH dư."
        },
        isOrganic: false,
        stateOfMatter: "aqueous",
        molarMass: 143.01
    },
    'SrOH2': {
        id: 'SrOH2',
        name: { EN: "Strontium Hydroxide Solution", VN: "Dung Dịch Stronti Hiđroxit" },
        formula: "Sr(OH)₂ (aq)",
        color: "#f0fdf4",
        type: "liquid",
        category: "base",
        reactionClass: "strong_base",
        ph: 13.0,
        description: {
            EN: "Strong alkaline earth base formed by reacting strontium metal with water.",
            VN: "Dung dịch bazơ kiềm mạnh tạo thành khi kim loại stronti tác dụng với nước."
        },
        isOrganic: false,
        stateOfMatter: "aqueous",
        molarMass: 121.63
    },
    'SODIUM_BERYLLATE': {
        id: 'SODIUM_BERYLLATE',
        name: { EN: "Sodium Tetrahydroxoberyllate", VN: "Dung Dịch Natri Berylat" },
        formula: "Na₂[Be(OH)₄] (aq)",
        color: "#f8fafc",
        type: "liquid",
        category: "salt",
        reactionClass: "strong_base",
        ph: 12.5,
        description: {
            EN: "Clear amphoteric alkaline beryllate complex formed by dissolving beryllium in NaOH.",
            VN: "Dung dịch phức berylat lưỡng tính trong suốt tạo thành khi hòa tan beri trong NaOH."
        },
        isOrganic: false,
        stateOfMatter: "aqueous",
        molarMass: 123.02
    },
    'ZnSO4': {
        id: 'ZnSO4',
        name: { EN: "Zinc Sulfate Solution (White Vitriol)", VN: "Dung Dịch Kẽm Sunfat" },
        formula: "ZnSO₄ (aq)",
        color: "#f8fafc",
        type: "liquid",
        category: "salt",
        reactionClass: "salt",
        ph: 5.5,
        description: {
            EN: "Colorless aqueous zinc sulfate solution formed when zinc displaces copper from CuSO₄.",
            VN: "Dung dịch kẽm sunfat trong suốt không màu tạo thành khi kẽm đẩy đồng ra khỏi dung dịch CuSO₄."
        },
        isOrganic: false,
        stateOfMatter: "aqueous",
        molarMass: 161.47
    },
    'IRON_ACETATE': {
        id: 'IRON_ACETATE',
        name: { EN: "Iron Acetate Solution", VN: "Dung Dịch Sắt Axetat" },
        formula: "(CH₃COO)₂Fe (aq)",
        color: "#d97706",
        type: "liquid",
        category: "organic",
        reactionClass: "transition_metal_salt",
        ph: 4.8,
        description: {
            EN: "Amber-brown aqueous solution of iron acetate formed by reacting iron or iron hydroxides with acetic acid.",
            VN: "Dung dịch muối sắt axetat tạo thành khi hòa tan sắt hoặc hidroxit sắt trong axit axetic."
        },
        isOrganic: true,
        stateOfMatter: "aqueous",
        molarMass: 173.93
    },
    'MgO_SOLID': {
        id: 'MgO_SOLID',
        name: { EN: "Magnesium Oxide (White Ash)", VN: "Magie Oxit (Tro Trắng MgO)" },
        formula: "MgO (s)",
        color: "#f8fafc",
        type: "solid",
        category: "base",
        reactionClass: "precipitate",
        ph: 10.3,
        description: {
            EN: "Refractory white powdery oxide formed from the blinding combustion of magnesium ribbon in oxygen.",
            VN: "Chất rắn dạng bột màu trắng tạo thành sau phản ứng cháy chói lòa của magie trong khí oxy."
        },
        isOrganic: false,
        stateOfMatter: "solid",
        molarMass: 40.304
    },
    'KCl': {
        id: 'KCl',
        name: { EN: "Potassium Chloride (Sylvite)", VN: "Kali Clorua (Khoáng Sylvit)" },
        formula: "KCl (s)",
        color: "#f8fafc",
        type: "solid",
        category: "salt",
        reactionClass: "salt",
        ph: 7.0,
        description: {
            EN: "Colorless ionic salt residue formed from potassium chlorate decomposition and pyrotechnic deflagration.",
            VN: "Muối khoáng kali clorua tinh thể trắng sinh ra sau khi nhiệt phân hoặc đốt cháy kali clorat."
        },
        isOrganic: false,
        stateOfMatter: "solid",
        molarMass: 74.55
    }
};

/**
 * Pedagogically rigorous, scientifically authentic reaction rules.
 * Strictly maps stoichiometric equations, thermodynamic enthalpy, mechanisms, and real physical products.
 */
export const REACTION_RULES: ReactionRule[] = [
    // ==========================================
    // A. ALKALI METALS & WATER (Coulomb Explosion & Hydrogen Gas)
    // ==========================================
    {
        reactants: ['SODIUM', 'DISTILLED_WATER'],
        product: 'NaOH',
        products: ['NaOH', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2H₂O (l) → 2NaOH (aq) + H₂ (g) ↑',
            VN: '2Na (r) + 2H₂O (l) → 2NaOH (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Violent Exothermic Redox & Coulomb Detonation',
            VN: 'Oxi Hóa - Khử Tỏa Nhiệt Mãnh Liệt & Nổ Coulomb'
        },
        mechanism: {
            EN: 'Ultrafast electron transfer from sodium to water molecules leaves a high positive charge density on the metal surface. Electrostatic repulsion causes a nanoscale Coulomb explosion, instantly exposing fresh sodium, while evolving H₂ gas which ignites with an iconic 589 nm golden flame.',
            VN: 'Quá trình chuyển electron cực nhanh từ natri sang phân tử nước tạo mật độ điện tích dương khổng lồ trên bề mặt kim loại. Lực đẩy tĩnh điện gây nổ Coulomb cấp nano làm vỡ vụn khối natri, giải phóng khí H₂ và bốc cháy với ngọn lửa màu vàng rực rỡ đặc trưng (589 nm).'
        },
        message: {
            EN: 'Violent exothermic reaction! Metallic Sodium skitters across water with an incandescent golden flame, producing caustic Sodium Hydroxide (NaOH) and flammable Hydrogen gas (H₂).',
            VN: 'Phản ứng tỏa nhiệt dữ dội! Natri nóng chảy chạy tròn trên mặt nước với ngọn lửa vàng, tạo dung dịch kiềm Natri Hydroxit (NaOH) và khí Hydro (H₂).'
        },
        effect: 'explosion',
        temperatureSpike: 65,
        requiresPopup: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['POTASSIUM', 'DISTILLED_WATER'],
        product: 'KOH',
        products: ['KOH', 'HYDROGEN_GAS'],
        equation: {
            EN: '2K (s) + 2H₂O (l) → 2KOH (aq) + H₂ (g) ↑',
            VN: '2K (r) + 2H₂O (l) → 2KOH (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Hypergolic Alkali Metal Detonation',
            VN: 'Phản Ứng Nổ Tự Bốc Cháy Kim Loại Kiềm'
        },
        mechanism: {
            EN: 'Potassium has lower ionization energy than sodium (419 kJ/mol). Electron transfer is instantaneous, immediately igniting hydrogen with an ethereal violet/lilac flame (766 nm) and detonating with a powerful shockwave.',
            VN: 'Kali có năng lượng ion hóa thấp hơn natri (419 kJ/mol). Quá trình truyền electron diễn ra chớp nhoáng, ngay lập tức đốt cháy khí hydro với ngọn lửa màu tím tráng lệ (766 nm) và phát nổ tạo sóng xung kích cực mạnh.'
        },
        message: {
            EN: 'Hyper-exothermic reaction! Potassium ignites spontaneously with a brilliant lilac flame and detonates, yielding Potassium Hydroxide (KOH) and Hydrogen gas (H₂).',
            VN: 'Phản ứng siêu tỏa nhiệt! Kali tự bốc cháy với ngọn lửa màu tím và phát nổ dữ dội, tạo dung dịch Kali Hydroxit (KOH) và khí Hydro (H₂).'
        },
        effect: 'explosion',
        temperatureSpike: 120,
        requiresPopup: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['LITHIUM', 'DISTILLED_WATER'],
        product: 'LiOH',
        products: ['LiOH', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Li (s) + 2H₂O (l) → 2LiOH (aq) + H₂ (g) ↑',
            VN: '2Li (r) + 2H₂O (l) → 2LiOH (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Exothermic Alkali Metal Oxidation',
            VN: 'Phản Ứng Oxi Hóa Kim Loại Kiềm Tỏa Nhiệt'
        },
        mechanism: {
            EN: 'Lithium floats and steadily effervesces across the water surface, liberating H₂ gas and forming Lithium Hydroxide (LiOH) solution without spontaneous detonation due to its higher melting point.',
            VN: 'Liti nổi và sủi bọt khí hydro đều đặn trên mặt nước, tạo dung dịch Liti Hydroxit (LiOH) mà không phát nổ tự phát do có nhiệt độ nóng chảy cao hơn.'
        },
        message: {
            EN: 'Steady exothermic reaction: Lithium floats and reacts with water to produce Lithium Hydroxide (LiOH) and bubbling Hydrogen gas (H₂).',
            VN: 'Phản ứng tỏa nhiệt đều đặn: Liti nổi trên mặt nước sinh ra dung dịch LiOH kiềm và bọt khí Hydro (H₂).'
        },
        effect: 'bubbles',
        temperatureSpike: 35
    },

    // ==========================================
    // B. ALKALI & ACTIVE METALS WITH ACIDS
    // ==========================================
    {
        reactants: ['SODIUM', 'ACETIC_ACID'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2CH₃COOH (aq) → 2CH₃COONa (aq) + H₂ (g) ↑',
            VN: '2Na (r) + 2CH₃COOH (dd) → 2CH₃COONa (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Metal-Acid Single Replacement & Gas Evolution',
            VN: 'Phản Ứng Thế Kim Loại - Axit Hữu Cơ & Thoát Khí'
        },
        mechanism: {
            EN: 'Sodium metal reduces the acidic proton of the carboxyl group (-COOH) in acetic acid, generating Sodium Acetate (CH₃COONa) salt and rapid bubbling of Hydrogen gas (H₂).',
            VN: 'Kim loại Natri khử ion H⁺ trong nhóm cacboxyl (-COOH) của axit axetic, tạo muối Natri Axetat (CH₃COONa) và giải phóng bọt khí Hydro (H₂).'
        },
        message: {
            EN: 'Authentic Reaction: Sodium displaces hydrogen from Acetic Acid to form Sodium Acetate (CH₃COONa) and vigorous Hydrogen gas (H₂) effervescence.',
            VN: 'Phản ứng chuẩn xác: Natri tác dụng với Axit Axetic tạo muối Natri Axetat (CH₃COONa) và sủi bọt khí Hydro (H₂) mạnh mẽ.'
        },
        effect: 'fizz',
        temperatureSpike: 45
    },
    {
        reactants: ['SODIUM', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2HCl (aq) → 2NaCl (aq) + H₂ (g) ↑',
            VN: '2Na (r) + 2HCl (dd) → 2NaCl (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Violent Strong Acid-Metal Single Replacement',
            VN: 'Phản Ứng Thế Axit Mạnh - Kim Loại Tỏa Nhiệt Dữ Dội'
        },
        mechanism: {
            EN: 'In the presence of high concentration H⁺ ions from HCl, electron transfer from sodium occurs at explosive velocity, liberating H₂ with immediate thermal flash.',
            VN: 'Dưới nồng độ ion H⁺ cao của axit clohiđric, sự truyền electron từ natri diễn ra với tốc độ bùng nổ, giải phóng H₂ kèm theo chớp nhiệt tức thì.'
        },
        message: {
            EN: 'Violent reaction! Sodium reacts aggressively with Hydrochloric Acid to produce Sodium Chloride (NaCl) and roaring Hydrogen gas (H₂).',
            VN: 'Phản ứng dữ dội! Natri tác dụng cực mạnh với Axit Clohiđric tạo muối Natri Clorua (NaCl) và luồng khí Hydro (H₂) bùng cháy.'
        },
        effect: 'explosion',
        temperatureSpike: 85,
        requiresPopup: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['MAGNESIUM', 'HCl'],
        product: 'MgCl2',
        products: ['MgCl2', 'HYDROGEN_GAS'],
        equation: {
            EN: 'Mg (s) + 2HCl (aq) → MgCl₂ (aq) + H₂ (g) ↑',
            VN: 'Mg (r) + 2HCl (dd) → MgCl₂ (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Active Alkaline Earth Single Displacement',
            VN: 'Phản Ứng Thế Kim Loại Kiềm Thổ Với Axit'
        },
        mechanism: {
            EN: 'Magnesium metal is oxidized by hydronium ions (E° = -2.37 V), dissolving rapidly with copious effervescence of hydrogen bubbles and forming clear Magnesium Chloride solution.',
            VN: 'Dải kim loại Magie bị oxi hóa nhanh chóng bởi ion H⁺ (thế điện cực chuẩn E° = -2.37 V), sủi bọt khí Hydro cuồn cuộn và tan dần thành dung dịch Magie Clorua không màu.'
        },
        message: {
            EN: 'Magnesium ribbon dissolves vigorously in Hydrochloric Acid, generating a torrent of Hydrogen gas (H₂) bubbles and Magnesium Chloride (MgCl₂).',
            VN: 'Dải Magie tan mạnh trong Axit Clohidric, sủi bọt khí Hydro (H₂) cuồn cuộn và tạo dung dịch Magie Clorua (MgCl₂).'
        },
        effect: 'bubbles',
        temperatureSpike: 30
    },
    {
        reactants: ['ZINC', 'HCl'],
        product: 'ZnCl2',
        products: ['ZnCl2', 'HYDROGEN_GAS'],
        equation: {
            EN: 'Zn (s) + 2HCl (aq) → ZnCl₂ (aq) + H₂ (g) ↑',
            VN: 'Zn (r) + 2HCl (dd) → ZnCl₂ (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Zinc Acid Displacement & Laboratory H₂ Generation',
            VN: 'Điều Chế Khí Hydro Trong Phòng Thí Nghiệm Từ Kẽm'
        },
        mechanism: {
            EN: 'Standard laboratory preparation of hydrogen gas: Zinc metal is oxidized by hydrochloric acid (E° = -0.76 V), steadily releasing gaseous H₂ and yielding clear Zinc Chloride (ZnCl₂).',
            VN: 'Phương pháp kinh điển điều chế khí Hydro trong phòng thí nghiệm: Kẽm tác dụng với axit clohidric, giải phóng đều đặn các bọt khí Hydro và tạo dung dịch ZnCl₂.'
        },
        message: {
            EN: 'Zinc granules react steadily with Hydrochloric Acid to evolve continuous Hydrogen gas (H₂) and form Zinc Chloride (ZnCl₂).',
            VN: 'Hạt kẽm phản ứng đều đặn với Axit Clohidric, sinh dòng khí Hydro (H₂) liên tục và dung dịch Kẽm Clorua (ZnCl₂).'
        },
        effect: 'bubbles',
        temperatureSpike: 22
    },
    {
        reactants: ['ALUMINUM', 'HCl'],
        product: 'AlCl3',
        products: ['AlCl3', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Al (s) + 6HCl (aq) → 2AlCl₃ (aq) + 3H₂ (g) ↑',
            VN: '2Al (r) + 6HCl (dd) → 2AlCl₃ (dd) + 3H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Vigorous Aluminum Dissolution & Hydrogen Evolution',
            VN: 'Nhôm Tác Dụng Axit Clohidric Giải Phóng Hydro'
        },
        mechanism: {
            EN: 'After initial disruption of the protective oxide coating, aluminum reacts strongly with hydrochloric acid in a highly exothermic reaction, generating aluminum chloride and rapid streams of H₂ gas.',
            VN: 'Sau khi lớp màng oxit bảo vệ bị phá vỡ, nhôm phản ứng mãnh liệt và tỏa nhiệt cao với axit clohidric, tạo dung dịch AlCl₃ và các luồng bọt khí Hydro bốc lên mạnh mẽ.'
        },
        message: {
            EN: 'Exothermic displacement: Aluminum reacts vigorously with Hydrochloric Acid to synthesize Aluminum Chloride (AlCl₃) and boiling streams of Hydrogen (H₂).',
            VN: 'Phản ứng thế tỏa nhiệt: Nhôm tan mạnh trong Axit Clohidric sinh ra muối Nhôm Clorua (AlCl₃) và luồng khí Hydro (H₂) sôi trào.'
        },
        effect: 'fizz',
        temperatureSpike: 48
    },
    {
        reactants: ['IRON', 'HCl'],
        product: 'FeCl2',
        products: ['FeCl2', 'HYDROGEN_GAS'],
        equation: {
            EN: 'Fe (s) + 2HCl (aq) → FeCl₂ (aq) + H₂ (g) ↑',
            VN: 'Fe (r) + 2HCl (dd) → FeCl₂ (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Iron(II) Chloride Synthesis (Non-Oxidizing Acid)',
            VN: 'Sắt Tác Dụng Axit Clohidric Tạo Muối Sắt(II)'
        },
        mechanism: {
            EN: 'Non-oxidizing acids like HCl only oxidize elemental iron to the +2 oxidation state (Iron(II) Chloride, FeCl₂), releasing hydrogen gas. FeCl₃ is NOT formed without a strong oxidizer!',
            VN: 'Axit không có tính oxy hóa mạnh như HCl chỉ oxy hóa sắt lên số oxy hóa +2, tạo dung dịch muối Sắt(II) Clorua (FeCl₂) màu xanh lục nhạt và khí H₂. Tuyệt đối không tạo muối Sắt(III)!'
        },
        message: {
            EN: 'Accurate Chemistry: Iron reacts with Hydrochloric Acid to produce pale green Iron(II) Chloride (FeCl₂) and bubbling Hydrogen gas (H₂).',
            VN: 'Phản ứng chính xác: Sắt tan trong Axit Clohidric tạo dung dịch Sắt(II) Clorua (FeCl₂) màu xanh lục nhạt và sủi bọt khí Hydro (H₂).'
        },
        effect: 'bubbles',
        productColor: '#bbf7d0',
        temperatureSpike: 18
    },
    {
        reactants: ['IRON', 'H2SO4'],
        product: 'FeSO4',
        products: ['FeSO4', 'HYDROGEN_GAS'],
        equation: {
            EN: 'Fe (s) + H₂SO₄ (aq, dilute) → FeSO₄ (aq) + H₂ (g) ↑',
            VN: 'Fe (r) + H₂SO₄ (dd loãng) → FeSO₄ (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Green Vitriol Synthesis (Iron(II) Sulfate)',
            VN: 'Điều Chế Dung Dịch Phèn Xanh Sắt(II) Sunfat'
        },
        mechanism: {
            EN: 'Dilute sulfuric acid oxidizes iron to pale jade-green Iron(II) sulfate (FeSO₄) while effervescing hydrogen gas.',
            VN: 'Axit sunfuric loãng tác dụng với mạt sắt tạo dung dịch muối Sắt(II) sunfat (FeSO₄) có màu xanh lục ngọc bích nhạt và sủi bọt khí hydro.'
        },
        message: {
            EN: 'Iron dissolves in dilute Sulfuric Acid to form pale jade-green Iron(II) Sulfate (FeSO₄) and Hydrogen gas (H₂).',
            VN: 'Sắt tan trong Axit Sunfuric loãng tạo dung dịch muối Sắt(II) Sunfat (FeSO₄) màu xanh lục ngọc bích và bọt khí Hydro.'
        },
        effect: 'bubbles',
        productColor: '#86efac',
        temperatureSpike: 20
    },

    // ==========================================
    // C. DISPLACEMENT & METAL-ION REDOX
    // ==========================================
    {
        reactants: ['IRON', 'CuSO4'],
        product: 'FeSO4',
        products: ['FeSO4', 'COPPER'],
        equation: {
            EN: 'Fe (s) + CuSO₄ (aq) → FeSO₄ (aq) + Cu (s) ↓ (Copper Plating on Iron)',
            VN: 'Fe (r) + CuSO₄ (dd) → FeSO₄ (dd) + Cu (r) ↓ (Đồng Kim Loại Bám Lên Đinh Sắt)'
        },
        reactionType: {
            EN: 'Electrochemical Activity Series Displacement',
            VN: 'Phản Ứng Dãy Điện Hóa Kim Loại - Sắt Đẩy Đồng'
        },
        mechanism: {
            EN: 'Since iron is more electropositive than copper (E° Fe²⁺/Fe = -0.44 V vs Cu²⁺/Cu = +0.34 V), iron atoms reduce Cu²⁺ ions. Lustrous reddish copper metal plates onto the iron nail while the brilliant blue CuSO₄ fades into pale jade-green FeSO₄!',
            VN: 'Do sắt đứng trước đồng trong dãy điện hóa, sắt khử ion Cu²⁺. Lớp kim loại đồng màu đỏ ánh kim bám chặt ngoài đinh sắt, trong khi màu xanh lam rực rỡ của CuSO₄ nhạt dần và chuyển sang màu xanh lục nhạt của FeSO₄!'
        },
        message: {
            EN: 'Classic Metal Displacement: Iron reduces Copper(II) Sulfate, plating metallic copper onto the iron as the blue solution turns pale jade-green!',
            VN: 'Thí nghiệm kinh điển: Đinh sắt tác dụng với dung dịch CuSO₄, kim loại đồng màu đỏ bám trên đinh sắt và dung dịch chuyển từ xanh lam sang xanh lục nhạt!'
        },
        effect: 'color_shift',
        productColor: '#86efac',
        temperatureSpike: 15,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['ZINC', 'CuSO4'],
        product: 'ZnSO4',
        products: ['ZnSO4', 'COPPER'],
        equation: {
            EN: 'Zn (s) + CuSO₄ (aq) → ZnSO₄ (aq) + Cu (s) ↓ (Decolorization & Copper Precipitation)',
            VN: 'Zn (r) + CuSO₄ (dd) → ZnSO₄ (dd) + Cu (r) ↓ (Mất Màu Xanh & Kết Tủa Đồng Đỏ)'
        },
        reactionType: {
            EN: 'Zinc-Copper Displacement & Decolorization',
            VN: 'Kẽm Đẩy Đồng & Làm Mất Màu Dung Dịch CuSO₄'
        },
        mechanism: {
            EN: 'Zinc spontaneously reduces copper(II) ions, depositing spongy reddish-brown metallic copper while the deep blue solution turns completely colorless ZnSO₄.',
            VN: 'Kẽm đẩy đồng ra khỏi dung dịch CuSO₄, sinh kết tủa đồng màu đỏ xốp và dung dịch màu xanh lam chuyển thành không màu ZnSO₄.'
        },
        message: {
            EN: 'Zinc reduces Copper(II) Sulfate, precipitating reddish metallic copper and completely discharging the blue color to colorless solution.',
            VN: 'Kẽm khử ion đồng, kết tủa kim loại đồng màu đỏ và làm mất màu xanh lam của dung dịch.'
        },
        effect: 'precipitate',
        productColor: '#f8fafc',
        temperatureSpike: 25
    },

    // ==========================================
    // D. NITRIC ACID & COPPER REDOX (NO2 GAS FUMES)
    // ==========================================
    {
        reactants: ['COPPER', 'HNO3'],
        product: 'CuNO3_2',
        products: ['CuNO3_2', 'NO2_GAS'],
        equation: {
            EN: 'Cu (s) + 4HNO₃ (conc) → Cu(NO₃)₂ (aq) + 2NO₂ (g) ↑ + 2H₂O (l)',
            VN: 'Cu (r) + 4HNO₃ (đặc) → Cu(NO₃)₂ (dd) + 2NO₂ (k) ↑ + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Concentrated Nitric Acid Oxidation & Brown NO₂ Evolution',
            VN: 'Oxi Hóa Kim Loại Bằng Axit Nitric Đặc & Thoát Khí Nâu Đỏ NO₂'
        },
        mechanism: {
            EN: 'Copper is insoluble in non-oxidizing acids, but concentrated HNO₃ acts as a powerful oxidizer. Nitrate ions are reduced to nitrogen dioxide (NO₂), emitting dense, pungent reddish-brown fumes while the liquid boils into a splendid azure/emerald-blue Copper(II) nitrate solution.',
            VN: 'Đồng không tan trong axit thông thường, nhưng tan mạnh trong HNO₃ đặc có tính oxy hóa mạnh. Ion nitrat bị khử thành khí nitơ đioxit (NO₂) bốc lên cuồn cuộn với màu nâu đỏ đặc trưng và mùi hắc, dung dịch chuyển sang màu xanh lam sapphire tuyệt đẹp.'
        },
        message: {
            EN: 'Spectacular Oxidation: Copper dissolves in concentrated Nitric Acid, erupting with dense reddish-brown Nitrogen Dioxide (NO₂) fumes and forming azure Copper(II) Nitrate (Cu(NO₃)₂)!',
            VN: 'Phản ứng ngoạn mục: Đồng tan trong Axit Nitric đặc, bốc khói màu nâu đỏ NO₂ ngùn ngụt và dung dịch chuyển sang màu xanh lam ngọc tuyệt đẹp!'
        },
        effect: 'smoke',
        productColor: '#0284c7',
        temperatureSpike: 60,
        requiresPopup: true,
        hazardLevel: 'DANGER'
    },

    // ==========================================
    // E. AMPHOTERIC ALUMINUM & ALUMINA REACTIONS
    // ==========================================
    {
        reactants: ['ALUMINUM', 'NaOH'],
        product: 'SODIUM_ALUMINATE',
        products: ['SODIUM_ALUMINATE', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Al (s) + 2NaOH (aq) + 6H₂O (l) → 2Na[Al(OH)₄] (aq) + 3H₂ (g) ↑',
            VN: '2Al (r) + 2NaOH (dd) + 6H₂O (l) → 2Na[Al(OH)₄] (dd) + 3H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Amphoteric Aluminum Alkaline Dissolution',
            VN: 'Tính Chất Lưỡng Tính Của Nhôm - Tan Trong Dung Dịch Kiềm'
        },
        mechanism: {
            EN: 'Hydroxide ions dissolve the protective amphoteric oxide film, enabling direct oxidation of metallic aluminum by water in alkaline medium, vigorously releasing H₂ gas and synthesizing clear Sodium Tetrahydroxoaluminate.',
            VN: 'Ion OH⁻ hòa tan lớp màng oxit lưỡng tính bảo vệ, cho phép nhôm tác dụng với nước trong môi trường kiềm, giải phóng lượng lớn bọt khí H₂ sôi sùng sục và tạo phức chất Natri Aluminat tan trong suốt.'
        },
        message: {
            EN: 'Amphoteric reaction: Aluminum reacts aggressively with Sodium Hydroxide, effervescing torrents of Hydrogen gas (H₂) to form clear Sodium Aluminate solution.',
            VN: 'Tính chất lưỡng tính: Nhôm tan mạnh trong dung dịch kiềm NaOH, sủi bọt khí Hydro (H₂) cuồn cuộn và tạo dung dịch Natri Aluminat trong suốt.'
        },
        effect: 'fizz',
        temperatureSpike: 55,
        requiresPopup: true,
        hazardLevel: 'WARNING'
    },
    {
        reactants: ['AlCl3', 'NaOH'],
        product: 'AlOH3_PRECIPITATE',
        products: ['AlOH3_PRECIPITATE', 'NaCl'],
        equation: {
            EN: 'AlCl₃ (aq) + 3NaOH (aq) → Al(OH)₃ (s) ↓ + 3NaCl (aq) (Gelatinous White Precipitate)',
            VN: 'AlCl₃ (dd) + 3NaOH (dd) → Al(OH)₃ (r) ↓ + 3NaCl (dd) (Kết Tủa Keo Trắng)'
        },
        reactionType: {
            EN: 'Aluminum Hydroxide Gelatinous Precipitation',
            VN: 'Tạo Kết Tủa Keo Trắng Nhôm Hydroxit'
        },
        mechanism: {
            EN: 'Stoichiometric addition of hydroxide to aluminum chloride precipitates insoluble, gelatinous amphoteric Aluminum Hydroxide (Al(OH)₃).',
            VN: 'Rót vừa đủ dung dịch kiềm vào muối nhôm tạo kết tủa keo trắng Al(OH)₃ đặc trưng.'
        },
        message: {
            EN: 'Precipitation: Aluminum Chloride reacts with Sodium Hydroxide to form a thick, gelatinous white Aluminum Hydroxide (Al(OH)₃) precipitate.',
            VN: 'Phản ứng tạo kết tủa: Muối AlCl₃ tác dụng với NaOH sinh ra kết tủa dạng keo trắng Al(OH)₃.'
        },
        effect: 'precipitate',
        precipitateColor: '#e2e8f0',
        temperatureSpike: 15
    },
    {
        reactants: ['AlOH3_PRECIPITATE', 'NaOH'],
        product: 'SODIUM_ALUMINATE',
        products: ['SODIUM_ALUMINATE'],
        equation: {
            EN: 'Al(OH)₃ (s) + NaOH (aq) → Na[Al(OH)₄] (aq) (Redissolution of Precipitate)',
            VN: 'Al(OH)₃ (r) + NaOH (dd) → Na[Al(OH)₄] (dd) (Hòa Tan Kết Tủa Trong Kiềm Dư)'
        },
        reactionType: {
            EN: 'Amphoteric Hydroxide Alkaline Redissolution',
            VN: 'Hòa Tan Kết Tủa Keo Lưỡng Tính Bằng Kiềm Dư'
        },
        mechanism: {
            EN: 'Due to its amphoteric nature, insoluble Al(OH)₃ acts as a Lewis acid and coordinates with excess hydroxide to form soluble tetrahydroxoaluminate anions [Al(OH)₄]⁻, turning the milky suspension completely clear!',
            VN: 'Do tính chất lưỡng tính, kết tủa keo trắng Al(OH)₃ đóng vai trò axit và tiếp tục nhận ion OH⁻ để tan hoàn toàn thành dung dịch phức [Al(OH)₄]⁻ trong suốt!'
        },
        message: {
            EN: 'Amphoteric Redissolution: Excess Sodium Hydroxide completely dissolves the white Al(OH)₃ precipitate into clear Sodium Aluminate solution!',
            VN: 'Hòa tan lưỡng tính: Dung dịch NaOH dư hòa tan hoàn toàn kết tủa keo trắng Al(OH)₃ thành dung dịch trong suốt!'
        },
        effect: 'color_shift',
        productColor: '#f8fafc',
        temperatureSpike: 12
    },
    {
        reactants: ['AlOH3_PRECIPITATE', 'HCl'],
        product: 'AlCl3',
        products: ['AlCl3'],
        equation: {
            EN: 'Al(OH)₃ (s) + 3HCl (aq) → AlCl₃ (aq) + 3H₂O (l) (Acid Dissolution)',
            VN: 'Al(OH)₃ (r) + 3HCl (dd) → AlCl₃ (dd) + 3H₂O (l) (Hòa Tan Kết Tủa Trong Axit)'
        },
        reactionType: {
            EN: 'Amphoteric Hydroxide Acid Neutralization',
            VN: 'Hòa Tan Kết Tủa Lưỡng Tính Bằng Axit'
        },
        mechanism: {
            EN: 'The gelatinous aluminum hydroxide acts as a base and dissolves rapidly upon addition of hydrochloric acid, regenerating clear aluminum chloride solution.',
            VN: 'Kết tủa keo trắng Al(OH)₃ đóng vai trò bazơ bị axit clohidric trung hòa và tan hoàn toàn tạo dung dịch AlCl₃ trong suốt.'
        },
        message: {
            EN: 'Acid Dissolution: Aluminum Hydroxide precipitate readily dissolves in Hydrochloric Acid to yield clear Aluminum Chloride.',
            VN: 'Hòa tan trong axit: Kết tủa Al(OH)₃ tan nhanh chóng trong Axit Clohidric tạo dung dịch muối AlCl₃ trong suốt.'
        },
        effect: 'color_shift',
        productColor: '#f8fafc',
        temperatureSpike: 14
    },

    // ==========================================
    // F. "GOLDEN RAIN" & LEAD IODIDE CRYSTALS
    // ==========================================
    {
        reactants: ['PbNO3_2', 'KI'],
        product: 'PbI2_PRECIPITATE',
        products: ['PbI2_PRECIPITATE', 'KNO3'],
        equation: {
            EN: 'Pb(NO₃)₂ (aq) + 2KI (aq) → PbI₂ (s) ↓ + 2KNO₃ (aq) ("Golden Rain" Glitter)',
            VN: 'Pb(NO₃)₂ (dd) + 2KI (dd) → PbI₂ (r) ↓ + 2KNO₃ (dd) (Hiện Tượng Mưa Vàng Lấp Lánh)'
        },
        reactionType: {
            EN: 'Golden Rain Crystallization (Lead(II) Iodide)',
            VN: 'Thí Nghiệm "Mưa Vàng" Tinh Thể Chì(II) Iodua'
        },
        mechanism: {
            EN: 'Lead cations (Pb²⁺) and iodide anions (I⁻) immediately precipitate as Lead(II) Iodide. Upon heating and cooling, it recrystallizes into hexagonal golden glittering platelets that drift through the solution like shimmering gold dust ("Golden Rain").',
            VN: 'Ion Pb²⁺ kết hợp với ion I⁻ tạo kết tủa Chì(II) Iodua (PbI₂). Khi kết tinh, chất tạo thành các tinh thể hình vảy lục giác màu vàng kim lấp lánh chao lượn trong lòng dung dịch hệt như cơn mưa vàng lộng lẫy.'
        },
        message: {
            EN: 'The Famous "Golden Rain" Reaction: Clear Lead(II) Nitrate and Potassium Iodide instantly precipitate shimmering, golden crystalline Lead(II) Iodide (PbI₂)!',
            VN: 'Thí nghiệm "Mưa Vàng" kinh điển: Trộn hai dung dịch trong suốt Pb(NO₃)₂ và KI ngay lập tức làm kết tủa các tinh thể PbI₂ màu vàng óng ánh như bụi vàng!'
        },
        effect: 'precipitate',
        precipitateColor: '#eab308',
        temperatureSpike: 12,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },

    // ==========================================
    // G. LIMEWATER TEST & CARBON DIOXIDE CONFIRMATION
    // ==========================================
    {
        reactants: ['CaOH2', 'CARBON_DIOXIDE'],
        product: 'CaCO3_PRECIPITATE',
        products: ['CaCO3_PRECIPITATE'],
        equation: {
            EN: 'Ca(OH)₂ (aq) + CO₂ (g) → CaCO₃ (s) ↓ + H₂O (l) (Limewater Milky Clouding)',
            VN: 'Ca(OH)₂ (dd) + CO₂ (k) → CaCO₃ (r) ↓ + H₂O (l) (Làm Đục Nước Vôi Trong)'
        },
        reactionType: {
            EN: 'Limewater Test for Carbon Dioxide Gas',
            VN: 'Thí Nghiệm Nhận Biết Khí CO₂ Bằng Nước Vôi Trong'
        },
        mechanism: {
            EN: 'The definitive analytical test for carbon dioxide: CO₂ dissolves into limewater (clear calcium hydroxide), reacting to form insoluble Calcium Carbonate chalk particles that cloud the solution milky white.',
            VN: 'Thí nghiệm nhận biết khí CO₂ chuẩn mực: Khí cacbonic sục vào nước vôi trong tác dụng tạo các hạt kết tủa canxi cacbonat (CaCO₃) mịn lơ lửng, làm dung dịch chuyển sang vẩn đục màu trắng sữa.'
        },
        message: {
            EN: 'Limewater Test Positive: Carbon Dioxide gas reacts with Calcium Hydroxide, clouding the clear solution with a milky white Calcium Carbonate (CaCO₃) precipitate!',
            VN: 'Nhận biết thành công: Khí CO₂ phản ứng với nước vôi trong Ca(OH)₂ làm dung dịch vẩn đục màu trắng sữa do tạo kết tủa canxi cacbonat (CaCO₃)!'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 8,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['BaOH2', 'CARBON_DIOXIDE'],
        product: 'BaCO3_PRECIPITATE',
        products: ['BaCO3_PRECIPITATE'],
        equation: {
            EN: 'Ba(OH)₂ (aq) + CO₂ (g) → BaCO₃ (s) ↓ + H₂O (l) (Barium Carbonate Clouding)',
            VN: 'Ba(OH)₂ (dd) + CO₂ (k) → BaCO₃ (r) ↓ + H₂O (l) (Tạo Kết Tủa Trắng Bari Cacbonat)'
        },
        reactionType: {
            EN: 'Baryta Water Carbon Dioxide Absorption',
            VN: 'Nước Barit Hấp Thụ Khí Cacbonic Tạo Kết Tủa Trắng'
        },
        mechanism: {
            EN: 'Carbon dioxide reacts with clear barium hydroxide (baryta water) to precipitate dense, insoluble white barium carbonate.',
            VN: 'Khí CO₂ sục vào dung dịch nước barit Ba(OH)₂ tạo kết tủa trắng Bari Cacbonat (BaCO₃).'
        },
        message: {
            EN: 'Baryta Water Test: Carbon Dioxide gas turns clear Barium Hydroxide cloudy with a dense white Barium Carbonate (BaCO₃) precipitate.',
            VN: 'Khí CO₂ phản ứng với nước barit Ba(OH)₂ tạo kết tủa trắng Bari Cacbonat (BaCO₃).'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 10
    },
    {
        reactants: ["CaCO3_PRECIPITATE", "HCl"],
        product: "SALT_WATER",
        products: ["SALT_WATER", "CARBON_DIOXIDE"],
        equation: {
            EN: "CaCO₃ (s) + 2HCl (aq) → CaCl₂ (aq) + H₂O (l) + CO₂ (g) ↑",
            VN: "CaCO₃ (r) + 2HCl (dd) → CaCl₂ (dd) + H₂O (l) + CO₂ (k) ↑"
        },
        reactionType: {
            EN: "Carbonate Precipitate Acid Dissolution & Effervescence",
            VN: "Hòa Tan Kết Tủa Đá Vôi CaCO₃ Trong Axit Sủi Bọt Khí CO₂"
        },
        mechanism: {
            EN: "Hydronium ions protonate carbonate anions in the insoluble CaCO₃ lattice, dissolving the milky white precipitate into clear CaCl₂ while releasing brisk CO₂ gas bubbles.",
            VN: "Ion H⁺ tấn công ion CO₃²⁻ trong mạng tinh thể CaCO₃, hòa tan hoàn toàn kết tủa trắng đục thành dung dịch CaCl₂ trong suốt kèm theo sủi bọt khí CO₂ mãnh liệt."
        },
        message: {
            EN: "Precipitate Dissolved! Milky white Calcium Carbonate dissolves in HCl with vigorous CO₂ effervescence!",
            VN: "Tan kết tủa! Kết tủa trắng CaCO₃ tan hoàn toàn trong axit HCl và sủi bọt khí CO₂!"
        },
        effect: "bubbles",
        productColor: "#e0f2fe",
        temperatureSpike: 10
    },
    {
        reactants: ["BaCO3_PRECIPITATE", "HCl"],
        product: "BaCl2",
        products: ["BaCl2", "CARBON_DIOXIDE"],
        equation: {
            EN: "BaCO₃ (s) + 2HCl (aq) → BaCl₂ (aq) + H₂O (l) + CO₂ (g) ↑",
            VN: "BaCO₃ (r) + 2HCl (dd) → BaCl₂ (dd) + H₂O (l) + CO₂ (k) ↑"
        },
        reactionType: {
            EN: "Analytical Distinction: BaCO₃ Dissolves in Acid (Unlike BaSO₄)",
            VN: "Phân Biệt Kết Tủa Bari: BaCO₃ Tan Trong Axit Sủi Bọt Khí (Khác Với BaSO₄)"
        },
        mechanism: {
            EN: "Unlike Barium Sulfate (BaSO₄) which is completely impervious to mineral acids, Barium Carbonate (BaCO₃) readily dissolves in HCl with vigorous CO₂ gas evolution.",
            VN: "Khác với kết tủa BaSO₄ không tan trong bất kỳ axit nào, kết tủa trắng BaCO₃ tan dễ dàng trong dung dịch HCl kèm hiện tượng sủi bọt khí CO₂."
        },
        message: {
            EN: "Analytical Test: White BaCO₃ precipitate dissolves completely in HCl with CO₂ bubbling!",
            VN: "Phân biệt chuẩn xác: Kết tủa trắng BaCO₃ tan hoàn toàn trong HCl và sủi bọt khí CO₂!"
        },
        effect: "bubbles",
        productColor: "#e0f2fe",
        temperatureSpike: 10
    },

    // ==========================================
    // H. SWISS REAGENT & AMMONIA COMPLEXES
    // ==========================================
    {
        reactants: ['CuSO4', 'NH3_AQ'],
        product: 'TETRAAMMINE_COPPER',
        products: ['TETRAAMMINE_COPPER'],
        equation: {
            EN: 'CuSO₄ (aq) + 4NH₃ (aq) → [Cu(NH₃)₄]SO₄ (aq) (Deep Royal Blue Complex)',
            VN: 'CuSO₄ (dd) + 4NH₃ (dd) → [Cu(NH₃)₄]SO₄ (dd) (Phức Màu Xanh Thẫm Swiss)'
        },
        reactionType: {
            EN: 'Tetraamminecopper(II) Complexation (Schweizer\'s Reagent)',
            VN: 'Tạo Phức Đồng Tứ Ammin Xanh Thẫm Hoàng Gia (Thuốc Thử Schweizer)'
        },
        mechanism: {
            EN: 'Ammonia molecules act as neutral monodentate ligands with lone electron pairs, displacing water molecules in the copper coordination sphere to form the square planar tetraamminecopper(II) cation [Cu(NH₃)₄]²⁺, exhibiting an intense, mesmerizing royal-blue color.',
            VN: 'Phân tử amoniac dùng cặp electron tự do phối trí vào ion Cu²⁺, thay thế các phân tử nước để tạo phức tứ diện vuông [Cu(NH₃)₄]²⁺ có màu xanh lam thẫm hoàng gia vô cùng rực rỡ (thuốc thử Schweizer dùng để hòa tan xenlulozo).'
        },
        message: {
            EN: 'Spectacular Complexation: Ammonia coordinates with Copper(II) to produce the legendary, breathtaking deep royal-blue Schweizer\'s Reagent ([Cu(NH₃)₄]²⁺)!',
            VN: 'Phản ứng tạo phức ngoạn mục: Amoniac tạo phức với ion Đồng(II) chuyển màu dung dịch thành màu xanh lam thẫm hoàng gia tráng lệ của thuốc thử Schweizer!'
        },
        effect: 'color_shift',
        productColor: '#1d4ed8',
        temperatureSpike: 16
    },
    {
        reactants: ['CuOH2_PRECIPITATE', 'NH3_AQ'],
        product: 'TETRAAMMINE_COPPER',
        products: ['TETRAAMMINE_COPPER'],
        equation: {
            EN: 'Cu(OH)₂ (s) + 4NH₃ (aq) → [Cu(NH₃)₄](OH)₂ (aq) (Precipitate Dissolution)',
            VN: 'Cu(OH)₂ (r) + 4NH₃ (dd) → [Cu(NH₃)₄](OH)₂ (dd) (Hòa Tan Kết Tủa Tạo Phức Xanh Thẫm)'
        },
        reactionType: {
            EN: 'Copper Hydroxide Ammonia Complex Dissolution',
            VN: 'Hòa Tan Kết Tủa Đồng Hydroxit Bằng Amoniac'
        },
        mechanism: {
            EN: 'Insoluble light blue Cu(OH)₂ precipitate dissolves completely upon addition of excess aqueous ammonia, yielding the lustrous deep royal blue [Cu(NH₃)₄]²⁺ solution.',
            VN: 'Kết tủa Cu(OH)₂ màu xanh lơ tan hoàn toàn trong dung dịch amoniac dư, biến thành dung dịch phức màu xanh thẫm tráng lệ.'
        },
        message: {
            EN: 'Complex Dissolution: Excess ammonia dissolves the light blue Copper Hydroxide precipitate into a transparent deep royal blue complex solution!',
            VN: 'Hòa tan tạo phức: Amoniac dư hòa tan kết tủa Cu(OH)₂ màu xanh nhạt thành dung dịch phức màu xanh lam thẫm tuyệt đẹp!'
        },
        effect: 'color_shift',
        productColor: '#1d4ed8',
        temperatureSpike: 14
    },
    {
        reactants: ['AgCl_PRECIPITATE', 'NH3_AQ'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'AgCl (s) + 2NH₃ (aq) → [Ag(NH₃)₂]⁺ (aq) + Cl⁻ (aq) (Curdy White Dissolution)',
            VN: 'AgCl (r) + 2NH₃ (dd) → [Ag(NH₃)₂]⁺ (dd) + Cl⁻ (dd) (Hòa Tan Kết Tủa Bạc Clorua)'
        },
        reactionType: {
            EN: 'Diamminesilver(I) Complex Dissolution',
            VN: 'Hòa Tan Kết Tủa Bạc Clorua Tạo Phức Bạc Ammin Tan'
        },
        mechanism: {
            EN: 'Insoluble curdy white AgCl readily dissolves in dilute aqueous ammonia due to the formation of the highly stable, linear diamminesilver(I) complex cation [Ag(NH₃)₂]⁺.',
            VN: 'Kết tủa trắng vón AgCl tan dễ dàng trong dung dịch amoniac nhờ tạo phức chất thẳng bền [Ag(NH₃)₂]⁺ không màu.'
        },
        message: {
            EN: 'Complex Dissolution: Curdy white Silver Chloride precipitate dissolves completely in aqueous ammonia to form soluble Diamminesilver(I).',
            VN: 'Hòa tan kết tủa: Kết tủa trắng vón AgCl tan hoàn toàn trong dung dịch amoniac tạo phức tan trong suốt [Ag(NH₃)₂]⁺.'
        },
        effect: 'color_shift',
        productColor: '#f8fafc',
        temperatureSpike: 8
    },

    // ==========================================
    // I. IRON HYDROXIDES & REDOX COLOR PROGRESSION
    // ==========================================
    {
        reactants: ['FeCl2', 'NaOH'],
        product: 'FeOH2_PRECIPITATE',
        products: ['FeOH2_PRECIPITATE', 'NaCl'],
        equation: {
            EN: 'FeCl₂ (aq) + 2NaOH (aq) → Fe(OH)₂ (s) ↓ + 2NaCl (aq) (Dirty-Green Precipitate)',
            VN: 'FeCl₂ (dd) + 2NaOH (dd) → Fe(OH)₂ (r) ↓ + 2NaCl (dd) (Kết Tủa Trắng Xanh)'
        },
        reactionType: {
            EN: 'Iron(II) Hydroxide Precipitation',
            VN: 'Tạo Kết Tủa Trắng Xanh Sắt(II) Hydroxit'
        },
        mechanism: {
            EN: 'Reaction of iron(II) cations with hydroxide ions immediately precipitates gelatinous dirty-green / pale green Iron(II) Hydroxide (Fe(OH)₂).',
            VN: 'Ion Fe²⁺ tác dụng với ion OH⁻ tạo kết tủa màu trắng xanh đặc trưng của Sắt(II) hidroxit Fe(OH)₂.'
        },
        message: {
            EN: 'Iron(II) Chloride reacts with Sodium Hydroxide to form a characteristic dirty-green Iron(II) Hydroxide (Fe(OH)₂) precipitate.',
            VN: 'Muối Sắt(II) Clorua tác dụng với kiềm NaOH sinh kết tủa Fe(OH)₂ màu trắng xanh đặc trưng.'
        },
        effect: 'precipitate',
        precipitateColor: '#4ade80',
        temperatureSpike: 15
    },
    {
        reactants: ['FeSO4', 'NaOH'],
        product: 'FeOH2_PRECIPITATE',
        products: ['FeOH2_PRECIPITATE', 'Na2SO4'],
        equation: {
            EN: 'FeSO₄ (aq) + 2NaOH (aq) → Fe(OH)₂ (s) ↓ + Na₂SO₄ (aq)',
            VN: 'FeSO₄ (dd) + 2NaOH (dd) → Fe(OH)₂ (r) ↓ + Na₂SO₄ (dd)'
        },
        reactionType: {
            EN: 'Iron(II) Sulfate Alkaline Precipitation',
            VN: 'Tạo Kết Tủa Fe(OH)₂ Từ Sắt(II) Sunfat'
        },
        mechanism: {
            EN: 'Iron(II) sulfate reacts with sodium hydroxide to precipitate pale-green Fe(OH)₂.',
            VN: 'Dung dịch FeSO₄ tác dụng với NaOH tạo kết tủa trắng xanh Fe(OH)₂.'
        },
        message: {
            EN: 'Precipitation: Iron(II) Sulfate forms a dirty pale-green Iron(II) Hydroxide (Fe(OH)₂) precipitate with Sodium Hydroxide.',
            VN: 'Tạo kết tủa: FeSO₄ tác dụng với NaOH sinh kết tủa trắng xanh Fe(OH)₂.'
        },
        effect: 'precipitate',
        precipitateColor: '#4ade80',
        temperatureSpike: 15
    },
    {
        reactants: ['FeOH2_PRECIPITATE', 'O2'],
        product: 'FeOH3_PRECIPITATE',
        products: ['FeOH3_PRECIPITATE'],
        equation: {
            EN: '4Fe(OH)₂ (s) + O₂ (g) + 2H₂O (l) → 4Fe(OH)₃ (s) ↓ (Air Oxidation to Rust Red-Brown)',
            VN: '4Fe(OH)₂ (r) + O₂ (k) + 2H₂O (l) → 4Fe(OH)₃ (r) ↓ (Oxi Hóa Trong Không Khí Thành Nâu Đỏ)'
        },
        reactionType: {
            EN: 'Iron(II) Hydroxide Spontaneous Aerial Oxidation',
            VN: 'Oxi Hóa Tự Phát Kết Tủa Fe(OH)₂ Thành Fe(OH)₃ Nâu Đỏ'
        },
        mechanism: {
            EN: 'Fe(OH)₂ is thermodynamically unstable against oxidation (E° Fe³⁺/Fe²⁺ = +0.77 V). Atmospheric oxygen rapidly oxidizes the dirty-green Fe(OH)₂ to dense reddish-brown Iron(III) Hydroxide (Fe(OH)₃ rust).',
            VN: 'Kết tủa Fe(OH)₂ màu trắng xanh rất dễ bị oxy hóa trong không khí, chuyển màu ngoạn mục sang màu nâu đỏ đặc trưng của rỉ sắt Fe(OH)₃.'
        },
        message: {
            EN: 'Spontaneous Oxidation: Dirty-green Fe(OH)₂ absorbs Oxygen to turn into dense reddish-brown Iron(III) Hydroxide (Fe(OH)₃)!',
            VN: 'Oxi hóa tự nhiên: Kết tủa Fe(OH)₂ màu trắng xanh chuyển sang màu nâu đỏ rực rỡ của Fe(OH)₃ khi tiếp xúc với oxy!'
        },
        effect: 'precipitate',
        precipitateColor: '#b45309',
        temperatureSpike: 10
    },

    // ==========================================
    // J. COPPER HYDROXIDE & COLOR DISCOVERY
    // ==========================================
    {
        reactants: ['CuSO4', 'NaOH'],
        product: 'CuOH2_PRECIPITATE',
        products: ['CuOH2_PRECIPITATE'],
        equation: {
            EN: 'CuSO₄ (aq) + 2NaOH (aq) → Cu(OH)₂ (s) ↓ + Na₂SO₄ (aq)',
            VN: 'CuSO₄ (dd) + 2NaOH (dd) → Cu(OH)₂ (r) ↓ + Na₂SO₄ (dd)'
        },
        reactionType: {
            EN: 'Copper(II) Hydroxide Precipitation',
            VN: 'Phản Ứng Tạo Kết Tủa Đồng(II) Hydroxit'
        },
        mechanism: {
            EN: 'Cu²⁺ cations coordinate with hydroxide anions, forming a bright sky-blue gelatinous precipitate of Copper(II) Hydroxide.',
            VN: 'Ion Cu²⁺ kết hợp với ion OH⁻ tạo kết tủa Cu(OH)₂ màu xanh lơ đặc trưng.'
        },
        message: {
            EN: 'Precipitation: Copper(II) Sulfate and Sodium Hydroxide form bright sky-blue Copper(II) Hydroxide precipitate.',
            VN: 'Phản ứng tạo kết tủa: Dung dịch CuSO₄ tác dụng với NaOH tạo kết tủa Cu(OH)₂ màu xanh lơ.'
        },
        effect: 'precipitate',
        precipitateColor: '#38bdf8',
        temperatureSpike: 12
    },
    {
        reactants: ['CuOH2_PRECIPITATE', 'HCl'],
        product: 'CuCl2',
        products: ['CuCl2'],
        equation: {
            EN: 'Cu(OH)₂ (s) + 2HCl (aq) → CuCl₂ (aq) + 2H₂O (l) (Emerald-Cyan Solution)',
            VN: 'Cu(OH)₂ (r) + 2HCl (dd) → CuCl₂ (dd) + 2H₂O (l) (Dung Dịch Xanh Ngọc Lam)'
        },
        reactionType: {
            EN: 'Insoluble Base Dissolution in Acid',
            VN: 'Hòa Tan Bazơ Không Tan Trong Axit Clohidric'
        },
        mechanism: {
            EN: 'Hydrochloric acid dissolves insoluble blue copper(II) hydroxide, yielding a brilliant emerald-cyan solution of Copper(II) Chloride (CuCl₂). Notice CuCl₂ is formed, NOT copper sulfate!',
            VN: 'Axit clohiđric hòa tan kết tủa Cu(OH)₂ màu xanh lơ tạo dung dịch muối Đồng(II) Clorua (CuCl₂) màu xanh ngọc lam rực rỡ, chứ KHÔNG PHẢI muối sunfat!'
        },
        message: {
            EN: 'Authentic Dissolution: Sky-blue Copper(II) Hydroxide dissolves in Hydrochloric Acid to form emerald-cyan Copper(II) Chloride (CuCl₂) solution!',
            VN: 'Hòa tan chuẩn xác: Kết tủa Cu(OH)₂ tan trong Axit Clohiđric tạo dung dịch Đồng(II) Clorua (CuCl₂) màu xanh ngọc lam rực rỡ!'
        },
        effect: 'color_shift',
        productColor: '#06b6d4',
        temperatureSpike: 15
    },
    {
        reactants: ['CuOH2_PRECIPITATE', 'H2SO4'],
        product: 'CuSO4',
        products: ['CuSO4'],
        equation: {
            EN: 'Cu(OH)₂ (s) + H₂SO₄ (aq) → CuSO₄ (aq) + 2H₂O (l) (Regeneration of Blue Vitriol)',
            VN: 'Cu(OH)₂ (r) + H₂SO₄ (dd) → CuSO₄ (dd) + 2H₂O (l) (Tái Tạo Dung Dịch Xanh Lam CuSO₄)'
        },
        reactionType: {
            EN: 'Copper Sulfate Acid Dissolution',
            VN: 'Hòa Tan Cu(OH)₂ Bằng Axit Sunfuric'
        },
        mechanism: {
            EN: 'Sulfuric acid neutralizes copper(II) hydroxide, reforming clear sky-blue Copper(II) Sulfate solution.',
            VN: 'Axit sunfuric hòa tan kết tủa Cu(OH)₂ tái tạo dung dịch CuSO₄ màu xanh lam.'
        },
        message: {
            EN: 'Dissolution: Sky-blue Copper(II) Hydroxide dissolves in Sulfuric Acid to regenerate sky-blue Copper(II) Sulfate.',
            VN: 'Hòa tan: Cu(OH)₂ tan trong Axit Sunfuric tái tạo dung dịch CuSO₄ màu xanh lam.'
        },
        effect: 'color_shift',
        productColor: '#38bdf8',
        temperatureSpike: 18
    },

    // ==========================================
    // K. ORGANIC POLYOL COMPLEXATION & INDICATORS
    // ==========================================
    {
        reactants: ['GLYCEROL', 'CuOH2_PRECIPITATE'],
        product: 'COPPER_POLYOL_COMPLEX',
        products: ['COPPER_POLYOL_COMPLEX'],
        equation: {
            EN: '2C₃H₅(OH)₃ + Cu(OH)₂ → [Cu(C₃H₇O₃)₂] + 2H₂O (Deep Blue Chelate Complex)',
            VN: '2C₃H₅(OH)₃ + Cu(OH)₂ → [Cu(C₃H₇O₃)₂] + 2H₂O (Phức Đồng Chelat Xanh Lam Thẫm)'
        },
        reactionType: {
            EN: 'Polyol Vicinal Diol Chelate Coordination',
            VN: 'Tạo Phức Chelat Của Ancol Đa Chức Liền Kề'
        },
        mechanism: {
            EN: 'Glycerol possesses vicinal -OH groups on adjacent carbons that form a highly stable chelate ring with Cu²⁺, dissolving the light blue precipitate into an intensely colored deep royal-blue solution.',
            VN: 'Glixerol có các nhóm -OH liền kề tạo vòng chelat bền vững với ion Cu²⁺, hòa tan kết tủa Cu(OH)₂ thành dung dịch màu xanh lam thẫm trong suốt đặc trưng.'
        },
        message: {
            EN: 'Polyol Test Positive: Glycerol dissolves Copper(II) Hydroxide precipitate into a deep royal blue copper chelate complex!',
            VN: 'Phản ứng đặc trưng: Glixerol hòa tan kết tủa Cu(OH)₂ tạo dung dịch phức đồng chelat màu xanh lam thẫm!'
        },
        effect: 'color_shift',
        productColor: '#2563eb',
        temperatureSpike: 10
    },
    {
        reactants: ['GLUCOSE', 'CuOH2_PRECIPITATE'],
        product: 'COPPER_POLYOL_COMPLEX',
        products: ['COPPER_POLYOL_COMPLEX'],
        maxTemperature: 59,
        equation: {
            EN: '2C₆H₁₂O₆ + Cu(OH)₂ → [Cu(C₆H₁₁O₆)₂] + 2H₂O (Glucose Polyol Complexation)',
            VN: '2C₆H₁₂O₆ + Cu(OH)₂ → [Cu(C₆H₁₁O₆)₂] + 2H₂O (Glucozơ Tạo Phức Đồng Xanh Lam)'
        },
        reactionType: {
            EN: 'Monosaccharide Polyhydroxy Chelation',
            VN: 'Phản Ứng Tạo Phức Của Ancol Đa Chức Của Monosaccarit'
        },
        mechanism: {
            EN: 'Because glucose contains 5 vicinal hydroxyl groups, it behaves as a polyol at room temperature, readily dissolving Cu(OH)₂ to form a brilliant deep blue copper-sugar chelate solution.',
            VN: 'Vì glucozơ có 5 nhóm -OH liền kề nên ở nhiệt độ thường nó đóng vai trò ancol đa chức, hòa tan kết tủa Cu(OH)₂ tạo dung dịch phức màu xanh lam thẫm.'
        },
        message: {
            EN: 'Room Temperature Polyol Behavior: Glucose dissolves Cu(OH)₂ to form a deep blue soluble copper complex solution.',
            VN: 'Tính chất ancol đa chức: Glucozơ hòa tan kết tủa Cu(OH)₂ ở nhiệt độ thường tạo dung dịch phức đồng màu xanh lam thẫm.'
        },
        effect: 'color_shift',
        productColor: '#2563eb',
        temperatureSpike: 8
    },
    {
        reactants: ['PHENOL', 'FeCl3'],
        product: 'IRON_PHENOLATE_COMPLEX',
        products: ['IRON_PHENOLATE_COMPLEX'],
        equation: {
            EN: '6C₆H₅OH + FeCl₃ → H₃[Fe(OC₆H₅)₆] + 3HCl (Intense Purple Complex)',
            VN: '6C₆H₅OH + FeCl₃ → H₃[Fe(OC₆H₅)₆] + 3HCl (Phức Màu Tím Hoàng Gia Sắt-Phenol)'
        },
        reactionType: {
            EN: 'Phenol Colorimetric Identification (Iron(III) Coordination)',
            VN: 'Phản Ứng Nhận Biết Đặc Trưng Của Phenol Bằng Dung Dịch Sắt(III) Clorua'
        },
        mechanism: {
            EN: 'Phenol coordinates with Fe³⁺ ions to form an octahedral hexaphenolatodiferrate complex displaying an intense, iconic royal violet/purple color. Essential high school diagnostic test for phenolic compounds!',
            VN: 'Phenol phối trí với ion Sắt(III) tạo phức chất bát diện có màu tím hoàng gia đậm vô cùng đặc trưng. Đây là phản ứng chuẩn mực dùng để nhận biết phenol trong chương trình Hóa học 11-12!'
        },
        message: {
            EN: 'Analytical Test: Phenol reacts with Iron(III) Chloride to produce an intense, magnificent royal violet/purple ink coloration ([Fe(OC₆H₅)₆]³⁻)!',
            VN: 'Nhận biết đặc trưng: Phenol tác dụng với dung dịch Sắt(III) Clorua tạo dung dịch phức chất màu tím hoàng gia đậm rực rỡ!'
        },
        effect: 'color_shift',
        productColor: '#581c87',
        temperatureSpike: 10,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['PHENOL', 'NaOH'],
        product: 'SODIUM_PHENOLATE',
        products: ['SODIUM_PHENOLATE'],
        equation: {
            EN: 'C₆H₅OH (s) + NaOH (aq) → C₆H₅ONa (aq) + H₂O (l) (Phenol Dissolution in Alkali)',
            VN: 'C₆H₅OH (r) + NaOH (dd) → C₆H₅ONa (dd) + H₂O (l) (Phenol Tan Trong Dung Dịch Kiềm)'
        },
        reactionType: {
            EN: 'Phenol Acidity & Sodium Phenolate Synthesis',
            VN: 'Tính Axit Của Phenol Tác Dụng Kiềm Tạo Muối Tan'
        },
        mechanism: {
            EN: 'The benzene ring stabilizes the phenolate anion via resonance delocalization, making phenol acidic enough to react with sodium hydroxide and dissolve into clear Sodium Phenolate solution.',
            VN: 'Vòng benzen làm tăng độ phân cực của liên kết O-H, giúp phenol có tính axit yếu và tan hoàn toàn trong dung dịch kiềm NaOH tạo muối Natri Phenolat tan trong suốt.'
        },
        message: {
            EN: 'Phenol Acid Property: Insoluble Phenol dissolves readily in Sodium Hydroxide, forming soluble Sodium Phenolate (C₆H₅ONa).',
            VN: 'Tính axit của phenol: Phenol ít tan trong nước nhưng tan hoàn toàn trong NaOH tạo muối Natri Phenolat trong suốt.'
        },
        effect: 'color_shift',
        productColor: '#fef3c7',
        temperatureSpike: 12
    },
    {
        reactants: ['ETHANOL', 'SODIUM'],
        product: 'SODIUM_ETHOXIDE',
        products: ['SODIUM_ETHOXIDE', 'HYDROGEN_GAS'],
        equation: {
            EN: '2C₂H₅OH (l) + 2Na (s) → 2C₂H₅ONa (aq) + H₂ (g) ↑ (Sodium Ethoxide Synthesis)',
            VN: '2C₂H₅OH (l) + 2Na (r) → 2C₂H₅ONa (dd) + H₂ (k) ↑ (Điều Chế Natri Etylat)'
        },
        reactionType: {
            EN: 'Alcohol Proton Reduction & Alkoxide Formation',
            VN: 'Kim Loại Kiềm Tác Dụng Với Ancol Giải Phóng Hydro'
        },
        mechanism: {
            EN: 'Sodium slowly reacts with dry ethanol, reducing the weakly acidic hydroxyl proton to bubble off hydrogen gas and yield Sodium Ethoxide (C₂H₅ONa), a potent organic base. Notice that Sodium Ethoxide is formed, NOT Sodium Acetate!',
            VN: 'Natri tan từ từ trong rượu etylic khan, sủi bọt khí hydro đều đặn và tạo thành muối Natri Etylat (C₂H₅ONa), một bazơ hữu cơ mạnh. Sản phẩm là Natri Etylat chứ KHÔNG PHẢI Natri Axetat!'
        },
        message: {
            EN: 'Authentic Reaction: Sodium displaces hydrogen from Ethanol to synthesize Sodium Ethoxide (C₂H₅ONa) and stream Hydrogen gas (H₂) bubbles.',
            VN: 'Phản ứng chuẩn xác: Natri tác dụng với Rượu Etylic tạo muối Natri Etylat (C₂H₅ONa) và sủi bọt khí Hydro (H₂).'
        },
        effect: 'bubbles',
        temperatureSpike: 25
    },

    // ==========================================
    // L. TOLLENS SILVER MIRROR TESTS
    // ==========================================
    {
        reactants: ['GLUCOSE', 'TOLLENS_REAGENT'],
        product: 'SILVER',
        products: ['SILVER', 'GLUCONIC_ACID'],
        equation: {
            EN: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag (s) ↓ + 3NH₃ + H₂O (Silver Mirror)',
            VN: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag (r) ↓ + 3NH₃ + H₂O (Tráng Gương Bạc)'
        },
        reactionType: {
            EN: 'Tollens Silver Mirror Reduction',
            VN: 'Phản Ứng Tráng Bạc Của Glucozơ'
        },
        mechanism: {
            EN: 'The aldehyde group (-CHO) of open-chain glucose reduces diamminesilver(I) cations to metallic silver, depositing an incandescent reflective silver mirror on the glass vessel surface.',
            VN: 'Nhóm anđehit (-CHO) của glucozơ dạng mạch hở khử ion phức bạc [Ag(NH₃)₂]⁺ thành bạc kim loại sáng bóng bám trên thành ống nghiệm tạo lớp gương soi lấp lánh.'
        },
        message: {
            EN: 'Silver Mirror Test: Glucose reduces Tollens Reagent to deposit a dazzling, mirror-reflective metallic Silver layer!',
            VN: 'Phản ứng tráng gương: Glucozơ khử thuốc thử Tollens tạo lớp gương bạc kim loại sáng loáng bám trên thành bình!'
        },
        effect: 'precipitate',
        precipitateColor: '#e2e8f0',
        temperatureSpike: 15,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['ACETALDEHYDE', 'TOLLENS_REAGENT'],
        product: 'SILVER',
        products: ['SILVER', 'SALT_WATER'],
        equation: {
            EN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (s) ↓ + 3NH₃ + H₂O (Silver Mirror Deposit)',
            VN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (r) ↓ + 3NH₃ + H₂O (Tráng Gương Bạc Kim Loại)'
        },
        reactionType: {
            EN: 'Acetaldehyde Tollens Silver Mirror Redox',
            VN: 'Phản Ứng Tráng Bạc Của Anđehit Axetic'
        },
        mechanism: {
            EN: 'Acetaldehyde reduces diamminesilver(I) cations to metallic silver atoms that deposit as a brilliant reflective silver mirror on the glass vessel walls.',
            VN: 'Anđehit axetic khử ion phức bạc tạo lớp bạc kim loại sáng bóng như gương bám chặt vào thành bình thủy tinh.'
        },
        message: {
            EN: 'Silver Mirror Test: Acetaldehyde reduces Tollens Reagent to deposit a shining reflective metallic Silver mirror!',
            VN: 'Phản ứng tráng bạc: Anđehit axetic khử thuốc thử Tollens tạo lớp gương bạc sáng loáng bám trên thành bình!'
        },
        effect: 'precipitate',
        precipitateColor: '#e2e8f0',
        temperatureSpike: 15,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['FORMIC_ACID', 'TOLLENS_REAGENT'],
        product: 'SILVER',
        products: ['SILVER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'HCOOH + 2[Ag(NH₃)₂]OH → (NH₄)₂CO₃ + 2Ag (s) ↓ + 2NH₃ + H₂O (Formic Acid Silver Mirror)',
            VN: 'HCOOH + 2[Ag(NH₃)₂]OH → (NH₄)₂CO₃ + 2Ag (r) ↓ + 2NH₃ + H₂O (Axit Fomic Tráng Bạc Độc Đáo)'
        },
        reactionType: {
            EN: 'Formic Acid Aldehyde-Like Silver Mirror Oxidation',
            VN: 'Phản Ứng Tráng Bạc Của Axit Fomic'
        },
        mechanism: {
            EN: 'Due to its unique terminal formyl (-CHO) hydrogen, Formic Acid is the only carboxylic acid capable of reducing Tollens reagent to elemental silver while evolving CO₂!',
            VN: 'Do chứa nhóm formyl (-CHO), Axit Fomic là axit cacboxylic duy nhất có khả năng tham gia phản ứng tráng bạc tạo lớp kim loại Ag sáng bóng!'
        },
        message: {
            EN: 'Unique Formic Acid Test: Formic Acid exhibits aldehyde reducing properties to deposit a silver mirror!',
            VN: 'Tính chất đặc biệt: Axit fomic vừa có tính axit vừa có tính anđehit, tham gia phản ứng tráng gương tạo lớp bạc sáng bóng!'
        },
        effect: 'precipitate',
        precipitateColor: '#e2e8f0',
        temperatureSpike: 12,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['FORMIC_ACID', 'NaOH'],
        product: 'SODIUM_FORMATE',
        products: ['SODIUM_FORMATE'],
        equation: {
            EN: 'HCOOH (aq) + NaOH (aq) → HCOONa (aq) + H₂O (l)',
            VN: 'HCOOH (dd) + NaOH (dd) → HCOONa (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Formic Acid Neutralization',
            VN: 'Trung Hòa Axit Fomic'
        },
        mechanism: {
            EN: 'Strong base neutralizes formic acid to form Sodium Formate solution.',
            VN: 'Axit fomic tác dụng với NaOH tạo dung dịch muối Natri Fomiat và nước.'
        },
        message: {
            EN: 'Neutralization: Formic Acid reacts with Sodium Hydroxide to form Sodium Formate (HCOONa).',
            VN: 'Phản ứng trung hòa: Axit fomic tác dụng với NaOH tạo muối Natri Fomiat (HCOONa).'
        },
        effect: 'bubbles',
        temperatureSpike: 14
    },

    // ==========================================
    // M. DANGEROUS ACID DILUTION (SAFETY FIRST)
    // ==========================================
    {
        reactants: ['H2SO4', 'DISTILLED_WATER'],
        product: 'H2SO4',
        products: ['H2SO4'],
        equation: {
            EN: 'H₂SO₄ (conc) + H₂O (l) → H₃O⁺ + HSO₄⁻ (Extreme Exothermic Flash-Boil!)',
            VN: 'H₂SO₄ (đặc) + H₂O (l) → H₃O⁺ + HSO₄⁻ (Tỏa Nhiệt Sôi Bùng Nổ Nguy Hiểm!)'
        },
        reactionType: {
            EN: 'Extreme Exothermic Hydration Hazard',
            VN: 'Nguy Hiểm Tỏa Nhiệt Sôi Trào Axit'
        },
        mechanism: {
            EN: 'CRITICAL LAB SAFETY RULE: NEVER POUR WATER INTO CONCENTRATED ACID! Water is less dense and sits on top of concentrated H₂SO₄; the intense heat of hydration (ΔH° = -880 kJ/mol) instantly flash-boils the water into steam, violently splashing boiling concentrated acid outwards!',
            VN: 'QUY TẮC AN TOÀN PHÒNG THÍ NGHIỆM SỐ 1: TUYỆT ĐỐI KHÔNG ĐƯỢC ĐỔ NƯỚC VÀO AXIT ĐẶC! Nước nhẹ hơn nổi lên trên, nhiệt hydrat hóa cực lớn (ΔH° = -880 kJ/mol) làm nước sôi bùng tức thì thành hơi nước, bắn tung tóe axit đặc sôi ra xung quanh gây bỏng nặng!'
        },
        message: {
            EN: 'LAB SAFETY VIOLATION: Water poured into concentrated acid causes dangerous flash-boiling and splashing! Always add acid slowly to water!',
            VN: 'CẢNH BÁO NGUY HIỂM: Rót nước vào axit đặc gây sôi bùng dữ dội và bắn axit! Luôn luôn phải rót từ từ axit vào nước!'
        },
        effect: 'explosion',
        temperatureSpike: 110,
        requiresPopup: true,
        orderMatters: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['DISTILLED_WATER', 'H2SO4'],
        product: 'H2SO4',
        products: ['H2SO4'],
        equation: {
            EN: 'H₂O (bulk) + H₂SO₄ (added slowly) → Dilute H₂SO₄ (Safe Heat Dissipation)',
            VN: 'H₂O (nhiều) + H₂SO₄ (rót từ từ) → Axit Loãng (Tản Nhiệt An Toàn)'
        },
        reactionType: {
            EN: 'Safe Acid Dilution Protocol',
            VN: 'Quy Trình Pha Loãng Axit An Toàn'
        },
        mechanism: {
            EN: 'CORRECT PROTOCOL: Adding concentrated sulfuric acid slowly down the wall of a large volume of water allows the substantial heat capacity of water to safely absorb and dissipate the exothermic energy.',
            VN: 'QUY TRÌNH CHUẨN: Rót từ từ axit sunfuric đặc dọc theo thành cốc vào lượng nước lớn giúp nhiệt dung của nước hấp thụ và tản nhiệt an toàn mà không bị sôi bắn.'
        },
        message: {
            EN: 'Safe Dilution: Acid added to water allows the large volume of water to safely absorb the hydration heat without boiling.',
            VN: 'Pha loãng an toàn: Rót axit vào nước giúp lượng nước lớn hấp thụ nhiệt an toàn, không bị sôi trào.'
        },
        effect: 'bubbles',
        temperatureSpike: 20,
        orderMatters: true
    },

    // ==========================================
    // N. PRECIPITATION OF HALIDES & SULFATES
    // ==========================================
    {
        reactants: ['AgNO3', 'NaCl'],
        product: 'AgCl_PRECIPITATE',
        products: ['AgCl_PRECIPITATE'],
        equation: {
            EN: 'AgNO₃ (aq) + NaCl (aq) → AgCl (s) ↓ + NaNO₃ (aq)',
            VN: 'AgNO₃ (dd) + NaCl (dd) → AgCl (r) ↓ + NaNO₃ (dd)'
        },
        reactionType: {
            EN: 'Curdy White Halide Precipitation',
            VN: 'Tạo Kết Tủa Trắng Vón Bạc Clorua'
        },
        mechanism: {
            EN: 'Insoluble curdy white Silver Chloride precipitates instantly upon mixing silver cations with chloride anions. Impervious to dilute nitric acid.',
            VN: 'Ion Ag⁺ kết hợp với ion Cl⁻ tạo ngay kết tủa trắng vón AgCl không tan trong axit nitric loãng.'
        },
        message: {
            EN: 'Precipitation: Silver Nitrate reacts with Sodium Chloride to form a curdy white Silver Chloride (AgCl) precipitate.',
            VN: 'Phản ứng tạo kết tủa: AgNO₃ tác dụng với NaCl tạo kết tủa trắng vón AgCl.'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 6
    },
    {
        reactants: ['AgNO3', 'KI'],
        product: 'AgI_PRECIPITATE',
        products: ['AgI_PRECIPITATE'],
        equation: {
            EN: 'AgNO₃ (aq) + KI (aq) → AgI (s) ↓ + KNO₃ (aq) (Bright Yellow Precipitate)',
            VN: 'AgNO₃ (dd) + KI (dd) → AgI (r) ↓ + KNO₃ (dd) (Kết Tủa Vàng Đậm Bạc Iodua)'
        },
        reactionType: {
            EN: 'Yellow Silver Halide Precipitation',
            VN: 'Nhận Biết Ion Iodua Bằng Bạc Nitrat'
        },
        mechanism: {
            EN: 'Silver cations combine with iodide anions to form intense canary-yellow Silver Iodide (AgI) precipitate. Notice that yellow AgI is formed, NOT white AgCl!',
            VN: 'Ion Ag⁺ kết hợp với ion I⁻ tạo kết tủa Bạc Iodua (AgI) màu vàng đậm đặc trưng, chứ KHÔNG PHẢI kết tủa trắng AgCl!'
        },
        message: {
            EN: 'Accurate Iodide Test: Silver Nitrate reacts with Potassium Iodide to form a bright canary-yellow Silver Iodide (AgI) precipitate!',
            VN: 'Nhận biết chính xác: AgNO₃ tác dụng với KI tạo kết tủa Bạc Iodua (AgI) màu vàng tươi đặc trưng!'
        },
        effect: 'precipitate',
        precipitateColor: '#facc15',
        temperatureSpike: 8
    },
    {
        reactants: ['BaCl2', 'H2SO4'],
        product: 'BaSO4_PRECIPITATE',
        products: ['BaSO4_PRECIPITATE', 'HCl'],
        equation: {
            EN: 'BaCl₂ (aq) + H₂SO₄ (aq) → BaSO₄ (s) ↓ + 2HCl (aq)',
            VN: 'BaCl₂ (dd) + H₂SO₄ (dd) → BaSO₄ (r) ↓ + 2HCl (dd)'
        },
        reactionType: {
            EN: 'Sulfate Ion Analytical Confirmation',
            VN: 'Phản Ứng Nhận Biết Ion Sunfat Bằng Muối Bari'
        },
        mechanism: {
            EN: 'Extremely insoluble white Barium Sulfate precipitate forms instantaneously, completely inert to strong mineral acids.',
            VN: 'Kết tủa trắng mịn BaSO₄ xuất hiện tức thì, hoàn toàn không tan trong các axit vô cơ mạnh.'
        },
        message: {
            EN: 'Sulfate Test: Barium Chloride reacts with Sulfuric Acid to precipitate dense, insoluble white Barium Sulfate (BaSO₄).',
            VN: 'Nhận biết gốc Sunfat: BaCl₂ tác dụng với H₂SO₄ tạo kết tủa trắng BaSO₄ bền vững không tan.'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 10
    },
    {
        reactants: ['BaCl2', 'CuSO4'],
        product: 'BaSO4_PRECIPITATE',
        products: ['BaSO4_PRECIPITATE', 'CuCl2'],
        equation: {
            EN: 'BaCl₂ (aq) + CuSO₄ (aq) → BaSO₄ (s) ↓ + CuCl₂ (aq) (Double Displacement)',
            VN: 'BaCl₂ (dd) + CuSO₄ (dd) → BaSO₄ (r) ↓ + CuCl₂ (dd)'
        },
        reactionType: {
            EN: 'Sulfate Double Displacement',
            VN: 'Phản Ứng Trao Đổi Tạo Kết Tủa BaSO₄'
        },
        mechanism: {
            EN: 'Double displacement generates insoluble white barium sulfate precipitate while soluble copper chloride remains in solution.',
            VN: 'Phản ứng trao đổi tạo kết tủa trắng BaSO₄ trong dung dịch CuCl₂ màu xanh ngọc.'
        },
        message: {
            EN: 'Precipitation: Barium Chloride reacts with Copper(II) Sulfate to form white Barium Sulfate precipitate.',
            VN: 'Tạo kết tủa: BaCl₂ tác dụng với CuSO₄ sinh kết tủa trắng BaSO₄.'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 8
    },
    {
        reactants: ['CaOH2', 'Na2CO3'],
        product: 'CaCO3_PRECIPITATE',
        products: ['CaCO3_PRECIPITATE', 'NaOH'],
        equation: {
            EN: 'Ca(OH)₂ (aq) + Na₂CO₃ (aq) → CaCO₃ (s) ↓ + 2NaOH (aq) (Causticizing Reaction)',
            VN: 'Ca(OH)₂ (dd) + Na₂CO₃ (dd) → CaCO₃ (r) ↓ + 2NaOH (dd) (Phản Ứng Xút Hóa Tạo Kết Tủa Trắng)'
        },
        reactionType: {
            EN: 'Causticizing Calcium Carbonate Precipitation',
            VN: 'Phản Ứng Xút Hóa Tạo Kết Tủa Trắng Canxi Cacbonat'
        },
        mechanism: {
            EN: 'The classic industrial causticizing process: soluble sodium carbonate reacts with limewater to precipitate white chalk CaCO₃, leaving a solution of caustic soda (NaOH).',
            VN: 'Phản ứng xút hóa công nghiệp kinh điển: Natri cacbonat tác dụng với nước vôi trong tạo kết tủa trắng canxi cacbonat (CaCO₃) và sinh ra xút NaOH.'
        },
        message: {
            EN: 'Causticizing: Limewater reacts with Sodium Carbonate to produce white Calcium Carbonate (CaCO₃) precipitate and caustic Sodium Hydroxide (NaOH)!',
            VN: 'Phản ứng xút hóa: Nước vôi trong tác dụng với Na₂CO₃ sinh kết tủa trắng canxi cacbonat (CaCO₃) và dung dịch kiềm xút NaOH!'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 10
    },
    {
        reactants: ['BaCl2', 'Na2CO3'],
        product: 'BaCO3_PRECIPITATE',
        products: ['BaCO3_PRECIPITATE', 'SALT_WATER'],
        equation: {
            EN: 'BaCl₂ (aq) + Na₂CO₃ (aq) → BaCO₃ (s) ↓ + 2NaCl (aq)',
            VN: 'BaCl₂ (dd) + Na₂CO₃ (dd) → BaCO₃ (r) ↓ + 2NaCl (dd)'
        },
        reactionType: {
            EN: 'Barium Carbonate Precipitation',
            VN: 'Tạo Kết Tủa Trắng Bari Cacbonat'
        },
        mechanism: {
            EN: 'Precipitation of dense white barium carbonate, easily redissolved by adding dilute acids with vigorous effervescence.',
            VN: 'Tạo kết tủa trắng nặng BaCO₃, tan dễ dàng trong axit kèm theo sủi bọt khí CO₂.'
        },
        message: {
            EN: 'Precipitation: Barium Chloride and Sodium Carbonate precipitate dense white Barium Carbonate (BaCO₃).',
            VN: 'Tạo kết tủa: BaCl₂ tác dụng với Na₂CO₃ sinh kết tủa trắng Bari Cacbonat (BaCO₃).'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 8
    },

    // ==========================================
    // O. IRON(III) PRECIPITATION
    // ==========================================
    {
        reactants: ['FeCl3', 'NaOH'],
        product: 'FeOH3_PRECIPITATE',
        products: ['FeOH3_PRECIPITATE'],
        equation: {
            EN: 'FeCl₃ (aq) + 3NaOH (aq) → Fe(OH)₃ (s) ↓ + 3NaCl (aq)',
            VN: 'FeCl₃ (dd) + 3NaOH (dd) → Fe(OH)₃ (r) ↓ + 3NaCl (dd)'
        },
        reactionType: {
            EN: 'Iron(III) Rust-Red Hydroxide Precipitation',
            VN: 'Phản Ứng Tạo Kết Tủa Nâu Đỏ Sắt(III) Hydroxit'
        },
        mechanism: {
            EN: 'Hydroxide ions coordinate with ferric ions, forming dense reddish-brown rust precipitate of Fe(OH)₃.',
            VN: 'Ion OH⁻ kết hợp với Fe³⁺ tạo kết tủa màu nâu đỏ đặc trưng của Sắt(III) hidroxit.'
        },
        message: {
            EN: 'Precipitation: Iron(III) Chloride reacts with Sodium Hydroxide to form dense reddish-brown Iron(III) Hydroxide precipitate.',
            VN: 'Tạo kết tủa: Dung dịch FeCl₃ tác dụng với NaOH sinh kết tủa màu nâu đỏ Fe(OH)₃.'
        },
        effect: 'precipitate',
        precipitateColor: '#b45309',
        temperatureSpike: 15
    },
    {
        reactants: ['FeCl3', 'KOH'],
        product: 'FeOH3_PRECIPITATE',
        products: ['FeOH3_PRECIPITATE'],
        equation: {
            EN: 'FeCl₃ (aq) + 3KOH (aq) → Fe(OH)₃ (s) ↓ + 3KCl (aq)',
            VN: 'FeCl₃ (dd) + 3KOH (dd) → Fe(OH)₃ (r) ↓ + 3KCl (dd)'
        },
        reactionType: {
            EN: 'Ferric Hydroxide Alkaline Precipitation',
            VN: 'Tạo Kết Tủa Sắt(III) Bằng Dung Dịch Kiềm KOH'
        },
        mechanism: {
            EN: 'Ferric chloride reacts with potassium hydroxide to yield dense reddish-brown Fe(OH)₃.',
            VN: 'FeCl₃ tác dụng với dung dịch KOH tạo kết tủa nâu đỏ Fe(OH)₃.'
        },
        message: {
            EN: 'Precipitation: Iron(III) Chloride reacts with Potassium Hydroxide to form reddish-brown Iron(III) Hydroxide.',
            VN: 'Tạo kết tủa: FeCl₃ tác dụng với KOH sinh kết tủa Fe(OH)₃ màu nâu đỏ.'
        },
        effect: 'precipitate',
        precipitateColor: '#b45309',
        temperatureSpike: 15
    },
    {
        reactants: ['FeOH3_PRECIPITATE', 'HCl'],
        product: 'FeCl3',
        products: ['FeCl3'],
        equation: {
            EN: 'Fe(OH)₃ (s) + 3HCl (aq) → FeCl₃ (aq) + 3H₂O (l)',
            VN: 'Fe(OH)₃ (r) + 3HCl (dd) → FeCl₃ (dd) + 3H₂O (l)'
        },
        reactionType: {
            EN: 'Insoluble Rust Dissolution in Mineral Acid',
            VN: 'Hòa Tan Kết Tủa Nâu Đỏ Trong Axit Clohidric'
        },
        mechanism: {
            EN: 'Reddish-brown Fe(OH)₃ dissolves rapidly in hydrochloric acid, reforming golden-amber Iron(III) chloride solution.',
            VN: 'Kết tủa nâu đỏ Fe(OH)₃ tan dễ dàng trong axit clohiđric tái tạo dung dịch FeCl₃ màu vàng nâu.'
        },
        message: {
            EN: 'Dissolution: Reddish-brown Iron(III) Hydroxide dissolves in Hydrochloric Acid to reform amber Iron(III) Chloride.',
            VN: 'Hòa tan: Kết tủa nâu đỏ Fe(OH)₃ tan trong Axit Clohiđric tạo lại dung dịch FeCl₃ màu vàng nâu.'
        },
        effect: 'color_shift',
        productColor: '#ca8a04',
        temperatureSpike: 15
    },

    // ==========================================
    // P. CARBONATE ACIDIFICATION & EFFERVESCENCE
    // ==========================================
    {
        reactants: ['NaHCO3', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'NaHCO₃ (s) + HCl (aq) → NaCl (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'NaHCO₃ (r) + HCl (dd) → NaCl (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Carbonate Acid Effervescence & Gas Evolution',
            VN: 'Phản Ứng Axit Hóa Muối Cacbonat & Thoát Khí CO₂'
        },
        mechanism: {
            EN: 'Protons rapidly protonate bicarbonate ions into unstable carbonic acid (H₂CO₃), which instantaneously decomposes into water and effervescing Carbon Dioxide gas bubbles.',
            VN: 'Ion H⁺ tác dụng với ion HCO₃⁻ tạo axit cacbonic không bền, phân hủy ngay tức khắc thành nước và giải phóng lượng lớn bọt khí CO₂.'
        },
        message: {
            EN: 'Vigorous effervescence: Sodium Bicarbonate neutralizes Hydrochloric Acid, foaming intensely with Carbon Dioxide (CO₂) bubbles.',
            VN: 'Sủi bọt mạnh mẽ: Muối baking soda NaHCO₃ tác dụng với Axit Clohidric giải phóng bọt khí CO₂ cuồn cuộn.'
        },
        effect: 'bubbles',
        temperatureSpike: 8
    },
    {
        reactants: ['Na2CO3', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'Na₂CO₃ (aq) + 2HCl (aq) → 2NaCl (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'Na₂CO₃ (dd) + 2HCl (dd) → 2NaCl (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Carbonate Decomposition & CO₂ Bubbling',
            VN: 'Phân Hủy Muối Cacbonat Giải Phóng Khí CO₂'
        },
        mechanism: {
            EN: 'Hydrochloric acid decomposes sodium carbonate to produce neutral sodium chloride, water, and vigorous carbon dioxide effervescence.',
            VN: 'Axit clohidric phân hủy natri cacbonat tạo muối ăn NaCl và sủi bọt khí CO₂.'
        },
        message: {
            EN: 'Effervescence: Sodium Carbonate reacts with Hydrochloric Acid to release bubbling Carbon Dioxide (CO₂) gas.',
            VN: 'Sủi bọt khí: Na₂CO₃ tác dụng với Axit Clohidric giải phóng luồng khí CO₂.'
        },
        effect: 'bubbles',
        temperatureSpike: 10
    },
    {
        reactants: ['NaHCO3', 'H2SO4'],
        product: 'Na2SO4',
        products: ['Na2SO4', 'CARBON_DIOXIDE'],
        equation: {
            EN: '2NaHCO₃ (s) + H₂SO₄ (aq) → Na₂SO₄ (aq) + 2H₂O (l) + 2CO₂ (g) ↑',
            VN: '2NaHCO₃ (r) + H₂SO₄ (dd) → Na₂SO₄ (dd) + 2H₂O (l) + 2CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Bicarbonate Sulfuric Acid Decarboxylation',
            VN: 'Axit Sunfuric Phân Hủy Muối Bắt Cacbonat'
        },
        mechanism: {
            EN: 'Sulfuric acid reacts with sodium bicarbonate to yield sodium sulfate, water, and rapid CO₂ gas bubbles.',
            VN: 'Axit sunfuric tác dụng với natri bicacbonat tạo muối natri sunfat Na₂SO₄ và sủi bọt khí CO₂.'
        },
        message: {
            EN: 'Effervescence: Sodium Bicarbonate and Sulfuric Acid form Sodium Sulfate (Na₂SO₄) and bubbling Carbon Dioxide (CO₂).',
            VN: 'Sủi bọt: NaHCO₃ tác dụng với H₂SO₄ sinh dung dịch muối Natri Sunfat (Na₂SO₄) và khí CO₂.'
        },
        effect: 'bubbles',
        temperatureSpike: 12
    },
    {
        reactants: ['Na2CO3', 'H2SO4'],
        product: 'Na2SO4',
        products: ['Na2SO4', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'Na₂CO₃ (aq) + H₂SO₄ (aq) → Na₂SO₄ (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'Na₂CO₃ (dd) + H₂SO₄ (dd) → Na₂SO₄ (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Sodium Sulfate Synthesis & Effervescence',
            VN: 'Điều Chế Natri Sunfat & Sủi Bọt CO₂'
        },
        mechanism: {
            EN: 'Sodium carbonate is decomposed by sulfuric acid into sodium sulfate solution and carbon dioxide gas.',
            VN: 'Natri cacbonat bị axit sunfuric phân hủy tạo dung dịch Natri Sunfat và khí CO₂.'
        },
        message: {
            EN: 'Reaction Complete: Sodium Carbonate reacts with Sulfuric Acid to synthesize Sodium Sulfate (Na₂SO₄) and CO₂ gas.',
            VN: 'Phản ứng hoàn tất: Na₂CO₃ tác dụng với H₂SO₄ tạo muối Natri Sunfat (Na₂SO₄) và sủi bọt CO₂.'
        },
        effect: 'bubbles',
        temperatureSpike: 14
    },
    {
        reactants: ['NaHCO3', 'ACETIC_ACID'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'NaHCO₃ (s) + CH₃COOH (aq) → CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'NaHCO₃ (r) + CH₃COOH (dd) → CH₃COONa (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Classic Baking Soda & Vinegar Volcano',
            VN: 'Thí Nghiệm Núi Lửa Baking Soda & Giấm Ăn'
        },
        mechanism: {
            EN: 'The household volcano reaction: Acetic acid protonates sodium bicarbonate, driving rapid endothermic bubbling of carbon dioxide gas and forming sodium acetate.',
            VN: 'Thí nghiệm núi lửa quen thuộc: Giấm ăn tác dụng với baking soda giải phóng bọt khí CO₂ trào dâng và sinh muối Natri Axetat.'
        },
        message: {
            EN: 'The Classic Volcano: Vinegar and Baking Soda react to create a foaming eruption of Carbon Dioxide (CO₂) gas and Sodium Acetate!',
            VN: 'Thí nghiệm núi lửa kinh điển: Giấm ăn và baking soda phản ứng sủi bọt khí CO₂ trào dâng, tạo muối Natri Axetat!'
        },
        effect: 'bubbles',
        temperatureSpike: 4
    },

    // ==========================================
    // Q. STANDARD ACID-BASE NEUTRALIZATIONS
    // ==========================================
    {
        reactants: ['HCl', 'NaOH'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)',
            VN: 'HCl (dd) + NaOH (dd) → NaCl (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Standard Strong Acid-Strong Base Neutralization',
            VN: 'Phản Ứng Trung Hòa Chuẩn Axit Mạnh - Kiềm Mạnh'
        },
        mechanism: {
            EN: 'Hydronium and hydroxide ions recombine to form neutral water with high enthalpy of neutralization (ΔH° = -57.3 kJ/mol).',
            VN: 'Ion H⁺ và OH⁻ kết hợp tạo thành nước trung tính với nhiệt trung hòa lớn (ΔH° = -57.3 kJ/mol).'
        },
        message: {
            EN: 'Neutralization: Hydrochloric Acid and Sodium Hydroxide neutralize perfectly to form neutral Salt Water.',
            VN: 'Phản ứng trung hòa: Axit Clohidric và Natri Hydroxit trung hòa tạo dung dịch muối ăn NaCl trung tính.'
        },
        effect: 'fizz',
        temperatureSpike: 15
    },
    {
        reactants: ['NH3_AQ', 'HCl'],
        product: 'NH4Cl',
        products: ['NH4Cl'],
        equation: {
            EN: 'NH₃ (aq) + HCl (aq) → NH₄Cl (aq) (Ammonium Chloride Synthesis)',
            VN: 'NH₃ (dd) + HCl (dd) → NH₄Cl (dd) (Tạo Muối Amoni Clorua & Khói Trắng)'
        },
        reactionType: {
            EN: 'Ammonia-Hydrochloric Acid Lewis Acid-Base Addition',
            VN: 'Phản Ứng Khói Trắng Amoniac & Axit Clohidric'
        },
        mechanism: {
            EN: 'Ammonia donates its lone electron pair to proton from HCl, synthesizing Ammonium Chloride (NH₄Cl), visible as dense white smoke in vapor phase.',
            VN: 'Amoniac dùng cặp electron tự do nhận proton H⁺ từ axit clohidric tạo thành muối Amoni Clorua (NH₄Cl), ở thể khí tạo hiện tượng khói trắng dày đặc.'
        },
        message: {
            EN: 'Classic Reaction: Ammonia neutralizes Hydrochloric Acid to synthesize Ammonium Chloride (NH₄Cl).',
            VN: 'Phản ứng kinh điển: Khí Amoniac tác dụng với Axit Clohidric tạo muối Amoni Clorua (NH₄Cl).'
        },
        effect: 'smoke',
        temperatureSpike: 16
    },
    {
        reactants: ['ACETIC_ACID', 'NaOH'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE'],
        equation: {
            EN: 'CH₃COOH (aq) + NaOH (aq) → CH₃COONa (aq) + H₂O (l)',
            VN: 'CH₃COOH (dd) + NaOH (dd) → CH₃COONa (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Weak Acid-Strong Base Neutralization',
            VN: 'Trung Hòa Axit Hữu Cơ Bằng Kiềm'
        },
        mechanism: {
            EN: 'Hydroxide deprotonates acetic acid to yield water and Sodium Acetate solution (pH ~8.8 due to acetate anion hydrolysis).',
            VN: 'Ion OH⁻ trung hòa axit axetic tạo muối Natri Axetat (CH₃COONa) có tính bazơ nhẹ do ion axetat thủy phân.'
        },
        message: {
            EN: 'Neutralization: Acetic Acid reacts with Sodium Hydroxide to form Sodium Acetate (CH₃COONa).',
            VN: 'Phản ứng trung hòa: Axit Axetic tác dụng với NaOH sinh ra muối Natri Axetat (CH₃COONa).'
        },
        effect: 'bubbles',
        temperatureSpike: 12
    },
    {
        reactants: ['CaOH2', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'Ca(OH)₂ (aq) + 2HCl (aq) → CaCl₂ (aq) + 2H₂O (l)',
            VN: 'Ca(OH)₂ (dd) + 2HCl (dd) → CaCl₂ (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Limewater Neutralization',
            VN: 'Trung Hòa Nước Vôi Trong Bằng Axit'
        },
        mechanism: {
            EN: 'Hydrochloric acid completely neutralizes calcium hydroxide, forming clear calcium chloride solution.',
            VN: 'Axit clohidric trung hòa hoàn toàn nước vôi trong tạo dung dịch canxi clorua không màu.'
        },
        message: {
            EN: 'Neutralization: Limewater is neutralized by Hydrochloric Acid to form clear Calcium Chloride.',
            VN: 'Trung hòa: Nước vôi trong bị trung hòa bởi Axit Clohidric tạo dung dịch Canxi Clorua.'
        },
        effect: 'fizz',
        temperatureSpike: 15
    },

    // ==========================================
    // R. INDICATOR COLOR SHIFTS
    // ==========================================
    {
        reactants: ['PHENOLPHTHALEIN', 'NaOH'],
        product: 'PINK_BASE',
        products: ['PINK_BASE'],
        equation: {
            EN: 'H₂Ind (colorless) + 2OH⁻ ⇌ Ind²⁻ (vibrant fuchsia pink) + 2H₂O',
            VN: 'H₂Ind (không màu) + 2OH⁻ ⇌ Ind²⁻ (hồng cánh sen) + 2H₂O'
        },
        reactionType: {
            EN: 'Phenolphthalein Deprotonation & Quinoid Chromophore Activation',
            VN: 'Chuyển Màu Chỉ Thị Phenolphtalein Trong Kiềm'
        },
        mechanism: {
            EN: 'At pH > 8.2, hydroxide deprotonates the colorless lactone structure of phenolphthalein, opening the ring into an extensively conjugated planar quinoid dianion that intensely absorbs green light, transmitting dazzling fuchsia pink.',
            VN: 'Ở pH > 8.2, kiềm mở vòng lacton của phenolphtalein thành cấu trúc quinoid liên hợp phẳng mang điện tích -2, hấp thụ mạnh ánh sáng màu lục và phát màu hồng cánh sen rực rỡ.'
        },
        message: {
            EN: 'Indicator Activated: Phenolphthalein deprotonates in basic Sodium Hydroxide, shifting instantaneously to radiant fuchsia pink!',
            VN: 'Chỉ thị màu chuyển đổi: Phenolphtalein không màu chuyển sang màu hồng cánh sen rực rỡ khi gặp kiềm NaOH!'
        },
        effect: 'color_shift',
        productColor: '#f43f5e',
        temperatureSpike: 2
    },
    {
        reactants: ['PHENOLPHTHALEIN', 'KOH'],
        product: 'PINK_BASE',
        products: ['PINK_BASE'],
        equation: {
            EN: 'H₂Ind (colorless) + 2OH⁻ ⇌ Ind²⁻ (fuchsia pink) + 2H₂O',
            VN: 'H₂Ind (không màu) + 2OH⁻ ⇌ Ind²⁻ (hồng cánh sen) + 2H₂O'
        },
        reactionType: {
            EN: 'Potassium Hydroxide Indicator Activation',
            VN: 'Chỉ Thị Phenolphtalein Đổi Màu Trong KOH'
        },
        mechanism: {
            EN: 'Basic hydroxide from KOH triggers quinoid conjugation of phenolphthalein, turning the solution fuchsia.',
            VN: 'Kiềm KOH làm phenolphtalein chuyển sang màu hồng cánh sen rực rỡ.'
        },
        message: {
            EN: 'Indicator Activated: Phenolphthalein shifts to brilliant fuchsia pink in Potassium Hydroxide.',
            VN: 'Chỉ thị đổi màu: Phenolphtalein chuyển sang màu hồng cánh sen trong dung dịch KOH.'
        },
        effect: 'color_shift',
        productColor: '#f43f5e',
        temperatureSpike: 2
    },
    {
        reactants: ["PINK_BASE", "HCl"],
        product: "SALT_WATER",
        products: ["SALT_WATER", "PHENOLPHTHALEIN"],
        equation: {
            EN: "Ind²⁻ (Fuchsia Pink) + 2H₃O⁺ → H₂Ind (Colorless Lactone) + 2H₂O",
            VN: "Ind²⁻ (Hồng Cánh Sen) + 2H₃O⁺ → H₂Ind (Không Màu) + 2H₂O"
        },
        reactionType: {
            EN: "Acid-Base Titration Endpoint Decolorization",
            VN: "Trung Hòa Kiềm Làm Mất Màu Hồng Phenolphtalein"
        },
        mechanism: {
            EN: "Adding acid lowers the solution pH below 8.2, protonating the quinoid dianion back into its closed, colorless spirolactone ring structure.",
            VN: "Thêm axit làm giảm pH xuống dưới 8.2, đóng vòng lacton của phenolphtalein khiến màu hồng cánh sen biến mất hoàn toàn thành dung dịch trong suốt."
        },
        message: {
            EN: "Titration Endpoint Reached! Hydrochloric acid neutralizes the base, discharging the fuchsia pink indicator back to crystal clear!",
            VN: "Đạt điểm tương đương chuẩn độ! Axit trung hòa kiềm làm mất màu hồng cánh sen của phenolphtalein về lại trong suốt!"
        },
        effect: "color_shift",
        productColor: "#e0f2fe",
        temperatureSpike: 12
    },
    {
        reactants: ["PINK_BASE", "H2SO4"],
        product: "Na2SO4",
        products: ["Na2SO4", "PHENOLPHTHALEIN"],
        equation: {
            EN: "Ind²⁻ (Fuchsia Pink) + H₂SO₄ → H₂Ind (Colorless) + SO₄²⁻",
            VN: "Ind²⁻ (Hồng Cánh Sen) + H₂SO₄ → H₂Ind (Không Màu) + SO₄²⁻"
        },
        reactionType: {
            EN: "Acid-Base Indicator Neutralization",
            VN: "Axit Sunfuric Làm Mất Màu Hồng Phenolphtalein"
        },
        mechanism: {
            EN: "Sulfuric acid neutralizes hydroxide ions and protonates phenolphthalein back to its colorless lactone form.",
            VN: "Axit sunfuric trung hòa kiềm, chuyển phenolphtalein về dạng vòng lacton không màu."
        },
        message: {
            EN: "Neutralization complete: Fuchsia pink solution turns completely colorless upon acidification!",
            VN: "Trung hòa hoàn tất: Dung dịch màu hồng cánh sen chuyển sang không màu trong suốt!"
        },
        effect: "color_shift",
        productColor: "#e0f2fe",
        temperatureSpike: 15
    },
    {
        reactants: ["PINK_BASE", "ACETIC_ACID"],
        product: "SODIUM_ACETATE",
        products: ["SODIUM_ACETATE", "PHENOLPHTHALEIN"],
        equation: {
            EN: "Ind²⁻ (Pink) + 2CH₃COOH → H₂Ind (Colorless) + 2CH₃COO⁻",
            VN: "Ind²⁻ (Hồng) + 2CH₃COOH → H₂Ind (Không Màu) + 2CH₃COO⁻"
        },
        reactionType: {
            EN: "Weak Acid Neutralization of Alkaline Indicator",
            VN: "Axit Axetic Làm Mất Màu Hồng Phenolphtalein"
        },
        mechanism: {
            EN: "Acetic acid neutralizes excess hydroxide ions, dropping the pH below the 8.2 transition threshold of phenolphthalein.",
            VN: "Axit axetic trung hòa kiềm dư, hạ pH xuống dưới ngưỡng 8.2 làm mất màu hồng của chỉ thị."
        },
        message: {
            EN: "Acetic acid neutralizes the alkaline solution, discharging the fuchsia pink color!",
            VN: "Giấm ăn trung hòa dung dịch kiềm, làm biến mất màu hồng cánh sen!"
        },
        effect: "color_shift",
        productColor: "#e0f2fe",
        temperatureSpike: 8
    },

    // ==========================================
    // S. SAPONIFICATION & ESTER HYDROLYSIS
    // ==========================================
    {
        reactants: ['TRIGLYCERIDE', 'NaOH'],
        product: 'SOAP',
        products: ['SOAP', 'GLYCEROL'],
        equation: {
            EN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3NaOH (aq) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COONa (aq)',
            VN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3NaOH (dd) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COONa (dd)'
        },
        reactionType: {
            EN: 'Saponification / Alkaline Ester Hydrolysis',
            VN: 'Phản Ứng Xà Phòng Hóa / Thủy Phân Este Trong Kiềm'
        },
        mechanism: {
            EN: 'Hydroxide ion attacks the carbonyl carbon of ester linkages in triglycerides. Tetrahedral collapse cleaves the ester bond, synthesizing Glycerol and cleansing Sodium Oleate soap micelles!',
            VN: 'Ion OH⁻ tấn công cacbon cacbonyl bẻ gãy liên kết este trong chất béo, tạo Glixerol và muối Natri của axit béo có khả năng tẩy rửa (Xà phòng).'
        },
        message: {
            EN: 'Saponification Complete: Alkaline hydrolysis of Triglycerides synthesizes Glycerol and authentic cleansing Soap (Sodium Oleate)!',
            VN: 'Xà phòng hóa thành công: Thủy phân chất béo trong dung dịch kiềm tạo Glixerol và Xà phòng tẩy rửa đích thực!'
        },
        effect: 'bubbles',
        temperatureSpike: 25,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['TRIGLYCERIDE', 'KOH'],
        product: 'SOAP',
        products: ['SOAP', 'GLYCEROL'],
        equation: {
            EN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3KOH (aq) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COOK (aq)',
            VN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3KOH (dd) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COOK (dd)'
        },
        reactionType: {
            EN: 'Liquid Soft Soap Saponification',
            VN: 'Xà Phòng Hóa Tạo Xà Phòng Mềm Dạng Lỏng'
        },
        mechanism: {
            EN: 'Potassium hydroxide hydrolyzes triglyceride fats into glycerol and potassium soaps, producing soft liquid soaps.',
            VN: 'Kiềm KOH thủy phân chất béo sinh ra glixerol và xà phòng kali mềm dạng lỏng.'
        },
        message: {
            EN: 'Saponification: Triglycerides react with Potassium Hydroxide to yield Glycerol and Liquid Soft Soap.',
            VN: 'Xà phòng hóa: Thủy phân chất béo trong KOH tạo ra Glixerol và Xà phòng lỏng mềm.'
        },
        effect: 'bubbles',
        temperatureSpike: 25
    },
    {
        reactants: ['ACETIC_ACID', 'ETHANOL'],
        product: 'ETHYL_ACETATE',
        products: ['ETHYL_ACETATE'],
        equation: {
            EN: 'CH₃COOH (l) + C₂H₅OH (l) ⇌ CH₃COOC₂H₅ (l) + H₂O (l) (Fruity Ester Fragrance)',
            VN: 'CH₃COOH (l) + C₂H₅OH (l) ⇌ CH₃COOC₂H₅ (l) + H₂O (l) (Phản Ứng Este Hóa Mùi Thơm Hoa Quả)'
        },
        reactionType: {
            EN: 'Fischer Esterification',
            VN: 'Phản Ứng Este Hóa Fischer'
        },
        mechanism: {
            EN: 'Acid-catalyzed reversible condensation between acetic acid and ethanol synthesizes Ethyl Acetate, an ester with a delightful sweet, fruity fragrance.',
            VN: 'Phản ứng este hóa giữa axit axetic và rượu etylic tạo este Etyl Axetat có mùi thơm ngọt ngào của quả chín.'
        },
        message: {
            EN: 'Esterification Complete: Acetic Acid and Ethanol condense to synthesize fragrant, fruity Ethyl Acetate!',
            VN: 'Este hóa thành công: Axit axetic tác dụng với rượu etylic tạo este Etyl Axetat có mùi thơm hoa quả!'
        },
        effect: 'bubbles',
        temperatureSpike: 10
    },

    // ==========================================
    // T. REDOX DECOLORIZATION & COMBUSTION
    // ==========================================
    {
        reactants: ['GLUCOSE', 'KMnO4'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'Glucose + KMnO₄ + H₂SO₄ → Gluconic Acid + MnSO₄ (Decolorization of Purple Solution)',
            VN: 'Glucozơ + KMnO₄ + H₂SO₄ → Axit Gluconic + MnSO₄ (Mất Màu Tím Thuốc Tím)'
        },
        reactionType: {
            EN: 'Carbohydrate Permanganate Oxidation & Decolorization',
            VN: 'Glucozơ Khử Dung Dịch Thuốc Tím'
        },
        mechanism: {
            EN: 'Glucose reduces purple permanganate (Mn⁷⁺) ions to colorless manganese(II) (Mn²⁺) ions in acidic solution, demonstrating reducing sugar activity.',
            VN: 'Glucozơ khử ion Pemanganat màu tím thành ion Mangan(II) không màu, chứng minh tính chất khử của đường glucozơ.'
        },
        message: {
            EN: 'Decolorization Test: Glucose reduces purple Potassium Permanganate solution to colorless Mn²⁺.',
            VN: 'Mất màu thuốc tím: Glucozơ khử dung dịch KMnO₄ từ màu tím đậm thành dung dịch không màu.'
        },
        effect: 'color_shift',
        productColor: '#f8fafc',
        temperatureSpike: 12
    },
    {
        reactants: ['HYDROGEN_GAS', 'O2'],
        product: 'DISTILLED_WATER',
        products: ['DISTILLED_WATER'],
        equation: {
            EN: '2H₂ (g) + O₂ (g) → 2H₂O (l) (Exothermic Pop & Water Synthesis)',
            VN: '2H₂ (k) + O₂ (k) → 2H₂O (l) (Nổ Bốp Tạo Nước Tinh Khiết)'
        },
        reactionType: {
            EN: 'Hydrogen Clean Combustion / Fuel Cell Reaction',
            VN: 'Phản Ứng Cháy Của Khí Hydro / Năng Lượng Xanh'
        },
        mechanism: {
            EN: 'Extreme exothermic radical chain reaction! Hydrogen gas burns cleanly in oxygen with an explosive pop, forming deionized water molecules and zero carbon emissions.',
            VN: 'Phản ứng cháy dây chuyền tỏa nhiệt cực mạnh! Khí Hydro cháy tinh khiết trong Oxy phát tiếng nổ bốp vui tai, tạo thành phân tử nước sạch và hoàn toàn không phát thải carbon.'
        },
        message: {
            EN: 'Clean Energy Combustion: Hydrogen reacts with Oxygen with an energetic pop to synthesize pure water!',
            VN: 'Năng lượng sạch: Khí Hydro phản ứng với Oxy tạo tiếng nổ bốp và ngưng tụ thành nước tinh khiết!'
        },
        effect: 'explosion',
        temperatureSpike: 90,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['C', 'O2'],
        product: 'CARBON_DIOXIDE',
        products: ['CARBON_DIOXIDE'],
        equation: {
            EN: 'C (s) + O₂ (g) → CO₂ (g) ↑ (Incandescent Combustion)',
            VN: 'C (r) + O₂ (k) → CO₂ (k) ↑ (Cacbon Cháy Sáng Rực)'
        },
        reactionType: {
            EN: 'Elemental Carbon Combustion',
            VN: 'Sự Cháy Của Cacbon Than Chì'
        },
        mechanism: {
            EN: 'Solid carbon glows with radiant orange incandescence in oxygen, oxidizing completely to gaseous carbon dioxide.',
            VN: 'Cacbon cháy sáng chói lọi trong khí oxy, tỏa nhiệt lượng lớn và sinh khí cacbonic CO₂.'
        },
        message: {
            EN: 'Combustion: Carbon glows incandescently in Oxygen to generate Carbon Dioxide (CO₂) gas.',
            VN: 'Phản ứng cháy: Cacbon cháy sáng chói trong Oxy sinh ra khí CO₂.'
        },
        effect: 'fire',
        temperatureSpike: 75
    },
    {
        reactants: ['MAGNESIUM', 'O2'],
        product: 'MgO_SOLID',
        products: ['MgO_SOLID'],
        minTemperature: 100,
        equation: {
            EN: '2Mg (s) + O₂ (g) → 2MgO (s) (Blinding White Flash Flare)',
            VN: '2Mg (r) + O₂ (k) → 2MgO (r) (Ngọn Lửa Trắng Chói Lòa Cực Sáng)'
        },
        reactionType: {
            EN: 'Magnesium Incandescent Flare Combustion',
            VN: 'Phản Ứng Cháy Chói Lòa Của Magie'
        },
        mechanism: {
            EN: 'Magnesium ribbon burns in oxygen with a blinding incandescent pure white flare (over 3000 K), producing white magnesium oxide powder.',
            VN: 'Dải Magie cháy bùng trong khí oxy với ngọn lửa trắng chói lòa làm lóa mắt (nhiệt độ trên 3000 K), tạo tàn tro Magie Oxit màu trắng.'
        },
        message: {
            EN: 'Incandescent Flare! Magnesium burns with a blinding, dazzling white flame to produce white Magnesium Oxide.',
            VN: 'Ngọn lửa chói lòa! Magie bốc cháy với ngọn lửa trắng sáng rực rỡ tạo tro trắng Magie Oxit.'
        },
        effect: 'fire',
        temperatureSpike: 100,
        requiresPopup: true,
        hazardLevel: 'WARNING'
    },

    // ==========================================
    // U. ADVANCED VIETNAMESE & AP TEST REACTIONS
    // ==========================================
    {
        reactants: ['STARCH', 'IODINE_SOLUTION'],
        product: 'STARCH_IODINE_COMPLEX',
        products: ['STARCH_IODINE_COMPLEX'],
        equation: {
            EN: '(C₆H₁₀O₅)ₙ + I₂ → [I₅⁻@amylose] (Deep Blue-Black Amylose Helix Complex)',
            VN: '(C₆H₁₀O₅)ₙ + I₂ → Hợp chất bọc Tinh bột - Iot (Màu Xanh Tím Đặc Trưng Hóa 12)'
        },
        reactionType: {
            EN: 'Starch-Iodine Inclusion Complexation',
            VN: 'Phản Ứng Tạo Hợp Chất Bọc Tinh Bột - Iot'
        },
        mechanism: {
            EN: 'Iodide and iodine molecules slip into the central hydrophobic helical cavity of amylose coils, forming a polyiodide inclusion complex that exhibits a striking midnight-navy blue-black absorption spectrum.',
            VN: 'Các phân tử Iot chui vào trong các ống xoắn ốc hình trụ của amilozơ, tạo hợp chất bọc có màu xanh tím thẫm đặc trưng kinh điển của Hóa học 12.'
        },
        message: {
            EN: 'Carbohydrate Identification: Starch reacts with Iodine to form an iconic deep navy blue-black inclusion complex!',
            VN: 'Nhận biết Cacbohiđrat: Hồ tinh bột tác dụng với dung dịch Iot tạo hợp chất bọc màu xanh tím đặc trưng!'
        },
        effect: 'color_shift',
        productColor: '#1e1b4b',
        temperatureSpike: 5,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['GLUCOSE', 'CuOH2_PRECIPITATE'],
        product: 'Cu2O_PRECIPITATE',
        products: ['Cu2O_PRECIPITATE', 'DISTILLED_WATER'],
        minTemperature: 60,
        equation: {
            EN: 'C₆H₁₂O₆ + 2Cu(OH)₂ + NaOH -(t°)-> C₆H₁₁O₇Na + Cu₂O ↓ (Brick Red) + 3H₂O',
            VN: 'C₆H₁₂O₆ + 2Cu(OH)₂ + NaOH -(t°)-> Natri Gluconat + Cu₂O ↓ (Đỏ Gạch) + 3H₂O'
        },
        reactionType: {
            EN: 'Fehling / Benedict Reducing Sugar Test',
            VN: 'Phản Ứng Oxi Hóa Đường Khử Bằng Cu(OH)₂ (Đỏ Gạch)'
        },
        mechanism: {
            EN: 'Under alkaline heating, the open-chain aldehyde group of glucose reduces divalent copper ions Cu²⁺ to univalent cuprous oxide (Cu₂O), which precipitates as a dense brick-red solid.',
            VN: 'Khi đun nóng trong môi trường kiềm, nhóm chức andehit (-CHO) của glucozơ khử Cu(II) thành Cu(I), tạo kết tủa đồng(I) oxit Cu₂O màu đỏ gạch không tan.'
        },
        message: {
            EN: 'Fehling Test Complete: Glucose reduces Cu(OH)₂ under heat to form a dense brick-red Copper(I) Oxide (Cu₂O) precipitate!',
            VN: 'Phản ứng Fehling thành công: Glucozơ đun nóng với Cu(OH)₂ sinh ra kết tủa Đỏ Gạch Cu₂O đặc trưng!'
        },
        effect: 'color_shift',
        productColor: '#b91c1c',
        temperatureSpike: 30,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['ALBUMIN_PROTEIN', 'CuOH2_PRECIPITATE'],
        product: 'BIURET_COMPLEX',
        products: ['BIURET_COMPLEX'],
        equation: {
            EN: 'Protein (Albumin) + Cu(OH)₂ → [Cu(Peptide)₂]²⁺ (Royal Violet Biuret Chelate)',
            VN: 'Protein (Lòng trắng trứng) + Cu(OH)₂ → Phức Chất Màu Tím Biuret Đặc Trưng'
        },
        reactionType: {
            EN: 'Biuret Peptide Bond Coordination Test',
            VN: 'Phản Ứng Màu Biuret Nhận Biết Protein'
        },
        mechanism: {
            EN: 'At least two adjacent peptide bonds (-CO-NH-) coordinate with Cu²⁺ ions in alkaline medium, yielding a brilliant royal violet-purple coordination chelate.',
            VN: 'Các liên kết peptit (-CO-NH-) trong phân tử protein tạo phức chelat với ion Cu²⁺ trong môi trường kiềm, tạo ra dung dịch có màu tím đặc trưng.'
        },
        message: {
            EN: 'Biuret Test Positive: Egg Albumin Protein coordinates with Cu(OH)₂ to produce a royal violet-purple peptide complex!',
            VN: 'Phản ứng màu Biuret dương tính: Lòng trắng trứng tác dụng với Cu(OH)₂ tạo dung dịch màu tím hoa cà rực rỡ!'
        },
        effect: 'color_shift',
        productColor: '#7c3aed',
        temperatureSpike: 10,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['PHENOL', 'BROMINE_WATER'],
        product: 'TRIBROMOPHENOL_PRECIPITATE',
        products: ['TRIBROMOPHENOL_PRECIPITATE', 'HCl'],
        equation: {
            EN: 'C₆H₅OH + 3Br₂ (aq) → C₆H₂Br₃OH ↓ (White Precipitate) + 3HBr',
            VN: 'C₆H₅OH + 3Br₂ (dd) → C₆H₂Br₃OH ↓ (Kết Tủa Trắng) + 3HBr'
        },
        reactionType: {
            EN: 'Electrophilic Aromatic Bromination Test for Phenol',
            VN: 'Phản Ứng Brom Hóa Nhận Biết Phenol'
        },
        mechanism: {
            EN: 'The strong electron-donating resonance of the phenolic -OH group activates ortho and para positions of the benzene ring, rapidly precipitating insoluble white 2,4,6-tribromophenol and decolorizing orange bromine water.',
            VN: 'Nhóm -OH đẩy electron làm tăng mật độ điện tích ở các vị trí ortho và para của vòng benzen, lập tức phản ứng với nước brom tạo kết tủa trắng 2,4,6-tribromphenol và làm mất màu nước brom.'
        },
        message: {
            EN: 'Phenol Test: Bromine Water reacts instantaneously with Phenol, forming white 2,4,6-tribromophenol precipitate!',
            VN: 'Nhận biết Phenol: Nước brom tác dụng với Phenol tạo ngay kết tủa trắng 2,4,6-tribromphenol!'
        },
        effect: 'color_shift',
        productColor: '#f8fafc',
        temperatureSpike: 25,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['CaC2', 'DISTILLED_WATER'],
        product: 'CaOH2',
        products: ['CaOH2', 'ACETYLENE_GAS'],
        equation: {
            EN: 'CaC₂ (s) + 2H₂O (l) → Ca(OH)₂ (aq) + C₂H₂ (g) ↑ (Vigorous Acetylene Gas Evolution)',
            VN: 'CaC₂ (r) + 2H₂O (l) → Ca(OH)₂ (dd) + C₂H₂ (k) ↑ (Khí Axetilen Sủi Bọt Mãnh Liệt)'
        },
        reactionType: {
            EN: 'Carbide Hydrolysis / Acetylene Synthesis',
            VN: 'Thủy Phân Canxi Cacbua Sinh Khí Axetilen'
        },
        mechanism: {
            EN: 'Calcium carbide hydrolyzes vigorously and exothermically in water, releasing copious bubbles of pungent acetylene gas and leaving a cloudy alkaline limewater solution.',
            VN: 'Canxi cacbua (đất đèn) phản ứng mãnh liệt với nước tỏa nhiệt lớn, sủi bọt khí axetilen (C₂H₂) xối xả và để lại dung dịch nước vôi trong Ca(OH)₂.'
        },
        message: {
            EN: 'Acetylene Generation! Calcium Carbide reacts vigorously with Water to evolve flammable Acetylene (C₂H₂) gas!',
            VN: 'Điều chế khí axetilen! Đất đèn phản ứng sủi bọt mãnh liệt với nước sinh khí C₂H₂!'
        },
        effect: 'fizz',
        temperatureSpike: 65,
        requiresPopup: true,
        hazardLevel: 'WARNING'
    },
    {
        reactants: ['ACETYLENE_GAS', 'BROMINE_WATER'],
        product: 'DISTILLED_WATER',
        products: ['DISTILLED_WATER'],
        equation: {
            EN: 'CH≡CH + 2Br₂ → CHBr₂-CHBr₂ (Bromine Decolorization by Alkyne)',
            VN: 'CH≡CH + 2Br₂ → CHBr₂-CHBr₂ (Axetilen Làm Mất Màu Nước Brom)'
        },
        reactionType: {
            EN: 'Electrophilic Addition to Carbon-Carbon Triple Bond',
            VN: 'Phản Ứng Cộng Hợp Nước Brom Vào Liên Kết Ba'
        },
        mechanism: {
            EN: 'Bromine molecules add across the electron-rich pi bonds of the acetylene triple bond, turning the vibrant reddish-amber bromine water into a completely clear, colorless tetrahaloalkane solution.',
            VN: 'Các phân tử brom cộng vào liên kết ba của axetilen làm đứt 2 liên kết pi, làm mất màu hoàn toàn dung dịch nước brom màu da cam.'
        },
        message: {
            EN: 'Alkyne Test: Acetylene gas decolorizes orange Bromine Water by electrophilic addition!',
            VN: 'Nhận biết Ankin: Khí Axetilen làm mất màu hoàn toàn nước brom!'
        },
        effect: 'bubbles',
        productColor: '#f8fafc',
        temperatureSpike: 15
    },
    {
        reactants: ['ETHYL_ACETATE', 'NaOH'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE', 'ETHANOL'],
        minTemperature: 60,
        equation: {
            EN: 'CH₃COOC₂H₅ + NaOH -(t°)-> CH₃COONa + C₂H₅OH (Ester Saponification / Alkaline Cleavage)',
            VN: 'CH₃COOC₂H₅ + NaOH -(t°)-> CH₃COONa + C₂H₅OH (Thủy Phân Este Trong Môi Trường Kiềm)'
        },
        reactionType: {
            EN: 'Alkaline Ester Hydrolysis (Saponification)',
            VN: 'Thủy Phân Este Trong Dung Dịch Kiềm'
        },
        mechanism: {
            EN: 'Hydroxide ion attacks the carbonyl carbon of ethyl acetate in nucleophilic acyl substitution, irreversibly cleaving the ester into water-soluble sodium acetate and ethanol.',
            VN: 'Ion OH⁻ tấn công vào nguyên tử cacbon của nhóm cacbonyl, cắt đứt liên kết este không thuận nghịch để tạo muối natri axetat và rượu etylic.'
        },
        message: {
            EN: 'Saponification: Ethyl Acetate hydrolyzes in Sodium Hydroxide to yield Sodium Acetate and Ethanol!',
            VN: 'Thủy phân este: Etyl Axetat tác dụng với NaOH sinh ra Natri Axetat và Cồn Etylic!'
        },
        effect: 'bubbles',
        productColor: '#f8fafc',
        temperatureSpike: 20
    },
    {
        reactants: ['ACETALDEHYDE', 'BROMINE_WATER'],
        product: 'ACETIC_ACID',
        products: ['ACETIC_ACID', 'HCl'],
        equation: {
            EN: 'CH₃CHO + Br₂ + H₂O → CH₃COOH + 2HBr (Aldehyde Oxidation by Bromine)',
            VN: 'CH₃CHO + Br₂ + H₂O → CH₃COOH + 2HBr (Andehit Axetic Khử Nước Brom)'
        },
        reactionType: {
            EN: 'Aldehyde Oxidation / Bromine Decolorization',
            VN: 'Oxi Hóa Andehit Bằng Nước Brom'
        },
        mechanism: {
            EN: 'Acetaldehyde reduces bromine to hydrobromic acid while itself being oxidized to acetic acid, discharging the orange bromine color.',
            VN: 'Andehit axetic bị oxi hóa thành axit axetic đồng thời khử brom thành HBr làm mất màu dung dịch brom.'
        },
        message: {
            EN: 'Decolorization: Acetaldehyde oxidizes to Acetic Acid, instantly discharging orange Bromine Water!',
            VN: 'Mất màu nước brom: Andehit axetic làm mất màu nước brom tạo axit axetic!'
        },
        effect: 'bubbles',
        productColor: '#f8fafc',
        temperatureSpike: 15
    },
    {
        reactants: ['BaCl2', 'Na2SO4'],
        product: 'BaSO4_PRECIPITATE',
        products: ['BaSO4_PRECIPITATE', 'SALT_WATER'],
        equation: {
            EN: 'BaCl₂ (aq) + Na₂SO₄ (aq) → BaSO₄ ↓ (White) + 2NaCl (aq) (Sulfate Precipitation)',
            VN: 'BaCl₂ (dd) + Na₂SO₄ (dd) → BaSO₄ ↓ (Kết Tủa Trắng) + 2NaCl (dd) (Nhận Biết Ion Sunfat)'
        },
        reactionType: {
            EN: 'Barium Sulfate Qualitative Analytical Precipitation',
            VN: 'Phản Ứng Nhận Biết Gốc Sunfat Bằng Muối Bari'
        },
        mechanism: {
            EN: 'Extremely low solubility product (Ksp = 1.1 × 10⁻¹⁰) causes instantaneous white crystalline precipitation of Barium Sulfate, insoluble even in concentrated mineral acids.',
            VN: 'Tích số tan cực nhỏ khiến BaSO₄ kết tủa trắng tinh ngay lập tức khi ion Ba²⁺ gặp ion SO₄²⁻, kết tủa này không tan ngay cả trong axit mạnh.'
        },
        message: {
            EN: 'Sulfate Test: Barium Chloride reacts with Sodium Sulfate to precipitate insoluble white Barium Sulfate!',
            VN: 'Nhận biết sunfat: Bari Clorua tác dụng với Natri Sunfat tạo kết tủa trắng BaSO₄ không tan trong axit!'
        },
        effect: 'color_shift',
        productColor: '#ffffff',
        temperatureSpike: 10,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['LITHIUM', 'HNO3'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Li (s) + 2HNO₃ (aq) → 2LiNO₃ (aq) + H₂ (g) ↑ (Violent Acidic Detonation)',
            VN: '2Li (r) + 2HNO₃ (dd) → 2LiNO₃ (dd) + H₂ (k) ↑ (Phản Ứng Phát Nổ Mãnh Liệt)'
        },
        reactionType: {
            EN: 'Alkali Metal + Strong Acid Explosion',
            VN: 'Nổ Kim Loại Kiềm & Axit Nitric Mạnh'
        },
        mechanism: {
            EN: 'Lithium metal undergoes rapid electron transfer to protons and nitrate, generating extreme heat and hydrogen gas detonation.',
            VN: 'Kim loại liti phản ứng nổ dữ dội với axit nitric giải phóng khí hydro và tỏa nhiệt cực đại.'
        },
        message: {
            EN: 'CRITICAL HAZARD: Lithium violently detonates in concentrated Nitric Acid!',
            VN: 'NGUY HIỂM CỰC ĐỘ: Liti phát nổ mãnh liệt khi tiếp xúc với Axit Nitric đặc!'
        },
        effect: 'explosion',
        requiresPopup: true,
        temperatureSpike: 160,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['SODIUM', 'HNO3'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2HNO₃ (aq) → 2NaNO₃ (aq) + H₂ (g) ↑ (Violent Acidic Detonation)',
            VN: '2Na (r) + 2HNO₃ (dd) → 2NaNO₃ (dd) + H₂ (k) ↑ (Phản Ứng Phát Nổ Mãnh Liệt)'
        },
        reactionType: {
            EN: 'Sodium + Concentrated Acid Explosion',
            VN: 'Nổ Natri Trong Axit Nitric'
        },
        mechanism: {
            EN: 'Sodium reacts instantaneously with nitric acid, generating an incandescent fireball and shockwave.',
            VN: 'Natri phản ứng tức thì với axit nitric tạo quả cầu lửa chói lòa và sóng xung kích.'
        },
        effect: 'explosion',
        requiresPopup: true,
        temperatureSpike: 180,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['POTASSIUM', 'HNO3'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: '2K (s) + 2HNO₃ (aq) → 2KNO₃ (aq) + H₂ (g) ↑ (Violent Acidic Detonation)',
            VN: '2K (r) + 2HNO₃ (dd) → 2KNO₃ (dd) + H₂ (k) ↑ (Phản Ứng Phát Nổ Mãnh Liệt)'
        },
        reactionType: {
            EN: 'Potassium + Concentrated Acid Detonation',
            VN: 'Nổ Kali Trong Axit Nitric'
        },
        mechanism: {
            EN: 'Hyper-reactive potassium detonates violently in concentrated nitric acid with a brilliant purple flash.',
            VN: 'Kali siêu hoạt động phát nổ dữ dội trong axit nitric tạo ánh chớp màu tím tím chói lòa.'
        },
        effect: 'explosion',
        requiresPopup: true,
        temperatureSpike: 200,
        hazardLevel: 'CRITICAL'
    },

    // ==========================================
    // J. ADVANCED ORGANIC CHEMISTRY & SPECIALIZED AP / GDPT 2018 PATHWAYS
    // ==========================================
    {
        reactants: ['METHANOL', 'SODIUM'],
        product: 'SODIUM_METHOXIDE',
        products: ["SODIUM_METHOXIDE","HYDROGEN_GAS"],
        equation: {
            EN: '2CH₃OH (l) + 2Na (s) → 2CH₃ONa (aq) + H₂ (g) ↑',
            VN: '2CH₃OH (l) + 2Na (r) → 2CH₃ONa (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Alcohol Deprotonation & Hydrogen Redox',
            VN: 'Thế Nguyên Tử H Của Nhóm -OH Rượu'
        },
        mechanism: {
            EN: 'Sodium metal reduces the polar hydroxyl proton of methanol, releasing effervescent hydrogen gas and forming a strong alkoxide base (sodium methoxide).',
            VN: 'Natri khử nguyên tử hydro linh động của nhóm -OH trong metanol, giải phóng bọt khí hydro và tạo dung dịch bazơ ancolat natri metoxit.'
        },
        message: {
            EN: 'Alcohol reaction: Sodium dissolves in methanol with steady Hydrogen (H₂) effervescence.',
            VN: 'Phản ứng của rượu: Natri tan trong metanol sủi bọt khí Hydro (H₂) liên tục.'
        },
        effect: 'bubbles',
        temperatureSpike: 35,
    },
    {
        reactants: ['METHANOL', 'POTASSIUM'],
        product: 'SODIUM_METHOXIDE',
        products: ["SODIUM_METHOXIDE","HYDROGEN_GAS"],
        equation: {
            EN: '2CH₃OH (l) + 2K (s) → 2CH₃OK (aq) + H₂ (g) ↑',
            VN: '2CH₃OH (l) + 2K (r) → 2CH₃OK (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Vigorous Alkoxide Synthesis',
            VN: 'Tổng Hợp Ancolat Tỏa Nhiệt Nhanh'
        },
        mechanism: {
            EN: 'Potassium reacts vigorously with methanol, producing potassium methoxide and rapid hydrogen gas bubbling.',
            VN: 'Kali tác dụng mãnh liệt với metanol giải phóng khí hydro nhanh và tỏa nhiệt cao.'
        },
        message: {
            EN: 'Vigorous reaction: Potassium reacts with methanol evolving Hydrogen gas.',
            VN: 'Phản ứng mạnh: Kali phản ứng với metanol sủi bọt khí Hydro.'
        },
        effect: 'bubbles',
        temperatureSpike: 55,
    },
    {
        reactants: ['ETHANOL', 'POTASSIUM'],
        product: 'POTASSIUM_ETHOXIDE',
        products: ["POTASSIUM_ETHOXIDE","HYDROGEN_GAS"],
        equation: {
            EN: '2C₂H₅OH (l) + 2K (s) → 2C₂H₅OK (aq) + H₂ (g) ↑',
            VN: '2C₂H₅OH (l) + 2K (r) → 2C₂H₅OK (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Ethanol Deprotonation & Redox',
            VN: 'Thế Nguyên Tử H Ancol Etylic Bằng Kali'
        },
        mechanism: {
            EN: 'Potassium reduces ethanol hydroxyl protons, generating soluble potassium ethoxide and effervescent hydrogen gas.',
            VN: 'Kali khử hydro linh động trong etanol tạo muối kali etoxit và sủi bọt khí hydro.'
        },
        message: {
            EN: 'Ethanol deprotonation: Potassium dissolves with rapid H₂ effervescence.',
            VN: 'Kali tan nhanh trong rượu etylic sủi bọt khí H₂.'
        },
        effect: 'bubbles',
        temperatureSpike: 50,
    },
    {
        reactants: ['GLYCEROL', 'SODIUM'],
        product: 'SODIUM_METHOXIDE',
        products: ["SODIUM_METHOXIDE","HYDROGEN_GAS"],
        equation: {
            EN: '2C₃H₅(OH)₃ + 6Na → 2C₃H₅(ONa)₃ + 3H₂ (g) ↑',
            VN: '2C₃H₅(OH)₃ + 6Na → 2C₃H₅(ONa)₃ + 3H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Polyol Tri-alkoxide Synthesis',
            VN: 'Thế Hydro Trong Ancol Đa Chức Glixerol'
        },
        mechanism: {
            EN: 'All three hydroxyl groups of viscous glycerol react with sodium metal, releasing abundant hydrogen gas.',
            VN: 'Cả ba nhóm -OH trong glixerol đều tác dụng với natri giải phóng lượng lớn khí hydro.'
        },
        message: {
            EN: 'Polyol reaction: Glycerol reacts with Sodium evolving 3 molar equivalents of H₂.',
            VN: 'Glixerol phản ứng với Natri giải phóng 3 đương lượng khí Hydro.'
        },
        effect: 'bubbles',
        temperatureSpike: 45,
    },
    {
        reactants: ['METHANOL', 'ACETIC_ACID'],
        product: 'METHYL_ACETATE',
        equation: {
            EN: 'CH₃COOH (l) + CH₃OH (l) ⇌ CH₃COOCH₃ (l) + H₂O (l)',
            VN: 'CH₃COOH (l) + CH₃OH (l) ⇌ CH₃COOCH₃ (l) + H₂O (l)'
        },
        reactionType: {
            EN: 'Fischer Esterification (Apple Aroma)',
            VN: 'Phản Ứng Este Hóa (Hương Táo Thơm Mát)'
        },
        mechanism: {
            EN: 'Nucleophilic acyl substitution between acetic acid and methanol produces methyl acetate, releasing a pleasant apple fruit scent.',
            VN: 'Phản ứng thế nhóm acyl giữa axit axetic và metanol tạo este metyl axetat có mùi thơm hoa quả dịu mát.'
        },
        message: {
            EN: 'Esterification: Pleasant sweet fruity apple fragrance of Methyl Acetate detected!',
            VN: 'Phản ứng este hóa: Mùi thơm dịu mát của Metyl Axetat lan tỏa!'
        },
        effect: 'color_shift',
        temperatureSpike: 10,
    },
    {
        reactants: ['METHANOL', 'FORMIC_ACID'],
        product: 'METHYL_ACETATE',
        equation: {
            EN: 'HCOOH (l) + CH₃OH (l) ⇌ HCOOCH₃ (l) + H₂O (l)',
            VN: 'HCOOH (l) + CH₃OH (l) ⇌ HCOOCH₃ (l) + H₂O (l)'
        },
        reactionType: {
            EN: 'Formate Esterification',
            VN: 'Este Hóa Axit Fomic Với Metanol'
        },
        mechanism: {
            EN: 'Acid-catalyzed condensation between formic acid and methanol forms volatile methyl formate ester.',
            VN: 'Phản ứng ngưng tụ giữa axit fomic và metanol tạo este metyl fomiat dễ bay hơi.'
        },
        message: {
            EN: 'Esterification: Methyl Formate ester synthesized.',
            VN: 'Este hóa: Tổng hợp este Metyl Fomiat.'
        },
        effect: 'color_shift',
        temperatureSpike: 10,
    },
    {
        reactants: ['ETHANOL', 'FORMIC_ACID'],
        product: 'ETHYL_FORMATE',
        equation: {
            EN: 'HCOOH (l) + C₂H₅OH (l) ⇌ HCOOC₂H₅ (l) + H₂O (l)',
            VN: 'HCOOH (l) + C₂H₅OH (l) ⇌ HCOOC₂H₅ (l) + H₂O (l)'
        },
        reactionType: {
            EN: 'Esterification (Rum & Peach Fragrance)',
            VN: 'Este Hóa (Hương Quả Đào & Rượu Rum)'
        },
        mechanism: {
            EN: 'Formic acid and ethanol condense into ethyl formate, the organic compound famous for giving ripe peaches and rum their distinct aroma.',
            VN: 'Axit fomic và etanol phản ứng tạo etyl fomiat mang mùi hương quả đào chín và rượu rum kinh điển.'
        },
        message: {
            EN: 'Ester fragrance: Sweet peach/rum aroma of Ethyl Formate released!',
            VN: 'Mùi hương este: Hương thơm ngọt ngào của Etyl Fomiat tỏa ra!'
        },
        effect: 'color_shift',
        temperatureSpike: 12,
    },
    {
        reactants: ['ETHANOL', 'KMnO4'],
        product: 'ACETIC_ACID',
        products: ["ACETIC_ACID","SALT_WATER"],
        equation: {
            EN: '5C₂H₅OH + 4KMnO₄ + 6H₂SO₄ → 5CH₃COOH + 4MnSO₄ + 2K₂SO₄ + 11H₂O',
            VN: '5C₂H₅OH + 4KMnO₄ + 6H₂SO₄ → 5CH₃COOH + 4MnSO₄ + 2K₂SO₄ + 11H₂O'
        },
        reactionType: {
            EN: 'Alcohol Oxidation (Breathalyzer Reaction)',
            VN: 'Oxi Hóa Rượu Etylic (Nguyên Lý Máy Đo Nồng Độ Cồn)'
        },
        mechanism: {
            EN: 'Potassium permanganate vigorously oxidizes ethanol into acetic acid, reducing purple MnO₄⁻ to colorless Mn²⁺ (instant decolorization).',
            VN: 'Thuốc tím oxi hóa mạnh etanol thành axit axetic, ion MnO₄⁻ màu tím bị khử thành ion Mn²⁺ không màu (mất màu tím tức thì).'
        },
        message: {
            EN: 'Alcohol oxidation: Purple KMnO₄ decolorizes as Ethanol is oxidized to Acetic Acid!',
            VN: 'Oxi hóa ancol: Dung dịch thuốc tím mất màu khi Etanol bị oxi hóa thành Axit Axetic!'
        },
        effect: 'color_shift',
        temperatureSpike: 35,
    },
    {
        reactants: ['METHANOL', 'KMnO4'],
        product: 'FORMIC_ACID',
        products: ["FORMIC_ACID","SALT_WATER"],
        equation: {
            EN: '5CH₃OH + 4KMnO₄ + 6H₂SO₄ → 5HCOOH + 4MnSO₄ + 2K₂SO₄ + 11H₂O',
            VN: '5CH₃OH + 4KMnO₄ + 6H₂SO₄ → 5HCOOH + 4MnSO₄ + 2K₂SO₄ + 11H₂O'
        },
        reactionType: {
            EN: 'Methanol Permanganate Oxidation',
            VN: 'Oxi Hóa Metanol Bằng Dung Dịch Thuốc Tím'
        },
        mechanism: {
            EN: 'Methanol is rapidly oxidized by permanganate in acidic media into formic acid, discharging the deep purple color.',
            VN: 'Metanol bị oxi hóa nhanh bởi dung dịch thuốc tím thành axit fomic, làm mất màu tím dung dịch.'
        },
        message: {
            EN: 'Redox Decolorization: Purple KMnO₄ discharged by Methanol oxidation.',
            VN: 'Mất màu thuốc tím do Metanol bị oxi hóa thành Axit Fomic.'
        },
        effect: 'color_shift',
        temperatureSpike: 35,
    },
    {
        reactants: ['ACETIC_ACID', 'POTASSIUM'],
        product: 'POTASSIUM_ACETATE',
        products: ["POTASSIUM_ACETATE","HYDROGEN_GAS"],
        equation: {
            EN: '2CH₃COOH (aq) + 2K (s) → 2CH₃COOK (aq) + H₂ (g) ↑',
            VN: '2CH₃COOH (dd) + 2K (r) → 2CH₃COOK (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Vigorous Carboxylate Synthesis',
            VN: 'Phản Ứng Kim Loại Kali Với Axit Axetic'
        },
        mechanism: {
            EN: 'Potassium reacts intensely with acetic acid releasing hydrogen gas and heat.',
            VN: 'Kali phản ứng mãnh liệt với axit axetic giải phóng khí hydro và nhiệt lượng cao.'
        },
        message: {
            EN: 'Exothermic reaction: Potassium reacts with Acetic Acid.',
            VN: 'Kali phản ứng mãnh liệt tỏa nhiệt với Axit Axetic.'
        },
        effect: 'fire',
        temperatureSpike: 65,
    },
    {
        reactants: ['ACETIC_ACID', 'MAGNESIUM'],
        product: 'MAGNESIUM_ACETATE',
        products: ["MAGNESIUM_ACETATE","HYDROGEN_GAS"],
        equation: {
            EN: '2CH₃COOH (aq) + Mg (s) → (CH₃COO)₂Mg (aq) + H₂ (g) ↑',
            VN: '2CH₃COOH (dd) + Mg (r) → (CH₃COO)₂Mg (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Active Metal Acid Dissolution',
            VN: 'Axit Axetic Hòa Tan Kim Loại Magie'
        },
        mechanism: {
            EN: 'Magnesium metal dissolves in acetic acid, evolving steady streams of hydrogen gas bubbles.',
            VN: 'Dây magie tan dần trong dung dịch giấm ăn sủi bọt khí hydro liên tục.'
        },
        message: {
            EN: 'Magnesium dissolves: Steady H₂ gas evolution from Acetic Acid.',
            VN: 'Magie tan dần: Khí H₂ sủi bọt đều đặn trong axit axetic.'
        },
        effect: 'bubbles',
        temperatureSpike: 25,
    },
    {
        reactants: ['ACETIC_ACID', 'ZINC'],
        product: 'ZINC_ACETATE',
        products: ["ZINC_ACETATE","HYDROGEN_GAS"],
        equation: {
            EN: '2CH₃COOH (aq) + Zn (s) → (CH₃COO)₂Zn (aq) + H₂ (g) ↑',
            VN: '2CH₃COOH (dd) + Zn (r) → (CH₃COO)₂Zn (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Zinc Dissolution in Organic Acid',
            VN: 'Kẽm Tan Trong Axit Hữu Cơ'
        },
        mechanism: {
            EN: 'Zinc granules reduce acetic acid protons to evolve hydrogen bubbles.',
            VN: 'Hạt kẽm tan dần trong axit axetic tạo bọt khí hydro.'
        },
        message: {
            EN: 'Zinc dissolves in Acetic Acid evolving Hydrogen gas.',
            VN: 'Kẽm tan trong axit axetic giải phóng bọt khí hydro.'
        },
        effect: 'bubbles',
        temperatureSpike: 20,
    },
    {
        reactants: ['ACETIC_ACID', 'IRON'],
        product: 'IRON_ACETATE',
        products: ['IRON_ACETATE', 'HYDROGEN_GAS'],
        equation: {
            EN: '2CH₃COOH (aq) + Fe (s) → (CH₃COO)₂Fe (aq) + H₂ (g) ↑',
            VN: '2CH₃COOH (dd) + Fe (r) → (CH₃COO)₂Fe (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Iron Dissolution in Organic Acid',
            VN: 'Sắt Tan Chậm Trong Giấm Ăn'
        },
        mechanism: {
            EN: 'Iron shavings react slowly with warm acetic acid, liberating hydrogen bubbles and producing iron(II) acetate.',
            VN: 'Mạt sắt tan dần trong axit axetic giải phóng bọt khí hydro và tạo muối sắt(II) axetat.'
        },
        message: {
            EN: 'Iron reacts with Acetic Acid evolving gentle H₂ bubbles.',
            VN: 'Sắt phản ứng với axit axetic sủi bọt khí H₂.'
        },
        effect: 'bubbles',
        productColor: '#d97706',
        temperatureSpike: 15,
    },
    {
        reactants: ['ACETIC_ACID', 'CuOH2_PRECIPITATE'],
        product: 'COPPER_ACETATE',
        equation: {
            EN: '2CH₃COOH (aq) + Cu(OH)₂ (s) → (CH₃COO)₂Cu (aq) + 2H₂O (l)',
            VN: '2CH₃COOH (dd) + Cu(OH)₂ (r) → (CH₃COO)₂Cu (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Insoluble Base Dissolution (Cyan Verdigris Solution)',
            VN: 'Hòa Tan Kết Tủa Bazơ Cu(OH)₂ Tạo Lam Ngọc'
        },
        mechanism: {
            EN: 'Acetic acid dissolves light-blue copper(II) hydroxide precipitate into a vibrant turquoise-cyan solution of copper(II) acetate (verdigris).',
            VN: 'Axit axetic hòa tan kết tủa Cu(OH)₂ màu xanh lam tạo thành dung dịch đồng(II) axetat màu xanh lam ngọc tuyệt đẹp.'
        },
        message: {
            EN: 'Precipitate dissolves: Cu(OH)₂ dissolves in Acetic Acid into brilliant cyan Copper Acetate solution!',
            VN: 'Hòa tan kết tủa: Cu(OH)₂ tan trong axit axetic thành dung dịch Đồng Axetat màu lam ngọc!'
        },
        effect: 'color_shift',
        temperatureSpike: 15,
    },
    {
        reactants: ['ACETIC_ACID', 'FeOH3_PRECIPITATE'],
        product: 'IRON_ACETATE',
        products: ['IRON_ACETATE'],
        equation: {
            EN: '3CH₃COOH (aq) + Fe(OH)₃ (s) → (CH₃COO)₃Fe (aq) + 3H₂O (l)',
            VN: '3CH₃COOH (dd) + Fe(OH)₃ (r) → (CH₃COO)₃Fe (dd) + 3H₂O (l)'
        },
        reactionType: {
            EN: 'Rust Precipitate Dissolution',
            VN: 'Hòa Tan Kết Tủa Nâu Đỏ Fe(OH)₃'
        },
        mechanism: {
            EN: 'Brown iron(III) hydroxide dissolves into reddish-brown iron(III) acetate solution.',
            VN: 'Kết tủa nâu đỏ Fe(OH)₃ tan trong axit axetic tạo dung dịch muối sắt(III) axetat.'
        },
        message: {
            EN: 'Fe(OH)₃ precipitate dissolves in Acetic Acid into amber-brown Iron Acetate!',
            VN: 'Kết tủa nâu đỏ Fe(OH)₃ tan trong dung dịch axit axetic tạo dung dịch muối sắt axetat màu nâu hổ phách!'
        },
        effect: 'color_shift',
        productColor: '#d97706',
        temperatureSpike: 12,
    },
    {
        reactants: ['ACETIC_ACID', 'AlOH3_PRECIPITATE'],
        product: 'SALT_WATER',
        equation: {
            EN: '3CH₃COOH (aq) + Al(OH)₃ (s) → (CH₃COO)₃Al (aq) + 3H₂O (l)',
            VN: '3CH₃COOH (dd) + Al(OH)₃ (r) → (CH₃COO)₃Al (dd) + 3H₂O (l)'
        },
        reactionType: {
            EN: 'Amphoteric Hydroxide Dissolution',
            VN: 'Hòa Tan Kết Tủa Keo Trắng Al(OH)₃'
        },
        mechanism: {
            EN: 'Gelatinous aluminum hydroxide dissolves completely in acetic acid.',
            VN: 'Kết tủa keo trắng Al(OH)₃ tan hoàn toàn trong axit axetic.'
        },
        message: {
            EN: 'Al(OH)₃ precipitate dissolves in Acetic Acid.',
            VN: 'Kết tủa keo trắng Al(OH)₃ tan trong axit axetic.'
        },
        effect: 'color_shift',
        temperatureSpike: 10,
    },
    {
        reactants: ['ACETIC_ACID', 'KOH'],
        product: 'POTASSIUM_ACETATE',
        equation: {
            EN: 'CH₃COOH (aq) + KOH (aq) → CH₃COOK (aq) + H₂O (l)',
            VN: 'CH₃COOH (dd) + KOH (dd) → CH₃COOK (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Organic Acid Neutralization',
            VN: 'Trung Hòa Axit Hữu Cơ Bằng Bazơ Kiềm'
        },
        mechanism: {
            EN: 'Proton transfer between acetic acid and potassium hydroxide produces potassium acetate and water.',
            VN: 'Phản ứng trung hòa giữa axit axetic và KOH tạo muối kali axetat và nước.'
        },
        message: {
            EN: 'Neutralization: Acetic Acid neutralized by KOH.',
            VN: 'Phản ứng trung hòa: Axit axetic tác dụng vừa đủ với KOH.'
        },
        effect: 'fizz',
        temperatureSpike: 18,
    },
    {
        reactants: ['ACETIC_ACID', 'CaOH2'],
        product: 'SALT_WATER',
        equation: {
            EN: '2CH₃COOH (aq) + Ca(OH)₂ (aq) → (CH₃COO)₂Ca (aq) + 2H₂O (l)',
            VN: '2CH₃COOH (dd) + Ca(OH)₂ (dd) → (CH₃COO)₂Ca (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Limewater Neutralization by Vinegar',
            VN: 'Nước Vôi Trong Tác Dụng Với Giấm Ăn'
        },
        mechanism: {
            EN: 'Calcium hydroxide neutralizes acetic acid to form soluble calcium acetate.',
            VN: 'Canxi hydroxit phản ứng với axit axetic tạo muối canxi axetat tan.'
        },
        message: {
            EN: 'Neutralization: Acetic acid clarifies and neutralizes limewater.',
            VN: 'Trung hòa: Giấm ăn trung hòa nước vôi trong.'
        },
        effect: 'fizz',
        temperatureSpike: 15,
    },
    {
        reactants: ['ACETIC_ACID', 'BaOH2'],
        product: 'SALT_WATER',
        equation: {
            EN: '2CH₃COOH (aq) + Ba(OH)₂ (aq) → (CH₃COO)₂Ba (aq) + 2H₂O (l)',
            VN: '2CH₃COOH (dd) + Ba(OH)₂ (dd) → (CH₃COO)₂Ba (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Barium Acetate Neutralization',
            VN: 'Trung Hòa Bari Hydroxit Bằng Axit Axetic'
        },
        mechanism: {
            EN: 'Barium hydroxide reacts with acetic acid to yield soluble barium acetate.',
            VN: 'Bari hydroxit phản ứng với axit axetic tạo muối bari axetat.'
        },
        message: {
            EN: 'Neutralization: Ba(OH)₂ neutralized by Acetic Acid.',
            VN: 'Trung hòa Ba(OH)₂ bằng Axit Axetic.'
        },
        effect: 'fizz',
        temperatureSpike: 18,
    },
    {
        reactants: ['ACETIC_ACID', 'NH3_AQ'],
        product: 'SALT_WATER',
        equation: {
            EN: 'CH₃COOH (aq) + NH₃ (aq) → CH₃COONH₄ (aq)',
            VN: 'CH₃COOH (dd) + NH₃ (dd) → CH₃COONH₄ (dd)'
        },
        reactionType: {
            EN: 'Ammonium Acetate Buffer Synthesis',
            VN: 'Tổng Hợp Muối Amoni Axetat'
        },
        mechanism: {
            EN: 'Aqueous ammonia neutralizes acetic acid into ammonium acetate solution.',
            VN: 'Amoniac trung hòa axit axetic tạo thành dung dịch muối amoni axetat.'
        },
        message: {
            EN: 'Buffer synthesis: Ammonium Acetate formed.',
            VN: 'Tạo muối đệm amoni axetat.'
        },
        effect: 'fizz',
        temperatureSpike: 14,
    },
    {
        reactants: ['ACETIC_ACID', 'Na2CO3'],
        product: 'SODIUM_ACETATE',
        products: ["SODIUM_ACETATE","CARBON_DIOXIDE"],
        equation: {
            EN: '2CH₃COOH (aq) + Na₂CO₃ (aq) → 2CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: '2CH₃COOH (dd) + Na₂CO₃ (dd) → 2CH₃COONa (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Carbonate Acidification (Vinegar & Soda Fizz)',
            VN: 'Axit Axetic Phân Hủy Muối Cacbonat'
        },
        mechanism: {
            EN: 'Acetic acid decomposes sodium carbonate with violent Carbon Dioxide (CO₂) effervescence.',
            VN: 'Axit axetic phân hủy muối natri cacbonat sủi bọt khí CO₂ mãnh liệt.'
        },
        message: {
            EN: 'Vigorous Effervescence: Acetic Acid decomposes Soda Ash evolving CO₂ gas!',
            VN: 'Sủi bọt mạnh mẽ: Axit axetic tác dụng soda tạo bọt khí CO₂!'
        },
        effect: 'bubbles',
        temperatureSpike: 12,
    },
    {
        reactants: ['FORMIC_ACID', 'SODIUM'],
        product: 'SODIUM_FORMATE',
        products: ["SODIUM_FORMATE","HYDROGEN_GAS"],
        equation: {
            EN: '2HCOOH (aq) + 2Na (s) → 2HCOONa (aq) + H₂ (g) ↑',
            VN: '2HCOOH (dd) + 2Na (r) → 2HCOONa (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Formic Acid Deprotonation',
            VN: 'Natri Tác Dụng Axit Fomic'
        },
        mechanism: {
            EN: 'Sodium metal dissolves in formic acid with vigorous hydrogen gas bubbling.',
            VN: 'Natri tan mạnh trong axit fomic sủi bọt khí hydro.'
        },
        message: {
            EN: 'Sodium dissolves in Formic Acid evolving H₂ gas.',
            VN: 'Natri tan trong axit fomic giải phóng bọt khí H₂.'
        },
        effect: 'bubbles',
        temperatureSpike: 50,
    },
    {
        reactants: ['FORMIC_ACID', 'MAGNESIUM'],
        product: 'SALT_WATER',
        products: ["SALT_WATER","HYDROGEN_GAS"],
        equation: {
            EN: '2HCOOH (aq) + Mg (s) → (HCOO)₂Mg (aq) + H₂ (g) ↑',
            VN: '2HCOOH (dd) + Mg (r) → (HCOO)₂Mg (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Magnesium Formate Synthesis',
            VN: 'Magie Tác Dụng Axit Fomic'
        },
        mechanism: {
            EN: 'Magnesium dissolves in formic acid faster than in acetic acid due to higher acidity.',
            VN: 'Magie tan nhanh trong axit fomic sủi bọt khí hydro do axit fomic có tính axit mạnh hơn axit axetic.'
        },
        message: {
            EN: 'Magnesium dissolves in Formic Acid with rapid H₂ bubbles.',
            VN: 'Magie tan trong axit fomic sủi bọt khí H₂ nhanh.'
        },
        effect: 'bubbles',
        temperatureSpike: 30,
    },
    {
        reactants: ['FORMIC_ACID', 'ZINC'],
        product: 'SALT_WATER',
        products: ["SALT_WATER","HYDROGEN_GAS"],
        equation: {
            EN: '2HCOOH (aq) + Zn (s) → (HCOO)₂Zn (aq) + H₂ (g) ↑',
            VN: '2HCOOH (dd) + Zn (r) → (HCOO)₂Zn (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Zinc Formate Synthesis',
            VN: 'Kẽm Tác Dụng Axit Fomic'
        },
        mechanism: {
            EN: 'Zinc reacts with formic acid evolving hydrogen gas.',
            VN: 'Kẽm phản ứng với axit fomic sủi bọt khí hydro.'
        },
        message: {
            EN: 'Zinc dissolves in Formic Acid evolving Hydrogen.',
            VN: 'Kẽm tan trong axit fomic giải phóng hydro.'
        },
        effect: 'bubbles',
        temperatureSpike: 25,
    },
    {
        reactants: ['FORMIC_ACID', 'Na2CO3'],
        product: 'SODIUM_FORMATE',
        products: ["SODIUM_FORMATE","CARBON_DIOXIDE"],
        equation: {
            EN: '2HCOOH (aq) + Na₂CO₃ (aq) → 2HCOONa (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: '2HCOOH (dd) + Na₂CO₃ (dd) → 2HCOONa (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Formic Carbonate Decomposition',
            VN: 'Axit Fomic Sủi Bọt Với Muối Cacbonat'
        },
        mechanism: {
            EN: 'Rapid fizzing of carbon dioxide occurs when formic acid decomposes carbonate salts.',
            VN: 'Khí CO₂ sủi bọt mạnh khi axit fomic phân hủy muối cacbonat.'
        },
        message: {
            EN: 'Carbonate decomposition: Formic Acid releases brisk CO₂ gas.',
            VN: 'Axit fomic phân hủy muối cacbonat sủi bọt khí CO₂.'
        },
        effect: 'bubbles',
        temperatureSpike: 15,
    },
    {
        reactants: ['FORMIC_ACID', 'NaHCO3'],
        product: 'SODIUM_FORMATE',
        products: ["SODIUM_FORMATE","CARBON_DIOXIDE"],
        equation: {
            EN: 'HCOOH (aq) + NaHCO₃ (s) → HCOONa (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'HCOOH (dd) + NaHCO₃ (r) → HCOONa (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Bicarbonate Effervescence',
            VN: 'Axit Fomic Tác Dụng Muối Hidrocacbonat'
        },
        mechanism: {
            EN: 'Formic acid reacts with baking soda liberating carbon dioxide gas.',
            VN: 'Axit fomic phản ứng với muối nở NaHCO₃ sủi bọt khí CO₂.'
        },
        message: {
            EN: 'Brisk effervescence: Formic Acid + NaHCO₃ releases CO₂.',
            VN: 'Sủi bọt khí CO₂ khi trộn Axit Fomic với NaHCO₃.'
        },
        effect: 'bubbles',
        temperatureSpike: 10,
    },
    {
        reactants: ['FORMIC_ACID', 'KOH'],
        product: 'SALT_WATER',
        equation: {
            EN: 'HCOOH (aq) + KOH (aq) → HCOOK (aq) + H₂O (l)',
            VN: 'HCOOH (dd) + KOH (dd) → HCOOK (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Formic Acid Neutralization',
            VN: 'Trung Hòa Axit Fomic Bằng KOH'
        },
        mechanism: {
            EN: 'Exothermic neutralization produces potassium formate.',
            VN: 'Phản ứng trung hòa tạo muối kali fomiat.'
        },
        message: {
            EN: 'Neutralization: Formic Acid neutralized by KOH.',
            VN: 'Trung hòa Axit Fomic bằng KOH.'
        },
        effect: 'fizz',
        temperatureSpike: 20,
    },
    {
        reactants: ['FORMIC_ACID', 'KMnO4'],
        product: 'SALT_WATER',
        products: ["SALT_WATER","CARBON_DIOXIDE"],
        equation: {
            EN: '5HCOOH + 2KMnO₄ + 3H₂SO₄ → 5CO₂ (g) ↑ + 2MnSO₄ + K₂SO₄ + 8H₂O',
            VN: '5HCOOH + 2KMnO₄ + 3H₂SO₄ → 5CO₂ (k) ↑ + 2MnSO₄ + K₂SO₄ + 8H₂O'
        },
        reactionType: {
            EN: 'Formic Acid Aldehyde Oxidation (CO₂ Effervescence)',
            VN: 'Tính Chất Andehit Đặc Biệt Của Axit Fomic (Sủi Bọt CO₂ & Mất Màu Thuốc Tím)'
        },
        mechanism: {
            EN: 'Due to its unique aldehyde group (-CHO), formic acid is oxidized by potassium permanganate into Carbon Dioxide gas, simultaneously discharging the intense purple solution.',
            VN: 'Nhờ nhóm -CHO đặc biệt, axit fomic bị thuốc tím oxi hóa thành khí CO₂ sủi bọt và làm mất hoàn toàn màu tím của dung dịch.'
        },
        message: {
            EN: 'Aldehyde nature of Formic Acid: Decolorizes purple KMnO₄ with rapid CO₂ effervescence!',
            VN: 'Tính andehit của Axit Fomic: Làm mất màu thuốc tím và sủi bọt khí CO₂ liên tục!'
        },
        effect: 'bubbles',
        temperatureSpike: 40,
    },
    {
        reactants: ['FORMIC_ACID', 'CuOH2_PRECIPITATE'],
        product: 'Cu2O_PRECIPITATE',
        minTemperature: 60,
        equation: {
            EN: 'HCOOH + 2Cu(OH)₂ + 2NaOH -(t°)-> Na₂CO₃ + Cu₂O (s) ↓ + 4H₂O',
            VN: 'HCOOH + 2Cu(OH)₂ + 2NaOH -(t°)-> Na₂CO₃ + Cu₂O (r) ↓ + 4H₂O'
        },
        reactionType: {
            EN: 'Formic Acid Copper(I) Oxide Reduction',
            VN: 'Khử Cu(OH)₂ Thành Đồng(I) Oxit Đỏ Gạch'
        },
        mechanism: {
            EN: 'Formic acid uniquely reduces blue Cu(OH)₂ upon heating in alkaline solution to yield a brick-red Cu₂O precipitate.',
            VN: 'Axit fomic khử kết tủa Cu(OH)₂ màu xanh lam khi đun nóng tạo kết tủa Cu₂O màu đỏ gạch.'
        },
        message: {
            EN: 'Brick-red precipitate: Formic Acid reduces Cu(OH)₂ to Cu₂O upon heating!',
            VN: 'Kết tủa đỏ gạch: Axit Fomic khử Cu(OH)₂ thành Cu₂O khi đun nóng!'
        },
        effect: 'precipitate',
        temperatureSpike: 25,
    },
    {
        reactants: ['PHENOL', 'SODIUM'],
        product: 'SODIUM_PHENOLATE',
        products: ["SODIUM_PHENOLATE","HYDROGEN_GAS"],
        equation: {
            EN: '2C₆H₅OH (l) + 2Na (s) → 2C₆H₅ONa (aq) + H₂ (g) ↑',
            VN: '2C₆H₅OH (l) + 2Na (r) → 2C₆H₅ONa (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Phenol Deprotonation by Sodium',
            VN: 'Phenol Tác Dụng Với Kim Loại Kiềm Natri'
        },
        mechanism: {
            EN: 'Sodium reacts with molten phenol, evolving hydrogen gas bubbles and forming sodium phenolate.',
            VN: 'Natri phản ứng với phenol nóng chảy sủi bọt khí hydro tạo natri phenolat.'
        },
        message: {
            EN: 'Phenol reaction: Sodium dissolves in Phenol evolving H₂ bubbles.',
            VN: 'Natri tan trong phenol nóng chảy giải phóng bọt khí hydro.'
        },
        effect: 'bubbles',
        temperatureSpike: 45,
    },
    {
        reactants: ['PHENOL', 'POTASSIUM'],
        product: 'SODIUM_PHENOLATE',
        products: ["SODIUM_PHENOLATE","HYDROGEN_GAS"],
        equation: {
            EN: '2C₆H₅OH (l) + 2K (s) → 2C₆H₅OK (aq) + H₂ (g) ↑',
            VN: '2C₆H₅OH (l) + 2K (r) → 2C₆H₅OK (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Potassium Phenolate Synthesis',
            VN: 'Kali Tác Dụng Mãnh Liệt Với Phenol'
        },
        mechanism: {
            EN: 'Potassium reacts vigorously with phenol evolving hydrogen gas.',
            VN: 'Kali phản ứng mạnh với phenol giải phóng hydro.'
        },
        message: {
            EN: 'Vigorous reaction: Potassium reacts with Phenol.',
            VN: 'Kali phản ứng mãnh liệt với Phenol.'
        },
        effect: 'fire',
        temperatureSpike: 65,
    },
    {
        reactants: ['PHENOL', 'KOH'],
        product: 'SODIUM_PHENOLATE',
        equation: {
            EN: 'C₆H₅OH (s) + KOH (aq) → C₆H₅OK (aq) + H₂O (l)',
            VN: 'C₆H₅OH (r) + KOH (dd) → C₆H₅OK (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Phenol Dissolution in Caustic Potash',
            VN: 'Phenol Tan Trong Dung Dịch Kiềm KOH'
        },
        mechanism: {
            EN: 'Insoluble phenol dissolves rapidly in potassium hydroxide, proving the acidic influence of the phenyl ring on the -OH group.',
            VN: 'Phenol ít tan tan ngay trong dung dịch KOH chứng minh ảnh hưởng qua lại của vòng benzen làm tăng tính axit của nhóm -OH.'
        },
        message: {
            EN: 'Phenol dissolution: Turbid Phenol clarifies into transparent potassium phenolate.',
            VN: 'Phenol vẩn đục tan hoàn toàn trong dung dịch kiềm KOH.'
        },
        effect: 'fizz',
        temperatureSpike: 20,
    },
    {
        reactants: ['SODIUM_PHENOLATE', 'HCl'],
        product: 'PHENOL',
        equation: {
            EN: 'C₆H₅ONa (aq) + HCl (aq) → C₆H₅OH (turbid emulsion) ↓ + NaCl (aq)',
            VN: 'C₆H₅ONa (dd) + HCl (dd) → C₆H₅OH (vẩn đục) ↓ + NaCl (dd)'
        },
        reactionType: {
            EN: 'Phenol Acid Displacement (Regeneration of Turbidity)',
            VN: 'Đẩy Axit Yếu (Phenol Kết Tinh Vẩn Đục Trở Lại)'
        },
        mechanism: {
            EN: 'Strong mineral acid (HCl) displaces weak acid (phenol) from sodium phenolate. Phenol precipitates out as a milky turbid emulsion.',
            VN: 'Axit clohidric mạnh đẩy axit yếu phenol ra khỏi muối, làm dung dịch trong suốt hóa vẩn đục trắng sữa do phenol tách lớp.'
        },
        message: {
            EN: 'Acid displacement: Clear Sodium Phenolate turns milky turbid as insoluble Phenol precipitates!',
            VN: 'Axit mạnh đẩy axit yếu: Dung dịch natri phenolat trong suốt lập tức vẩn đục do phenol tách ra!'
        },
        effect: 'color_shift',
        temperatureSpike: 15,
    },
    {
        reactants: ['SODIUM_PHENOLATE', 'CARBON_DIOXIDE'],
        product: 'PHENOL',
        equation: {
            EN: 'C₆H₅ONa (aq) + CO₂ (g) + H₂O (l) → C₆H₅OH (turbid emulsion) ↓ + NaHCO₃ (aq)',
            VN: 'C₆H₅ONa (dd) + CO₂ (k) + H₂O (l) → C₆H₅OH (vẩn đục) ↓ + NaHCO₃ (dd)'
        },
        reactionType: {
            EN: 'Carbonic Acid Displaces Phenol (H₂CO₃ > Phenol)',
            VN: 'Axit Cacbonic Đẩy Phenol (Chứng Minh H₂CO₃ Mạnh Hơn Phenol)'
        },
        mechanism: {
            EN: 'Bubbling Carbon Dioxide into clear sodium phenolate precipitates phenol as a cloudy milky emulsion, conclusively proving carbonic acid is stronger than phenol.',
            VN: 'Sục khí CO₂ vào dung dịch natri phenolat làm dung dịch vẩn đục do phenol sinh ra, chứng minh axit cacbonic mạnh hơn phenol.'
        },
        message: {
            EN: 'Milky turbidity: CO₂ gas displaces weak Phenol from Sodium Phenolate!',
            VN: 'Dung dịch vẩn đục: Khí CO₂ đẩy axit yếu phenol ra khỏi muối natri phenolat!'
        },
        effect: 'color_shift',
        temperatureSpike: 10,
    },
    {
        reactants: ['PHENOL', 'HNO3'],
        product: 'PICRIC_ACID',
        equation: {
            EN: 'C₆H₅OH + 3HNO₃ (conc) → C₆H₂(NO₂)₃OH (s) ↓ (Picric Acid) + 3H₂O',
            VN: 'C₆H₅OH + 3HNO₃ (đặc) → C₆H₂(NO₂)₃OH (r) ↓ (Axit Picric) + 3H₂O'
        },
        reactionType: {
            EN: 'Electrophilic Aromatic Trinitration (Picric Acid Crystals)',
            VN: 'Phản Ứng Trinitro Hóa Phenol (Axit Picric Tinh Thể Vàng)'
        },
        mechanism: {
            EN: 'Concentrated nitric acid rapidly trinitrates the ortho and para positions of phenol, precipitating bright canary-yellow crystals of 2,4,6-trinitrophenol (Picric Acid).',
            VN: 'Axit nitric đặc nitro hóa phenol ở 3 vị trí ortho và para, tạo kết tủa tinh thể màu vàng chói 2,4,6-trinitrophenol (Axit picric).'
        },
        message: {
            EN: 'Vibrant yellow crystals: Picric Acid (2,4,6-Trinitrophenol) precipitates from Phenol + HNO₃!',
            VN: 'Tinh thể vàng rực rỡ: Axit Picric kết tủa khi cho phenol tác dụng với axit nitric đặc!'
        },
        effect: 'precipitate',
        temperatureSpike: 80,
        hazardLevel: 'WARNING',
    },
    {
        reactants: ['ACETALDEHYDE', 'CuOH2_PRECIPITATE'],
        product: 'Cu2O_PRECIPITATE',
        minTemperature: 60,
        equation: {
            EN: 'CH₃CHO + 2Cu(OH)₂ + NaOH -(t°)-> CH₃COONa + Cu₂O (s) ↓ (Brick Red) + 3H₂O',
            VN: 'CH₃CHO + 2Cu(OH)₂ + NaOH -(t°)-> CH₃COONa + Cu₂O (r) ↓ (Đỏ Gạch) + 3H₂O'
        },
        reactionType: {
            EN: 'Fehling / Trommer Aldehyde Test (Brick-Red Cu₂O)',
            VN: 'Phản Ứng Tráng Đồng / Fehling (Kết Tủa Đỏ Gạch Cu₂O)'
        },
        mechanism: {
            EN: 'Acetaldehyde reduces freshly prepared blue Cu(OH)₂ upon heating in alkaline media into copper(I) oxide (Cu₂O) brick-red precipitate.',
            VN: 'Andehit axetic khử kết tủa Cu(OH)₂ màu xanh khi đun nóng trong môi trường kiềm tạo kết tủa đồng(I) oxit màu đỏ gạch.'
        },
        message: {
            EN: 'Brick-red precipitate: Acetaldehyde reduces Cu(OH)₂ to brick-red Cu₂O!',
            VN: 'Kết tủa đỏ gạch: Andehit axetic khử Cu(OH)₂ thành kết tủa đỏ gạch Cu₂O!'
        },
        effect: 'precipitate',
        temperatureSpike: 30,
    },
    {
        reactants: ['ACETALDEHYDE', 'KMnO4'],
        product: 'ACETIC_ACID',
        products: ["ACETIC_ACID","SALT_WATER"],
        equation: {
            EN: '5CH₃CHO + 2KMnO₄ + 3H₂SO₄ → 5CH₃COOH + 2MnSO₄ + K₂SO₄ + 3H₂O',
            VN: '5CH₃CHO + 2KMnO₄ + 3H₂SO₄ → 5CH₃COOH + 2MnSO₄ + K₂SO₄ + 3H₂O'
        },
        reactionType: {
            EN: 'Aldehyde Permanganate Oxidation',
            VN: 'Oxi Hóa Andehit Làm Mất Màu Thuốc Tím'
        },
        mechanism: {
            EN: 'Acetaldehyde is oxidized to acetic acid by potassium permanganate, discharging the deep purple color.',
            VN: 'Andehit axetic bị oxi hóa thành axit axetic làm mất hoàn toàn màu tím của dung dịch thuốc tím.'
        },
        message: {
            EN: 'Decolorization: Purple KMnO₄ discharged as Acetaldehyde oxidizes to Acetic Acid.',
            VN: 'Mất màu thuốc tím: Andehit axetic bị oxi hóa thành axit axetic.'
        },
        effect: 'color_shift',
        temperatureSpike: 35,
    },
    {
        reactants: ['ACETALDEHYDE', 'IODINE_SOLUTION'],
        product: 'CHI3_PRECIPITATE',
        equation: {
            EN: 'CH₃CHO + 3I₂ + 4NaOH → CHI₃ (s) ↓ (Yellow Crystals) + HCOONa + 3NaI + 3H₂O',
            VN: 'CH₃CHO + 3I₂ + 4NaOH → CHI₃ (r) ↓ (Kết Tủa Vàng) + HCOONa + 3NaI + 3H₂O'
        },
        reactionType: {
            EN: 'Iodoform Haloform Test (Antiseptic Yellow Crystals)',
            VN: 'Phản Ứng Iodoform Nhận Biết Nhóm Axetyl (Kết Tủa Vàng Sát Trùng)'
        },
        mechanism: {
            EN: 'Base-catalyzed alpha-iodination of the methyl carbonyl group followed by hydroxide cleavage produces triiodomethane (Iodoform), yielding pale-yellow antiseptic crystals.',
            VN: 'Phản ứng halogen hóa nhóm metyl kế bên nhóm cacbonyl tạo kết tủa vàng nhạt triiodometan (Iodoform) có mùi sát trùng đặc trưng.'
        },
        message: {
            EN: 'Iodoform test positive: Yellow antiseptic crystals of CHI₃ precipitate with medicinal hospital odor!',
            VN: 'Phản ứng Iodoform dương tính: Kết tủa tinh thể vàng sát trùng CHI₃ xuất hiện với mùi bệnh viện đặc trưng!'
        },
        effect: 'precipitate',
        temperatureSpike: 25,
    },
    {
        reactants: ['ETHANOL', 'IODINE_SOLUTION'],
        product: 'CHI3_PRECIPITATE',
        equation: {
            EN: 'C₂H₅OH + 4I₂ + 6NaOH → CHI₃ (s) ↓ (Yellow Crystals) + HCOONa + 5NaI + 5H₂O',
            VN: 'C₂H₅OH + 4I₂ + 6NaOH → CHI₃ (r) ↓ (Kết Tủa Vàng) + HCOONa + 5NaI + 5H₂O'
        },
        reactionType: {
            EN: 'Ethanol Iodoform Test',
            VN: 'Phản Ứng Iodoform Nhận Biết Rượu Etylic'
        },
        mechanism: {
            EN: 'Ethanol is first in-situ oxidized to acetaldehyde, then undergoes the haloform cleavage to precipitate yellow CHI₃ crystals.',
            VN: 'Etanol bị oxi hóa sơ bộ thành andehit axetic rồi tham gia phản ứng haloform tạo kết tủa vàng Iodoform.'
        },
        message: {
            EN: 'Positive Iodoform test: Yellow antiseptic CHI₃ crystals formed from Ethanol!',
            VN: 'Phản ứng Iodoform nhận biết Etanol: Kết tủa vàng sát trùng CHI₃ xuất hiện!'
        },
        effect: 'precipitate',
        temperatureSpike: 25,
    },
    {
        reactants: ['GLUCOSE', 'BROMINE_WATER'],
        product: 'GLUCONIC_ACID',
        equation: {
            EN: 'CH₂OH(CHOH)₄CHO + Br₂ + H₂O → CH₂OH(CHOH)₄COOH + 2HBr',
            VN: 'CH₂OH(CHOH)₄CHO + Br₂ + H₂O → CH₂OH(CHOH)₄COOH + 2HBr'
        },
        reactionType: {
            EN: 'Glucose Selective Bromine Decolorization (Glucose vs Fructose)',
            VN: 'Glucozơ Làm Mất Màu Nước Brom (Phân Biệt Glucozơ & Fructozơ)'
        },
        mechanism: {
            EN: 'The aldehyde group of glucose selectively reduces reddish-brown bromine water to colorless gluconic acid and HBr. Fructose does NOT undergo this reaction, making this the textbook test in GDPT 2018.',
            VN: 'Nhóm andehit trong glucozơ khử chọn lọc nước brom màu nâu đỏ thành axit gluconic không màu. Fructozơ không có phản ứng này, đây là phản ứng kinh điển nhận biết glucozơ trong SGK Hóa 12.'
        },
        message: {
            EN: 'Bromine decolorization: Glucose oxidizes to Gluconic Acid, discharging reddish-brown Bromine water!',
            VN: 'Mất màu nước brom: Glucozơ bị oxi hóa thành Axit Gluconic làm mất màu nâu đỏ của nước brom!'
        },
        effect: 'color_shift',
        temperatureSpike: 15,
    },
    {
        reactants: ['STARCH', 'HCl'],
        product: 'GLUCOSE',
        minTemperature: 80,
        equation: {
            EN: '(C₆H₁₀O₅)ₙ + nH₂O -(H⁺, t°)-> nC₆H₁₂O₆ (Starch Acid Hydrolysis)',
            VN: '(C₆H₁₀O₅)ₙ + nH₂O -(H⁺, t°)-> nC₆H₁₂O₆ (Thủy Phân Tinh Bột)'
        },
        reactionType: {
            EN: 'Polysaccharide Acid-Catalyzed Hydrolysis',
            VN: 'Thủy Phân Polisaccarit Trong Môi Trường Axit'
        },
        mechanism: {
            EN: 'Acid cleaves the alpha-1,4 and alpha-1,6 glycosidic bonds in amylose and amylopectin, hydrolyzing starch into glucose monomers.',
            VN: 'Axit xúc tác bẻ gãy các liên kết glicozit trong tinh bột, thủy phân hoàn toàn thành các phân tử glucozơ.'
        },
        message: {
            EN: 'Hydrolysis: Starch broken down into Glucose units in acidic medium.',
            VN: 'Thủy phân tinh bột thành các phân tử Glucozơ trong môi trường axit.'
        },
        effect: 'fizz',
        temperatureSpike: 15,
    },
    {
        reactants: ['ALBUMIN_PROTEIN', 'HNO3'],
        product: 'XANTHOPROTEIC_PRECIPITATE',
        equation: {
            EN: 'Egg Albumin + HNO₃ (conc) → Xanthoproteic Nitro-Derivatives (s) ↓ (Canary Yellow Curd)',
            VN: 'Lòng Trắng Trứng + HNO₃ (đặc) → Hợp Chất Nitro-Protein ↓ (Kết Tủa Màu Vàng Chói)'
        },
        reactionType: {
            EN: 'Xanthoproteic Protein Test (Canary Yellow Curd)',
            VN: 'Phản Ứng Màu Xantoprotein Nhận Biết Protein Chứa Vòng Thơm'
        },
        mechanism: {
            EN: 'Concentrated nitric acid nitrates the phenyl rings of aromatic amino acid residues (tyrosine, tryptophan, phenylalanine) in egg albumin, yielding a brilliant canary-yellow coagulated protein curd.',
            VN: 'Axit nitric đặc nitro hóa các gốc amino axit chứa vòng benzen trong protein lòng trắng trứng, tạo kết tủa màu vàng chói đặc trưng gọi là phản ứng xantoprotein.'
        },
        message: {
            EN: 'Xanthoproteic reaction: Concentrated HNO₃ turns Albumin into bright canary yellow coagulated curd!',
            VN: 'Phản ứng Xantoprotein: Axit nitric đặc biến protein thành khối kết tủa màu vàng chói!'
        },
        effect: 'precipitate',
        temperatureSpike: 30,
    },
    {
        reactants: ['ACETYLENE_GAS', 'KMnO4'],
        product: 'MANGANESE_DIOXIDE',
        products: ['MANGANESE_DIOXIDE', 'SALT_WATER'],
        equation: {
            EN: '3CH≡CH + 8KMnO₄ + 4H₂O → 3(COOK)₂ + 8MnO₂ (s) ↓ (Brown) + 2KOH',
            VN: '3CH≡CH + 8KMnO₄ + 4H₂O → 3(COOK)₂ + 8MnO₂ (r) ↓ (Nâu Đen) + 2KOH'
        },
        reactionType: {
            EN: 'Alkyne Oxidation by Permanganate',
            VN: 'Axetilen Làm Mất Màu Thuốc Tím'
        },
        mechanism: {
            EN: 'Acetylene cleaves its carbon-carbon triple bond under potassium permanganate oxidation, forming oxalate and brown manganese dioxide precipitate.',
            VN: 'Liên kết ba trong phân tử axetilen bị thuốc tím oxi hóa làm mất màu tím và xuất hiện kết tủa nâu đen MnO₂.'
        },
        message: {
            EN: 'Permanganate decolorized: Acetylene oxidizes with brown MnO₂ precipitate.',
            VN: 'Mất màu thuốc tím: Khí axetilen làm mất màu dung dịch KMnO₄ sinh kết tủa nâu đen MnO₂.'
        },
        effect: 'precipitate',
        precipitateColor: '#451a03',
        temperatureSpike: 35,
    },
    {
        reactants: ['ACETYLENE_GAS', 'TOLLENS_REAGENT'],
        product: 'Ag2C2_PRECIPITATE',
        equation: {
            EN: 'CH≡CH + 2[Ag(NH₃)₂]OH → Ag-C≡C-Ag (s) ↓ (Canary Yellow) + 4NH₃ + 2H₂O',
            VN: 'CH≡CH + 2[Ag(NH₃)₂]OH → Ag-C≡C-Ag (r) ↓ (Vàng Nhạt) + 4NH₃ + 2H₂O'
        },
        reactionType: {
            EN: 'Terminal Alkyne Silver Acetylide Substitution',
            VN: 'Thế Kim Loại Bạc Vào Liên Kết Ba Đầu Mạch (Nhận Biết Ank-1-in)'
        },
        mechanism: {
            EN: 'The weakly acidic terminal hydrogen atoms on the C≡C bond are substituted by Ag⁺ ions from Tollens reagent, precipitating shock-sensitive disilver acetylide (bright canary yellow).',
            VN: 'Nguyên tử hydro linh động ở liên kết ba đầu mạch bị thay thế bởi ion Ag⁺ trong thuốc thử Tollens, tạo kết tủa màu vàng nhạt bạc axetylua (Ag₂C₂).'
        },
        message: {
            EN: 'Terminal alkyne test: Canary-yellow Disilver Acetylide (Ag₂C₂) precipitates immediately!',
            VN: 'Nhận biết liên kết ba đầu mạch: Kết tủa màu vàng nhạt Bạc Axetylua (Ag₂C₂) xuất hiện tức thì!'
        },
        effect: 'precipitate',
        temperatureSpike: 20,
    },
    {
        reactants: ['CaC2', 'HCl'],
        product: 'SALT_WATER',
        products: ["SALT_WATER","ACETYLENE_GAS"],
        equation: {
            EN: 'CaC₂ (s) + 2HCl (aq) → CaCl₂ (aq) + C₂H₂ (g) ↑',
            VN: 'CaC₂ (r) + 2HCl (dd) → CaCl₂ (dd) + C₂H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Calcium Carbide Acid Hydrolysis',
            VN: 'Đất Đèn Tác Dụng Axit Clohidric Sinh Khí Axetilen'
        },
        mechanism: {
            EN: 'Hydrochloric acid reacts vigorously with calcium carbide, releasing energetic acetylene gas effervescence.',
            VN: 'Axit clohidric phân hủy đất đèn cực nhanh, giải phóng lượng lớn khí axetilen sủi bọt mạnh mẽ.'
        },
        message: {
            EN: 'Vigorous gas evolution: CaC₂ reacts with HCl generating Acetylene gas (C₂H₂)!',
            VN: 'Sủi bọt khí cực mạnh: Đất đèn tác dụng axit HCl giải phóng khí Axetilen (C₂H₂)!'
        },
        effect: 'bubbles',
        temperatureSpike: 50,
    },
    {
        reactants: ['ETHYL_ACETATE', 'KOH'],
        product: 'POTASSIUM_ACETATE',
        products: ["POTASSIUM_ACETATE","ETHANOL"],
        equation: {
            EN: 'CH₃COOC₂H₅ (l) + KOH (aq) -(t°)-> CH₃COOK (aq) + C₂H₅OH (aq)',
            VN: 'CH₃COOC₂H₅ (l) + KOH (dd) -(t°)-> CH₃COOK (dd) + C₂H₅OH (dd)'
        },
        reactionType: {
            EN: 'Ester Saponification in Potassium Hydroxide',
            VN: 'Xà Phòng Hóa Este Trong Dung Dịch KOH'
        },
        mechanism: {
            EN: 'Irreversible base-promoted ester hydrolysis yields potassium acetate and ethanol.',
            VN: 'Thủy phân este một chiều trong môi trường kiềm KOH tạo muối kali axetat và ancol etylic.'
        },
        message: {
            EN: 'Saponification: Ethyl Acetate cleaved into Potassium Acetate + Ethanol.',
            VN: 'Xà phòng hóa: Etyl axetat bị thủy phân thành Kali axetat và Etanol.'
        },
        effect: 'fizz',
        temperatureSpike: 25,
    },
    {
        reactants: ['ETHYL_ACETATE', 'H2SO4'],
        product: 'ACETIC_ACID',
        products: ["ACETIC_ACID","ETHANOL"],
        equation: {
            EN: 'CH₃COOC₂H₅ + H₂O ⇌(H₂SO₄) CH₃COOH + C₂H₅OH',
            VN: 'CH₃COOC₂H₅ + H₂O ⇌(H₂SO₄) CH₃COOH + C₂H₅OH'
        },
        reactionType: {
            EN: 'Reversible Acid-Catalyzed Ester Hydrolysis',
            VN: 'Thủy Phân Este Thuận Nghịch Trong Môi Trường Axit'
        },
        mechanism: {
            EN: 'Concentrated sulfuric acid catalyzes the reversible cleavage of ethyl acetate into acetic acid and ethanol.',
            VN: 'Axit sunfuric xúc tác phản ứng thủy phân thuận nghịch este etyl axetat thành axit axetic và rượu etylic.'
        },
        message: {
            EN: 'Acid hydrolysis: Reversible cleavage of Ethyl Acetate into Acetic Acid + Ethanol.',
            VN: 'Thủy phân trong axit: Etyl axetat chuyển hóa thuận nghịch thành axit axetic và rượu.'
        },
        effect: 'color_shift',
        temperatureSpike: 15,
    },
    {
        reactants: ['FeCl2', 'KMnO4'],
        product: 'FeCl3',
        products: ["FeCl3","SALT_WATER"],
        equation: {
            EN: '5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O',
            VN: '5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O'
        },
        reactionType: {
            EN: 'Iron(II) Permanganate Redox Titration',
            VN: 'Chuẩn Độ Oxi Hóa - Khử Muối Sắt(II) Bằng Thuốc Tím'
        },
        mechanism: {
            EN: 'Fe²⁺ ions are rapidly oxidized to yellow-brown Fe³⁺ by permanganate, discharging the vivid purple color of MnO₄⁻ into colorless Mn²⁺.',
            VN: 'Ion Fe²⁺ bị oxi hóa thành ion Fe³⁺ màu vàng nâu, ion MnO₄⁻ màu tím đậm bị khử thành Mn²⁺ không màu (phản ứng chuẩn độ kinh điển).'
        },
        message: {
            EN: 'Redox Titration: Purple KMnO₄ decolorized as Fe²⁺ is oxidized to Fe³⁺!',
            VN: 'Chuẩn độ oxi hóa - khử: Thuốc tím mất màu khi ion Sắt(II) bị oxi hóa thành Sắt(III)!'
        },
        effect: 'color_shift',
        temperatureSpike: 25,
    },
    {
        reactants: ['CuSO4', 'KI'],
        product: 'CuI_PRECIPITATE',
        products: ["CuI_PRECIPITATE","IODINE_SOLUTION"],
        equation: {
            EN: '2CuSO₄ (aq) + 4KI (aq) → 2CuI (s) ↓ (Cream White) + I₂ (deep brown) + 2K₂SO₄ (aq)',
            VN: '2CuSO₄ (dd) + 4KI (dd) → 2CuI (r) ↓ (Trắng Ngà) + I₂ (nâu đậm) + 2K₂SO₄ (dd)'
        },
        reactionType: {
            EN: 'Copper-Iodide Redox Precipitation',
            VN: 'Oxi Hóa - Khử Giữa Đồng(II) Và Iodua Sinh Kết Tủa CuI & Iot Tự Do'
        },
        mechanism: {
            EN: 'Cu²⁺ oxidizes iodide (I⁻) to elemental iodine (I₂ / triiodide, turning solution deep brown), while reducing copper to insoluble copper(I) iodide (cream-white precipitate).',
            VN: 'Ion Cu²⁺ oxi hóa ion I⁻ thành I₂ tự do (làm dung dịch chuyển màu nâu sẫm của iot), đồng thời ion Cu²⁺ bị khử thành kết tủa đồng(I) iodua CuI màu trắng ngà.'
        },
        message: {
            EN: 'Redox precipitation: Cream-white CuI precipitates in deep brown Iodine solution!',
            VN: 'Kết tủa oxi hóa - khử: CuI màu trắng ngà xuất hiện cùng dung dịch iot màu nâu đậm!'
        },
        effect: 'precipitate',
        temperatureSpike: 30,
    },
    {
        reactants: ['KI', 'FeCl3'],
        product: 'IODINE_SOLUTION',
        products: ["IODINE_SOLUTION","FeCl2"],
        equation: {
            EN: '2FeCl₃ (aq) + 2KI (aq) → 2FeCl₂ (aq) + I₂ (aq, Deep Brown) + 2KCl (aq)',
            VN: '2FeCl₃ (dd) + 2KI (dd) → 2FeCl₂ (dd) + I₂ (dd, Nâu Đậm) + 2KCl (dd)'
        },
        reactionType: {
            EN: 'Iron(III) Halide Redox Oxidation',
            VN: 'Sắt(III) Oxi Hóa Muối Iodua Thành Iot Nâu'
        },
        mechanism: {
            EN: 'Fe³⁺ oxidizes colorless iodide ions into dark brown triiodide solution, reducing iron to iron(II).',
            VN: 'Ion Sắt(III) oxi hóa ion iodua không màu thành dung dịch iot có màu nâu đậm đặc trưng.'
        },
        message: {
            EN: 'Iodine liberated: FeCl₃ oxidizes KI producing deep brown Iodine solution.',
            VN: 'Giải phóng iot: FeCl₃ oxi hóa KI tạo dung dịch màu nâu iot đặc trưng.'
        },
        effect: 'color_shift',
        temperatureSpike: 20,
    },

    // ==========================================
    // PERIODIC TABLE & AUTHENTIC REACTION RULES EXPANSION
    // ==========================================
    {
        reactants: ["HYDROGEN_PEROXIDE", "MANGANESE_DIOXIDE"],
        product: "DISTILLED_WATER",
        products: ["DISTILLED_WATER","O2"],
        equation: {
            EN: "2H₂O₂ (aq) ──[MnO₂ cat]──→ 2H₂O (l) + O₂ (g) ↑ + Heat",
            VN: "2H₂O₂ (dd) ──[MnO₂ xúc tác]──→ 2H₂O (l) + O₂ (k) ↑ + Nhiệt"
        },
        reactionType: {
            EN: "Catalytic Hydrogen Peroxide Disproportionation (Elephant Toothpaste)",
            VN: "Phân Hủy Xúc Tác Oxy Già (Thí Nghiệm Kem Đánh Răng Con Voi)"
        },
        mechanism: {
            EN: "MnO₂ heterogeneous catalyst drastically lowers activation energy, driving rapid disproportionation of H₂O₂ with vigorous exothermic bubbling and copious release of pure oxygen gas.",
            VN: "Xúc tác dị thể MnO₂ hạ thấp năng lượng hoạt hóa, thúc đẩy phân hủy tự oxi hóa khử của H₂O₂ với hiện tượng sủi bọt cuồn cuộn và giải phóng lượng lớn khí oxy kèm nhiệt độ tăng vọt."
        },
        message: {
            EN: "Vigorous catalytic eruption! Pure Oxygen gas (O₂) and hot steam hiss furiously from the peroxide solution!",
            VN: "Phun trào xúc tác mãnh liệt! Khí Oxy (O₂) nguyên chất và hơi nước bốc lên cuồn cuộn từ dung dịch oxy già!"
        },
        effect: 'bubbles',
        temperatureSpike: 65,
        requiresPopup: true,
        hazardLevel: 'HIGH',
    },
    {
        reactants: ["HYDROGEN_PEROXIDE", "KI"],
        product: "IODINE_SOLUTION",
        products: ["IODINE_SOLUTION","O2"],
        equation: {
            EN: "2H₂O₂ (aq) + 2I⁻ (aq) → I₂ (aq, Deep Brown) + 2H₂O (l) + O₂ (g) ↑",
            VN: "2H₂O₂ (dd) + 2I⁻ (dd) → I₂ (dd, Nâu Đậm) + 2H₂O (l) + O₂ (k) ↑"
        },
        reactionType: {
            EN: "Homogeneous Iodine-Catalyzed Peroxide Redox Eruption",
            VN: "Phản Ứng Oxi Hóa Khử Xúc Tác Đồng Thể Giữa Oxy Già & Ion Iodua"
        },
        mechanism: {
            EN: "Iodide acts as a homogeneous redox catalyst via intermediate hypoiodite (IO⁻), generating deep brown elemental iodine while releasing dense clouds of hot oxygen foam.",
            VN: "Ion iodua đóng vai trò xúc tác đồng thể qua chất trung gian hipoiodit (IO⁻), tạo iot tự do màu nâu sẫm đồng thời giải phóng bọt khí oxy nóng cuồn cuộn."
        },
        message: {
            EN: "Iodine foaming cascade! Free brown Iodine and rapid Oxygen bubbles surge instantaneously!",
            VN: "Dòng bọt iot phun trào! Iot tự do màu nâu xuất hiện cùng các cột bọt khí oxy giải phóng tức thì!"
        },
        effect: 'bubbles',
        temperatureSpike: 55,
        requiresPopup: true,
    },
    {
        reactants: ["MERCURY_LIQUID", "S"],
        product: "MERCURY_SULFIDE",
        products: ["MERCURY_SULFIDE"],
        equation: {
            EN: "Hg (l, Quicksilver) + S (s, Sulfur) → HgS (s) ↓ (Cinnabar Insoluble)",
            VN: "Hg (l, Thủy ngân) + S (r, Lưu huỳnh) → HgS (r) ↓ (Chu Sa Bền Vững)"
        },
        reactionType: {
            EN: "Room-Temperature Mercury Neutralization & Sulfide Formation",
            VN: "Phản Ứng Vô Hiệu Hóa Thu Gom Thủy Ngân Rơi Vãi Ở Nhiệt Độ Phòng"
        },
        mechanism: {
            EN: "Liquid mercury atoms rapidly coordinate with elemental sulfur rings at room temperature, forming extremely insoluble and chemically inert mercury(II) sulfide (Cinnabar), completely arresting toxic mercury vaporization.",
            VN: "Thủy ngân lỏng liên kết tức thì với vòng lưu huỳnh ở nhiệt độ thường, tạo hợp chất chu sa HgS kết tủa màu đỏ nâu/đen cực kỳ bền, ngăn chặn hoàn toàn sự bay hơi độc hại của thủy ngân."
        },
        message: {
            EN: "Standard lab safety protocol! Elemental Sulfur immobilizes toxic Mercury liquid into inert Cinnabar (HgS) precipitate!",
            VN: "Quy chuẩn an toàn phòng thí nghiệm SGK! Bột lưu huỳnh vô hiệu hóa thủy ngân lỏng thành kết tủa khoáng chu sa (HgS) an toàn!"
        },
        effect: 'precipitate',
        temperatureSpike: 15,
        requiresPopup: true,
    },
    {
        reactants: ["GOLD_METAL", "AQUA_REGIA"],
        product: "GOLD_CHLORIDE_COMPLEX",
        products: ["GOLD_CHLORIDE_COMPLEX","NO2_GAS"],
        equation: {
            EN: "Au (s) + 3HNO₃ + 4HCl → HAuCl₄ (aq, Golden Yellow) + 3NO₂ (g) ↑ + 3H₂O",
            VN: "Au (r) + 3HNO₃ + 4HCl → HAuCl₄ (dd, Vàng Óng) + 3NO₂ (k) ↑ + 3H₂O"
        },
        reactionType: {
            EN: "Royal Gold Dissolution in Aqua Regia (Coordination Oxidation)",
            VN: "Hòa Tan Vàng Quý Trong Nước Cường Toan (Phức Hóa Oxi Hóa)"
        },
        mechanism: {
            EN: "Nitric acid oxidizes minute traces of gold to Au³⁺, while concentrated hydrochloric acid supplies abundant chloride ligands to form ultra-stable [AuCl₄]⁻ complex, driving oxidation equilibrium to complete dissolution with pungent red-brown NO₂ gas evolution.",
            VN: "Axit nitric oxi hóa một lượng nhỏ vàng thành Au³⁺, ngay lập tức nồng độ ion clorua cao từ HCl tạo phức chất [AuCl₄]⁻ siêu bền, kéo chuyển dịch cân bằng hòa tan hoàn toàn lá vàng thành dung dịch vàng óng và sủi bọt khí NO₂ nâu đỏ."
        },
        message: {
            EN: "Royal alchemy! Imperial Gold foil dissolves entirely into brilliant golden Chloroauric Acid (HAuCl₄) solution with fuming red-brown NO₂ gas!",
            VN: "Hóa thuật hoàng gia! Lá vàng nguyên chất tan biến hoàn toàn thành dung dịch Axit Cloroauric (HAuCl₄) vàng óng cùng làn khói NO₂ nâu đỏ!"
        },
        effect: 'bubbles',
        temperatureSpike: 45,
        requiresPopup: true,
        hazardLevel: 'HIGH',
    },
    {
        reactants: ["PLATINUM_METAL", "AQUA_REGIA"],
        product: "AQUA_REGIA",
        products: ["NO2_GAS"],
        equation: {
            EN: "3Pt (s) + 4HNO₃ + 18HCl → 3H₂PtCl₆ (aq) + 4NO (g) ↑ + 8H₂O",
            VN: "3Pt (r) + 4HNO₃ + 18HCl → 3H₂PtCl₆ (dd) + 4NO (k) ↑ + 8H₂O"
        },
        reactionType: {
            EN: "Noble Platinum Dissolution into Chloroplatinic Acid",
            VN: "Hòa Tan Bạch Kim Trơ Trong Nước Cường Toan"
        },
        mechanism: {
            EN: "Synergistic action of nascent chlorine and nitrosyl chloride in Aqua Regia dissolves the inert platinum lattice into hexachloroplatinate complexes.",
            VN: "Tác dụng hiệp đồng của clo nguyên tử và nitrozyl clorua trong nước cường toan hòa tan mạng tinh thể bạch kim trơ thành phức axit hexacloroplatinic."
        },
        message: {
            EN: "Noble Platinum wire dissolves into deep red-orange Chloroplatinic acid solution with acidic vapor!",
            VN: "Dây bạch kim quý giá tan dần trong nước cường toan tạo dung dịch phức hexacloroplatinic đỏ cam bốc khói!"
        },
        effect: 'bubbles',
        temperatureSpike: 40,
        requiresPopup: true,
    },
    {
        reactants: ["CALCIUM_OXIDE", "DISTILLED_WATER"],
        product: "CaOH2",
        products: ["CaOH2"],
        equation: {
            EN: "CaO (s, Quicklime) + H₂O (l) → Ca(OH)₂ (aq/s, Slaked Lime) + 65.2 kJ/mol Heat",
            VN: "CaO (r, Vôi sống) + H₂O (l) → Ca(OH)₂ (dd/r, Vôi tôi) + 65.2 kJ/mol Nhiệt"
        },
        reactionType: {
            EN: "Hyper-Exothermic Lime Slaking Hydration",
            VN: "Phản Ứng Tôi Vôi Tỏa Nhiệt Sôi Bùng Mãnh Liệt"
        },
        mechanism: {
            EN: "Hydration of the compact ionic CaO rock lattice releases massive enthalpy of hydration (ΔH = -65.2 kJ/mol), violently bringing the surrounding water to a rolling boil and swelling into white slaked lime paste.",
            VN: "Quá trình hiđrat hóa mạng tinh thể CaO giải phóng entanpi khổng lồ (ΔH = -65.2 kJ/mol), làm sôi bùng nước xung quanh và nở phồng thành hỗn hợp vôi tôi trắng mịn."
        },
        message: {
            EN: "Violent boiling exothermic reaction! Quicklime swells into caustic Slaked Lime [Ca(OH)₂] as water hisses into steam!",
            VN: "Phản ứng tỏa nhiệt sôi sùng sục! Vôi sống ngậm nước nở bung thành vôi tôi Ca(OH)₂ với tiếng rít hơi nước bốc lên dữ dội!"
        },
        effect: 'smoke',
        temperatureSpike: 80,
        requiresPopup: true,
    },
    {
        reactants: ["SUCROSE", "H2SO4"],
        product: "CARBON",
        products: ["CARBON","CARBON_DIOXIDE","SULFUR_DIOXIDE"],
        equation: {
            EN: "C₁₂H₂₂O₁₁ (s) ──[conc. H₂SO₄]──→ 12C (s, Black Sponge) + 11H₂O (g) + CO₂ (g) + SO₂ (g)",
            VN: "C₁₂H₂₂O₁₁ (r) ──[H₂SO₄ đặc]──→ 12C (r, Cột Than Đen) + 11H₂O (hơi) + CO₂ (k) + SO₂ (k)"
        },
        reactionType: {
            EN: "Violent Dehydration & Carbon Monster Column Eruption",
            VN: "Phản Ứng Háo Nước Than Hóa Phun Trào Cột Cacbon (Quái Vật Đường)"
        },
        mechanism: {
            EN: "Concentrated sulfuric acid exhibits immense thermodynamic affinity for water, ripping hydrogen and oxygen out of sucrose molecules in a 2:1 ratio. The intense heat of dilution oxidizes carbon into hot CO₂ and SO₂ gases, expanding the solid carbon into an iconic rising black cylindrical tower.",
            VN: "Axit sunfuric đặc có ái lực hút nước tột độ, bứt toàn bộ nguyên tử H và O khỏi đường saccarozơ theo tỉ lệ 2:1. Nhiệt lượng tỏa ra dữ dội oxi hóa một phần than thành khí CO₂ và SO₂, đẩy khối than xốp đen trào ngược dâng cao thành cột trụ khổng lồ."
        },
        message: {
            EN: "Spectacular Sugar Monster Eruption! Cane sugar dehydrates violently, surging upward into a steaming black porous Carbon tower!",
            VN: "Phun trào Quái vật Đường than hóa kinh điển! Đường mía bị hút kiệt nước, phun trào thành cột than xốp đen ngòm bốc khói cay nồng!"
        },
        effect: 'smoke',
        temperatureSpike: 95,
        requiresPopup: true,
        hazardLevel: 'CRITICAL',
    },
    {
        reactants: ["POTASSIUM_DICHROMATE", "ETHANOL"],
        product: "CHROMIUM_CHLORIDE",
        products: ["CHROMIUM_CHLORIDE", "ACETALDEHYDE"],
        productColor: "#10b981",
        equation: {
            EN: "K₂Cr₂O₇ (aq, Orange) + 3CH₃CH₂OH + 4H₂SO₄ → Cr₂(SO₄)₃ (aq, Emerald Green) + 3CH₃CHO + K₂SO₄ + 7H₂O",
            VN: "K₂Cr₂O₇ (dd, Cam) + 3C₂H₅OH + 4H₂SO₄ → Cr₂(SO₄)₃ (dd, Xanh Lục) + 3CH₃CHO + K₂SO₄ + 7H₂O"
        },
        reactionType: {
            EN: "Aromatic Ethanol Redox Breathalyzer Test",
            VN: "Phản Ứng Oxi Hóa Khử Đo Nồng Độ Cồn Giao Thông"
        },
        mechanism: {
            EN: "Hexavalent orange dichromate [Cr₂O₇]²⁻ oxidizes ethanol into pungent acetaldehyde while chromium is reduced to trivalent emerald-green [Cr³⁺] aqua ions, providing an iconic optical signal for breathalyzer instrumentation.",
            VN: "Ion dicromat Cr(VI) màu cam rực rỡ oxi hóa ancol etylic thành andehit axetic, đồng thời crom bị khử về ion Cr(III) có màu xanh lục bảo đặc trưng, làm cơ sở khoa học cho thiết bị đo nồng độ cồn hơi thở."
        },
        message: {
            EN: "Police breathalyzer color change! Intense orange Dichromate turns into lush emerald-green Chromium(III) as ethanol oxidizes into acetaldehyde!",
            VN: "Hiệu ứng đo nồng độ cồn kinh điển! Màu cam rực rỡ của dicromat chuyển thành màu xanh lục bảo của Cr(III) khi etanol bị oxi hóa thành andehit!"
        },
        effect: 'color_shift',
        temperatureSpike: 35,
        requiresPopup: true,
    },
    {
        reactants: ["POTASSIUM_CHROMATE", "HCl"],
        product: "POTASSIUM_DICHROMATE",
        products: ["POTASSIUM_DICHROMATE","NaCl"],
        equation: {
            EN: "2K₂CrO₄ (aq, Lemon Yellow) + 2HCl (aq) ⇌ K₂Cr₂O₇ (aq, Vivid Orange) + 2KCl (aq) + H₂O",
            VN: "2K₂CrO₄ (dd, Vàng Chanh) + 2HCl (dd) ⇌ K₂Cr₂O₇ (dd, Cam Tươi) + 2KCl (dd) + H₂O"
        },
        reactionType: {
            EN: "Chromate-Dichromate Acidic Equilibrium Shift",
            VN: "Chuyển Dịch Cân Bằng Cromat - Dicromat Trong Môi Trường Axit"
        },
        mechanism: {
            EN: "Addition of hydronium protons (H⁺) protonates tetrahedral chromate [CrO₄]²⁻ into hydrogen chromate, which readily condenses via oxo-bridging into the vivid orange dichromate dimer [Cr₂O₇]²⁻.",
            VN: "Bổ sung ion H⁺ proton hóa ion cromat [CrO₄]²⁻ thành hiđrocromat, sau đó hai phân tử ngưng tụ qua cầu nối oxy tạo ion đime dicromat [Cr₂O₇]²⁻ có màu da cam tươi sáng."
        },
        message: {
            EN: "Le Chatelier equilibrium shift: Lemon-yellow Chromate turns vibrant orange Dichromate upon acidification!",
            VN: "Chuyển dịch cân bằng Le Chatelier: Dung dịch vàng chanh của cromat chuyển sang màu cam tươi của dicromat khi thêm axit!"
        },
        effect: 'color_shift',
        temperatureSpike: 10,
    },
    {
        reactants: ["POTASSIUM_DICHROMATE", "NaOH"],
        product: "POTASSIUM_CHROMATE",
        products: ["POTASSIUM_CHROMATE","Na2SO4"],
        equation: {
            EN: "K₂Cr₂O₇ (aq, Vivid Orange) + 2NaOH (aq) ⇌ K₂CrO₄ + Na₂CrO₄ (aq, Lemon Yellow) + H₂O",
            VN: "K₂Cr₂O₇ (dd, Cam Tươi) + 2NaOH (dd) ⇌ K₂CrO₄ + Na₂CrO₄ (dd, Vàng Chanh) + H₂O"
        },
        reactionType: {
            EN: "Dichromate-Chromate Alkaline Equilibrium Shift",
            VN: "Chuyển Dịch Cân Bằng Dicromat - Cromat Trong Môi Trường Kiềm"
        },
        mechanism: {
            EN: "Hydroxide ions (OH⁻) consume free protons, cleaving the Cr-O-Cr bridge in dichromate and restoring monomeric yellow chromate [CrO₄]²⁻ ions.",
            VN: "Ion hiđroxit OH⁻ hấp thụ proton H⁺, bẻ gãy cầu nối Cr-O-Cr trong ion dicromat và tái tạo hoàn toàn ion cromat đơn phân tử [CrO₄]²⁻ màu vàng chanh."
        },
        message: {
            EN: "Alkaline equilibrium shift: Vivid orange Dichromate reverts back to luminous lemon-yellow Chromate!",
            VN: "Chuyển dịch cân bằng trong kiềm: Màu cam của dicromat chuyển ngược lại thành màu vàng chanh rực rỡ của cromat!"
        },
        effect: 'color_shift',
        temperatureSpike: 10,
    },
    {
        reactants: ["SODIUM_THIOSULFATE", "HCl"],
        product: "S",
        products: ["S","SULFUR_DIOXIDE","NaCl"],
        equation: {
            EN: "Na₂S₂O₃ (aq) + 2HCl (aq) → S (s) ↓ (Milky Turbid) + SO₂ (g) ↑ + 2NaCl (aq) + H₂O",
            VN: "Na₂S₂O₃ (dd) + 2HCl (dd) → S (r) ↓ (Vẩn Đục Sữa) + SO₂ (k) ↑ + 2NaCl (dd) + H₂O"
        },
        reactionType: {
            EN: "Chemical Kinetics Classic: Thiosulfate Acid Disproportionation",
            VN: "Bài Học Động Hóa Học SGK: Phân Hủy Thiosunfat Sinh Kết Tủa Đục Sữa"
        },
        mechanism: {
            EN: "Thiosulfuric acid (H₂S₂O₃) is thermodynamically unstable and disproportionates into micro-colloidal sulfur particles that scatter light (Tyndall effect, milky white) alongside pungent SO₂ gas.",
            VN: "Axit thiosunfuric sinh ra kém bền, tự phân hủy thành các hạt nano lưu huỳnh keo tán xạ ánh sáng (hiệu ứng Tyndall làm đục trắng như sữa) và khí SO₂ mùi hắc."
        },
        message: {
            EN: "Kinetics clock benchmark! Clear solution gradually clouds over with milky colloidal Sulfur while sulfur dioxide gas effervesces!",
            VN: "Thí nghiệm đo tốc độ phản ứng kinh điển! Dung dịch trong suốt từ từ vẩn đục trắng sữa của lưu huỳnh keo cùng bọt khí SO₂ bay lên!"
        },
        effect: 'precipitate',
        temperatureSpike: 15,
        requiresPopup: true,
    },
    {
        reactants: ["ANILINE", "BROMINE_WATER"],
        product: "TRIBROMOPHENOL_PRECIPITATE",
        products: ["TRIBROMOPHENOL_PRECIPITATE"],
        equation: {
            EN: "C₆H₅NH₂ (l) + 3Br₂ (aq) → 2,4,6-Tribromoaniline (s) ↓ (White) + 3HBr (aq)",
            VN: "C₆H₅NH₂ (l) + 3Br₂ (dd) → 2,4,6-Tribromanilin (r) ↓ (Trắng) + 3HBr (dd)"
        },
        reactionType: {
            EN: "Electrophilic Aromatic Bromination of Activated Aniline",
            VN: "Phản Ứng Thế Brom Vào Vòng Benzen Hoạt Hóa Của Anilin"
        },
        mechanism: {
            EN: "The nitrogen lone pair strongly donates electron density into the aromatic ring (+R effect), dramatically activating ortho- and para-positions for instantaneous triple bromination into a white precipitate.",
            VN: "Cặp electron tự do của nguyên tử nitơ đẩy mạnh mật độ electron vào nhân thơm (hiệu ứng +C), kích hoạt mãnh liệt các vị trí ortho và para, phản ứng thế 3 nguyên tử brom tạo kết tủa trắng 2,4,6-tribromanilin ngay ở điều kiện thường."
        },
        message: {
            EN: "Instantaneous white precipitation! Bromine water decolorizes as dense white 2,4,6-Tribromoaniline forms immediately!",
            VN: "Xuất hiện kết tủa trắng tức thì! Nước brom bị mất màu và kết tủa trắng 2,4,6-tribromanilin lắng xuống đáy ống nghiệm!"
        },
        effect: 'precipitate',
        temperatureSpike: 25,
        requiresPopup: true,
    },
    {
        reactants: ["TOLUENE", "KMnO4"],
        product: "MANGANESE_DIOXIDE",
        products: ["MANGANESE_DIOXIDE", "POTASSIUM_ACETATE"],
        minTemperature: 60,
        equation: {
            EN: "C₆H₅CH₃ + 2KMnO₄ ──[Heat]──→ C₆H₅COOK + 2MnO₂ (s) ↓ (Brown) + KOH + H₂O",
            VN: "C₆H₅CH₃ + 2KMnO₄ ──[Đun nóng]──→ C₆H₅COOK + 2MnO₂ (r) ↓ (Nâu Đen) + KOH + H₂O"
        },
        reactionType: {
            EN: "Aromatic Alkyl Side-Chain Oxidation by Permanganate",
            VN: "Oxi Hóa Nhánh Ankyl Của Toluen Bằng Thuốc Tím Khi Đun Nóng"
        },
        mechanism: {
            EN: "Benzylic C-H bonds are uniquely susceptible to permanganate oxidative attack under reflux, transforming the methyl side chain into a benzoate carboxylate while reducing Mn(VII) into brown MnO₂ sludge.",
            VN: "Liên kết C-H ở vị trí benzylic đặc biệt linh động khi đun nóng, bị ion pemanganat oxi hóa cắt mạch tạo kali benzoat đồng thời Mn(VII) tím bị khử về kết tủa mangan đioxit MnO₂ màu nâu đen."
        },
        message: {
            EN: "Permanganate purple disappears! Toluene side chain oxidizes into Benzoate, dropping brown MnO₂ precipitate!",
            VN: "Mất màu thuốc tím đặc trưng! Toluen bị oxi hóa nhánh metyl tạo muối benzoat và kết tủa MnO₂ màu nâu đen!"
        },
        effect: 'precipitate',
        temperatureSpike: 35,
    },
    {
        reactants: ["ALUMINUM", "FERRIC_OXIDE"],
        product: "IRON",
        products: ["IRON","ALUMINUM_OXIDE"],
        minTemperature: 150,
        equation: {
            EN: "2Al (s) + Fe₂O₃ (s, Rust) → Al₂O₃ (s) + 2Fe (l, Molten Iron) + 851.5 kJ/mol Heat (2500°C)",
            VN: "2Al (r) + Fe₂O₃ (r, Gỉ sắt) → Al₂O₃ (r) + 2Fe (l, Sắt Nóng Chảy) + 851.5 kJ/mol (2500°C)"
        },
        reactionType: {
            EN: "Pyrotechnic Goldschmidt Thermite Reaction (2500°C)",
            VN: "Phản Ứng Nhiệt Nhôm Goldschmidt Chói Lòa (2500°C)"
        },
        mechanism: {
            EN: "Aluminum has extraordinary affinity for oxygen due to the colossal lattice enthalpy of Al₂O₃ (-1675 kJ/mol), reducing iron oxide into glowing molten liquid iron at over 2500°C with blinding white light.",
            VN: "Nhôm có ái lực cực mạnh với oxy nhờ năng lượng mạng tinh thể khổng lồ của Al₂O₃ (-1675 kJ/mol), cướp oxy khử oxit sắt thành dòng sắt nóng chảy rực rỡ ở nhiệt độ trên 2500°C cùng ánh sáng chói lòa."
        },
        message: {
            EN: "BLINDING 2500°C THERMITE DETONATION! Pure Molten Iron flows beneath brilliant sparks as Aluminum consumes Rust!",
            VN: "PHẢN ỨNG NHIỆT NHÔM 2500°C CHÓI LÒA! Sắt nóng chảy rực sáng tuôn trào trong muôn vàn tia lửa khi bột nhôm cướp oxy của gỉ sắt!"
        },
        effect: 'explosion',
        temperatureSpike: 150,
        requiresPopup: true,
        hazardLevel: 'CRITICAL',
    },
    {
        reactants: ["MANGANESE_DIOXIDE", "HCl"],
        product: "CHLORINE_GAS",
        products: ["CHLORINE_GAS","DISTILLED_WATER"],
        minTemperature: 60,
        equation: {
            EN: "MnO₂ (s) + 4HCl (conc.) ──[Heat]──→ MnCl₂ (aq) + Cl₂ (g) ↑ (Yellow-Green) + 2H₂O",
            VN: "MnO₂ (r) + 4HCl (đặc) ──[Đun nóng]──→ MnCl₂ (dd) + Cl₂ (k) ↑ (Vàng Lục) + 2H₂O"
        },
        reactionType: {
            EN: "Historical Carl Wilhelm Scheele Chlorine Gas Synthesis (1774)",
            VN: "Phản Ứng Lịch Sử Điều Chế Khí Clo Của Scheele (1774)"
        },
        mechanism: {
            EN: "Manganese(IV) oxidizes chloride anions (Cl⁻) into diatomic toxic pale yellow-green chlorine gas (Cl₂), while reducing to manganese(II) chloride.",
            VN: "Mangan(IV) oxi hóa ion clorua (Cl⁻) trong axit HCl đặc thành khí clo Cl₂ màu vàng lục mùi hắc nồng nặc, đồng thời mangan bị khử về muối MnCl₂ tan trong nước."
        },
        message: {
            EN: "Historical Scheele synthesis! Choking pale yellow-green Chlorine gas (Cl₂) bubbles up furiously!",
            VN: "Điều chế khí clo kinh điển của Scheele! Khí Clo (Cl₂) màu vàng lục nhạt sủi bọt cuồn cuộn với mùi hắc đặc trưng!"
        },
        effect: 'bubbles',
        temperatureSpike: 45,
        requiresPopup: true,
        hazardLevel: 'HIGH',
    },
    {
        reactants: ["CHLORINE_GAS", "NaOH"],
        product: "NaCl",
        products: ["NaCl","DISTILLED_WATER"],
        equation: {
            EN: "Cl₂ (g) + 2NaOH (aq) → NaCl (aq) + NaClO (aq, Javel Bleach) + H₂O",
            VN: "Cl₂ (k) + 2NaOH (dd) → NaCl (dd) + NaClO (dd, Nước Gia-ven) + H₂O"
        },
        reactionType: {
            EN: "Chlorine Disproportionation & Eau de Javel Bleach Synthesis",
            VN: "Tự Oxi Hóa Khử Của Clo & Điều Chế Nước Gia-Ven Tẩy Màu"
        },
        mechanism: {
            EN: "Chlorine undergoes rapid disproportionation in cold alkaline media, simultaneous oxidation to hypochlorite (ClO⁻) and reduction to chloride (Cl⁻), yielding household disinfectant bleach.",
            VN: "Khí clo tự oxi hóa khử trong dung dịch kiềm nguội, vừa bị khử về Cl⁻ vừa bị oxi hóa lên ClO⁻, tạo thành dung dịch nước Gia-ven có tính sát trùng và tẩy màu mạnh mẽ."
        },
        message: {
            EN: "Javel water synthesized! Chlorine gas dissolves completely into bleaching Sodium Hypochlorite (NaClO) solution!",
            VN: "Điều chế nước Gia-ven thành công! Khí clo tan biến vào dung dịch kiềm tạo hỗn hợp muối NaCl và NaClO tẩy trắng diệt khuẩn!"
        },
        effect: 'bubbles',
        temperatureSpike: 25,
    },
    {
        reactants: ["CHLORINE_GAS", "KI"],
        product: "IODINE_SOLUTION",
        products: ["IODINE_SOLUTION","NaCl"],
        equation: {
            EN: "Cl₂ (g) + 2KI (aq) → 2KCl (aq) + I₂ (aq, Deep Brown Triiodide)",
            VN: "Cl₂ (k) + 2KI (dd) → 2KCl (dd) + I₂ (dd, Iot Tự Do Nâu Đậm)"
        },
        reactionType: {
            EN: "Halogen Single Displacement & Free Iodine Liberation",
            VN: "Phản Ứng Đẩy Halogen Kinh Điển Của Khí Clo Với Muối Iodua"
        },
        mechanism: {
            EN: "Chlorine has a far higher standard reduction potential (E° = +1.36V) than iodine (E° = +0.54V), effortlessly displacing iodide ions into deep brown elemental iodine.",
            VN: "Clo có thế điện cực chuẩn (E° = +1.36V) cao hơn iot (E° = +0.54V), dễ dàng cướp electron đẩy ion iodua thành iot tự do I₂ làm dung dịch chuyển sang màu nâu sẫm tức thì."
        },
        message: {
            EN: "Halogen displacement: Pale chlorine displaces iodide, flashing solution into dark brown Iodine!",
            VN: "Phản ứng thế halogen: Khí clo đẩy iot ra khỏi muối KI, làm dung dịch lập tức chuyển sang màu nâu đậm của iot!"
        },
        effect: 'color_shift',
        temperatureSpike: 20,
    },
    {
        reactants: ["CHLORINE_GAS", "IRON"],
        product: "FeCl3",
        products: ["FeCl3"],
        equation: {
            EN: "2Fe (s) + 3Cl₂ (g) ──[Heat]──→ 2FeCl₃ (s) (Brown Smoke Cloud)",
            VN: "2Fe (r) + 3Cl₂ (k) ──[Đun nóng]──→ 2FeCl₃ (r) (Khói Nâu Đỏ Cuồn Cuộn)"
        },
        reactionType: {
            EN: "Iron Combustion in Chlorine Gas into Iron(III) Chloride",
            VN: "Sắt Cháy Sáng Rực Trong Khí Clo Tạo Khói Đỏ Nâu Sắt(III) Clorua"
        },
        mechanism: {
            EN: "Chlorine is a fierce oxidizer, pulling iron directly to its highest common oxidation state (+3), producing billowing clouds of reddish-brown iron(III) chloride smoke particles.",
            VN: "Khí clo là chất oxi hóa mạnh mẽ, đưa sắt thẳng lên số oxi hóa cao nhất (+3), tạo những cuộn khói màu nâu đỏ rực rỡ của muối sắt(III) clorua FeCl₃."
        },
        message: {
            EN: "Incandescent combustion! Iron burns fiercely in Chlorine gas, billowing reddish-brown FeCl₃ smoke clouds!",
            VN: "Cháy sáng rực rỡ! Dây sắt bốc cháy mãnh liệt trong khí clo tạo những cuộn khói màu nâu đỏ của FeCl₃!"
        },
        effect: 'smoke',
        temperatureSpike: 70,
        requiresPopup: true,
    },
    {
        reactants: ["PbNO3_2", "HYDROGEN_SULFIDE"],
        product: "LEAD_SULFIDE",
        products: ["LEAD_SULFIDE","HNO3"],
        equation: {
            EN: "Pb(NO₃)₂ (aq) + H₂S (g) → PbS (s) ↓ (Jet Black) + 2HNO₃ (aq)",
            VN: "Pb(NO₃)₂ (dd) + H₂S (k) → PbS (r) ↓ (Đen Tuyền) + 2HNO₃ (dd)"
        },
        reactionType: {
            EN: "Qualitative Detection of Hydrogen Sulfide Gas (Black Lead Strip)",
            VN: "Phản Ứng Nhận Biết Khí H₂S Kinh Điển Bằng Muối Chì (Hóa Đen Giấy Tẩm)"
        },
        mechanism: {
            EN: "Due to the microscopic solubility product of galena (Ksp = 10⁻²⁸), lead(II) binds sulfide ions instantaneously to precipitate jet-black PbS, uninhibited by the formed dilute nitric acid.",
            VN: "Do tích số tan siêu nhỏ của PbS (Ksp = 10⁻²⁸), ion chì Pb²⁺ kết hợp tức thì với sunfua tạo kết tủa màu đen tuyền PbS, không tan ngay cả trong dung dịch axit sinh ra."
        },
        message: {
            EN: "Black Lead Sulfide precipitate: Foul H₂S gas instantly turns clear lead solution into jet-black PbS!",
            VN: "Kết tủa đen tuyền đặc trưng: Khí H₂S làm dung dịch muối chì trong suốt lập tức biến thành kết tủa đen tuyền PbS!"
        },
        effect: 'precipitate',
        temperatureSpike: 15,
    },
    {
        reactants: ["CuSO4", "HYDROGEN_SULFIDE"],
        product: "COPPER_SULFIDE",
        products: ["COPPER_SULFIDE","H2SO4"],
        equation: {
            EN: "CuSO₄ (aq, Sky Blue) + H₂S (g) → CuS (s) ↓ (Insoluble Jet Black) + H₂SO₄ (aq)",
            VN: "CuSO₄ (dd, Xanh Lam) + H₂S (k) → CuS (r) ↓ (Đen Thẫm Bất Khả Tan) + H₂SO₄ (dd)"
        },
        reactionType: {
            EN: "Copper Sulfide Acid-Resistant Precipitation",
            VN: "Phản Ứng Kết Tủa Đồng Sunfua Không Tan Trong Axit"
        },
        mechanism: {
            EN: "Copper(II) ions form CuS with an ultra-low solubility product (Ksp = 6 × 10⁻³⁶), meaning it precipitates irreversibly even in strongly acidic aqueous environments.",
            VN: "Ion đồng Cu²⁺ tạo kết tủa CuS có tích số tan cực thấp (Ksp = 6 × 10⁻³⁶), kết tủa đen xuất hiện ngay lập tức và hoàn toàn không tan trong axit loãng."
        },
        message: {
            EN: "Acid-resistant precipitation! Sky-blue Copper solution crashes into deep black Copper(II) Sulfide (CuS)!",
            VN: "Kết tủa bền vững không tan trong axit! Dung dịch màu xanh lam của đồng sunfat biến thành kết tủa đen thẫm CuS!"
        },
        effect: 'precipitate',
        temperatureSpike: 20,
    },
    {
        reactants: ["CUPRIC_OXIDE", "ACETIC_ACID"],
        product: "COPPER_ACETATE",
        products: ["COPPER_ACETATE","DISTILLED_WATER"],
        equation: {
            EN: "CuO (s, Black) + 2CH₃COOH (aq) → (CH₃COO)₂Cu (aq, Emerald Verdigris Cyan) + H₂O",
            VN: "CuO (r, Bột Đen) + 2CH₃COOH (dd) → (CH₃COO)₂Cu (dd, Lam Ngọc Verdigris) + H₂O"
        },
        reactionType: {
            EN: "Basic Oxide Dissolution into Organic Copper(II) Acetate",
            VN: "Hòa Tan Oxit Bazơ CuO Trong Giấm Ăn Tạo Muối Đồng Lam Ngọc"
        },
        mechanism: {
            EN: "Acetic acid dissolves black copper oxide, coordinating acetate ligands around Cu²⁺ to yield the beautiful cyan-emerald copper(II) acetate complex.",
            VN: "Axit axetic hòa tan bột oxit đồng màu đen, các phối tử axetat bao quanh ion Cu²⁺ tạo phức đồng(II) axetat màu lam ngọc rực rỡ tuyệt mỹ."
        },
        message: {
            EN: "Verdigris synthesis! Black Copper Oxide dissolves cleanly into vibrant emerald-cyan Copper Acetate solution!",
            VN: "Điều chế đồng axetat lam ngọc! Bột đen CuO tan hoàn toàn trong axit axetic tạo dung dịch xanh lam ngọc lộng lẫy!"
        },
        effect: 'color_shift',
        temperatureSpike: 20,
    },
    {
        reactants: ["CUPRIC_OXIDE", "ETHANOL"],
        product: "COPPER",
        products: ["COPPER","ACETALDEHYDE","DISTILLED_WATER"],
        minTemperature: 80,
        equation: {
            EN: "CuO (s, Black) + CH₃CH₂OH (l) ──[Heat]──→ Cu (s, Reddish Lustrous) + CH₃CHO + H₂O",
            VN: "CuO (r, Đen) + C₂H₅OH (l) ──[Đun nóng]──→ Cu (r, Đồng Đỏ Ánh Kim) + CH₃CHO + H₂O"
        },
        reactionType: {
            EN: "Mild Vapor-Phase Dehydrogenation of Ethanol by Hot Copper Oxide",
            VN: "Oxi Hóa Không Hoàn Toàn Ancol Etylic Bằng CuO Đun Nóng"
        },
        mechanism: {
            EN: "Hot black CuO wire oxidizes primary alcohol into pungent volatile acetaldehyde, while copper atoms are reduced back into their gleaming reddish metallic state.",
            VN: "CuO màu đen nung nóng oxi hóa ancol bậc I thành andehit axetic mùi xốc, đồng thời nguyên tử đồng bị khử về kim loại đồng đỏ ánh kim lấp lánh."
        },
        message: {
            EN: "Classic SGK experiment! Black CuO is reduced to lustrous red Copper wire with the sweet-apple aroma of Acetaldehyde!",
            VN: "Thí nghiệm SGK kinh điển! Dây đồng bị oxi hóa đen CuO lập tức hóa thành màu đỏ ánh kim của đồng khi nhúng vào cồn nóng!"
        },
        effect: 'glow',
        temperatureSpike: 30,
        requiresPopup: true,
    },
    {
        reactants: ["STRONTIUM", "DISTILLED_WATER"],
        product: "SrOH2",
        products: ["SrOH2", "HYDROGEN_GAS"],
        equation: {
            EN: "Sr (s) + 2H₂O (l) → Sr(OH)₂ (aq) + H₂ (g) ↑ + Heat",
            VN: "Sr (r) + 2H₂O (l) → Sr(OH)₂ (dd) + H₂ (k) ↑ + Nhiệt"
        },
        reactionType: {
            EN: "Alkaline Earth Strontium Redox Effervescence",
            VN: "Phản Ứng Oxi Hóa Khử Của Kim Loại Kiềm Thổ Stronti Với Nước"
        },
        mechanism: {
            EN: "Strontium vigorously reduces water molecules, sinking and effervescing steady streams of flammable hydrogen gas with substantial heat evolution.",
            VN: "Kim loại stronti chìm xuống và phản ứng mãnh liệt với nước, sủi bọt khí hydro đều đặn và tỏa nhiệt lượng lớn tạo dung dịch kiềm Sr(OH)₂."
        },
        message: {
            EN: "Exothermic metal oxidation! Strontium reacts vigorously with water, liberating energetic Hydrogen gas bubbles!",
            VN: "Oxi hóa kim loại kiềm thổ! Stronti phản ứng mãnh liệt với nước, giải phóng các cột bọt khí hydro sủi tăm!"
        },
        effect: 'bubbles',
        productColor: '#f0fdf4',
        temperatureSpike: 45,
    },
    {
        reactants: ["BERYLLIUM", "NaOH"],
        product: "SODIUM_BERYLLATE",
        products: ["SODIUM_BERYLLATE", "HYDROGEN_GAS"],
        equation: {
            EN: "Be (s) + 2NaOH (aq) + 2H₂O → Na₂[Be(OH)₄] (aq, Sodium Beryllate) + H₂ (g) ↑",
            VN: "Be (r) + 2NaOH (dd) + 2H₂O → Na₂[Be(OH)₄] (dd, Natri Berylat) + H₂ (k) ↑"
        },
        reactionType: {
            EN: "Amphoteric Alkaline Dissolution of Beryllium Metal",
            VN: "Phản Ứng Hòa Tan Lưỡng Tính Của Kim Loại Beri Trong Kiềm Mạnh"
        },
        mechanism: {
            EN: "Unlike heavier alkaline earths, beryllium forms covalent amphoteric hydroxo complexes [Be(OH)₄]²⁻ in concentrated sodium hydroxide with steady evolution of H₂ gas.",
            VN: "Khác với các kim loại kiềm thổ khác, beri có tính lưỡng tính giống nhôm, tan hoàn toàn trong kiềm đặc tạo phức berylat và sủi bọt khí hydro."
        },
        message: {
            EN: "Amphoteric dissolution: Beryllium dissolves in strong caustic alkali, liberating pure Hydrogen gas!",
            VN: "Hòa tan lưỡng tính: Bột kim loại beri tan trong dung dịch kiềm NaOH giải phóng khí hydro!"
        },
        effect: 'bubbles',
        productColor: '#f8fafc',
        temperatureSpike: 35,
    },
    {
        reactants: ["CHROMIUM_CHLORIDE", "NaOH"],
        product: "CHROMIUM_HYDROXIDE",
        products: ["CHROMIUM_HYDROXIDE","NaCl"],
        equation: {
            EN: "CrCl₃ (aq) + 3NaOH (aq) → Cr(OH)₃ (s) ↓ (Grey-Green Amphoteric) + 3NaCl (aq)",
            VN: "CrCl₃ (dd) + 3NaOH (dd) → Cr(OH)₃ (r) ↓ (Xanh Xám Lưỡng Tính) + 3NaCl (dd)"
        },
        reactionType: {
            EN: "Precipitation of Amphoteric Chromium(III) Hydroxide",
            VN: "Kết Tủa Crom(III) Hiđroxit Xanh Xám Lưỡng Tính"
        },
        mechanism: {
            EN: "Hydroxide ions deprotonate hexaaquachromium(III) into a flocculent grey-green gelatinous precipitate of Cr(OH)₃.",
            VN: "Ion hiđroxit kết hợp với ion Cr³⁺ tạo kết tủa keo màu xanh xám của Cr(OH)₃ có tính lưỡng tính đặc trưng."
        },
        message: {
            EN: "Precipitate formed: Gelatinous grey-green Chromium(III) Hydroxide separates from solution!",
            VN: "Kết tủa xuất hiện: Cr(OH)₃ dạng keo màu xanh xám tách ra khỏi dung dịch!"
        },
        effect: 'precipitate',
        temperatureSpike: 15,
    },
    {
        reactants: ["CHROMIUM_HYDROXIDE", "NaOH"],
        product: "SODIUM_CHROMITE",
        products: ["SODIUM_CHROMITE"],
        equation: {
            EN: "Cr(OH)₃ (s) + NaOH (excess) → Na[Cr(OH)₄] (aq, Deep Emerald Chromite Solution)",
            VN: "Cr(OH)₃ (r) + NaOH (dư) → Na[Cr(OH)₄] (dd, Cromit Xanh Ngọc Lục Bảo)"
        },
        reactionType: {
            EN: "Amphoteric Dissolution of Chromium(III) Hydroxide in Excess Base",
            VN: "Hòa Tan Lưỡng Tính Của Cr(OH)₃ Trong Kiềm Dư Tạo Muối Cromit"
        },
        mechanism: {
            EN: "Excess hydroxide ligands coordinate to the amphoteric chromium center, reforming soluble tetrahydroxochromate(III) ions with a striking deep emerald-green color.",
            VN: "Ion hiđroxit dư hòa tan kết tủa Cr(OH)₃ tạo phức tetrahidroxocromat(III) có màu xanh ngọc lục bảo trong suốt tuyệt đẹp."
        },
        message: {
            EN: "Amphoteric redissolution: Grey-green precipitate dissolves cleanly into a radiant emerald-green Chromite solution!",
            VN: "Hòa tan lưỡng tính: Kết tủa xanh xám tan hoàn toàn trong kiềm dư tạo dung dịch cromit màu xanh ngọc lục bảo lộng lẫy!"
        },
        effect: 'color_shift',
        productColor: '#10b981',
        temperatureSpike: 10,
    },
    {
        reactants: ["POTASSIUM_CHLORATE", "CARBON"],
        product: "KCl",
        products: ["KCl", "CARBON_DIOXIDE"],
        minTemperature: 150,
        equation: {
            EN: "2KClO₃ (s) + 3C (s) ──[Heat/Ignition]──→ 2KCl (s) + 3CO₂ (g) ↑ + Flash Detonation",
            VN: "2KClO₃ (r) + 3C (r) ──[Kích nổ / Nhiệt]──→ 2KCl (r) + 3CO₂ (k) ↑ + Nổ Chói Lòa"
        },
        reactionType: {
            EN: "Violent Chlorate Deflagration & Firework Oxidation",
            VN: "Phản Ứng Cháy Nổ Mãnh Liệt Của Kali Clorat Với Than Cacbon"
        },
        mechanism: {
            EN: "Molten potassium chlorate rapidly supplies atomic oxygen to combustible carbon, resulting in near-instantaneous runaway deflagration with blinding flash and concussive sound.",
            VN: "Kali clorat nóng chảy cung cấp oxy nguyên tử tức thì cho cacbon, gây phản ứng cháy nổ tỏa nhiệt khủng khiếp kèm chớp sáng chói lòa."
        },
        message: {
            EN: "BLINDING FIREWORK FLASH! Molten Chlorate vigorously deflagrates carbon into sparks and hot CO₂ gas!",
            VN: "CHỚP SÁNG PHÁO HOA CHÓI LÒA! Kali clorat kích nổ than cacbon với tiếng nổ đanh và chớp sáng rực rỡ!"
        },
        effect: 'explosion',
        temperatureSpike: 110,
        requiresPopup: true,
        hazardLevel: 'CRITICAL',
    },
    {
        reactants: ["FERROUS_SULFIDE", "HCl"],
        product: "HYDROGEN_SULFIDE",
        products: ["HYDROGEN_SULFIDE","FeCl2"],
        equation: {
            EN: "FeS (s, Black) + 2HCl (aq) → FeCl₂ (aq) + H₂S (g) ↑ (Rotten Egg Gas)",
            VN: "FeS (r, Đen) + 2HCl (dd) → FeCl₂ (dd) + H₂S (k) ↑ (Khí Mùi Trứng Thối)"
        },
        reactionType: {
            EN: "Laboratory Hydrogen Sulfide Gas Generation (Kipp Apparatus)",
            VN: "Điều Chế Khí Hiđro Sunfua (H₂S) Phòng Thí Nghiệm (Bình Kíp)"
        },
        mechanism: {
            EN: "Strong hydrochloric acid protonates sulfide ions in the iron sulfide lattice, releasing volatile and pungent hydrogen sulfide gas.",
            VN: "Axit clohiđric mạnh proton hóa ion sunfua trong mạng tinh thể FeS, hòa tan chất rắn đen và giải phóng khí H₂S mùi trứng thối đặc trưng."
        },
        message: {
            EN: "Lab H₂S synthesis: Black Iron Sulfide dissolves in HCl with pungent bubbling of rotten-egg Hydrogen Sulfide gas!",
            VN: "Điều chế khí H₂S trong phòng thí nghiệm! FeS màu đen tan trong HCl giải phóng những dòng bọt khí H₂S mùi trứng thối đặc trưng!"
        },
        effect: 'bubbles',
        temperatureSpike: 25,
    },
];

