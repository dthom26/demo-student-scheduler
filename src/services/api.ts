import type { ScheduleSubmission } from "../types/submission";

// Use mock API by default. To use real backend, set VITE_API_BASE_URL in .env
const USE_MOCK_API = !import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://student-schedular-backend.onrender.com';

// Dynamic import of mock API
import * as mockApi from './mockApi';

export async function submitSchedule(payload: ScheduleSubmission): Promise<{ success: boolean; message: string; id: string }> {
    if (USE_MOCK_API) {
        return mockApi.submitSchedule(payload);
    }

    // Original real API code
    // Validate input
    if (!payload.student?.id || !payload.student?.name || !payload.student?.location) {
        throw new Error('Missing required student information');
    }
    
    if (!payload.schedule || payload.schedule.length === 0) {
        throw new Error('Schedule cannot be empty');
    }

    // Make request
    const response = await fetch(`${API_BASE_URL}/api/v1/submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentId: payload.student.id,
            studentName: payload.student.name,
            location: payload.student.location,
            schedule: payload.schedule,
            notes: payload.notes || ''
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit schedule');
    }

    const data = await response.json();
    return data;
}

export async function fetchSubmissions(token: string) : Promise<ScheduleSubmission[]> {
    if (USE_MOCK_API) {
        return mockApi.fetchSubmissions(token);
    }

    // Original real API code
    if(!token) {
        throw new Error('Auth token is required');
    }
    const response = await fetch(`${API_BASE_URL}/api/v1/submissions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch submissions');
    }
    const data = await response.json();
    return data;
}