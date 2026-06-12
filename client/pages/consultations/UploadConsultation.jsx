import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { createConsultation } from '../../services/consultationService';

const CATEGORIES = ['Therapy', 'Financial', 'Astrology', 'Legal', 'Coaching', 'Medical'];

export default function UploadConsultation({ onNavigate }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    clientName: '',
    title: '',
    category: 'Therapy',
    date: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError('');

    if (!form.clientName || !form.title || !form.date) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!file) {
      setError('Please select an audio file.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('clientName', form.clientName);
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('consultationDate', form.date);
      formData.append('description', form.description);
      formData.append('audio', file);

      const data = await createConsultation(formData);
      onNavigate('details', data.consultation._id);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Upload Consultation</h1>
      <p className="text-sm text-gray-500 mt-1">Save a consultation recording with structured context.</p>

      {error && (
        <div className="mt-4 px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Drop zone */}
      <div
        className={`mt-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 sm:py-14 cursor-pointer transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3">
          <UploadCloud className="w-6 h-6 text-gray-400" />
        </div>
        {file ? (
          <p className="text-sm font-medium text-gray-700 px-4 text-center break-all">{file.name}</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700 text-center px-4">Drag and drop your audio file here</p>
            <p className="text-xs text-gray-400 mt-1">Supports MP3 and WAV files</p>
          </>
        )}
        <button
          type="button"
          className="mt-4 px-4 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          Browse Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".mp3,.wav"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Form */}
      <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Consultation Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Initial intake session"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Consultation Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Brief context about the session..."
            rows={5}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => onNavigate('history')}
          className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Uploading...' : 'Upload Consultation'}
        </button>
      </div>
    </div>
  );
}
