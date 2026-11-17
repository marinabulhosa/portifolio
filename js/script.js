const GH = "https://github.com/marinabulhosa"; 
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
const AREAS = { dados: "Dados", sistemas: "Sistemas", ia: "IA e Automação" };
// d = resumo do card, p = problema, s = o que foi construído, f = destaque
const P = [
    {
        a: "dados",
        f: 1,
        t: "Voz do Cliente",
        d: "Dashboard que transforma milhares de avaliações de restaurantes em decisões, com sentimento, categoria e plano de ação.",
        p: "Restaurantes recebem avaliações em texto demais para ler uma a uma e acabam sem enxergar o que mais pesa.",
        s: "Classificação por sentimento (positivo, neutro, negativo) e categoria (atraso, embalagem, sabor, preço), dashboard com filtros e gráficos e botão que gera o plano de ação.",
        g: ["Python", "IA", "Dashboard"],
        url: "https://github.com/marinabulhosa/VozDoCliente"
    },
    {
        a: "sistemas",
        t: "Precificador Saborê",
        d: "Aplicação web responsiva para calcular preços de produtos de confeitaria.",
        p: "Precificar manualmente pode fazer com que custos importantes, como perdas, mão de obra, energia e gás, sejam esquecidos.",
        s: "Cadastro de ingredientes e embalagens com cálculo proporcional de custos, explicação do método de precificação e opções para diferentes formas de cálculo.",
        g: ["HTML", "CSS", "JavaScript"],
        url: "https://marinabulhosa.github.io/precificadorSabore/"
    },
    {
        a: "ia",
        t: "Radar de Vagas",
        d: "Automação com n8n e IA que analisa alertas de vagas e identifica oportunidades alinhadas ao meu perfil.",
        p: "Eu gastava horas abrindo alertas de vagas recebidos por e-mail, inclusive oportunidades que não tinham relação com minha formação, conhecimentos ou objetivos profissionais.",
        s: "Automação que lê e-mails de alertas de vagas do LinkedIn, Gupy, Even e Vagas.com, avalia cada oportunidade com IA conforme meu perfil e envia avisos apenas sobre as vagas que combinam. O fluxo utiliza também Planilhas Google e um bot do Telegram.",
        g: ["n8n", "API Gemini", "Gmail", "Planilhas Google", "Telegram", "JavaScript"],
        url: "https://github.com/marinabulhosa/RadarVagas"
    }
];
const SK = [
    ["Programação", ["Python", "Java", "JavaScript", "SQL", "HTML 5", "CSS"]],
    ["Web e mobile", ["Java Web", "Android (Android Studio)", "UX/UI", "Interfaces responsivas"]],
    ["Dados e bancos de dados", ["MySQL", "SQL", "pandas (estudando)", "Análise de dados operacionais", "Dashboards"]],
    ["IA e automação", ["n8n", "Agentes de IA", "Geração de vídeo e conteúdo com IA", "Automação de tarefas", "Google Colab"]],
    ["Ferramentas e suporte", ["Git", "GitHub", "WordPress", "Active Directory", "Instalação e configuração de equipamentos", "Suporte técnico"]],
    ["Conteúdo e design", ["Canva", "Premiere", "CapCut", "InShot", "Edição simples de vídeo e imagem"]]
];

const $ = id => document.getElementById(id);
$("gh").href = GH;

$("sg").innerHTML = SK.map(([t, v], i) => 
    `<div class="c${i % 3}"><h3>${t}</h3><div class="chips">${v.map(x => `<span>${x}</span>`
).join("")}</div></div>`).join("");

$("stats").innerHTML = [
    [P.length, "", "projetos"], [4, "", "experiências práticas"], [164, "", "horas de cursos concluídos"], [3, "+", "anos de prática"]].map(([n, s, l]) => `<div><b data-n="${n}" data-s="${s}">${s}${n}</b><span>${l}</span></div>`).join("");

