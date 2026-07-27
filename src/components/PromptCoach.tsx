import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, HelpCircle, Wand2 } from "lucide-react";

type Step = "idle" | "classify" | "questions" | "reconstruct" | "response";

interface Q { q: string; missing: string; }

const DIMENSIONS = [
  { key: "role",       label: "Role / persona",     detect: /you are|act as|role/i },
  { key: "task",       label: "Task / goal",        detect: /\b(write|create|build|generate|explain|summariz|analyz|design|code|fix)\b/i },
  { key: "context",    label: "Context",            detect: /context|background|currently|i('?| a)m working|project|situated/i },
  { key: "format",     label: "Output format",      detect: /json|markdown|bullet|table|list|paragraph|code|email|essay/i },
  { key: "audience",   label: "Audience",           detect: /for (a |the )?(developer|beginner|child|client|user|manager|team|ceo|designer)|audience/i },
  { key: "tone",       label: "Tone / style",       detect: /tone|formal|casual|friendly|concise|witty|professional/i },
  { key: "constraints",label: "Constraints",        detect: /under|less than|max|avoid|don['’]t|only|must|without/i },
  { key: "examples",   label: "Examples",           detect: /example|e\.g\.|for instance|like/i },
];

const QUESTIONS: Record<string, string> = {
  role: "What persona should the AI adopt (e.g. senior React engineer)?",
  task: "What is the exact outcome you want (one verb, one noun)?",
  context: "What background or project context should the AI know about?",
  format: "How should the response be formatted (markdown, JSON, bullets…)?",
  audience: "Who is the response for (beginners, your manager, a client)?",
  tone: "What tone should it use (concise, formal, playful)?",
  constraints: "Any constraints (length, style, things to avoid)?",
  examples: "Can you give a short example of the style or structure you want?",
};

export function PromptCoach() {
  const [prompt, setPrompt] = useState("Write a marketing email for our new app.");
  const [step, setStep] = useState<Step>("idle");
  const [missing, setMissing] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [improved, setImproved] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [typing, setTyping] = useState(false);

  const run = async () => {
    setStep("classify"); setImproved(""); setResponse("");
    await wait(600);
    const missingDims = DIMENSIONS.filter(d => !d.detect.test(prompt)).map(d => d.key);
    setMissing(missingDims);
    setAnswers({});
    setStep("questions");
  };

  const submitAnswers = async () => {
    setStep("reconstruct");
    await wait(800);
    // reconstruct
    const role = answers.role || "an expert assistant";
    const task = prompt.trim().replace(/\.$/,"");
    const fmt = answers.format || "clear, structured prose";
    const aud = answers.audience ? `for ${answers.audience}` : "";
    const tone = answers.tone || "concise, professional";
    const ctx = answers.context ? `Context: ${answers.context}. ` : "";
    const cons = answers.constraints ? `Constraints: ${answers.constraints}. ` : "";
    const ex = answers.examples ? `Example style: ${answers.examples}. ` : "";
    const newPrompt = `You are ${role}. ${ctx}${task} ${aud}. Respond in ${fmt}. Use a ${tone} tone. ${cons}${ex}Think step by step and produce a high-quality result.`;
    setImproved(newPrompt);
    await wait(900);
    setStep("response");
    // Simulated typed response
    const resp = `Here's a thoughtful, structured take on "${prompt.trim().replace(/\.$/,"")}":\n\n• Opening: frame the problem with the audience in mind.\n• Body: three concrete, evidence-backed points — no fluff.\n• Close: a clear next action and a question back to the user.\n\nWant me to tailor this further? Just say the word.`;
    setTyping(true);
    for (let i = 0; i <= resp.length; i += 3) {
      setResponse(resp.slice(0, i));
      await wait(12);
    }
    setTyping(false);
  };

  const reset = () => { setStep("idle"); setMissing([]); setAnswers({}); setImproved(""); setResponse(""); };

  return (
    <div className="w-full max-w-2xl rounded-2xl border hairline bg-elev/80 backdrop-blur-xl overflow-hidden" style={{boxShadow:"var(--shadow-md)"}}>
      {/* header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b hairline">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] mono text-mute">prompt-coach.ai — interactive demo</span>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        <label className="block text-[11px] tracking-widest uppercase text-mute mono">Your prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={step !== "idle"}
          rows={2}
          className="w-full resize-none rounded-lg border hairline bg-soft p-3 text-[14px] leading-relaxed outline-none focus:border-[color-mix(in_srgb,var(--accent)_50%,var(--hair))] transition-colors"
          placeholder="Write a prompt…"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={step === "idle" ? run : reset}
            className="btn-primary !px-4 !py-2 text-[12px] arrow-slide"
          >
            {step === "idle" ? (<><Sparkles size={14}/> Analyse prompt</>) : (<>Reset</>)}
          </button>
          <span className="text-[11px] mono text-mute">Demo only — runs in your browser.</span>
        </div>

        <AnimatePresence mode="popLayout">
          {step !== "idle" && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3 pt-2"
            >
              {step === "classify" && (
                <div className="flex items-center gap-2 text-soft text-[13px] mono">
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Wand2 size={14} />
                  </motion.span>
                  Classifying prompt…
                </div>
              )}

              {step === "questions" && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-3">
                  <div className="text-[12px] mono text-mute">Missing dimensions — fill any to improve the prompt:</div>
                  <div className="grid gap-2">
                    {missing.map((k) => (
                      <div key={k} className="flex items-center gap-2">
                        <HelpCircle size={14} className="text-[var(--accent)]" />
                        <label className="text-[12px] text-soft w-32 shrink-0">{DIMENSIONS.find(d=>d.key===k)?.label}</label>
                        <input
                          className="flex-1 rounded-md border hairline bg-soft px-3 py-1.5 text-[13px] outline-none focus:border-[color-mix(in_srgb,var(--accent)_50%,var(--hair))]"
                          placeholder={QUESTIONS[k]}
                          value={answers[k] || ""}
                          onChange={(e) => setAnswers(a => ({...a, [k]: e.target.value}))}
                        />
                      </div>
                    ))}
                  </div>
                  <button onClick={submitAnswers} className="btn-primary !px-4 !py-2 text-[12px] arrow-slide mt-2">
                    Reconstruct prompt <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {(step === "reconstruct" || step === "response") && improved && (
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="rounded-xl border hairline p-4 bg-soft">
                  <div className="flex items-center gap-2 text-[11px] mono uppercase tracking-widest text-[var(--green)] mb-2">
                    <CheckCircle2 size={13}/> Improved prompt
                  </div>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{improved}</p>
                </motion.div>
              )}

              {step === "response" && (
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="rounded-xl border hairline p-4 bg-soft">
                  <div className="flex items-center gap-2 text-[11px] mono uppercase tracking-widest text-[var(--accent)] mb-2">
                    <Sparkles size={13}/> AI response {typing && <span className="blinker inline-block" />}
                  </div>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{response}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function wait(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }
