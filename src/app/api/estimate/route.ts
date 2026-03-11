import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `あなたは年収の専門アナリストです。以下のユーザー情報から「適正年収」を推定してください。

## ルール
- 労働収入のみで判断（投資収入・不労所得は無関係）
- 項目が「その他」の場合、その項目は平均的な条件として計算する
- 最新の市場データ・統計に基づいた現実的な推定を行う
- 通貨は入力に合わせる（JPYならJPY、USDならUSD）
- 必ず以下のJSON形式のみで回答する（それ以外のテキストは一切不要）

## 出力JSON
{
  "estimatedSalary": 8500000,
  "currency": "JPY",
  "deviationValue": 62,
  "rankings": {
    "global": { "percentile": 97, "rank": "S" },
    "domestic": { "percentile": 75, "rank": "B" },
    "industry": { "percentile": 60, "rank": "C" }
  },
  "comment": "関西弁で200文字の総評。具体的アドバイス付き",
  "reaction": "underpaid"
}

## ランク基準
- S: 上位5%以内 (percentile 95以上)
- A: 上位5〜15% (percentile 85〜94)
- B: 上位15〜40% (percentile 60〜84)
- C: 上位40〜70% (percentile 30〜59)
- D: 下位30% (percentile 29以下)

## reaction の基準
- "underpaid": 適正年収が現在年収より20%以上高い
- "fair": 差が±20%以内
- "overpaid": 現在年収が適正年収より20%以上高い

JSONのみ出力。マークダウンのコードブロック記法は使わない。`;

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    const userMessage = `以下の人物の適正年収を推定してください:

- 勤務国: ${answers.country}
- 業種: ${answers.industry}
- 職種: ${answers.role}
- 経験年数: ${answers.experience}
- 企業タイプ: ${answers.companyType}
- 資格・学歴: ${answers.qualification}
- 転職回数: ${answers.jobChanges}
- 特殊スキル・実績: ${answers.specialSkills || "特になし"}
- 現在の年収（税込）: ${answers.currentSalary.toLocaleString()} ${answers.currency}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    let text =
      message.content[0].type === "text" ? message.content[0].text : "";
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Estimate API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "年収推定に失敗しました", detail: message },
      { status: 500 }
    );
  }
}
