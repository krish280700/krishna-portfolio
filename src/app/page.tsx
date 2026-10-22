// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Krishna's AI assistant. Ask me about his LLM engineering, RAG systems, agent pipelines, or full-stack AI products!",
      sender: 'system',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponseFromAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.response || "Sorry, I couldn't process that.";

    } catch (error) {
      console.error('Error calling API:', error);
      return "I'm having trouble connecting right now. Please reach out directly at krishnasridhar2807@gmail.com";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const botResponseText = await getBotResponseFromAPI(inputValue);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: 'system',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What RAG systems have you built?",
    "Tell me about your agent pipelines",
    "What LLM frameworks do you use?",
    "How can I contact you?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' : 'bg-white/95 backdrop-blur-lg py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            KP
          </div>
          <ul className="hidden md:flex gap-8 text-slate-800 font-medium">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative hover:text-indigo-600 transition-colors after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600 hover:after:w-full after:transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden px-6">
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full top-[-250px] right-[-250px] animate-float" />
        <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full bottom-[-200px] left-[-200px] animate-float-delayed" />

        <div className="text-center text-white z-10 max-w-4xl">
          <div className="mb-8 relative w-48 h-48 mx-auto">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-2xl">
              <span className="text-6xl font-bold">KP</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Krishna Prasanth Sridhar
          </h1>
          <p className="text-2xl md:text-3xl mb-4 opacity-90 animate-fade-in-up animation-delay-200">
            AI Product Engineer
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            LLM Engineering &nbsp;·&nbsp; RAG Systems &nbsp;·&nbsp; AI Agents &nbsp;·&nbsp; Full Stack
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up animation-delay-600">
            <a
              href="#contact"
              className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 hover:-translate-y-1 transition-all"
            >
              View My Projects
            </a>
            <a
              href="/resume.pdf"
              download="Krishna_Prasanth_Sridhar_Resume.pdf"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            About Me
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Building Intelligent Systems with LLMs, RAG & Agents
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                I&apos;m an AI Engineer specializing in building production-grade systems that leverage Large Language Models, Retrieval-Augmented Generation, and autonomous agent architectures.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                From designing multi-step RAG pipelines with semantic search and re-ranking, to orchestrating multi-agent workflows with LangGraph and tool-calling APIs — I build AI systems that actually work in production.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                I pair deep AI expertise with full-stack engineering (Next.js, Node.js, Python) to ship complete, polished products — not just demos.
              </p>

              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3 text-slate-800">Core Expertise:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>LLM engineering with OpenAI, Anthropic Claude, and open-source models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>RAG pipelines with vector databases, embeddings, and semantic retrieval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>Agentic systems: tool calling, multi-agent orchestration, memory layers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>Full-stack AI product development from API to deployed UI</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { value: '3+', label: 'Years Engineering' },
                  { value: '15+', label: 'AI Tools & Frameworks' },
                  { value: '5+', label: 'AI Systems Shipped' },
                  { value: '3.83', label: 'GPA' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl text-center shadow-lg hover:-translate-y-2 transition-transform">
                    <h4 className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</h4>
                    <p className="text-slate-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="font-semibold text-lg mb-4 text-slate-800">Contact Information</h4>
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  text: 'Chicago, Illinois, US'
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  text: '+1 312-843-2216'
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: 'krishnasridhar2807@gmail.com'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 mb-3 bg-slate-50 rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:translate-x-2 transition-all group"
                >
                  <div className="flex-shrink-0 group-hover:text-white">{item.icon}</div>
                  <span className="text-slate-700 group-hover:text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            Technical Skills
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'LLM Engineering',
                skills: ['OpenAI GPT-4', 'Anthropic Claude', 'Gemini', 'LLaMA', 'Mistral', 'HuggingFace', 'Prompt Engineering', 'Fine-tuning']
              },
              {
                title: 'RAG & Vector Search',
                skills: ['LangChain', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'FAISS', 'Weaviate', 'OpenAI Embeddings', 'Semantic Search']
              },
              {
                title: 'AI Agents & Orchestration',
                skills: ['LangGraph', 'AutoGen', 'CrewAI', 'Tool Calling', 'Function Calling', 'Multi-Agent Systems', 'n8n', 'Agentic Pipelines']
              },
              {
                title: 'Full Stack Development',
                skills: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Python', 'FastAPI', 'REST APIs', 'GraphQL']
              },
              {
                title: 'Databases & Backend',
                skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'MySQL', 'Redis', 'Vector Stores']
              },
              {
                title: 'DevOps & Cloud',
                skills: ['Vercel', 'Azure', 'Docker', 'GitHub Actions', 'Git', 'Playwright', 'Pytest']
              }
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sidx) => (
                    <span
                      key={sidx}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm hover:scale-110 transition-transform cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            AI Projects
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Job Application Agent',
                tag: 'Multi-Agent · LangGraph · Automation',
                description: 'Architected a multi-agent pipeline using LangGraph to orchestrate job search, ATS scoring, resume tailoring, and automated job application submission end-to-end. Built an ATS scoring agent using the Claude API to evaluate resume-to-job-description alignment across four dimensions, filtering out roles below 60% match. Integrated dual LLM support (Claude Sonnet + GPT-4o) with automatic fallback, and automated LinkedIn Easy Apply workflows using Playwright.',
                stack: ['LangGraph', 'Claude API', 'GPT-4o', 'Playwright', 'Next.js', 'PostgreSQL', 'Supabase', 'Google Cloud Run'],
                highlights: ['Claude API · ATS Scoring', 'Dual LLM Fallback', 'LinkedIn Automation'],
                link: 'https://job-automation-agent.vercel.app/'
              },
              {
                title: 'FlowPilot',
                tag: 'AI Project Management · Full Stack',
                description: 'Engineered an AI-powered planning agent using GPT-4 to automatically break down project goals into actionable tasks and epics, reducing manual planning time by ~80%. Implemented three specialized AI agents (planning, summary, risk detection) for daily status reports. Built an interactive React Kanban board with drag-and-drop, GitHub webhook integration for auto-closing tasks on PR merge, and a multi-tenant auth system with role-based access control.',
                stack: ['OpenAI GPT-4', 'Next.js', 'React', 'PostgreSQL', 'Prisma', 'NextAuth.js', 'GitHub OAuth', 'GitHub Webhooks'],
                highlights: ['3 Specialized AI Agents', 'GitHub Webhook Sync', 'Role-Based Access'],
                link: 'https://flowpilot-one-alpha.vercel.app/'
              }
            ].map((project, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all flex flex-col"
              >
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit mb-3">
                  {project.tag}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((h, hidx) => (
                    <span key={hidx} className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-semibold">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech, tidx) => (
                    <span key={tidx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold w-fit hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            Work Experience
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-600 to-purple-600" />

            {[
              {
                title: 'AI Product Engineer Intern',
                company: 'AIFS',
                location: 'Naperville, Illinois',
                date: 'June 2025 - August 2025',
                points: [
                  'Led end-to-end product development, designing, building, and deploying AI-powered applications using machine learning and Generative AI — delivering production-ready solutions with a focus on scalability, usability, and performance.',
                  'Built full-stack applications with strong expertise in backend development and intuitive UI/UX design, ensuring seamless integration of AI models into user-facing systems.',
                  'Translated concepts from ML research papers into practical implementations, enabling innovation in model design and improving accuracy and efficiency of AI solutions in production.',
                  'Independently shipped AI products across the full lifecycle, maintaining a portfolio of projects showcasing expertise in NLP, computer vision, and generative AI.',
                  'Collaborated with stakeholders to understand workflows and business logic, applying strong problem-solving skills and an entrepreneurial mindset to drive innovation.'
                ]
              },
              {
                title: 'Software Engineer',
                company: 'GOWEBEZ – Inflowcare & Language Dynamic Groups',
                location: 'Chennai, India',
                date: 'March 2021 - December 2023',
                points: [
                  'Built healthcare-focused machine learning models using Scikit-learn, XGBoost, and Random Forest — computing patient risk predictions and managing clinical datasets to improve diagnosis accuracy.',
                  'Analyzed structured and unstructured healthcare data using SQL Server and MongoDB, applied unsupervised learning and clustering techniques to identify disease patterns and support population health management.',
                  'Developed deep learning solutions using Keras and PyTorch for NLP and computer vision use cases, modifying neural network architectures to improve clinical text analysis and medical imaging interpretation.',
                  'Implemented end-to-end pipelines on Azure Machine Learning and Databricks, applying MLOps, version control, and CI/CD to ensure scalable, compliant, production-ready healthcare AI systems.',
                  'Collaborated with clinicians and analysts to design experiments, performed statistical analysis and A/B testing, and researched Generative AI and agentic applications to enhance patient engagement.'
                ]
              }
            ].map((job, idx) => (
              <div key={idx} className="mb-12 relative">
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full z-10" />

                <div className={`md:w-[calc(50%-40px)] ${idx % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all">
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{job.title}</h3>
                    <p className="text-purple-600 font-semibold mb-1">{job.company} | {job.location}</p>
                    <p className="text-slate-500 text-sm mb-4">{job.date}</p>
                      <ul className="space-y-2">
                      {job.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-2 text-slate-600">
                          <span className="text-indigo-600 mt-1 flex-shrink-0">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            Education
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
          </h2>

          <div className="space-y-6">
            {[
              {
                school: 'Illinois Institute of Technology',
                degree: "Master's Degree",
                field: 'Information Technology & Development (Web Design & Application Development)',
                date: 'January 2024 - December 2025',
                gpa: '3.83',
                location: 'Chicago, IL, US'
              },
              {
                school: 'Dhanalakshmi College of Engineering',
                degree: 'Bachelor of Engineering',
                field: 'Electrical, Electronics and Communications Engineering',
                date: '2017 - 2021',
                location: 'India'
              }
            ].map((edu, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all text-center max-w-3xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">{edu.school}</h3>
                <p className="text-xl text-slate-800 mb-1">{edu.degree}</p>
                <p className="text-purple-600 mb-2">{edu.field}</p>
                <p className="text-slate-500 mb-3">{edu.date}</p>
                {edu.gpa && (
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold">
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Build Something with AI</h2>
          <p className="text-xl mb-12 opacity-90">
            Need an LLM integration, RAG system, or agent pipeline built? Open to full-time roles, freelance projects, and AI consulting. Let&apos;s connect.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                title: 'Email',
                value: 'krishnasridhar2807@gmail.com',
                link: 'https://mail.google.com/mail/?view=cm&to=krishnasridhar2807@gmail.com'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
                title: 'LinkedIn',
                value: 'Connect with me',
                link: 'https://www.linkedin.com/in/krishna-sridhar-ba947a1b0'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                ),
                title: 'GitHub',
                value: 'View my projects',
                link: 'https://github.com/krish280700'
              }
            ].map((contact, idx) => (
              <a
                key={idx}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 hover:-translate-y-3 transition-all"
              >
                {contact.icon}
                <h4 className="text-xl font-semibold mb-2">{contact.title}</h4>
                <p className="opacity-90">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-8">
        <p className="opacity-80">
          © 2025 Krishna Prasanth Sridhar · AI Engineer · Built with Next.js & Tailwind CSS
        </p>
      </footer>

      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        {chatOpen ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                KP
              </div>
              <div>
                <h3 className="font-semibold">Krishna&apos;s AI Assistant</h3>
                <p className="text-xs opacity-90">Ask about LLM · RAG · Agents · Full Stack</p>
              </div>
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white text-slate-800 shadow-md'
                    }`}
                >
                  {message.sender === 'user' ? (
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  ) : (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-strong:text-indigo-700 prose-strong:font-semibold prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5 prose-ol:my-1 prose-ol:pl-4 prose-headings:text-slate-800 prose-headings:font-semibold prose-headings:mt-2 prose-headings:mb-1 prose-h3:text-sm prose-h4:text-sm prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded prose-code:text-indigo-600 prose-code:text-xs">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  )}
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 shadow-md rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-3 py-1.5 text-black bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border text-black border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      
      )}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
