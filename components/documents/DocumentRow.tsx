import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Document, CostItem } from '../../types';
import { MoreHorizontalIcon, DownloadIcon, TrashIcon, FileTextIcon, ReceiptIcon } from '../icons/Icons';
import Badge from '../ui/Badge';

interface DocumentRowProps {
  document: Document;
  costs: CostItem[];
  isProcessing: boolean;
  onDelete: (document: Document) => void;
  onProcess: (document: Document) => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document: documentProp, costs, isProcessing, onDelete, onProcess }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const formattedDate = new Date(documentProp.uploadedAt.seconds * 1000).toLocaleDateString();

  const isProcessed = useMemo(() => {
    return costs.some(cost => cost.documentId === documentProp.id);
  }, [costs, documentProp.id]);

  const isImage = useMemo(() => {
    return documentProp.fileType.startsWith('image/');
  }, [documentProp.fileType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleDownload = () => {
    window.open(documentProp.url, '_blank');
    setIsMenuOpen(false);
  };
  
  const handleDelete = () => {
    onDelete(documentProp);
    setIsMenuOpen(false);
  };

  const handleProcess = () => {
    onProcess(documentProp);
    setIsMenuOpen(false);
  };

  return (
    <tr className="hover:bg-prestige-light-gray/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-prestige-charcoal">
        <div className="flex items-center">
            <FileTextIcon className="w-5 h-5 mr-3 text-prestige-text" />
            <span className="truncate max-w-xs">{documentProp.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-prestige-text">{documentProp.fileType}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-prestige-text">{formattedDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative inline-block text-left" ref={menuRef}>
            <button 
                className="text-gray-400 hover:text-prestige-charcoal p-2 -m-2 rounded-full"
                onClick={() => setIsMenuOpen(prev => !prev)}
                aria-label="Document options"
            >
                <MoreHorizontalIcon />
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-prestige-gray animate-fade-in-scale-sm" style={{animationFillMode: 'forwards'}}>
                    <div className="p-1">
                        <button onClick={handleDownload} className="w-full text-left px-3 py-2 text-sm text-prestige-charcoal hover:bg-prestige-gray rounded-md flex items-center transition-colors">
                            <DownloadIcon className="w-4 h-4 mr-3 text-prestige-text"/> Download
                        </button>
                        {isImage && (
                          isProcessed ? (
                             <div className="px-3 py-2 text-sm text-prestige-text flex items-center">
                               <Badge text="Processed" color="green"/>
                             </div>
                          ) : (
                            <button onClick={handleProcess} disabled={isProcessing} className="w-full text-left px-3 py-2 text-sm text-prestige-charcoal hover:bg-prestige-gray rounded-md flex items-center transition-colors disabled:opacity-50">
                                <ReceiptIcon className="w-4 h-4 mr-3 text-prestige-text"/> 
                                {isProcessing ? 'Processing...' : 'Process Invoice'}
                            </button>
                          )
                        )}
                         <div className="my-1 h-px bg-prestige-gray"></div>
                         <button onClick={handleDelete} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center transition-colors">
                            <TrashIcon className="w-4 h-4 mr-3"/> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
      </td>
      <style>{`
        @keyframes fade-in-scale-sm {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale-sm {
          animation: fade-in-scale-sm 0.1s ease-out;
        }
      `}</style>
    </tr>
  );
};

export default DocumentRow;