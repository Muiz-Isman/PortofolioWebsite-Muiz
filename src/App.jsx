import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Database, 
  Code2, 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronDown,
  Terminal,
  FileSpreadsheet,
  Layout,
  Users,
  Mic,
  Briefcase
} from 'lucide-react';

// --- COMPONENTS ---

// 1. Project Card 
const ProjectCard = ({ project }) => (
  <div className="group relative bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
          {project.icon}
        </div>
        <a href="#" className="text-zinc-400 hover:text-black transition-colors">
          <ArrowUpRight size={20} />
        </a>
      </div>
      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:underline decoration-1 underline-offset-4">
        {project.title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed mb-4">
        {project.description}
      </p>
    </div>
    
    <div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between items-center">
        <span className="text-xs font-bold text-zinc-900 tracking-wider uppercase">Focus</span>
        <span className="text-sm font-medium text-zinc-600">{project.focus}</span>
      </div>
    </div>
  </div>
);

// 2. Experience Row (Organization History)
const ExperienceRow = ({ role, org, period, desc }) => (
  <div className="relative pl-8 pb-10 border-l border-zinc-200 last:pb-0 last:border-none">
    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-900 ring-4 ring-white"></div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
      <h3 className="text-lg font-bold text-zinc-900">{role}</h3>
      <span className="text-xs font-mono text-zinc-500 bg-zinc-50 px-2 py-1 rounded">{period}</span>
    </div>
    <div className="text-sm font-semibold text-zinc-700 mb-2">{org}</div>
    <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl">
      {desc}
    </p>
  </div>
);

// 3. Skill Badge
const SkillBadge = ({ icon: Icon, name }) => (
  <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-zinc-200 hover:border-zinc-900 transition-colors cursor-default group">
    <Icon size={18} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
    <span className="text-sm font-medium text-zinc-800">{name}</span>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- DATA FROM CV (UPDATED) ---
  
  const projects = [
    {
      id: 1,
      title: "Pizza Sales Analytics",
      category: "Data Analysis",
      description: "End-to-end analysis for a pizza restaurant case study. Performed data cleaning with Pandas, conducted EDA to identify purchasing patterns, and created visualizations to support business decision-making.",
      tags: ["Python", "Excel", "EDA", "Visualization"],
      focus: "Business Insights",
      icon: <BarChart3 size={24} />
    },
    {
      id: 2,
      title: "Community Management System",
      category: "Web Dev",
      description: "Full-stack development for a church community internal project. Designed user-friendly UI/UX and integrated a database system for managing attendance data efficienty.",
      tags: ["UI/UX", "Frontend", "Database"],
      focus: "System Integration",
      icon: <Layout size={24} />
    },
    {
      id: 3,
      title: "Event Management System",
      category: "Web Dev",
      description: "Built a web-based platform for organizational activity management. Integrated registration systems with a database to store event information securely.",
      tags: ["PHP", "MySQL", "Web Programming"],
      focus: "Event Management",
      icon: <Code2 size={24} />
    },
    {
      id: 4,
      title: "Ultimagz Digital System",
      category: "Web Dev",
      description: "Managing and developing digital systems as Head of IT. Ensuring website content updates and maintenance using WordPress to keep appearance relevant.",
      tags: ["WordPress", "IT Management", "Leadership"],
      focus: "Digital Operations",
      icon: <Terminal size={24} />
    }
  ];

  const experiences = [
    {
      role: "Head of IT Department",
      org: "Ultimagz",
      period: "Nov 2024 - Present",
      desc: "Leading the IT division, coordinating the team in managing digital systems, and maintaining the organization's website to ensure optimal performance and up-to-date content."
    },
    {
      role: "Moderator",
      org: "KAMI UMN (Alumni Sharing Session)",
      period: "Sep 2025 - Oct 2025",
      desc: "Coordinated session flow, managed speaker transitions, and ensuring clear, structured communication for a professional online discussion environment."
    },
    {
      role: "Event Coordinator & MC",
      org: "Career Preparation 2025",
      period: "Jul 2025 - Sep 2025",
      desc: "Led the event division, coordinated with speakers and advisors, and served as Master of Ceremonies to ensure a smooth and engaging main event."
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white relative">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="text-lg font-bold tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-zinc-900 rounded-sm rotate-45"></div>
            MU'IZ ISMAN
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
            <a href="#work" className="hover:text-zinc-900 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-zinc-900 transition-colors">Experience</a>
            <a href="#contact" className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 mb-6">
              <span className="w-2 h-2 bg-zinc-900 rounded-full"></span>
              <span className="text-xs font-bold text-zinc-600 tracking-wide uppercase">Data Analyst & CS Student</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Translating Data into <br/>
              <span className="text-zinc-400">Clear Narratives.</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mb-10">
              Hi, I'm <b>Muhammad Mu'iz Isman</b>. A 5th-semester Informatics student specializing in Data Analysis. 
              I combine technical skills in Python & SQL with strong communication abilities to bridge the gap between data and decision-making.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#work" className="px-8 py-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-all flex items-center gap-2 group">
                View Projects
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/muiz-isman" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-xl font-medium hover:bg-zinc-50 transition-all">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="py-10 px-6 border-y border-zinc-100 bg-zinc-50/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Current GPA", value: "3.73" }, // Updated from CV
            { label: "Semester", value: "5th" },
            { label: "Focus", value: "Data Analysis" },
            { label: "Location", value: "Tangerang" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">{stat.value}</span>
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-zinc-900">Technical Proficiency</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <SkillBadge icon={Code2} name="Python (Pandas, Matplotlib)" />
            <SkillBadge icon={Database} name="SQL (JOIN, Aggregation)" />
            <SkillBadge icon={FileSpreadsheet} name="Excel (Pivot, Lookup)" />
            <SkillBadge icon={Layout} name="Figma (UI/UX)" />
            <SkillBadge icon={Terminal} name="Web (PHP, React, Laravel)" />
            <SkillBadge icon={Mic} name="Public Speaking" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20 px-6 bg-zinc-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">Featured Projects</h2>
              <p className="text-zinc-500 max-w-md">
                A selection of my work in data analysis, web development, and system management.
              </p>
            </div>
            
            {/* Filter */}
            <div className="flex bg-white p-1 rounded-xl border border-zinc-200 shadow-sm">
              {['All', 'Data Analysis', 'Web Dev'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter 
                      ? 'bg-zinc-900 text-white shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Leadership & <br/>Organization</h2>
              <p className="text-zinc-500 mb-6">
                Beyond code and data, I actively contribute to organizations, refining my leadership and communication skills.
              </p>
              <div className="p-6 bg-zinc-900 rounded-2xl text-zinc-400 text-sm">
                <Briefcase className="text-white mb-3" size={24} />
                "I believe effective data analysis requires not just technical skills, but the ability to communicate insights clearly."
              </div>
            </div>
            
            <div className="md:w-2/3">
              {experiences.map((exp, idx) => (
                <ExperienceRow key={idx} {...exp} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-24 px-6 border-t border-zinc-100 bg-zinc-50/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">Ready to Contribute</h2>
          <p className="text-zinc-500 mb-10 text-lg">
            Currently committed to deepening my data analysis skills and ready to contribute in a data-driven corporate environment.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
             <a href="mailto:muizisman511@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
               <Mail size={18} />
               muizisman511@gmail.com
             </a>
             <a href="https://www.linkedin.com/in/muiz-isman" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full hover:border-zinc-900 hover:text-zinc-900 transition-all">
               <Linkedin size={18} />
               LinkedIn Profile
             </a>
             <a href="https://github.com/Muiz-Isman" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full hover:border-zinc-900 hover:text-zinc-900 transition-all">
               <Github size={18} />
               GitHub
             </a>
          </div>
          
          <div className="text-zinc-400 text-sm flex flex-col items-center gap-2">
            <p>© {new Date().getFullYear()} Muhammad Mu'iz Isman.</p>
            <p className="text-xs text-zinc-300">Tangerang, Indonesia • +62813 1754 9621</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;