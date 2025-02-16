import {Config} from "../hooks/useConfigList";

export async function getAssistant(
    assistantId: string,
): Promise<Config | null> {
    try {
        const response = await fetch(`/assistants/${assistantId}`);
        if (!response.ok) {
            return null;
        }
        return (await response.json()) as Config;
    } catch (error) {
        console.error("Failed to fetch assistant:", error);
        return null;
    }
}

export async function getAssistants(): Promise<Config[] | null> {
    try {
        const response = await fetch(`/assistants/`);
        if (!response.ok) {
            return null;
        }
        return (await response.json()) as Config[];
    } catch (error) {
        console.error("Failed to fetch assistants:", error);
        return null;
    }
}


export interface AgentItem {
    id: string;
    name: string;
    description?: string;
    avatarUrl?: string;
    status?: string;
}

// 示例：静态数据，或改成 fetch / axios 调用后端
export const mockAgents: AgentItem[] = [
    {
        id: '1',
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        avatarUrl: '',
        status: 'Idle',
    },
    {
        id: '3',
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '4',
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '5',
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        avatarUrl: '',
        status: 'Idle',
    },
    {
        id: '6',
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '7',
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '8',
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        avatarUrl: '',
        status: 'Idle',
    },
    {
        id: '9',
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '10',
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        avatarUrl: '',
        status: 'Active',
    },
    {
        id: '11',
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        avatarUrl: '',
        status: 'Idle',
    },
    {
        id: '12',
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        avatarUrl: '',
        status: 'Active',
    },
];

// 如果你需要某些函数来获取数据
export function getAllAgents(): AgentItem[] {
    // 这里可以改成实际的API调用
    return mockAgents;
}