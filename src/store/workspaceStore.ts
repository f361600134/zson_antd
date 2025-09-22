import { create } from 'zustand';

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

interface WorkspaceState {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  setCurrentWorkspace: (workspace: Workspace) => void;
  addWorkspace: (workspace: Workspace) => void;
  removeWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentWorkspace: {
    id: '1',
    name: 'Default Workspace',
    description: 'Your main workspace',
    createdAt: '2025-01-10'
  },
  workspaces: [
    {
      id: '1',
      name: 'Default Workspace',
      description: 'Your main workspace',
      createdAt: '2025-01-10'
    },
    {
      id: '2', 
      name: 'Project Alpha',
      description: 'Alpha project workspace',
      createdAt: '2025-01-08'
    },
    {
      id: '3',
      name: 'Marketing Team',
      description: 'Marketing team collaboration',
      createdAt: '2025-01-05'
    }
  ],
  setCurrentWorkspace: (workspace) => 
    set({ currentWorkspace: workspace }),
  addWorkspace: (workspace) => 
    set((state) => ({ workspaces: [...state.workspaces, workspace] })),
  removeWorkspace: (id) => 
    set((state) => ({ 
      workspaces: state.workspaces.filter(w => w.id !== id),
      currentWorkspace: state.currentWorkspace?.id === id ? state.workspaces[0] : state.currentWorkspace
    }))
}));