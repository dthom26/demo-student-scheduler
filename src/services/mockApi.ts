import type { ScheduleSubmission } from "../types/submission";
import { mockSubmissions, mockManagerPassword } from "./mockData";

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function submitSchedule(payload: ScheduleSubmission): Promise<{ success: boolean; message: string; id: string }> {
    // Validate input
    if (!payload.student?.id || !payload.student?.name || !payload.student?.location) {
        throw new Error('Missing required student information');
    }
    
    if (!payload.schedule || payload.schedule.length === 0) {
        throw new Error('Schedule cannot be empty');
    }

    // Simulate network request
    await delay();

    // In a real mock, you could store this in localStorage or sessionStorage
    
    return {
        success: true,
        message: 'Schedule submitted successfully',
        id: `submission-${Date.now()}`
    };
}

export async function fetchSubmissions(token: string): Promise<ScheduleSubmission[]> {
    if(!token) {
        throw new Error('Auth token is required');
    }

    // Simulate network request
    await delay();
    
    return mockSubmissions;
}

export async function authenticateManager(password: string): Promise<{ token: string }> {
    // Simulate network request
    await delay();

    if (password !== mockManagerPassword) {
        throw new Error('Invalid password');
    }

    return {
        token: 'mock-jwt-token-' + Date.now()
    };
}
