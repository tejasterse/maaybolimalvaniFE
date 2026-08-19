import { MapPin, Calendar, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { cleanText, stripHtmlAndEntities } from '../../utils/seo.js';

export default function AEOFactsBox({ title, date, location, reporter, summary }) {
  if (!title) return null;

  const cleanLocation = cleanText(location);
  const cleanReporter = cleanText(reporter);
  const cleanSummary = stripHtmlAndEntities(summary);

  return (
    <div className="my-6 p-4.5 bg-amber-50/70 border border-gold/40 rounded-2xl shadow-sm text-ink">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gold/30">
        <Sparkles className="w-5 h-5 text-gold-dark" />
        <h3 className="font-tiro text-lg font-bold text-maroon-deep">
          महत्त्वाचे मुद्दे (Quick Summary)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3 text-sm text-grey-dark font-poppins">
        {cleanLocation && (
          <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-gold/20">
            <MapPin className="w-4 h-4 text-maroon flex-shrink-0" />
            <span className="font-semibold text-xs text-maroon-deep">स्थान: {cleanLocation}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-gold/20">
            <Calendar className="w-4 h-4 text-maroon flex-shrink-0" />
            <span className="font-semibold text-xs text-maroon-deep">दिनांक: {date}</span>
          </div>
        )}
        {cleanReporter && (
          <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-gold/20">
            <User className="w-4 h-4 text-maroon flex-shrink-0" />
            <span className="font-semibold text-xs text-maroon-deep">बातमीदार: {cleanReporter}</span>
          </div>
        )}
      </div>

      {cleanSummary && (
        <div className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-gold/30 text-sm leading-relaxed font-mukta">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-maroon-deep font-medium">{cleanSummary}</p>
        </div>
      )}
    </div>
  );
}
