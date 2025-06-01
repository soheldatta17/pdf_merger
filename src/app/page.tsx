'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, DocumentIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface FileWithPreview extends File {
  preview?: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))]);
    },
    onDropRejected: () => {
      toast.error('Please upload PDF files only');
    },
    noClick: true,
  });

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please upload at least 2 PDF files to merge');
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await fetch('/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to merge PDFs');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('PDFs merged successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to merge PDFs. Please try again.');
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Merge PDF files
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Combine PDFs in the order you want with the easiest PDF merger available.
      </p>
      
      <div className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-red-500 bg-gray-800'
              : 'border-gray-600 hover:border-red-500 hover:bg-gray-800'
          }`}
        >
          <input {...getInputProps()} />
          <button 
            onClick={open}
            className="bg-red-500 text-white px-8 py-4 rounded-lg text-lg font-medium mb-4 hover:bg-red-600 transition-colors"
          >
            Select PDF files
          </button>
          <p className="text-gray-400">
            or drop PDFs here
          </p>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Selected Files ({files.length})
                  </h2>
                  <button
                    onClick={open}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add More</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center p-3 bg-gray-700 rounded group"
                    >
                      <DocumentIcon className="w-6 h-6 text-red-500 mr-3" />
                      <span className="text-sm text-gray-200">
                        {file.name}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleMerge}
                className="w-full py-4 px-6 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Merge PDFs
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
