
import React from 'react';

const faqs = [
  { q: "What is a Red Flag?", a: "A Red Flag is a warning sign or indicator of potentially unhealthy or toxic behavior in a relationship, workplace, or social situation." },
  { q: "What is a Green Flag?", a: "A Green Flag is a positive trait or behavior that indicates emotional maturity, healthy boundaries, and mutual respect." },
  { q: "Is voting anonymous?", a: "Yes. We don't track your identity. We only store a local hash to ensure you don't vote on the same scenario twice." },
  { q: "How are scenarios moderated?", a: "We use a combination of AI filtering (Gemini) and manual human review to ensure all content is safe and generic." },
  { q: "Can I delete my submission?", a: "Once a submission is approved, it belongs to the community. However, if it violates a policy, you can report it or contact us for removal." },
  { q: "Why was my scenario rejected?", a: "Common reasons include: too short/long, contains real names, mentions minors, or is overly offensive." },
  { q: "Are there rewards for submitting?", a: "Currently, you get the satisfaction of helping others navigate social complexities. We're working on a 'Judge XP' system soon!" },
  { q: "Can I comment on scenarios?", a: "Comments are 'Coming Soon'. We want to ensure a safe environment before enabling open discussion." },
  { q: "Who owns the scenarios?", a: "By submitting, you grant us a license to display the text. Content must be original or common-knowledge situations." },
  { q: "Is this app available for mobile?", a: "We are a mobile-first web app! You can 'Add to Home Screen' for an app-like experience." },
  { q: "How do I report abuse?", a: "Use the report button on any card. Our team reviews reports daily." },
  { q: "Can I advertise on RF/GF?", a: "We are open to partnerships. Contact our business team via the About page." }
];

const FAQ: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{f.q}</h3>
            <p className="text-gray-600 dark:text-gray-400">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
