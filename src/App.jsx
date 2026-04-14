import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const C = {
  green: "#00ff41", blue: "#00d4ff", purple: "#b14eff",
  orange: "#ff6b35", red: "#ff3366", teal: "#00ccaa",
  bg: "#0d1117", card: "#161b22", border: "#30363d",
  text: "#c9d1d9", dim: "#8b949e", white: "#f0f6fc",
};
const AVATAR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAGQAZADASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAvGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALlLb3l5a9uZzLVsJEAAAAAAAAAAAAAAAAAAAG0L1zmtIyqdDnsTNbm2nPeHP2UrlTGsgAAAAAAAAAAAAAAADWLRbCahp7cvmdffOdck9Y4vN9+E+Zv6nkamumF0jLfHUgWAAAAAAAAAAAAAAATvWc6pW3qm22Vc66p5eqWUiItBTm68z5y3p+TrO2WudlBrIAAAAAAAAAAAAADWvRLWl5l7+zlvL0Tz5mmjKXsmErPOlnRGWaaeH7HnrhWY1nMayAAAAAAAAAAAAAmN4vMZ51XXLuOvp5t14OLalz3001mqR2cMu+nNzWeplwdhTi9DhOItZlFq3IUAAAAAAAAAAABfals6jGcTr9ny/bOS/XGs809Vozteax4/Rzjk8r0spfP9zl7l5eLr5c64dMd9ZyprlYFgAAAAAAAAAACYsa0tlnVKpPX9Pwfds1mtrJQJQJQMubuqc1dqxy06cc78fo5trJx6MEqNQAAAAAAAAAABel4tlrjNQsLfQ/Ne/Z2WyvZdWSUSEAQKszLk0jnvyLUmzpy1yrMayAAAAAAAAAAAmBrnrTOldcynXy5n0mvh+pc9c43rRQXUFopUnBwQnzpztJZ0Z3zKDWQAAAAAAAAAAANITnV89KRTLTOp0yHqdnz97PoZ8PRPYjyoPUz8vA6+KLyrrLnaty+VqWBYAAAAAAAAAAALE3z1zqKqlKWggAAAAFtIuWi9IztVUDWQAAAAAAAAAAAL2zvmzMQsZzQiQhMAAACYsa6U1iM751SYlIGoAAAAAAAAAAAABNLxm0m0KrYViYAAAFqyb6Z3Iz0zIi1bkKAAAAAAAAAAAAAAACKrCi4ouKrCqwm+Y0pAtUoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//aAAwDAQACAAMAAAAhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNRBAAAAAAAAAAAAAAAAAAAAfh8Z4vYAAAAAAAAAAAAAAAAAT5o2NTWvoAAAAAAAAAAAAAAAE4ASaVA1egAAAAAAAAAAAAAAAJwy2OwuHogIAAAAAAAAAAAAAfLv43w++4xxDAAAAAAAAAAAAAgEUMuYhPcaFoAAAAAAAAAAAAVFYR4c4sgDENXAAAAAAAAAAAADkY4AcYMwsv3kAAAAAAAAAAAARhxMacUAsukEcAAAAAAAAAAAAAcLdM8fjFv9FpAAAAAAAAAAAABltw88888FfMAAAAAAAAAAAAA7Iwo1888o7Q/AAAAAAAAAAAAAQjUU8888919jAAAAAAAAAAAAAAAAzjzzDDjzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//EACUQAAICAQQCAwEAAwAAAAAAAAECAAMEEBESQDBQBRMgFBWAkP/aAAgBAQABAgL/AGn48PXBFr4cHUicePpxETly35FjFCrwepl9IAqsxbly5c4ICHDuhHo0RmZlWr4xPjP8f/BZ8dfhBw0VrB6KtWLnGxqaAPwRlfHOitGh9CoEY01VVjwZONZWpjehUNBXi/H/AM/FcxW/BhmfQhEb0FazbGTcaZVeMNN/v5mNL6xG76JGOPKYbHdc7likQx7FwTj/AF8/klWND3VUaM2NEFS1ZC2VytfoORWBNnDLmRY0PdUCO1YWqlml+FVik1IVu0sWhxbMuJDG7iAR2ZsYY6PUMj7/AKEo4Fcpc4tmVTIr3yZXDG7gjFjMVEm31BfxZWq2/GV4L22tYteh7awRixmCiweC6oP/AEl/r4GLDG7SaMdPj3SDwshq4lLXtlZaP2k0fXGZCPwf2ZcwFsqJj9pNGgGlFgO/gJZr3USuLG7SQzbaGYWSjg7/AK3Zne27Ky4kSN3BDodMbMS0MDvvvvyLO+RklgDEixu2sSNodar6c5bhZz58zYbMnLgADRdD21lcbRvytq5oz/7zntmtbFAEMEdu2ZUG0byKIoPeUamHyKFBh0btqpiwmE+MQRIYYS3bDb7wt5F0EMPe3m8APjTU6HvbzffbxDQRtG9EIZtx2247bbbbAhy+5P8Ayb//2gAMAwEAAgADAAAAENututututututututututututvnvnvnvnvnvnvnvnvnvnvnvnvtututututututututututututvnvnvnvnvnvnvnvnvnvnvnvnvtututututuuLCfNetututututvnvnvnvnvj1FcIx/8Ad75757577brbrbrbq7DuzZvDfnrbrbrbrb5757575qYFSG7+TD975757577brbrbraBzQQaMFYc/nbrbrbrb575757GctEy82xtTBb5757577brbrb4O3kifWdIDhh7brbrbrb57574xS6AgTzzDVYmX5757577brbrb00zQggCgSgrqHbrbrbrb57575wCTbfCihj/7Sv5757577brbrbrvtx6ixqcnQhDbrbrbrb57575wQjD67a7ZCNJ/5757577brbrb2njSa6675P3rrbrbrbrb575752MZBS7aaxTZ575757577brbrbrbqYn+g3v1nXrbrbrbrb5757575757575757575757577brbrbrbrbrbrbrbrbrbrbrbrb5757575757575757575757577brbrbrbrbrbrbrbrbrbrbrbrb5757575757575757575757577brbrbrbrbrbrbrbrbrbrbrbrb/8QAJxEAAgIBAwMEAgMAAAAAAAAAAQIAESEDEjEQMEETIEBRBCJgcHH/2gAIAQIBAT8A/lxIHM9T6g1PuAirEsfEZgISTk9bhEVyMGA3kfBY0Ll2bMfUC4HMLsfM3N9xXIisG4hE0z4+CxuHjE9AnIMKkYI6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";