// Projetos, filtro e caso detalhado
const grid = $("grid"), bar = $("filters"), dlg = $("dlg");
function render(f) {
    let k = 0;
    grid.innerHTML = P.map((p, i) => [p, i]).filter(([p]) => f === "todos" || p.a === f).map(([p, i]) =>
        <article class="card ${p.a}${p.f ? " feat" : ""}" style="--i:${k++}">
            <span class="ar">${AREAS[p.a]}</span>
            <h3>${p.t}</h3>
            <p>${p.d}</p>
            <ul class="tags">${p.g.map(x => `<li>${x}</li>`).join("")}</ul>
            <div class="acts">
                <button type="button" data-i="${i}">Ver caso</button>
                <a href="${p.url}" target="_blank" rel="noopener noreferrer">Acessar projeto</a>
            </div>
        </article>`
    ).join("");
}
bar.innerHTML = [["todos", "Todos"], ...Object.entries(AREAS)].map(([k, v]) => `<button type="button" data-f="${k}" aria-pressed="${k === "todos"}">${v}</button>`).join("");
bar.onclick = e => { const b = e.target.closest("button"); if (!b) return; bar.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); render(b.dataset.f) };
render("todos");
grid.addEventListener("pointermove", e => { const c = e.target.closest(".card"); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px") });
grid.addEventListener("click", e => {
    const b = e.target.closest("[data-i]"); if (!b) return; const p = P[b.dataset.i]; dlg.className = p.a;
    $("dc").innerHTML = `<span class="ar">${AREAS[p.a]}</span><h3>${p.t}</h3><h4>Problema</h4><p>${p.p}</p><h4>O que construí</h4><p>${p.s}</p><ul class="tags">${p.g.map(x => `<li>${x}</li>`).join("")}</ul><a class="btn main" href="${GH}/${p.r}">Ver no GitHub</a>`; dlg.showModal()
});
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest("[data-x]")) dlg.close() });

// Formulário: com FORM_ENDPOINT envia direto; sem ele abre o Gmail com a mensagem pronta
const FORM_ENDPOINT = ""; // opcional: cole aqui a URL do formulário no Formspree (https://formspree.io/f/SEU_ID)
$("f").onsubmit = async e => {
    e.preventDefault(); const f = e.target, fs = $("fs"), d = new FormData(f), to = "marinabulhosa@gmail.com";
    if (FORM_ENDPOINT) {
        fs.textContent = "Enviando...";
        try { const r = await fetch(FORM_ENDPOINT, { method: "POST", body: d, headers: { Accept: "application/json" } }); if (!r.ok) throw 0; f.reset(); fs.textContent = "Mensagem enviada. Obrigada pelo contato!" }
        catch { fs.textContent = "Não consegui enviar agora. Escreva direto para " + to + "." } return
    }
    const su = encodeURIComponent("Contato pelo portfólio"), bd = encodeURIComponent(`Olá, Marina! Aqui é ${d.get("n")} (${d.get("email")}).\n\n${d.get("m")}`);
    open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`, "_blank", "noopener");
    fs.textContent = "Abri o Gmail com a mensagem pronta. Se preferir outro e-mail, escreva para " + to + "."
};
// Esconde os botões de currículo se o PDF ainda não estiver em docs/
document.querySelectorAll(".cv").forEach(a => fetch(a.href, { method: "HEAD" }).then(r => { if (r.status === 404) a.hidden = true }).catch(() => { }));

// Entrada ao rolar e contadores
function count(b) { const n = +b.dataset.n, s = b.dataset.s; if (RM) return; let t0; const f = t => { t0 ??= t; const k = Math.min(1, (t - t0) / 1300); b.textContent = s + Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f) }; b.textContent = s + 0; requestAnimationFrame(f) }
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add("in"); e.target.querySelectorAll("[data-n]").forEach(count); io.unobserve(e.target) }), { threshold: .15 });
document.querySelectorAll(".rv").forEach(x => io.observe(x));

