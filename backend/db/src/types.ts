export type Gender = 'male' | 'female';
export interface User { id: number; name: string; email: string; phone: string; created_at?: string }
export interface Preference { id: number; user_id: number; receiver_name: string; gender: Gender; genre: string; created_at?: string }
