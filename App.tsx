
import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock, Instagram, Send, CheckCircle2, ChevronRight, Settings, Star, Quote } from 'lucide-react';
import { SERVICES, GALLERY, CONTACT_WHATSAPP, INSTAGRAM_URL, TESTIMONIALS } from './constants';
import { QuoteRequest, AIResponse } from './types';
import { getSmartQuoteAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState<QuoteRequest>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Sofá',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AIResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de fazer um orçamento com a Tapeçaria Paulista.");
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${message}`, '_blank');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1)$2-$3");
    } else if (v.length > 6) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1)$2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1)$2");
    } else {
      v = v.replace(/^(\d*)/, "$1");
    }

    setFormState({ ...formState, phone: v });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const advice = await getSmartQuoteAdvice(formState);
    setAiFeedback(advice);
    setIsSubmitting(false);
    setShowSuccess(true);

    setFormState({
      name: '',
      email: '',
      phone: '',
      serviceType: 'Sofá',
      description: ''
    });

    setTimeout(() => setShowSuccess(false), 10000);
  };

  const logoUrl = "images/LogoTapecaria.png";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <button
            onClick={() => scrollToSection('inicio')}
            className="flex items-center group transition-all"
          >
            <div className="relative h-16 flex items-center" style={{ minWidth: '180px' }}>
              <img
                src={logoUrl}
                alt="Logo Tapeçaria Paulista"
                className="h-full w-auto object-contain block"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-text-fallback')) {
                    const span = document.createElement('span');
                    span.className = 'logo-text-fallback text-2xl font-bold text-primary font-serif';
                    span.innerText = 'Tapeçaria Paulista';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          </button>

          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection('inicio')} className="text-gray-600 hover:text-primary transition-colors">Início</button>
            <button onClick={() => scrollToSection('servicos')} className="text-gray-600 hover:text-primary transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('empresa')} className="text-gray-600 hover:text-primary transition-colors">Empresa</button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-gray-600 hover:text-primary transition-colors">Depoimentos</button>
            <button onClick={() => scrollToSection('orcamento')} className="text-gray-600 hover:text-primary transition-colors">Orçamento</button>
          </nav>

          <button
            onClick={handleWhatsAppClick}
            className="hidden md:flex items-center bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-md shadow-primary/20"
          >
            <Phone className="w-4 h-4 mr-2" />
            WhatsApp
          </button>

          <button className="md:hidden text-gray-600 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            <button onClick={() => scrollToSection('inicio')} className="w-full text-left py-3 text-gray-700 font-medium border-b border-gray-50">Início</button>
            <button onClick={() => scrollToSection('servicos')} className="w-full text-left py-3 text-gray-700 font-medium border-b border-gray-50">Serviços</button>
            <button onClick={() => scrollToSection('empresa')} className="w-full text-left py-3 text-gray-700 font-medium border-b border-gray-50">Empresa</button>
            <button onClick={() => scrollToSection('depoimentos')} className="w-full text-left py-3 text-gray-700 font-medium border-b border-gray-50">Depoimentos</button>
            <button onClick={() => scrollToSection('orcamento')} className="w-full text-left py-3 text-gray-700 font-medium border-b border-gray-50">Orçamento</button>
            <button
              onClick={() => { handleWhatsAppClick(); setIsMenuOpen(false); }}
              className="w-full flex items-center justify-center bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              <Phone className="w-4 h-4 mr-2" />
              Chamar no WhatsApp
            </button>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="inicio" className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="images/sofa01.jpg"
              alt="Sofá de couro premium"
              className="w-full h-full object-cover brightness-50"
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white">
              <span className="bg-secondary/90 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-4 inline-block">Desde 1995</span>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Sua mobília merece o toque de um artesão.</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">Transformamos móveis antigos em peças exclusivas com a tradição e o requinte da Tapeçaria Paulista.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => scrollToSection('orcamento')}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-all shadow-lg shadow-primary/40"
                >
                  Pedir Orçamento
                </button>
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-center hover:bg-white/20 transition-all"
                >
                  Nossos Serviços
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="servicos" className="py-24 bg-accent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Nossa Especialidade</h2>
              <p className="text-secondary max-w-2xl mx-auto text-lg">Cuidamos de cada detalhe, desde a escolha da espuma até o acabamento final do tecido ou couro.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="h-64 overflow-hidden relative bg-gray-200">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white text-sm font-medium">Qualidade Tapeçaria Paulista</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    <button
                      onClick={() => scrollToSection('orcamento')}
                      className="flex items-center text-primary font-bold hover:translate-x-2 transition-transform"
                    >
                      Solicitar Orçamento <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Details (Gallery) */}
        <section id="empresa" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Tradição Paulista</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Tradição em cada costura, inovação em cada design.</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  A Tapeçaria Paulista nasceu de um pequeno ateliê familiar e hoje conta com maquinário industrial de ponta e profissionais altamente qualificados para atender toda a região.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Clock className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Agilidade</h4>
                      <p className="text-sm text-gray-600">Prazos curtos e entrega garantida.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Settings className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Técnica</h4>
                      <p className="text-sm text-gray-600">Maquinário industrial de última geração.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                {GALLERY.map((img, idx) => (
                  <div key={img.id} className={`overflow-hidden rounded-2xl shadow-lg bg-gray-100 ${idx % 2 === 1 ? 'mt-8' : ''}`}>
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="800"
                      height="800"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Satisfação Garantida</span>
              <h2 className="text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="bg-accent p-8 rounded-3xl relative shadow-sm hover:shadow-md transition-shadow">
                  <Quote className="absolute top-6 right-8 text-primary/10 w-12 h-12" />
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-secondary font-medium">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="orcamento" className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-secondary p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-white">Peça seu Orçamento Grátis</h3>
                  <p className="text-white/90 mb-8">Nossa equipe está pronta para dar vida nova aos seus móveis.</p>

                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Atendimento Personalizado</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Análise Técnica Gratuita</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Materiais Premium</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-12">
                  <p className="text-xs uppercase tracking-widest opacity-70 mb-2">WhatsApp Paulista</p>
                  <p className="font-bold">(67) 99293-1851</p>
                </div>
              </div>

              <div className="md:w-2/3 p-12 text-gray-900">
                {!showSuccess ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nome Completo</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-gray-50 border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="Ex: João Silva"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">WhatsApp</label>
                        <input
                          type="tel"
                          required
                          className="w-full bg-gray-50 border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="(67)99999-9999"
                          value={formState.phone}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Serviço Desejado</label>
                      <select
                        className="w-full bg-gray-50 border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={formState.serviceType}
                        onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                      >
                        <option>Sofá</option>
                        <option>Poltrona</option>
                        <option>Bancos Automotivos</option>
                        <option>Puffs / Almofadas</option>
                        <option>Outros</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Conte detalhes do projeto</label>
                      <textarea
                        rows={10}
                        required
                        className="w-full bg-gray-50 border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Descreva o que deseja reformar..."
                        value={formState.description}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Processando...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Solicitação
                        </div>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Solicitação Enviada!</h3>
                    <p className="text-gray-600 mb-8">Nossa equipe em breve entrará em contato.</p>

                    {aiFeedback && (
                      <div className="bg-accent p-6 rounded-2xl text-left border border-gray-100">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary font-bold text-xs">AI</span>
                          </div>
                          <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Dica Tapeçaria Paulista</h4>
                        </div>
                        <p className="text-gray-800 text-sm italic mb-4">"{aiFeedback.suggestion}"</p>
                        <div className="flex flex-wrap gap-2">
                          {aiFeedback.materials.map((m, i) => (
                            <span key={i} className="bg-white px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setShowSuccess(false)}
                      className="mt-8 text-primary font-bold hover:underline"
                    >
                      Enviar outro orçamento
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="localizacao" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                <h2 className="text-4xl font-bold mb-6">Onde Estamos</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Visite a Tapeçaria Paulista! Estamos localizados estrategicamente para melhor lhe atender em Campo Grande.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold">Endereço</h4>
                      <p className="text-gray-600">Av. das Bandeiras, 1416 - Jardim Joquei Club<br />Campo Grande, MS</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold">Funcionamento</h4>
                      <p className="text-gray-600">Segunda a Sexta: 07:30–11:30, 13:00–18:00<br />Sábado: 07:30 - 12:00</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="mt-12 bg-primary text-white px-8 py-4 rounded-full font-bold w-full hover:shadow-lg transition-all"
                >
                  Pedir Localização no WhatsApp
                </button>
              </div>

              <div className="lg:w-2/3 h-[500px] bg-gray-100 rounded-3xl overflow-hidden shadow-inner relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1880.4033690299157!2d-54.6250120453849!3d-20.484652188229852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e6090dbadd55%3A0x3e03f8bbe381a480!2sTAPE%C3%87ARIA%20PAULISTA!5e1!3m2!1spt-BR!2sbr!4v1767668137550!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative h-14 flex items-center mb-6">
                <img
                  src={logoUrl}
                  alt="Logo Tapeçaria Paulista"
                  className="h-full w-auto object-contain block"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.logo-text-footer')) {
                      const span = document.createElement('span');
                      span.className = 'logo-text-footer text-xl font-bold text-white font-serif';
                      span.innerText = 'Tapeçaria Paulista';
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                Sua tapeçaria de confiança em Campo Grande. Especialistas em conforto e elegância desde 1995.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-secondary">Acesso Rápido</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('inicio')} className="hover:text-white transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection('servicos')} className="hover:text-white transition-colors">Serviços</button></li>
                <li><button onClick={() => scrollToSection('empresa')} className="hover:text-white transition-colors">Sobre Nós</button></li>
                <li><button onClick={() => scrollToSection('orcamento')} className="hover:text-white transition-colors">Orçamento</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-secondary">Redes Sociais</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all"
                  title="Siga-nos no Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-secondary">Contato</h4>
              <p className="text-sm text-gray-400">paulista.tap@gmail.com</p>
              <p className="text-sm text-gray-400 mt-2">(67) 99293-1851</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tapeçaria Paulista. Arte e Tradição.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center group shadow-green-500/20"
      >
        <Phone className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-bold">WhatsApp</span>
      </button>
    </div>
  );
};

export default App;
