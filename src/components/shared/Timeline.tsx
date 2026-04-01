interface TimelineItem {
  year: string;
  events: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-forest-300" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={item.year}
            className={`relative flex items-start gap-6 md:gap-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Year circle */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-forest-700 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
              {item.year.slice(2)}
            </div>

            {/* Content */}
            <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "" : "md:text-right"}`}>
              <h3 className="text-lg font-bold text-forest-700 mb-2">
                {item.year}
              </h3>
              <ul className={`space-y-1.5 ${index % 2 === 0 ? "" : "md:list-none"}`}>
                {item.events.map((event, i) => (
                  <li
                    key={i}
                    className="text-sm text-warm-gray-700 flex items-start gap-2"
                  >
                    <span className="text-forest-500 mt-1 shrink-0">&#x2022;</span>
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
