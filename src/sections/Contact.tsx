import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, Send } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { SplitText } from "../components/SplitText";

function GithubIcon({size=16}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-2.1c-3.11.68-3.77-1.33-3.77-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.29-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.27-5.13 5.56.4.34.76 1.02.76 2.06v3.05c0 .3.21.65.78.54 4.43-1.48 7.63-5.67 7.63-10.61C23.23 5.46 18.27.5 12 .5Z"/></svg>;
}
function LinkedinIcon({size=16}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"/></svg>;
}

export function Contact() {
  const [sending,setSending] = useState(false);
  const [sent,setSent] = useState(false);
  const [data,setData] = useState({id:"",msg:""});
  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    setSending(true);
    setTimeout(()=>{ setSending(false); setSent(true); setData({id:"",msg:""}); setTimeout(()=>setSent(false),4000); }, 1200);
  };
  return (
    <section id="contact" className="relative py-28 md:py-44 section overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" style={{width:700,height:700,left:"50%",top:"-12%",transform:"translateX(-50%)",background:"var(--blob-1)"}}/>
        <div className="aurora" style={{width:520,height:520,right:"-8%",bottom:"-10%",background:"var(--blob-2)"}}/>
        <div className="noise"/>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-6 justify-center"><span className="section-tag">05 // TRANSMIT</span></div>
        <SplitText as="h2" className="headline text-center text-4xl md:text-6xl neon-c mb-6" text="Open channel."/>
        <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}
          className="text-center text-[var(--ink-dim)] mono text-[13px] max-w-xl mx-auto mb-10">
          Send a signal across the wire. Encrypted end-to-end. Replies within 24h cycle.
        </motion.p>

        <form onSubmit={onSubmit} className="hud magenta p-6 md:p-8 mono">
          <span className="corner-tr"/><span className="corner-bl"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="IDENTIFIER" placeholder="email / callsign" value={data.id} onChange={v=>setData(d=>({...d,id:v}))}/>
            <Field label="NODE" placeholder="location / node" value="" onChange={()=>{}} disabled/>
          </div>
          <Field label="PAYLOAD" textarea placeholder="// your transmission" value={data.msg} onChange={v=>setData(d=>({...d,msg:v}))}/>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-3 tech text-[10px] tracking-[.3em] uppercase text-[var(--ink-mute)]">
              <span className="w-2 h-2 rounded-full bg-[var(--green)] blink" style={{boxShadow:"0 0 10px var(--green)"}}/> CHANNEL SECURE
            </div>
            <MagneticButton type="submit" as="button" className="btn-hud magenta">
              {sending ? "TRANSMITTING…" : sent ? "SIGNAL RECEIVED ✓" : (<>TRANSMIT <Send size={13}/></>)}
            </MagneticButton>
          </div>
        </form>

        <div className="mt-12 grid md:grid-cols-3 gap-3">
          <LinkCard href="mailto:hammabdullah@gmail.com" icon={<Mail size={14}/>} label="EMAIL" val="hammabdullah@gmail.com"/>
          <LinkCard href="https://linkedin.com/in/hammad-safi" icon={<LinkedinIcon/>} label="IN.LINK" val="/in/hammad-safi"/>
          <LinkCard href="https://github.com/HammadBullah" icon={<GithubIcon/>} label="REPO" val="@HammadBullah"/>
        </div>

        <footer className="mt-20 flex flex-wrap justify-between items-center gap-4 text-[11px] tracking-[.3em] uppercase tech text-[var(--ink-mute)] border-t border-[rgba(0,240,255,.2)] pt-6">
          <span>© {new Date().getFullYear()} H_SAFI // ALL SIGNALS RESERVED</span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-[var(--cyan)] transition">
            JUMP TO ORIGIN <ArrowUp size={12}/>
          </a>
        </footer>
      </div>
    </section>
  );
}

function Field({label, placeholder, value, onChange, textarea, disabled}:{label:string;placeholder:string;value:string;onChange:(v:string)=>void;textarea?:boolean;disabled?:boolean}){
  return (
    <label className="block">
      <div className="tech text-[10px] tracking-[.3em] uppercase text-[var(--ink-mute)] mb-1">{label}</div>
      {textarea ? (
        <textarea required rows={4} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
          className="w-full bg-[rgba(0,240,255,.05)] border border-[rgba(255,43,214,.3)] rounded-none px-3 py-2 mono text-[13px] outline-none focus:border-[var(--magenta)] focus:shadow-[var(--glow-m)] placeholder:text-[var(--ink-mute)] text-[var(--ink)]" style={{clipPath:"polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)"}}/>
      ):(
        <input required value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
          className="w-full bg-[rgba(0,240,255,.05)] border border-[rgba(255,43,214,.3)] rounded-none px-3 py-2 mono text-[13px] outline-none focus:border-[var(--magenta)] focus:shadow-[var(--glow-m)] placeholder:text-[var(--ink-mute)] text-[var(--ink)]" style={{clipPath:"polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)"}}/>
      )}
    </label>
  );
}

function LinkCard({href,icon,label,val}:{href:string;icon:React.ReactNode;label:string;val:string}){
  return (
    <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" data-cursor="link"
      className="hud p-4 flex items-center gap-3 mono hover:border-[var(--cyan)] transition group"
       style={{borderColor:"rgba(0,240,255,.25)"}}>
      <span className="w-9 h-9 border border-[var(--cyan)] grid place-items-center text-[var(--cyan)]" style={{boxShadow:"var(--glow-c)", clipPath:"polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)"}}>{icon}</span>
      <div className="min-w-0">
        <div className="text-[10px] tracking-[.3em] uppercase text-[var(--ink-mute)]">{label}</div>
        <div className="truncate neon-c group-hover:neon-c">{val}</div>
      </div>
    </a>
  );
}
