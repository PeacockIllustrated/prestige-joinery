import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Changed import path from 'firebase/storage' to '@firebase/storage' to resolve module export errors, which can occur with certain project dependency setups.
import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { storage, db } from '../../firebase';
import { Project, Document, CostItem } from '../../types';
import { UploadIcon, FolderIcon } from '../icons/Icons';
import Placeholder from '../ui/Placeholder';
import DocumentRow from './DocumentRow';

interface DocumentManagerProps {
  project: Project | null;
  documents: Document[];
  costs: CostItem[];
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ project, documents, costs }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!project || !event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    setIsUploading(true);

    try {
      const storagePath = `documents/${project.id}/${uuidv4()}-${file.name}`;
      const storageRef = ref(storage, storagePath);
      
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'documents'), {
        name: file.name,
        url,
        projectId: project.id,
        fileType: file.type,
        storagePath,
        uploadedAt: serverTimestamp(),
      });

    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("There was an error uploading the file. Please try again.");
    } finally {
      setIsUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteDocument = async (document: Document) => {
    if (!window.confirm(`Are you sure you want to delete "${document.name}"? This action cannot be undone.`)) {
        return;
    }
    try {
        const fileRef = ref(storage, document.storagePath);
        await deleteObject(fileRef);

        await deleteDoc(doc(db, 'documents', document.id));
    } catch(error) {
        console.error("Error deleting document: ", error);
        alert("There was an error deleting the document. Please try again.");
    }
  };

  if (!project) {
    return (
        <div className="flex-grow flex items-center justify-center">
            <Placeholder
                icon={<FolderIcon />}
                title="Select a Project"
                message="Choose a project from the list to view and manage its documents."
            />
        </div>
    );
  }

  return (
    <>
      <div className="p-4 border-b border-prestige-gray flex justify-between items-center">
        <h2 className="text-xl font-bold text-prestige-charcoal truncate">{project.name}</h2>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center justify-center bg-prestige-teal text-prestige-charcoal font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <UploadIcon className="w-5 h-5 mr-2" />
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {documents.length > 0 ? (
            <table className="min-w-full text-left">
                <thead className="border-b border-prestige-gray bg-prestige-light-gray/50 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Name</th>
                        <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Type</th>
                        <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Date Added</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-prestige-gray">
                    {documents.sort((a, b) => b.uploadedAt.seconds - a.uploadedAt.seconds).map(doc => (
                        <DocumentRow 
                            key={doc.id} 
                            document={doc} 
                            costs={costs}
                            onDelete={handleDeleteDocument}
                        />
                    ))}
                </tbody>
            </table>
        ) : (
            <div className="p-8">
                <Placeholder 
                    icon={<UploadIcon />}
                    title="No Documents Yet"
                    message="Upload your first document to this project to get started."
                />
            </div>
        )}
      </div>
    </>
  );
};

export default DocumentManager;