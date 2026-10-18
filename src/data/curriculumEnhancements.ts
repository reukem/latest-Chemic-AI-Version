export interface ExamTrap {
    VN: string;
    EN: string;
}

export interface WorkedProblem {
    title: { VN: string; EN: string };
    statement: { VN: string; EN: string };
    steps: { VN: string; EN: string }[];
    finalAnswer: { VN: string; EN: string };
}

export interface ComparativeMatrix {
    headers: { VN: string; EN: string }[];
    rows: { VN: string; EN: string }[][];
}

export interface ConceptQuizQuestion {
    id: string;
    question: { VN: string; EN: string };
    options: { VN: string; EN: string }[];
    correctIndex: number;
    explanation: { VN: string; EN: string };
}

export interface LessonEnhancement {
    examTraps: ExamTrap[];
    workedProblem: WorkedProblem;
    comparativeMatrix?: ComparativeMatrix;
    quiz: ConceptQuizQuestion[];
    labPreset?: {
        reagents: { id: string; dose: number }[];
        temperature: number;
        label: { VN: string; EN: string };
    };
}

export const CURRICULUM_ENHANCEMENTS: Record<string, LessonEnhancement> = {
    // Grade 12 - Lesson 1: Esters
    hh12_b1: {
        examTraps: [
            {
                VN: "Bẫy Nhiệt Độ Sôi: Este có nhiệt độ sôi THẤP HƠN NHIỀU so với alcohol và carboxylic acid có cùng số nguyên tử carbon hoặc cùng phân tử khối vì giữa các phân tử este KHÔNG CÓ LIÊN KẾT HYDROGEN LIÊN PHÂN TỬ!",
                EN: "Boiling Point Trap: Esters have substantially lower boiling points than isomeric alcohols or carboxylic acids because ester molecules CANNOT form intermolecular hydrogen bonds with each other!"
            },
            {
                VN: "Bẫy Este của Phenol: Phenyl axetat (CH₃COOC₆H₅) khi phản ứng với dung dịch NaOH cần tỉ lệ mol 1 : 2, sinh ra 2 muối (CH₃COONa + C₆H₅ONa) và H₂O, TUYỆT ĐỐI KHÔNG SINH RA ALCOHOL!",
                EN: "Phenolic Ester Trap: Phenyl acetate (CH₃COOC₆H₅) hydrolyzes with NaOH in a 1 : 2 stoichiometric ratio, yielding two salts (CH₃COONa + C₆H₅ONa) and water—NEVER free alcohol!"
            }
        ],
        workedProblem: {
            title: {
                VN: "Tính Hiệu Suất Phản Ứng Este Hóa Fischer",
                EN: "Fischer Esterification Stoichiometry & Yield Calculation"
            },
            statement: {
                VN: "Đun nóng 6,0 gam CH₃COOH (0,1 mol) với 6,9 gam C₂H₅OH (0,15 mol) có H₂SO₄ đặc làm xúc tác. Khi cân bằng thiết lập, thu được 5,28 gam etyl axetat ($M = 88\\text{ g/mol}$). Tính hiệu suất của phản ứng este hóa.",
                EN: "Heating 6.0 g CH₃COOH (0.1 mol) with 6.9 g C₂H₅OH (0.15 mol) over conc. H₂SO₄ yields 5.28 g ethyl acetate ($M = 88\\text{ g/mol}$) at equilibrium. Calculate the esterification reaction yield."
            },
            steps: [
                {
                    VN: "Bước 1: Tính số mol các chất ban đầu: $n_{\\text{acid}} = \\frac{6,0}{60} = 0,1\\text{ mol}$; $n_{\\text{alcohol}} = \\frac{6,9}{46} = 0,15\\text{ mol}$. Do tỉ lệ phản ứng là 1:1 nên hiệu suất tính theo chất thiếu là axit axetic.",
                    EN: "Step 1: Initial moles: $n_{\\text{acid}} = 0.1\\text{ mol}$; $n_{\\text{alcohol}} = 0.15\\text{ mol}$. Stoichiometry is 1:1, so the limiting reagent is CH₃COOH."
                },
                {
                    VN: "Bước 2: Tính số mol este thực tế thu được: $n_{\\text{ester}} = \\frac{5,28}{88} = 0,06\\text{ mol}$.",
                    EN: "Step 2: Experimental ester moles: $n_{\\text{ester}} = \\frac{5.28}{88} = 0.06\\text{ mol}$."
                },
                {
                    VN: "Bước 3: Hiệu suất phản ứng: $H = \\frac{0,06}{0,1} \\times 100\\% = 60\\%$.",
                    EN: "Step 3: Reaction efficiency: $H = \\frac{0.06}{0.1} \\times 100\\% = 60\\%$."
                }
            ],
            finalAnswer: {
                VN: "Hiệu suất phản ứng este hóa đạt H = 60,0%.",
                EN: "Fischer esterification yield H = 60.0%."
            }
        },
        comparativeMatrix: {
            headers: [
                { VN: "Đặc Tính", EN: "Property" },
                { VN: "Este Hóa (Thủy phân axit)", EN: "Acid-Catalyzed Hydrolysis" },
                { VN: "Xà Phòng Hóa (Thủy phân kiềm)", EN: "Alkaline Saponification" }
            ],
            rows: [
                [
                    { VN: "Tính thuận nghịch", EN: "Reversibility" },
                    { VN: "Thuận nghịch (2 chiều ⇌)", EN: "Reversible dynamic equilibrium (⇌)" },
                    { VN: "Một chiều hoàn toàn (→)", EN: "Irreversible completion (→)" }
                ],
                [
                    { VN: "Chất xúc tác", EN: "Catalyst / Reagent" },
                    { VN: "Axit vô cơ loãng (H₂SO₄ loãng)", EN: "Dilute mineral acid (H₂SO₄/HCl)" },
                    { VN: "Dung dịch kiềm mạnh (NaOH, KOH)", EN: "Strong base (NaOH, KOH)" }
                ],
                [
                    { VN: "Sản phẩm thu được", EN: "Reaction Products" },
                    { VN: "Axit cacboxylic + Alcohol", EN: "Carboxylic acid + Alcohol" },
                    { VN: "Muối cacboxylat + Alcohol", EN: "Carboxylate salt + Alcohol" }
                ]
            ]
        },
        quiz: [
            {
                id: "q1",
                question: {
                    VN: "Tại sao etyl axetat (CH₃COOC₂H₅, M=88) có nhiệt độ sôi (77°C) thấp hơn nhiều so với axit butyric (C₃H₇COOH, M=88, ts=163°C)?",
                    EN: "Why does ethyl acetate (bp 77°C) have a much lower boiling point than its isomer butyric acid (bp 163°C)?"
                },
                options: [
                    { VN: "A. Este có phân tử khối nhẹ hơn", EN: "A. Ester has lower molecular weight" },
                    { VN: "B. Este không có liên kết hydrogen liên phân tử", EN: "B. Ester lacks intermolecular hydrogen bonding" },
                    { VN: "C. Este có cấu trúc mạch vòng bền vững", EN: "C. Ester has a rigid cyclic ring" },
                    { VN: "D. Este dễ bị thủy phân ở nhiệt độ phòng", EN: "D. Ester hydrolyzes spontaneously at room temp" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Axit cacboxylic tạo liên kết hydrogen liên phân tử dạng dimer rất bền vững, trong khi este không có nguyên tử H linh động liên kết với O nên không tạo được liên kết hydrogen giữa các phân tử este!",
                    EN: "Carboxylic acids form strong dimeric intermolecular hydrogen bonds. Esters lack hydroxyl protons directly bonded to oxygen, preventing intermolecular H-bonding!"
                }
            },
            {
                id: "q2",
                question: {
                    VN: "Thủy phân hoàn toàn 1 mol phenyl axetat (CH₃COOC₆H₅) trong dung dịch NaOH dư cần bao nhiêu mol NaOH?",
                    EN: "How many moles of NaOH are consumed in complete hydrolysis of 1 mole of phenyl acetate?"
                },
                options: [
                    { VN: "A. 1 mol NaOH", EN: "A. 1 mole NaOH" },
                    { VN: "B. 2 mol NaOH", EN: "B. 2 moles NaOH" },
                    { VN: "C. 3 mol NaOH", EN: "C. 3 moles NaOH" },
                    { VN: "D. 0,5 mol NaOH", EN: "D. 0.5 mole NaOH" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Phenyl axetat là este của phenol: CH₃COOC₆H₅ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O. Do phenol sinh ra có tính axit yếu nên lập tức phản ứng tiếp với phân tử NaOH thứ 2!",
                    EN: "Phenyl acetate is a phenolic ester: CH₃COOC₆H₅ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O. The generated phenol is acidic and consumes a second NaOH mole!"
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'ACETIC_ACID', dose: 25 },
                { id: 'ETHANOL', dose: 25 },
                { id: 'H2SO4', dose: 5 }
            ],
            temperature: 65,
            label: {
                VN: "Tổng hợp Etyl Axetat (Este hóa Fischer)",
                EN: "Simulate Fischer Esterification in Lab"
            }
        }
    },

    // Grade 12 - Lesson 2: Soaps & Detergents
    hh12_b2: {
        examTraps: [
            {
                VN: "Bẫy Nước Cứng: Xà phòng truyền thống (muối carboxylate RCOONa) gặp nước cứng chứa ion Ca²⁺, Mg²⁺ lập tức tạo kết tủa váng trắng không tan (RCOO)₂Ca↓, làm mất bọt và làm ố vàng vải sợi! Trong khi đó chất giặt rửa tổng hợp (R-SO₃Na) tạo muối canxi tan tốt nên giặt rửa tốt trong nước cứng!",
                EN: "Hard Water Scum Trap: Traditional carboxylate soaps form insoluble curds (RCOO)₂Ca↓ with Ca²⁺/Mg²⁺, destroying suds and staining fabrics. Synthetic detergents (alkyl sulfonates) form completely soluble calcium salts, maintaining optimal detergent efficacy in hard water!"
            },
            {
                VN: "Bẫy Muối Kết NaCl: Trong phản ứng xà phòng hóa chất béo, việc thêm dung dịch NaCl bão hòa là để làm giảm độ tan của muối axit béo (hiện tượng muối kết), giúp xà phòng nhẹ hơn nổi lên trên bề mặt để tách lọc, KHÔNG PHẢI ĐỂ LÀM XÚC TÁC!",
                EN: "Salting Out Trap: Saturated NaCl solution is added during saponification strictly to decrease soap solubility via the common-ion salting-out effect so solid soap curds float to the surface—it is NOT a reaction catalyst!"
            }
        ],
        workedProblem: {
            title: {
                VN: "Tính Khối Lượng Xà Phòng Thu Được Từ Chất Béo",
                EN: "Quantitative Saponification Mass Yield Problem"
            },
            statement: {
                VN: "Xà phòng hóa hoàn toàn 8,90 gam tristearin (C₁₇H₃₅COO)₃C₃H₅ ($M = 890\\text{ g/mol}$) bằng dung dịch NaOH vừa đủ. Tính khối lượng muối natri stearat thu được, biết hiệu suất phản ứng đạt 95%.",
                EN: "Complete saponification of 8.90 g tristearin ($M = 890\\text{ g/mol}$) with stoichiometric NaOH yields sodium stearate at 95% efficiency. Calculate the recovered soap mass."
            },
            steps: [
                {
                    VN: "Bước 1: Tính số mol tristearin: $n_{\\text{lipid}} = \\frac{8,90}{890} = 0,01\\text{ mol}$.",
                    EN: "Step 1: Tristearin molar quantity: $n_{\\text{lipid}} = \\frac{8.90}{890} = 0.01\\text{ mol}$."
                },
                {
                    VN: "Bước 2: Phương trình: $(C_{17}H_{35}COO)_3C_3H_5 + 3NaOH \\rightarrow 3C_{17}H_{35}COONa + C_3H_5(OH)_3$. Số mol muối lý thuyết: $n_{\\text{soap}} = 3 \\times 0,01 = 0,03\\text{ mol}$.",
                    EN: "Step 2: Stoichiometry: $(C_{17}H_{35}COO)_3C_3H_5 + 3NaOH \\rightarrow 3C_{17}H_{35}COONa + C_3H_5(OH)_3$. Theoretical soap moles: $n_{\\text{soap}} = 0.03\\text{ mol}$."
                },
                {
                    VN: "Bước 3: Khối lượng mol natri stearat $M = 306\\text{ g/mol}$. Khối lượng muối thực tế: $m = 0,03 \\times 306 \\times 95\\% = 8,721\\text{ gam}$.",
                    EN: "Step 3: Molar mass of sodium stearate $M = 306\\text{ g/mol}$. Actual yield: $m = 0.03 \\times 306 \\times 0.95 = 8.721\\text{ g}$."
                }
            ],
            finalAnswer: {
                VN: "Khối lượng xà phòng natri stearat thu được là 8,721 gam.",
                EN: "Sodium stearate soap recovered is 8.721 grams."
            }
        },
        comparativeMatrix: {
            headers: [
                { VN: "Tiêu chí so sánh", EN: "Comparison Metric" },
                { VN: "Xà phòng truyền thống", EN: "Traditional Carboxylate Soap" },
                { VN: "Chất giặt rửa tổng hợp", EN: "Synthetic Detergent" }
            ],
            rows: [
                [
                    { VN: "Cấu tạo đầu ưa nước", EN: "Polar Hydrophilic Head" },
                    { VN: "Nhóm carboxylate: -COO⁻Na⁺ hoặc -COO⁻K⁺", EN: "Carboxylate group: -COO⁻Na⁺ or -COO⁻K⁺" },
                    { VN: "Nhóm sulfonate -SO₃⁻Na⁺ hoặc sulfate -OSO₃⁻Na⁺", EN: "Sulfonate -SO₃⁻Na⁺ or sulfate -OSO₃⁻Na⁺" }
                ],
                [
                    { VN: "Hiệu quả trong nước cứng", EN: "Performance in Hard Water" },
                    { VN: "Mất bọt, tạo kết tủa váng (RCOO)₂Ca↓", EN: "Fails: forms insoluble precipitate curd (RCOO)₂Ca↓" },
                    { VN: "Giữ bọt tốt, muối canxi tan hoàn toàn", EN: "Retains high foaming; calcium salts are soluble" }
                ],
                [
                    { VN: "Nguồn nguyên liệu", EN: "Feedstock Source" },
                    { VN: "Chất béo thực vật, mỡ động vật tự nhiên", EN: "Renewable agricultural vegetable oils & animal fats" },
                    { VN: "Dầu mỏ (Khí alkane, alkylbenzene)", EN: "Petrochemical hydrocarbons (crude petroleum fractions)" }
                ],
                [
                    { VN: "Tác động môi trường", EN: "Environmental Impact" },
                    { VN: "Dễ phân hủy sinh học, thân thiện môi trường", EN: "Readily biodegradable and non-bioaccumulative" },
                    { VN: "Nhánh alkyl phân nhánh khó phân hủy, gây bọt ô nhiễm", EN: "Branched chains resist microbial breakdown, causing persistent foam" }
                ]
            ]
        },
        quiz: [
            {
                id: "q1",
                question: {
                    VN: "Tại sao xà phòng natri stearat mất khả năng tạo bọt và giặt rửa khi sử dụng trong nguồn nước cứng có nồng độ ion Ca²⁺ và Mg²⁺ cao?",
                    EN: "Why does sodium stearate soap lose its cleansing lather when applied to hard water rich in Ca²⁺ and Mg²⁺ ions?"
                },
                options: [
                    { VN: "A. Ion Ca²⁺ và Mg²⁺ oxy hóa nhóm carboxylate", EN: "A. Ca²⁺ and Mg²⁺ oxidize carboxylate groups" },
                    { VN: "B. Tạo kết tủa (C₁₇H₃₅COO)₂Ca không tan làm cạn kiệt chất hoạt động bề mặt", EN: "B. Precipitation of insoluble (C₁₇H₃₅COO)₂Ca depletes surfactant micelles" },
                    { VN: "C. Xà phòng bị thủy phân chuyển thành ancol tương ứng", EN: "C. Soap hydrolyzes into corresponding free alcohols" },
                    { VN: "D. Làm giảm sức căng bề mặt của nước quá mức", EN: "D. It reduces water surface tension excessively" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Muối carboxylate của canxi và magie như (C₁₇H₃₅COO)₂Ca và (C₁₇H₃₅COO)₂Mg không tan trong nước, kết tủa thành váng bám dính làm cạn kiệt xà phòng hòa tan!",
                    EN: "Calcium and magnesium stearates are highly insoluble, precipitating out as an adhesive scum that removes amphiphilic molecules from solution!"
                }
            },
            {
                id: "q2",
                question: {
                    VN: "Vai trò cơ bản của việc bổ sung dung dịch natri clorua (NaCl) bão hòa vào bình phản ứng sau khi đun sôi chất béo với dung dịch kiềm là gì?",
                    EN: "What is the primary physicochemical function of adding saturated NaCl brine after boiling fat with alkaline solution?"
                },
                options: [
                    { VN: "A. Làm tăng tốc độ phản ứng xà phòng hóa", EN: "A. Accelerating the alkaline saponification rate" },
                    { VN: "B. Tách lớp xà phòng nổi lên bề mặt nhờ hiệu ứng muối kết (salting-out)", EN: "B. Isolating soap curds to float via the salting-out effect" },
                    { VN: "C. Trung hòa lượng kiềm NaOH dư trong dung dịch", EN: "C. Neutralizing excess unreacted NaOH alkali" },
                    { VN: "D. Hòa tan glixerol để chuyển thành dạng khí bay hơi", EN: "D. Vaporizing glycerol into the headspace gas phase" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Nồng độ ion Na⁺ cao làm giảm tích số tan của muối carboxylate (hiệu ứng ion chung / salting-out), đồng thời tăng khối lượng riêng pha lỏng, đẩy các hạt xà phòng đông tụ và nổi lên bề mặt!",
                    EN: "High Na⁺ concentration lowers carboxylate solubility via common-ion salting-out while increasing brine density, floating coagulated soap curds for filtration!"
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'TRIGLYCERIDE', dose: 30 },
                { id: 'NaOH', dose: 30 }
            ],
            temperature: 80,
            label: {
                VN: "Mô Phỏng Phản Ứng Xà Phòng Hóa (80°C)",
                EN: "Simulate Saponification Reaction (80°C)"
            }
        }
    },

    // Grade 12 - Lesson 3: Carbohydrates (Glucose & Fructose)
    hh12_b3: {
        examTraps: [
            {
                VN: "Bẫy Phân Biệt Glucose & Fructose: Fructose KHÔNG CHỨA NHÓM -CHO nhưng VẪN CHO PHẢN ỨNG TRÁNG BẠC (TOLLENS) VÀ CU(OH)₂ ĐỎ GẠCH! Nguyên nhân: Trong môi trường kiềm (OH⁻), fructose bị chuyển hóa (đồng phân hóa enediol) thành glucose! Để phân biệt glucose và fructose, BẮT BUỘC DÙNG NƯỚC BROM (Br₂/H₂O) — glucose làm mất màu nước brom còn fructose thì không!",
                EN: "Glucose vs Fructose Trap: Fructose lacks an aldehyde group (-CHO) yet STILL gives positive Tollens and Fehling tests! Mechanism: in alkaline OH⁻ medium, fructose tautomerizes into glucose via an enediol intermediate. To chemically distinguish them, ALWAYS use Bromine water (Br₂) — glucose decolorizes Br₂ water, while fructose does not!"
            },
            {
                VN: "Bẫy Phản Ứng Cu(OH)₂ Ở 2 Nhiệt Độ: Ở nhiệt độ thường (25°C), glucose tạo dung dịch phức màu XANH LAM THẪM (phản ứng của polyalcohol có nhiều nhóm -OH kề nhau). Khi đun nóng (≥ 60-100°C), nhóm -CHO mới bị oxy hóa tạo kết tủa ĐỎ GẠCH Cu₂O!",
                EN: "Two-Stage Cu(OH)₂ Temperature Trap: At room temperature (25°C), glucose forms a deep sapphire blue chelate complex (vicinal diol test). Only upon HEATING (≥ 60-100°C) does the -CHO group reduce Cu(II) to brick-red Cu₂O precipitate!"
            }
        ],
        workedProblem: {
            title: {
                VN: "Tính Khối Lượng Bạc Kết Tủa Từ Phản Ứng Tráng Gương",
                EN: "Stoichiometry of Tollens Silver Mirror Precipitation"
            },
            statement: {
                VN: "Đun nóng 18,0 gam glucose ($C_6H_{12}O_6, M = 180\\text{ g/mol}$) với lượng dư thuốc thử Tollens [Ag(NH₃)₂]OH. Biết hiệu suất phản ứng đạt 90%. Tính khối lượng kim loại bạc (Ag, $M = 108\\text{ g/mol}$) bám trên thành bình.",
                EN: "Heating 18.0 g glucose ($M = 180\\text{ g/mol}$) with excess Tollens reagent yields silver mirror at 90% yield. Calculate the mass of metallic Ag ($M = 108\\text{ g/mol}$) deposited."
            },
            steps: [
                {
                    VN: "Bước 1: Tính số mol glucose: $n_{\\text{glucose}} = \\frac{18,0}{180} = 0,1\\text{ mol}$.",
                    EN: "Step 1: Glucose moles: $n_{\\text{glucose}} = \\frac{18.0}{180} = 0.1\\text{ mol}$."
                },
                {
                    VN: "Bước 2: Phương trình tráng bạc của glucose: $C_5H_{11}O_5-CHO + 2[Ag(NH_3)_2]OH \\rightarrow C_5H_{11}O_5-COONH_4 + 2Ag\\downarrow + 3NH_3 + H_2O$. Do đó: 1 mol glucose sinh ra 2 mol Ag.",
                    EN: "Step 2: Stoichiometric equation: 1 mole of glucose reduces 2 moles of Ag⁺ to metallic Ag (1 : 2 ratio)."
                },
                {
                    VN: "Bước 3: Số mol Ag theo lý thuyết: $n_{\\text{Ag}} = 2 \\times 0,1 = 0,2\\text{ mol}$. Khối lượng Ag thực tế ($H = 90\\%$): $m_{\\text{Ag}} = 0,2 \\times 108 \\times 90\\% = 19,44\\text{ gam}$.",
                    EN: "Step 3: Theoretical Ag moles: $0.2\\text{ mol}$. Recovered mass with 90% yield: $m_{\\text{Ag}} = 0.2 \\times 108 \\times 0.90 = 19.44\\text{ g}$."
                }
            ],
            finalAnswer: {
                VN: "Khối lượng bạc bám trên thành bình là 19,44 gam.",
                EN: "Metallic silver deposited on glass is 19.44 grams."
            }
        },
        comparativeMatrix: {
            headers: [
                { VN: "Thuốc Thử Thí Nghiệm", EN: "Diagnostic Reagent" },
                { VN: "Hiện Tượng Với Glucose", EN: "Glucose Reaction" },
                { VN: "Hiện Tượng Với Fructose", EN: "Fructose Reaction" }
            ],
            rows: [
                [
                    { VN: "Cu(OH)₂ ở 25°C", EN: "Cu(OH)₂ at 25°C" },
                    { VN: "Dung dịch phức xanh lam thẫm (phức chelate)", EN: "Deep sapphire blue soluble chelate" },
                    { VN: "Dung dịch phức xanh lam thẫm (phức chelate)", EN: "Deep sapphire blue soluble chelate" }
                ],
                [
                    { VN: "Thuốc thử Tollens (Đun nóng)", EN: "Tollens Reagent (Heat)" },
                    { VN: "Tạo lớp gương bạc Ag sáng bóng", EN: "Deposits shiny metallic silver mirror (Ag)" },
                    { VN: "Tạo lớp gương bạc Ag (do chuyển hóa trong kiềm)", EN: "Deposits silver mirror (via alkaline tautomerism)" }
                ],
                [
                    { VN: "Nước Brom (Br₂ / H₂O)", EN: "Bromine Water (Br₂ / H₂O)" },
                    { VN: "Mất màu nước brom (tạo axit gluconic)", EN: "Decolorizes orange bromine water (oxidized to gluconic acid)" },
                    { VN: "KHÔNG mất màu nước brom (Dấu hiệu phân biệt)", EN: "NO discoloration (Crucial diagnostic distinction)" }
                ]
            ]
        },
        quiz: [
            {
                id: "q1",
                question: {
                    VN: "Để phân biệt 2 dung dịch mất nhãn chứa Glucose và Fructose trong phòng thí nghiệm, thuốc thử tối ưu nhất là gì?",
                    EN: "Which reagent chemically differentiates unlabelled aqueous solutions of Glucose versus Fructose?"
                },
                options: [
                    { VN: "A. Dung dịch AgNO₃ trong NH₃ dư (Thuốc thử Tollens)", EN: "A. Ammoniacal AgNO₃ solution (Tollens Reagent)" },
                    { VN: "B. Nước brom (Dung dịch Br₂ trong nước)", EN: "B. Aqueous bromine water (Br₂ / H₂O)" },
                    { VN: "C. Cu(OH)₂ đun nóng", EN: "C. Cu(OH)₂ suspension with heating" },
                    { VN: "D. Quỳ tím ẩm", EN: "D. Moist litmus paper" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Nước brom có môi trường axit nhẹ nên fructose KHÔNG thể chuyển hóa thành glucose được, do đó không phản ứng. Trong khi đó glucose có nhóm -CHO sẽ lập tức khử Br₂ làm mất màu da cam!",
                    EN: "Bromine water operates under neutral/acidic conditions where enediol tautomerization cannot occur. Glucose's aldehyde group rapidly reduces and decolorizes orange Br₂, while fructose remains unreactive!"
                }
            },
            {
                id: "q2",
                question: {
                    VN: "Tại sao fructose dù chứa nhóm chức ketone (-CO-) vẫn cho phản ứng tráng bạc với thuốc thử Tollens?",
                    EN: "Why does fructose (a ketose) reduce Tollens reagent to yield a metallic silver mirror?"
                },
                options: [
                    { VN: "A. Fructose có nhóm ketone có tính khử mạnh hơn aldehyde", EN: "A. Ketones are stronger reducing agents than aldehydes" },
                    { VN: "B. Trong môi trường bazơ (NH₃), fructose đồng phân hóa thành glucose", EN: "B. In basic NH₃ medium, fructose tautomerizes into glucose via enediol" },
                    { VN: "C. Thuốc thử Tollens oxy hóa liên kết C-C của fructose", EN: "C. Tollens oxidizes C-C backbone bonds directly" },
                    { VN: "D. Fructose bị nhiệt phân thành formaldehyde", EN: "D. Fructose thermally degrades into formaldehyde" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Trong môi trường kiềm yếu của dung dịch NH₃, fructose thiết lập cân bằng đồng phân hóa thuận nghịch với glucose qua trung gian enediol: Fructose ⇌ Enediol ⇌ Glucose!",
                    EN: "Under mildly alkaline conditions provided by aqueous ammonia, fructose undergoes Lobry de Bruyn-Alberda van Ekenstein transformation into glucose via an enediol intermediate!"
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'GLUCOSE', dose: 25 },
                { id: 'TOLLENS_REAGENT', dose: 25 }
            ],
            temperature: 65,
            label: {
                VN: "Thực Hiện Phản Ứng Tráng Bạc (Tollens)",
                EN: "Simulate Tollens Silver Mirror Reaction"
            }
        }
    }
};

// Fallback generator for all other curriculum lessons
export function getLessonEnhancement(lessonId: string, lessonTitle: string, suggestedReagents: string[]): LessonEnhancement {
    if (CURRICULUM_ENHANCEMENTS[lessonId]) {
        return CURRICULUM_ENHANCEMENTS[lessonId];
    }

    const reg1 = suggestedReagents[0] || 'DISTILLED_WATER';
    const reg2 = suggestedReagents[1] || 'NaOH';

    return {
        examTraps: [
            {
                VN: `Bẫy Lý Thuyết Thi THPTQG: Chú ý điều kiện nhiệt độ và xúc tác đặc hiệu của phản ứng. Đối với các phản ứng thuận nghịch, không bao giờ đạt hiệu suất 100%. Luôn kiểm tra chất dư và chất phản ứng hết trước khi tính toán số mol sản phẩm!`,
                EN: `High-Yield National Exam Trap: Pay strict attention to reaction conditions (catalysts and temperatures). For reversible chemical equilibria, yield never reaches 100%. Always identify the limiting reagent before computing stoichiometric product yields!`
            },
            {
                VN: `Bẫy Hiện Tượng Thí Nghiệm: Phân biệt rõ ràng giữa hiện tượng tạo kết tủa (↓), hiện tượng sủi bọt khí (↑) và hiện tượng đổi màu dung dịch do tạo phức chất tan. Không nhầm lẫn giữa phản ứng trao đổi ion và phản ứng oxi hóa - khử!`,
                EN: `Experimental Observation Trap: Distinguish clearly between insoluble precipitation (↓), gaseous effervescence (↑), and chromophoric solution coordination complexes. Never confuse metathesis with redox electron-transfer pathways!`
            }
        ],
        workedProblem: {
            title: {
                VN: `Bài Tập Tính Toán Định Lượng & Lượng Chất (${lessonTitle})`,
                EN: `Quantitative Stoichiometry Calculation Problem (${lessonTitle})`
            },
            statement: {
                VN: `Cho m gam chất phản ứng tác dụng hoàn toàn với dung dịch thuốc thử vừa đủ ở điều kiện chuẩn (25°C, 1 bar). Tính lượng sản phẩm sinh ra theo định luật bảo toàn khối lượng và bảo toàn nguyên tố.`,
                EN: `Calculate the theoretical yield and consumed molar quantities under standard room conditions (25°C, 1 bar) using stoichiometry and conservation laws.`
            },
            steps: [
                {
                    VN: `Bước 1: Quy đổi toàn bộ dữ kiện đề bài sang số mol (mol) theo công thức $n = \\frac{m}{M}$ hoặc $n = C_M \\times V$.`,
                    EN: `Step 1: Convert all given parameters to moles using $n = m / M$ or $n = C_M \\times V$.`
                },
                {
                    VN: `Bước 2: Viết và cân bằng chính xác phương trình hóa học, xác định tỉ lệ mol giữa các chất phản ứng và sản phẩm.`,
                    EN: `Step 2: Balance the chemical equation and establish molar ratios between reactants and products.`
                },
                {
                    VN: `Bước 3: Lập luận chất phản ứng hết, tính toán số mol sản phẩm và nhân với hiệu suất thực tế ($H\\%$).`,
                    EN: `Step 3: Determine the limiting reagent, calculate theoretical product moles, and scale by reaction yield.`
                }
            ],
            finalAnswer: {
                VN: `Áp dụng công thức tính thu được kết quả chính xác theo hệ thức hóa học.`,
                EN: `Applying fundamental conservation principles yields the exact stoichiometric solution.`
            }
        },
        quiz: [
            {
                id: "gen_q1",
                question: {
                    VN: `Hiện tượng đặc trưng nào sau đây xảy ra khi tiến hành phản ứng thực nghiệm trong bài học này?`,
                    EN: `Which characteristic experimental phenomenon occurs during the reaction featured in this lesson?`
                },
                options: [
                    { VN: "A. Xuất hiện kết tủa màu đặc trưng hoặc bọt khí thoát ra", EN: "A. Characteristic precipitate formation or effervescent gas evolution" },
                    { VN: "B. Không có bất kỳ sự thay đổi năng lượng hay nhiệt độ nào", EN: "B. Zero net thermal enthalpy change or optical variation" },
                    { VN: "C. Dung dịch lập tức đông đá ở nhiệt độ phòng", EN: "C. Solution instantaneously freezes at room temperature" },
                    { VN: "D. Tạo thành hỗn hợp đồng nhất không đổi pH", EN: "D. Completely homogeneous mixture with neutral pH unchanged" }
                ],
                correctIndex: 0,
                explanation: {
                    VN: "Phản ứng hóa học đặc trưng luôn đi kèm với sự biến đổi liên kết hóa học, thể hiện qua sự thay đổi màu sắc, xuất hiện kết tủa, giải phóng chất khí hoặc hiệu ứng nhiệt rõ rệt!",
                    EN: "Chemical transformations are characterized by bond reorganization manifested via chromatic changes, precipitation, gas evolution, or measurable thermal enthalpy spikes!"
                }
            },
            {
                id: "gen_q2",
                question: {
                    VN: `Yếu tố nào sau đây quyết định sự chuyển dịch cân bằng hoặc tốc độ của phản ứng này theo nguyên lý Le Chatelier?`,
                    EN: `Which factor governs equilibrium shift or reaction rate in this system according to Le Chatelier's principle?`
                },
                options: [
                    { VN: "A. Chỉ phụ thuộc vào thể tích bình chứa", EN: "A. Vessel volume alone" },
                    { VN: "B. Nhiệt độ, nồng độ chất phản ứng và áp suất (nếu có chất khí)", EN: "B. Temperature, reactant concentrations, and partial pressure (if gaseous)" },
                    { VN: "C. Không chịu tác động của nồng độ chất tham gia", EN: "C. Completely independent of chemical concentrations" },
                    { VN: "D. Màu sắc ánh sáng chiếu vào bình", EN: "D. Ambient lighting wavelength" }
                ],
                correctIndex: 1,
                explanation: {
                    VN: "Theo nguyên lý Le Chatelier, khi thay đổi một trong các yếu tố nồng độ, nhiệt độ, áp suất thì cân bằng sẽ chuyển dịch theo chiều làm giảm tác động của sự thay đổi đó!",
                    EN: "Le Chatelier's principle dictates that perturbations in temperature, concentration, or pressure shift equilibrium to oppose the applied disturbance!"
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: reg1, dose: 25 },
                { id: reg2, dose: 25 }
            ],
            temperature: 25,
            label: {
                VN: `Thực Hành Bài Học Này Trong Bàn Lab`,
                EN: `Run This Lesson on Virtual Lab Bench`
            }
        }
    };
}
