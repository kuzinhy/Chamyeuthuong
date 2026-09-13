import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Heart, 
  BookOpen, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Info,
  Layers,
  Filter
} from 'lucide-react';
import { Story, RegionType } from '../types';

interface MapPageProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ stories, onSelectStory }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeStory, setActiveStory] = useState<Story | null>(stories[0] || null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  const filteredStories = stories.filter(s => {
    if (selectedRegion === 'all') return true;
    return s.region === selectedRegion;
  });

  const totalProvinces = new Set(stories.map(s => s.province)).size;
  const totalLikes = stories.reduce((acc, s) => acc + s.likes, 0);

  // Initialize Leaflet Map if available in window
  useEffect(() => {
    let mapInstance: any = null;

    const initMap = async () => {
      if (typeof window === 'undefined') return;

      try {
        // Dynamically import Leaflet
        const L = (await import('leaflet')).default;

        if (mapContainerRef.current && !leafletMapRef.current) {
          // Centered at Vietnam coordinates
          mapInstance = L.map(mapContainerRef.current, {
            center: [16.047079, 107.5], // Center of Vietnam
            zoom: 6,
            minZoom: 5,
            maxZoom: 14,
            scrollWheelZoom: false
          });

          // OpenStreetMap Tile Layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
          }).addTo(mapInstance);

          leafletMapRef.current = mapInstance;
        }

        // Add markers
        if (leafletMapRef.current) {
          // Clear old markers if any
          leafletMapRef.current.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
              leafletMapRef.current.removeLayer(layer);
            }
          });

          filteredStories.forEach(story => {
            if (story.latitude && story.longitude) {
              // Custom Heart Marker Icon
              const heartIcon = L.divIcon({
                className: 'custom-heart-pin',
                html: `
                  <div style="
                    background: #f43f5e;
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(244,63,94,0.4);
                    border: 2px solid white;
                    cursor: pointer;
                    transform: transition: transform 0.2s;
                  ">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              });

              const marker = L.marker([story.latitude, story.longitude], { icon: heartIcon })
                .addTo(leafletMapRef.current);

              // Popup content
              const popupHtml = `
                <div style="font-family: sans-serif; padding: 6px; max-width: 220px;">
                  <img src="${story.coverImage}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />
                  <span style="font-size: 10px; font-weight: bold; color: #f43f5e; background: #fff1f2; padding: 2px 6px; border-radius: 99px;">${story.province}</span>
                  <h4 style="font-size: 12px; font-weight: bold; margin: 4px 0; color: #0f172a; line-height: 1.3;">${story.title}</h4>
                  <p style="font-size: 11px; color: #64748b; margin-bottom: 8px; line-height: 1.3;">${story.excerpt.slice(0, 70)}...</p>
                </div>
              `;

              marker.bindPopup(popupHtml);

              marker.on('click', () => {
                setActiveStory(story);
              });
            }
          });
        }
      } catch (err) {
        console.warn('Leaflet map error or fallback mode:', err);
      }
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [filteredStories]);

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Địa Lý Lòng Nhân Ái Việt Nam</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Bản Đồ Lòng Trắc Ẩn
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Mỗi điểm trái tim trên bản đồ đại diện cho một câu chuyện tử tế có thật được thắp sáng bởi học sinh và cộng đồng khắp các tỉnh thành.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-rose-100/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-900">{stories.length}</div>
              <div className="text-xs text-slate-500 font-medium">Câu chuyện tử tế đã ghi nhận</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-rose-100/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-900">{totalProvinces}</div>
              <div className="text-xs text-slate-500 font-medium">Tỉnh/thành có câu chuyện</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-rose-100/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
              <Sparkles className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-900">{totalLikes}+</div>
              <div className="text-xs text-slate-500 font-medium">Lượt yêu thương lan tỏa</div>
            </div>
          </div>
        </div>

        {/* Region Filter Selector */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 rounded-2xl border border-rose-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Compass className="w-4 h-4 text-rose-500" />
              Lọc theo vùng miền:
            </span>
            {[
              { id: 'all', label: 'Tất cả (63 Tỉnh Thành)' },
              { id: 'Bắc', label: 'Miền Bắc' },
              { id: 'Trung', label: 'Miền Trung' },
              { id: 'Nam', label: 'Miền Nam' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRegion === r.id
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Hiển thị <strong>{filteredStories.length}</strong> điểm chạm
          </div>
        </div>

        {/* Interactive Map & Story Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Column */}
          <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-3xl border border-rose-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <MapPin className="w-4 h-4 text-rose-500" />
                Bản đồ tương tác Việt Nam (OpenStreetMap)
              </span>
              <span>Nhấp vào biểu tượng trái tim để xem nhanh</span>
            </div>

            {/* Leaflet container */}
            <div 
              ref={mapContainerRef}
              className="w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden z-10 border border-slate-200"
            ></div>
          </div>

          {/* Selected Story Preview Card */}
          <div className="lg:col-span-4 space-y-4 sticky top-28">
            <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Câu chuyện được chọn
                </span>
                {activeStory && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
                    {activeStory.province}
                  </span>
                )}
              </div>

              {activeStory ? (
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={activeStory.coverImage}
                      alt={activeStory.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-rose-700 shadow-2xs">
                        {activeStory.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    {activeStory.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {activeStory.excerpt}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 font-handwriting text-base">
                    “{activeStory.message}”
                  </div>

                  <button
                    onClick={() => onSelectStory(activeStory)}
                    className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Đọc toàn bộ câu chuyện</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Heart className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">Chọn một điểm đánh dấu trên bản đồ để xem chi tiết</p>
                </div>
              )}
            </div>

            {/* Quick Province List */}
            <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Danh sách điểm câu chuyện
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {filteredStories.map(story => (
                  <div
                    key={story.id}
                    onClick={() => {
                      setActiveStory(story);
                      if (leafletMapRef.current && story.latitude && story.longitude) {
                        leafletMapRef.current.flyTo([story.latitude, story.longitude], 10, { duration: 1 });
                      }
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      activeStory?.id === story.id
                        ? 'bg-rose-50 border-rose-300 font-bold text-rose-700'
                        : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-rose-50/40'
                    }`}
                  >
                    <span className="truncate pr-2">{story.province} • {story.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
