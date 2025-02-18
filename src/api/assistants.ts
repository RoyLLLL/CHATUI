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


export interface ToolItem {
    name: string;
    description?: string;
    type: string;  // 新增的 type 字段
}


// 示例：静态数据，或改成 fetch / axios 调用后端
export const mockAgents: ToolItem[] = [
    {

        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        type: '',
    },
    {
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        type: '',
    },
    {
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        type: '',
    },
    {
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        type: '',
    },
    {
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        type: '',
    },
    {
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        type: '',
    },
    {
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        type: '',
    },
    {
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        type: '',
    },
    {
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        type: '',
    },
    {
        name: 'Sales Assistant',
        description: 'Handles customer queries and sales-related tasks.',
        type: '',
    },
    {
        name: 'Support Bot',
        description: 'Provides troubleshooting steps and Q&A for customers.',
        type: '',
    },
    {
        name: 'HR Assistant',
        description: 'Manages onboarding and HR-related inquiries for new hires.',
        type: '',
    },
];

// 如果你需要某些函数来获取数据
export function getAllAgents(): ToolItem[] {
    // 这里可以改成实际的API调用
    return mockAgents;
}