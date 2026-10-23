/**
 * Utilitário opcional de integração com a Gemini Interactions API (v2)
 * Atualizado a partir do geminiService.ts original do repositório alef.dev
 * seguindo os padrões atuais do SDK @google/genai (modelo gemini-3.8-flash).
 *
 * Nota: Não é invocado automaticamente no carregamento do portfólio para
 * preservar a performance estática e não exigir chave de API no navegador.
 */

export interface GeminiInteractionResponse {
  output_text: string | null;
}

export async function askPortfolioAssistant(prompt: string, apiKey?: string): Promise<string> {
  const key = apiKey || (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GEMINI_API_KEY;
  if (!key) {
    throw new Error("Configure VITE_GEMINI_API_KEY antes de utilizar o assistente Gemini.");
  }

  // Endpoint Interactions API com o modelo atual gemini-3.8-flash
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify({
      model: "gemini-3.8-flash",
      input: prompt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na chamada Gemini (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as GeminiInteractionResponse;
  return data.output_text ?? "";
}
