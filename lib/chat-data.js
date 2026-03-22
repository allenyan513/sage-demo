// Mock chat data for Dr. Rita Orji demo
export const RITA_SUGGESTIONS = [
  "How did you get into persuasive technology?",
  "Advice for a CS student feeling burned out?",
  "What skills matter most for HCI research?",
  "How do you balance teaching and research?",
];

export const RITA_RESPONSES = {
  0: {
    text: `I understand that feeling deeply — and I want you to know it's more common than you think, especially in second year when the workload intensifies.

When I was an undergraduate at Nnamdi Azikiwe University, I was admitted to study Computer Science without ever having used a computer. The imposter syndrome was real. But here's what I've learned: nobody ever feels fully ready. The confidence you're waiting for comes from doing, not from preparing to do.

Burnout often isn't about working too hard — it's about working without a sense of purpose. My advice: find one small project that genuinely excites you. It could be a side project, a research question, or even a hackathon. When you reconnect with WHY you chose CS, the HOW becomes easier.

Also, don't isolate yourself. Talk to your peers, visit office hours, join a study group. In my Persuasive Computing Lab, some of our best breakthroughs came from students who showed up feeling lost but found their direction through collaboration.`,
    sources: [
      { label: "Personal interview, Dal News 2021", type: "interview" },
      { label: "Beyond the Single Story, 2021", type: "article" },
      { label: "LinkedIn career advice post, 2024", type: "social" },
    ],
    personalized: ["Tailored to: CS Year 2", "Context: Academic burnout", "Drawing from: Personal experience"],
  },
  1: {
    text: `Great question — and the fact that you're thinking about research in second year puts you ahead of where most students are.

For HCI and persuasive technology specifically, I'd recommend building skills in three layers:

Foundation layer: Strong programming fundamentals (Python, JavaScript), basic statistics, and research methodology. You don't need to be a math wizard, but you need to read and understand papers.

Human layer: Psychology basics, user research methods, and qualitative analysis. HCI is fundamentally about understanding people. Take a psychology elective if you can — it changed my research trajectory.

Applied layer: Build things. Prototype apps, run small user studies with friends, analyze real data. My lab's best publications came from students who built prototypes first and asked questions later.

Don't just work hard — work on things that compound your effort. A blog post summarizing a paper, a small replication study, a GitHub project that applies a concept — these compound over time into a research identity.

Come to my office hours in the Mona Campbell Building, Room 4207. I'd be happy to point you toward some entry-level research opportunities in the Persuasive Computing Lab.`,
    sources: [
      { label: "CHI 2023 Keynote on training HCI researchers", type: "paper" },
      { label: "USask Alumni Magazine interview, 2023", type: "interview" },
      { label: "Persuasive Computing Lab website", type: "web" },
    ],
    personalized: ["Tailored to: CS Year 2, research interest", "Skill level: Beginner researcher", "Drawing from: Lab mentorship experience"],
  },
  2: {
    text: `This is exactly what my research is about, and it's something I'm deeply passionate about.

The key insight from two decades of persuasive technology research is that one-size-fits-all doesn't work. Every student responds differently to motivational strategies. Some students thrive with goal-setting and progress tracking. Others need social support. Some respond to competition, others to cooperation. My work uses AI to personalize these strategies.

Imagine an AI system that learns YOUR patterns — when you're most productive, what triggers your stress, what kind of encouragement actually works for you specifically — and then adapts its interventions accordingly. Not a generic "take a break" notification, but a genuinely personalized nudge based on your behavioral profile.

But here's the ethical dimension I care deeply about: these systems must be transparent and empowering, not manipulative. The goal isn't to hack students' brains — it's to give them tools to understand themselves better. Technology should serve people, especially underserved populations who lack access to traditional support systems.

This is why I was honored to join the UN's AI Scientific Panel — to help ensure AI development globally keeps human wellbeing at its center, not as an afterthought.`,
    sources: [
      { label: "Personalized Persuasive Health Interventions (CHI 2023)", type: "paper" },
      { label: "UN AI Panel appointment, Dal News Feb 2026", type: "news" },
      { label: "Tailoring Persuasive Strategies to User Types (UMUAI 2018)", type: "paper" },
    ],
    personalized: ["Tailored to: Interest in AI + wellbeing", "Context: Hackathon theme alignment", "Drawing from: Core research program"],
  },
};

// Generic responses for non-Rita mentors
export const GENERIC_RESPONSE = {
  text: "Thank you for your question! This is a demo preview — Dr. Rita Orji's Digital Mentor has the full interactive experience. Click back and try chatting with her to see the complete Sage experience in action.",
  sources: [],
  personalized: [],
};
