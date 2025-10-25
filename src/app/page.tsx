// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

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
      text: "Hi! I'm Krishna's AI assistant. Ask me anything about his experience, skills, or projects!",
      sender: 'bot',
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

  // Function to call your Python API
  const getBotResponseFromAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('https://agentic-ai-ov9y.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers like API keys if needed
          // 'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(msg => ({ role: msg.sender, content: msg.text })),
          // Add any other parameters your API needs
          // context: 'portfolio',
          // user_id: 'visitor',
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
        console.log('API response data:', data);
      // Adjust this based on your API response structure
      // Example: if your API returns { response: "text" }
      return data.response || data.message || data.text || "Sorry, I couldn't process that.";
      
    } catch (error) {
      console.error('Error calling API:', error);
      return "I'm having trouble connecting right now. Please try again later or reach out directly at krishkrishnan2001@gmail.com";
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

    // Call your Python API
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
    "What are your skills?",
    "Tell me about your experience",
    "What AI projects have you worked on?",
    "How can I contact you?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' : 'bg-white/95 backdrop-blur-lg py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            KP
          </div>
          <ul className="hidden md:flex gap-8 text-slate-800 font-medium">
            {['Home', 'About', 'Skills', 'Experience', 'Education', 'Contact'].map((item) => (
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
        {/* Animated Background Elements */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full top-[-250px] right-[-250px] animate-float" />
        <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full bottom-[-200px] left-[-200px] animate-float-delayed" />
        
        <div className="text-center text-white z-10 max-w-4xl">
          {/* Profile Image */}
          <div className="mb-8 relative w-48 h-48 mx-auto">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-2xl">
              {/* Replace with your actual image */}
              {/* <Image
                src="/profile.jpg"
                alt="Krishna Prasanth Sridhar"
                width={192}
                height={192}
                className="rounded-full object-cover"
                priority
              /> */}
              {/* Fallback - shows initials */}
              <span className="text-6xl font-bold">KP</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Krishna Prasanth Sridhar
          </h1>
          <p className="text-2xl md:text-3xl mb-4 opacity-90 animate-fade-in-up animation-delay-200">
            AI & Automation Engineer
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Exploring Agentic Systems and Workflow Orchestration | Bridging Code and Intelligence
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up animation-delay-600">
            <a 
              href="#contact"
              className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Get In Touch
            </a>
            <a 
              href="#experience"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 hover:-translate-y-1 transition-all"
            >
              View My Work
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
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
                Building the Future of Agentic AI
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The next wave of technology is agentic — systems that think, decide, and act autonomously.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                I&apos;m passionate about building AI-driven and agentic workflows that connect systems, automate complex processes, and create intelligent decision-making layers for businesses.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                With hands-on experience in web development (Next.js, Angular, Node.js) and a growing focus on AI automation tools like n8n and OpenAI, I enjoy experimenting with how AI agents can replace repetitive operations and augment human capabilities.
              </p>
              
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3 text-slate-800">Core Interests:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>Agentic AI and automation architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>Workflow orchestration using n8n and APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>Integrating AI into modern web applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">▹</span>
                    <span>Experimenting with real-world business automations (finance, retail, operations)</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { value: '3+', label: 'Years Experience' },
                  { value: '10+', label: 'Technologies' },
                  { value: '2', label: 'SaaS Platforms' },
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
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  text: 'Chicago, Illinois, US'
                },
                { 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  text: '+1 312-843-2216'
                },
                { 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  text: 'krishkrishnan2001@gmail.com'
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
              { title: 'Languages', skills: ['HTML 5', 'CSS 3', 'JavaScript', 'TypeScript', 'Python', '.NET'] },
              { title: 'Frameworks & Libraries', skills: ['React JS', 'Angular', 'Vue JS', 'Next JS', 'Astro', 'Blazor', 'jQuery'] },
              { title: 'AI & Automation', skills: ['OpenAI', 'n8n', 'Agentic Systems', 'Workflow Orchestration', 'AI Integration'] },
              { title: 'State Management', skills: ['Redux', 'Vuex', 'RxJS', 'Context API'] },
              { title: 'Back-End & Databases', skills: ['Node.js', 'GraphQL', 'MongoDB', 'MySQL'] },
              { title: 'Tools & Deployment', skills: ['Git', 'GitHub', 'Azure', 'Vercel', 'Postman'] }
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

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            Work Experience
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-600 to-purple-600" />
            
            {[
              {
                title: 'Front-End Web Developer Intern',
                company: 'AIFS',
                location: 'Naperville, Illinois',
                date: 'June 2025 - August 2025',
                points: [
                  'Built SEO-friendly websites using Astro with best practices for performance and discoverability',
                  'Developed web applications using Blazor, creating responsive and scalable UIs',
                  'Set up CI/CD pipelines on Azure App Service to automate deployment and streamline development',
                  'Collaborated with teams to deliver optimized and production-ready web solutions'
                ]
              },
              {
                title: 'Frontend Developer',
                company: 'GoWebEz',
                location: 'Chennai, India',
                date: 'March 2021 - December 2023',
                subtitle: 'Inflowcare & Language Dynamic Groups - SaaS Platforms',
                points: [
                  'Modernized a legacy jQuery app to a scalable React.js architecture with Redux and Tailwind CSS',
                  'Built interactive Vue.js components and managed state using Vuex for an education platform',
                  'Integrated RESTful APIs with MongoDB and MySQL for real-time data handling',
                  'Enabled features for healthcare staff scheduling, academic assessments, and progress tracking',
                  'Collaborated with U.S.-based cross-functional teams in agile sprints, focusing on performance, security, and accessibility'
                ]
              }
            ].map((job, idx) => (
              <div key={idx} className="mb-12 relative">
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full z-10" />
                
                <div className={`md:w-[calc(50%-40px)] ${idx % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all">
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{job.title}</h3>
                    <p className="text-purple-600 font-semibold mb-1">{job.company} | {job.location}</p>
                    <p className="text-slate-500 text-sm mb-4">{job.date}</p>
                    {job.subtitle && (
                      <p className="text-purple-600 font-semibold mb-3">{job.subtitle}</p>
                    )}
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
      <section id="education" className="py-20 px-6">
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
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Connect</h2>
          <p className="text-xl mb-12 opacity-90">
            Let&apos;s connect if you&apos;re working in AI, agentic systems, or automation — or just exploring how intelligent workflows can reshape the future of work.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                title: 'Email',
                value: 'krishkrishnan2001@gmail.com',
                link: 'mailto:krishkrishnan2001@gmail.com'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
                title: 'LinkedIn',
                value: 'Connect with me',
                link: 'https://www.linkedin.com/in/krishna-sridhar-ba947a1b0'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                ),
                title: 'GitHub',
                value: 'View my projects',
                link: '#'
              }
            ].map((contact, idx) => (
              <a
                key={idx}
                href={contact.link}
                target={contact.link.startsWith('http') ? '_blank' : '_self'}
                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
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
          © 2024 Krishna Prasanth Sridhar. Built with Next.js & Tailwind CSS
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
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                KP
              </div>
              <div>
                <h3 className="font-semibold">Krishna&apos;s AI Assistant</h3>
                <p className="text-xs opacity-90">Powered by AI</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
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
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white text-slate-800 shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                  }`}>
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

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
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