// Código digitado no hero
const code = `<span class=c>// quem sou, em código</span>
<span class=k>const</span> marina = {
  <span class=p>foco</span>: [<span class=s>"desenvolvimento"</span>, <span class=s>"dados"</span>, <span class=s>"IA"</span>, <span class=s>"suporte"</span>],
  <span class=p>formacao</span>: <span class=s>"Ciência da Computação, UFF"</span>,
  <span class=p>conclusao</span>: <span class=k>2027</span>,
  <span class=p>linguagens</span>: [<span class=s>"Python"</span>, <span class=s>"Java"</span>, <span class=s>"JavaScript"</span>, <span class=s>"SQL"</span>],
  <span class=p>tambem</span>: [<span class=s>"HTML"</span>, <span class=s>"CSS"</span>, <span class=s>"Android"</span>, <span class=s>"Git"</span>],
  <span class=p>aberta</span>: <span class=k>true</span>,
};`;
const el = $("code"); let ci = 0;
(function type() {
    if (RM) { el.innerHTML = code; return }
    if (code[ci] === "<") ci = code.indexOf(">", ci);
    ci++; el.innerHTML = code.slice(0, ci) + '<i class="cur"></i>';
    if (ci < code.length) setTimeout(type, code[ci] === "\n" ? 220 : 16);
})();

// Rede de partículas no hero (reage ao mouse)
(function () {
    const c = $("net"), x = c.getContext("2d"), cols = ["#ff5fa8", "#9b6bff", "#4da3ff"], m = { x: -999, y: -999 }, hero = c.parentElement;
    let w, h, n = [], run = false;
    function size() {
        const r = hero.getBoundingClientRect(), d = devicePixelRatio || 1; w = r.width; h = r.height; c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
        n = Array.from({ length: Math.min(90, Math.round(w * h / 15000)) }, (_, k) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, c: cols[k % 3] })); draw()
    }
    function draw() {
        x.clearRect(0, 0, w, h);
        for (const p of n) {
            p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
            const dx = p.x - m.x, dy = p.y - m.y; if (dx * dx + dy * dy < 16900) { p.x += dx * .012; p.y += dy * .012 }
        }
        for (let i = 0; i < n.length; i++) {
            const a = n[i]; x.fillStyle = a.c; x.beginPath(); x.arc(a.x, a.y, 1.7, 0, 6.283); x.fill();
            for (let j = i + 1; j < n.length; j++) {
                const b = n[j], d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < 125) { x.strokeStyle = a.c; x.globalAlpha = (1 - d / 125) * .4; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); x.globalAlpha = 1 }
            }
        }
        if (run && !RM) requestAnimationFrame(draw)
    }
    size(); addEventListener("resize", size);
    hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top });
    hero.addEventListener("pointerleave", () => { m.x = m.y = -999 });
    new IntersectionObserver(([e]) => { if (e.isIntersecting && !run) { run = true; draw() } else if (!e.isIntersecting) run = false }).observe(hero);
})();

// Barra de progresso, seção ativa no menu e linha do tempo
(function () {
    const tl = $("tl"), li = [...tl.children], pb = $("pb"), links = [...$("nav").children], secs = links.map(a => $(a.hash.slice(1))); let t = false;
    function upd() {
        t = false;
        pb.style.width = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100 + "%";
        const r = tl.getBoundingClientRect(), y = innerHeight * .65;
        tl.style.setProperty("--p", Math.max(0, Math.min(100, (y - r.top) / r.height * 100)) + "%");
        li.forEach(l => l.classList.toggle("on", l.getBoundingClientRect().top < y));
        let cur = -1; secs.forEach((s, i) => { if (s.getBoundingClientRect().top < 140) cur = i });
        links.forEach((a, i) => a.classList.toggle("act", i === cur))
    }
    addEventListener("scroll", () => { if (!t) { t = true; requestAnimationFrame(upd) } }, { passive: true }); upd();
})();
