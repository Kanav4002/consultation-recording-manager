import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, FileText, Pencil, Trash2 } from 'lucide-react';
import { getConsultationById, updateConsultation, deleteConsultation } from '../../services/consultationService';
import { getNotes, createNote, updateNote, deleteNote } from '../../services/noteService';
import { useNotifications } from '../../context/NotificationContext';
import CategoryBadge from '../../components/CategoryBadge';

function formatLongDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatFileSize(bytes) {
  if (!bytes) return '—';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function ConsultationDetails({ consultationId, onNavigate }) {
  const { addNotification } = useNotifications();
  const [consultation, setConsultation] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingConsultation, setEditingConsultation] = useState(false);
  const [editForm, setEditForm] = useState({ clientName: '', title: '', category: '', consultationDate: '', description: '' });
  const [savingEdit, setSavingEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getConsultationById(consultationId),
      getNotes(consultationId),
    ])
      .then(([cData, nData]) => {
        setConsultation(cData.consultation);
        setNotes(nData.notes);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load consultation'))
      .finally(() => setLoading(false));
  }, [consultationId]);

  async function saveNote() {
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      const data = await createNote(consultationId, noteText.trim());
      setNotes((prev) => [data.note, ...prev]);
      setNoteText('');
      addNotification({
        title: 'Note added',
        description: `Note added to ${consultation?.clientName || 'consultation'}`,
        link: `/consultations/${consultationId}`,
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save note');
    } finally {
      setSavingNote(false);
    }
  }

  async function handleDeleteNote(id) {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete note');
    }
  }

  function startEdit(note) {
    setEditingId(note._id);
    setEditText(note.content);
  }

  async function saveEdit(id) {
    try {
      const data = await updateNote(id, editText);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, content: data.note.content, updatedAt: data.note.updatedAt } : n))
      );
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update note');
    }
  }

  function startEditConsultation() {
    setEditForm({
      clientName: consultation.clientName,
      title: consultation.title,
      category: consultation.category,
      consultationDate: consultation.consultationDate?.slice(0, 10) || '',
      description: consultation.description || '',
    });
    setEditingConsultation(true);
  }

  async function handleSaveConsultationEdit() {
    setSavingEdit(true);
    try {
      const data = await updateConsultation(consultationId, editForm);
      setConsultation(data.consultation);
      setEditingConsultation(false);
      addNotification({
        title: 'Consultation updated',
        description: `${editForm.clientName} — ${editForm.title}`,
        link: `/consultations/${consultationId}`,
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update consultation');
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteConsultation(consultationId);
      onNavigate('history');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete consultation');
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  const audioUrl = consultation?.audioPath || '';

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
  }

  function handleTimeUpdate() {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleLoadedMetadata() {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  }

  function handleProgressClick(e) {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  }

  function handleVolumeChange(e) {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    if (audioRef.current) audioRef.current.volume = val;
  }

  function toggleMute() {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.volume = volume || 0.75;
      setMuted(false);
    } else {
      audioRef.current.volume = 0;
      setMuted(true);
    }
  }

  function formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading consultation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center h-64">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!consultation) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => onNavigate('history')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to history
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{consultation.clientName}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{consultation.title}</p>
        </div>
        <CategoryBadge category={consultation.category} className="text-sm px-3 py-1 self-start" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Consultation info */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Consultation Information</h2>
            {editingConsultation ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Client Name</label>
                    <input type="text" value={editForm.clientName} onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Title</label>
                    <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
                    <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none">
                      {['Therapy', 'Financial', 'Astrology', 'Legal', 'Coaching', 'Medical'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Date</label>
                    <input type="date" value={editForm.consultationDate} onChange={(e) => setEditForm({ ...editForm, consultationDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setEditingConsultation(false)} className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                  <button onClick={handleSaveConsultationEdit} disabled={savingEdit}
                    className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {savingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <InfoField label="Client" value={consultation.clientName} />
                <InfoField label="Title" value={consultation.title} />
                <InfoField label="Category" value={consultation.category} />
                <InfoField label="Date" value={formatLongDate(consultation.consultationDate)} />
                <div className="sm:col-span-2">
                  <InfoField label="Description" value={consultation.description || '—'} />
                </div>
              </div>
            )}
          </section>

          {/* Audio player */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Audio Recording</h2>
              <span className="text-xs text-gray-400 truncate ml-2">{consultation.originalFileName}</span>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 hover:bg-blue-700 transition-colors"
              >
                {playing
                  ? <Pause className="w-4 h-4 text-white" />
                  : <Play className="w-4 h-4 text-white ml-0.5" />
                }
              </button>
              <div className="flex-1 min-w-0">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="relative h-1.5 bg-gray-200 rounded-full cursor-pointer group"
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-[width] duration-100"
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                  <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={toggleMute} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {muted || volume === 0
                    ? <VolumeX className="w-4 h-4" />
                    : <Volume2 className="w-4 h-4" />
                  }
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1.5 appearance-none bg-gray-200 rounded-full cursor-pointer accent-gray-500"
                />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <h2 className="text-sm font-semibold text-gray-900">Consultation Notes</h2>
              </div>
              <span className="text-xs text-gray-400">{notes.length} notes</span>
            </div>

            {/* New note */}
            <div className="mb-4">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write a new note..."
                rows={4}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={saveNote}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={!noteText.trim() || savingNote}
                >
                  {savingNote ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </div>

            {/* Note list */}
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note._id} className="border border-gray-100 rounded-lg p-4 group">
                  {editingId === note._id ? (
                    <div>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      <div className="flex gap-2 mt-2 justify-end">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(note._id)}
                          className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800">{note.content}</p>
                        <p className="text-xs text-gray-400 mt-1.5">
                          Created {new Date(note.createdAt).toLocaleDateString()} · Updated {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(note)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note._id)}
                          className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Metadata */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Metadata</h2>
            <div className="space-y-3">
              <InfoField label="File Name" value={consultation.originalFileName} small />
              <InfoField label="File Size" value={formatFileSize(consultation.fileSize)} small />
              <InfoField label="Upload Date" value={formatLongDate(consultation.createdAt)} small />
            </div>
          </section>

          {/* Actions */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Actions</h2>
            <div className="space-y-2">
              <button onClick={startEditConsultation}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Pencil className="w-4 h-4" />
                Edit Consultation
              </button>
              {confirmDelete ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">Are you sure?</p>
                  <button onClick={handleDelete} disabled={deleting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                    {deleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button onClick={() => setConfirmDelete(false)}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-500 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete Consultation
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, small }) {
  return (
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className={`text-gray-900 font-medium mt-0.5 ${small ? 'text-xs break-all' : 'text-sm'}`}>{value}</p>
    </div>
  );
}