// ── Floating Particles Background ─────────────────────
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    cam.position.z = 5;
    const ren = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(ren.domElement);

    const N = 200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00ff41, size: 0.025, transparent: true, opacity: 0.5 }));
    scene.add(pts);

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff41, transparent: true, opacity: 0.06 });

    let aId;
    const animate = () => {
      aId = requestAnimationFrame(animate);
      const p = geo.attributes.position.array;
      for (let i = 0; i < N * 3; i++) {
        p[i] += vel[i];
        if (Math.abs(p[i]) > 6) vel[i] *= -1;
      }
      geo.attributes.position.needsUpdate = true;
      ren.render(scene, cam);
    };
    animate();

    const onR = () => { cam.aspect = el.clientWidth / el.clientHeight; cam.updateProjectionMatrix(); ren.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(aId); window.removeEventListener("resize", onR); el.removeChild(ren.domElement); ren.dispose(); };
  }, []);
  return <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ── Contribution Graph (simulated) ────────────────────
function ContributionGraph() {
  const weeks = 52;
  const days = 7;
  const data = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.random())
  );
  const getColor = (v) => {
    if (v < 0.15) return "#161b22";
    if (v < 0.35) return "#0e4429";
    if (v < 0.55) return "#006d32";
    if (v < 0.75) return "#26a641";
    return "#39d353";
  };
  return (
    <div style={{ overflowX: "auto", padding: "4px 0" }}>
      <div style={{ display: "flex", gap: 3, minWidth: "fit-content" }}>
        {data.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {week.map((d, di) => (
              <div key={di} style={{
                width: 10, height: 10, borderRadius: 2,
                background: getColor(d),
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.target.style.outline = `1px solid ${C.green}`; e.target.style.transform = "scale(1.4)"; }}
                onMouseLeave={e => { e.target.style.outline = "none"; e.target.style.transform = "scale(1)"; }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Repo Card ─────────────────────────────────────────
function RepoCard({ repo }) {
  const [h, setH] = useState(false);
  const langColors = { Python: "#3572A5", Go: "#00ADD8", "Jupyter Notebook": "#DA5B0B", JavaScript: "#f1e05a", Shell: "#89e051" };
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{
        background: C.card, border: `1px solid ${h ? C.green + "60" : C.border}`, borderRadius: 8, padding: 20,
        transition: "all 0.3s", transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? `0 4px 20px ${C.green}15` : "none", height: "100%",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.dim}><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" /></svg>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 14, fontWeight: 600, color: C.blue }}>{repo.name}</span>
          <span style={{ marginLeft: "auto", padding: "2px 8px", border: `1px solid ${repo.visibility === "Live" ? "#ff0055" : C.border}`, borderRadius: 12, fontSize: 10, fontFamily: "monospace", color: repo.visibility === "Live" ? "#ff0055" : C.dim, background: repo.visibility === "Live" ? "#ff005515" : "transparent" }}>{repo.visibility === "Live" ? "🔴 LIVE" : repo.visibility}</span>
        </div>
        <p style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", fontSize: 12.5, color: C.dim, lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{repo.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {repo.lang && (
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: langColors[repo.lang] || C.dim }} />
              <span style={{ fontSize: 11, color: C.dim, fontFamily: "monospace" }}>{repo.lang}</span>
            </div>
          )}
          {repo.stars > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill={C.dim}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" /></svg>
              <span style={{ fontSize: 11, color: C.dim, fontFamily: "monospace" }}>{repo.stars}</span>
            </div>
          )}
          {repo.forks > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill={C.dim}><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 0-1.5 0v.878H6.75v-.878a2.25 2.25 0 1 0-1.5 0ZM7.25 8.75a.75.75 0 0 1 1.5 0v2.878a2.25 2.25 0 1 1-1.5 0Z" /></svg>
              <span style={{ fontSize: 11, color: C.dim, fontFamily: "monospace" }}>{repo.forks}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

// ── Stat Badge ────────────────────────────────────────
function StatBadge({ icon, label, value, color }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 18px", textAlign: "center", minWidth: 100 }}>
      <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, fontWeight: 900, color, textShadow: `0 0 10px ${color}40` }}>{value}</div>
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.dim, letterSpacing: 1.5, marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────
const REPOS = [
  { name: "RazzkrHacks-AI-Recon", desc: "AI-powered bug bounty recon platform with Claude AI, Nuclei, 12+ tools, blind XSS/SSRF monitoring, and AI-generated reports. Live on VPS.", lang: "JavaScript", stars: 0, forks: 0, visibility: "Live", url: "https://scan.razzkrhacks.com/" },
  { name: "ai-pentest-cli", desc: "LLM Prompt Injection Scanner — Test AI API endpoints for prompt injection vulnerabilities", lang: "Python", stars: 1, forks: 0, visibility: "Public", url: "https://github.com/Razzkr/ai-pentest-cli" },
  { name: "cve-exploit-engine", desc: "Automated CVE monitoring + exploit workflow generator built with n8n → Slack", lang: null, stars: 1, forks: 0, visibility: "Public", url: "https://github.com/Razzkr/cve-exploit-engine" },
  { name: "api-finder", desc: "Python-based API endpoint discovery tool for reconnaissance during penetration tests", lang: "Python", stars: 0, forks: 0, visibility: "Public", url: "https://github.com/Razzkr/api-finder" },
  { name: "Insurance_test_hackathon", desc: "Insurance application testing project — Created with CodeSandbox", lang: "JavaScript", stars: 0, forks: 0, visibility: "Public", url: "https://github.com/Razzkr/Insurance_test_hackathon" },
  { name: "aws-deeplens-recipes", desc: "Tutorials website for AWS DeepLens — Forked from aws-samples", lang: "Jupyter Notebook", stars: 0, forks: 0, visibility: "Public", url: "https://github.com/Razzkr/aws-deeplens-recipes" },
  { name: "httpx2bbrf", desc: "Simple tool to send the JSON output from HTTPX to BBRF — Forked from z0mb13s3c", lang: "Go", stars: 0, forks: 0, visibility: "Public", url: "https://github.com/Razzkr/httpx2bbrf" },
];

const PINNED_TOOLS = [
  { name: "Burp Suite", icon: "🔓" }, { name: "Metasploit", icon: "💀" }, { name: "BloodHound", icon: "🐶" },
  { name: "Nmap", icon: "📡" }, { name: "Nuclei", icon: "⚛️" }, { name: "OWASP ZAP", icon: "⚡" },
];

export default function GitHubPortfolio() {
  const [activeTab, setActiveTab] = useState("repositories");
  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "repositories", label: "Repositories", count: 16, icon: "📁" },
    { id: "stars", label: "Stars", count: 4, icon: "⭐" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Fira+Code:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:${C.bg}}
        ::selection{background:${C.green}30;color:${C.green}}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:#30363d}
        @media(max-width:768px){
          .profile-layout{flex-direction:column!important}
          .profile-sidebar{width:100%!important;max-width:100%!important}
          .repo-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      <ParticleField />

      {/* Top nav bar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(13,17,23,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 50, gap: 20 }}>
          <svg height="28" viewBox="0 0 16 16" fill={C.white}><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" /></svg>
          <a href="https://github.com/Razzkr" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Fira Code',monospace", fontSize: 14, fontWeight: 600, color: C.white, textDecoration: "none" }}>Razzkr</a>
          <div style={{ flex: 1 }} />
          <a href="https://razzkrhacks.com" target="_blank" rel="noopener noreferrer" style={{ padding: "5px 12px", background: C.green, color: "#000", borderRadius: 6, fontSize: 11, fontFamily: "'Orbitron',sans-serif", fontWeight: 700, textDecoration: "none", letterSpacing: 1 }}>PORTFOLIO</a>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 60px", position: "relative", zIndex: 2 }}>
        <div className="profile-layout" style={{ display: "flex", gap: 28 }}>

          {/* ── Sidebar ── */}
          <div className="profile-sidebar" style={{ width: 280, flexShrink: 0 }}>
            {/* Avatar */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", overflow: "hidden", border: `3px solid ${C.green}30`, boxShadow: `0 0 30px ${C.green}15` }}>
                <img src={AVATAR} alt="Razzkr" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: C.green, border: `3px solid ${C.bg}`, boxShadow: `0 0 8px ${C.green}80` }} />
            </div>

            {/* Name */}
            <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 22, fontWeight: 900, color: C.white, marginBottom: 2 }}>Raazkr</h1>
            <p style={{ fontFamily: "'Fira Code',monospace", fontSize: 16, color: C.dim, marginBottom: 12 }}>Razzkr</p>

            {/* Bio */}
            <p style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", fontSize: 14, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
              Offensive Security | Penetration Testing | AI Security Research
            </p>

            {/* Follow button */}
            <a href="https://github.com/Razzkr" target="_blank" rel="noopener noreferrer" style={{
              display: "block", textAlign: "center", padding: "8px 16px", background: "#238636", borderRadius: 6,
              color: "#fff", fontFamily: "-apple-system,sans-serif", fontSize: 13, fontWeight: 600, textDecoration: "none",
              marginBottom: 16, transition: "all 0.2s"
            }}
              onMouseEnter={e => e.target.style.background = "#2ea043"}
              onMouseLeave={e => e.target.style.background = "#238636"}>
              Follow on GitHub
            </a>

            {/* Stats */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, fontFamily: "monospace", fontSize: 12 }}>
              <span style={{ color: C.dim }}>👥</span>
              <span style={{ color: C.white, fontWeight: 600 }}>1</span>
              <span style={{ color: C.dim }}>follower</span>
              <span style={{ color: C.dim }}>·</span>
              <span style={{ color: C.white, fontWeight: 600 }}>2</span>
              <span style={{ color: C.dim }}>following</span>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              {[
                { icon: "🌐", text: "razzkrhacks.com", href: "https://razzkrhacks.com" },
                { icon: "🔗", text: "LinkedIn", href: "https://www.linkedin.com/in/raji-simon-8126a356/" },
                { icon: "✍️", text: "Medium @rajisimons", href: "https://medium.com/@rajisimons" },
              ].map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: C.dim, fontSize: 12, fontFamily: "monospace", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = C.green} onMouseLeave={e => e.target.style.color = C.dim}>
                  <span>{l.icon}</span> {l.text}
                </a>
              ))}
            </div>

            {/* Toolbox */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, color: C.white, letterSpacing: 2, marginBottom: 10 }}>TOOLBOX</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PINNED_TOOLS.map((t, i) => (
                  <span key={i} style={{ padding: "4px 8px", background: `${C.green}08`, border: `1px solid ${C.green}20`, borderRadius: 4, fontSize: 10, fontFamily: "monospace", color: C.green }}>
                    {t.icon} {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 16 }}>
              <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, color: C.white, letterSpacing: 2, marginBottom: 10 }}>ACHIEVEMENTS</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["🥉 3rd — Global Stangers CTF", "🏅 10th — RedFox CTF", "🇲🇾 43rd — HTB Malaysia", "🎓 Google Security Workshop"].map((a, i) => (
                  <span key={i} style={{ fontSize: 11, fontFamily: "monospace", color: C.dim }}>{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main Content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  background: "none", border: "none", padding: "10px 16px", cursor: "pointer",
                  fontFamily: "-apple-system,sans-serif", fontSize: 13, color: activeTab === tab.id ? C.white : C.dim,
                  borderBottom: activeTab === tab.id ? `2px solid ${C.green}` : "2px solid transparent",
                  display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
                }}>
                  <span>{tab.icon}</span> {tab.label}
                  {tab.count && <span style={{ padding: "0 6px", background: C.card, borderRadius: 10, fontSize: 11, color: C.dim }}>{tab.count}</span>}
                </button>
              ))}
            </div>

            {/* Stats Badges */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <StatBadge icon="📁" label="REPOS" value="16" color={C.green} />
              <StatBadge icon="⭐" label="STARS" value="4" color={C.orange} />
              <StatBadge icon="🏆" label="CERTS" value="7" color={C.blue} />
              <StatBadge icon="📝" label="ARTICLES" value="8" color={C.purple} />
              <StatBadge icon="🛡️" label="YRS EXP" value="12+" color={C.teal} />
            </div>

            {/* Contribution Graph */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "-apple-system,sans-serif", fontSize: 13, color: C.text }}>Contribution activity</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: C.green }}>🟢 Active</span>
              </div>
              <ContributionGraph />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 10, color: C.dim, fontFamily: "monospace" }}>Less</span>
                {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                ))}
                <span style={{ fontSize: 10, color: C.dim, fontFamily: "monospace" }}>More</span>
              </div>
            </div>

            {/* Pinned Repos */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "-apple-system,sans-serif", fontSize: 14, color: C.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                📌 Pinned repositories
              </h2>
              <div className="repo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {REPOS.slice(0, 6).map((r, i) => <RepoCard key={i} repo={r} />)}
              </div>
            </div>

            {/* Published Work */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
              <h2 style={{ fontFamily: "-apple-system,sans-serif", fontSize: 14, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                ✍️ Published Security Research
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { title: "AI-Powered Cybersecurity News Digest", pub: "System Weakness", color: C.green, href: "https://medium.com/system-weakness/i-built-an-ai-powered-cybersecurity-news-digest-heres-how-cb9130f34ec4" },
                  { title: "Automated CVE Monitor → Exploit Playbooks to Slack", pub: "System Weakness", color: C.green, href: "https://medium.com/system-weakness/i-built-an-automated-cve-monitor-that-sends-exploit-playbooks-to-slack-for-free-7e17129e7615" },
                  { title: "PostgreSQL Penetration Testing (Port 5432)", pub: "Hacking Articles", color: C.orange, href: "https://www.hackingarticles.in/penetration-testing-on-postgresql-5432/" },
                ].map((a, i) => (
                  <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: `${a.color}06`, border: `1px solid ${a.color}18`, borderRadius: 6, textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = a.color + "50"} onMouseLeave={e => e.currentTarget.style.borderColor = a.color + "18"}>
                    <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: C.text }}>{a.title}</span>
                    <span style={{ padding: "2px 8px", background: `${a.color}15`, borderRadius: 4, fontSize: 10, fontFamily: "monospace", color: a.color, whiteSpace: "nowrap", marginLeft: 10 }}>{a.pub}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
