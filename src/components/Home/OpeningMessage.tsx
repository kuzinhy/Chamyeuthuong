import React from 'react';
import { Quote } from 'lucide-react';

export const OpeningMessage: React.FC = () => {
  return (
    <section id="opening-message-section" className="py-16 sm:py-20 bg-[#fdfbf7] border-y border-rose-100/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
          <Quote className="w-6 h-6" />
        </div>
        
        <blockquote className="font-display font-medium text-xl sm:text-2xl md:text-3xl text-slate-800 leading-snug tracking-tight">
          “Mỗi người chúng ta đều có khả năng khiến thế giới trở nên dịu dàng hơn – đôi khi chỉ bằng một ánh nhìn, một lời hỏi thăm hay một hành động nhỏ.”
        </blockquote>

      </div>
    </section>
  );
};
