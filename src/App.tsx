/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Talents } from './components/Talents';
import { ContactSection } from './components/ContactSection';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

import { CustomRubriques } from './components/CustomRubriques';

import {
  INITIAL_TALENTS,
  INITIAL_SERVICES,
  INITIAL_ADVANTAGES,
  INITIAL_TESTIMONIALS,
  INITIAL_NEWS,
  INITIAL_CONTACT_INFO,
  INITIAL_LEADS,
  INITIAL_APPOINTMENTS,
  INITIAL_RUBRIQUES,
} from './data/initialData';

import {
  Talent,
  Service,
  Advantage,
  Testimonial,
  NewsItem,
  ContactLead,
  Appointment,
  ContactInfo,
  Rubrique,
  CustomTheme,
} from './types';

export default function App() {
  // State with localStorage initialization for live Admin updates
  const [talents, setTalents] = useState<Talent[]>(() => {
    const saved = localStorage.getItem('lvnt_talents');
    return saved ? JSON.parse(saved) : INITIAL_TALENTS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('lvnt_services');
    if (!saved) return INITIAL_SERVICES;
    try {
      const parsed: Service[] = JSON.parse(saved);
      const validIds = INITIAL_SERVICES.map((s) => s.id);
      return parsed
        .filter((s) => validIds.includes(s.id))
        .map((s) => {
          if (s.id === 's5') return { ...s, title: 'Communication et marketing' };
          return s;
        });
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [rubriques, setRubriques] = useState<Rubrique[]>(() => {
    const saved = localStorage.getItem('lvnt_rubriques');
    return saved ? JSON.parse(saved) : INITIAL_RUBRIQUES;
  });

  const [currentTheme, setCurrentTheme] = useState<CustomTheme>(() => {
    const saved = localStorage.getItem('lvnt_theme');
    return saved ? JSON.parse(saved) : { accentColor: 'white', showRubriques: true };
  });

  const [advantages] = useState<Advantage[]>(INITIAL_ADVANTAGES);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('lvnt_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('lvnt_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [leads, setLeads] = useState<ContactLead[]>(() => {
    const saved = localStorage.getItem('lvnt_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('lvnt_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('lvnt_contactInfo');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_INFO;
  });

  // Modal Visibility States
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Keyboard shortcut & URL trigger for hidden background admin access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A or Ctrl + Alt + A
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') ||
          (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setAdminDashboardOpen(true);
      }
    };

    const checkUrlTrigger = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setAdminDashboardOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkUrlTrigger);
    checkUrlTrigger();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkUrlTrigger);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('lvnt_talents', JSON.stringify(talents));
  }, [talents]);

  useEffect(() => {
    localStorage.setItem('lvnt_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('lvnt_rubriques', JSON.stringify(rubriques));
  }, [rubriques]);

  useEffect(() => {
    localStorage.setItem('lvnt_theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('lvnt_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('lvnt_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('lvnt_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('lvnt_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('lvnt_contactInfo', JSON.stringify(contactInfo));
  }, [contactInfo]);

  // Handlers
  const handleAddLead = (leadData: Omit<ContactLead, 'id' | 'date' | 'status'>) => {
    const newLead: ContactLead = {
      id: 'lead_' + Date.now(),
      ...leadData,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Nouveau',
    };
    setLeads([newLead, ...leads]);
  };

  const handleAddAppointment = (
    apptData: Omit<Appointment, 'id' | 'status' | 'createdAt'>
  ) => {
    const newAppt: Appointment = {
      id: 'appt_' + Date.now(),
      ...apptData,
      status: 'En attente',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAppointments([newAppt, ...appointments]);
  };

  const handleSelectServiceForAppointment = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setAppointmentModalOpen(true);
  };

  return (
    <div className="bg-black text-white min-h-screen font-display selection:bg-white selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        onOpenAppointment={() => {
          setPreselectedService('');
          setAppointmentModalOpen(true);
        }}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
        isAdminMode={isAdminAuthenticated}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenAppointment={() => {
            setPreselectedService('');
            setAppointmentModalOpen(true);
          }}
        />

        {/* À Propos */}
        <About />

        {/* Nos Services */}
        <Services
          services={services}
          onSelectServiceForAppointment={handleSelectServiceForAppointment}
        />

        {/* Custom Rubriques & Content Sections added by Admin */}
        {currentTheme.showRubriques && <CustomRubriques rubriques={rubriques} />}

        {/* Nos Talents */}
        <Talents talents={talents} />

        {/* Contact Form & Direct Contacts */}
        <ContactSection
          contactInfo={contactInfo}
          onAddLead={handleAddLead}
          onOpenAppointment={() => {
            setPreselectedService('');
            setAppointmentModalOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        contactInfo={contactInfo}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      {/* Interactive Appointment Scheduler Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        services={services}
        preselectedService={preselectedService}
        onAddAppointment={handleAddAppointment}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        talents={talents}
        setTalents={setTalents}
        services={services}
        setServices={setServices}
        leads={leads}
        setLeads={setLeads}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        rubriques={rubriques}
        setRubriques={setRubriques}
        isAdminAuthenticated={isAdminAuthenticated}
        setIsAdminAuthenticated={setIsAdminAuthenticated}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </div>
  );
}
