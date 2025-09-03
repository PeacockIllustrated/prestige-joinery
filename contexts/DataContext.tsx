import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { Project, Task, StaffMember, Document, CostItem } from '../types';

interface DataContextProps {
    projects: Project[];
    tasks: Task[];
    staffMembers: StaffMember[];
    documents: Document[];
    costs: CostItem[];
    loading: boolean;
}

export const DataContext = createContext<DataContextProps>({
    projects: [],
    tasks: [],
    staffMembers: [],
    documents: [],
    costs: [],
    loading: true,
});

interface DataProviderProps {
    children: ReactNode;
}

const docToType = <T,>(doc: QueryDocumentSnapshot<DocumentData>): T => {
    return { ...doc.data(), id: doc.id } as T;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [costs, setCosts] = useState<CostItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);

            const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
                setProjects(snapshot.docs.map(doc => docToType<Project>(doc)));
            });

            const unsubTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
                setTasks(snapshot.docs.map(doc => docToType<Task>(doc)));
            });

            const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
                setStaffMembers(snapshot.docs.map(doc => docToType<StaffMember>(doc)));
            });

            const unsubDocuments = onSnapshot(collection(db, 'documents'), (snapshot) => {
                setDocuments(snapshot.docs.map(doc => docToType<Document>(doc)));
            });
            
            const unsubCosts = onSnapshot(collection(db, 'costs'), (snapshot) => {
                setCosts(snapshot.docs.map(doc => docToType<CostItem>(doc)));
            });

            // A simple way to stop the initial loading state.
            // In a real app with larger datasets, you might wait for the first snapshot of all collections.
            setTimeout(() => setLoading(false), 1500);


            // Cleanup listeners on unmount
            return () => {
                unsubProjects();
                unsubTasks();
                unsubUsers();
                unsubDocuments();
                unsubCosts();
            };
        };
        
        fetchInitialData();
    }, []);

    return (
        <DataContext.Provider value={{ projects, tasks, staffMembers, documents, costs, loading }}>
            {children}
        </DataContext.Provider>
    );
};