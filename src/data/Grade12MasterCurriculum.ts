// src/data/Grade12MasterCurriculum.ts
// Compiled from YouTube Playlists:
// 1. "Học Hóa Đến Chết" (GDPT 2018 Master Series)
// 2. "VietJack THPT Official" (Hóa học 12 – Kết Nối Tri Thức)

export interface MasterCurriculumLesson {
    id: string;
    code: string;
    lessonNumber: number;
    grade: 12;
    chapterNumber: number;
    chapterTitle: { VN: string; EN: string };
    title: { VN: string; EN: string };
    summary: { VN: string; EN: string };
    hook: {
        title: { VN: string; EN: string };
        content: { VN: string; EN: string };
    };
    structureAndNomenclature: {
        heading: { VN: string; EN: string };
        rules: { VN: string; EN: string }[];
        isomersAndPhysicalProperties: { VN: string; EN: string };
    };
    signatureReactions: {
        heading: { VN: string; EN: string };
        reactions: {
            equation: { VN: string; EN: string };
            condition: { VN: string; EN: string };
            phenomenon: { VN: string; EN: string };
        }[];
    };
    examTraps: {
        title: { VN: string; EN: string };
        traps: {
            trapName: { VN: string; EN: string };
            explanation: { VN: string; EN: string };
        }[];
    };
    workedProblem: {
        title: { VN: string; EN: string };
        statement: { VN: string; EN: string };
        steps: { VN: string; EN: string }[];
        finalAnswer: { VN: string; EN: string };
    };
    videoLectures: {
        title: { VN: string; EN: string };
        url: string;
        channel: string;
        description: { VN: string; EN: string };
    }[];
    labPreset: {
        reagents: { id: string; dose: number }[];
        temperature: number;
        label: { VN: string; EN: string };
    };
    quiz: {
        id: string;
        question: { VN: string; EN: string };
        options: { VN: string; EN: string }[];
        correctIndex: number;
        explanation: { VN: string; EN: string };
    }[];
}

