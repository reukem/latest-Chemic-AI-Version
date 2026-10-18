// src/services/offlineLucyBrain.ts
import { CHEMICAL_REGISTRY, REACTION_RULES } from '../data/ChemicalRegistry';

export interface LiveLabSnapshot {
  activeVesselChemicals: string[]; // IDs of chemicals currently in the active beaker
  temperature: number;
  pressure: number;
  ph: number;
  lastReactionEquation?: string;
  lastReactionMessage?: string;
  language: 'EN' | 'VN';
}

function normalizeQuery(str: string): string {
  return str
    .toLowerCase()
    .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2').replace(/₃/g, '3')
    .replace(/₄/g, '4').replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
    .replace(/₈/g, '8').replace(/₉/g, '9')
    .trim();
}

export function generateOfflineLucyResponse(userInput: string, lab: LiveLabSnapshot): string {
  const q = normalizeQuery(userInput);
  const isVN = lab.language === 'VN' || /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(userInput);

  // 1. GREETINGS & SMALL TALK ("hello", "hi", "hey", "yo", "chào cô", "chào")
  if (/^(hello|hi|hey|yo|sup|greetings|good morning|good afternoon|good evening|chao|xin chao|em chao co|chao co|alo|helo)\b/i.test(q)) {
    const vesselCount = lab.activeVesselChemicals.length;
    if (vesselCount > 0) {
      const names = lab.activeVesselChemicals
        .map(id => CHEMICAL_REGISTRY[id]?.name[isVN ? 'VN' : 'EN'] || id)
        .join(' + ');
      return isVN
        ? `Chào em nha! :3 Hiện tại trong cốc thí nghiệm của em đang có **${names}** ở **${lab.temperature}°C** (pH ${lab.ph.toFixed(1)}). Em muốn cô hướng dẫn đun nóng lên hay nhỏ thêm thuốc thử gì vào để quan sát phản ứng tiếp theo nào? ^^`
        : `Hey there, Researcher! :3 Right now your active vessel contains **${names}** at **${lab.temperature}°C** (pH ${lab.ph.toFixed(1)}). Want me to predict what happens if we heat it up, or are we testing a new reagent combo? ^^`;
    }
    return isVN
      ? `Chào em đến với phòng thí nghiệm Chemic-AI nha! :3 Cô là **Giáo sư Lucy** (Prof. Lucy) đây! Dù đang ở chế độ Offline không cần Wi-Fi, cô vẫn nắm rõ toàn bộ hơn 90 hóa chất, 80+ cơ chế phản ứng, bài tập tính toán số mol và các bẫy lý thuyết THPT Quốc Gia để dạy cho em đó! Em thử hỏi cô về một chất (như *Na*, *AgNO3*, *Glucozơ*) hoặc thử làm **Phản ứng Mưa Vàng** xem sao nhé! ^^`
      : `Welcome to the Chemic-AI Quantum Lab! :3 I'm **Prof. Lucy**! Even in 100% Offline Mode, my local chemistry brain knows all 90+ reagents, 80+ reaction mechanisms, stoichiometry calculations, and lab safety protocols! Ask me about any chemical (like *Sodium*, *Tollens*, *Aqua Regia*), ask *"what should I mix?"*, or type *"what is in my beaker?"*! ^^`;
  }

  // 2. CONFUSION / FOLLOW-UP / "WHAT" ("what", "huh", "why", "explain", "cái gì", "sao thế cô")
  if (/^(what|huh|wdym|why|explain|how|what happened|what is happening|whats happening|cai gi|la sao|tai sao|giai thich|sao vay|sao the co|co oi)\??$/i.test(q) || q.includes('what is in my') || q.includes('in the beaker')) {
    if (lab.lastReactionEquation) {
      return isVN
        ? `À, để cô giải thích kỹ hơn cho em hiểu bản chất nha! :3 Vừa rồi trong cốc của em đã xảy ra phản ứng:\n**${lab.lastReactionEquation}**\n\n💡 **Hiện tượng & Cơ chế:** ${lab.lastReactionMessage || 'Các phân tử tham gia phản ứng đã đạt trạng thái cân bằng.'}\nNhiệt độ dung dịch hiện tại là **${lab.temperature}°C** và độ pH là **${lab.ph.toFixed(1)}**. Em muốn cô phân tích sâu hơn về sự trao đổi ion hay số oxi hóa của phản ứng này không? ^^`
        : `Let me break down what just happened in your vessel! :3\n\n🧪 **Reaction Equation:** \`${lab.lastReactionEquation}\`\n💡 **Mechanism:** ${lab.lastReactionMessage || 'Reactant molecules reached kinetic equilibrium.'}\n\nYour vessel is currently at **${lab.temperature}°C** with **pH ${lab.ph.toFixed(1)}**. Try asking me about any product formed, or click **Rinse** above the beaker to start a fresh trial! ^^`;
    }
    if (lab.activeVesselChemicals.length > 0) {
      const chems = lab.activeVesselChemicals.map(id => CHEMICAL_REGISTRY[id]).filter(Boolean);
      const listStr = chems.map(c => `• **${c.name[isVN ? 'VN' : 'EN']}** (${c.formula}) — pH ${c.ph}`).join('\n');
      return isVN
        ? `Để cô kiểm tra cốc thí nghiệm cho em nhé! Hiện tại trong cốc đang có:\n${listStr}\n\nChưa có phản ứng hóa học mới nào xảy ra giữa các chất này ở **${lab.temperature}°C**. 💡 *Gợi ý của cô:* Em thử nhỏ thêm một axit, bazơ, hoặc kéo thanh nhiệt độ lên **≥ 60°C** xem có vượt qua rào năng lượng hoạt hóa ($E_a$) không nha! :3`
        : `Here is what's currently inside your active beaker at **${lab.temperature}°C**:\n${listStr}\n\nNo new reaction has triggered yet! 💡 *Tip:* Try adding a reactive partner (like **NaOH**, **HCl**, **AgNO3**, or **KI**), or raise the temperature slider above **60°C** if you're running a heated test like Fehling's or Tollens'! :3`;
    }
    return isVN
      ? `Hiện tại cốc thí nghiệm của em đang **trống trơn** đó! 3: Để bắt đầu, em hãy chọn một hóa chất ở bảng **Chemical Reagents Codex** bên trái và bấm nút **[+]** (ví dụ: thêm *Pb(NO₃)₂* rồi thêm *KI* để cô trò mình quan sát **Mưa Vàng PbI₂** lấp lánh nha!). Hoặc em cứ hỏi cô bất kỳ câu hỏi Hóa học nào nhé! :3`
      : `Your beaker is currently **empty**! 3: To start an experiment, pick a reagent from the **Chemical Reagents Codex** on the left panel and click **[+]** to pour it in (for example, mix **Pb(NO₃)₂** + **KI** to crystallize shimmering **Golden Rain PbI₂**!). Or ask me any chemistry question right here! :3`;
  }

  // 3. IDENTITY / WHO ARE YOU
  if (q.includes('who are you') || q.includes('your name') || q.includes('co la ai') || q.includes('ban la ai') || q.includes('ten gi')) {
    return isVN
      ? `Cô là **Giáo sư Lucy** (Prof. Lucy) — giảng viên AI Hóa học chuyên sâu của em trong Chemic-AI! 🦊🧪 Cô có thể hoạt động 100% Offline để giảng giải cơ chế phản ứng, cân bằng phương trình, phân tích trạng thái cốc thí nghiệm theo thời gian thực và ôn luyện Hóa 10-11-12 cùng em nha! :3`
      : `I'm **Prof. Lucy**, your dedicated AI Chemistry Instructor and Lab Partner inside Chemic-AI! 🦊🧪 My hybrid neural-symbolic engine runs both online and 100% offline—tracking your beaker's thermodynamics, explaining reaction mechanisms, and guiding you through analytical chemistry! :3`;
  }

  // 4. RECOMMENDATIONS / "WHAT SHOULD I MIX" / COOL EXPERIMENTS
  if (q.includes('recommend') || q.includes('suggest') || q.includes('cool') || q.includes('what should i') || q.includes('experiment') || q.includes('thi nghiem') || q.includes('pha gi')) {
    return isVN
      ? `Cô gợi ý cho em **5 Thí Nghiệm Đỉnh Nhất** em có thể thực hành ngay trong phòng lab nè :3\n1. 🌟 **Mưa Vàng (Golden Rain):** Trộn \`Pb(NO₃)₂\` + \`KI\` → Tinh thể vàng kim \`PbI₂ ↓\` lấp lánh rơi xuống!\n2. 🪞 **Phản Ứng Tráng Gương (Silver Mirror):** Trộn \`Glucozơ\` (hoặc \`Andehit Axetic\`) + \`Thuốc thử Tollens\` → Lớp bạc \`Ag\` phủ sáng bóng thành bình!\n3. 🧱 **Thử Nghiệm Fehling Nhiệt Độ:** Trộn \`Glucozơ\` + \`Cu(OH)₂\` ở 25°C ra phức **Xanh Thẫm**, sau đó em kéo thanh nhiệt độ lên **≥ 60°C** lập tức chuyển sang kết tủa **Đỏ Gạch Cu₂O**!\n4. 🌋 **Quái Vật Đường (Sugar Monster):** Cho \`Saccarozơ\` + \`H₂SO₄ đặc\` → Cột than đen \`C\` trào ngược bốc khói!\n5. 🔥 **Phản Ứng Nhiệt Nhôm 2500°C:** Trộn \`Nhôm (Al)\` + \`Fe₂O₃\` → Nổ chói lòa tạo sắt nóng chảy!`
      : `Here are **5 Must-Try Signature Experiments** you can run right now :3\n1. 🌟 **Golden Rain:** Mix \`Pb(NO₃)₂\` + \`KI\` → Shimmering hexagonal golden \`PbI₂ ↓\` flakes!\n2. 🪞 **Tollens Silver Mirror:** Mix \`Glucose\` + \`Tollens Reagent\` → Deposits a metallic \`Ag\` mirror on the glass!\n3. 🧱 **Temperature-Dependent Fehling Test:** Mix \`Glucose\` + \`Cu(OH)₂\` at 25°C for a **Deep Sapphire Complex**, then slide Temperature **≥ 60°C** to precipitate **Brick-Red Cu₂O**!\n4. 🌋 **Carbon Sugar Monster:** Mix \`Sucrose\` + \`Conc. H₂SO₄\` → Dehydrates into a rising black carbon column!\n5. 👑 **Royal Aqua Regia:** Dissolve pure 24K \`Gold (Au)\` in \`Aqua Regia\` → Golden \`HAuCl₄\` + brown \`NO₂\` fumes!`;
  }

  // 5. CHECK IF USER MENTIONS ANY REACTION PAIR OR SINGLE CHEMICAL IN REGISTRY
  const matchedChemicals = Object.values(CHEMICAL_REGISTRY).filter(chem => {
    const en = normalizeQuery(chem.name.EN);
    const vn = normalizeQuery(chem.name.VN);
    const formula = normalizeQuery(chem.formula.replace(/[↑↓(aq)(s)(l)(g)]/g, ''));
    const id = chem.id.toLowerCase();
    return (
      q.includes(id) ||
      (formula.length >= 2 && q.includes(formula)) ||
      q.includes(en.split(' (')[0].toLowerCase()) ||
      q.includes(vn.split(' (')[0].toLowerCase())
    );
  });

  if (matchedChemicals.length >= 2) {
    const c1 = matchedChemicals[0];
    const c2 = matchedChemicals[1];
    const rule = REACTION_RULES.find(
      r =>
        (r.reactants[0] === c1.id && r.reactants[1] === c2.id) ||
        (r.reactants[0] === c2.id && r.reactants[1] === c1.id)
    );
    if (rule) {
      return isVN
        ? `🧪 **Cô phân tích phản ứng giữa ${c1.name.VN} & ${c2.name.VN} cho em nhé:**\n• **Phương trình:** \`${rule.equation?.VN || `${c1.formula} + ${c2.formula} → ${rule.product}`}\`\n• **Phân loại:** ${rule.reactionType?.VN || 'Phản ứng trao đổi ion'}\n• **Cơ chế chuyên sâu:** ${rule.mechanism?.VN || rule.message.VN}\n• **Biến thiên nhiệt:** +${rule.temperatureSpike || 0}°C${rule.minTemperature ? ` (Lưu ý: Em cần đun nóng ≥ ${rule.minTemperature}°C nhé!)` : ''}`
        : `🧪 **Reaction Analysis: ${c1.name.EN} + ${c2.name.EN}**\n• **Equation:** \`${rule.equation?.EN || `${c1.formula} + ${c2.formula} → ${rule.product}`}\`\n• **Classification:** ${rule.reactionType?.EN || 'Ion Exchange Reaction'}\n• **Mechanism:** ${rule.mechanism?.EN || rule.message.EN}\n• **Thermal Spike:** +${rule.temperatureSpike || 0}°C${rule.minTemperature ? ` (Requires Heating ≥ ${rule.minTemperature}°C)` : ''}`;
    } else {
      return isVN
        ? `Khi em trộn **${c1.name.VN}** (${c1.formula}) và **${c2.name.VN}** (${c2.formula}) ở điều kiện thường, không có phản ứng trao đổi hay oxi hóa - khử mạnh nào xảy ra đâu nha, vì không tạo thành chất kết tủa, chất khí hay chất điện ly yếu mới! :3`
        : `Mixing **${c1.name.EN}** (${c1.formula}) and **${c2.name.EN}** (${c2.formula}) under standard conditions produces a physical mixture without a net chemical driving force (no insoluble precipitate, gas evolution, or weak electrolyte formation). :3`;
    }
  }

  if (matchedChemicals.length === 1) {
    const c = matchedChemicals[0];
    const relatedRules = REACTION_RULES.filter(r => r.reactants.includes(c.id)).slice(0, 3);
    const reactionsText = relatedRules.length
      ? relatedRules.map(r => `• \`${(r.equation as any)?.[isVN ? 'VN' : 'EN'] || r.product}\``).join('\n')
      : isVN ? '• Chất này tương đối bền hoặc đóng vai trò sản phẩm/dung môi.' : '• Chemically stable solvent or terminal reaction product.';

    return isVN
      ? `📘 **Hồ Sơ Hóa Chất Cô Tổng Hợp Cho Em: ${c.name.VN}** (\`${c.formula}\`)\n• **Phân loại:** ${c.category.toUpperCase()} | **pH:** ${c.ph} | **Khối lượng mol:** ${c.molarMass ? c.molarMass + ' g/mol' : 'N/A'}\n• **Đặc tính:** ${c.description.VN}\n\n⚡ **Các phản ứng tiêu biểu em nên thử:**\n${reactionsText}`
      : `📘 **Chemical Dossier: ${c.name.EN}** (\`${c.formula}\`)\n• **Category:** ${c.category.toUpperCase()} | **pH:** ${c.ph} | **Molar Mass:** ${c.molarMass ? c.molarMass + ' g/mol' : 'N/A'}\n• **Properties:** ${c.description.EN}\n\n⚡ **Signature Lab Reactions:**\n${reactionsText}`;
  }

  // 6. TOPIC KEYWORDS (Ester, Soap, Tollens, Redox, Equilibrium)
  if (q.includes('ester') || q.includes('este') || q.includes('soap') || q.includes('xa phong')) {
    return isVN
      ? `🌿 **Bài Giảng Chuyên Đề Este - Lipit & Xà Phòng Hóa Của Cô (Hóa 12):**\n• **Este hóa (Thuận nghịch):** \`CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O\` (xúc tác H₂SO₄ đặc, đun nóng).\n• **Xà phòng hóa (Một chiều):** Đun chất béo (\`TRIGLYCERIDE\`) với dung dịch kiềm (\`NaOH\` hoặc \`KOH\`) tạo **Glixerol** và **Muối Natri/Kali của axit béo (Xà phòng)**.\n💡 *Thực hành ngay:* Em hãy thêm \`TRIGLYCERIDE\` + \`NaOH\` vào cốc để tự tay tổng hợp xà phòng nhé! :3`
      : `🌿 **Esters, Lipids & Saponification Masterclass:**\n• **Fischer Esterification (Reversible):** \`CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O\` (catalyzed by conc. H₂SO₄).\n• **Saponification (Irreversible):** Alkaline hydrolysis of \`TRIGLYCERIDE\` with \`NaOH\` cleaves ester linkages to yield **Glycerol** and amphiphilic **Soap micelles** (\`C₁₇H₃₃COONa\`).\n💡 *Try it in Lab:* Mix \`TRIGLYCERIDE\` + \`NaOH\`! :3`;
  }

  // 7. SMART CONTEXTUAL FALLBACK (Cô - em)
  const suggestions = isVN
    ? [
        `Hmm, câu hỏi của em thú vị đó! :3 Em có thể nói rõ tên hóa chất hoặc công thức (như \`HCl\`, \`NaOH\`, \`CuSO4\`, \`Glucozơ\`, \`Phenol\`) để cô tra cứu phương trình và giảng giải cơ chế chi tiết ngay lập tức cho em nhé! ^^`,
        `Cô đang ở chế độ Offline thông minh nè! :3 Em thử gõ tên một chất bất kỳ (ví dụ: *"Natri"*, *"Thuốc thử Tollens"*, *"Nước cường toan"*) hoặc gõ *"thí nghiệm hay"* để cô gợi ý các phản ứng đẹp mắt nhất cho em thực hành nha!`,
        `Cốc thí nghiệm của em đang ở ${lab.temperature}°C với pH ${lab.ph.toFixed(1)} nè! Em muốn cô hướng dẫn làm phản ứng gì tiếp theo, hay em muốn giải một bài tập Hóa học? Cứ hỏi cô nhé! :3`
      ]
    : [
        `Ooh, tell me which specific reagent or reaction topic you want to explore! :3 Even offline, you can ask me about any formula (like \`H2SO4\`, \`AgNO3\`, \`KMnO4\`, \`Glucose\`, \`Phenol\`), ask *"what's in my beaker?"*, or ask *"suggest an experiment"*! ^^`,
        `I'm running on my local Offline Chemistry Brain right now! :3 Try asking me about **Golden Rain**, **Tollens Silver Mirror**, **Thermite**, **Saponification**, or name any 2 chemicals to see if they react!`,
        `Your beaker is currently at ${lab.temperature}°C with pH ${lab.ph.toFixed(1)}! What experiment would you like me to guide you through next? Feel free to ask! :3`
      ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
}
