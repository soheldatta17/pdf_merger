'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface FileWithPreview extends File {
  preview?: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    onDropRejected: () => {
      toast.error('Please upload PDF files only');
    }
  });

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please upload at least 2 PDF files to merge');
      return;
    }
    // PDF merging functionality will be implemented here
    toast.success('PDFs merged successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        PDF Merger
      </h1>
      
      <div className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-700'
          }`}
        >
          <input {...getInputProps()} />
          <ArrowUpTrayIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {isDragActive
              ? 'Drop your PDF files here'
              : 'Drag & drop PDF files here, or click to select files'}
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
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Selected Files ({files.length})
                </h2>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <DocumentIcon className="w-6 h-6 text-blue-500 mr-3" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {file.name}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleMerge}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
