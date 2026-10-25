import React, { useState } from 'react';
import { Shield, Code, Palette, Search, ExternalLink, Github, Terminal, ArrowUpRight, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cybersecurity' | 'webdev' | 'uiux'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'cybersecurity':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'webdev':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'uiux':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Portfolio &amp; Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-blue-600">Projects</span> &amp; Systems
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Curated security frameworks, full-stack web applications, and ergonomic design systems developed to solve real technical challenges.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Projects ({PORTFOLIO_DATA.projects.length})
          </button>
          <button
            onClick={() => setActiveCategory('cybersecurity')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeCategory === 'cybersecurity'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Cybersecurity ({PORTFOLIO_DATA.projects.filter(p => p.category === 'cybersecurity').length})
          </button>
          <button
            onClick={() => setActiveCategory('webdev')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeCategory === 'webdev'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Full-Stack Web ({PORTFOLIO_DATA.projects.filter(p => p.category === 'webdev').length})
          </button>
          <button
            onClick={() => setActiveCategory('uiux')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeCategory === 'uiux'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            UI/UX Design ({PORTFOLIO_DATA.projects.filter(p => p.category === 'uiux').length})
          </button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No matching projects found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or reset the category filter to view all work.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden hover:border-slate-300 group"
                >
                  <div className="p-7 space-y-4">
                    
                    {/* Unboxed Metadata Header (Zero-Pill Rule) */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold px-2 py-0.5 rounded-md border ${getCategoryColor(project.category)}`}>
                        {project.categoryLabel}
                      </span>
                      {project.featured && (
                        <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">›</span>
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quantitative Metric */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-700 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold line-clamp-1">{project.metrics}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Footer Actions */}
                  <div className="px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      <span>Deep Dive &amp; Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-medium"
                      title="Inspect Source Code"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
