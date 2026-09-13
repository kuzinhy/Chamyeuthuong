import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Bookmark, 
  Send, 
  Heart, 
  Bell, 
  LogOut, 
  Shield, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Story, Letter, StorySubmission, ActiveNavPage } from '../types';
import { LumiMascot } from './LumiMascot';

interface ProfileDrawerProps {
  stories: Story[];
  letters: Letter[];
  submissions: StorySubmission[];
  onSelectStory: (story: Story) => void;
  onNavigate: (page: ActiveNavPage) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  stories,
  letters,
  submissions,
  onSelectStory,
  onNavigate,
}) => {
  const { 
    user, 
    isProfileDrawerOpen, 
    closeProfileDrawer, 
    savedStoryIds, 
    toggleBookmark, 
    notifications,
    markNotificationAsRead,
    logout,
    role
  } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'submissions' | 'letters' | 'notifications'>('bookmarks');

  if (!isProfileDrawerOpen || !user) return null;

  const bookmarkedStories = stories.filter(s => savedStoryIds.includes(s.id));
  const myLetters = letters.filter(l => l.senderName === user.displayName || l.userId === user.id);
  const mySubmissions = submissions.filter(s => s.userId === user.id || s.authorName === user.displayName);

  const getRoleBadge = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-700 border border-purple-200">SUPER ADMIN</span>;
      case 'ADMIN':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-700 border border-sky-200">ADMIN</span>;
      case 'EDITOR':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200">BIÊN TẬP VIÊN</span>;
      case 'MODERATOR':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700 border border-amber-200">KIỂM DUYỆT VIÊN</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">THÀNH VIÊN</span>;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProfileDrawer}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-200" />
                  <span className="text-xs font-semibold text-sky-100 uppercase tracking-wider">Trang Cá Nhân</span>
                </div>
                <button
                  onClick={closeProfileDrawer}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Info Card */}
              <div className="flex items-center gap-4 mt-5">
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                  alt={user.displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold truncate text-white">{user.displayName}</h3>
                    {getRoleBadge()}
                  </div>
                  {user.province && (
                    <p className="text-xs text-sky-100 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{user.province}</span>
                    </p>
                  )}
                  <p className="text-[11px] text-sky-100/90 mt-1 line-clamp-2">
                    {user.bio || 'Thành viên lan tỏa lòng trắc ẩn cùng LUMI.'}
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-black/15 p-1 rounded-2xl mt-5 text-center">
                <button
                  onClick={() => setActiveTab('bookmarks')}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all flex flex-col items-center gap-1 ${
                    activeTab === 'bookmarks' ? 'bg-white text-sky-700 shadow-sm' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Đã Lưu ({bookmarkedStories.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all flex flex-col items-center gap-1 ${
                    activeTab === 'submissions' ? 'bg-white text-sky-700 shadow-sm' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Bài Gửi ({mySubmissions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('letters')}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all flex flex-col items-center gap-1 ${
                    activeTab === 'letters' ? 'bg-white text-sky-700 shadow-sm' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Lời Nhắn ({myLetters.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all flex flex-col items-center gap-1 ${
                    activeTab === 'notifications' ? 'bg-white text-sky-700 shadow-sm' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Thông Báo ({notifications.length})</span>
                </button>
              </div>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* TAB 1: BOOKMARKS */}
              {activeTab === 'bookmarks' && (
                <div>
                  {bookmarkedStories.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <LumiMascot size="md" state="empty-bookmark" />
                      <h4 className="font-bold text-slate-700 mt-3 text-sm">Chưa có câu chuyện nào được lưu</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        Nhấn vào biểu tượng 🔖 trên mỗi câu chuyện tử tế để lưu lại và đọc mọi lúc nhé!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookmarkedStories.map(story => (
                        <div
                          key={story.id}
                          className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-sky-300 transition-all group"
                        >
                          <img
                            src={story.coverImage}
                            alt={story.title}
                            className="w-20 h-20 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                            onClick={() => {
                              onSelectStory(story);
                              closeProfileDrawer();
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{story.category}</span>
                              <button
                                onClick={() => {
                                  toggleBookmark(story.id);
                                  showToast('Đã bỏ lưu câu chuyện', { type: 'info' });
                                }}
                                className="text-slate-400 hover:text-rose-500 p-1"
                                title="Bỏ lưu"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h4
                              onClick={() => {
                                onSelectStory(story);
                                closeProfileDrawer();
                              }}
                              className="text-xs font-bold text-slate-800 line-clamp-2 cursor-pointer hover:text-sky-600 transition-colors mt-0.5"
                            >
                              {story.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                              <span>📍 {story.province}</span>
                              <span>•</span>
                              <span>{story.publishedDate}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SUBMISSIONS */}
              {activeTab === 'submissions' && (
                <div>
                  {mySubmissions.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <LumiMascot size="md" state="reading" />
                      <h4 className="font-bold text-slate-700 mt-3 text-sm">Bạn chưa gửi câu chuyện nào</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mb-4">
                        Hãy kể cho LUMI nghe những việc tốt quanh bạn nhé!
                      </p>
                      <button
                        onClick={() => {
                          closeProfileDrawer();
                          onNavigate('submit-story');
                        }}
                        className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold shadow-md hover:bg-sky-600 transition-colors"
                      >
                        Kể LUMI Nghe Ngay
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {mySubmissions.map(sub => (
                        <div key={sub.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-slate-500">{sub.submittedAt}</span>
                            {sub.status === 'approved' || sub.status === 'converted_to_story' ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" /> Đã Duyệt & Xuất Bản
                              </span>
                            ) : sub.status === 'rejected' ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                <XCircle className="w-3 h-3" /> Cần Chỉnh Sửa
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                <Clock className="w-3 h-3" /> Đang Chờ Duyệt
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-slate-800">{sub.title}</h4>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{sub.content}</p>
                          {sub.feedback && (
                            <p className="text-[11px] text-sky-700 bg-sky-50 p-2 rounded-xl mt-2 border border-sky-100">
                              💬 <strong>Phản hồi từ Ban Biên Tập:</strong> {sub.feedback}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: LOVE LETTERS */}
              {activeTab === 'letters' && (
                <div>
                  {myLetters.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <LumiMascot size="md" state="heart" />
                      <h4 className="font-bold text-slate-700 mt-3 text-sm">Chưa có lá thư nào được gửi</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mb-4">
                        Gửi một lời cảm ơn, xin lỗi hay động viên đến những người bạn thương yêu.
                      </p>
                      <button
                        onClick={() => {
                          closeProfileDrawer();
                          onNavigate('letters');
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 transition-colors"
                      >
                        Gửi Lời Yêu Thương
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myLetters.map(letter => (
                        <div key={letter.id} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold text-rose-600">💌 {letter.category}</span>
                            <span className="text-[10px] text-slate-400">{letter.createdAt}</span>
                          </div>
                          {letter.targetPerson && (
                            <p className="text-[11px] font-semibold text-slate-700 mb-1">
                              Gửi đến: <span className="text-rose-600">{letter.targetPerson}</span>
                            </p>
                          )}
                          <p className="text-xs text-slate-700 italic bg-white/80 p-2.5 rounded-xl border border-rose-100">
                            "{letter.content}"
                          </p>
                          {letter.replyFromLumi && (
                            <div className="mt-2 text-[11px] text-sky-800 bg-sky-50 p-2 rounded-xl border border-sky-100 flex items-start gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                              <span>{letter.replyFromLumi}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="space-y-2.5">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        notif.isRead 
                          ? 'bg-slate-50/70 border-slate-200/60' 
                          : 'bg-sky-50/60 border-sky-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h5 className={`text-xs font-bold ${notif.isRead ? 'text-slate-700' : 'text-sky-900'}`}>
                          {notif.title}
                        </h5>
                        <span className="text-[10px] text-slate-400">{notif.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              {['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MODERATOR'].includes(role) && (
                <button
                  onClick={() => {
                    closeProfileDrawer();
                    onNavigate('admin');
                  }}
                  className="px-3 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow hover:bg-purple-700 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Trang Quản Trị CMS</span>
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  showToast('Đã đăng xuất', { type: 'info' });
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 ml-auto"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng Xuất</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
