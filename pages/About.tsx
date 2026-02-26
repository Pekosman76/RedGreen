
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="mb-8 inline-block p-6 rounded-full bg-brand-green/10 text-brand-green">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
      </div>
      <h1 className="text-4xl font-black mb-6">About RedFlag / GreenFlag</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        We believe that shared values are the foundation of any good relationship—whether it's romantic, professional, or platonic.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <h3 className="font-bold mb-2">Our Mission</h3>
          <p className="text-sm text-gray-500">To make social boundary-setting intuitive, fun, and data-driven.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <h3 className="font-bold mb-2">Anonymous First</h3>
          <p className="text-sm text-gray-500">Your judgment is yours alone. We prioritize privacy and safety above all.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <h3 className="font-bold mb-2">Crowdsourced Wisdon</h3>
          <p className="text-sm text-gray-500">See how thousands of people react to complex social nuances.</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 italic">RedFlag / GreenFlag is an independent project dedicated to social education through entertainment.</p>
    </div>
  );
};

export default About;