export const GRADE_12_MASTER_CURRICULUM: MasterCurriculumLesson[] = [
    // -------------------------------------------------------------------------
    // LESSON 1: ESTERS & LIPIDS
    // -------------------------------------------------------------------------
    {
        id: 'hh12_ester_lipid',
        code: 'HH12.01',
        lessonNumber: 1,
        grade: 12,
        chapterNumber: 1,
        chapterTitle: {
            VN: 'CHƯƠNG 1: ESTER - LIPID',
            EN: 'CHAPTER 1: ESTERS - LIPIDS'
        },
        title: {
            VN: 'Este - Lipit: Cấu Tạo, Danh Pháp, Thủy Phân Đặc Biệt & Chất Béo',
            EN: 'Esters & Lipids: Molecular Structure, Nomenclature, Special Hydrolysis & Triglycerides'
        },
        summary: {
            VN: 'Nghiên cứu toàn diện về nhóm chức este $R\\text{COO}R\'$, quy tắc gọi tên gốc $R\'$ trước, quy luật nhiệt độ sôi không liên kết hydro, phản ứng thủy phân thuận nghịch (axit) và một chiều (kiềm), 3 bẫy phản ứng este đặc biệt (vinyl, isopropenyl, phenyl este) và cấu trúc 4 axit béo quan trọng.',
            EN: 'Comprehensive analysis of ester functional group $R\\text{COO}R\'$, nomenclature rules naming $R\'$ first, absence of intermolecular hydrogen bonding, reversible acid vs. irreversible alkaline hydrolysis, 3 high-yield special ester cleavage traps, and saturated vs. unsaturated fatty acids.'
        },
        hook: {
            title: {
                VN: 'Hương Thơm Trái Cây & Nguồn Dự Trữ Năng Lượng Sinh Học',
                EN: 'Natural Fruit Aromas & Biological Energy Reservoirs'
            },
            content: {
                VN: 'Tại sao chuối chín lại có mùi thơm ngọt ngào đặc trưng của dầu chuối (isoamyl axetat $\\text{CH}_3\\text{COOCH}_2\\text{CH}_2\\text{CH(CH}_3)_2$)? Tại sao dứa chín có mùi etyl butirat, hoa nhài có benzyl axetat? Và tại sao cơ thể động vật lại tích lũy năng lượng dưới dạng mỡ rắn thay vì dầu thực vật lỏng? Mọi câu trả lời đều bắt đầu từ liên kết este!',
                EN: 'Why do ripe bananas emit the signature sweet scent of banana oil (isoamyl acetate $\\text{CH}_3\\text{COOCH}_2\\text{CH}_2\\text{CH(CH}_3)_2$)? Why do pineapples smell of ethyl butyrate and jasmine of benzyl acetate? And why do mammals store metabolic energy in saturated solid fats rather than liquid plant oils? The chemistry of ester bonds unlocks all of these phenomena!'
            }
        },
        structureAndNomenclature: {
            heading: {
                VN: 'Cấu Tạo Phân Tử, Đồng Phân & Quy Tắc Cắt Liên Kết ("Cắt ở đâu thêm -OH ở đấy")',
                EN: 'Molecular Structure, Isomerism & The Bond-Cleavage Rule'
            },
            rules: [
                {
                    VN: 'Định nghĩa: Khi thay thế nhóm $-\\text{OH}$ ở nhóm cacboxyl ($R\\text{COOH}$) của axit cacboxylic bằng nhóm $-\\text{O}R\'$ ($R\'$ là gốc hidrocacbon, $R\' \\neq \\text{H}$) thì thu được este $R\\text{COO}R\'$.',
                    EN: 'Definition: Replacing the $-\\text{OH}$ group of a carboxylic acid ($R\\text{COOH}$) with an alkoxy or aryloxy group $-\\text{O}R\'$ ($R\' \\neq \\text{H}$) yields an ester $R\\text{COO}R\'$.'
                },
                {
                    VN: 'Công thức este no, đơn chức, mạch hở: $\\text{C}_n\\text{H}_{2n}\\text{O}_2$ ($n \\ge 2$). Số đồng phân este: $2^{n-2}$ ($2 \\le n \\le 4$: $\\text{C}_2\\text{H}_4\\text{O}_2$ có 1 este; $\\text{C}_3\\text{H}_6\\text{O}_2$ có 2 este; $\\text{C}_4\\text{H}_8\\text{O}_2$ có 4 este).',
                    EN: 'Saturated open-chain monoester formula: $\\text{C}_n\\text{H}_{2n}\\text{O}_2$ ($n \\ge 2$). Isomer count formula: $2^{n-2}$ ($2 \\le n \\le 4$: $\\text{C}_2\\text{H}_4\\text{O}_2$ has 1; $\\text{C}_3\\text{H}_6\\text{O}_2$ has 2; $\\text{C}_4\\text{H}_8\\text{O}_2$ has 4).'
                },
                {
                    VN: 'Quy tắc đọc tên chuẩn IUPAC: Tên gốc hidrocacbon $R\'$ (metyl, etyl, vinyl, phenyl, benzyl...) + Tên gốc axit $R\\text{COO}^-$ đuôi "at" (fomat, axetat, propionat, acrylat, metacrylat, benzoat).',
                    EN: 'Nomenclature Rule: Name the hydrocarbon group $R\'$ first (methyl, ethyl, vinyl, phenyl, benzyl) + Acid anion root ending in "-ate" (formate, acetate, propionate, acrylate, methacrylate, benzoate).'
                },
                {
                    VN: 'Quy tắc cắt liên kết thủy phân: Khi thủy phân este $R\\text{COO}-R\'$, liên kết giữa cacbon nhóm cacbonyl và oxi bị cắt đứt. Quy tắc vàng ghi nhớ: "Cắt ở đâu thêm $-\\text{OH}$ vào đấy" để tái tạo axit và ancol tương ứng.',
                    EN: 'Bond Cleavage Rule: In ester hydrolysis, the acyl-oxygen bond $R\\text{CO}-|\\text{O}R\'$ is cleaved. Memorize: "Attach $-\\text{OH}$ where the bond was cut" to reconstruct the parent acid and alcohol.'
                }
            ],
            isomersAndPhysicalProperties: {
                VN: 'Nhiệt độ sôi & Độ tan: Giữa các phân tử este KHÔNG CÓ LIÊN KẾT HYDRO LIÊN PHÂN TỬ (do không có nguyên tử H linh động gắn với O). Do đó, với các chất có cùng khối lượng phân tử ($M$): $\\text{Nhiệt độ sôi: Axit } (R\\text{COOH}) > \\text{Ancol } (R\\text{OH}) > \\text{Este } (R\\text{COO}R\')$. Este rất ít tan trong nước và nhẹ hơn nước.',
                EN: 'Boiling Point & Solubility Law: Because esters have NO active hydrogen attached to oxygen, they CANNOT form intermolecular hydrogen bonds! Hence, for comparable molar masses ($M$): $\\text{Boiling Point: Carboxylic Acid } (R\\text{COOH}) > \\text{Alcohol } (R\\text{OH}) > \\text{Ester } (R\\text{COO}R\')$. Esters are hydrophobic and less dense than water.'
            }
        },
        signatureReactions: {
            heading: {
                VN: 'Tính Chất Hóa Học & Phản Ứng Thủy Phân Đặc Trưng',
                EN: 'Chemical Properties & Characteristic Hydrolysis Reactions'
            },
            reactions: [
                {
                    equation: {
                        VN: 'RCOOR\' + H₂O ⇌ RCOOH + R\'OH',
                        EN: 'RCOOR\' + H₂O ⇌ RCOOH + R\'OH'
                    },
                    condition: {
                        VN: 'Xúc tác H₂SO₄ loãng, đun nóng nhẹ (t°)',
                        EN: 'Dilute H₂SO₄ catalyst, gentle heating (t°)'
                    },
                    phenomenon: {
                        VN: 'Phản ứng thuận nghịch hai chiều (⇌). Sau phản ứng, chất lỏng trong ống nghiệm vẫn bị phân tách thành 2 lớp (lớp este dư ở trên).',
                        EN: 'Reversible dynamic equilibrium (⇌). The reaction mixture remains heterogeneous with an upper immiscible ester layer.'
                    }
                },
                {
                    equation: {
                        VN: 'RCOOR\' + NaOH → RCOONa + R\'OH',
                        EN: 'RCOOR\' + NaOH → RCOONa + R\'OH'
                    },
                    condition: {
                        VN: 'Đun sôi nhẹ (t°)',
                        EN: 'Gentle boiling with alkaline base (t°)'
                    },
                    phenomenon: {
                        VN: 'Phản ứng xà phòng hóa một chiều (→). Hai lớp chất lỏng ban đầu hòa tan hoàn toàn thành dung dịch đồng nhất!',
                        EN: 'Irreversible alkaline saponification (→). The biphasic mixture fully homogenizes into a single clear aqueous solution!'
                    }
                },
                {
                    equation: {
                        VN: '(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃',
                        EN: '(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃'
                    },
                    condition: {
                        VN: 'Đun nóng chất béo (triglycerit) với dung dịch NaOH 40%',
                        EN: 'Boiling triglyceride fat with 40% NaOH solution'
                    },
                    phenomenon: {
                        VN: 'Sau phản ứng, thêm dung dịch NaCl bão hòa vào thì xà phòng (muối natri của axit béo) có khối lượng riêng nhỏ sẽ nổi lên trên thành mảng trắng rắn.',
                        EN: 'Adding saturated NaCl solution causes sodium carboxylate soap to salt out and float to the surface as a solid white cake.'
                    }
                }
            ]
        },
        examTraps: {
            title: {
                VN: '3 Bẫy Thủy Phân Este Đặc Biệt Thi THPT Quốc Gia & Olympiad',
                EN: '3 High-Yield Special Ester Hydrolysis Traps'
            },
            traps: [
                {
                    trapName: {
                        VN: 'BẪY 1: Este Vinyl Sinh Ra Andehit (Không Sinh Ancol)',
                        EN: 'TRAP 1: Vinyl Esters Cleave into Aldehydes (No Alcohol)'
                    },
                    explanation: {
                        VN: '$\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO}$. Nhóm $-\\text{OH}$ gắn vào cacbon nối đôi không no tạo thành ancol enol $\\text{CH}_2\\text{=CH-OH}$ không bền, lập tức tự chuyển vị hỗ biến thành axetandehit!',
                        EN: '$\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO}$. The unstable enol intermediate $\\text{CH}_2\\text{=CH-OH}$ tautomerizes immediately into acetaldehyde!'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 2: Este Isopropenyl Sinh Ra Xeton (Axeton)',
                        EN: 'TRAP 2: Isopropenyl Esters Cleave into Ketones (Acetone)'
                    },
                    explanation: {
                        VN: '$R\\text{COOC(CH}_3\\text{)=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} R\\text{COONa} + \\text{CH}_3\\text{COCH}_3$. Nhóm $-\\text{OH}$ gắn vào cacbon bậc hai mang liên kết đôi chuyển vị thành axeton.',
                        EN: '$R\\text{COOC(CH}_3\\text{)=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} R\\text{COONa} + \\text{CH}_3\\text{COCH}_3$. The enol tautomerizes into the ketone acetone.'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 3: Este Của Phenol Tỉ Lệ Mol 1:2 Tạo 2 Muối + H₂O (Không Sinh Ancol)',
                        EN: 'TRAP 3: Phenyl Esters Consume 2 NaOH → 2 Salts + Water (No Alcohol)'
                    },
                    explanation: {
                        VN: '$\\text{CH}_3\\text{COOC}_6\\text{H}_5 + 2\\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$. Phenol sinh ra ở giai đoạn 1 có tính axit nên phản ứng ngay với phân tử $\\text{NaOH}$ thứ hai! Do đó $1\\text{ mol este}$ tiêu tốn $2\\text{ mol NaOH}$, sinh ra 2 muối và nước, không có ancol!',
                        EN: '$\\text{CH}_3\\text{COOC}_6\\text{H}_5 + 2\\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$. The generated phenol is acidic and consumes a second equivalent of $\\text{NaOH}$. No alcohol is produced!'
                    }
                }
            ]
        },
        workedProblem: {
            title: {
                VN: 'Xà Phòng Hóa Este Đơn Chức & Khối Lượng Chất Rắn Khan Khi Cô Cạn',
                EN: 'Ester Saponification & Anhydrous Solid Residue Calculation'
            },
            statement: {
                VN: 'Xà phòng hóa hoàn toàn $7,4\\text{ g}$ metyl axetat ($\\text{CH}_3\\text{COOCH}_3$, $M = 74\\text{ g/mol}$) bằng $300\\text{ mL}$ dung dịch $\\text{KOH } 2\\text{M}$. Cô cạn dung dịch sau phản ứng đến khối lượng không đổi thu được $m$ gam chất rắn khan. Xác định giá trị của $m$.',
                EN: 'Completely saponify $7.4\\text{ g}$ of methyl acetate ($\\text{CH}_3\\text{COOCH}_3$, $M = 74\\text{ g/mol}$) with $300\\text{ mL}$ of $2\\text{M KOH}$. Evaporate the resulting mixture to dryness. Calculate the mass $m$ of the anhydrous solid residue.'
            },
            steps: [
                {
                    VN: 'Bước 1: Tính số mol các chất: $n_{\\text{ester}} = \\frac{7,4}{74} = 0,1\\text{ mol}$; $n_{\\text{KOH}} = 0,3 \\times 2 = 0,6\\text{ mol}$.',
                    EN: 'Step 1: Determine initial moles: $n_{\\text{ester}} = 7.4 / 74 = 0.1\\text{ mol}$; $n_{\\text{KOH}} = 0.3 \\times 2 = 0.6\\text{ mol}$.'
                },
                {
                    VN: 'Bước 2: So sánh số mol: Tỉ lệ phản ứng $\\text{CH}_3\\text{COOCH}_3 + \\text{KOH} \\rightarrow \\text{CH}_3\\text{COOK} + \\text{CH}_3\\text{OH}$ là 1 : 1. Vì $0,6 > 0,1$ nên $\\text{KOH}$ dư, este phản ứng hết.',
                    EN: 'Step 2: Stoichiometric comparison: $\\text{CH}_3\\text{COOCH}_3 + \\text{KOH} \\rightarrow \\text{CH}_3\\text{COOK} + \\text{CH}_3\\text{OH}$. Since $0.6 > 0.1$, $\\text{KOH}$ is in excess and methyl acetate is limiting.'
                },
                {
                    VN: 'Bước 3: Lập luận chất rắn khan sau khi cô cạn: Khi cô cạn, ancol metylic $\\text{CH}_3\\text{OH}$ bay hơi hoàn toàn cùng với nước. Chất rắn khan thu được gồm muối $\\text{CH}_3\\text{COOK}$ ($0,1\\text{ mol}$) và $\\text{KOH}$ dư ($0,6 - 0,1 = 0,5\\text{ mol}$).',
                    EN: 'Step 3: Analyze dry residue: Evaporation volatilizes $\\text{CH}_3\\text{OH}$ and $\\text{H}_2\\text{O}$. The solid residue consists of $\\text{CH}_3\\text{COOK}$ ($0.1\\text{ mol}$) and unreacted $\\text{KOH}$ ($0.6 - 0.1 = 0.5\\text{ mol}$).'
                },
                {
                    VN: 'Bước 4: Tính tổng khối lượng rắn khan: $m_{\\text{rắn}} = m_{\\text{CH}_3\\text{COOK}} + m_{\\text{KOH dư}} = 0,1 \\times 98 + 0,5 \\times 56 = 9,8 + 28,0 = 37,8\\text{ g}$.',
                    EN: 'Step 4: Compute total mass: $m = (0.1 \\times 98) + (0.5 \\times 56) = 9.8 + 28.0 = 37.8\\text{ g}$.'
                }
            ],
            finalAnswer: {
                VN: 'Khối lượng chất rắn khan thu được là m = 37,8 gam (chú ý tính cả lượng KOH dư).',
                EN: 'The mass of anhydrous solid residue is m = 37.8 g (including excess KOH).'
            }
        },
        videoLectures: [
            {
                title: { VN: '[HÓA 12] BÀI 1: ESTER - LIPID', EN: '[CHEM 12] LESSON 1: ESTERS - LIPIDS' },
                url: 'http://www.youtube.com/watch?v=8nfiPbueiPI',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Bài giảng chi tiết về cấu tạo este, mẹo đếm đồng phân 2^(n-2), quy tắc cắt liên kết và phân loại chất béo no vs không no.',
                    EN: 'In-depth lecture covering ester nomenclature, isomer counting, acyl cleavage, and lipid classifications.'
                }
            },
            {
                title: { VN: 'Hóa học 12 Bài 1: Ester - Lipid | Kết nối tri thức', EN: 'Chemistry 12 Lesson 1: Esters - Lipids | Knowledge Connection' },
                url: 'http://www.youtube.com/watch?v=hEuHcAhAwu8',
                channel: 'VietJack THPT Official',
                description: {
                    VN: 'Bài giảng chuẩn theo sách giáo khoa mới Kết Nối Tri Thức, hướng dẫn hiện tượng thí nghiệm este hóa Fischer và xà phòng hóa.',
                    EN: 'Official curriculum lesson explaining Fischer esterification kinetics and saponification.'
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'ETHYL_ACETATE', dose: 25 },
                { id: 'NaOH', dose: 25 }
            ],
            temperature: 70,
            label: {
                VN: 'NẠP THÍ NGHIỆM XÀ PHÒNG HÓA ESTER (70°C)',
                EN: 'SIMULATE ESTER SAPONIFICATION IN LAB (70°C)'
            }
        },
        quiz: [
            {
                id: 'q_ester_1',
                question: {
                    VN: 'Chất nào sau đây khi tác dụng với dung dịch NaOH đun nóng sinh ra ancol etylic (C₂H₅OH)?',
                    EN: 'Which of the following compounds reacts with hot NaOH to yield ethanol (C₂H₅OH)?'
                },
                options: [
                    { VN: 'CH₃COOCH=CH₂', EN: 'CH₃COOCH=CH₂' },
                    { VN: 'CH₃COOC₂H₅', EN: 'CH₃COOC₂H₅' },
                    { VN: 'CH₃COOC₆H₅', EN: 'CH₃COOC₆H₅' },
                    { VN: 'HCOOCH₃', EN: 'HCOOCH₃' }
                ],
                correctIndex: 1,
                explanation: {
                    VN: 'CH₃COOC₂H₅ khi thủy phân trong NaOH sinh ra CH₃COONa và C₂H₅OH (ancol etylic). Vinyl axetat sinh andehit axetic, phenyl axetat sinh 2 muối không tạo ancol, metyl fomat sinh ancol metylic.',
                    EN: 'CH₃COOC₂H₅ yields CH₃COONa + C₂H₅OH. Vinyl acetate yields acetaldehyde; phenyl acetate yields 2 salts with no alcohol; methyl formate yields methanol.'
                }
            },
            {
                id: 'q_ester_2',
                question: {
                    VN: 'Khi xà phòng hóa phenyl axetat (CH₃COOC₆H₅) bằng dung dịch NaOH dư, tỉ lệ mol giữa este và NaOH phản ứng là:',
                    EN: 'During the alkaline saponification of phenyl acetate (CH₃COOC₆H₅), the stoichiometric ratio of ester to consumed NaOH is:'
                },
                options: [
                    { VN: '1 : 1', EN: '1 : 1' },
                    { VN: '1 : 2', EN: '1 : 2' },
                    { VN: '1 : 3', EN: '1 : 3' },
                    { VN: '2 : 1', EN: '2 : 1' }
                ],
                correctIndex: 1,
                explanation: {
                    VN: 'Phenyl axetat là este của phenol. Sau khi cắt liên kết tạo CH₃COONa và C₆H₅OH, phenol có tính axit nên phản ứng tiếp với 1 phân tử NaOH: C₆H₅OH + NaOH → C₆H₅ONa + H₂O. Tổng cộng tỉ lệ là 1 : 2!',
                    EN: 'Phenyl acetate is an ester of phenol. The produced phenol consumes a second mole of NaOH to form sodium phenolate. Stoichiometric ratio = 1 : 2.'
                }
            }
        ]
    },

    // -------------------------------------------------------------------------
    // LESSON 2: SOAPS & SYNTHETIC DETERGENTS
    // -------------------------------------------------------------------------
    {
        id: 'hh12_soap_detergent',
        code: 'HH12.02',
        lessonNumber: 2,
        grade: 12,
        chapterNumber: 1,
        chapterTitle: {
            VN: 'CHƯƠNG 1: ESTER - LIPID',
            EN: 'CHAPTER 1: ESTERS - LIPIDS'
        },
        title: {
            VN: 'Xà Phòng & Chất Giặt Rửa Tổng Hợp: Cơ Chế Tẩy Rửa Micelle & Nước Cứng',
            EN: 'Soaps & Synthetic Detergents: Micelle Cleansing Mechanism & Hard Water Scum'
        },
        summary: {
            VN: 'Phân tích bản chất chất hoạt động bề mặt gồm đầu phân cực ưa nước và đuôi hidrocacbon dài kị nước, cơ chế phân tán vết dầu mỡ thành micelle lơ lửng, sự kết tủa xà phòng trong nước cứng (Ca²⁺, Mg²⁺) và sự khác biệt giữa xà phòng sinh học và chất giặt rửa tổng hợp.',
            EN: 'Detailed examination of amphiphilic surfactants with polar hydrophilic heads and long non-polar hydrophobic tails, spherical micellar emulsification of grease, soap scum precipitation in hard water (Ca²⁺, Mg²⁺), and environmental biodegradability of synthetic detergents.'
        },
        hook: {
            title: {
                VN: 'Tại Sao Nước Thường Không Thể Rửa Sạch Dầu Mỡ?',
                EN: 'Why Can Water Alone Never Wash Away Grease?'
            },
            content: {
                VN: 'Nước là dung môi có cực mạnh với mạng lưới liên kết hydro dày đặc, trong khi dầu mỡ là hidrocacbon không phân cực. Khi trộn chúng với nhau, năng lượng đẩy giữa các pha khiến dầu nổi lên trên không thể hòa tan. Xà phòng chính là "cây cầu phân tử" kết nối hai thế giới không tương thích này!',
                EN: 'Water is a polar solvent structured by hydrogen bonds, whereas oils and grease are non-polar hydrocarbons. Thermodynamically, water molecules repel non-polar oils. Soap molecules act as molecular bridges with one foot in water and one foot in oil, emulsifying grease droplets so they rinse away!'
            }
        },
        structureAndNomenclature: {
            heading: {
                VN: 'Cấu Tạo Chất Hoạt Động Bề Mặt & Cấu Trúc Micelle',
                EN: 'Surfactant Architecture & Micellar Structure'
            },
            rules: [
                {
                    VN: 'Cấu trúc lưỡng cực: Gồm một đầu phân cực ưa nước ($-\\text{COO}^-\\text{Na}^+$ hoặc $-\\text{COO}^-\\text{K}^+$ trong xà phòng; $-\\text{SO}_3^-\\text{Na}^+$ trong chất giặt rửa alkylbenzen sulfonat) và một đuôi dài kị nước ($R-$ từ 12 đến 18 nguyên tử cacbon).',
                    EN: 'Amphiphilic structure: Composed of a polar hydrophilic head ($-\\text{COO}^-\\text{Na}^+$ in soap; $-\\text{SO}_3^-\\text{Na}^+$ in synthetic sulfonate detergents) and a long hydrophobic hydrocarbon tail ($R-$ with 12 to 18 carbons).'
                },
                {
                    VN: 'Cơ chế tạo hạt Micelle: Khi nồng độ chất hoạt động bề mặt vượt quá nồng độ micelle tới hạn (CMC), các đuôi kị nước tụ lại bên trong ôm lấy giọt dầu bẩn, còn các đầu mang điện tích âm quay ra ngoài tiếp xúc với nước.',
                    EN: 'Micelle Formation: Above the Critical Micelle Concentration (CMC), hydrophobic tails orient inward into oil droplets while negatively charged heads face outward into the aqueous phase.'
                },
                {
                    VN: 'Lực đẩy tĩnh điện: Do tất cả các hạt micelle đều có bề mặt tích điện âm ($-\\text{COO}^-$), chúng đẩy nhau mạnh mẽ và không thể kết tụ lại, giúp vết bẩn bị cuốn trôi theo dòng nước xả.',
                    EN: 'Electrostatic Repulsion: Because all micelle surfaces carry identical negative charges ($-\\text{COO}^-$), they repel each other, preventing oil redeposition on fabrics.'
                }
            ],
            isomersAndPhysicalProperties: {
                VN: 'Khác biệt Xà phòng vs Chất giặt rửa: Xà phòng điều chế từ nguồn chất béo tự nhiên, dễ bị phân hủy sinh học bởi vi sinh vật. Chất giặt rửa tổng hợp sản xuất từ dầu mỏ (dẫn xuất hidrocacbon), nếu có mạch cacbon nhánh thì rất khó phân hủy sinh học, gây bọt ô nhiễm nguồn nước ngầm.',
                EN: 'Soap vs. Synthetic Detergents: Soaps are prepared from natural fats and are rapidly biodegradable. Synthetic petroleum-based detergents with branched hydrocarbon chains resist biodegradation, persisting in wastewater.'
            }
        },
        signatureReactions: {
            heading: {
                VN: 'Phản Ứng Điều Chế Xà Phòng & Hiện Tượng Trong Nước Cứng',
                EN: 'Saponification Synthesis & Hard Water Precipitation'
            },
            reactions: [
                {
                    equation: {
                        VN: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃',
                        EN: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃'
                    },
                    condition: {
                        VN: 'Đun sôi hỗn hợp tristearin với dung dịch NaOH, khuấy đều',
                        EN: 'Boiling tristearin with aqueous NaOH with continuous stirring'
                    },
                    phenomenon: {
                        VN: 'Thu được hỗn hợp sánh đặc chứa xà phòng natri stearat và glixerol.',
                        EN: 'Viscous saponified paste containing sodium stearate soap and glycerol.'
                    }
                },
                {
                    equation: {
                        VN: '2C₁₇H₃₅COO⁻ + Ca²⁺ → (C₁₇H₃₅COO)₂Ca ↓',
                        EN: '2C₁₇H₃₅COO⁻ + Ca²⁺ → (C₁₇H₃₅COO)₂Ca ↓'
                    },
                    condition: {
                        VN: 'Sử dụng xà phòng trong nước cứng chứa nhiều ion Ca²⁺ hoặc Mg²⁺',
                        EN: 'Using natural carboxylate soap in water with high Ca²⁺ / Mg²⁺'
                    },
                    phenomenon: {
                        VN: 'Xuất hiện kết tủa váng cặn xà phòng không tan, làm mất khả năng tạo bọt và bám bẩn vào sợi vải!',
                        EN: 'Insoluble sticky soap scum precipitates, destroying foaming capacity and staining fibers!'
                    }
                }
            ]
        },
        examTraps: {
            title: {
                VN: 'Bẫy Lý Thuyết Nước Cứng & Chất Giặt Rửa Tổng Hợp',
                EN: 'Hard Water & Synthetic Detergent Pitfalls'
            },
            traps: [
                {
                    trapName: {
                        VN: 'BẪY NƯỚC CỨNG: Tuyệt Đối Không Dùng Xà Phòng Thường Trong Nước Cứng',
                        EN: 'HARD WATER TRAP: Never Use Carboxylate Soaps in Hard Water'
                    },
                    explanation: {
                        VN: 'Muối stearat/panmitat của canxi và magie $(\\text{C}_{17}\\text{H}_{35}\\text{COO})_2\\text{Ca}$ kết tủa hoàn toàn trong nước, làm hao tổn xà phòng. Ngược lại, chất giặt rửa tổng hợp gốc sunfonat ($R\\text{-SO}_3\\text{Na}$) hoặc sunfat ($R\\text{-OSO}_3\\text{Na}$) tạo muối canxi/magie hòa tan trong nước nên dùng tốt trong cả nước cứng!',
                        EN: 'Calcium and magnesium soaps precipitate as insoluble scum. However, synthetic sulfonates ($R\\text{-SO}_3\\text{Na}$) form water-soluble calcium salts, remaining active in hard water!'
                    }
                }
            ]
        },
        workedProblem: {
            title: {
                VN: 'Tính Khối Lượng Muối Xà Phòng Thu Được Từ Chất Béo Công Nghiệp',
                EN: 'Industrial Saponification Yield Calculation'
            },
            statement: {
                VN: 'Xà phòng hóa hoàn toàn $100\\text{ kg}$ một loại chất béo chứa $89\\% \\text{ tristearin } (M = 890\\text{ g/mol})$ bằng dung dịch $\\text{NaOH}$ vừa đủ. Giả sử hiệu suất phản ứng đạt $100\\%$. Tính khối lượng muối natri stearat ($\\text{C}_{17}\\text{H}_{35}\\text{COONa}$, $M = 306\\text{ g/mol}$) thu được.',
                EN: 'Completely saponify $100\\text{ kg}$ of industrial fat containing $89\\%$ tristearin ($M = 890\\text{ g/mol}$) with stoichiometric $\\text{NaOH}$. Assuming $100\\%$ reaction yield, calculate the mass of sodium stearate soap ($\\text{C}_{17}\\text{H}_{35}\\text{COONa}$, $M = 306\\text{ g/mol}$) obtained.'
            },
            steps: [
                {
                    VN: 'Bước 1: Tính khối lượng tristearin nguyên chất: $m_{\\text{tristearin}} = 100 \\times 89\\% = 89\\text{ kg} = 89000\\text{ g}$.',
                    EN: 'Step 1: Pure tristearin mass: $m = 100 \\times 89\\% = 89\\text{ kg} = 89000\\text{ g}$.'
                },
                {
                    VN: 'Bước 2: Tính số mol tristearin: $n = \\frac{89000}{890} = 100\\text{ mol}$.',
                    EN: 'Step 2: Tristearin moles: $n = 89000 / 890 = 100\\text{ mol}$.'
                },
                {
                    VN: 'Bước 3: Dựa vào phương trình $(\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\rightarrow 3\\text{C}_{17}\\text{H}_{35}\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$: Số mol muối xà phòng $= 3 \\times n_{\\text{chất béo}} = 300\\text{ mol}$.',
                    EN: 'Step 3: Stoichiometric ratio 1 fat : 3 soap: $n_{\\text{soap}} = 3 \\times 100 = 300\\text{ mol}$.'
                },
                {
                    VN: 'Bước 4: Tính khối lượng natri stearat: $m = 300 \\times 306 = 91800\\text{ g} = 91,8\\text{ kg}$.',
                    EN: 'Step 4: Sodium stearate mass: $m = 300 \\times 306 = 91800\\text{ g} = 91.8\\text{ kg}$.'
                }
            ],
            finalAnswer: {
                VN: 'Khối lượng natri stearat nguyên chất thu được là m = 91,8 kg.',
                EN: 'The theoretical yield of sodium stearate soap is 91.8 kg.'
            }
        },
        videoLectures: [
            {
                title: { VN: 'Hóa học 12 Bài 2: Xà phòng và chất giặt rửa | Kết nối tri thức', EN: 'Chemistry 12 Lesson 2: Soaps and Detergents | Knowledge Connection' },
                url: 'http://www.youtube.com/watch?v=ZD8onrVXsbY',
                channel: 'VietJack THPT Official',
                description: {
                    VN: 'Thí nghiệm thực hành điều chế xà phòng từ dầu dừa và giải thích chi tiết cơ chế hạt micelle tẩy rửa trong nước.',
                    EN: 'Laboratory synthesis of soap from coconut oil and step-by-step demonstration of micelle cleansing.'
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'TRIGLYCERIDE', dose: 25 },
                { id: 'NaOH', dose: 25 }
            ],
            temperature: 85,
            label: {
                VN: 'NẠP THÍ NGHIỆM ĐIỀU CHẾ XÀ PHÒNG TỪ CHẤT BÉO (85°C)',
                EN: 'SIMULATE SOAP SYNTHESIS FROM TRIGLYCERIDES (85°C)'
            }
        },
        quiz: [
            {
                id: 'q_soap_1',
                question: {
                    VN: 'Tại sao không nên dùng xà phòng thông thường (natri panmitat hoặc natri stearat) trong nước cứng?',
                    EN: 'Why should conventional carboxylate soaps never be used in hard water?'
                },
                options: [
                    { VN: 'Vì xà phòng bị thủy phân tạo môi trường axit làm hỏng vải', EN: 'Because soap hydrolyzes into acid that ruins fabric' },
                    { VN: 'Vì ion Ca²⁺ và Mg²⁺ tạo kết tủa cặn không tan với anion gốc axit béo', EN: 'Because Ca²⁺ and Mg²⁺ precipitate insoluble carboxylate scum' },
                    { VN: 'Vì nước cứng làm xà phòng bốc cháy', EN: 'Because hard water ignites soap' },
                    { VN: 'Vì xà phòng tan quá nhanh trong nước cứng', EN: 'Because soap dissolves too fast in hard water' }
                ],
                correctIndex: 1,
                explanation: {
                    VN: 'Các ion Ca²⁺ và Mg²⁺ trong nước cứng kết tủa với anion axit béo tạo thành váng cặn không tan như (C₁₇H₃₅COO)₂Ca bám vào vải và làm mất khả năng tạo bọt.',
                    EN: 'Divalent cations Ca²⁺ and Mg²⁺ react with fatty acid anions to form insoluble precipitates such as (C₁₇H₃₅COO)₂Ca, destroying foam and leaving sticky scum.'
                }
            }
        ]
    },

    // -------------------------------------------------------------------------
    // LESSON 3: CARBOHYDRATES — GLUCOSE & FRUCTOSE
    // -------------------------------------------------------------------------
    {
        id: 'hh12_carbohydrate_glucose_fructose',
        code: 'HH12.03',
        lessonNumber: 3,
        grade: 12,
        chapterNumber: 2,
        chapterTitle: {
            VN: 'CHƯƠNG 2: CARBOHYDRATE',
            EN: 'CHAPTER 2: CARBOHYDRATES'
        },
        title: {
            VN: 'Carbohydrate: Glucose & Fructose - Vòng Pyranose, Hemiacetal & Bẫy Môi Trường Kiềm',
            EN: 'Carbohydrates: Glucose & Fructose - Pyranose Ring, Hemiacetal & Alkaline Isomerization'
        },
        summary: {
            VN: 'Nghiên cứu cấu trúc vòng pyranose (nhóm -OH hemiacetal C1), dạng mạch hở poliancol kèm andehit, 4 phản ứng đặc trưng (Cu(OH)2 ở 25°C ra phức xanh thẫm, đun nóng ra Cu2O đỏ gạch, tráng bạc Tollens ra 2Ag, làm mất màu nước brom), và bẫy đồng hóa Fructose ⇌ Glucose trong OH⁻.',
            EN: 'Rigorous analysis of 6-membered pyranose rings (C1 hemiacetal $-\\text{OH}$), acyclic polyol-aldehyde equilibrium, signature diagnostic tests (ambient $\\text{Cu(OH)}_2$ polyol complex vs. $\\ge 60^\\circ\\text{C}$ brick-red $\\text{Cu}_2\\text{O}$, Tollens silver mirror, bromine oxidation), and base-catalyzed lobry-de-bruyn isomerism.'
        },
        hook: {
            title: {
                VN: 'Vị Ngọt Của Mật Ong & Chỉ Số Đường Huyết Trong Máu',
                EN: 'The Sweetness of Honey & Blood Glucose Regulation'
            },
            content: {
                VN: 'Tại sao mật ong lại có vị ngọt sắc hơn đường mía rất nhiều? Đó là vì mật ong chứa tới $40\\%$ Fructose (chất có độ ngọt cao nhất trong các loại đường thông thường) và $30\\%$ Glucose! Trong y học, nồng độ glucose trong máu người khỏe mạnh luôn được kiểm soát chặt chẽ ở mức $4,4 - 7,2\\text{ mmol/L}$.',
                EN: 'Why is natural honey significantly sweeter than table sugar? Honey contains $40\\%$ Fructose (the sweetest naturally occurring monosaccharide) and $30\\%$ Glucose! In clinical biochemistry, normal human fasting blood sugar is tightly homeostatically maintained between $4.4 - 7.2\\text{ mmol/L}$.'
            }
        },
        structureAndNomenclature: {
            heading: {
                VN: 'Cấu Trúc Mạch Vòng Pyranose & Cân Bằng Dạng Mở Mạch',
                EN: 'Pyranose Ring Structure & Acyclic Tautomeric Equilibrium'
            },
            rules: [
                {
                    VN: 'Cấu trúc Glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$): Tồn tại chủ yếu ở dạng vòng 6 cạnh pyranose ($\\alpha$-glucose với $-\\text{OH}$ hemiacetal C1 hướng xuống; $\\beta$-glucose với $-\\text{OH}$ C1 hướng lên). Dạng mạch hở là polihidroxi andehit: $\\text{CH}_2\\text{OH-(CHOH)}_4\\text{-CHO}$ (5 nhóm $-\\text{OH}$ kề nhau + 1 nhóm $-\\text{CHO}$).',
                    EN: 'Glucose Structure ($\\text{C}_6\\text{H}_{12}\\text{O}_6$): Exists predominantly as 6-membered pyranose rings ($\\alpha$-form with C1 hemiacetal $-\\text{OH}$ axial/down; $\\beta$-form equatorial/up) in equilibrium with trace open-chain polyhydroxy aldehyde $\\text{CH}_2\\text{OH-(CHOH)}_4\\text{-CHO}$.'
                },
                {
                    VN: 'Cấu trúc Fructose: Tồn tại chủ yếu ở dạng vòng 5 cạnh furanose có nhóm $-\\text{OH}$ hemiketal C2. Dạng mạch hở là polihidroxi xeton: $\\text{CH}_2\\text{OH-(CHOH)}_3\\text{-CO-CH}_2\\text{OH}$.',
                    EN: 'Fructose Structure: Exists predominantly as 5-membered furanose rings with C2 hemiketal $-\\text{OH}$ in equilibrium with open-chain polyhydroxy ketone $\\text{CH}_2\\text{OH-(CHOH)}_3\\text{-CO-CH}_2\\text{OH}$.'
                }
            ],
            isomersAndPhysicalProperties: {
                VN: 'Đồng phân & Độ ngọt: Glucose và Fructose là đồng phân cấu tạo của nhau ($M = 180\\text{ g/mol}$). Độ ngọt tương đối: Fructose ($170$) > Saccarozơ ($100$) > Glucose ($74$).',
                EN: 'Isomerism & Relative Sweetness: Glucose and Fructose are structural isomers ($M = 180\\text{ g/mol}$). Sweetness scale: Fructose ($170$) > Sucrose ($100$) > Glucose ($74$).'
            }
        },
        signatureReactions: {
            heading: {
                VN: '4 Phản Ứng Hóa Học Tiêu Biểu & Phức Màu Đồng',
                EN: '4 Characteristic Reactions & Diagnostic Copper Complexes'
            },
            reactions: [
                {
                    equation: {
                        VN: '2C₆H₁₂O₆ + Cu(OH)₂ → (C₆H₁₁O₆)₂Cu + 2H₂O',
                        EN: '2C₆H₁₂O₆ + Cu(OH)₂ → (C₆H₁₁O₆)₂Cu + 2H₂O'
                    },
                    condition: {
                        VN: 'Nhiệt độ phòng (25°C), môi trường kiềm',
                        EN: 'Room temperature (25°C), alkaline medium'
                    },
                    phenomenon: {
                        VN: 'Hòa tan kết tủa Cu(OH)₂ màu xanh lam nhạt thành dung dịch phức đồng-polyol màu XANH LAM THẪM (sapphire blue)!',
                        EN: 'Dissolves pale blue Cu(OH)₂ precipitate into a deep, transparent sapphire-blue copper-polyol complex!'
                    }
                },
                {
                    equation: {
                        VN: 'CH₂OH(CHOH)₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH(CHOH)₄COONH₄ + 2Ag ↓ + 3NH₃ + H₂O',
                        EN: 'CH₂OH(CHOH)₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH(CHOH)₄COONH₄ + 2Ag ↓ + 3NH₃ + H₂O'
                    },
                    condition: {
                        VN: 'Đun nóng nhẹ với thuốc thử Tollens (AgNO₃ / NH₃)',
                        EN: 'Gentle heating with Tollens reagent (AgNO₃ / NH₃)'
                    },
                    phenomenon: {
                        VN: 'Kết tủa bạc kim loại (Ag) sáng bóng như gương bám chặt vào thành ống nghiệm (1 mol Glucose → 2 mol Ag)!',
                        EN: 'Metallic silver precipitates to form a reflective, shiny mirror coating on the glassware (1 Glucose → 2 Ag)!'
                    }
                },
                {
                    equation: {
                        VN: 'CH₂OH(CHOH)₄CHO + 2Cu(OH)₂ + NaOH → CH₂OH(CHOH)₄COONa + Cu₂O ↓ + 3H₂O',
                        EN: 'CH₂OH(CHOH)₄CHO + 2Cu(OH)₂ + NaOH → CH₂OH(CHOH)₄COONa + Cu₂O ↓ + 3H₂O'
                    },
                    condition: {
                        VN: 'Đun sôi dung dịch phức polyol ở nhiệt độ ≥ 60°C',
                        EN: 'Heating the alkaline polyol mixture to ≥ 60°C'
                    },
                    phenomenon: {
                        VN: 'Dung dịch màu xanh lam lập tức chuyển thành kết tủa ĐỎ GẠCH Cu₂O lắng xuống đáy ống nghiệm!',
                        EN: 'The sapphire-blue solution decomposes into an insoluble BRICK-RED Cu₂O precipitate!'
                    }
                },
                {
                    equation: {
                        VN: 'CH₂OH(CHOH)₄CHO + Br₂ + H₂O → CH₂OH(CHOH)₄COOH (Axit gluconic) + 2HBr',
                        EN: 'CH₂OH(CHOH)₄CHO + Br₂ + H₂O → CH₂OH(CHOH)₄COOH (Gluconic acid) + 2HBr'
                    },
                    condition: {
                        VN: 'Nhiệt độ phòng (25°C), dung dịch nước brom',
                        EN: 'Room temperature (25°C), aqueous bromine water'
                    },
                    phenomenon: {
                        VN: 'Nước brom màu vàng nâu bị MẤT MÀU hoàn toàn! Phản ứng này dùng để phân biệt Glucose với Fructose!',
                        EN: 'Aqueous orange-brown bromine water is completely DECOLORIZED! Diagnostic test distinguishing Glucose from Fructose!'
                    }
                }
            ]
        },
        examTraps: {
            title: {
                VN: 'Bẫy Lý Thuyết Đồng Hóa Kiềm Fructose ⇌ Glucose & Phân Biệt Đơn Thuốc Thử',
                EN: 'Alkaline Isomerization Trap & Single-Reagent Identification'
            },
            traps: [
                {
                    trapName: {
                        VN: 'BẪY 1: Tại Sao Fructose Không Có -CHO Vẫn Tráng Bạc & Tạo Cu₂O Đỏ Gạch?',
                        EN: 'TRAP 1: Why Does Fructose (A Ketone) Still Give Silver Mirror and Brick-Red Cu₂O?'
                    },
                    explanation: {
                        VN: 'Vì thuốc thử Tollens (AgNO₃/NH₃) và Fehling/Cu(OH)₂ đều là môi trường kiềm (OH⁻)! Trong môi trường kiềm, Fructose tự động đồng hóa hỗ biến: Fructose ⇌ Glucose. Do đó, KHÔNG THỂ dùng phản ứng tráng bạc hay Cu(OH)₂ đun nóng để phân biệt Glucose và Fructose!',
                        EN: 'Both Tollens and Fehling tests operate in alkaline media (OH⁻). In base, Fructose undergoes Lobry-de-Bruyn isomerization into Glucose: Fructose ⇌ Glucose. Thus, Tollens and Fehling CANNOT distinguish Glucose from Fructose!'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 2: Phân Biệt Glucose vs Fructose Bằng Nước Brom',
                        EN: 'TRAP 2: Only Bromine Water Can Distinguish Glucose from Fructose'
                    },
                    explanation: {
                        VN: 'Dung dịch nước brom (Br₂) có tính axit/trung tính nên Fructose KHÔNG THỂ đồng hóa thành Glucose được. Kết quả: Glucose làm mất màu nước brom, còn Fructose thì KHÔNG!',
                        EN: 'Aqueous bromine is acidic/neutral, preventing Fructose isomerization. Glucose decolorizes bromine water, whereas Fructose does NOT!'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 3: Phân Biệt 4 Dung Dịch Chỉ Bằng Một Thuốc Thử Cu(OH)₂',
                        EN: 'TRAP 3: Single-Reagent Distinction of 4 Solutions Using Only Cu(OH)₂'
                    },
                    explanation: {
                        VN: 'Cho Cu(OH)₂ vào 4 ống nghiệm ở 25°C: Axit axetic hòa tan tạo dung dịch xanh lam nhạt; Etanol không hòa tan; Glucozơ và Glixerol đều tạo dung dịch xanh thẫm. Đun nóng 2 ống xanh thẫm lên 70°C: chỉ có Glucozơ tạo kết tủa đỏ gạch Cu₂O!',
                        EN: 'Add Cu(OH)₂ at 25°C: Acetic acid dissolves it into pale cyan; Ethanol does not dissolve it; Glucose and Glycerol form deep sapphire-blue. Heat to 70°C: ONLY Glucose precipitates brick-red Cu₂O!'
                    }
                }
            ]
        },
        workedProblem: {
            title: {
                VN: 'Tính Lượng Bạc Kết Tủa & Thể Tích Khí Lên Men Rượu',
                EN: 'Silver Mirror Mass & Fermentation Gas Stoichiometry'
            },
            statement: {
                VN: 'Cho $18\\text{ g}$ glucozơ ($\\text{C}_6\\text{H}_{12}\\text{O}_6, M = 180\\text{ g/mol}$) phản ứng hoàn toàn với lượng dư thuốc thử Tollens. Tính khối lượng bạc kết tủa ($m_{\\text{Ag}}$). Nếu lên men $18\\text{ g}$ glucozơ trên với hiệu suất $80\\%$, tính thể tích khí $\\text{CO}_2$ (ở $25^\\circ\\text{C}, 1\\text{ bar}$, $V_m = 24,79\\text{ L/mol}$) thoát ra.',
                EN: 'React $18\\text{ g}$ of glucose ($M = 180\\text{ g/mol}$) with excess Tollens reagent to find metallic silver yield ($m_{\\text{Ag}}$). If $18\\text{ g}$ of glucose is fermented into ethanol with $80\\%$ yield, calculate the volume of evolved $\\text{CO}_2$ gas at $25^\\circ\\text{C}, 1\\text{ bar}$ ($V_m = 24.79\\text{ L/mol}$).'
            },
            steps: [
                {
                    VN: 'Bước 1: Tính số mol glucozơ ban đầu: $n_{\\text{glucozơ}} = \\frac{18}{180} = 0,1\\text{ mol}$.',
                    EN: 'Step 1: Glucose moles: $n = 18 / 180 = 0.1\\text{ mol}$.'
                },
                {
                    VN: 'Bước 2: Phản ứng tráng bạc Tollens: $1\\text{ mol Glucose} \\rightarrow 2\\text{ mol Ag}$. Số mol bạc thu được: $n_{\\text{Ag}} = 2 \\times 0,1 = 0,2\\text{ mol}$. Khối lượng bạc: $m_{\\text{Ag}} = 0,2 \\times 108 = 21,6\\text{ g}$.',
                    EN: 'Step 2: Silver mirror stoichiometry: $1\\text{ Glucose} \\rightarrow 2\\text{ Ag}$. Moles of silver: $n_{\\text{Ag}} = 2 \\times 0.1 = 0.2\\text{ mol}$. Mass of silver: $m_{\\text{Ag}} = 0.2 \\times 108 = 21.6\\text{ g}$.'
                },
                {
                    VN: 'Bước 3: Phương trình lên men rượu: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{enzim}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$. Số mol $\\text{CO}_2$ lý thuyết $= 2 \\times 0,1 = 0,2\\text{ mol}$.',
                    EN: 'Step 3: Alcoholic fermentation: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\rightarrow 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2$. Theoretical $\\text{CO}_2$ moles $= 2 \\times 0.1 = 0.2\\text{ mol}$.'
                },
                {
                    VN: 'Bước 4: Tính thể tích $\\text{CO}_2$ thực tế theo chuẩn GDPT 2018 ($H = 80\\%$): $V_{\\text{CO}_2} = 0,2 \\times 80\\% \\times 24,79 = 0,16 \\times 24,79 = 3,9664\\text{ L}$.',
                    EN: 'Step 4: Compute practical $\\text{CO}_2$ volume ($80\\%$ yield, GDPT 2018 standard $24.79\\text{ L/mol}$): $V = 0.2 \\times 0.8 \\times 24.79 = 3.9664\\text{ L}$.'
                }
            ],
            finalAnswer: {
                VN: 'Khối lượng Ag là 21,6 gam; thể tích khí CO₂ thoát ra là 3,9664 lít.',
                EN: 'Silver mass = 21.6 g; evolved CO₂ volume = 3.9664 L.'
            }
        },
        videoLectures: [
            {
                title: { VN: '[HÓA 12] BÀI 4: GIỚI THIỆU VỀ CARBOHYDRATE. GLUCOSE VÀ FRUCTOSE', EN: '[CHEM 12] LESSON 4: CARBOHYDRATES. GLUCOSE AND FRUCTOSE' },
                url: 'http://www.youtube.com/watch?v=XLPKhuRhCBc',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Bản chất vòng pyranose, cơ chế phản ứng tráng bạc và thí nghiệm Cu(OH)2 2 tầng nhiệt độ.',
                    EN: 'Lecture covering pyranose conformation, Tollens mechanism, and temperature-dependent Fehling test.'
                }
            },
            {
                title: { VN: 'Hóa học 12 Bài 4: Giới thiệu về carbohydrate. Glucose và fructose | Kết nối tri thức', EN: 'Chemistry 12 Lesson 4: Carbohydrates. Glucose and Fructose | Knowledge Connection' },
                url: 'http://www.youtube.com/watch?v=G_N2AfqUsuw',
                channel: 'VietJack THPT Official',
                description: {
                    VN: 'Bài giảng chuẩn SGK Kết Nối Tri Thức, phân tích chi tiết bẫy đồng hóa Fructose ⇌ Glucose.',
                    EN: 'Curriculum lecture on monosaccharides and base-catalyzed isomerization.'
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'GLUCOSE', dose: 25 },
                { id: 'CuOH2_PRECIPITATE', dose: 20 }
            ],
            temperature: 25,
            label: {
                VN: 'NẠP THÍ NGHIỆM PHỨC ĐỒNG GLUCOSE (25°C → ĐUN NÓNG 70°C)',
                EN: 'SIMULATE GLUCOSE COPPER COMPLEX (25°C → HEAT TO 70°C)'
            }
        },
        quiz: [
            {
                id: 'q_carb_1',
                question: {
                    VN: 'Thuốc thử duy nhất nào sau đây dùng để phân biệt dung dịch glucose và dung dịch fructose?',
                    EN: 'Which single diagnostic reagent can distinguish glucose solution from fructose solution?'
                },
                options: [
                    { VN: 'Thuốc thử Tollens (AgNO₃ trong NH₃)', EN: 'Tollens reagent (AgNO₃ in NH₃)' },
                    { VN: 'Dung dịch Cu(OH)₂ trong kiềm đun nóng', EN: 'Alkaline Cu(OH)₂ with heating' },
                    { VN: 'Nước brom (Br₂ trong nước)', EN: 'Aqueous bromine water (Br₂)' },
                    { VN: 'Khí hiđro (H₂, Ni, t°)', EN: 'Hydrogen gas (H₂, Ni, t°)' }
                ],
                correctIndex: 2,
                explanation: {
                    VN: 'Trong môi trường bazơ của Tollens hay Cu(OH)₂, fructose đồng hóa thành glucose nên đều cho hiện tượng giống nhau. Nước brom có môi trường axit/trung tính nên chỉ có glucose làm mất màu nước brom.',
                    EN: 'Tollens and Cu(OH)₂ are alkaline, converting fructose into glucose. Bromine water operates in neutral/acidic conditions where only glucose is oxidized, distinguishing the two.'
                }
            }
        ]
    },

    // -------------------------------------------------------------------------
    // LESSON 4: SACCHAROSE, MALTOSE, STARCH & CELLULOSE
    // -------------------------------------------------------------------------
    {
        id: 'hh12_disaccharide_polysaccharide',
        code: 'HH12.04',
        lessonNumber: 4,
        grade: 12,
        chapterNumber: 2,
        chapterTitle: {
            VN: 'CHƯƠNG 2: CARBOHYDRATE',
            EN: 'CHAPTER 2: CARBOHYDRATES'
        },
        title: {
            VN: 'Disaccarit & Polisaccarit: Saccarozơ, Tinh Bột & Xenlulozơ - Cấu Trúc Xoắn & Phức Schweizer',
            EN: 'Disaccharides & Polysaccharides: Sucrose, Starch & Cellulose - Helical Inclusion & Schweizer Complex'
        },
        summary: {
            VN: 'Nghiên cứu liên kết $\\alpha$-1,2-glicozit khóa vòng của saccarozơ (đường không khử), cấu trúc xoắn của amilozơ giữ phân tử iot tạo màu xanh tím biến mất khi đun nóng, cấu trúc mạch thẳng không nhánh của xenlulozơ [C₆H₇O₂(OH)₃]ₙ, dung dịch Schweizer và phản ứng tạo thuốc súng xenlulozơ trinitrat.',
            EN: 'Analysis of the locked $\\alpha$-1,2-glycosidic bridge of sucrose (non-reducing), amylose helical coil trapping iodine molecules (blue-black reversible inclusion complex), linear unbranched cellulose [C₆H₇O₂(OH)₃]ₙ dissolving in Schweizer\'s reagent, and cellulose trinitrate synthesis.'
        },
        hook: {
            title: {
                VN: 'Hàm Răng Quý Tộc Châu Âu & Bí Mật Của Ống Khói Súng',
                EN: 'European Aristocrat Smiles & Smokeless Gunpowder Secrets'
            },
            content: {
                VN: 'Vào thế kỷ 16-17, hàm răng đen mục vì ăn quá nhiều đường mía saccarozơ từng là biểu tượng của giới siêu giàu quý tộc châu Âu. Trong khi đó, sợi bông xenlulozơ tưởng chừng bình dị khi tác dụng với axit nitric đặc lại biến thành xenlulozơ trinitrat - loại thuốc súng không khói uy lực làm thay đổi hoàn toàn lịch sử chiến tranh thế giới!',
                EN: 'In Renaissance Europe, black rotten teeth from consuming cane sucrose was a coveted status symbol of the wealthy elite. Meanwhile, ordinary cotton cellulose treated with concentrated nitric acid transforms into cellulose trinitrate—a smokeless gunpowder that revolutionized global warfare!'
            }
        },
        structureAndNomenclature: {
            heading: {
                VN: 'Cấu Trúc Khóa Vòng Glicozit & Dạng Chuỗi Xoắn Polymer',
                EN: 'Locked Glycosidic Bridges & Polymeric Helices'
            },
            rules: [
                {
                    VN: 'Saccarozơ ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$): Cấu tạo từ 1 gốc $\\alpha$-glucozơ và 1 gốc $\\beta$-fructozơ liên kết với nhau qua nguyên tử oxi giữa C1 của glucozơ và C2 của fructozơ (liên kết $\\alpha$-1,2-glicozit). Vì CẢ HAI nhóm $-\\text{OH}$ hemiacetal/hemiketal đều đã tham gia liên kết nên saccarozơ KHÔNG THỂ MỞ VÒNG $\\rightarrow$ Đường không có tính khử!',
                    EN: 'Sucrose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$): Composed of $\\alpha$-glucose (C1) and $\\beta$-fructose (C2) linked via an $\\alpha$-1,2-glycosidic bridge. Because both anomeric carbons are locked, sucrose CANNOT open its ring $\\rightarrow$ Non-reducing sugar!'
                },
                {
                    VN: 'Tinh bột ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$): Gồm Amilozơ ($20-30\\%$, mạch không phân nhánh, xoắn hình lò xo ốc do liên kết $\\alpha$-1,4) và Amilopectin ($70-80\\%$, mạch phân nhánh với liên kết $\\alpha$-1,4 và $\\alpha$-1,6).',
                    EN: 'Starch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$): Blend of Amylose ($20-30\\%$, linear unbranched $\\alpha$-1,4 helical coils) and Amylopectin ($70-80\\%$, branched $\\alpha$-1,4 and $\\alpha$-1,6 chains).'
                },
                {
                    VN: 'Xenlulozơ ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$): Mạch thẳng kéo dài, không phân nhánh, cấu tạo từ các mắt xích $\\beta$-glucozơ liên kết $\\beta$-1,4-glicozit. Mỗi mắt xích có 3 nhóm $-\\text{OH}$ tự do, viết là $[\\text{C}_6\\text{H}_7\\text{O}_2(\\text{OH})_3]_n$.',
                    EN: 'Cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$): Rigid, unbranched linear chains of $\\beta$-glucose units linked via $\\beta$-1,4-glycosidic bonds. Each glucopyranose ring retains 3 free $-\\text{OH}$ groups: $[\\text{C}_6\\text{H}_7\\text{O}_2(\\text{OH})_3]_n$.'
                }
            ],
            isomersAndPhysicalProperties: {
                VN: 'BẪY ĐỒNG PHÂN: Tinh bột và Xenlulozơ ĐỀU CÓ CÔNG THỨC $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ NHƯNG KHÔNG PHẢI LÀ ĐỒNG PHÂN CỦA NHAU vì hệ số polime hóa $n$ của chúng rất khác nhau ($n$ của xenlulozơ lớn hơn nhiều so với tinh bột)!',
                EN: 'ISOMERISM TRAP: Starch and Cellulose both have empirical formula $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ BUT ARE NOT ISOMERS because their polymerization degrees $n$ differ vastly ($n$ of cellulose $\\gg$ starch)!'
            }
        },
        signatureReactions: {
            heading: {
                VN: 'Phản Ứng Bao Thể Iot Nhiệt Độ & Nước Schweizer',
                EN: 'Starch-Iodine Helical Inclusion & Schweizer Dissolution'
            },
            reactions: [
                {
                    equation: {
                        VN: 'Tinh bột + I₂ ⇌ [Tinh bột · I₂] (Phức chất bao bọc xoắn màu xanh tím)',
                        EN: 'Starch + I₂ ⇌ [Starch · I₂] (Navy blue-black helical inclusion complex)'
                    },
                    condition: {
                        VN: 'Nhiệt độ phòng (25°C); biến mất khi đun nóng ≥ 75°C, hồi phục khi để nguội',
                        EN: 'Ambient (25°C); decolorizes at ≥ 75°C, reappears upon cooling'
                    },
                    phenomenon: {
                        VN: 'Hồ tinh bột gặp I₂ xuất hiện màu XANH TÍM ĐẬM. Khi đun nóng, ống xoắn amilozơ duỗi thẳng làm giải phóng phân tử I₂ (dung dịch mất màu). Để nguội, ống xoắn co lại và màu xanh tím quay trở lại!',
                        EN: 'Yields a deep navy blue-black complex. Heating uncoils the amylose helix, liberating trapped I₂ (color disappears). Cooling re-coils the helix (color returns)!'
                    }
                },
                {
                    equation: {
                        VN: '[C₆H₇O₂(OH)₃]ₙ + 3n HNO₃ → [C₆H₇O₂(ONO₂)₃]ₙ (Xenlulozơ trinitrat) + 3n H₂O',
                        EN: '[C₆H₇O₂(OH)₃]ₙ + 3n HNO₃ → [C₆H₇O₂(ONO₂)₃]ₙ (Cellulose trinitrate) + 3n H₂O'
                    },
                    condition: {
                        VN: 'Đun nóng có xúc tác H₂SO₄ đặc',
                        EN: 'Heating in the presence of concentrated H₂SO₄'
                    },
                    phenomenon: {
                        VN: 'Tạo thành chất rắn màu vàng nhạt, cháy rất nhanh và nổ mạnh, không sinh khói (thuốc súng không khói).',
                        EN: 'Produces pale yellow cellulose trinitrate ($M = 297n$), which deflagrates explosively without smoke.'
                    }
                }
            ]
        },
        examTraps: {
            title: {
                VN: 'Bẫy Thủy Phân Saccarozơ Nhân Đôi Lượng Bạc & Nước Schweizer',
                EN: 'Sucrose Hydrolysis Silver Doubling & Schweizer Solvent'
            },
            traps: [
                {
                    trapName: {
                        VN: 'BẪY 1: Saccarozơ Không Tráng Bạc, Nhưng Sau Thủy Phân Lại Tạo 4Ag!',
                        EN: 'TRAP 1: Sucrose Itself Does Not Mirror, But Acid Hydrolysis Yields 4 Ag!'
                    },
                    explanation: {
                        VN: 'Bản thân Saccarozơ không có nhóm -CHO nên không tráng bạc. Tuy nhiên, khi thủy phân trong axit: 1 mol Saccarozơ → 1 mol Glucose + 1 mol Fructose. Vì cả Glucose và Fructose đều tráng bạc (mỗi chất cho 2Ag), nên lượng Ag thu được = 4 mol Ag!',
                        EN: 'Sucrose is non-reducing. However, acid hydrolysis cleaves it into 1 Glucose + 1 Fructose. In Tollens reagent, BOTH monosaccharides react (each yields 2 Ag), resulting in 4 moles of metallic Ag per mole of hydrolyzed sucrose!'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 2: Độ Tan Kỳ Lạ Của Xenlulozơ & Thuốc Thử Schweizer',
                        EN: 'TRAP 2: Insoluble Cellulose Dissolves in Schweizer\'s Reagent'
                    },
                    explanation: {
                        VN: 'Xenlulozơ không tan trong nước, ete, benzen hay etanol. Nó chỉ tan trong dung dịch Schweizer: phức chất tetramin đồng (II) hidroxit [Cu(NH₃)₄](OH)₂ để tạo thành tơ đồng - amoniac!',
                        EN: 'Cellulose is completely insoluble in common organic solvents. It uniquely dissolves in Schweizer\'s reagent ([Cu(NH₃)₄](OH)₂) to manufacture cuprammonium rayon fibers!'
                    }
                }
            ]
        },
        workedProblem: {
            title: {
                VN: 'Tính Khối Lượng Bạc Thu Được Sau Khi Thủy Phân Saccarozơ',
                EN: 'Post-Hydrolysis Sucrose Silver Mirror Calculation'
            },
            statement: {
                VN: 'Thủy phân $34,2\\text{ g}$ saccarozơ ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}, M = 342\\text{ g/mol}$) trong môi trường axit với hiệu suất $75\\%$. Trung hòa dung dịch sau phản ứng bằng kiềm rồi cho tác dụng với lượng dư dung dịch $\\text{AgNO}_3$ trong $\\text{NH}_3$. Tính khối lượng bạc ($m_{\\text{Ag}}$) thu được.',
                EN: 'Hydrolyze $34.2\\text{ g}$ of sucrose ($M = 342\\text{ g/mol}$) in acid with $75\\%$ yield. Neutralize with base and react with excess Tollens reagent. Calculate the mass of precipitated silver ($m_{\\text{Ag}}$).'
            },
            steps: [
                {
                    VN: 'Bước 1: Tính số mol saccarozơ ban đầu: $n = \\frac{34,2}{342} = 0,1\\text{ mol}$.',
                    EN: 'Step 1: Initial sucrose moles: $n = 34.2 / 342 = 0.1\\text{ mol}$.'
                },
                {
                    VN: 'Bước 2: Phản ứng thủy phân có hiệu suất $75\\%$: Số mol saccarozơ bị thủy phân $= 0,1 \\times 75\\% = 0,075\\text{ mol}$. Sinh ra $0,075\\text{ mol glucozơ}$ và $0,075\\text{ mol fructozơ}$.',
                    EN: 'Step 2: Account for $75\\%$ hydrolysis: Cleaved sucrose $= 0.1 \\times 0.75 = 0.075\\text{ mol}$, yielding $0.075\\text{ mol Glucose} + 0.075\\text{ mol Fructose}$.'
                },
                {
                    VN: 'Bước 3: Lập luận tráng gương: Cả glucozơ và fructozơ đều tráng gương cho $2\\text{Ag}$. Tổng số mol $\\text{Ag} = (0,075 \\times 2) + (0,075 \\times 2) = 0,3\\text{ mol}$.',
                    EN: 'Step 3: Tollens reaction: Both Glucose and Fructose produce $2\\text{ Ag}$. Total silver moles $= (0.075 \\times 2) + (0.075 \\times 2) = 0.3\\text{ mol}$.'
                },
                {
                    VN: 'Bước 4: Tính khối lượng Ag: $m_{\\text{Ag}} = 0,3 \\times 108 = 32,4\\text{ g}$.',
                    EN: 'Step 4: Compute silver mass: $m_{\\text{Ag}} = 0.3 \\times 108 = 32.4\\text{ g}$.'
                }
            ],
            finalAnswer: {
                VN: 'Khối lượng bạc kết tủa thu được là m = 32,4 gam.',
                EN: 'The total mass of precipitated silver is 32.4 g.'
            }
        },
        videoLectures: [
            {
                title: { VN: '[HÓA 12] BÀI 6: TINH BỘT VÀ CELLULOSE', EN: '[CHEM 12] LESSON 6: STARCH AND CELLULOSE' },
                url: 'http://www.youtube.com/watch?v=FpEp0NWB4_M',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Cơ chế xoắn ốc amilozơ giữ iot, phản ứng xenlulozơ trinitrat và phân tích các dạng bài tập thủy phân polisaccarit.',
                    EN: 'Helical amylose inclusion mechanics, cellulose nitration, and polysaccharide calculations.'
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'STARCH', dose: 25 },
                { id: 'IODINE_SOLUTION', dose: 15 }
            ],
            temperature: 25,
            label: {
                VN: 'NẠP THÍ NGHIỆM PHỨC MÀU IOT TINH BỘT (25°C → ĐUN NÓNG 80°C)',
                EN: 'SIMULATE STARCH-IODINE HELIX (25°C → HEAT TO 80°C)'
            }
        },
        quiz: [
            {
                id: 'q_starch_1',
                question: {
                    VN: 'Hiện tượng nào xảy ra khi đun nóng ống nghiệm chứa hồ tinh bột và dung dịch iot đến khoảng 80°C, sau đó để nguội?',
                    EN: 'What happens when a test tube containing starch and iodine is heated to ~80°C and then cooled?'
                },
                options: [
                    { VN: 'Màu xanh tím đậm dần và xuất hiện kết tủa đen', EN: 'The blue-black color intensifies and precipitates black' },
                    { VN: 'Màu xanh tím biến mất khi đun nóng, để nguội màu xanh tím xuất hiện trở lại', EN: 'The blue color vanishes upon heating and reappears upon cooling' },
                    { VN: 'Dung dịch chuyển sang màu đỏ gạch không thuận nghịch', EN: 'The solution permanently turns brick-red' },
                    { VN: 'Không có hiện tượng gì thay đổi', EN: 'No change occurs' }
                ],
                correctIndex: 1,
                explanation: {
                    VN: 'Khi đun nóng, cấu trúc xoắn ốc của amilozơ bị duỗi thẳng làm giải phóng iot khiến dung dịch mất màu. Khi để nguội, cấu trúc xoắn hình thành trở lại và màu xanh tím xuất hiện lại.',
                    EN: 'Thermal energy uncoils the amylose helix, liberating trapped I₂ molecules. Upon cooling, the helices reform and the blue-black inclusion complex reappears.'
                }
            }
        ]
    },

    // -------------------------------------------------------------------------
    // LESSON 5: AMINES, AMINO ACIDS, PEPTIDES & PROTEINS
    // -------------------------------------------------------------------------
    {
        id: 'hh12_nitrogen_compounds',
        code: 'HH12.05',
        lessonNumber: 5,
        grade: 12,
        chapterNumber: 3,
        chapterTitle: {
            VN: 'CHƯƠNG 3: HỢP CHẤT CHỨA NITROGEN',
            EN: 'CHAPTER 3: NITROGEN COMPOUNDS'
        },
        title: {
            VN: 'Hợp Chất Chứa Nitrogen: Amine, Amino Acid, Peptide, Protein & Phản Ứng Màu Biuret',
            EN: 'Nitrogen Compounds: Amines, Amino Acids, Peptides, Proteins & Biuret Color Test'
        },
        summary: {
            VN: 'Khảo sát bậc amin, 4 amin thể khí ở ĐKTC, dãy so sánh tính bazơ, anilin kết tủa trắng với nước brom, cấu trúc ion lưỡng cực của amino axit (Gly, Ala, Val, Lys làm quỳ hóa xanh, Glu làm quỳ hóa đỏ), phản ứng màu Biuret tạo phức tím với Cu(OH)₂ (bẫy dipeptit không phản ứng) và phản ứng xantoprotein.',
            EN: 'Rigorous examination of amine degrees, 4 gaseous amines at STP, basicity trends, aniline bromine precipitation, zwitterionic amino acids (Gly, Ala, Val, basic Lys, acidic Glu), Biuret test yielding royal violet complexes (dipeptide pitfall), and xanthoproteic nitric acid nitration.'
        },
        hook: {
            title: {
                VN: 'Mùi Tanh Của Cá, Chanh Khử Mùi & Vị Ngọt Mì Chính',
                EN: 'Fish Odor Neutralization & MSG Flavor Chemistry'
            },
            content: {
                VN: 'Tại sao cá tươi lại có mùi tanh khó chịu? Thủ phạm chính là trimetylamin $(\\text{CH}_3)_3\\text{N}$! Để khử tanh, các đầu bếp luôn dùng chanh hoặc giấm ăn vì axit axetic/axit xitric trung hòa amin thành muối không bay hơi. Trong khi đó, gia vị mì chính (bột ngọt) thân thuộc chính là muối mononatri của axit glutamic!',
                EN: 'Why does fresh fish carry a pungent odor? Trimethylamine $(\\text{CH}_3)_3\\text{N}$ is the volatile culprit! Chefs use lemon juice or vinegar because acids neutralize volatile amines into non-volatile ammonium salts. Meanwhile, monosodium glutamate (MSG) is the monosodium salt of the amino acid glutamic acid!'
            }
        },
        structureAndNomenclature: {
            heading: {
                VN: 'Cấu Tạo, Bậc Amin, Tính Bazơ & Cấu Trúc Lưỡng Cực Amino Axit',
                EN: 'Amine Classification, Basicity Hierarchy & Zwitterions'
            },
            rules: [
                {
                    VN: 'Bậc của amin: Bằng số nguyên tử $\\text{H}$ trong phân tử $\\text{NH}_3$ bị thay thế bởi gốc hidrocacbon (Amin bậc I: $R\\text{NH}_2$; Bậc II: $R_1\\text{NH}R_2$; Bậc III: $R_1\\text{N}R_2R_3$). Lưu ý: Khác hoàn toàn cách tính bậc ancol!',
                    EN: 'Degree of Amine: Defined by the number of H atoms in $\\text{NH}_3$ replaced by hydrocarbon groups (Primary: $R\\text{NH}_2$; Secondary: $R_1\\text{NH}R_2$; Tertiary: $R_1\\text{N}R_2R_3$).'
                },
                {
                    VN: '4 amin thể khí ở ĐKTC: Metylamin ($\\text{CH}_3\\text{NH}_2$), Đimetylamin ($(\\text{CH}_3)_2\\text{NH}$), Trimetylamin ($(\\text{CH}_3)_3\\text{N}$), Etylamin ($\\text{C}_2\\text{H}_5\\text{NH}_2$). Đều có mùi khai tanh tương tự amoniac, tan rất tốt trong nước.',
                    EN: '4 Gaseous Amines at STP: $\\text{CH}_3\\text{NH}_2$, $(\\text{CH}_3)_2\\text{NH}$, $(\\text{CH}_3)_3\\text{N}$, $\\text{C}_2\\text{H}_5\\text{NH}_2$. All have pungent ammonia-like odors and dissolve readily in water.'
                },
                {
                    VN: 'Thứ tự so sánh tính bazơ: $(\\text{CH}_3)_2\\text{NH} > \\text{C}_2\\text{H}_5\\text{NH}_2 > \\text{CH}_3\\text{NH}_2 > \\text{NH}_3 > \\text{C}_6\\text{H}_5\\text{NH}_2$ (Anilin). Anilin có tính bazơ cực yếu, không làm đổi màu quỳ tím hay phenolphthalein.',
                    EN: 'Basicity Order: Secondary aliphatic > Primary aliphatic > Ammonia ($\\text{NH}_3$) > Aniline ($\\text{C}_6\\text{H}_5\\text{NH}_2$). Aniline is weakly basic and does NOT turn litmus blue.'
                },
                {
                    VN: 'Cấu trúc ion lưỡng cực của Amino Axit: H⁺ chuyển từ $-\\text{COOH}$ sang $-\\text{NH}_2$ tạo ion lưỡng cực $\\text{H}_3\\text{N}^+-R-\\text{COO}^-$. Do đó các amino axit là chất rắn kết tinh, nhiệt độ nóng chảy cao và dễ tan trong nước.',
                    EN: 'Zwitterion Structure: Internal proton transfer forms dipolar $\\text{H}_3\\text{N}^+-R-\\text{COO}^-$, explaining their crystalline nature, high melting points, and water solubility.'
                }
            ],
            isomersAndPhysicalProperties: {
                VN: 'Tác dụng lên quỳ tím của 5 $\\alpha$-amino axit SGK: Glyxin (Gly, $M=75$), Alanin (Ala, $M=89$), Valin (Val, $M=117$) có $1\\text{ -NH}_2$ và $1\\text{ -COOH}$ $\\rightarrow$ pH $\\approx 6$ (không đổi màu quỳ); Lysin (Lys, $M=146$) có $2\\text{ -NH}_2, 1\\text{ -COOH}$ $\\rightarrow$ hóa XANH; Axit glutamic (Glu, $M=147$) có $1\\text{ -NH}_2, 2\\text{ -COOH}$ $\\rightarrow$ hóa ĐỎ!',
                EN: 'Litmus Test for the 5 Standard Amino Acids: Glycine ($M=75$), Alanine ($M=89$), Valine ($M=117$) have $1\\text{ -NH}_2$ and $1\\text{ -COOH}$ $\\rightarrow$ Neutral (no color change); Lysine ($M=146$, $2\\text{ -NH}_2$) $\\rightarrow$ Litmus turns BLUE; Glutamic acid ($M=147$, $2\\text{ -COOH}$) $\\rightarrow$ Litmus turns RED!'
            }
        },
        signatureReactions: {
            heading: {
                VN: 'Phản Ứng Kết Tủa Trắng Anilin & Phản Ứng Màu Biuret Tím',
                EN: 'Aniline Bromination & The Royal Violet Biuret Complex'
            },
            reactions: [
                {
                    equation: {
                        VN: 'C₆H₅NH₂ (Anilin) + 3Br₂ → 2,4,6-tribromanilin ↓ (Kết tủa trắng) + 3HBr',
                        EN: 'C₆H₅NH₂ (Aniline) + 3Br₂ → 2,4,6-tribromoaniline ↓ (White precipitate) + 3HBr'
                    },
                    condition: {
                        VN: 'Nhiệt độ phòng (25°C), nhỏ nước brom vào dung dịch anilin',
                        EN: 'Room temperature (25°C), adding bromine water to aniline'
                    },
                    phenomenon: {
                        VN: 'Nước brom mất màu lập tức và xuất hiện kết tủa trắng 2,4,6-tribromanilin ($M = 330\\text{ g/mol}$). Dùng để nhận biết anilin!',
                        EN: 'Bromine water decolorizes with instantaneous formation of a dense white precipitate of 2,4,6-tribromoaniline ($M = 330\\text{ g/mol}$).'
                    }
                },
                {
                    equation: {
                        VN: 'Peptide (≥ 2 liên kết peptit) + Cu(OH)₂ / OH⁻ → Phức chất màu TÍM BIURET đặc trưng',
                        EN: 'Peptide (≥ 2 peptide bonds) + Cu(OH)₂ / OH⁻ → Royal Violet Biuret Coordination Complex'
                    },
                    condition: {
                        VN: 'Nhỏ Cu(OH)₂ vào dung dịch peptide hoặc protein (lòng trắng trứng) trong môi trường kiềm',
                        EN: 'Adding Cu(OH)₂ to peptide or protein (egg albumin) in alkaline media'
                    },
                    phenomenon: {
                        VN: 'Kết tủa Cu(OH)₂ màu xanh lam nhạt tan ra tạo thành dung dịch phức chất phối trí màu TÍM ĐẬM (Royal Violet)!',
                        EN: 'Pale blue Cu(OH)₂ dissolves into an intense royal violet coordination complex!'
                    }
                }
            ]
        },
        examTraps: {
            title: {
                VN: 'Bẫy Phản Ứng Biuret Dipeptit & Rửa Chai Đựng Anilin Bằng HCl',
                EN: 'Dipeptide Biuret Trap & Aniline Cleaning with HCl'
            },
            traps: [
                {
                    trapName: {
                        VN: 'BẪY 1: Dipeptit (Như Gly-Ala) TUYỆT ĐỐI KHÔNG Cho Phản Ứng Màu Biuret!',
                        EN: 'TRAP 1: Dipeptides (e.g. Gly-Ala) DO NOT Give the Biuret Reaction!'
                    },
                    explanation: {
                        VN: 'Phản ứng màu Biuret bắt buộc phải có từ 2 LIÊN KẾT PEPTIT TRỞ LÊN (tức là từ TRIPEPTIT trở lên, hoặc protein). Dipeptit chỉ có 1 liên kết peptit $-\\text{CO-NH}-$ nên KHÔNG ĐỦ điều kiện tạo phức phối trí màu tím với $\\text{Cu(OH)}_2$!',
                        EN: 'The Biuret reaction requires $\\ge 2$ peptide linkages (tripeptides or higher). Dipeptides possess only a single peptide bond and CANNOT coordinate to form the violet complex!'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 2: Rửa Ống Nghiệm Dính Anilin Phải Dùng Axit HCl',
                        EN: 'TRAP 2: Cleaning Aniline Glassware Requires Dilute HCl (Not Water)'
                    },
                    explanation: {
                        VN: 'Anilin rất ít tan trong nước nên tráng nước không sạch. Phải dùng dung dịch axit $\\text{HCl}$ để chuyển anilin thành muối phenylamoni clorua $\\text{C}_6\\text{H}_5\\text{NH}_3^+\\text{Cl}^-$ tan rất tốt trong nước, sau đó mới tráng lại bằng nước sạch!',
                        EN: 'Aniline is hydrophobic and insoluble in water. Washing with dilute $\\text{HCl}$ converts it into water-soluble phenylammonium chloride $\\text{C}_6\\text{H}_5\\text{NH}_3^+\\text{Cl}^-$, which rinses away cleanly!'
                    }
                }
            ]
        },
        workedProblem: {
            title: {
                VN: 'Tính Khối Lượng Muối Khi Cho Hỗn Hợp Amino Axit Tác Dụng Với NaOH',
                EN: 'Amino Acid Neutralization & Salt Residue Stoichiometry'
            },
            statement: {
                VN: 'Cho $15\\text{ g}$ hỗn hợp gồm glyxin ($\\text{H}_2\\text{N-CH}_2\\text{-COOH}, M = 75\\text{ g/mol}$) và alanin ($\\text{H}_2\\text{N-CH(CH}_3\\text{)-COOH}, M = 89\\text{ g/mol}$) tác dụng vừa đủ với $100\\text{ mL}$ dung dịch $\\text{NaOH } 2\\text{M}$. Cô cạn cẩn thận dung dịch sau phản ứng thu được $m$ gam muối khan. Tính giá trị của $m$.',
                EN: 'A $15\\text{ g}$ mixture of glycine ($M = 75\\text{ g/mol}$) and alanine ($M = 89\\text{ g/mol}$) completely reacts with $100\\text{ mL}$ of $2\\text{M NaOH}$. Evaporate to dryness to find the anhydrous salt mass $m$.'
            },
            steps: [
                {
                    VN: 'Bước 1: Nhận xét bản chất phản ứng: Cả glyxin và alanin đều có 1 nhóm $-\\text{COOH}$ nên phản ứng với $\\text{NaOH}$ theo tỉ lệ mol 1 : 1: $\\text{R-COOH} + \\text{NaOH} \\rightarrow \\text{R-COONa} + \\text{H}_2\\text{O}$.',
                    EN: 'Step 1: Reaction stoichiometry: Both monoamino monocarboxylic acids consume $\\text{NaOH}$ in a 1 : 1 ratio: $\\text{R-COOH} + \\text{NaOH} \\rightarrow \\text{R-COONa} + \\text{H}_2\\text{O}$.'
                },
                {
                    VN: 'Bước 2: Tính số mol $\\text{NaOH}$ và số mol nước sinh ra: $n_{\\text{NaOH}} = 0,1 \\times 2 = 0,2\\text{ mol} \\rightarrow n_{\\text{H}_2\\text{O}} = 0,2\\text{ mol}$.',
                    EN: 'Step 2: Determine moles: $n_{\\text{NaOH}} = 0.1 \\times 2 = 0.2\\text{ mol} \\rightarrow n_{\\text{H}_2\\text{O}} = 0.2\\text{ mol}$.'
                },
                {
                    VN: 'Bước 3: Áp dụng định luật bảo toàn khối lượng: $m_{\\text{amino axit}} + m_{\\text{NaOH}} = m_{\\text{muối}} + m_{\\text{H}_2\\text{O}}$.',
                    EN: 'Step 3: Apply the Law of Conservation of Mass: $m_{\\text{amino acids}} + m_{\\text{NaOH}} = m_{\\text{salt}} + m_{\\text{H}_2\\text{O}}$.'
                },
                {
                    VN: 'Bước 4: Tính khối lượng muối: $m_{\\text{muối}} = 15 + (0,2 \\times 40) - (0,2 \\times 18) = 15 + 8,0 - 3,6 = 19,4\\text{ g}$.',
                    EN: 'Step 4: Calculate salt mass: $m = 15 + (0.2 \\times 40) - (0.2 \\times 18) = 15 + 8.0 - 3.6 = 19.4\\text{ g}$.'
                }
            ],
            finalAnswer: {
                VN: 'Khối lượng muối khan thu được là m = 19,4 gam (áp dụng nhanh bảo toàn khối lượng).',
                EN: 'The total mass of anhydrous salt obtained is 19.4 g.'
            }
        },
        videoLectures: [
            {
                title: { VN: '[HÓA 12] BÀI 8: AMINE', EN: '[CHEM 12] LESSON 8: AMINES' },
                url: 'http://www.youtube.com/watch?v=tTfgqXaw8uQ',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Phân loại bậc amin, so sánh lực bazơ, tính chất anilin và các bài toán định lượng amin hay gặp.',
                    EN: 'Comprehensive lecture on amine structures, basicity trends, and aniline chemistry.'
                }
            },
            {
                title: { VN: '[HÓA 12] BÀI 9: AMINO ACID VÀ PEPTIDE', EN: '[CHEM 12] LESSON 9: AMINO ACIDS AND PEPTIDES' },
                url: 'http://www.youtube.com/watch?v=7lW6UpVFJVE',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Cấu tạo ion lưỡng cực, điểm đẳng điện, liên kết peptit và phương pháp thủy phân peptide.',
                    EN: 'Zwitterion equilibria, peptide bond synthesis, and cleavage.'
                }
            },
            {
                title: { VN: '[HÓA 12] BÀI 10: PROTEIN VÀ ENZYME', EN: '[CHEM 12] LESSON 10: PROTEINS AND ENZYMES' },
                url: 'http://www.youtube.com/watch?v=rzs_xCSiE0A',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Cấu trúc bậc 1-4 của protein, phản ứng đông tụ nhiệt, phản ứng Biuret và phản ứng xantoprotein.',
                    EN: 'Protein structures, thermal denaturation, Biuret and xanthoproteic tests.'
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'ALBUMIN_PROTEIN', dose: 25 },
                { id: 'CuOH2_PRECIPITATE', dose: 20 }
            ],
            temperature: 25,
            label: {
                VN: 'NẠP THÍ NGHIỆM PHẢN ỨNG MÀU BIURET TÍM (ALBUMIN + Cu(OH)₂)',
                EN: 'SIMULATE VIOLET BIURET REACTION (ALBUMIN + Cu(OH)₂)'
            }
        },
        quiz: [
            {
                id: 'q_amine_1',
                question: {
                    VN: 'Chất nào sau đây KHÔNG cho phản ứng màu Biuret với dung dịch Cu(OH)₂ trong kiềm?',
                    EN: 'Which of the following compounds DOES NOT produce a violet Biuret color with Cu(OH)₂ in alkali?'
                },
                options: [
                    { VN: 'Lòng trắng trứng (Albumin)', EN: 'Egg white (Albumin)' },
                    { VN: 'Tripeptit Gly-Ala-Val', EN: 'Tripeptide Gly-Ala-Val' },
                    { VN: 'Dipeptit Gly-Ala', EN: 'Dipeptide Gly-Ala' },
                    { VN: 'Tetrapeptit Ala-Gly-Ala-Val', EN: 'Tetrapeptide Ala-Gly-Ala-Val' }
                ],
                correctIndex: 2,
                explanation: {
                    VN: 'Dipeptit chỉ có 1 liên kết peptit nên không thỏa mãn điều kiện tối thiểu (cần từ 2 liên kết peptit trở lên) để tạo phức chất màu tím với Cu(OH)₂.',
                    EN: 'Dipeptides contain only 1 peptide linkage, failing the structural requirement of $\\ge 2$ peptide bonds needed to coordinate Cu(OH)₂ into the violet complex.'
                }
            }
        ]
    },

    // -------------------------------------------------------------------------
    // LESSON 6: ELECTRODE POTENTIALS, GALVANIC CELLS & ELECTROLYSIS
    // -------------------------------------------------------------------------
    {
        id: 'hh12_electrochemistry',
        code: 'HH12.06',
        lessonNumber: 6,
        grade: 12,
        chapterNumber: 4,
        chapterTitle: {
            VN: 'CHƯƠNG 4: PIN ĐIỆN & ĐIỆN PHÂN',
            EN: 'CHAPTER 4: ELECTROCHEMISTRY & ELECTROLYSIS'
        },
        title: {
            VN: 'Thế Điện Cực, Pin Điện Hóa & Điện Phân: Quy Tắc Alpha, Cặp Fe³⁺/Fe²⁺ & Định Luật Faraday',
            EN: 'Electrode Potentials, Galvanic Cells & Electrolysis: Alpha Rule, Fe³⁺/Fe²⁺ Couple & Faraday\'s Law'
        },
        summary: {
            VN: 'Nghiên cứu dãy điện hóa chuẩn, câu thần chú ghi nhớ, vị trí đặc biệt của cặp Fe³⁺/Fe²⁺ (+0,77V), quy tắc alpha, hoạt động của pin Galvani Zn-Cu, tính suất điện động chuẩn, cơ chế điện phân nóng chảy/dung dịch, thứ tự khử ở catot âm, thứ tự oxi hóa ở anot dương và định luật Faraday $n_e = (I \\cdot t) / F$.',
            EN: 'Deep investigation of standard reduction potentials ($E^\\circ$), the electrochemical series mnemonic, the anomalous Fe³⁺/Fe²⁺ (+0.77V) position, the alpha rule, galvanic Daniell cells, EMF calculations, electrolytic reduction/oxidation priority at electrodes, and Faraday\'s law of electrolysis $n_e = (I \\cdot t) / F$.'
        },
        hook: {
            title: {
                VN: 'Pin Năng Lượng Tương Lai & Công Nghệ Mạ Điện Trang Sức',
                EN: 'Next-Gen Lithium Batteries & Precision Electroplating'
            },
            content: {
                VN: 'Làm thế nào một chiếc điện thoại thông minh có thể hoạt động suốt cả ngày chỉ với một thanh pin mỏng vài milimet? Và bằng cách nào người ta có thể phủ một lớp vàng $24\\text{K}$ bóng loáng dày chỉ vài micromet lên một chiếc đồng hồ thép? Tất cả đều dựa trên sự điều khiển dòng electron qua các phản ứng oxi hóa - khử!',
                EN: 'How does a modern lithium-ion cell power a smartphone for 24 hours from a wafer-thin chassis? And how can industrial jewellers deposit an atomically uniform 24K gold film onto stainless steel? Electrochemistry governs every electron transfer!'
            }
        },
        structureAndNomenclature: {
            heading: {
                VN: 'Dãy Điện Hóa Kim Loại, Thần Chú Ghi Nhớ & Quy Tắc Alpha (α)',
                EN: 'The Electrochemical Series & The Classical Alpha Rule (α)'
            },
            rules: [
                {
                    VN: 'Câu thần chú dãy điện hóa: "Khi Nào Bạn Cần May Áo Giáp Sắt Nên Sang Phố Hỏi Cửa Hàng Sắt3 Á Phi Âu". Thứ tự thế điện cực chuẩn tăng dần: $\\text{K}^+ < \\text{Ca}^{2+} < \\text{Na}^+ < \\text{Mg}^{2+} < \\text{Al}^{3+} < \\text{Zn}^{2+} < \\text{Fe}^{2+} < \\text{Ni}^{2+} < \\text{Sn}^{2+} < \\text{Pb}^{2+} < 2\\text{H}^+ (0,00\\text{ V}) < \\text{Cu}^{2+} (+0,34\\text{ V}) < \\text{Fe}^{3+}/\\text{Fe}^{2+} (+0,77\\text{ V}) < \\text{Ag}^+ (+0,80\\text{ V}) < \\text{Au}^{3+}$.',
                    EN: 'Electrochemical Mnemonic Series: Increasing reduction potential: $\\text{K}^+ < \\text{Ca}^{2+} < \\text{Na}^+ < \\text{Mg}^{2+} < \\text{Al}^{3+} < \\text{Zn}^{2+} < \\text{Fe}^{2+} < \\text{Ni}^{2+} < \\text{Sn}^{2+} < \\text{Pb}^{2+} < 2\\text{H}^+ (0.00\\text{ V}) < \\text{Cu}^{2+} (+0.34\\text{ V}) < \\text{Fe}^{3+}/\\text{Fe}^{2+} (+0.77\\text{ V}) < \\text{Ag}^+ (+0.80\\text{ V}) < \\text{Au}^{3+}$.'
                },
                {
                    VN: 'Vị trí đặc biệt của Fe³⁺/Fe²⁺: Cặp $\\text{Fe}^{3+}/\\text{Fe}^{2+}$ có $E^\\circ = +0,77\\text{ V}$, đứng SAU cặp $\\text{Cu}^{2+}/\\text{Cu}$ ($+0,34\\text{ V}$)! Do đó kim loại đồng $\\text{Cu}$ có thể khử $\\text{Fe}^{3+}$ về $\\text{Fe}^{2+}$: $\\text{Cu} + 2\\text{FeCl}_3 \\rightarrow \\text{CuCl}_2 + 2\\text{FeCl}_2$!',
                    EN: 'Anomalous Fe³⁺/Fe²⁺ Position: The $\\text{Fe}^{3+}/\\text{Fe}^{2+}$ couple ($+0.77\\text{ V}$) lies AFTER $\\text{Cu}^{2+}/\\text{Cu}$ ($+0.34\\text{ V}$)! Hence, copper metal reduces $\\text{Fe}^{3+}$ to $\\text{Fe}^{2+}$: $\\text{Cu} + 2\\text{FeCl}_3 \\rightarrow \\text{CuCl}_2 + 2\\text{FeCl}_2$!'
                },
                {
                    VN: 'Quy tắc Alpha (α): Chất oxi hóa mạnh hơn phản ứng với chất khử mạnh hơn để tạo thành chất oxi hóa yếu hơn và chất khử yếu hơn: $\\text{Chất oxi hóa đứng sau} + \\text{Chất khử đứng trước} \\rightarrow \\text{Chất oxi hóa yếu hơn} + \\text{Chất khử yếu hơn}$.',
                    EN: 'The Alpha Rule (α): Stronger oxidant + Stronger reductant $\\rightarrow$ Weaker oxidant + Weaker reductant.'
                }
            ],
            isomersAndPhysicalProperties: {
                VN: 'Quy tắc Pin Galvani Zn-Cu: Anot (-) có $E^\\circ$ thấp hơn (xảy ra sự oxi hóa $\\text{Zn} \\rightarrow \\text{Zn}^{2+} + 2e$); Catot (+) có $E^\\circ$ cao hơn (xảy ra sự khử $\\text{Cu}^{2+} + 2e \\rightarrow \\text{Cu}$). Suất điện động chuẩn: $E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot}} - E^\\circ_{\\text{anot}} = +0,34 - (-0,762) = 1,102\\text{ V}$.',
                EN: 'Galvanic Daniell Cell Rules: Anode (-) has lower $E^\\circ$ (oxidation: $\\text{Zn} \\rightarrow \\text{Zn}^{2+} + 2e$); Cathode (+) has higher $E^\\circ$ (reduction: $\\text{Cu}^{2+} + 2e \\rightarrow \\text{Cu}$). Standard cell EMF: $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +0.34 - (-0.762) = 1.102\\text{ V}$.'
            }
        },
        signatureReactions: {
            heading: {
                VN: 'Phản Ứng Điện Hóa & Định Luật Điện Phân Faraday',
                EN: 'Electrochemical Half-Reactions & Faraday\'s Law'
            },
            reactions: [
                {
                    equation: {
                        VN: 'Cu + 2FeCl₃ → CuCl₂ + 2FeCl₂',
                        EN: 'Cu + 2FeCl₃ → CuCl₂ + 2FeCl₂'
                    },
                    condition: {
                        VN: 'Nhiệt độ phòng (25°C), cho dây đồng vào dung dịch FeCl₃ màu vàng nâu',
                        EN: 'Room temperature (25°C), adding copper metal to brown FeCl₃ solution'
                    },
                    phenomenon: {
                        VN: 'Dây đồng tan dần và dung dịch từ màu vàng nâu chuyển dần sang màu xanh lam nhạt của Cu²⁺ và FeCl₂!',
                        EN: 'Copper metal dissolves into solution as the brown color shifts toward clear blue Cu²⁺!'
                    }
                },
                {
                    equation: {
                        VN: '2CuSO₄ + 2H₂O -(Điện phân trơ)→ 2Cu ↓ (Catot) + O₂ ↑ (Anot) + 2H₂SO₄',
                        EN: '2CuSO₄ + 2H₂O -(Electrolysis)→ 2Cu ↓ (Cathode) + O₂ ↑ (Anode) + 2H₂SO₄'
                    },
                    condition: {
                        VN: 'Dòng điện một chiều qua điện cực trơ (than chì/platin)',
                        EN: 'Direct current (DC) through inert graphite or platinum electrodes'
                    },
                    phenomenon: {
                        VN: 'Kim loại Cu màu đỏ bám vào Catot (-); bọt khí O₂ sủi mạnh ở Anot (+); dung dịch nhạt dần màu xanh và chuyển sang môi trường axit (pH giảm mạnh)!',
                        EN: 'Red copper metal coats Cathode (-); O₂ gas bubbles vigorously at Anode (+); solution loses blue color and becomes strongly acidic!'
                    }
                }
            ]
        },
        examTraps: {
            title: {
                VN: 'Bẫy Dấu Điện Cực Giữa Pin & Bình Điện Phân & Thứ Tự Khử',
                EN: 'Galvanic vs. Electrolytic Electrode Signs & Reduction Priorities'
            },
            traps: [
                {
                    trapName: {
                        VN: 'BẪY 1: Dấu Cực Đảo Ngược Nhưng Bản Chất Quá Trình KHÔNG ĐỔI!',
                        EN: 'TRAP 1: Electrode Signs Invert, But The Redox Nature NEVER Changes!'
                    },
                    explanation: {
                        VN: 'Trong Pin Galvani: Anot mang dấu ÂM (-), Catot mang dấu DƯƠNG (+). Trong Bình Điện Phân: Anot nối cực DƯƠNG (+), Catot nối cực ÂM (-). TUY NHIÊN: Tại CATOT LUÔN XẢY RA SỰ KHỬ ("Catot = Khử") và tại ANOT LUÔN XẢY RA SỰ OXI HÓA ("Anot = Oxi hóa") trong cả 2 trường hợp!',
                        EN: 'In Galvanic cells: Anode is (-) and Cathode is (+). In Electrolysis: Anode is (+) and Cathode is (-). HOWEVER: REDUCTION ALWAYS OCCURS AT THE CATHODE, and OXIDATION ALWAYS OCCURS AT THE ANODE in both systems!'
                    }
                },
                {
                    trapName: {
                        VN: 'BẪY 2: Thứ Tự Khử Ở Catot (-) & Oxi Hóa Ở Anot (+)',
                        EN: 'TRAP 2: Reduction & Oxidation Priority Orders in Electrolysis'
                    },
                    explanation: {
                        VN: 'Tại Catot (-), ion có tính oxi hóa mạnh hơn bị khử trước: $\\text{Ag}^+ > \\text{Cu}^{2+} > \\text{Fe}^{3+} (\\rightarrow \\text{Fe}^{2+}) > \\text{H}^+ > \\text{Fe}^{2+} > \\text{H}_2\\text{O}$. Các ion từ $\\text{Al}^{3+}$ trở về trước KHÔNG BỊ KHỬ trong dung dịch (thay vào đó nước bị khử sinh $\\text{H}_2$). Tại Anot trơ (+): $\\text{S}^{2-} > \\text{I}^- > \\text{Br}^- > \\text{Cl}^- > \\text{H}_2\\text{O}$ (các gốc $\\text{SO}_4^{2-}, \\text{NO}_3^-$ không bị oxi hóa).',
                        EN: 'Cathode (-) reduction order: $\\text{Ag}^+ > \\text{Cu}^{2+} > \\text{Fe}^{3+} (\\rightarrow \\text{Fe}^{2+}) > \\text{H}^+ > \\text{H}_2\\text{O}$. Cations more active than $\\text{Al}^{3+}$ are NOT reduced in water (water is reduced to $\\text{H}_2$). Inert Anode (+) order: $\\text{I}^- > \\text{Br}^- > \\text{Cl}^- > \\text{H}_2\\text{O}$.'
                    }
                }
            ]
        },
        workedProblem: {
            title: {
                VN: 'Điện Phân Dung Dịch CuSO₄ & Định Luật Faraday Tính Khối Lượng Kim Loại',
                EN: 'CuSO₄ Electrolysis & Faraday\'s Law Quantitative Problem'
            },
            statement: {
                VN: 'Điện phân $200\\text{ mL}$ dung dịch $\\text{CuSO}_4 \\text{ 1M}$ với điện cực trơ bằng dòng điện không đổi $I = 5\\text{A}$ trong thời gian $t = 1930\\text{ giây}$. Tính khối lượng đồng kim loại bám trên catot ($m_{\\text{Cu}}$) và thể tích khí thoát ra ở anot ($V_{\\text{O}_2}$ ở $25^\\circ\\text{C}, 1\\text{ bar}$, $V_m = 24,79\\text{ L/mol}$).',
                EN: 'Electrolyze $200\\text{ mL}$ of $1\\text{M CuSO}_4$ using inert electrodes at constant current $I = 5\\text{A}$ for $t = 1930\\text{ seconds}$. Calculate the mass of copper deposited at the cathode and the volume of oxygen evolved at the anode ($25^\\circ\\text{C}, 1\\text{ bar}$, $V_m = 24.79\\text{ L/mol}$).'
            },
            steps: [
                {
                    VN: 'Bước 1: Tính số mol electron trao đổi theo Định luật Faraday: $n_e = \\frac{I \\cdot t}{F} = \\frac{5 \\times 1930}{96500} = \\frac{9650}{96500} = 0,1\\text{ mol}$.',
                    EN: 'Step 1: Calculate moles of transferred electrons using Faraday\'s Law: $n_e = \\frac{I \\cdot t}{F} = \\frac{5 \\times 1930}{96500} = 0.1\\text{ mol}$.'
                },
                {
                    VN: 'Bước 2: Quá trình tại Catot (-): $\\text{Cu}^{2+} + 2e \\rightarrow \\text{Cu}$. Số mol ban đầu $n_{\\text{Cu}^{2+}} = 0,2 \\times 1 = 0,2\\text{ mol}$. Do $n_e = 0,1\\text{ mol}$ nên $\\text{Cu}^{2+}$ chưa bị điện phân hết! $n_{\\text{Cu}} = \\frac{n_e}{2} = 0,05\\text{ mol}$.',
                    EN: 'Step 2: Cathode reaction: $\\text{Cu}^{2+} + 2e \\rightarrow \\text{Cu}$. Initial $\\text{Cu}^{2+} = 0.2\\text{ mol}$. Since $n_e = 0.1\\text{ mol}$, $\\text{Cu}^{2+}$ is in excess. $n_{\\text{Cu}} = 0.1 / 2 = 0.05\\text{ mol}$.'
                },
                {
                    VN: 'Bước 3: Tính khối lượng Cu bám vào catot: $m_{\\text{Cu}} = 0,05 \\times 64 = 3,2\\text{ g}$.',
                    EN: 'Step 3: Copper mass: $m_{\\text{Cu}} = 0.05 \\times 64 = 3.2\\text{ g}$.'
                },
                {
                    VN: 'Bước 4: Quá trình tại Anot trơ (+): $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2\\uparrow + 4\\text{H}^+ + 4e$. Số mol khí oxi: $n_{\\text{O}_2} = \\frac{n_e}{4} = \\frac{0,1}{4} = 0,025\\text{ mol}$.',
                    EN: 'Step 4: Anode reaction: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2 + 4\\text{H}^+ + 4e$. Oxygen moles: $n_{\\text{O}_2} = 0.1 / 4 = 0.025\\text{ mol}$.'
                },
                {
                    VN: 'Bước 5: Tính thể tích $\\text{O}_2$ (chuẩn GDPT 2018): $V_{\\text{O}_2} = 0,025 \\times 24,79 = 0,61975\\text{ L} \\approx 620\\text{ mL}$.',
                    EN: 'Step 5: Oxygen volume: $V_{\\text{O}_2} = 0.025 \\times 24.79 = 0.61975\\text{ L} \\approx 620\\text{ mL}$.'
                }
            ],
            finalAnswer: {
                VN: 'Khối lượng Cu bám ở catot là 3,2 gam; thể tích khí O₂ thoát ra ở anot là 0,61975 lít.',
                EN: 'Deposited Cu mass = 3.2 g; evolved O₂ volume = 0.61975 L.'
            }
        },
        videoLectures: [
            {
                title: { VN: '[HÓA 12] BÀI 15: THẾ ĐIỆN CỰC VÀ NGUỒN ĐIỆN HÓA HỌC', EN: '[CHEM 12] LESSON 15: ELECTRODE POTENTIALS AND GALVANIC CELLS' },
                url: 'http://www.youtube.com/watch?v=xlBNFQkz3_E',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Bản chất thế điện cực chuẩn E°, cơ chế hoạt động của pin Galvani và bài toán tính suất điện động pin.',
                    EN: 'Standard reduction potentials, Galvanic cell operation, and cell potential calculations.'
                }
            },
            {
                title: { VN: '[HÓA 12] BÀI 16: ĐIỆN PHÂN', EN: '[CHEM 12] LESSON 16: ELECTROLYSIS' },
                url: 'http://www.youtube.com/watch?v=HqjDIseuzFY',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Thứ tự điện phân ở catot và anot, công thức Faraday và phương pháp giải đồ thị điện phân.',
                    EN: 'Cathode/anode reduction priorities, Faraday\'s equation, and graphical electrolytic analysis.'
                }
            },
            {
                title: { VN: '[HÓA 12] BÀI 27: ĐẠI CƯƠNG VỀ KIM LOẠI CHUYỂN TIẾP DÃY THỨ NHẤT', EN: '[CHEM 12] LESSON 27: FIRST-ROW TRANSITION METALS' },
                url: 'http://www.youtube.com/watch?v=ITvyekImifI',
                channel: 'Học Hóa Đến Chết',
                description: {
                    VN: 'Cấu hình electron phân lớp d, các số oxi hóa đặc trưng và màu sắc ion kim loại chuyển tiếp.',
                    EN: 'd-subshell configurations, oxidation states, and vivid transition metal ion colors.'
                }
            }
        ],
        labPreset: {
            reagents: [
                { id: 'IRON', dose: 25 },
                { id: 'CuSO4', dose: 35 }
            ],
            temperature: 25,
            label: {
                VN: 'NẠP THÍ NGHIỆM ĐỒNG TẠO LỚP BÁM TRÊN SẮT (Fe + CuSO₄)',
                EN: 'SIMULATE REDOX DISPLACEMENT IN LAB (Fe + CuSO₄)'
            }
        },
        quiz: [
            {
                id: 'q_electro_1',
                question: {
                    VN: 'Trong quá trình điện phân dung dịch CuCl₂ với điện cực trơ, tại catot (-) xảy ra quá trình nào sau đây?',
                    EN: 'During the electrolysis of aqueous CuCl₂ with inert electrodes, what process occurs at the cathode (-)?'
                },
                options: [
                    { VN: 'Sự oxi hóa ion Cu²⁺', EN: 'Oxidation of Cu²⁺' },
                    { VN: 'Sự khử ion Cu²⁺', EN: 'Reduction of Cu²⁺' },
                    { VN: 'Sự oxi hóa ion Cl⁻', EN: 'Oxidation of Cl⁻' },
                    { VN: 'Sự khử ion Cl⁻', EN: 'Reduction of Cl⁻' }
                ],
                correctIndex: 1,
                explanation: {
                    VN: 'Catot luôn luôn là nơi xảy ra SỰ KHỬ ("Catot = Khử"). Tại catot âm (-), ion dương Cu²⁺ nhận electron để bị khử thành Cu kim loại: Cu²⁺ + 2e → Cu.',
                    EN: 'Reduction always occurs at the cathode. At the negative cathode, Cu²⁺ accepts 2 electrons to be reduced to metallic Cu: Cu²⁺ + 2e → Cu.'
                }
            }
        ]
    }
];
